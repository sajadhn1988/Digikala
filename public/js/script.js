// DOM elements
const sliderTrack = document.getElementById("sliderTrack");
const prevButton = document.querySelector(".nav-button.prev");
const nextButton = document.querySelector(".nav-button.next");
const progress = document.getElementById("progress");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// Slider state - SIMPLIFIED like old-gigikala.html
let currentPosition = 0;
let cardWidth = 0;
let cardsToShow = 7;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Filter discounted products for the slider
 */
function getDiscountedProducts() {
  return products.filter((product) => product.discounted === true);
}

/**
 * Filter non-discounted products for other sections
 */
function getNonDiscountedProducts() {
  return products.filter((product) => product.discounted === false);
}

// renderStars moved to nav.js

// ============================================
// BANNER SLIDER FUNCTIONALITY
// ============================================

/**
 * Initialize banner slider
 */
function initBannerSlider() {
  const bannerSlides = document.querySelector(".banner-slides");
  const bannerDots = document.querySelector(".banner-dots");
  const prevBtn = document.querySelector(".banner-prev");
  const nextBtn = document.querySelector(".banner-next");

  if (!bannerSlides) return;

  // Banner data - you can extend this array with more banners
  const banners = [
    {
      image: "uploads/images/banners/banner1.png",
      link: "#", // Add your link here
    },
    {
      image: "uploads/images/banners/banner2.png",
      link: "#", // Add your link here
    },
    // Add more banners as needed:
    // { image: 'images/banners/banner3.png', link: '#' }
  ];

  let currentSlide = 0;
  let slideInterval;

  // Create slides
  function createSlides() {
    bannerSlides.innerHTML = "";
    bannerDots.innerHTML = "";

    banners.forEach((banner, index) => {
      // Create slide
      const slide = document.createElement("div");
      slide.className = "banner-slide";

      const img = document.createElement("img");
      img.src = banner.image;
      img.alt = `Banner ${index + 1}`;
      img.loading = "lazy";

      // Make banner clickable if link is provided
      if (banner.link) {
        const link = document.createElement("a");
        link.href = banner.link;
        link.style.display = "block";
        link.style.width = "100%";
        link.style.height = "100%";
        link.appendChild(img);
        slide.appendChild(link);
      } else {
        slide.appendChild(img);
      }

      bannerSlides.appendChild(slide);

      // Create dot
      const dot = document.createElement("div");
      dot.className = `banner-dot ${index === 0 ? "active" : ""}`;
      dot.setAttribute("data-index", index);

      dot.addEventListener("click", () => {
        goToSlide(index);
      });

      bannerDots.appendChild(dot);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  // Update slider position
  function updateSlider() {
    const slideWidth = 100; // Percentage
    bannerSlides.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

    // Update active dot
    document.querySelectorAll(".banner-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % banners.length;
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + banners.length) % banners.length;
    updateSlider();
  }

  // Auto slide
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  // Pause auto slide on hover
  function setupHoverPause() {
    bannerSlides.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    bannerSlides.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize
  function init() {
    createSlides();

    // Event listeners
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") prevSlide(); // RTL: right arrow goes to previous
      if (e.key === "ArrowLeft") nextSlide(); // RTL: left arrow goes to next
    });

    // Auto slide
    startAutoSlide();
    setupHoverPause();

    // Update on window resize
    window.addEventListener("resize", updateSlider);
  }

  // Start initialization
  if (banners.length > 0) {
    init();
  } else {
    // Hide banner section if no banners
    document.querySelector(".hero").style.display = "none";
  }
}

// ============================================
// SLIDER FUNCTIONALITY - SIMPLIFIED LIKE OLD VERSION
// ============================================

/**
 * Initialize the slider
 */
function initSlider() {
  renderProducts();
  calculateCardWidth();
  updateSlider();
  setupEventListeners();
  startTimer();

  // Recalculate on window resize
  window.addEventListener("resize", () => {
    calculateCardWidth();
    updateSlider();
  });
}

/**
 * Calculate card width including gap
 */
function calculateCardWidth() {
  if (sliderTrack.children.length > 0) {
    const card = sliderTrack.children[0];
    const gap = 15;
    // Use getBoundingClientRect for sub-pixel precision
    cardWidth = card.getBoundingClientRect().width + gap;

    // Calculate how many cards to show based on container width
    const containerWidth = sliderTrack.parentElement.clientWidth;
    cardsToShow = Math.max(1, Math.floor(containerWidth / cardWidth));
  }
}

/**
 * Render product cards (only discounted products)
 */
function renderProducts() {
  sliderTrack.innerHTML = "";

  const discountedProducts = getDiscountedProducts();

  // Helper to create card HTML
  const createCardHTML = (product) => `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            <img src="${product.image}" alt="${product.title
    }" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-rating">
                    <div class="rating-count">(${product.ratingCount})</div>
                    <div class="rating-stars">
                        ${renderStars(product.rating)}
                    </div>
                </div>
                <div class="price-section">
                    <div class="discount-badge-small">${product.discount}</div>
                    <div class="price">
                        <div class="current-price">${formatPersianNumber(product.price)} تومان</div>
                        <div class="old-price">${formatPersianNumber(product.oldPrice)} تومان</div>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Add only discounted products
  discountedProducts.forEach((product) => {
    sliderTrack.innerHTML += createCardHTML(product);
  });

  // Add "See More" card at the end
  sliderTrack.innerHTML += `
        <div class="product-card see-more-card" onclick="alert('بیشتر محصولات را مشاهده کنید!')" style="cursor: pointer;">
            <div class="see-more-content">
                <i class="fas fa-arrow-left see-more-icon"></i>
                <div class="see-more-text">محصولات بیشتر</div>
            </div>
        </div>
    `;
}

/**
 * Update slider position
 */
function updateSlider() {
  sliderTrack.style.transform = `translateX(${currentPosition}px)`;
  updateProgress();
  updateButtonStates();
}

/**
 * Helper to get max position
 */
function getMaxPosition() {
  const containerWidth = sliderTrack.parentElement.clientWidth;
  const discountedProducts = getDiscountedProducts();
  const totalCards = discountedProducts.length + 1; // +1 for see-more card
  return Math.max(0, totalCards * cardWidth - containerWidth + 10);
}

/**
 * Update button states
 */
function updateButtonStates() {
  const maxPosition = getMaxPosition();
  const buffer = 5;

  nextButton.disabled = currentPosition >= maxPosition - buffer;
  prevButton.disabled = currentPosition <= buffer;
}

/**
 * Update progress bar
 */
function updateProgress() {
  const totalWidth =
    sliderTrack.scrollWidth - sliderTrack.parentElement.offsetWidth;
  if (totalWidth > 0) {
    const progressWidth = (Math.abs(currentPosition) / totalWidth) * 100;
    progress.style.width = `${Math.min(100, progressWidth)}%`;
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  prevButton.addEventListener("click", slidePrev);
  nextButton.addEventListener("click", slideNext);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") slidePrev();
    if (e.key === "ArrowLeft") slideNext();
  });

  // Drag events - SIMPLIFIED VERSION
  let isDragging = false;
  let startPos = 0;
  let prevTranslate = 0;

  function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    prevTranslate = currentPosition;
    sliderTrack.style.cursor = "grabbing";
    sliderTrack.style.transition = "none";
  }

  function dragMove(event) {
    if (isDragging) {
      const currentPositionX = getPositionX(event);
      const diff = currentPositionX - startPos;
      currentPosition = prevTranslate + diff;
      sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    }
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    sliderTrack.style.cursor = "grab";
    sliderTrack.style.transition = "transform 0.5s ease";

    // Snap to nearest card
    calculateCardWidth();
    const nearestIndex = Math.round(currentPosition / cardWidth);
    currentPosition = nearestIndex * cardWidth;

    // Constrain to valid range
    const maxPosition = getMaxPosition();
    currentPosition = Math.max(0, Math.min(maxPosition, currentPosition));

    updateSlider();
  }

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  // Mouse events
  sliderTrack.addEventListener("mousedown", dragStart);
  sliderTrack.addEventListener("mousemove", dragMove);
  sliderTrack.addEventListener("mouseup", dragEnd);
  sliderTrack.addEventListener("mouseleave", dragEnd);

  // Touch events
  sliderTrack.addEventListener("touchstart", dragStart);
  sliderTrack.addEventListener("touchmove", dragMove);
  sliderTrack.addEventListener("touchend", dragEnd);
}

/**
 * Slide to next items (left in RTL, so move track Right/Positive)
 */
function slideNext() {
  calculateCardWidth();
  const maxPosition = getMaxPosition();

  if (currentPosition < maxPosition) {
    currentPosition += cardWidth * cardsToShow;
    if (currentPosition > maxPosition) currentPosition = maxPosition;
    updateSlider();
  }
}

/**
 * Slide to previous items (right in RTL, so move track Left/Negative)
 */
function slidePrev() {
  calculateCardWidth();

  if (currentPosition > 0) {
    currentPosition -= cardWidth * cardsToShow;
    if (currentPosition < 0) currentPosition = 0;
    updateSlider();
  }
}

/**
 * Timer functionality
 */
function startTimer() {
  let hours = 2;
  let minutes = 45;
  let seconds = 18;

  const timerInterval = setInterval(() => {
    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;

      if (minutes < 0) {
        minutes = 59;
        hours--;

        if (hours < 0) {
          clearInterval(timerInterval);
          return;
        }
      }
    }

    hoursElement.textContent = hours.toString().padStart(2, "۰");
    minutesElement.textContent = minutes.toString().padStart(2, "۰");
    secondsElement.textContent = seconds.toString().padStart(2, "۰");
  }, 1000);
}

// ============================================
// SELECTED PRODUCTS GRID FUNCTIONALITY
// ============================================

const selectedProductsGrid = document.getElementById("selectedProductsGrid");

/**
 * Render selected products in grid (mixed discounted and non-discounted)
 */
function renderSelectedProducts() {
  if (!selectedProductsGrid) return;

  selectedProductsGrid.innerHTML = "";

  // Helper to create card HTML
  const createCardHTML = (product) => `
        <div class="product-card">
            <div onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <div class="product-rating">
                        <div class="rating-count">(${product.ratingCount})</div>
                        <div class="rating-stars">
                            ${renderStars(product.rating)}
                        </div>
                    </div>
                    <div class="price-section">
                        ${product.discounted ? `<div class="discount-badge-small">${product.discount}</div>` : ""}
                        <div class="price">
                            <div class="current-price">${formatPersianNumber(product.price)} تومان</div>
                            ${product.discounted ? `<div class="old-price">${formatPersianNumber(product.oldPrice)} تومان</div>` : ""}
                        </div>
                    </div>
                </div>
            </div>
            <button class="add-to-cart-small" onclick="event.stopPropagation(); addToCart(${product.id}, 1); showToast()">
                <i class="fas fa-cart-plus"></i>
            </button>
        </div>
    `;

  // Add mixed products (first 10 products from the array)
  for (let i = 0; i < 10; i++) {
    const product = products[i];
    if (product) {
      selectedProductsGrid.innerHTML += createCardHTML(product);
    }
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Safe initialization wrapper
 */
function safeInit() {
  try {
    console.log("🚀 Starting Gigikala initialization...");

    // Check if data.js was loaded
    if (typeof products === "undefined") {
      console.warn("⚠️ products data not loaded yet");
      // Retry after a short delay
      setTimeout(safeInit, 100);
      return;
    }

    if (typeof categories === "undefined") {
      console.warn("⚠️ categories data not loaded yet");
      setTimeout(safeInit, 100);
      return;
    }

    // Log what we're initializing
    console.log("📊 Data loaded:", {
      productsCount: products?.length || 0,
      categoriesCount: categories?.length || 0,
    });

    // Initialize components in a specific order
    const initSteps = [
      { name: "Mobile Menu", fn: initMobileMenu },
      { name: "Banner Slider", fn: initBannerSlider },
      { name: "Main Slider", fn: initSlider },
      { name: "Selected Products", fn: renderSelectedProducts },
      { name: "Mobile Category Menu", fn: initMobileCategoryMenu },
      { name: "Mega Menu", fn: initMegaMenu },
      { name: "Sidebar Categories", fn: renderSidebarCategories },
    ];

    let successCount = 0;
    let errorCount = 0;

    initSteps.forEach((step) => {
      try {
        console.log(`🔄 Initializing: ${step.name}`);
        if (typeof step.fn === 'function') {
          step.fn();
          successCount++;
          console.log(`✅ ${step.name} initialized`);
        } else {
          console.warn(`⚠️ Function for ${step.name} not found`);
        }
      } catch (stepError) {
        errorCount++;
        console.error(`❌ Failed to initialize ${step.name}:`, stepError);
      }
    });

    console.log(
      `🎉 Gigikala initialization complete. ${successCount} successful, ${errorCount} failed`
    );

    // If critical components failed, show a user-friendly message
    if (errorCount > 3) {
      console.warn("⚠️ Multiple components failed to initialize");
      // You could add a fallback UI here
    }
  } catch (error) {
    console.error("💥 Critical initialization error:", error);
    console.trace(); // Show stack trace

    // Try to recover by initializing core features only
    try {
      console.log("🔄 Attempting recovery...");
      initSlider();
      renderSelectedProducts();
    } catch (recoveryError) {
      console.error("💥 Recovery also failed:", recoveryError);
    }
  }
}

/**
 * Enhanced DOM ready checker
 */
function domReady() {
  console.log("📄 Document ready state:", document.readyState);

  if (document.readyState === "loading") {
    console.log("⏳ Waiting for DOM to load...");
    document.addEventListener("DOMContentLoaded", function onDOMLoaded() {
      console.log("✅ DOM fully loaded");
      document.removeEventListener("DOMContentLoaded", onDOMLoaded);
      // Small delay to ensure all scripts are loaded
      setTimeout(safeInit, 50);
    });
  } else {
    console.log("⚡ DOM already loaded, initializing...");
    // Small delay to ensure other scripts are ready
    setTimeout(safeInit, 50);
  }
}

// Global error handler to catch unhandled errors
window.addEventListener("error", function (event) {
  console.error("🚨 Unhandled error:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (event) {
  console.error("🚨 Unhandled promise rejection:", event.reason);
});

// Start initialization with safety wrapper
try {
  console.log("🔧 Starting Gigikala...");
  domReady();
} catch (startupError) {
  console.error("💥 Failed to start Gigikala:", startupError);
}

// Global functions for potential external use
window.Gigikala = {
  init: safeInit,
  products: typeof products !== "undefined" ? products : [],
  categories: typeof categories !== "undefined" ? categories : [],
  getDiscountedProducts,
  initBannerSlider,
  getNonDiscountedProducts,
  initSlider,
  renderSelectedProducts,


  // Debug utilities
  debug: {
    logState: function () {
      console.log("🔄 Current Gigikala state:", {
        productsCount: this.products.length,
        categoriesCount: this.categories.length,
        discountedProducts: this.getDiscountedProducts().length,
      });
    },
    reload: function () {
      console.log("🔄 Reloading Gigikala...");
      safeInit();
    },
  },
};

// Make sure we have fallbacks if data.js isn't loaded
if (typeof products === "undefined") {
  console.warn("⚠️ products variable not defined. Did data.js load?");
  window.products = [];
}

if (typeof categories === "undefined") {
  console.warn("⚠️ categories variable not defined. Did data.js load?");
  window.categories = [];
}

// Check script load order
console.log("📦 Script loading order check:", {
  dataLoaded:
    typeof products !== "undefined" && typeof categories !== "undefined",
  scriptLoaded: true,
  timestamp: new Date().toISOString(),
});

// Export for module usage (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Gigikala };
}

// If running in Node.js environment (for testing)
if (
  typeof process !== "undefined" &&
  process.versions &&
  process.versions.node
) {
  console.log("🌲 Running in Node.js environment");
}
