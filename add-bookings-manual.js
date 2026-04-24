// Script to manually add test bookings to Firestore via Admin SDK
// This file is sourced from functions/index.js setup

const admin = require('firebase-admin');

// Initialize Firebase if not already done
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'hands-detail',
    storageBucket: 'hands-detail.appspot.com'
  });
}

const firestore = admin.firestore();

// Service duration mapping (in hours)
const SERVICE_DURATIONS = {
  'ESSENTIAL DETAIL': 2.5,
  'EXECUTIVE DETAIL': 4.5,
  'SIGNATURE PRESTIGE': 6.5,
  'PRESIDENTIAL ELITE': 9,
  'ULTIMATE ARMOR': 13,
};

// Test bookings to add
const testBookings = [
  {
    customerName: 'Test Customer 1',
    customerEmail: 'test1@example.com',
    customerPhone: '(412) 555-0001',
    customerVehicle: '2024 BMW 3 Series',
    customerAddress: 'Aliquippa, PA',
    serviceType: 'EXECUTIVE DETAIL',
    servicePrice: '$165',
    appointmentDate: '2026-04-24',
    appointmentTime: '09:00',
    status: 'confirmed',
    paymentId: 'test_payment_001',
    amountCents: 3000,
  },
  {
    customerName: 'Test Customer 2',
    customerEmail: 'test2@example.com',
    customerPhone: '(412) 555-0002',
    customerVehicle: '2023 Mercedes C-Class',
    customerAddress: 'Pittsburgh, PA',
    serviceType: 'SIGNATURE PRESTIGE',
    servicePrice: '$325',
    appointmentDate: '2026-04-25',
    appointmentTime: '09:00',
    status: 'confirmed',
    paymentId: 'test_payment_002',
    amountCents: 3000,
  },
  {
    customerName: 'Test Customer 3',
    customerEmail: 'test3@example.com',
    customerPhone: '(412) 555-0003',
    customerVehicle: '2025 Audi A4',
    customerAddress: 'Gibsonia, PA',
    serviceType: 'EXECUTIVE DETAIL',
    servicePrice: '$165',
    appointmentDate: '2026-04-29',
    appointmentTime: '08:00',
    status: 'confirmed',
    paymentId: 'test_payment_003',
    amountCents: 3000,
  },
  {
    customerName: 'Test Customer 4',
    customerEmail: 'test4@example.com',
    customerPhone: '(412) 555-0004',
    customerVehicle: '2023 Audi A4',
    customerAddress: 'Gibsonia, PA',
    serviceType: 'EXECUTIVE DETAIL',
    servicePrice: '$165',
    appointmentDate: '2026-04-29',
    appointmentTime: '13:00',
    status: 'confirmed',
    paymentId: 'test_payment_004',
    amountCents: 3000,
  },
  {
    customerName: 'Test Customer 5',
    customerEmail: 'test5@example.com',
    customerPhone: '(412) 555-0005',
    customerVehicle: '2024 Lexus RX',
    customerAddress: 'Aliquippa, PA',
    serviceType: 'EXECUTIVE DETAIL',
    servicePrice: '$165',
    appointmentDate: '2026-05-01',
    appointmentTime: '10:00',
    status: 'confirmed',
    paymentId: 'test_payment_005',
    amountCents: 3000,
  },
  {
    customerName: 'Test Customer 6',
    customerEmail: 'test6@example.com',
    customerPhone: '(412) 555-0006',
    customerVehicle: '2025 Porsche 911',
    customerAddress: 'Pittsburgh, PA',
    serviceType: 'SIGNATURE PRESTIGE',
    servicePrice: '$325',
    appointmentDate: '2026-05-21',
    appointmentTime: '09:00',
    status: 'confirmed',
    paymentId: 'test_payment_006',
    amountCents: 3000,
  },
];

async function addTestBookings() {
  try {
    console.log('🚀 Adding test bookings to Firestore...\n');

    for (const booking of testBookings) {
      const docRef = await firestore.collection('bookings').add({
        ...booking,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        duration: SERVICE_DURATIONS[booking.serviceType] || 4,
      });

      console.log(`✅ Added booking: ${booking.serviceType} on ${booking.appointmentDate} at ${booking.appointmentTime}`);
      console.log(`   Location: ${booking.customerAddress}`);
      console.log(`   Duration: ~${SERVICE_DURATIONS[booking.serviceType] || 4} hours\n`);
    }

    console.log(`\n✅ Successfully added ${testBookings.length} test bookings!`);
    console.log('📅 Visit schedule.html to see the bookings displayed on the calendar.');
    
  } catch (error) {
    console.error('❌ Error adding bookings:', error);
    process.exit(1);
  } finally {
    if (admin.apps.length) {
      await admin.app().delete();
    }
  }
}

// Run if executed directly
if (require.main === module) {
  addTestBookings().then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { addTestBookings };
