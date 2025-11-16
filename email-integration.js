/**
 * Email service integration using EmailJS
 * Setup: Create account at emailjs.com and add your service/template IDs below
 */

// EmailJS Configuration (update with your actual IDs)
const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',  // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY'    // Replace with your EmailJS public key
};

/**
 * Initialize EmailJS
 */
function initEmailJS() {
  if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAIL_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
  }
}

/**
 * Send email via EmailJS
 * @param {Object} formData - Form data to send
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
function sendEmail(formData, onSuccess, onError) {
  if (EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS not configured. Using fallback (console log)');
    console.log('Email would be sent with data:', formData);

    // Fallback: Show success message and mailto link
    if (onSuccess) {
      onSuccess({
        text: 'EmailJS not configured in production. Opening default email client...'
      });
    }

    // Open mailto as fallback
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      'Name: ' + formData.name + '\n' +
      'Email: ' + formData.email + '\n' +
      'Phone: ' + (formData.phone || 'Not provided') + '\n' +
      'Message: ' + formData.message
    );

    window.location.href = 'mailto:handsdetailshop@gmail.com?subject=' + subject + '&body=' + body;
    return;
  }

  // Send via EmailJS
  emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, formData)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      if (onSuccess) onSuccess(response);
    }, function(error) {
      console.error('Email sending failed:', error);
      if (onError) onError(error);
    });
}

/**
 * Handle contact form submission
 */
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Collect form data
  const formData = {
    name: form.querySelector('input[name="name"]')?.value || form.querySelector('input[placeholder*="name"]')?.value,
    email: form.querySelector('input[name="email"]')?.value || form.querySelector('input[type="email"]')?.value,
    phone: form.querySelector('input[name="phone"]')?.value || form.querySelector('input[type="tel"]')?.value,
    subject: form.querySelector('input[name="subject"]')?.value || 'Contact Form Submission',
    message: form.querySelector('textarea')?.value,
    vehicle: form.querySelector('input[name="vehicle"]')?.value || '',
    service: form.querySelector('select[name="service"]')?.value || '',
    date: form.querySelector('input[type="date"]')?.value || ''
  };

  // Validate required fields
  if (!formData.name || !formData.message) {
    alert('Please fill in all required fields');
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    return;
  }

  // Send email
  sendEmail(
    formData,
    // Success callback
    function(response) {
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.style.cssText = 'position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #4caf50, #66bb6a); color: white; padding: 20px 40px; border-radius: 15px; box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4); z-index: 10000; font-size: 1.1rem; font-weight: 600;';
      successDiv.textContent = '✓ Message sent successfully! We will contact you soon.';
      document.body.appendChild(successDiv);

      // Reset form
      form.reset();

      // Remove success message after 4 seconds
      setTimeout(() => {
        successDiv.style.transition = 'opacity 0.5s ease';
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 500);
      }, 4000);

      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    },
    // Error callback
    function(error) {
      alert('Failed to send message. Please call us at (412) 947-6098 or try again later.');
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  );
}

// Initialize on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();

    // Attach to all forms with class 'contact-form' or id 'contactForm'
    const forms = document.querySelectorAll('.contact-form, #contactForm, #bookingForm');
    forms.forEach(form => {
      form.addEventListener('submit', handleContactForm);
    });
  });
}
