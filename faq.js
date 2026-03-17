/**
 * FAQ Accordion functionality
 */

document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
      // Close other items if you want accordion behavior (only one open at a time)
      // Comment out these lines if you want multiple items to be open simultaneously
      const wasActive = item.classList.contains('active');
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (wasActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Optional: Open first item by default
  // if (faqItems.length > 0) {
  //   faqItems[0].classList.add('active');
  // }

  // Optional: Allow opening via URL hash (e.g., faq.html#question-1)
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetItem = document.getElementById(targetId);
    if (targetItem && targetItem.classList.contains('faq-item')) {
      targetItem.classList.add('active');
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
