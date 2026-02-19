/**
 * Firebase Bookings Module
 * Hands Detail Shop - Pittsburgh Auto Detailing
 * 
 * Handles all booking-related Firestore operations:
 * - Create new bookings
 * - Read booking details
 * - Update booking status
 * - Listen to real-time booking changes
 * - Generate booking statistics
 * - Track booking-related events
 */

import { db, auth, analytics } from './firebase-config.js';

/**
 * Save a new booking to Firestore
 * @param {Object} bookingData - Booking information
 * @returns {Promise<string>} - Returns the booking ID
 */
export async function saveBookingToFirebase(bookingData) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated to create a booking');
    }
    
    // Validate required fields
    const requiredFields = ['service', 'date', 'time', 'vehicle'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Prepare booking document
    const booking = {
      userId: user.uid,
      userEmail: user.email,
      userName: bookingData.customerName || user.displayName || 'Guest',
      userPhone: bookingData.phone || '',
      service: bookingData.service,
      date: new Date(bookingData.date),
      time: bookingData.time,
      duration: bookingData.duration || 2, // hours
      vehicle: {
        make: bookingData.vehicle.make || '',
        model: bookingData.vehicle.model || '',
        year: bookingData.vehicle.year || '',
        color: bookingData.vehicle.color || ''
      },
      price: parseFloat(bookingData.price) || 0,
      status: 'pending', // pending, confirmed, completed, cancelled
      notes: bookingData.notes || '',
      specialRequests: bookingData.specialRequests || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentStatus: 'pending', // pending, paid, refunded
      paymentMethod: bookingData.paymentMethod || ''
    };
    
    // Add to Firestore
    const docRef = await db.collection('bookings').add(booking);
    
    // Log event
    trackEvent('booking_created', {
      bookingId: docRef.id,
      service: booking.service,
      price: booking.price
    });
    
    console.log('Booking saved successfully:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('Error saving booking:', error.message);
    throw new Error(`Failed to save booking: ${error.message}`);
  }
}

/**
 * Get details of a specific booking
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>} - Booking data
 */
export async function getBookingDetails(bookingId) {
  try {
    if (!bookingId) {
      throw new Error('Booking ID is required');
    }
    
    const doc = await db.collection('bookings').doc(bookingId).get();
    
    if (!doc.exists) {
      throw new Error('Booking not found');
    }
    
    return { id: doc.id, ...doc.data() };
    
  } catch (error) {
    console.error('Error fetching booking details:', error.message);
    throw error;
  }
}

/**
 * Update booking status and/or details
 * @param {string} bookingId - The booking ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export async function updateBookingStatus(bookingId, updates) {
  try {
    if (!bookingId) {
      throw new Error('Booking ID is required');
    }
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    // Fetch the booking to verify ownership or admin access
    const bookingRef = db.collection('bookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      throw new Error('Booking not found');
    }
    
    const booking = bookingDoc.data();
    const isAdmin = user.email && user.email === 'admin@handsdetailshop.com'; // Or check custom claims
    
    // Only allow user to update their own bookings, or allow admins to update any
    if (booking.userId !== user.uid && !isAdmin) {
      throw new Error('Unauthorized: You can only update your own bookings');
    }
    
    // Update the booking
    await bookingRef.update({
      ...updates,
      updatedAt: new Date()
    });
    
    // Log event
    trackEvent('booking_updated', {
      bookingId: bookingId,
      status: updates.status || booking.status
    });
    
    console.log('Booking updated successfully:', bookingId);
    
  } catch (error) {
    console.error('Error updating booking:', error.message);
    throw error;
  }
}

/**
 * Listen to real-time updates for bookings (admin dashboard)
 * @param {Function} onUpdate - Callback function when bookings change
 * @param {Object} filters - Filter options {userId, status, dateRange}
 * @returns {Function} - Unsubscribe function
 */
export function listenToBookings(onUpdate, filters = {}) {
  try {
    let query = db.collection('bookings');
    
    // Apply filters if provided
    if (filters.userId) {
      query = query.where('userId', '==', filters.userId);
    }
    
    if (filters.status) {
      query = query.where('status', '==', filters.status);
    }
    
    // Order by date descending (most recent first)
    query = query.orderBy('date', 'desc');
    
    // Set up real-time listener
    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        const bookings = [];
        snapshot.forEach((doc) => {
          bookings.push({ id: doc.id, ...doc.data() });
        });
        onUpdate(bookings);
      },
      (error) => {
        console.error('Error listening to bookings:', error.message);
        onUpdate([], error);
      }
    );
    
    return unsubscribe;
    
  } catch (error) {
    console.error('Error setting up booking listener:', error.message);
    throw error;
  }
}

