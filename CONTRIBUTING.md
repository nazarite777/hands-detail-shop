# Contributing to Hands Detail Shop

Thank you for your interest in contributing to the Hands Detail Shop website! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)

---

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community and business
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Unprofessional conduct

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **Git**: Latest version
- **Text Editor**: VS Code recommended

### Initial Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hands-detail-shop.git
   cd hands-detail-shop
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/nazarite777/hands-detail-shop.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start development server**:
   ```bash
   npm run serve
   ```
   Visit http://localhost:8080

---

## 💻 Development Workflow

### Before Starting Work

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding tests
- `chore/description` - Maintenance tasks

### Making Changes

1. **Write clean, readable code**
2. **Follow existing code style**
3. **Add comments for complex logic**
4. **Update documentation** if needed

---

## 📏 Code Standards

### JavaScript

- **ES6+ syntax** required
- **No var**, use `const` or `let`
- **Semicolons** required
- **Single quotes** for strings
- **2 spaces** for indentation
- **JSDoc comments** for functions

**Example**:
```javascript
/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
}
```

### HTML

- **Semantic HTML5** elements
- **ARIA labels** for accessibility
- **Alt text** for all images
- **Proper indentation** (2 spaces)

### CSS

- **Mobile-first** approach
- **Consistent naming** (kebab-case)
- **Comments** for sections
- **No !important** unless absolutely necessary

### Automated Checks

Run before committing:

```bash
# Format code
npm run format

# Lint JavaScript
npm run lint

# Run all checks
npm run validate:all
```

---

## 🧪 Testing Requirements

### Unit Tests Required

All new JavaScript functions **must** have unit tests.

**Location**: `__tests__/main.test.js`

**Example**:
```javascript
describe('validatePhone', () => {
  test('should accept valid 10-digit phone number', () => {
    expect(validatePhone('4127528684')).toBe(true);
  });

  test('should reject invalid phone', () => {
    expect(validatePhone('123')).toBe(false);
  });
});
```

### Running Tests

```bash
# Run tests once
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:ci
```

### Coverage Requirements

- **Minimum 80% coverage** for all metrics
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

---

## 📝 Pull Request Process

### Before Submitting

1. **Run all validations**:
   ```bash
   npm run validate:all
   ```

2. **Ensure tests pass**:
   ```bash
   npm test
   ```

3. **Update documentation** if needed

4. **Test manually** in browser

### Creating PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Clear title describing the change
   - Description explaining **why** and **what**
   - Link related issues

3. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Refactoring

   ## Testing
   - [ ] All tests pass
   - [ ] Added new tests
   - [ ] Manual testing completed

   ## Screenshots (if applicable)
   Add screenshots for UI changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

### Review Process

- At least **1 approval** required
- All **CI checks** must pass
- **No merge conflicts**
- **Squash and merge** preferred

---

## 📋 Commit Message Guidelines

### Format

```
type(scope): short description

Detailed explanation of what changed and why.

Fixes #issue_number
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

**Good**:
```
feat(forms): add real-time phone validation

Implemented client-side validation for phone numbers
with visual feedback. Prevents invalid submissions.

Fixes #42
```

**Good**:
```
fix(mobile): correct menu z-index on iOS

Mobile menu was appearing behind modal dialogs.
Increased z-index to fix stacking context.

Fixes #38
```

**Bad**:
```
updated stuff
```

**Bad**:
```
fix bug
```

---

## 🎨 Design Guidelines

### Colors

- Primary: `#1565c0` (Blue)
- Gradient: `#0d47a1` → `#1565c0` → `#1976d2`
- Text: `#e8f1f8` (Light)
- Errors: `#ff5252` (Red)

### Typography

- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Base Size: 16px
- Line Height: 1.6

### Spacing

- Use multiples of 4px: 4, 8, 12, 16, 20, 24, 32, 40, 60, 80

---

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Test in multiple browsers**
3. **Clear cache** and try again

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [e.g., iPhone 14]

**Additional context**
Any other relevant information
```

---

## 💡 Feature Requests

### Template

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution**
How would you solve it?

**Alternatives considered**
Other approaches you've thought about

**Additional context**
Screenshots, mockups, examples
```

---

## 🔒 Security

**Do not** create public issues for security vulnerabilities.

Instead, email: [contact form on website]

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## 📞 Questions?

- **GitHub Issues**: For bugs and features
- **Website Contact Form**: For general questions
- **Phone**: (412) 752-8684 for business inquiries

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Hands Detail Shop!** 🚗✨

Your efforts help us provide better service to our customers in Arnold, PA and the Greater Pittsburgh area.
