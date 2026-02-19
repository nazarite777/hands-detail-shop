/**
 * Firebase Configuration & Initialization
 * Hands Detail Shop - Pittsburgh Auto Detailing
 * 
 * This file initializes Firebase with all necessary services:
 * - Firestore Database (for bookings, users, services)
 * - Authentication (user account management)
 * - Analytics (event tracking)
 * - Real-time Database (optional, for live updates)
 * 
 * Security rules should be configured in Firebase Console to protect sensitive data.
 */

// Firebase configuration object
// Replace with your Firebase project credentials from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
let app;
let db;
let auth;
let analytics;
let realtimeDb;

try {
  app = firebase.initializeApp(firebaseConfig);
  
  // ============================================
  // FIRESTORE DATABASE INITIALIZATION
  // ============================================
  // Firestore is used for structured data storage
  // (bookings, user profiles, services, reviews)
  
  db = firebase.firestore();
  
  // Enable offline persistence for Firestore
  // Allows users to access cached data and queue operations when offline
  db.enablePersistence()
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support all of the features required to enable persistence.');
      }
    });
  
  // Set Firestore settings for enhanced performance
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
  
  // ============================================
  // AUTHENTICATION INITIALIZATION
  // ============================================
  // Firebase Auth manages user sign-up, sign-in, and session management
  
  auth = firebase.auth();
  
  // Set authentication persistence to LOCAL (survives browser close)
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
      console.error('Error setting persistence:', error.message);
    });
  
  // ============================================
  // ANALYTICS INITIALIZATION
  // ============================================
  // Analytics tracks user interactions for business insights
  
  if (firebase.analytics.isSupported()) {
    analytics = firebase.analytics();
    console.log('Firebase Analytics enabled');
  } else {
    console.warn('Analytics not supported in this browser');
  }
  
  // ============================================
  // REAL-TIME DATABASE INITIALIZATION (Optional)
  // ============================================
  // Real-time Database can be used for live notifications
  // and real-time updates (e.g., booking status changes)
  
  try {
    realtimeDb = firebase.database();
    console.log('Real-time Database initialized');
  } catch (err) {
    console.warn('Real-time Database not available:', err.message);
  }
  
  console.log('Firebase initialized successfully');
  
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  throw new Error('Failed to initialize Firebase. Check configuration.');
}

/**
 * FIRESTORE COLLECTIONS STRUCTURE
 * 
 * users/
 *   {uid}/
 *     - email: string
 *     - name: string
 *     - phone: string
 *     - createdAt: timestamp
 *     - preferences: object
 *     - role: string (customer, admin)
 * 
 * bookings/
 *   {bookingId}/
 *     - userId: string
 *     - service: string
 *     - date: timestamp
 *     - time: string
 *     - duration: number
 *     - vehicle: object
 *     - price: number
 *     - status: string (pending, confirmed, completed, cancelled)
 *     - notes: string
 *     - createdAt: timestamp
 *     - updatedAt: timestamp
 * 
 * services/
 *   {serviceId}/
 *     - name: string
 *     - description: string
 *     - price: number
 *     - duration: number
 *     - category: string
 * 
 * reviews/
 *   {reviewId}/
 *     - userId: string
 *     - bookingId: string
 *     - rating: number
 *     - comment: string
 *     - createdAt: timestamp
 */

/**
 * Export Firebase services for use in other modules
 */
export { app, db, auth, analytics, realtimeDb };

/**
 * Utility function to check Firebase connection status
 */
export function isFirebaseInitialized() {
  return app && db && auth;
}

/**
 * Utility function to get current Firebase user
 */
export function getCurrentAuthUser() {
  return auth.currentUser;
}

/**
 * Utility function to access Firestore
 */
export function getFirestore() {
  return db;
}

/**
 * Utility function to access Auth
 */
export function getAuth() {
  return auth;
}

/**
 * Utility function to track custom events
 */
export function trackCustomEvent(eventName, eventData = {}) {
  try {
    if (analytics) {
      firebase.analytics().logEvent(eventName, eventData);
    }
  } catch (error) {
    console.warn('Error tracking event:', error.message);
  }
}
