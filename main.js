// ===== UTILITY FUNCTIONS =====

/**
 * Sanitize user input to prevent XSS
 * @param {string} str - Input string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeInput(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
}

/**
 * Validate name (letters, spaces, hyphens only)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid
 */
function validateName(name) {
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
}

/**
 * Show inline error message on form field
 * @param {HTMLElement} field - Input field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
  // Remove existing error
  const existingError = field.parentElement.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }

  // Add error styling
  field.style.borderColor = '#ff5252';

  // Create and insert error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.color = '#ff5252';
  errorDiv.style.fontSize = '0.85rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

/**
 * Clear error message from form field
 * @param {HTMLElement} field - Input field
 */
function clearFieldError(field) {
  field.style.borderColor = '';
  const existingError = field.parentElement.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// ===== HEADER SCROLL EFFECT =====

window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ===== MOBILE MENU =====

const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
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
}

// ===== SMOOTH SCROLLING =====

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

// ===== JUKEBOX PLAYER FUNCTIONALITY =====

let currentTrackIndex = 0;
let isPlaying = false;
let playlist = [];

async function initializeJukebox() {
  try {
    const jukebox = document.getElementById('jukebox');
    if (!jukebox) {
      console.warn('🎵 Jukebox: HTML element not found');
      return;
    }

    console.log('🎵 Jukebox: Starting initialization');

    // Use embedded audio config first, then try to fetch
    let audioConfig = window.AUDIO_CONFIG;
    
    if (!audioConfig) {
      console.log('🎵 Jukebox: No embedded config, attempting to fetch');
      
      // Fetch with timeout
      let response;
      let filePath = '/audio-urls.json';
      
      console.log('🎵 Jukebox: Attempting to fetch from', filePath);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        response = await fetch(filePath, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (e) {
        clearTimeout(timeoutId);
        throw new Error('Could not load audio configuration from file');
      }
      
      if (!response.ok) {
        throw new Error(`Failed to load audio-urls.json: HTTP ${response.status}`);
      }
      
      audioConfig = await response.json();
    }
    
    playlist = audioConfig.songs || [];

    console.log('🎵 Jukebox: Loaded', playlist.length, 'songs');

    if (playlist.length === 0) {
      console.warn('🎵 Jukebox: No songs in playlist');
      const displayName = jukebox.querySelector('.track-name');
      if (displayName) displayName.textContent = '❌ No songs available';
      return;
    }

    // Set up jukebox elements
    const displayName = jukebox.querySelector('.jukebox-display .track-name') || createDisplayElement(jukebox);
    const playBtn = jukebox.querySelector('.btn-play');
    const nextBtn = jukebox.querySelector('.btn-next');
    const prevBtn = jukebox.querySelector('.btn-prev');
    const playlistDiv = jukebox.querySelector('.jukebox-playlist');
    const minimizeBtn = jukebox.querySelector('.jukebox-minimize');
    const audioElement = document.getElementById('jukeboxAudio') || createAudioElement();

    // Create audio element if not exists
    if (!document.getElementById('jukeboxAudio')) {
      document.body.appendChild(audioElement);
    }

    // Load first track
    loadTrack(0, displayName, audioElement);

    // Play button
    if (playBtn) {
      playBtn.addEventListener('click', () => togglePlayPause(playBtn, audioElement, displayName));
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => nextTrack(displayName, audioElement, playBtn));
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', () => prevTrack(displayName, audioElement, playBtn));
    }

    // Minimize button
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        jukebox.classList.toggle('minimized');
        console.log('🎵 Jukebox: Toggled minimized');
      });
    }

    // Populate playlist
    if (playlistDiv) {
      populatePlaylist(playlistDiv, audioElement, displayName, playBtn);
    }

    // Update display when track ends
    audioElement.addEventListener('ended', () => {
      nextTrack(displayName, audioElement, playBtn);
    });

    console.log('🎵 Jukebox: Initialized successfully');

  } catch (error) {
    console.error('🎵 Jukebox: Error initializing jukebox:', error.message);
    console.error('Error stack:', error.stack);
    
    // Show error in UI
    const jukebox = document.getElementById('jukebox');
    if (jukebox) {
      const displayName = jukebox.querySelector('.track-name');
      if (displayName) {
        displayName.textContent = `❌ Error: ${error.message}`;
      }
    }
  }
}

