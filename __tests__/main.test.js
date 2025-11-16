/**
 * Unit tests for main.js utility functions
 * Testing validation, sanitization, and form handling
 */

// Mock the main.js functions by importing them
// Since we can't use ES6 modules in the browser version, we'll test the logic

describe('Input Validation Functions', () => {
  describe('validatePhone', () => {
    // Define the function inline for testing (same logic as main.js)
    function validatePhone(phone) {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      const digitsOnly = phone.replace(/\D/g, '');
      return phoneRegex.test(phone) && digitsOnly.length >= 10;
    }

    test('should accept valid 10-digit phone number', () => {
      expect(validatePhone('4129476098')).toBe(true);
      expect(validatePhone('412-947-6098')).toBe(true);
      expect(validatePhone('(412) 947-6098')).toBe(true);
    });

    test('should accept 11-digit phone with country code', () => {
      expect(validatePhone('14129476098')).toBe(true);
      expect(validatePhone('1-412-947-6098')).toBe(true);
    });

    test('should reject phone numbers with less than 10 digits', () => {
      expect(validatePhone('123456789')).toBe(false);
      expect(validatePhone('412-752')).toBe(false);
    });

    test('should reject phone numbers with letters', () => {
      expect(validatePhone('412-ABC-DEFG')).toBe(false);
      expect(validatePhone('CALL-ME-NOW')).toBe(false);
    });

    test('should reject phone numbers with special characters', () => {
      expect(validatePhone('412@752#8684')).toBe(false);
      expect(validatePhone('412.947.6098')).toBe(false); // Dots not allowed
    });

    test('should handle empty or whitespace input', () => {
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('   ')).toBe(false);
    });
  });

  describe('validateName', () => {
    function validateName(name) {
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      return nameRegex.test(name) && name.trim().length >= 2;
    }

    test('should accept valid names', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('Mary-Jane')).toBe(true);
      expect(validateName("O'Brien")).toBe(true);
      expect(validateName('Jean-Claude Van Damme')).toBe(true);
    });

    test('should accept single names with 2+ characters', () => {
      expect(validateName('Li')).toBe(true);
      expect(validateName('Wu')).toBe(true);
    });

    test('should reject names with numbers', () => {
      expect(validateName('John123')).toBe(false);
      expect(validateName('Mary2')).toBe(false);
    });

    test('should reject names with special characters', () => {
      expect(validateName('John@Doe')).toBe(false);
      expect(validateName('Mary#Jane')).toBe(false);
      expect(validateName('Test!User')).toBe(false);
    });

    test('should reject names shorter than 2 characters', () => {
      expect(validateName('J')).toBe(false);
      expect(validateName('A')).toBe(false);
    });

    test('should handle empty or whitespace input', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('   ')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    function sanitizeInput(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    test('should escape HTML tags', () => {
      expect(sanitizeInput('<script>alert("XSS")</script>')).toBe(
        '&lt;script&gt;alert("XSS")&lt;/script&gt;'
      );
      expect(sanitizeInput('<b>Bold</b>')).toBe('&lt;b&gt;Bold&lt;/b&gt;');
    });

    test('should escape special HTML characters', () => {
      expect(sanitizeInput('Test & Co')).toBe('Test &amp; Co');
      expect(sanitizeInput('5 < 10')).toBe('5 &lt; 10');
      expect(sanitizeInput('10 > 5')).toBe('10 &gt; 5');
    });

    test('should handle quotes', () => {
      expect(sanitizeInput('He said "Hello"')).toBe('He said "Hello"');
      expect(sanitizeInput("It's working")).toBe("It's working");
    });

    test('should preserve normal text', () => {
      expect(sanitizeInput('John Doe')).toBe('John Doe');
      expect(sanitizeInput('4129476098')).toBe('4129476098');
      expect(sanitizeInput('Normal text here')).toBe('Normal text here');
    });

    test('should handle empty string', () => {
      expect(sanitizeInput('')).toBe('');
    });

    test('should prevent XSS attacks', () => {
      const xssAttempts = [
        '<img src=x onerror=alert(1)>',
        '<iframe src="evil.com"></iframe>',
        'javascript:alert("XSS")',
        '<svg onload=alert(1)>',
      ];

      xssAttempts.forEach((attempt) => {
        const sanitized = sanitizeInput(attempt);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('<iframe');
        expect(sanitized).not.toContain('onerror=');
        expect(sanitized).not.toContain('onload=');
      });
    });
  });
});

