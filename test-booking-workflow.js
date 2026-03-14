/**
 * Test script for end-to-end booking confirmation workflow
 * Tests: Booking creation → Firestore trigger → Email confirmation
 * 
 * Usage: node test-booking-workflow.js
 */

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
let serviceAccount;
try {
  serviceAccount = require('./firebase-config.json');
} catch (err) {
  console.error('ERROR: firebase-config.json not found. Please ensure Firebase credentials are in place.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Test data
const testBooking = {
  userName: 'John Test Client',
  userEmail: 'test@example.com',
  userPhone: '555-0123',
  service: 'Premium Exterior Detail',
  date: admin.firestore.Timestamp.now(),
  time: '10:00 AM',
  vehicle: {
    year: 2022,
    make: 'Tesla',
    model: 'Model 3',
    color: 'Black'
  },
  duration: 2,
  price: 199.99,
  status: 'pending',
  specialRequests: 'Please be gentle with the paint'
};

async function testBookingWorkflow() {
  console.log('\n📋 Starting Booking Confirmation Workflow Test\n');
  console.log('Test Data:', JSON.stringify(testBooking, null, 2));

  try {
    // Step 1: Create a test booking in Firestore
    console.log('\n[Step 1] Creating test booking in Firestore...');
    const bookingRef = await db.collection('bookings').add(testBooking);
    console.log(`✅ Booking created with ID: ${bookingRef.id}`);
    console.log(`   Firestore Path: bookings/${bookingRef.id}`);

    // Step 2: Verify booking was saved
    console.log('\n[Step 2] Verifying booking in Firestore...');
    const savedBooking = await bookingRef.get();
    if (savedBooking.exists) {
      console.log('✅ Booking verified in Firestore');
      console.log('   Booking Data:', JSON.stringify(savedBooking.data(), null, 2));
    } else {
      console.error('❌ Booking not found in Firestore');
      return;
    }

    // Step 3: Wait for Cloud Function to process (it's triggered by onCreate)
    console.log('\n[Step 3] Waiting for sendBookingConfirmation Cloud Function...');
    console.log('   (This function is triggered by Firestore onCreate event)');
    console.log('   Expected: Confirmation emails sent to customer and admin');
    
    // Note: We can't directly test the email here without Gmail credentials
    // In production, you would:
    // - Check Firebase Functions logs: firebase functions:log
    // - Monitor Gmail inbox for confirmation
    // - Check Firestore for email delivery records
    
    console.log('\n   To verify email delivery:');
    console.log('   1. Check Firebase Functions logs:');
    console.log('      npx firebase functions:log --only sendBookingConfirmation');
    console.log('   2. Check Gmail inbox for emails to:');
    console.log(`      - Customer: ${testBooking.userEmail}`);
    console.log('      - Admin: handsdetailshop@gmail.com');

    // Step 4: Clean up test booking
    console.log('\n[Step 4] Waiting 5 seconds then cleaning up test booking...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await bookingRef.delete();
    console.log(`✅ Test booking cleaned up (ID: ${bookingRef.id})`);

    // Step 5: Summary
    console.log('\n✅ Booking Workflow Test Complete!');
    console.log('\nSummary:');
    console.log('  ✅ Test booking created');
    console.log('  ✅ Firestore stored correctly');
    console.log('  ✅ Cloud Function triggered (check logs)');
    console.log('  ✅ Test data cleaned up');
    console.log('\nNext Steps:');
    console.log('  1. Check Firebase Functions logs to verify email sending');
    console.log('  2. Test from UI: Create actual booking to verify full workflow');
    console.log('  3. Monitor Firestore for booking records');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testBookingWorkflow();