function createAudioElement() {
  const audio = document.createElement('audio');
  audio.id = 'jukeboxAudio';
  audio.crossOrigin = 'anonymous';
  return audio;
}

function createDisplayElement(jukebox) {
  let display = jukebox.querySelector('.jukebox-display');
  if (!display) {
    display = document.createElement('div');
    display.className = 'jukebox-display';
    jukebox.querySelector('.jukebox-content').prepend(display);
  }
  let trackName = display.querySelector('.track-name');
  if (!trackName) {
    trackName = document.createElement('div');
    trackName.className = 'track-name';
    display.appendChild(trackName);
  }
  return trackName;
}

function loadTrack(index, displayElement, audioElement) {
  if (index < 0 || index >= playlist.length) return;
  
  currentTrackIndex = index;
  const track = playlist[index];
  
  audioElement.src = track.firebaseUrl;
  displayElement.textContent = `🎵 ${track.title} - ${track.artist}`;
}

function togglePlayPause(btn, audioElement, displayElement) {
  if (isPlaying) {
    audioElement.pause();
    btn.textContent = '▶ Play';
    isPlaying = false;
  } else {
    audioElement.play();
    btn.textContent = '⏸ Pause';
    isPlaying = true;
  }
}

function nextTrack(displayElement, audioElement, playBtn) {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex, displayElement, audioElement);
  if (isPlaying) {
    audioElement.play();
  }
}

function prevTrack(displayElement, audioElement, playBtn) {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex, displayElement, audioElement);
  if (isPlaying) {
    audioElement.play();
  }
}

function populatePlaylist(container, audioElement, displayElement, playBtn) {
  container.innerHTML = '';
  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (index === currentTrackIndex ? ' active' : '');
    item.innerHTML = `<span class="playlist-number">${index + 1}</span><span class="playlist-title">${track.title}</span>`;
    item.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(index, displayElement, audioElement);
      audioElement.play();
      playBtn.textContent = '⏸ Pause';
      isPlaying = true;
      updatePlaylistUI(container);
    });
    container.appendChild(item);
  });
}

function updatePlaylistUI(container) {
  container.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.classList.toggle('active', index === currentTrackIndex);
  });
}

// ===== MODAL MANAGEMENT =====

/**
 * Open booking modal
 * @param {string} preSelectedService - Pre-select a service (optional)
 */
function openBookingModal(preSelectedService = '') {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus management for accessibility
  const firstInput = modal.querySelector('input, select, textarea');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }

  // Pre-select service if provided
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

/**
 * Close booking modal
 */
function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';

  // Clear any error messages
  modal.querySelectorAll('.field-error').forEach((error) => error.remove());
  modal.querySelectorAll('input, select, textarea').forEach((field) => {
    field.style.borderColor = '';
  });
}

// ===== KEYBOARD ACCESSIBILITY =====

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('bookingModal');
    if (modal && modal.classList.contains('active')) {
      closeBookingModal();
    }
  }
});

// ===== FORM VALIDATION & SUBMISSION =====

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  // Real-time validation on blur
  const nameInput = bookingForm.querySelector('input[type="text"]');
  const phoneInput = bookingForm.querySelector('input[type="tel"]');

  if (nameInput) {
    nameInput.addEventListener('blur', function () {
      if (!this.value.trim()) {
        showFieldError(this, 'Please enter your name');
      } else if (!validateName(this.value)) {
        showFieldError(this, 'Please enter a valid name (letters only)');
      } else {
        clearFieldError(this);
      }
    });

    nameInput.addEventListener('input', function () {
      if (this.value.trim()) {
        clearFieldError(this);
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', function () {
      if (!this.value.trim()) {
        showFieldError(this, 'Please enter your phone number');
      } else if (!validatePhone(this.value)) {
        showFieldError(this, 'Please enter a valid phone number (10+ digits)');
      } else {
        clearFieldError(this);
      }
    });

    phoneInput.addEventListener('input', function () {
      if (this.value.trim()) {
        clearFieldError(this);
      }
    });
  }

  // Form submission with validation
  bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Determine if this is a mechanical services form or regular booking form
    const isMechanicalForm = document.querySelectorAll('input[name="services"]').length > 0;

    if (isMechanicalForm) {
      // Handle Mechanical Services Booking
      await handleMechanicalBooking(this);
    } else {
      // Handle Original Booking Flow
      handleOriginalBooking(this);
    }
  });
}

