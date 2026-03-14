exports.cleanupOldPendingReviews = functions.pubsub
  .schedule('every 24 hours').onRun(async (context) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    // Delete old pending reviews from localStorage via scheduled trigger
  });