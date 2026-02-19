/**
 * Firebase Authentication Module
 * Hands Detail Shop - Pittsburgh Auto Detailing
 * 
 * Handles user authentication and account management:
 * - Sign-up with email and password
 * - Sign-in/Login
 * - Sign-out/Logout
 * - Password reset
 * - Profile management
 * - Session persistence
 * - User role management
 * - Account deletion
 */

import { auth, db } from './firebase-config.js';

/**
 * Sign up a new user with email and password
 * @param {string} email - User email address
 * @param {string} password - User password (minimum 6 characters)
 * @param {Object} profileData - Additional profile information
 * @returns {Promise<Object>} - User object with uid and email
 */
export async function signUpUser(email, password, profileData = {}) {
  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    // Create user account
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update user profile with display name if provided
    if (profileData.name) {
      await user.updateProfile({
        displayName: profileData.name
      });
    }
    
    // Create user document in Firestore
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      name: profileData.name || '',
      phone: profileData.phone || '',
      role: 'customer', // Default role
      preferences: {
        notifications: true,
        newsletter: profileData.newsletter || false
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false
    });
    
    // Send verification email
    await user.sendEmailVerification();
    
    // Track event
    trackAuthEvent('signup', { email: email });
    
    console.log('User registered successfully:', user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    
  } catch (error) {
    console.error('Sign-up error:', error.message);
    throw new Error(`Sign-up failed: ${error.message}`);
  }
}

/**
 * Sign in user with email and password
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<Object>} - User object with uid and email
 */
export async function signInUser(email, password) {
  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Sign in with email and password
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Track event
    trackAuthEvent('signin', { email: email });
    
    console.log('User signed in successfully:', user.uid);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    
  } catch (error) {
    console.error('Sign-in error:', error.message);
    
    // Provide specific error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled');
    }
    
    throw new Error(`Sign-in failed: ${error.message}`);
  }
}

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export async function signOutUser() {
  try {
    const user = auth.currentUser;
    const email = user?.email;
    
    await auth.signOut();
    
    // Track event
    if (email) {
      trackAuthEvent('signout', { email: email });
    }
    
    console.log('User signed out successfully');
    
  } catch (error) {
    console.error('Sign-out error:', error.message);
    throw new Error(`Sign-out failed: ${error.message}`);
  }
}

/**
 * Get current authenticated user
 * @returns {Object|null} - User object or null if not authenticated
 */
export function getCurrentUser() {
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber
  };
}

/**
 * Send password reset email
 * @param {string} email - User email address
 * @returns {Promise<void>}
 */
export async function sendPasswordReset(email) {
  try {
    if (!email) {
      throw new Error('Email address is required');
    }
    
    // Send password reset email
    await auth.sendPasswordResetEmail(email, {
      url: window.location.origin,
      handleCodeInApp: true
    });
    
    // Track event
    trackAuthEvent('password_reset_requested', { email: email });
    
    console.log('Password reset email sent to:', email);
    
  } catch (error) {
    console.error('Password reset error:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address');
    }
    
    throw new Error(`Password reset failed: ${error.message}`);
  }
}

/**
 * Update user profile information
 * @param {string} displayName - User's display name
 * @param {string} photoURL - User's profile photo URL
 * @returns {Promise<Object>} - Updated user object
 */
export async function updateUserProfile(displayName, photoURL = null) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    // Update Auth profile
    const updateData = {};
    if (displayName) {
      updateData.displayName = displayName;
    }
    if (photoURL) {
      updateData.photoURL = photoURL;
    }
    
    await user.updateProfile(updateData);
    
    // Update Firestore user document
    const userData = {};
    if (displayName) {
      userData.name = displayName;
    }
    userData.updatedAt = new Date();
    
    await db.collection('users').doc(user.uid).update(userData);
    
    // Track event
    trackAuthEvent('profile_updated', { uid: user.uid });
    
    console.log('User profile updated successfully');
    
    return getCurrentUser();
    
  } catch (error) {
    console.error('Profile update error:', error.message);
    throw new Error(`Profile update failed: ${error.message}`);
  }
}

