// Shared JavaScript functions for Aura Garage website
// This file contains common functionality used across all pages

// ===============================
// MOBILE MENU FUNCTIONALITY
// =============================== */

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  // Open mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    openMobileMenu();
  });
  
  // Close mobile menu
  mobileMenuClose.addEventListener('click', () => {
    closeMobileMenu();
  });
  
  // Close mobile menu when clicking overlay
  mobileMenuOverlay.addEventListener('click', () => {
    closeMobileMenu();
  });
  
  // Close mobile menu when clicking navigation links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  
  mobileMenu.classList.add('active');
  mobileMenuOverlay.classList.add('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  const firstFocusableElement = mobileMenu.querySelector('button, a, input, select, textarea');
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  
  // Restore body scroll
  document.body.style.overflow = '';
  
  // Return focus to menu button
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.focus();
  }
}

// ===============================
// SMOOTH SCROLL FUNCTIONALITY
// =============================== */

function initSmoothScroll() {
  // Add smooth scroll to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===============================
// HEADER SCROLL MANAGEMENT
// =============================== */

function initHeaderScroll() {
  let lastScroll = 0;
  const header = document.querySelector('header');
  if (!header) return;
  
  const headerHeight = header.offsetHeight;

  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background on scroll
    if (currentScroll > 50) {
      header.classList.add('bg-gray-900/95', 'backdrop-blur-sm');
      header.classList.remove('bg-transparent');
      
      // Hide header on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > headerHeight) {
        // Scrolling down
        header.style.transform = `translateY(-${headerHeight}px)`;
        header.style.transition = 'transform 0.3s ease-in-out';
      } else if (currentScroll < lastScroll) {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
      }
    } else {
      // At top of page
      header.classList.add('bg-transparent');
      header.classList.remove('bg-gray-900/95', 'backdrop-blur-sm');
      header.style.transform = 'translateY(0)';
      header.style.transition = 'none';
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll);
}

// ===============================
// ANIMATION UTILITIES
// =============================== */

function initScrollAnimations() {
  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements with animation classes
  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, [class*="animate-"]').forEach(element => {
    observer.observe(element);
  });
}

// ===============================
// FORM UTILITIES
// =============================== */

function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('border-red-500');
          
          // Remove error class on input
          field.addEventListener('input', () => {
            field.classList.remove('border-red-500');
          }, { once: true });
        }
      });
      
      if (isValid) {
        // Show success message
        showNotification('Form submitted successfully!', 'success');
        form.reset();
      } else {
        showNotification('Please fill in all required fields.', 'error');
      }
    });
  });
}

// ===============================
// NOTIFICATION SYSTEM
// =============================== */

function showNotification(message, type = 'info') {
  // Create notification element if it doesn't exist
  let notificationContainer = document.getElementById('notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-20 right-4 z-50 space-y-2';
    document.body.appendChild(notificationContainer);
  }
  
  const notification = document.createElement('div');
  notification.className = `p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
  
  // Set color based on type
  switch(type) {
    case 'success':
      notification.classList.add('bg-green-500', 'text-white');
      break;
    case 'error':
      notification.classList.add('bg-red-500', 'text-white');
      break;
    case 'warning':
      notification.classList.add('bg-yellow-500', 'text-white');
      break;
    default:
      notification.classList.add('bg-cyan-500', 'text-white');
  }
  
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' :
          type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' :
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
      </svg>
      <span>${message}</span>
    </div>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
    notification.classList.add('translate-x-0');
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ===============================
// LOADING STATES
// =============================== */

function showLoading(element, text = 'Loading...') {
  const originalContent = element.innerHTML;
  element.dataset.originalContent = originalContent;
  
  element.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>${text}</span>
    </div>
  `;
  
  element.disabled = true;
}

function hideLoading(element) {
  const originalContent = element.dataset.originalContent;
  if (originalContent) {
    element.innerHTML = originalContent;
    delete element.dataset.originalContent;
  }
  element.disabled = false;
}

// ===============================
// IMAGE LAZY LOADING
// =============================== */

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
  });
}

// ===============================
// RESPONSIVE UTILITIES
// =============================== */

function isMobile() {
  return window.innerWidth <= 768;
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
  return window.innerWidth > 1024;
}

// ===============================
// LOCAL STORAGE UTILITIES
// =============================== */

function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn('Failed to read from localStorage:', e);
    return defaultValue;
  }
}

function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to remove from localStorage:', e);
  }
}

// ===============================
// INITIALIZATION
// =============================== */

// Initialize all shared functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize header scroll
  initHeaderScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Add responsive utilities to window for easy access
  window.isMobile = isMobile;
  window.isTablet = isTablet;
  window.isDesktop = isDesktop;
  window.showNotification = showNotification;
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
  
  // Handle resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Trigger any resize-dependent functions here
      console.log('Window resized to:', window.innerWidth);
    }, 250);
  });
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    initSmoothScroll,
    initHeaderScroll,
    initScrollAnimations,
    initFormValidation,
    showNotification,
    showLoading,
    hideLoading,
    initLazyLoading,
    isMobile,
    isTablet,
    isDesktop,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  };
}
