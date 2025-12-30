// Car brands data with logo paths and car counts
const CAR_BRANDS = [
  { id: 'toyota', name: 'Toyota', logo: 'https://i.ibb.co/0Q8XyLf/toyota-logo.png', popular: true },
  { id: 'honda', name: 'Honda', logo: 'https://www.carlogos.org/logo/Honda-logo-1920x1080.png', popular: true },
  { id: 'bmw', name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png', popular: true },
  { id: 'mercedes', name: 'Mercedes', logo: 'https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png', popular: true },
  { id: 'audi', name: 'Audi', logo: 'https://www.carlogos.org/logo/Audi-logo-2016-1920x1080.png', popular: true },
  { id: 'lexus', name: 'Lexus', logo: 'https://www.carlogos.org/logo/Lexus-logo-1988-1920x1080.png', popular: false },
  { id: 'mitsubishi', name: 'Mitsubishi', logo: 'https://www.carlogos.org/logo/Mitsubishi-logo-2000x2500.png', popular: false },
  { id: 'suzuki', name: 'Suzuki', logo: 'https://www.carlogos.org/logo/Suzuki-logo-2019-3840x2160.png', popular: false },
  { id: 'nissan', name: 'Nissan', logo: 'https://www.carlogos.org/logo/Nissan-logo-2020-640x302.png', popular: false },
  { id: 'hyundai', name: 'Hyundai', logo: 'https://www.carlogos.org/logo/Hyundai-logo-silver-2560x1440.png', popular: false },
  { id: 'kia', name: 'Kia', logo: 'https://www.carlogos.org/logo/Kia-logo-2560x1440.png', popular: false },
  { id: 'volkswagen', name: 'Volkswagen', logo: 'https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png', popular: false },
];

// Function to count cars by brand
function countCarsByBrand(brandName) {
  return CARS.filter(car => 
    car.name.toLowerCase().includes(brandName.toLowerCase())
  ).length;
}

// Initialize car brands section
function initCarBrands() {
  const popularBrandsEl = document.getElementById('popular-brands');
  const otherBrandsEl = document.getElementById('other-brands');

  if (!popularBrandsEl || !otherBrandsEl) return;

  // Clear existing content
  popularBrandsEl.innerHTML = '';
  otherBrandsEl.innerHTML = '';

  // Process each brand
  CAR_BRANDS.forEach(brand => {
    const carCount = countCarsByBrand(brand.name);
    if (carCount === 0) return; // Skip brands with no cars

    const brandCard = document.createElement('div');
    brandCard.className = 'brand-card group relative bg-white/5 rounded-xl p-4 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden h-full';
    brandCard.innerHTML = `
      <div class="w-full h-full flex flex-col items-center">
        <div class="w-20 h-20 flex items-center justify-center mb-3 p-2">
          ${brand.id === 'toyota' ? `
            <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="#EB0A1E"/>
              <rect x="25" y="25" width="150" height="150" fill="white"/>
              <path d="M100 50C72.4 50 50 72.4 50 100C50 127.6 72.4 150 100 150C127.6 150 150 127.6 150 100C150 72.4 127.6 50 100 50ZM100 135C78.95 135 65 121.05 65 100C65 78.95 78.95 65 100 65C121.05 65 135 78.95 135 100C135 121.05 121.05 135 100 135Z" fill="#EB0A1E"/>
              <path d="M100 70C83.5 70 70 83.5 70 100C70 116.5 83.5 130 100 130C116.5 130 130 116.5 130 100C130 83.5 116.5 70 100 70ZM100 120C90.05 120 85 109.95 85 100C85 90.05 90.05 85 100 85C109.95 85 115 90.05 115 100C115 109.95 109.95 120 100 120Z" fill="#EB0A1E"/>
              <path d="M100 90C95.6 90 92.5 93.1 92.5 97.5C92.5 101.9 95.6 105 100 105C104.4 105 107.5 101.9 107.5 97.5C107.5 93.1 104.4 90 100 90Z" fill="#EB0A1E"/>
            </svg>
          ` : `
            <img 
              src="${brand.logo}" 
              alt="${brand.name}" 
              class="brand-logo h-full w-auto max-w-full object-contain transition-all duration-500"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=1a1a2e&color=fff&size=128'"
              loading="lazy"
              style="image-rendering: -webkit-optimize-contrast;"
            />
          `}
        </div>
        <div class="text-center">
          <h3 class="brand-name font-medium text-white text-sm sm:text-base">${brand.name}</h3>
          <span class="brand-count text-xs text-cyan-400">${carCount} unit</span>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
        <button class="text-xs bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-full transition-colors transform translate-y-2 group-hover:translate-y-0 duration-300" data-brand="${brand.name.toLowerCase()}">
          Lihat Semua
        </button>
      </div>
    `;

    // Add click handler to filter cars by brand
    brandCard.addEventListener('click', (e) => {
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.value = brand.name;
        // Trigger input event untuk menjalankan filterCars
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
        
        // Scroll to inventory section
        document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Add to appropriate section
    if (brand.popular) {
      popularBrandsEl.appendChild(brandCard);
    } else {
      otherBrandsEl.appendChild(brandCard);
    }
  });
}

// Initialize interactive background particles
function initBrandParticles() {
  const particlesContainer = document.getElementById('brandParticles');
  if (!particlesContainer) return;

  // Create particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'brand-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (8 + Math.random() * 4) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize entrance animations for the brands section
function initBrandSectionAnimations() {
  const section = document.getElementById('exploreBrandsSection');
  const featureItems = document.querySelectorAll('.brand-feature-item');
  
  if (!section) return;

  // Intersection Observer for entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate section
        entry.target.classList.add('animate-in');
        
        // Animate feature items with staggered delay
        featureItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(section);
}

// Initialize interactive background particles for inventory
function initInventoryParticles() {
  const particlesContainer = document.getElementById('inventoryParticles');
  if (!particlesContainer) return;

  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'inventory-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize entrance animations for the inventory section
function initInventorySectionAnimations() {
  const section = document.getElementById('inventory');
  const filterControls = document.querySelectorAll('.filter-control');
  const searchWrapper = document.querySelector('.search-input-wrapper');
  const showcaseBtn = document.querySelector('.car-showcase-btn');
  
  if (!section) return;

  // Intersection Observer for entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate section
        entry.target.classList.add('animate-in');
        
        // Animate search wrapper
        if (searchWrapper) {
          setTimeout(() => {
            searchWrapper.classList.add('animate-in');
          }, 200);
        }
        
        // Animate filter controls with staggered delay
        filterControls.forEach((control, index) => {
          setTimeout(() => {
            control.classList.add('animate-in');
          }, 400 + (index * 100));
        });
        
        // Animate showcase button
        if (showcaseBtn) {
          setTimeout(() => {
            showcaseBtn.classList.add('animate-in');
          }, 700);
        }
        
        // Animate cards when they're rendered
        setTimeout(() => {
          animateInventoryCards();
        }, 900);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  observer.observe(section);
}

// Animate inventory cards when they appear
function animateInventoryCards() {
  const cards = document.querySelectorAll('.inventory-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 150);
  });
}

// Enhanced render list function with animations - akan menggunakan fungsi renderList yang didefinisikan di bawah

// Enhanced initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Ambil elemen DOM
  window.cardsEl = document.getElementById('cards');
  window.countEl = document.getElementById('count');
  window.noResultsEl = document.getElementById('no-results');
  window.typeFilter = document.getElementById('type-filter');
  window.seatFilter = document.getElementById('seat-filter');
  window.searchInput = document.getElementById('search');
  
  // Initialize hero animations
  initHeroAnimations();
  
  // Initialize search functionality
  initSearch();
  
  // Initialize quick filters
  initQuickFilters();
  
  // Initialize Unit Tersedia section
  initUnitTersedia();
  
  // Initialize Promo Cards
  initPromoCards();
  
  // Initialize Car Brands section
  initCarBrands();
  
  // Initialize brand particles
  initBrandParticles();
  
  // Initialize brand section animations
  initBrandSectionAnimations();
  
  // Initialize inventory particles
  initInventoryParticles();
  
  // Initialize inventory section animations
  initInventorySectionAnimations();
  
  // Render awal semua mobil
  console.log('Rendering initial cars, count:', CARS.length);
  console.log('Cards element found:', !!window.cardsEl);
  renderList(CARS);
  
  // Setup event listeners setelah DOM siap
  if (window.typeFilter) window.typeFilter.addEventListener('change', filterCars);
  if (window.seatFilter) window.seatFilter.addEventListener('change', filterCars);
  if (window.searchInput) window.searchInput.addEventListener('input', filterCars);
  
  // Initialize Font Awesome
  const faScript = document.createElement('script');
  faScript.src = 'https://kit.fontawesome.com/your-code.js';
  faScript.crossOrigin = 'anonymous';
  document.head.appendChild(faScript);
});

// Hero animations
function initHeroAnimations() {
  // Animate elements with data-animate attribute
  const animateElements = document.querySelectorAll('[class*=\'animate-\']');
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
      }
    });
  }, {
    threshold: 0.1
  });

  animateElements.forEach(el => observer.observe(el));
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('hero-search');
  const searchButton = document.getElementById('search-button');
  
  if (!searchInput || !searchButton) return;
  
  // Search on button click
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      // Update the search input in the inventory section and trigger search
      const inventorySearch = document.getElementById('search');
      if (inventorySearch) {
        inventorySearch.value = query;
        // Trigger input event untuk menjalankan filterCars
        const event = new Event('input', { bubbles: true });
        inventorySearch.dispatchEvent(event);
      }
      
      // Scroll to inventory section
      document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
}

