exports.sendBookingReminders = functions.pubsub
  .schedule('every 1 hours').onRun(async (context) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // Find bookings for tomorrow and email customers
  });