/**
 * Handle mechanical services booking submission
 */
async function handleMechanicalBooking(form) {
  const nameField = form.querySelector('input[type="text"][placeholder*="John"]') || form.querySelector('input[type="text"]');
  const phoneField = form.querySelector('input[type="tel"]');
  const emailField = form.querySelector('input[type="email"]');
  const addressField = form.querySelector('input[type="text"][placeholder*="St,"]') || Array.from(form.querySelectorAll('input[type="text"]')).find(f => f.placeholder.includes('Pittsburgh'));
  const makeField = Array.from(form.querySelectorAll('input[type="text"]')).find(f => f.placeholder.includes('Honda'));
  const modelField = Array.from(form.querySelectorAll('input[type="text"]')).find(f => f.placeholder.includes('Accord'));
  const yearField = form.querySelector('input[type="number"][placeholder="2020"]');
  const mileageField = form.querySelector('input[type="number"][placeholder="65000"]');
  const notesField = form.querySelector('textarea');
  const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');

  let isValid = true;

  // Validate required fields
  if (!nameField?.value.trim()) {
    showFieldError(nameField, 'Please enter your name');
    isValid = false;
  } else if (!validateName(nameField.value)) {
    showFieldError(nameField, 'Please enter a valid name');
    isValid = false;
  } else {
    clearFieldError(nameField);
  }

  if (!phoneField?.value.trim()) {
    showFieldError(phoneField, 'Please enter your phone number');
    isValid = false;
  } else if (!validatePhone(phoneField.value)) {
    showFieldError(phoneField, 'Please enter a valid phone number');
    isValid = false;
  } else {
    clearFieldError(phoneField);
  }

  if (!emailField?.value.trim()) {
    showFieldError(emailField, 'Please enter your email');
    isValid = false;
  } else {
    clearFieldError(emailField);
  }

  if (!addressField?.value.trim()) {
    showFieldError(addressField, 'Please enter your address');
    isValid = false;
  } else {
    clearFieldError(addressField);
  }

  if (!makeField?.value.trim()) {
    showFieldError(makeField, 'Please enter vehicle make');
    isValid = false;
  } else {
    clearFieldError(makeField);
  }

  if (!modelField?.value.trim()) {
    showFieldError(modelField, 'Please enter vehicle model');
    isValid = false;
  } else {
    clearFieldError(modelField);
  }

  if (!yearField?.value.trim()) {
    showFieldError(yearField, 'Please enter vehicle year');
    isValid = false;
  } else {
    clearFieldError(yearField);
  }

  if (serviceCheckboxes.length === 0) {
    alert('Please select at least one service');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Collect selected services
  const selectedServices = Array.from(serviceCheckboxes).map(cb => cb.value);

  // Create booking object
  const bookingData = {
    timestamp: new Date().toISOString(),
    name: sanitizeInput(nameField.value.trim()),
    phone: sanitizeInput(phoneField.value.trim()),
    email: sanitizeInput(emailField.value.trim()),
    address: sanitizeInput(addressField.value.trim()),
    vehicle: {
      make: sanitizeInput(makeField.value.trim()),
      model: sanitizeInput(modelField.value.trim()),
      year: yearField.value.trim(),
      mileage: mileageField?.value || 'Not provided'
    },
    services: selectedServices,
    notes: notesField?.value ? sanitizeInput(notesField.value.trim()) : '',
    status: 'pending',
    paymentStatus: 'awaiting_invoice'
  };

  try {
    // Send to Firebase
    const response = await fetch('https://hands-detail-default-rtdb.firebaseio.com/mechanical-bookings.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error('Failed to save booking');
    }

    // Send email notification
    await sendBookingEmail(bookingData);

    // Show success message
    showBookingSuccess(bookingData);

    // Close modal and reset form
    closeBookingModal();
    form.reset();

    // Redirect to confirmation page
    setTimeout(() => {
      window.location.href = 'booking-confirmation.html';
    }, 2000);

  } catch (error) {
    console.error('Booking error:', error);
    alert('Error submitting booking. Please call us at (412) 752-8684 to book your service.');
  }
}

/**
 * Send booking confirmation email
 */
async function sendBookingEmail(bookingData) {
  try {
    const emailBody = `
New Mechanical Services Booking Request

Customer Information:
- Name: ${bookingData.name}
- Phone: ${bookingData.phone}
- Email: ${bookingData.email}
- Address: ${bookingData.address}

Vehicle Information:
- Make: ${bookingData.vehicle.make}
- Model: ${bookingData.vehicle.model}
- Year: ${bookingData.vehicle.year}
- Mileage: ${bookingData.vehicle.mileage}

Services Requested:
${bookingData.services.map(s => `- ${s}`).join('\n')}

Additional Notes:
${bookingData.notes || 'None'}

Next Step: Send Square payment link invoice to ${bookingData.email}
Status: ${bookingData.status}
Submitted: ${new Date(bookingData.timestamp).toLocaleString()}
    `;

    // Using email-integration.js if available, otherwise log for manual handling
    if (window.sendEmailViaEmailIntegration) {
      await window.sendEmailViaEmailIntegration('handsdetailshop@gmail.com', `New Mechanical Booking: ${bookingData.name}`, emailBody);
    } else {
      console.log('Email would be sent:', emailBody);
      // Email notification can be set up via Firebase Cloud Functions
    }
  } catch (error) {
    console.error('Email send error:', error);
  }
}

/**
 * Show booking success message
 */
function showBookingSuccess(bookingData) {
  const modal = document.getElementById('bookingModal');
  const content = modal.querySelector('.modal-content');
  
  const successHTML = `
    <div style="padding: 40px; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 20px;">✅</div>
      <h2 style="color: #42a5f5; margin: 0 0 15px 0;">Booking Submitted!</h2>
      <p style="color: #b3d9ff; font-size: 1.05rem; margin: 0 0 20px 0;">
        Thank you, <strong>${bookingData.name}</strong>!
      </p>
      <p style="color: #909090; margin: 0 0 20px 0;">
        We've received your mechanical services booking request for your ${bookingData.vehicle.year} ${bookingData.vehicle.make} ${bookingData.vehicle.model}.
      </p>
      <div style="background: rgba(66, 165, 245, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #42a5f5;">
        <p style="color: #a0a0a0; margin: 0;">
          <strong>Next Step:</strong><br>
          We'll contact you at <strong>${bookingData.phone}</strong> or <strong>${bookingData.email}</strong> shortly to confirm details and send you a Square payment invoice.
        </p>
      </div>
      <p style="color: #707070; font-size: 0.95rem; margin: 20px 0 0 0;">
        Redirecting to confirmation page...
      </p>
    </div>
  `;

  content.innerHTML = successHTML;
}

/**
 * Handle original booking form submission (for other pages)
 */
function handleOriginalBooking(form) {
  const nameField = form.querySelector('input[type="text"]');
  const phoneField = form.querySelector('input[type="tel"]');
  const serviceField = form.querySelector('select');

  let isValid = true;

  // Validate name
  if (!nameField.value.trim()) {
    showFieldError(nameField, 'Please enter your name');
    isValid = false;
  } else if (!validateName(nameField.value)) {
    showFieldError(nameField, 'Please enter a valid name (letters only)');
    isValid = false;
  } else {
    clearFieldError(nameField);
  }

  // Validate phone
  if (!phoneField.value.trim()) {
    showFieldError(phoneField, 'Please enter your phone number');
    isValid = false;
  } else if (!validatePhone(phoneField.value)) {
    showFieldError(phoneField, 'Please enter a valid phone number (10+ digits)');
    isValid = false;
  } else {
    clearFieldError(phoneField);
  }

  // Validate service selection
  if (!serviceField.value) {
    showFieldError(serviceField, 'Please select a service');
    isValid = false;
  } else {
    clearFieldError(serviceField);
  }

  // If validation fails, focus on first error field
  if (!isValid) {
    const firstError = form.querySelector('.field-error');
    if (firstError && firstError.previousElementSibling) {
      firstError.previousElementSibling.focus();
    }
    return;
  }

  // Sanitize inputs
  const name = sanitizeInput(nameField.value.trim());
  const phone = sanitizeInput(phoneField.value.trim());
  const service = sanitizeInput(serviceField.value);

  // Proceed with payment
  const squareDepositLink = 'https://square.link/u/vScfV4jK';
  const details = `${name} - ${phone} - ${service}`;

  // Open payment window
  const paymentWindow = window.open(
    squareDepositLink + `?note=${encodeURIComponent(details)}`,
    '_blank',
    'noopener,noreferrer'
  );

  if (paymentWindow) {
    // Close modal and reset form
    closeBookingModal();
    form.reset();
    
    // Redirect to booking confirmation page with "While You Wait" music experience
    setTimeout(() => {
      window.location.href = 'booking-confirmation.html';
    }, 300);
  } else {
    alert(
      'Pop-up blocked! Please allow pop-ups for this site and try again.\n\nAlternatively, call us at (412) 752-8684 to book your appointment.'
    );
  }
}


// ===== SERVICES DROPDOWN TOGGLE =====

function toggleServicesDropdown(button) {
  const dropdown = button.closest('.services-dropdown');
  if (dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      menu.classList.toggle('active');
      button.classList.toggle('active');
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.services-dropdown');
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.services-dropdown-btn');
    if (!dropdown.contains(e.target)) {
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('active');
        if (button) button.classList.remove('active');
      }
    }
  });
});

