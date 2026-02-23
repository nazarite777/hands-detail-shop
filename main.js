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
    // Load playlist from audio-urls.json
    const response = await fetch('/audio-urls.json');
    const data = await response.json();
    playlist = data.songs || [];

    if (playlist.length === 0) return;

    const jukebox = document.getElementById('jukebox');
    if (!jukebox) return;

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

  } catch (error) {
    console.error('Error initializing jukebox:', error);
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
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameField = this.querySelector('input[type="text"]');
    const phoneField = this.querySelector('input[type="tel"]');
    const serviceField = this.querySelector('select');

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
      const firstError = this.querySelector('.field-error');
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
      setTimeout(() => {
        alert(
          `Payment window opened for $30 deposit.\n\nAfter payment, we'll contact you at ${phone} within 24 hours to confirm your appointment.`
        );
        closeBookingModal();
        this.reset();
      }, 500);
    } else {
      alert(
        'Pop-up blocked! Please allow pop-ups for this site and try again.\n\nAlternatively, call us at (412) 752-8684 to book your appointment.'
      );
    }
  });
}

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
  initializeJukebox();
});