// Quick filters
function initQuickFilters() {
  const quickFilters = document.querySelectorAll('.quick-filter');
  
  quickFilters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (!filter) return;
      
      const [type, value] = filter.split(':');
      
      if (type === 'type') {
        // Filter by car type
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
          typeFilter.value = value.charAt(0).toUpperCase() + value.slice(1);
          typeFilter.dispatchEvent(new Event('change'));
        }
      } else if (type === 'price') {
        // Filter by price range
        const [min, max] = value.split('-').map(Number);
        const filteredCars = CARS.filter(car => {
          const price = car.price;
          return price >= min && price <= max;
        });
        
        renderList(filteredCars);
        updateCount(filteredCars.length);
      }
      
      // Scroll to inventory section
      document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Handle scroll for header
let lastScroll = 0;
const header = document.querySelector('header');
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
  
  // Animate elements on scroll
  const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 50) {
      element.classList.add('opacity-100', 'translate-y-0');
    }
  });
}

// Initialize Promo Cards functionality
function initPromoCards() {
  // Get all promo cards
  const promoButtons = document.querySelectorAll('.promo-card button');
  
  // Add click event to each promo card
  promoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const promoType = button.closest('.promo-card').dataset.promo;
      
      // Show modal or navigate based on promo type
      switch(promoType) {
        case 'cicilan':
          showPromoModal(
            'Cicilan 0% Hingga 5 Tahun',
            'Nikmati kemudahan pembayaran dengan cicilan 0% hingga 5 tahun untuk semua tipe kendaraan. Syarat dan ketentuan berlaku.',
            [
              '✓ DP mulai dari 20%',
              '✓ Tenor hingga 60 bulan',
              '✓ Bunga 0%',
              '✓ Proses cepat & mudah',
              '✓ Tanpa biaya admin'
            ]
          );
          break;
          
        case 'garansi':
          showPromoModal(
            'Garansi Resmi 7 Tahun',
            'Dapatkan garansi resmi pabrik hingga 7 tahun untuk kendaraan baru Anda. Nikmati ketenangan berkendara dengan perlindungan maksimal.',
            [
              '✓ Garansi mesin & transmisi',
              '✓ Garansi kelistrikan',
              '✓ Garansi body & cat',
              '✓ Free service berkala',
              '✓ Bisa diperpanjang'
            ]
          );
          break;
          
        case 'asuransi':
          showPromoModal(
            'Asuransi All Risk 1 Tahun',
            'Gratis asuransi all risk 1 tahun untuk pembelian kendaraan baru. Perlindungan komprehensif untuk kendaraan kesayangan Anda.',
            [
              '✓ Total Loss Only (TLO)',
              '✓ Natural Disaster',
              '✓ Third Party Liability',
              '✓ Personal Accident',
              '✓ 24/7 Emergency Service'
            ]
          );
          break;
      }
    });
  });
}

