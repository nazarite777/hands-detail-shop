/**
 * Gallery filtering and interaction functionality
 */

// Gallery filter functionality
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const emptyState = document.getElementById('emptyState');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      let visibleCount = 0;

      // Filter gallery items
      galleryItems.forEach((item) => {
        const categories = item.getAttribute('data-category');

        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          // Add fade-in animation
          item.style.animation = 'fadeIn 0.5s ease-in';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide empty state
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    });
  });

  // Add hover effects to gallery items
  galleryItems.forEach((item) => {
    const container = item.querySelector('.before-after-container');

    if (container) {
      item.addEventListener('mouseenter', function () {
        // Slight zoom effect on hover
        container.style.transform = 'scale(1.02)';
        container.style.transition = 'transform 0.3s ease';
      });

      item.addEventListener('mouseleave', function () {
        container.style.transform = 'scale(1)';
      });
    }
  });
});

// Add fade-in animation keyframes if not already in CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