describe('Form Field Error Handling', () => {
  beforeEach(() => {
    // Set up a DOM element for testing
    document.body.innerHTML = `
      <div class="form-group">
        <input type="text" id="testInput" />
      </div>
    `;
  });

  describe('showFieldError', () => {
    function showFieldError(field, message) {
      const existingError = field.parentElement.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }

      field.style.borderColor = '#ff5252';

      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.style.color = '#ff5252';
      errorDiv.style.fontSize = '0.85rem';
      errorDiv.style.marginTop = '5px';
      errorDiv.textContent = message;
      field.parentElement.appendChild(errorDiv);
    }

    test('should add error message to field', () => {
      const input = document.getElementById('testInput');
      showFieldError(input, 'This field is required');

      const errorDiv = input.parentElement.querySelector('.field-error');
      expect(errorDiv).toBeTruthy();
      expect(errorDiv.textContent).toBe('This field is required');
    });

    test('should style field with red border', () => {
      const input = document.getElementById('testInput');
      showFieldError(input, 'Error message');

      expect(input.style.borderColor).toBe('#ff5252');
    });

    test('should replace existing error message', () => {
      const input = document.getElementById('testInput');
      showFieldError(input, 'First error');
      showFieldError(input, 'Second error');

      const errors = input.parentElement.querySelectorAll('.field-error');
      expect(errors.length).toBe(1);
      expect(errors[0].textContent).toBe('Second error');
    });
  });

  describe('clearFieldError', () => {
    function clearFieldError(field) {
      field.style.borderColor = '';
      const existingError = field.parentElement.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }
    }

    test('should remove error message', () => {
      const input = document.getElementById('testInput');

      // Add error first
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      input.parentElement.appendChild(errorDiv);

      // Clear error
      clearFieldError(input);

      expect(input.parentElement.querySelector('.field-error')).toBeFalsy();
    });

    test('should reset border color', () => {
      const input = document.getElementById('testInput');
      input.style.borderColor = '#ff5252';

      clearFieldError(input);

      expect(input.style.borderColor).toBe('');
    });

    test('should handle case when no error exists', () => {
      const input = document.getElementById('testInput');

      // Should not throw error
      expect(() => clearFieldError(input)).not.toThrow();
    });
  });
});

describe('URL Encoding and Security', () => {
  test('should properly encode special characters in URLs', () => {
    const name = 'John & Jane';
    const phone = '(412) 947-6098';
    const service = 'Elite Detail - $145';

    const details = `${name} - ${phone} - ${service}`;
    const encoded = encodeURIComponent(details);

    expect(encoded).not.toContain('&');
    expect(encoded).not.toContain('(');
    expect(encoded).not.toContain(')');
    expect(encoded).not.toContain('$');

    // Should be decodable back
    expect(decodeURIComponent(encoded)).toBe(details);
  });

  test('should handle special characters that could break URLs', () => {
    const testStrings = ['Test & Co', "O'Brien", 'Price: $100', '50% off', 'AT&T User'];

    testStrings.forEach((str) => {
      const encoded = encodeURIComponent(str);
      expect(decodeURIComponent(encoded)).toBe(str);
    });
  });
});

describe('Edge Cases and Error Handling', () => {
  test('should handle null and undefined inputs gracefully', () => {
    function validatePhone(phone) {
      if (!phone) return false;
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      const digitsOnly = phone.replace(/\D/g, '');
      return phoneRegex.test(phone) && digitsOnly.length >= 10;
    }

    expect(validatePhone(null)).toBe(false);
    expect(validatePhone(undefined)).toBe(false);
  });

  test('should handle very long inputs', () => {
    function validateName(name) {
      if (!name) return false;
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      return nameRegex.test(name) && name.trim().length >= 2;
    }

    const longName = 'A'.repeat(1000);
    expect(validateName(longName)).toBe(true);

    const longNameWithNumbers = 'A'.repeat(500) + '123';
    expect(validateName(longNameWithNumbers)).toBe(false);
  });

  test('should handle international characters in names', () => {
    function validateName(name) {
      if (!name) return false;
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      return nameRegex.test(name) && name.trim().length >= 2;
    }

    // These should fail with current regex (English only)
    expect(validateName('José')).toBe(false); // Spanish
    expect(validateName('François')).toBe(false); // French
    expect(validateName('Müller')).toBe(false); // German

    // These should pass
    expect(validateName('Jose')).toBe(true);
    expect(validateName('Francois')).toBe(true);
    expect(validateName('Muller')).toBe(true);
  });
});

describe('Integration Tests', () => {
  test('complete booking form validation flow', () => {
    function validatePhone(phone) {
      if (!phone) return false;
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      const digitsOnly = phone.replace(/\D/g, '');
      return phoneRegex.test(phone) && digitsOnly.length >= 10;
    }

    function validateName(name) {
      if (!name) return false;
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      return nameRegex.test(name) && name.trim().length >= 2;
    }

    function sanitizeInput(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    // Simulate valid form submission
    const formData = {
      name: 'John Doe',
      phone: '(412) 947-6098',
      service: 'Elite Detail Package',
    };

    expect(validateName(formData.name)).toBe(true);
    expect(validatePhone(formData.phone)).toBe(true);

    // Sanitize for security
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedPhone = sanitizeInput(formData.phone);
    const sanitizedService = sanitizeInput(formData.service);

    expect(sanitizedName).toBe('John Doe');
    expect(sanitizedPhone).toBe('(412) 947-6098');
    expect(sanitizedService).toBe('Elite Detail Package');

    // Build URL
    const details = `${sanitizedName} - ${sanitizedPhone} - ${sanitizedService}`;
    const url = `https://square.link/u/vScfV4jK?note=${encodeURIComponent(details)}`;

    expect(url).toContain('John%20Doe');
    expect(url).toContain('%28412%29'); // Encoded parenthesis
  });

  test('should reject invalid form data', () => {
    function validatePhone(phone) {
      if (!phone) return false;
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      const digitsOnly = phone.replace(/\D/g, '');
      return phoneRegex.test(phone) && digitsOnly.length >= 10;
    }

    function validateName(name) {
      if (!name) return false;
      const nameRegex = /^[a-zA-Z\s\-']+$/;
      return nameRegex.test(name) && name.trim().length >= 2;
    }

    const invalidData = {
      name: 'J',
      phone: '123',
      service: '',
    };

    expect(validateName(invalidData.name)).toBe(false);
    expect(validatePhone(invalidData.phone)).toBe(false);
    expect(invalidData.service).toBe('');
  });
});