/**
 * Get booking statistics (for dashboard)
 * @returns {Promise<Object>} - Statistics object
 */
export async function getBookingStats() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    // Check if user is admin
    const userDoc = await db.collection('users').doc(user.uid).get();
    const isAdmin = userDoc.data()?.role === 'admin';
    
    if (!isAdmin) {
      throw new Error('Unauthorized: Admin access required');
    }
    
    // Query all bookings for statistics
    const allBookingsSnapshot = await db.collection('bookings').get();
    const allBookings = [];
    let totalRevenue = 0;
    const statusCounts = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0
    };
    
    allBookingsSnapshot.forEach((doc) => {
      const booking = doc.data();
      allBookings.push({ id: doc.id, ...booking });
      
      // Count by status
      if (statusCounts.hasOwnProperty(booking.status)) {
        statusCounts[booking.status]++;
      }
      
      // Calculate revenue from completed bookings
      if (booking.status === 'completed') {
        totalRevenue += booking.price || 0;
      }
    });
    
    const stats = {
      totalBookings: allBookings.length,
      pendingBookings: statusCounts.pending,
      confirmedBookings: statusCounts.confirmed,
      completedBookings: statusCounts.completed,
      cancelledBookings: statusCounts.cancelled,
      totalRevenue: totalRevenue,
      conversionRate: allBookings.length > 0 
        ? ((statusCounts.completed / allBookings.length) * 100).toFixed(2)
        : '0',
      averageBookingValue: allBookings.length > 0
        ? (totalRevenue / allBookings.length).toFixed(2)
        : '0'
    };
    
    trackEvent('stats_viewed', stats);
    
    return stats;
    
  } catch (error) {
    console.error('Error fetching booking stats:', error.message);
    throw error;
  }
}

/**
 * Track custom events for analytics
 * @param {string} eventName - The event name
 * @param {Object} eventData - Event properties
 */
export function trackEvent(eventName, eventData = {}) {
  try {
    if (typeof firebase !== 'undefined' && firebase.analytics) {
      firebase.analytics().logEvent(eventName, {
        ...eventData,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.warn('Error tracking event:', error.message);
  }
}

/**
 * Get all bookings for current user
 * @returns {Promise<Array>} - Array of user's bookings
 */
export async function getUserBookings() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    const snapshot = await db.collection('bookings')
      .where('userId', '==', user.uid)
      .orderBy('date', 'desc')
      .get();
    
    const bookings = [];
    snapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    
    return bookings;
    
  } catch (error) {
    console.error('Error fetching user bookings:', error.message);
    throw error;
  }
}

/**
 * Cancel a booking
 * @param {string} bookingId - The booking ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<void>}
 */
export async function cancelBooking(bookingId, reason = '') {
  try {
    await updateBookingStatus(bookingId, {
      status: 'cancelled',
      cancellationReason: reason,
      cancelledAt: new Date()
    });
    
    trackEvent('booking_cancelled', {
      bookingId: bookingId,
      reason: reason
    });
    
  } catch (error) {
    console.error('Error cancelling booking:', error.message);
    throw error;
  }
}

/**
 * Export all bookings to CSV format (admin only)
 * @returns {Promise<string>} - CSV formatted string
 */
export async function exportBookingsToCSV() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    const userDoc = await db.collection('users').doc(user.uid).get();
    const isAdmin = userDoc.data()?.role === 'admin';
    
    if (!isAdmin) {
      throw new Error('Unauthorized: Admin access required');
    }
    
    const snapshot = await db.collection('bookings').get();
    
    if (snapshot.empty) {
      return ''; // No bookings to export
    }
    
    // Create CSV header
    const headers = [
      'Booking ID',
      'Customer Name',
      'Email',
      'Phone',
      'Service',
      'Date',
      'Time',
      'Vehicle',
      'Price',
      'Status',
      'Notes',
      'Created'
    ];
    
    // Create CSV rows
    const rows = [];
    snapshot.forEach((doc) => {
      const booking = doc.data();
      const vehicle = `${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model}`;
      const date = booking.date?.toDate?.() || booking.date;
      
      rows.push([
        doc.id,
        booking.userName,
        booking.userEmail,
        booking.userPhone,
        booking.service,
        date.toLocaleDateString(),
        booking.time,
        vehicle,
        booking.price.toFixed(2),
        booking.status,
        `"${booking.notes}"`,
        booking.createdAt?.toDate?.()?.toLocaleString() || ''
      ]);
    });
    
    // Combine headers and rows
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    trackEvent('bookings_exported', {
      bookingCount: rows.length
    });
    
    return csv;
    
  } catch (error) {
    console.error('Error exporting bookings:', error.message);
    throw error;
  }
}