/**
 * Get user's booking history
 * @returns {Promise<Array>} - Array of user's bookings
 */
export async function getUserBookingHistory() {
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
      bookings.push({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.() || doc.data().date
      });
    });
    
    console.log(`Retrieved ${bookings.length} bookings for user`);
    
    return bookings;
    
  } catch (error) {
    console.error('Error fetching booking history:', error.message);
    throw error;
  }
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} - Unsubscribe function
 */
export function onAuthStateChanged(callback) {
  try {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in
          callback({
            isLoggedIn: true,
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified
            }
          });
        } else {
          // User is signed out
          callback({
            isLoggedIn: false,
            user: null
          });
        }
      },
      (error) => {
        console.error('Auth state error:', error.message);
        callback({
          isLoggedIn: false,
          error: error.message
        });
      }
    );
    
    return unsubscribe;
    
  } catch (error) {
    console.error('Error setting up auth listener:', error.message);
    throw error;
  }
}

/**
 * Check if user is admin
 * @returns {Promise<boolean>}
 */
export async function isUserAdmin() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      return false;
    }
    
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (!userDoc.exists) {
      return false;
    }
    
    return userDoc.data().role === 'admin';
    
  } catch (error) {
    console.error('Error checking admin status:', error.message);
    return false;
  }
}

/**
 * Delete user account and all associated data
 * @param {string} password - User's password (required for security)
 * @returns {Promise<void>}
 */
export async function deleteUserAccount(password) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    if (!password) {
      throw new Error('Password is required to delete account');
    }
    
    // Re-authenticate user (required for security-sensitive operations)
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    
    await user.reauthenticateWithCredential(credential);
    
    // Delete user document from Firestore
    await db.collection('users').doc(user.uid).delete();
    
    // Delete all user's bookings
    const bookingsSnapshot = await db.collection('bookings')
      .where('userId', '==', user.uid)
      .get();
    
    const batch = db.batch();
    bookingsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    // Delete reviews
    const reviewsSnapshot = await db.collection('reviews')
      .where('userId', '==', user.uid)
      .get();
    
    const batch2 = db.batch();
    reviewsSnapshot.forEach((doc) => {
      batch2.delete(doc.ref);
    });
    await batch2.commit();
    
    // Delete user auth account
    await user.delete();
    
    // Track event
    trackAuthEvent('account_deleted', { uid: user.uid });
    
    console.log('User account deleted successfully');
    
  } catch (error) {
    console.error('Account deletion error:', error.message);
    
    if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password');
    } else if (error.code === 'auth/requires-recent-login') {
      throw new Error('Please sign in again before deleting your account');
    }
    
    throw new Error(`Account deletion failed: ${error.message}`);
  }
}

/**
 * Send email verification
 * @returns {Promise<void>}
 */
export async function sendEmailVerification() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    if (user.emailVerified) {
      throw new Error('Email is already verified');
    }
    
    await user.sendEmailVerification({
      url: window.location.origin,
      handleCodeInApp: true
    });
    
    console.log('Verification email sent');
    
  } catch (error) {
    console.error('Email verification error:', error.message);
    throw error;
  }
}

/**
 * Reload user data from Firebase
 * @returns {Promise<void>}
 */
export async function reloadUserData() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated');
    }
    
    await user.reload();
    console.log('User data reloaded');
    
  } catch (error) {
    console.error('Error reloading user data:', error.message);
    throw error;
  }
}

/**
 * Track authentication-related events
 * @param {string} eventName - Event name
 * @param {Object} eventData - Event properties
 */
function trackAuthEvent(eventName, eventData = {}) {
  try {
    if (typeof firebase !== 'undefined' && firebase.analytics) {
      firebase.analytics().logEvent(eventName, eventData);
    }
  } catch (error) {
    console.warn('Error tracking auth event:', error.message);
  }
}
