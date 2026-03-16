exports.sendBookingConfirmation = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap) => {
    const booking = snap.data();
    // Email booking details with formatted date/time
    await transporter.sendMail({
      to: booking.userEmail,
      subject: `Booking Confirmed - ${booking.service}`,
      html: `Your appointment is scheduled for ${booking.date.toLocaleDateString()} at ${booking.time}`
    });
  });