// Show promo modal with details
function showPromoModal(title, description, features) {
  // Create modal if not exists
  let modal = document.getElementById('promoModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'promoModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 hidden';
    modal.innerHTML = `
      <div class="bg-gray-800 rounded-xl max-w-md w-full mx-4 overflow-hidden shadow-2xl">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-white" id="promoModalTitle"></h3>
            <button id="closePromoModal" class="text-gray-400 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p id="promoModalDesc" class="mt-3 text-gray-300"></p>
          <ul id="promoModalFeatures" class="mt-4 space-y-2"></ul>
          <div class="mt-6 flex justify-end space-x-3">
            <button id="applyPromo" class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
              Ajukan Sekarang
            </button>
            <button id="closePromoBtn" class="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('closePromoModal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    
    document.getElementById('closePromoBtn').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    
    document.getElementById('applyPromo').addEventListener('click', () => {
      // Scroll to contact section when apply button is clicked
      modal.classList.add('hidden');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
  
  // Update modal content
  document.getElementById('promoModalTitle').textContent = title;
  document.getElementById('promoModalDesc').textContent = description;
  
  const featuresList = document.getElementById('promoModalFeatures');
  featuresList.innerHTML = features.map(feature => 
    `<li class="flex items-start">
      <svg class="h-5 w-5 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-gray-300">${feature}</span>
    </li>`
  ).join('');
  
  // Show modal
  modal.classList.remove('hidden');
}

// Initialize Unit Tersedia section functionality
function initUnitTersedia() {
  // Filter buttons
  const filterButtons = document.querySelectorAll('.unit-filter-btn');
  const unitItems = document.querySelectorAll('.unit-item');
  
  // Filter units by category
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-cyan-600', 'text-white');
        btn.classList.add('bg-gray-800', 'text-gray-300');
      });
      button.classList.remove('bg-gray-800', 'text-gray-300');
      button.classList.add('bg-cyan-500', 'text-white');
      
      const filter = button.dataset.filter;
      
      // Show/hide units based on filter
      unitItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          // Add animation
          item.classList.add('opacity-0');
          setTimeout(() => {
            item.classList.remove('opacity-0');
            item.classList.add('opacity-100');
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Initialize detail buttons
  const detailButtons = document.querySelectorAll('.detail-btn');
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const carId = button.dataset.carId;
      window.location.href = `pages/${carId}.html`; // Arahkan ke halaman detail mobil di folder pages
    });
  });
  
  // Initialize "Lihat Semua Unit" button
  const lihatSemuaBtn = document.getElementById('lihat-semua-unit');
  if (lihatSemuaBtn) {
    lihatSemuaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inventorySection = document.getElementById('inventory');
      if (inventorySection) {
        window.scrollTo({
          top: inventorySection.offsetTop - 80, // Offset untuk header yang fixed
          behavior: 'smooth'
        });
      }
    });
  }
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Car showcase YouTube video mapping
const CAR_VIDEOS = {
  'supra-mk4': 'y27s51bR8Og',      // Why the Toyota mk4 Supra is so AMAZING
  'bmw-m4': 'AtJlDh_6IR8',         // 2026 BMW M4 Competition xDrive: Start Up, Exhaust, Test Drive
  'civic-type-r': 'oF1aW0Q9r-E',   // 2024 Honda Civic Type R | POV Test Drive
  'gr86': 'VV6rXS0gbk4',            // 2024 Toyota GR86 Premium: TEST DRIVE+FULL REVIEW
  'brz': 'TXIHhhlQ-C0',             // 2024 Subaru BRZ Limited: Start Up, Exhaust, Test Drive
  'amg45s': 'VlnlPed3_-s',         // The New Mercedes AMG A45 S Facelift 2024 Test Drive
  'lexus-lm': 'QXVVgEFbvyQ',       // Lexus LM review (placeholder)
  'vellfire': 'QXVVgEFbvyQ',       // Vellfire review (placeholder)
  'alphard': 'QXVVgEFbvyQ',        // Alphard review (placeholder)
  'byd-seal': 'QXVVgEFbvyQ',       // BYD Seal review (placeholder)
  'bmw-i7': 'QXVVgEFbvyQ',         // BMW i7 review (placeholder)
  'ioniq5': 'QXVVgEFbvyQ',         // Ioniq 5 review (placeholder)
  'fortuner': 'QXVVgEFbvyQ',       // Fortuner review (placeholder)
  'pajero': 'QXVVgEFbvyQ',         // Pajero review (placeholder)
  'palisade': 'QXVVgEFbvyQ'        // Palisade review (placeholder)
};

// Data mobil
const CARS = [
  {
    id: 'supra-mk4',
    name: 'Toyota Supra MK4 (A80)',
    type: 'Sport',
    price: 1350000000,
    seats: 2,
    transmission: 'Manual',
    image: 'images/supra-mk4.jpeg',
    badge: 'performance',
    desc: 'Ikon JDM dengan mesin 2JZ yang melegenda. Tenaga buas dengan gaya retro futuristik.'
  },
  {
    id: 'bmw-m4',
    name: 'BMW M4 Competition',
    type: 'Sport',
    price: 2100000000,
    seats: 4,
    transmission: 'Automatic',
    image: 'images/bmw-m4.jpeg',
    badge: 'Performance',
    desc: 'Coupe sport bertenaga besar dengan akselerasi eksplosif dan handling presisi khas M series.'
  },
  {
    id: 'civic-type-r',
    name: 'Honda Civic Type R 2023',
    type: 'Sedan',
    price: 1200000000,
    seats: 4,
    transmission: 'Manual',
    image: 'images/civic-type-r.jpeg',
    badge: 'performance',
    desc: 'Performa tinggi dengan desain agresif dan DNA balap sejati dari Honda Racing.'
  },
  {
    id: 'gr86',
    name: 'Toyota GR86',
    type: 'Sport',
    price: 1029900000,
    seats: 2,
    transmission: 'Automatic / Manual',
    image: 'images/gr86.jpg',
    badge: 'Performance',
    desc: 'Sport coupe kompak yang menawarkan sensasi berkendara autentik.'
  },
  {
    id: 'brz',
    name: 'Subaru BRZ',
    type: 'Sport',
    price: 920000000,
    seats: 2,
    transmission: 'Automatic / Manual',
    image: 'images/BRZ.jpg',
    badge: 'Performance',
    desc: 'Sport coupe dengan keseimbangan sasis yang luar biasa dan handling presisi.'
  },
  {
    id: 'amg45s',
    name: 'Mercedes-Benz AMG 45 S',
    type: 'Sedan',
    price: 2185000000,
    seats: 4,
    transmission: 'Automatic',
    image: 'images/AMG45.jpg',
    badge: 'performance',
    desc: 'Sedan coupe performa tinggi dengan mesin AMG yang eksplosif.'
  },
  {
    id: 'lexus-lm',
    name: 'Lexus LM 350',
    type: 'Luxury',
    price: 3250000000,
    seats: 7,
    transmission: 'Automatic',
    image: 'images/lexus-lm.jpeg',
    badge: 'Luxury',
    desc: 'MPV ultra mewah dengan kabin seperti jet pribadi.'
  },
  {
    id: 'vellfire',
    name: 'Toyota Vellfire',
    type: 'Luxury',
    price: 1955900000,
    seats: 7,
    transmission: 'Automatic',
    image: 'images/Toyota Vellfire.jpg',
    badge: 'Luxury',
    desc: 'MPV premium berdesain flamboyan dengan kabin lapang.'
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard',
    type: 'Luxury',
    price: 1736600000,
    seats: 7,
    transmission: 'Automatic',
    image: 'images/Alphard.jpg',
    badge: 'Luxury',
    desc: 'MPV luxury kelas atas dengan material interior premium.'
  },
  {
    id: 'byd-seal',
    name: 'BYD Seal',
    type: 'Sedan',
    price: 700000000,
    seats: 4,
    transmission: 'Automatic',
    image: 'images/BYD.jpg',
    badge: 'Electric',
    desc: 'Sedan listrik modern dengan desain aerodinamis futuristis.'
  },
  {
    id: 'bmw-i7',
    name: 'BMW I7',
    type: 'Sedan',
    price: 3415000000,
    seats: 5,
    transmission: 'Automatic',
    image: 'images/BMW i7.jpg',
    badge: 'Electric',
    desc: 'Sedan listrik ultra-premium dengan teknologi flagship.'
  },
  {
    id: 'ioniq5',
    name: 'Hyundai Ioniq 5',
    type: 'SUV',
    price: 890000000,
    seats: 5,
    transmission: 'Automatic',
    image: 'images/ioniq5.jpeg',
    badge: 'Electric',
    desc: 'SUV futuristik dengan tenaga listrik murni.'
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    type: 'SUV',
    price: 780000000,
    seats: 7,
    transmission: 'Manual',
    image: 'images/Fortuner.jpg',
    badge: 'SUV',
    desc: 'SUV tangguh berkarisma premium dengan performa bertenaga.'
  },
  {
    id: 'pajero',
    name: 'Mitsubishi Pajero Sport',
    type: 'SUV',
    price: 779650000,
    seats: 7,
    transmission: 'Automatic',
    image: 'images/Pajero.jpg',
    badge: 'SUV',
    desc: 'SUV ladder-frame berdesain gagah dengan performa diesel bertenaga.'
  },
  {
    id: 'palisade',
    name: 'Hyundai Palisade',
    type: 'SUV',
    price: 943800000,
    seats: 7,
    transmission: 'Automatic',
    image: 'images/Palisade.jpg',
    badge: 'SUV',
    desc: 'SUV flagship berkelas dengan kenyamanan kabin premium.'
  }
];

// Helpers
function formatIDR(n) {
  return n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
}

// Ambil elemen
const cardsEl = document.getElementById('cards');
const countEl = document.getElementById('count');
const noResultsEl = document.getElementById('no-results');
const typeFilter = document.getElementById('type-filter');
const seatFilter = document.getElementById('seat-filter');
const searchInput = document.getElementById('search');

// Buat card - Enhanced Design with Interactive Animations
function createCard(car) {
  const wrap = document.createElement('article');
  wrap.className = 'inventory-card group bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-700/60 hover:shadow-2xl hover:border-white/40 transition-all duration-400 relative';

  wrap.innerHTML = `
    <div class="relative overflow-hidden">
      <img src="${car.image}" alt="${car.name}" class="car-image w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      <div class="car-badge absolute left-4 top-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full px-3 py-1 text-sm font-medium shadow-lg border border-white/50">${car.badge}</div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
    </div>

    <div class="p-5">
      <div class="flex items-start justify-between mb-3">
        <h3 class="car-title text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-400">${car.name}</h3>
        <span class="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium border border-white/30">${car.type}</span>
      </div>

      <div class="flex items-center justify-between mb-4">
        <p class="car-price text-2xl font-black text-white">${formatIDR(car.price)}</p>
        <div class="flex items-center gap-1.5">
          <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span class="text-sm font-bold text-gray-300">4.8</span>
        </div>
      </div>
      
      <p class="text-gray-300 text-sm line-clamp-2 mb-5 leading-relaxed font-medium">${car.desc}</p>

      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <div class="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span class="font-semibold text-white">${car.transmission}</span>
          </div>
          <div class="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="font-semibold text-white">${car.seats} seats</span>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <a href="pages/${car.id}.html" 
           class="flex-1 inventory-ripple-effect px-5 py-3 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 text-center border border-blue-400">
           <span class="flex items-center justify-center gap-2">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
             </svg>
             Detail
           </span>
        </a>

        <a href="buy.html?id=${car.id}" 
           class="flex-1 inventory-ripple-effect px-5 py-3 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 text-center border border-emerald-400">
           <span class="flex items-center justify-center gap-2">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
             </svg>
             Beli
           </span>
        </a>
      </div>
    </div>
  `;
  return wrap;
}



// Variabel DOM akan didefinisikan dalam DOMContentLoaded

// Render list mobil dengan animasi
function renderList(list) {
  console.log('renderList called with', list.length, 'cars');
  console.log('window.cardsEl:', !!window.cardsEl);
  
  if (!window.cardsEl) {
    console.error('Cards element not found!');
    return;
  }
  
  window.cardsEl.innerHTML = '';
  if (!list.length) {
    if (window.noResultsEl) window.noResultsEl.classList.remove('hidden');
  } else {
    if (window.noResultsEl) window.noResultsEl.classList.add('hidden');
  }

  list.forEach((car, index) => {
    const card = createCard(car);
    window.cardsEl.appendChild(card);
    
    // Add entrance animation with delay
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 100);
  });
  
  if (window.countEl) window.countEl.textContent = list.length;
  console.log('Render completed, displayed', list.length, 'cars');
}

// Filter + search
function filterCars() {
  const selectedType = window.typeFilter ? window.typeFilter.value : "";
  const selectedSeats = window.seatFilter ? window.seatFilter.value : "";
  const keyword = window.searchInput ? window.searchInput.value.toLowerCase().trim() : "";
  
  const filtered = CARS.filter(car => {
    const matchType = selectedType === "" || car.type === selectedType;
    const matchSeats = selectedSeats === "" || car.seats === parseInt(selectedSeats);
    const matchKeyword = !keyword || 
                        car.name.toLowerCase().includes(keyword) || 
                        car.type.toLowerCase().includes(keyword) ||
                        car.desc.toLowerCase().includes(keyword);
    
    return matchType && matchSeats && matchKeyword;
  });

  renderList(filtered);
}

// Car Showcase Functionality
const carShowcaseModal = document.getElementById('carShowcaseModal');
const carShowcaseBackdrop = document.getElementById('carShowcaseBackdrop');
const closeShowcaseModal = document.getElementById('closeShowcaseModal');
const openCarShowcase = document.getElementById('openCarShowcase');
const carVideo = document.getElementById('carVideo');
const carShowcaseName = document.getElementById('carShowcaseName');
const carShowcaseSpecs = document.getElementById('carShowcaseSpecs');
const carShowcaseDesc = document.getElementById('carShowcaseDesc');
const prevCarBtn = document.getElementById('prevCar');
const nextCarBtn = document.getElementById('nextCar');

let currentCarIndex = 0;
let filteredCars = [];

// Open car showcase modal
function openCarShowcaseModal() {
  filteredCars = [...CARS]; // Create a copy of all cars
  currentCarIndex = 0;
  updateCarShowcase();
  carShowcaseModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Modal ready for user interaction
}

// Close car showcase modal
function closeCarShowcaseModal() {
  carShowcaseModal.classList.add('hidden');
  document.body.style.overflow = '';
  // Clear YouTube iframe src to stop video
  carVideo.src = '';
  
  // Reset play overlay
  const overlay = document.getElementById('playButtonOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// Show play button overlay for better UX
function showPlayButtonOverlay() {
  // Create or update play button overlay
  let overlay = document.getElementById('playButtonOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'playButtonOverlay';
    overlay.className = 'absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer z-20';
    overlay.innerHTML = `
      <div class="text-center">
        <div class="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-cyan-400 transition-colors">
          <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <p class="text-white text-lg font-medium">Click to Play Video</p>
        <p class="text-gray-300 text-sm">Full controls available • No audio autoplay</p>
      </div>
    `;
    
    // Add click event to remove overlay and enable video
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      // Reload iframe with autoplay enabled
      const car = filteredCars[currentCarIndex];
      const videoId = CAR_VIDEOS[car.id] || 'QXVVgEFbvyQ';
      carVideo.src = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&disablekb=0&fs=1&iv_load_policy=3&autoplay=1`;
    });
    
    // Insert overlay after iframe
    carVideo.parentNode.insertBefore(overlay, carVideo.nextSibling);
  } else {
    overlay.style.display = 'flex';
  }
}