// ===== MODAL CLICK OUTSIDE TO CLOSE =====

const bookingModal = document.getElementById('bookingModal');
if (bookingModal) {
  bookingModal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeBookingModal();
    }
  });
}

// ===== QUOTE PAGE VEHICLE SELECTION =====

/**
 * Select vehicle type and display pricing
 * @param {HTMLElement} element - Clicked vehicle option element
 * @param {string} vehicleType - Type of vehicle selected
 */
function selectVehicle(element, vehicleType) {
  // Remove active class from all options
  document.querySelectorAll('.quote-option').forEach(opt => {
    opt.style.borderColor = 'rgba(66, 165, 245, 0.3)';
    opt.style.background = 'linear-gradient(135deg, #0d1b2a, #1a2942)';
  });

  // Highlight selected option
  element.style.borderColor = '#42a5f5';
  element.style.background = 'linear-gradient(135deg, #0d47a1, #1565c0)';

  // Define pricing tiers for different vehicle types
  const pricing = {
    // Personal Vehicles
    compact: {
      essential: '$65',
      executive: '$145',
      ceramic: '$585'
    },
    midsize: {
      essential: '$75',
      executive: '$165',
      ceramic: '$685'
    },
    suv: {
      essential: '$85',
      executive: '$185',
      ceramic: '$785'
    },
    luxury: {
      essential: '$85',
      executive: '$185',
      ceramic: '$785'
    },

    // Motorcycles
    motorcycle: {
      essential: '$85',
      executive: '$145',
      ceramic: '$245'
    },

    // Fleet Vehicles
    fleet: {
      essential: '$45',
      executive: '$75',
      ceramic: 'N/A'
    },
    'fleet-premium': {
      essential: '$75',
      executive: '$95',
      ceramic: 'N/A'
    },
    'box-truck': {
      essential: '$95',
      executive: '$145',
      ceramic: 'N/A'
    },

    // Semi Tractors
    semi: {
      essential: '$125',
      executive: '$185',
      ceramic: 'N/A'
    },

    // Buses
    'mini-bus': {
      essential: '$145',
      executive: '$225',
      ceramic: 'N/A'
    },
    'full-bus': {
      essential: '$285',
      executive: '$385',
      ceramic: 'N/A'
    },
    'coach-bus': {
      essential: '$485',
      executive: '$685',
      ceramic: 'N/A'
    },

    // Yachts & Boats
    'small-yacht': {
      essential: '$285',
      executive: '$385',
      ceramic: '+$200'
    },
    'medium-yacht': {
      essential: '$485',
      executive: '$685',
      ceramic: '+$300'
    },
    'large-yacht': {
      essential: '$885',
      executive: '$1,485',
      ceramic: '+$500'
    },
    'super-yacht': {
      essential: 'Custom',
      executive: 'Quote',
      ceramic: 'Quote'
    },

    // RVs
    'class-b-rv': {
      essential: '$285',
      executive: '$385',
      ceramic: '+$200'
    },
    'class-c-rv': {
      essential: '$485',
      executive: '$685',
      ceramic: '+$300'
    },
    'class-a-rv': {
      essential: '$885',
      executive: '$1,285',
      ceramic: '+$400'
    },
    'luxury-rv': {
      essential: '$1,485',
      executive: '$2,485',
      ceramic: '+$600'
    },

    // Seasonal & Special
    winter: {
      essential: '$385',
      executive: '$485',
      ceramic: '$585'
    },
    'interior-ceramic': {
      essential: '$285',
      executive: '$385',
      ceramic: '$485'
    },
    'exterior-ceramic': {
      essential: '$585',
      executive: '$685',
      ceramic: '$785'
    }
  };

  // Update prices if elements exist
  const prices = pricing[vehicleType];
  if (prices) {
    const essentialEl = document.getElementById('essentialPrice');
    const executiveEl = document.getElementById('executivePrice');
    const ceramicEl = document.getElementById('ceramicPrice');

    if (essentialEl) essentialEl.textContent = prices.essential;
    if (executiveEl) executiveEl.textContent = prices.executive;
    if (ceramicEl) ceramicEl.textContent = prices.ceramic;
  }

  // Show price display
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceDisplay) {
    priceDisplay.style.display = 'block';
    // Smooth scroll to prices
    setTimeout(() => {
      priceDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// ===== AUDIO PLAYBACK HANDLER =====

/**
 * Play audio from URL or audio element
 * @param {string|null} audioUrl - Optional audio URL to play
 */
function playAudio(audioUrl) {
  let audioElement = document.getElementById('storyAudio');
  
  if (!audioElement) {
    audioElement = document.createElement('audio');
    audioElement.id = 'storyAudio';
    document.body.appendChild(audioElement);
  }
  
  if (audioUrl) {
    audioElement.src = audioUrl;
  }
  
  if (audioElement.paused) {
    audioElement.play().catch(error => {
      console.log('Audio playback error:', error);
    });
  } else {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}

/**
 * Stop currently playing audio
 */
function stopAudio() {
  const audioElement = document.getElementById('storyAudio');
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}

// ===== CONTACT FORM HANDLER =====

/**
 * Handle direct contact form submission on contact page
 * @param {Event} event - Form submission event
 */
function handleContactFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const subject = form.querySelector('select[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;
  
  // Client-side validation
  if (!validateName(name)) {
    alert('Please enter a valid name (letters, spaces, hyphens only)');
    return;
  }
  
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  if (phone && !validatePhone(phone)) {
    alert('Please enter a valid phone number');
    return;
  }
  
  // Prepare data for email
  const emailData = {
    subject: `Contact Form: ${subject}`,
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone || 'Not provided'),
    subject_selected: subject,
    message: sanitizeInput(message),
    timestamp: new Date().toISOString()
  };
  
  // Send email via Firebase or email service
  // For now, we'll log and show success message
  console.log('Contact form submitted:', emailData);
  
  // Show success message
  const successMsg = document.getElementById('formSuccessMessage');
  if (successMsg) {
    successMsg.style.display = 'block';
    form.style.display = 'none';
    
    // Reset form after 3 seconds and show it again
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMsg.style.display = 'none';
    }, 3000);
  }
  
  // Optional: Send to email service
  // You can integrate with Formspree, EmailJS, or Firebase Cloud Functions
  // Example with Formspree (requires form action attribute):
  // fetch('https://formspree.io/f/YOUR_FORM_ID', {
  //   method: 'POST',
  //   body: new FormData(form),
  //   headers: { 'Accept': 'application/json' }
  // });
}

// ===== PAGE LOAD ACCESSIBILITY ENHANCEMENTS =====

document.addEventListener('DOMContentLoaded', function () {
  // Add ARIA labels to interactive elements without them
  const mobileToggle = document.getElementById('mobileToggle');
  if (mobileToggle && !mobileToggle.getAttribute('aria-label')) {
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    mobileToggle.setAttribute('role', 'button');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  // Update ARIA state when mobile menu toggles
  if (mobileToggle) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'class') {
          const isActive = mobileToggle.classList.contains('active');
          mobileToggle.setAttribute('aria-expanded', isActive.toString());
        }
      });
    });
    observer.observe(mobileToggle, { attributes: true });
  }

  // Add ARIA labels to modal close buttons
  document.querySelectorAll('.modal-close').forEach((closeBtn) => {
    if (!closeBtn.getAttribute('aria-label')) {
      closeBtn.setAttribute('aria-label', 'Close modal');
    }
  });

  // ===== JUKEBOX PLAYER =====
  const jukeboxEl = document.getElementById('jukebox');
  if (jukeboxEl) {
    initializeJukebox();
  }
});
