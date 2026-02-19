# Firebase Setup Guide
## Hands Detail Shop - Pittsburgh Auto Detailing

Complete guide to setting up and configuring Firebase for the Hands Detail Shop website.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Firestore Database Schema](#firestore-database-schema)
4. [Security Rules](#security-rules)
5. [Adding Firebase to HTML](#adding-firebase-to-html)
6. [Environment Variables](#environment-variables)
7. [Admin Dashboard Setup](#admin-dashboard-setup)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps](#next-steps)

---

## Prerequisites

Before setting up Firebase, ensure you have:

- A Google account
- Access to Google Cloud Console
- The Firebase project JavaScript files (will be generated in console)
- Node.js or npm knowledge (optional but helpful)
- VS Code or similar code editor

---

## Step-by-Step Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Project name: `hands-detail-shop` (or similar)
4. Select your country/region
5. Click "Create project"
6. Wait for project creation to complete (usually 1-2 minutes)

### Step 2: Register Your Web Application

1. In Firebase Console, click the **web icon** `</>`
2. App nickname: `Hands Detail Shop Website`
3. Check "Also set up Firebase Hosting for this app" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need this for `firebase-config.js`

### Step 3: Enable Firestore Database

1. Navigate to **Cloud Firestore** in left sidebar
2. Click **"Create database"**
3. Select region: **us-east-1** (or closest to Pittsburgh)
4. For production mode, select **"Production mode"**
5. Click **Enable**
6. You're now ready to create collections

### Step 4: Enable Authentication

1. Navigate to **Authentication** in left sidebar
2. Click **Get started**
3. Select **Email/Password**
4. Toggle "Enable" to ON
5. Click **Save**
6. (Optional) Enable other providers (Google, Facebook, etc.)

### Step 5: Enable Analytics (Optional)

1. Navigate to **Analytics** in left sidebar
2. Click **Settings** (gear icon)
3. Ensure analytics is enabled
4. Select your timezone and industry

### Step 6: Create Firestore Collections

#### Users Collection

1. In Cloud Firestore, click **Start collection**
2. Collection ID: `users`
3. Document ID: `(auto-id)`
4. Add fields:
   ```
   email (string) - user email
   name (string) - user full name
   phone (string) - contact number
   role (string) - "customer" or "admin"
   preferences (map) - {notifications: true, newsletter: false}
   createdAt (timestamp) - server timestamp
   updatedAt (timestamp) - server timestamp
   verified (boolean) - false
   ```

#### Bookings Collection

1. Click **Add collection**
2. Collection ID: `bookings`
3. Add fields:
   ```
   userId (string) - reference to user
   userEmail (string) - user's email
   userName (string) - customer name
   userPhone (string) - phone number
   service (string) - service type
   date (timestamp) - booking date
   time (string) - time in HH:MM format
   duration (number) - hours (default: 2)
   vehicle (map) - {make, model, year, color}
   price (number) - service cost
   status (string) - "pending", "confirmed", "completed", "cancelled"
   notes (string) - special requests
   paymentStatus (string) - "pending", "paid", "refunded"
   paymentMethod (string) - payment type
   createdAt (timestamp) - creation time
   updatedAt (timestamp) - last update time
   ```

#### Services Collection

1. Click **Add collection**
2. Collection ID: `services`
3. Add sample documents with fields:
   ```
   name (string) - service name
   description (string) - detailed description
   price (number) - base price
   duration (number) - typical duration in hours
   category (string) - "exterior", "interior", "premium"
   imageUrl (string) - service image
   ```

#### Reviews Collection

1. Click **Add collection**
2. Collection ID: `reviews`
3. Fields:
   ```
   userId (string) - reviewer's ID
   bookingId (string) - associated booking
   rating (number) - 1-5 stars
   comment (string) - review text
   createdAt (timestamp) - review date
   ```

---

## Firestore Database Schema

### Complete Data Model

```
Firebase Database
├── users/
│   ├── {uid}/
│   │   ├── email: "customer@example.com"
│   │   ├── name: "John Doe"
│   │   ├── phone: "(412) 123-4567"
│   │   ├── role: "customer"
│   │   ├── preferences: {
│   │   │   ├── notifications: true
│   │   │   └── newsletter: false
│   │   ├── createdAt: 2024-01-15
│   │   ├── verified: false
│   │   └── updatedAt: 2024-01-15
│   │
│   └── {admin_uid}/
│       ├── email: "admin@handsdetailshop.com"
│       ├── role: "admin"
│       └── ...
│
├── bookings/
│   ├── {bookingId}/
│   │   ├── userId: "{uid}"
│   │   ├── userEmail: "customer@example.com"
│   │   ├── userName: "John Doe"
│   │   ├── service: "Premium Exterior Detail"
│   │   ├── date: 2024-02-20
│   │   ├── time: "10:00"
│   │   ├── duration: 3
│   │   ├── vehicle: {
│   │   │   ├── make: "Toyota"
│   │   │   ├── model: "Camry"
│   │   │   ├── year: "2022"
│   │   │   └── color: "Black"
│   │   ├── price: 199.99
│   │   ├── status: "confirmed"
│   │   ├── notes: "Extra shine wax please"
│   │   ├── paymentStatus: "paid"
│   │   ├── createdAt: 2024-01-15
│   │   └── updatedAt: 2024-01-15
│   │
│   └── {bookingId2}/ ... more bookings
│
├── services/
│   ├── {serviceId}/
│   │   ├── name: "Premium Exterior Detail"
│   │   ├── description: "Complete exterior detailing with ceramic coat"
│   │   ├── price: 199.99
│   │   ├── duration: 3
│   │   ├── category: "premium"
│   │   └── imageUrl: "https://..."
│   │
│   └── {serviceId2}/ ... more services
│
└── reviews/
    └── {reviewId}/
        ├── userId: "{uid}"
        ├── bookingId: "{bookingId}"
        ├── rating: 5
        ├── comment: "Excellent service! Car looks amazing."
        └── createdAt: 2024-02-25
```

---

## Security Rules

### Firestore Security Rules

Replace the security rules in Firebase Console with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow users to read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.uid != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow authenticated users to create bookings
    match /bookings/{bookingId} {
      allow create: if request.auth.uid != null;
      allow read, update: if request.auth.uid == resource.data.userId || 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow anyone to read services
    match /services/{serviceId} {
      allow read: if true;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow users to write reviews for their bookings
    match /reviews/{reviewId} {
      allow create: if request.auth.uid != null;
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Steps to Add Security Rules

1. In Firebase Console, go to **Cloud Firestore**
2. Click **Rules** tab at the top
3. Replace all content with the rules above
4. Click **Publish** button
5. Confirm changes

---

## Adding Firebase to HTML

### 1. Add Firebase SDK to HTML

Add the following to your `index.html` in the `<head>` section:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"></script>

<!-- Your Firebase Configuration -->
<script src="firebase-config.js"></script>
<script src="firebase-auth.js" type="module"></script>
<script src="firebase-bookings.js" type="module"></script>
```

### 2. Update firebase-config.js

Copy your Firebase configuration from the Firebase Console (Step 2 above) and update:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

---

## Environment Variables

For production, use environment variables instead of hardcoding credentials:

### Create `.env` file

```
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### Update firebase-config.js to use env vars

```javascript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
```

---

## Admin Dashboard Setup

### Features

The admin dashboard provides:

- **Real-time Booking Table** - View all bookings updated live
- **Filter Options** - Filter by status (All, Pending, Confirmed, Completed)
- **Statistics Cards** - Total bookings, pending count, revenue, conversion rate
- **Booking Details Modal** - View complete booking information
- **Update Modal** - Change booking status and notes
- **Export to CSV** - Download all bookings as CSV file
- **Authentication** - Only admins can access
- **Responsive Design** - Works on mobile, tablet, desktop

### Making Your Account Admin

1. Go to Firebase Console
2. Navigate to **Authentication** → **Users**
3. Find your user
4. In the **Custom claims** section, click **Edit**
5. Add:
   ```json
   {
     "role": "admin"
   }
   ```
6. Alternatively, manually update Firestore:
   - Go to **Cloud Firestore** → **users** collection
   - Find your user document
   - Update `role` field to `"admin"`

### Accessing the Dashboard

1. Open `admin-dashboard.html` in your browser
2. Sign in with your admin account
3. Dashboard automatically loads all bookings
4. Use filters and search as needed

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **"Firebase not defined"** | Firebase SDK not loaded | Add Firebase SDK scripts to HTML before config.js |
| **"Access denied" error** | Security rules not configured | Apply security rules from this guide |
| **Bookings not appearing** | No data in database | Create test bookings or check collection names |
| **Auth state not persisting** | Persistence not enabled | Ensure `setPersistence(LOCAL)` in firebase-auth.js |
| **CORS errors** | Domain not authorized | Add your domain to Firebase Console → Settings → Authorized domains |
| **Real-time updates not working** | Listener not set up | Verify `listenToBookings()` is called and subscribed |
| **Firestore offline persistence error** | IndexedDB not available | Check browser privacy settings or use incognito mode |
| **Admin can't access dashboard** | User not marked as admin | Check Firestore `users` collection, verify `role: "admin"` |
| **CSV export fails** | Admin role not verified | Confirm user has `role: "admin"` in Firestore |
| **Email verification not sending** | SMTP not configured | Configure email in Firebase Console → Settings → Email templates |

---

## Security Best Practices

1. **Never commit Firebase credentials** - Use environment variables
2. **Enable HTTPS only** - Firebase requires secure connections
3. **Regularly review security rules** - Audit rules quarterly
4. **Use strong passwords** - Require minimum 8 characters with uppercase, lowercase, numbers
5. **Enable two-factor authentication** - For admin accounts
6. **Monitor billing** - Set up alerts in Google Cloud Console
7. **Backup data regularly** - Use Firestore export feature
8. **Restrict admin access** - Only necessary staff should have admin role

---

## Next Steps

1. **Implement Payment Processing**
   - Add Stripe or PayPal integration for payments
   - Store payment status in bookings collection
   - Send payment confirmation emails

2. **Email Notifications**
   - Set up SendGrid or Firebase Email for confirmation
   - Send booking reminders 24 hours before
   - Send admin notifications for new bookings

3. **SMS Notifications** (Optional)
   - Integrate Twilio for SMS reminders
   - Send confirmation texts to customers

4. **Analytics & Reporting**
   - Create analytics dashboard with charts
   - Track popular services
   - Monitor booking trends

5. **Mobile App** (Future)
   - Build mobile app using React Native or Flutter
   - Connect to same Firebase backend
   - Push notifications for bookings

6. **Integration with Scheduling**
   - Connect to Google Calendar
   - Sync with business calendar system
   - Auto-schedule based on availability

7. **Customer Portal**
   - Allow customers to view their bookings
   - Enable rescheduling and cancellations
   - Display booking history and reviews

---

## Contact & Support

For Firebase documentation: [Firebase Docs](https://firebase.google.com/docs)

For Hands Detail Shop support: Contact admin team

Last Updated: February 2024
Version: 1.0