// Update car showcase with current car data
function updateCarShowcase() {
  if (filteredCars.length === 0) return;
  
  const car = filteredCars[currentCarIndex];
  const videoId = CAR_VIDEOS[car.id] || 'QXVVgEFbvyQ'; // Default placeholder
  
  // Update YouTube iframe src with full controls and click-to-play
  carVideo.src = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&disablekb=0&fs=1&iv_load_policy=3&autoplay=0`;
  
  // Show play button overlay for better UX
  showPlayButtonOverlay();
  
  // Update car info
  carShowcaseName.textContent = car.name;
  carShowcaseSpecs.textContent = `${car.year || '2023'} • ${car.type} • ${car.transmission}`;
  carShowcaseDesc.textContent = car.desc;
  
  // Update button states
  prevCarBtn.disabled = currentCarIndex === 0;
  nextCarBtn.disabled = currentCarIndex === filteredCars.length - 1;
}

// Event listeners for car showcase
openCarShowcase?.addEventListener('click', openCarShowcaseModal);
closeShowcaseModal?.addEventListener('click', closeCarShowcaseModal);
carShowcaseBackdrop?.addEventListener('click', (e) => {
  if (e.target === carShowcaseBackdrop) {
    closeCarShowcaseModal();
  }
});

// Navigation between cars
prevCarBtn?.addEventListener('click', () => {
  if (currentCarIndex > 0) {
    currentCarIndex--;
    updateCarShowcase();
  }
});

nextCarBtn?.addEventListener('click', () => {
  if (currentCarIndex < filteredCars.length - 1) {
    currentCarIndex++;
    updateCarShowcase();
  }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!carShowcaseModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeCarShowcaseModal();
    } else if (e.key === 'ArrowLeft' && currentCarIndex > 0) {
      currentCarIndex--;
      updateCarShowcase();
    } else if (e.key === 'ArrowRight' && currentCarIndex < filteredCars.length - 1) {
      currentCarIndex++;
      updateCarShowcase();
    }
  }
});

// Render awal dipindahkan ke dalam DOMContentLoaded

