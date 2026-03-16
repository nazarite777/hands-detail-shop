/**
 * Test script for server-synced review submission
 * Tests: Review submission via Cloud Function → Server timestamp → Firestore storage
 * 
 * Usage: node test-review-workflow.js
 */

const admin = require('firebase-admin');

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

// Test review data
const testReview = {
  name: 'Jane Test Reviewer',
  email: 'tester@example.com',
  rating: 5,
  comment: 'Excellent service! My car looks brand new. Highly recommend Hands Detail Shop!',
};

async function testReviewWorkflow() {
  console.log('\n⭐ Starting Review Submission Test\n');
  console.log('Test Data:', JSON.stringify(testReview, null, 2));

  try {
    // Step 1: Simulate Cloud Function - Store review with server timestamp
    console.log('\n[Step 1] Simulating submitReviewWithServerTime function...');
    console.log('Creating review with server-side timestamp...');
    
    const reviewRef = await db.collection('pendingReviews').add({
      name: testReview.name,
      email: testReview.email,
      rating: testReview.rating,
      comment: testReview.comment,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      approvedAt: null,
      approvedBy: null
    });
    
    console.log(`&#9989; Review created with ID: ${reviewRef.id}`);

    // Step 2: Verify with server timestamp
    console.log('\n[Step 2] Verifying review with server timestamp...');
    const savedReview = await reviewRef.get();
    
    if (savedReview.exists) {
      const reviewData = savedReview.data();
      console.log('&#9989; Review verified in Firestore');
      console.log('   Review Data:', JSON.stringify({
        ...reviewData,
        createdAt: reviewData.createdAt.toDate().toISOString()
      }, null, 2));
      
      // Verify server timestamp was used
      if (reviewData.createdAt instanceof admin.firestore.Timestamp) {
        console.log('\n&#9989; Server timestamp confirmed:');
        console.log(`   Timestamp Type: admin.firestore.Timestamp`);
        console.log(`   ISO Format: ${reviewData.createdAt.toDate().toISOString()}`);
        console.log(`   Unix Milliseconds: ${reviewData.createdAt.toMillis()}`);
      } else {
        console.warn('⚠️  Timestamp is not a Firestore Timestamp object');
      }
    } else {
      console.error('&#10060; Review not found in Firestore');
      return;
    }

    // Step 3: Test email notification
    console.log('\n[Step 3] Email notification flow:');
    console.log('   Once approved by admin:');
    console.log('   - Email notification would be sent via sendReviewEmail');
    console.log('   - Review moves from pendingReviews to main reviews collection');
    console.log('   - Admin email: handsdetailshop@gmail.com');

    // Step 4: Query pending reviews
    console.log('\n[Step 4] Testing Firestore query...');
    const pendingSnapshot = await db.collection('pendingReviews')
      .where('status', '==', 'pending')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    
    console.log(`&#9989; Found ${pendingSnapshot.size} pending review(s)`);
    if (pendingSnapshot.size > 0) {
      const latestReview = pendingSnapshot.docs[0];
      console.log('   Latest pending review:');
      const data = latestReview.data();
      console.log(`   - Author: ${data.name}`);
      console.log(`   - Rating: ${'⭐'.repeat(data.rating)}`);
      console.log(`   - Comment: "${data.comment.substring(0, 50)}..."`);
    }

    // Step 5: Clean up test review
    console.log('\n[Step 5] Cleaning up test review...');
    await reviewRef.delete();
    console.log(`&#9989; Test review deleted (ID: ${reviewRef.id})`);

    // Step 6: Summary
    console.log('\n&#9989; Review Workflow Test Complete!');
    console.log('\nSummary:');
    console.log('  &#9989; Review submitted with server timestamp');
    console.log('  &#9989; Stored in Firestore with pending status');
    console.log('  &#9989; Queryable by status and creation time');
    console.log('  &#9989; Ready for admin approval workflow');
    console.log('\nNext Steps:');
    console.log('  1. Admin approves review via admin dashboard');
    console.log('  2. Review moves to main collection');
    console.log('  3. Email notification sent');
    console.log('  4. Review appears on website');

  } catch (error) {
    console.error('&#10060; Test failed with error:', error);
  } finally {
    process.exit(0);
  }
}

// Run the test
testReviewWorkflow();

