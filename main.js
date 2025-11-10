// Header scroll effect
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

mobileToggle.addEventListener('click', function () {
  this.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Close mobile menu when link clicked
document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', function () {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// Booking Modal Functions
function openBookingModal(preSelectedService = '') {
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  if (preSelectedService) {
    const serviceSelect = document.querySelector('#bookingForm select');
    if (serviceSelect) {
      const options = serviceSelect.querySelectorAll('option');
      options.forEach((option) => {
        if (option.textContent.toLowerCase().includes(preSelectedService.toLowerCase())) {
          option.selected = true;
        }
      });
    }
  }
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const phone = this.querySelector('input[type="tel"]').value;
  const service = this.querySelector('select').value;

  const squareDepositLink = 'https://square.link/u/vScfV4jK';
  const details = `${name} - ${phone} - ${service}`;

  window.open(squareDepositLink + `?note=${encodeURIComponent(details)}`, '_blank');

  setTimeout(() => {
    alert(
      `Payment window opened for $30 deposit.\n\nAfter payment, we'll contact you at ${phone} within 24 hours to confirm your appointment.`
    );
    closeBookingModal();
    this.reset();
  }, 500);
});

// Close modal when clicking outside
document.getElementById('bookingModal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeBookingModal();
  }
});
