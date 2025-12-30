// renderStars moved to nav.js
// initialization handled by domReadyCategory at the end of file

/**
 * Filter discounted products for the slider
 */
function getDiscountedProducts() {
  if (typeof products === "undefined") return [];
  return products.filter((product) => product.discounted === true);
}

/**
 * Filter non-discounted products for other sections
 */
function getNonDiscountedProducts() {
  if (typeof products === "undefined") return [];
  return products.filter((product) => product.discounted === false);
}

// ============================================
// CATEGORY PAGE FUNCTIONALITY
// ============================================

// Category Page Functionality
class CategoryPage {
  constructor() {
    this.currentCategory = null;
    this.currentSubcategory = null;
    this.currentMicrocategory = null;
    this.currentNanocategory = null;
    this.currentPicocategory = null;
    this.filters = {
      minPrice: null,
      maxPrice: null,
      minRating: null,
      discountedOnly: false,
      searchQuery: "",
    };
    this.specificFilters = {}; // New: Store category-specific filters
    this.sortBy = "default";
    this.viewMode = "grid";
    this.currentPage = 1;
    this.itemsPerPage = 15;

    // برای مدیریت timeoutها
    this.searchTimeout = null;
    this.priceTimeout = null;

    this.init();
  }

  init() {
    console.log("🎯 Initializing CategoryPage with hierarchical specific filters...");
    this.getUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters(); // Render specific filters based on current selection
    this.renderProducts();
    this.setupEventListeners();
    this.updatePageTitle();
    this.updateFormValues();
    initCategoryTreeToggle();
  }

  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get category parameters
    this.currentCategory = urlParams.get("cat") || null;
    this.currentSubcategory = urlParams.get("sub") || null;
    this.currentMicrocategory = urlParams.get("micro") || null;
    this.currentNanocategory = urlParams.get("nano") || null;
    this.currentPicocategory = urlParams.get("pico") || null;

    // Get filter parameters
    this.filters.minPrice = urlParams.get("minPrice") || null;
    this.filters.maxPrice = urlParams.get("maxPrice") || null;
    this.filters.minRating = urlParams.get("rating") || null;
    this.filters.discountedOnly = urlParams.get("discounted") === "true";
    this.filters.searchQuery = urlParams.get("q") || "";

    // Get specific filters from URL
    const specificFiltersParam = urlParams.get("specificFilters");
    if (specificFiltersParam) {
      try {
        this.specificFilters = JSON.parse(specificFiltersParam);
      } catch (e) {
        this.specificFilters = {};
        console.warn("⚠️ Failed to parse specific filters:", e);
      }
    }

    // Get sort and view parameters
    this.sortBy = urlParams.get("sort") || "default";
    this.viewMode = urlParams.get("view") || "grid";
    this.currentPage = parseInt(urlParams.get("page")) || 1;

    console.log("📊 URL Parameters loaded:", {
      category: this.currentCategory,
      subcategory: this.currentSubcategory,
      microcategory: this.currentMicrocategory,
      nanocategory: this.currentNanocategory,
      picocategory: this.currentPicocategory,
      sortBy: this.sortBy,
      filters: this.filters,
      specificFilters: this.specificFilters
    });
  }

  updateUrlParams() {
    const params = new URLSearchParams();

    // Add category parameters
    if (this.currentCategory) params.set("cat", this.currentCategory);
    if (this.currentSubcategory) params.set("sub", this.currentSubcategory);
    if (this.currentMicrocategory) params.set("micro", this.currentMicrocategory);
    if (this.currentNanocategory) params.set("nano", this.currentNanocategory);
    if (this.currentPicocategory) params.set("pico", this.currentPicocategory);

    // Add filter parameters
    if (this.filters.minPrice) params.set("minPrice", this.filters.minPrice);
    if (this.filters.maxPrice) params.set("maxPrice", this.filters.maxPrice);
    if (this.filters.minRating) params.set("rating", this.filters.minRating);
    if (this.filters.discountedOnly) params.set("discounted", "true");
    if (this.filters.searchQuery) params.set("q", this.filters.searchQuery);

    // Add specific filters
    if (Object.keys(this.specificFilters).length > 0) {
      params.set("specificFilters", JSON.stringify(this.specificFilters));
    }

    // Add sort and view parameters
    if (this.sortBy !== "default") params.set("sort", this.sortBy);
    if (this.viewMode !== "grid") params.set("view", this.viewMode);
    if (this.currentPage > 1) params.set("page", this.currentPage);

    // Update URL without page reload
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    console.log("🔄 URL updated:", newUrl);
  }

  renderCategoryTree() {
    const categoryTree = document.getElementById("categoryTree");
    if (!categoryTree) return;

    categoryTree.innerHTML = "";

    if (typeof categories === "undefined") {
      console.error("⚠️ Categories data not available for category tree");
      return;
    }

    categories.forEach((category) => {
      const isActive = category.id === this.currentCategory;
      const hasChildren =
        category.subcategories && category.subcategories.length > 0;

      const categoryItem = document.createElement("div");
      categoryItem.className = "category-item";

      const categoryLink = document.createElement("a");
      categoryLink.href = "#";
      categoryLink.className = `category-link ${isActive ? "active" : ""} ${hasChildren ? "has-children" : ""
        }`;
      categoryLink.textContent = category.name;
      categoryLink.dataset.categoryId = category.id;

      categoryLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleCategoryClick(category.id);
      });

      categoryItem.appendChild(categoryLink);

      // Render subcategories if this category is active
      if (isActive && hasChildren) {
        const subcategoriesDiv = document.createElement("div");
        subcategoriesDiv.className = "subcategories show";

        category.subcategories.forEach((subcategory) => {
          const isSubActive = subcategory.id === this.currentSubcategory;

          const subcategoryLink = document.createElement("a");
          subcategoryLink.href = "#";
          subcategoryLink.className = `subcategory-link ${isSubActive ? "active" : ""
            }`;
          subcategoryLink.textContent = subcategory.name;
          subcategoryLink.dataset.subcategoryId = subcategory.id;

          subcategoryLink.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleSubcategoryClick(category.id, subcategory.id);
          });

          subcategoriesDiv.appendChild(subcategoryLink);

          // Render microcategories if this subcategory is active
          if (isSubActive && subcategory.microcategories) {
            subcategory.microcategories.forEach((microcategory) => {
              const isMicroActive =
                microcategory.id === this.currentMicrocategory;

              const microcategoryLink = document.createElement("a");
              microcategoryLink.href = "#";
              microcategoryLink.className = `subcategory-link ${isMicroActive ? "active" : ""
                }`;
              microcategoryLink.textContent = `› ${microcategory.name}`;
              microcategoryLink.dataset.microcategoryId = microcategory.id;
              microcategoryLink.style.paddingRight = "30px";

              microcategoryLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.handleMicrocategoryClick(
                  category.id,
                  subcategory.id,
                  microcategory.id
                );
              });

              subcategoriesDiv.appendChild(microcategoryLink);

              // Render Nanocategories if this microcategory is active
              if (isMicroActive && microcategory.nanocategories) {
                microcategory.nanocategories.forEach((nanocategory) => {
                  const isNanoActive = nanocategory.id === this.currentNanocategory;

                  const nanocategoryLink = document.createElement("a");
                  nanocategoryLink.href = "#";
                  nanocategoryLink.className = `subcategory-link ${isNanoActive ? "active" : ""}`;
                  nanocategoryLink.textContent = `›› ${nanocategory.name}`;
                  nanocategoryLink.dataset.nanocategoryId = nanocategory.id;
                  nanocategoryLink.style.paddingRight = "45px";
                  nanocategoryLink.style.fontSize = "0.8rem";

                  nanocategoryLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.handleNanocategoryClick(
                      category.id,
                      subcategory.id,
                      microcategory.id,
                      nanocategory.id
                    );
                  });

                  subcategoriesDiv.appendChild(nanocategoryLink);

                  // Render Picocategories if this nanocategory is active
                  if (isNanoActive && nanocategory.picocategories) {
                    nanocategory.picocategories.forEach((picocategory) => {
                      const isPicoActive = picocategory.id === this.currentPicocategory;

                      const picocategoryLink = document.createElement("a");
                      picocategoryLink.href = "#";
                      picocategoryLink.className = `subcategory-link ${isPicoActive ? "active" : ""}`;
                      picocategoryLink.textContent = `››› ${picocategory.name}`;
                      picocategoryLink.dataset.picocategoryId = picocategory.id;
                      picocategoryLink.style.paddingRight = "60px";
                      picocategoryLink.style.fontSize = "0.75rem";

                      picocategoryLink.addEventListener("click", (e) => {
                        e.preventDefault();
                        this.handlePicocategoryClick(
                          category.id,
                          subcategory.id,
                          microcategory.id,
                          nanocategory.id,
                          picocategory.id
                        );
                      });

                      subcategoriesDiv.appendChild(picocategoryLink);
                    });
                  }
                });
              }
            });
          }
        });

        categoryItem.appendChild(subcategoriesDiv);
      }

      categoryTree.appendChild(categoryItem);
    });
  }

  handleCategoryClick(categoryId) {
    console.log("🎯 Category clicked:", categoryId);

    this.currentCategory = categoryId;
    this.currentSubcategory = null;
    this.currentMicrocategory = null;
    this.currentPage = 1;
    // Keep specific filters but filter out ones not applicable to new category
    this.filterOutIrrelevantSpecificFilters();

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  handleSubcategoryClick(categoryId, subcategoryId) {
    console.log("🎯 Subcategory clicked:", { categoryId, subcategoryId });

    this.currentCategory = categoryId;
    this.currentSubcategory = subcategoryId;
    this.currentMicrocategory = null;
    this.currentPage = 1;
    // Keep specific filters but filter out ones not applicable to new subcategory
    this.filterOutIrrelevantSpecificFilters();

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  handleMicrocategoryClick(categoryId, subcategoryId, microcategoryId) {
    console.log("🎯 Microcategory clicked:", {
      categoryId,
      subcategoryId,
      microcategoryId,
    });

    this.currentCategory = categoryId;
    this.currentSubcategory = subcategoryId;
    this.currentMicrocategory = microcategoryId;
    this.currentNanocategory = null;
    this.currentPicocategory = null;
    this.currentPage = 1;
    // Keep specific filters but filter out ones not applicable
    this.filterOutIrrelevantSpecificFilters();

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  handleNanocategoryClick(categoryId, subcategoryId, microcategoryId, nanocategoryId) {
    console.log("🎯 Nanocategory clicked:", {
      categoryId,
      subcategoryId,
      microcategoryId,
      nanocategoryId
    });

    this.currentCategory = categoryId;
    this.currentSubcategory = subcategoryId;
    this.currentMicrocategory = microcategoryId;
    this.currentNanocategory = nanocategoryId;
    this.currentPicocategory = null;
    this.currentPage = 1;
    this.filterOutIrrelevantSpecificFilters();

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  handlePicocategoryClick(categoryId, subcategoryId, microcategoryId, nanocategoryId, picocategoryId) {
    console.log("🎯 Picocategory clicked:", {
      categoryId,
      subcategoryId,
      microcategoryId,
      nanocategoryId,
      picocategoryId
    });

    this.currentCategory = categoryId;
    this.currentSubcategory = subcategoryId;
    this.currentMicrocategory = microcategoryId;
    this.currentNanocategory = nanocategoryId;
    this.currentPicocategory = picocategoryId;
    this.currentPage = 1;
    this.filterOutIrrelevantSpecificFilters();

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  filterOutIrrelevantSpecificFilters() {
    // Get available filter configurations for current selection
    const availableFilters = this.getAvailableSpecificFilters();

    // Filter out specific filters that are not in available filters
    const filteredSpecificFilters = {};

    Object.keys(this.specificFilters).forEach(filterId => {
      if (availableFilters.some(f => f.id === filterId)) {
        filteredSpecificFilters[filterId] = this.specificFilters[filterId];
      }
    });

    this.specificFilters = filteredSpecificFilters;
  }

  updatePageTitle() {
    let title = "همه محصولات";
    let pageTitle = document.getElementById("pageTitle");
    let breadcrumbName = document.getElementById("currentCategoryName");

    if (this.currentCategory && typeof categories !== "undefined") {
      const category = categories.find((c) => c.id === this.currentCategory);
      if (category) {
        title = category.name;

        if (this.currentSubcategory) {
          const subcategory = category.subcategories.find(
            (s) => s.id === this.currentSubcategory
          );
          if (subcategory) {
            title = subcategory.name;

            if (this.currentMicrocategory) {
              const microcategory = subcategory.microcategories.find(
                (m) => m.id === this.currentMicrocategory
              );
              if (microcategory) {
                title = microcategory.name;

                if (this.currentNanocategory) {
                  const nanocategory = microcategory.nanocategories?.find(n => n.id === this.currentNanocategory);
                  if (nanocategory) {
                    title = nanocategory.name;

                    if (this.currentPicocategory) {
                      const picocategory = nanocategory.picocategories?.find(p => p.id === this.currentPicocategory);
                      if (picocategory) {
                        title = picocategory.name;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (pageTitle) pageTitle.textContent = title;
    if (breadcrumbName) breadcrumbName.textContent = title;
  }

  updateBreadcrumb() {
    const breadcrumb = document.getElementById("categoryBreadcrumb");
    if (!breadcrumb) return;

    let html =
      '<a href="index.html">خانه</a><i class="fas fa-chevron-left"></i>';

    if (this.currentCategory && typeof categories !== "undefined") {
      const category = categories.find((c) => c.id === this.currentCategory);
      if (category) {
        html += `<a href="#" data-category-id="${category.id}">${category.name}</a>`;

        if (this.currentSubcategory) {
          const subcategory = category.subcategories.find(
            (s) => s.id === this.currentSubcategory
          );
          if (subcategory) {
            html += `<i class="fas fa-chevron-left"></i><a href="#" data-subcategory-id="${subcategory.id}">${subcategory.name}</a>`;

            if (this.currentMicrocategory) {
              const microcategory = subcategory.microcategories.find(
                (m) => m.id === this.currentMicrocategory
              );
              if (microcategory) {
                html += `<i class="fas fa-chevron-left"></i><a href="#" data-microcategory-id="${microcategory.id}">${microcategory.name}</a>`;

                if (this.currentNanocategory) {
                  const nanocategory = microcategory.nanocategories?.find(
                    (n) => n.id === this.currentNanocategory
                  );
                  if (nanocategory) {
                    html += `<i class="fas fa-chevron-left"></i><a href="#" data-nanocategory-id="${nanocategory.id}">${nanocategory.name}</a>`;

                    if (this.currentPicocategory) {
                      const picocategory = nanocategory.picocategories?.find(
                        (p) => p.id === this.currentPicocategory
                      );
                      if (picocategory) {
                        html += `<i class="fas fa-chevron-left"></i><span>${picocategory.name}</span>`;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    breadcrumb.innerHTML = html;

    // Add click events to breadcrumb links
    breadcrumb.querySelectorAll("a[data-category-id]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleCategoryClick(link.dataset.categoryId);
      });
    });

    breadcrumb.querySelectorAll("a[data-subcategory-id]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.currentCategory) {
          this.handleSubcategoryClick(
            this.currentCategory,
            link.dataset.subcategoryId
          );
        }
      });
    });

    breadcrumb.querySelectorAll("a[data-microcategory-id]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.currentCategory && this.currentSubcategory) {
          this.handleMicrocategoryClick(
            this.currentCategory,
            this.currentSubcategory,
            link.dataset.microcategoryId
          );
        }
      });
    });

    breadcrumb.querySelectorAll("a[data-nanocategory-id]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.currentCategory && this.currentSubcategory && this.currentMicrocategory) {
          this.handleNanocategoryClick(
            this.currentCategory,
            this.currentSubcategory,
            this.currentMicrocategory,
            link.dataset.nanocategoryId
          );
        }
      });
    });
  }

  // ============================================
  // GET AVAILABLE FILTERS BASED ON HIERARCHY
  // ============================================

  getAvailableSpecificFilters() {
    const availableFilters = [];

    // If no category is selected, return empty
    if (!this.currentCategory || typeof categoryFilters === "undefined") {
      return availableFilters;
    }

    const categoryConfig = categoryFilters[this.currentCategory];
    if (!categoryConfig) return availableFilters;

    // If we have a subcategory, show only its filters
    if (this.currentSubcategory && categoryConfig[this.currentSubcategory]) {
      const subcategoryConfig = categoryConfig[this.currentSubcategory];
      if (subcategoryConfig && subcategoryConfig.filters) {
        availableFilters.push(...subcategoryConfig.filters);
      }
    }
    // If we have only a category, show filters from ALL its subcategories
    else {
      Object.keys(categoryConfig).forEach(subcatId => {
        const subcategoryConfig = categoryConfig[subcatId];
        if (subcategoryConfig && subcategoryConfig.filters) {
          // Merge filters, avoid duplicates
          subcategoryConfig.filters.forEach(filter => {
            if (!availableFilters.some(f => f.id === filter.id)) {
              availableFilters.push(filter);
            }
          });
        }
      });
    }

    return availableFilters;
  }

  getFilterConfig(filterId) {
    // First, check if we're in a specific subcategory
    if (this.currentCategory && this.currentSubcategory) {
      const categoryConfig = categoryFilters[this.currentCategory];
      if (!categoryConfig) return null;

      const subcategoryConfig = categoryConfig[this.currentSubcategory];
      if (subcategoryConfig && subcategoryConfig.filters) {
        return subcategoryConfig.filters.find(f => f.id === filterId);
      }
    }

    // If not in a specific subcategory, check all subcategories of the category
    if (this.currentCategory) {
      const categoryConfig = categoryFilters[this.currentCategory];
      if (!categoryConfig) return null;

      // Search through all subcategories
      for (const subcatId in categoryConfig) {
        const subcategoryConfig = categoryConfig[subcatId];
        if (subcategoryConfig && subcategoryConfig.filters) {
          const filter = subcategoryConfig.filters.find(f => f.id === filterId);
          if (filter) return filter;
        }
      }
    }

    return null;
  }

  // ============================================
  // FILTER PRODUCTS
  // ============================================

  getFilteredProducts() {
    if (typeof products === "undefined") return [];

    let filteredProducts = [...products];

    // Filter by category
    if (this.currentCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === this.currentCategory
      );

      // Filter by subcategory
      if (this.currentSubcategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.subcategory === this.currentSubcategory
        );

        // Filter by microcategory
        if (this.currentMicrocategory) {
          filteredProducts = filteredProducts.filter(
            (product) => product.microcategory === this.currentMicrocategory
          );

          // Filter by nanocategory
          if (this.currentNanocategory) {
            filteredProducts = filteredProducts.filter(
              (product) => product.nanocategory === this.currentNanocategory
            );

            // Filter by picocategory
            if (this.currentPicocategory) {
              filteredProducts = filteredProducts.filter(
                (product) => product.picocategory === this.currentPicocategory
              );
            }
          }
        }
      }
    }

    // Apply search filter
    if (this.filters.searchQuery) {
      const query = this.filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    if (this.filters.minPrice) {
      const minPrice = this.parsePrice(this.filters.minPrice);
      filteredProducts = filteredProducts.filter(
        (product) => this.parsePrice(product.price) >= minPrice
      );
    }

    if (this.filters.maxPrice) {
      const maxPrice = this.parsePrice(this.filters.maxPrice);
      filteredProducts = filteredProducts.filter(
        (product) => this.parsePrice(product.price) <= maxPrice
      );
    }

    // Apply rating filter
    if (this.filters.minRating) {
      const minRating = parseFloat(this.filters.minRating);
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= minRating
      );
    }

    // Apply discount filter
    if (this.filters.discountedOnly) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discounted
      );
    }

    // Apply specific category filters
    filteredProducts = this.applySpecificFilters(filteredProducts);

    // Apply sorting
    filteredProducts = this.sortProducts(filteredProducts);

    return filteredProducts;
  }

  applySpecificFilters(productsArray) {
    if (Object.keys(this.specificFilters).length === 0) {
      return productsArray;
    }

    return productsArray.filter(product => {
      // Check if product has attributes
      if (!product.attributes) {
        return false;
      }

      // Check each specific filter
      for (const [filterId, filterValue] of Object.entries(this.specificFilters)) {
        const productValue = product.attributes[filterId];

        if (productValue === undefined) {
          return false;
        }

        // Handle different filter types
        if (Array.isArray(filterValue)) {
          // Checkbox filter (multiple values)
          if (!filterValue.includes(productValue)) {
            return false;
          }
        } else if (typeof filterValue === 'object' && filterValue.min !== undefined) {
          // Range filter
          const numericValue = parseFloat(productValue);
          if (numericValue < filterValue.min || numericValue > filterValue.max) {
            return false;
          }
        } else {
          // Single value filter
          if (productValue !== filterValue) {
            return false;
          }
        }
      }

      return true;
    });
  }

  parsePrice(priceStr) {
    if (typeof priceStr === "number") return priceStr;
    if (typeof priceStr !== "string") return 0;

    // Remove all non-digit characters including Persian numerals and commas
    let cleanStr = priceStr;

    // Convert Persian numbers to English
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < persianNumbers.length; i++) {
      cleanStr = cleanStr.replace(
        new RegExp(persianNumbers[i], "g"),
        englishNumbers[i]
      );
    }

    // Remove all non-digit characters (تومان, commas, spaces, etc.)
    cleanStr = cleanStr.replace(/[^\d]/g, "");

    return parseInt(cleanStr) || 0;
  }

  sortProducts(productsArray) {
    console.log("🔄 Sorting products by:", this.sortBy);

    switch (this.sortBy) {
      case "price-asc":
        return [...productsArray].sort((a, b) => {
          const priceA = this.parsePrice(a.price);
          const priceB = this.parsePrice(b.price);
          return priceA - priceB;
        });
      case "price-desc":
        return [...productsArray].sort((a, b) => {
          const priceA = this.parsePrice(a.price);
          const priceB = this.parsePrice(b.price);
          return priceB - priceA;
        });
      case "rating":
        return [...productsArray].sort((a, b) => b.rating - a.rating);
      case "popular":
        return [...productsArray].sort((a, b) => b.ratingCount - a.ratingCount);
      default:
        return productsArray;
    }
  }

  // ============================================
  // RENDER METHODS
  // ============================================

  renderProducts() {
    const container = document.getElementById("productsContainer");
    const noProducts = document.getElementById("noProducts");
    const productCount = document.getElementById("countNumber");
    const activeFilters = document.getElementById("activeFilters");

    if (!container) return;

    // Get filtered products
    const allProducts = this.getFilteredProducts();
    const totalProducts = allProducts.length;

    // Update product count
    if (productCount) {
      productCount.textContent = totalProducts.toLocaleString("fa-IR");
    }

    // Show/hide no products message
    if (noProducts) {
      noProducts.style.display = totalProducts === 0 ? "block" : "none";
    }

    // Update active filters display
    this.renderActiveFilters(activeFilters);

    // Calculate pagination
    const totalPages = Math.ceil(totalProducts / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, totalProducts);
    const pageProducts = allProducts.slice(startIndex, endIndex);

    // Clear container
    container.innerHTML = "";
    container.className = `products-container ${this.viewMode}-view`;

    // Render products
    pageProducts.forEach((product) => {
      const productCard = this.createProductCard(product);
      container.appendChild(productCard);
    });

    // Render pagination
    this.renderPagination(totalPages);

    // Update view toggle buttons
    this.updateViewToggle();

    console.log("✅ Products rendered:", {
      total: totalProducts,
      page: this.currentPage,
      sort: this.sortBy,
      view: this.viewMode,
      specificFilters: this.specificFilters
    });
  }

  createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card grid-view";

    // HTML structure exactly like index.html
    card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <div class="rating-count">(${product.ratingCount})</div>
                    <div class="rating-stars">
                        ${renderStars(product.rating)}
                    </div>
                </div>
                <div class="price-section">
                    ${product.discounted ? `<div class="discount-badge">${product.discount}</div>` : ""}
                    <div class="price-details">
                        <div class="current-price">${formatPersianNumber(product.price)} تومان</div>
                        ${product.discounted ? `<div class="old-price">${formatPersianNumber(product.oldPrice)} تومان</div>` : ""}
                    </div>
                </div>
            </div>
            <button class="add-to-cart-small" onclick="event.stopPropagation(); addToCart(${product.id}, 1); showToast()">
                <i class="fas fa-shopping-basket"></i>
            </button>
        `;

    // Add click event to product card
    card.addEventListener("click", (e) => {
      // Implement product detail page navigation
      console.log("Product clicked:", product.id);
      window.location.href = `product.html?id=${product.id}`;
    });

    return card;
  }

  renderActiveFilters(container) {
    if (!container) return;

    container.innerHTML = "";

    // Category filter
    if (this.currentCategory && typeof categories !== "undefined") {
      const category = categories.find((c) => c.id === this.currentCategory);
      if (category) {
        const tag = this.createFilterTag(category.name, "category");
        container.appendChild(tag);

        if (this.currentSubcategory) {
          const subcategory = category.subcategories.find(
            (s) => s.id === this.currentSubcategory
          );
          if (subcategory) {
            const subTag = this.createFilterTag(subcategory.name, "subcategory");
            container.appendChild(subTag);

            if (this.currentMicrocategory) {
              const microcategory = subcategory.microcategories.find(
                (m) => m.id === this.currentMicrocategory
              );
              if (microcategory) {
                const microTag = this.createFilterTag(microcategory.name, "microcategory");
                container.appendChild(microTag);

                if (this.currentNanocategory) {
                  const nanocategory = microcategory.nanocategories?.find(
                    (n) => n.id === this.currentNanocategory
                  );
                  if (nanocategory) {
                    const nanoTag = this.createFilterTag(nanocategory.name, "nanocategory");
                    container.appendChild(nanoTag);

                    if (this.currentPicocategory) {
                      const picocategory = nanocategory.picocategories?.find(
                        (p) => p.id === this.currentPicocategory
                      );
                      if (picocategory) {
                        const picoTag = this.createFilterTag(picocategory.name, "picocategory");
                        container.appendChild(picoTag);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // Price filters
    if (this.filters.minPrice) {
      const tag = this.createFilterTag(
        `از ${this.filters.minPrice} تومان`,
        "minPrice"
      );
      container.appendChild(tag);
    }

    if (this.filters.maxPrice) {
      const tag = this.createFilterTag(
        `تا ${this.filters.maxPrice} تومان`,
        "maxPrice"
      );
      container.appendChild(tag);
    }

    // Rating filter
    if (this.filters.minRating) {
      const tag = this.createFilterTag(
        `${this.filters.minRating} ستاره و بالاتر`,
        "rating"
      );
      container.appendChild(tag);
    }

    // Discount filter
    if (this.filters.discountedOnly) {
      const tag = this.createFilterTag("فقط تخفیف‌دارها", "discounted");
      container.appendChild(tag);
    }

    // Search filter
    if (this.filters.searchQuery) {
      const tag = this.createFilterTag(
        `جستجو: ${this.filters.searchQuery}`,
        "search"
      );
      container.appendChild(tag);
    }

    // Specific category filters
    Object.keys(this.specificFilters).forEach(filterId => {
      const filterValue = this.specificFilters[filterId];
      const filterConfig = this.getFilterConfig(filterId);

      if (filterConfig) {
        let filterText = "";

        if (Array.isArray(filterValue)) {
          // Checkbox filter
          const selectedLabels = filterValue.map(value => {
            const option = filterConfig.options.find(opt => opt.value === value);
            return option ? option.label : value;
          }).join('، ');
          filterText = `${filterConfig.name}: ${selectedLabels}`;
        } else if (typeof filterValue === 'object' && filterValue.min !== undefined) {
          // Range filter
          filterText = `${filterConfig.name}: ${filterValue.min} تا ${filterValue.max} ${filterConfig.unit || ''}`;
        } else {
          // Single value filter
          const option = filterConfig.options.find(opt => opt.value === filterValue);
          filterText = `${filterConfig.name}: ${option ? option.label : filterValue}`;
        }

        const tag = this.createFilterTag(filterText, `specific-${filterId}`);
        container.appendChild(tag);
      }
    });
  }

  createFilterTag(text, type) {
    const tag = document.createElement("div");
    tag.className = "filter-tag";
    tag.innerHTML = `
            ${text}
            <button class="remove-filter" data-filter-type="${type}">
                <i class="fas fa-times"></i>
            </button>
        `;

    const removeBtn = tag.querySelector(".remove-filter");
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.removeFilter(type);
    });

    return tag;
  }

  // ============================================
  // SPECIFIC FILTERS RENDERING
  // ============================================

  renderSpecificFilters() {
    const specificFiltersContainer = document.getElementById('specificFilters');
    if (!specificFiltersContainer) return;

    // Clear previous filters
    specificFiltersContainer.innerHTML = '';

    // Check if we have a category selected
    if (!this.currentCategory) {
      return;
    }

    // Get available filters for current selection
    const availableFilters = this.getAvailableSpecificFilters();

    if (availableFilters.length === 0) {
      return;
    }

    // Create header for specific filters
    const header = document.createElement('div');
    header.className = 'sidebar-section';

    let headerText = 'فیلترهای تخصصی';
    if (this.currentSubcategory) {
      const category = categories.find(c => c.id === this.currentCategory);
      if (category) {
        const subcategory = category.subcategories.find(s => s.id === this.currentSubcategory);
        if (subcategory) {
          headerText = `فیلترهای ${subcategory.name}`;
        }
      }
    } else {
      const category = categories.find(c => c.id === this.currentCategory);
      if (category) {
        headerText = `فیلترهای ${category.name}`;
      }
    }

    header.innerHTML = `
            <h4 class="filter-title">
                <i class="fas fa-filter"></i>
                ${headerText}
            </h4>
        `;
    specificFiltersContainer.appendChild(header);

    // Create each specific filter
    availableFilters.forEach(filterConfig => {
      const filterSection = this.createSpecificFilterSection(filterConfig);
      if (filterSection) {
        specificFiltersContainer.appendChild(filterSection);
      }
    });
  }

  createSpecificFilterSection(filterConfig) {
    const section = document.createElement('div');
    section.className = 'sidebar-section specific-filter-section filter-dropdown';
    section.dataset.filterId = filterConfig.id;

    // Check if this filter has any active values to decide if it should be expanded
    const hasActiveValues = this.specificFilters[filterConfig.id] !== undefined;

    // Create toggle header
    const header = document.createElement('button');
    header.className = `filter-dropdown-toggle ${hasActiveValues ? 'active' : ''}`;
    header.innerHTML = `
            <span>${filterConfig.name}</span>
            <i class="fas fa-chevron-down"></i>
        `;
    section.appendChild(header);

    // Create content container
    const content = document.createElement('div');
    content.className = `filter-dropdown-content ${hasActiveValues ? 'expanded' : ''}`;

    // Create filter controls based on type
    let filterElement;
    switch (filterConfig.type) {
      case 'checkbox':
        filterElement = this.createCheckboxFilter(filterConfig);
        break;
      case 'range':
        filterElement = this.createRangeFilter(filterConfig);
        break;
      case 'select':
        filterElement = this.createSelectFilter(filterConfig);
        break;
      case 'radio':
        filterElement = this.createRadioFilter(filterConfig);
        break;
      default:
        console.warn(`Unknown filter type: ${filterConfig.type}`);
        return null;
    }

    if (filterElement) {
      content.appendChild(filterElement);
    }
    section.appendChild(content);

    // Add toggle functionality (Removed individual listener in favor of event delegation in setupEventListeners)
    // header.addEventListener('click', ...);

    return section;
  }

  createCheckboxFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'checkbox-filter';

    filterConfig.options.forEach(option => {
      const label = document.createElement('label');
      label.className = 'checkbox-option';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = option.value;
      checkbox.dataset.filterId = filterConfig.id;

      // Check if this option is already selected
      if (this.specificFilters[filterConfig.id] &&
        this.specificFilters[filterConfig.id].includes(option.value)) {
        checkbox.checked = true;
      }

      const checkboxSpan = document.createElement('span');
      checkboxSpan.className = 'checkbox-custom';

      const labelText = document.createElement('span');
      labelText.className = 'checkbox-label';
      labelText.textContent = option.label;

      label.appendChild(checkbox);
      label.appendChild(checkboxSpan);
      label.appendChild(labelText);

      // Add change event
      checkbox.addEventListener('change', (e) => {
        this.handleSpecificFilterChange(filterConfig.id, option.value, e.target.checked);
      });

      container.appendChild(label);
    });

    return container;
  }

  createRangeFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'range-filter';

    // Get current values or defaults
    const currentValue = this.specificFilters[filterConfig.id] || {
      min: filterConfig.min,
      max: filterConfig.max
    };

    container.innerHTML = `
            <div class="range-slider-container">
                <div class="range-inputs">
                    <input type="number" 
                           class="range-min" 
                           placeholder="${filterConfig.min}" 
                           value="${currentValue.min}"
                           min="${filterConfig.min}" 
                           max="${filterConfig.max}"
                           step="${filterConfig.step || 1}">
                    <span class="range-separator">تا</span>
                    <input type="number" 
                           class="range-max" 
                           placeholder="${filterConfig.max}" 
                           value="${currentValue.max}"
                           min="${filterConfig.min}" 
                           max="${filterConfig.max}"
                           step="${filterConfig.step || 1}">
                </div>
                <button class="apply-range" data-filter-id="${filterConfig.id}">
                    اعمال محدوده
                </button>
                <div class="range-hint">
                    از ${filterConfig.min} تا ${filterConfig.max} ${filterConfig.unit || ''}
                </div>
            </div>
        `;

    // Add event for apply button
    const applyBtn = container.querySelector('.apply-range');
    applyBtn.addEventListener('click', () => {
      const minInput = container.querySelector('.range-min');
      const maxInput = container.querySelector('.range-max');

      const minValue = minInput.value ? parseFloat(minInput.value) : filterConfig.min;
      const maxValue = maxInput.value ? parseFloat(maxInput.value) : filterConfig.max;

      this.handleRangeFilterChange(filterConfig.id, minValue, maxValue);
    });

    return container;
  }

  createSelectFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'select-filter';

    const select = document.createElement('select');
    select.dataset.filterId = filterConfig.id;

    // Default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `انتخاب ${filterConfig.name}`;
    defaultOption.selected = !this.specificFilters[filterConfig.id];
    select.appendChild(defaultOption);

    // Filter options
    filterConfig.options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.label;

      // Check if selected
      if (this.specificFilters[filterConfig.id] === option.value) {
        optionEl.selected = true;
      }

      select.appendChild(optionEl);
    });

    // Add change event
    select.addEventListener('change', (e) => {
      const value = e.target.value;
      this.handleSelectFilterChange(filterConfig.id, value);
    });

    container.appendChild(select);
    return container;
  }

  createRadioFilter(filterConfig) {
    const container = document.createElement('div');
    container.className = 'radio-filter';

    filterConfig.options.forEach(option => {
      const label = document.createElement('label');
      label.className = 'radio-option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = filterConfig.id;
      radio.value = option.value;

      // Check if selected
      if (this.specificFilters[filterConfig.id] === option.value) {
        radio.checked = true;
      }

      const radioSpan = document.createElement('span');
      radioSpan.className = 'radio-custom';

      const labelText = document.createElement('span');
      labelText.className = 'radio-label';
      labelText.textContent = option.label;

      label.appendChild(radio);
      label.appendChild(radioSpan);
      label.appendChild(labelText);

      // Add change event
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.handleRadioFilterChange(filterConfig.id, option.value);
        }
      });

      container.appendChild(label);
    });

    return container;
  }

  // ============================================
  // FILTER HANDLERS
  // ============================================

  handleSpecificFilterChange(filterId, value, isChecked) {
    if (!this.specificFilters[filterId]) {
      this.specificFilters[filterId] = [];
    }

    if (isChecked) {
      // Add value if not already present
      if (!this.specificFilters[filterId].includes(value)) {
        this.specificFilters[filterId].push(value);
      }
    } else {
      // Remove value
      this.specificFilters[filterId] = this.specificFilters[filterId].filter(
        v => v !== value
      );

      // Remove key if array is empty
      if (this.specificFilters[filterId].length === 0) {
        delete this.specificFilters[filterId];
      }
    }

    this.applyFiltersAndUpdate();
  }

  handleRangeFilterChange(filterId, minValue, maxValue) {
    // Validate values
    const filterConfig = this.getFilterConfig(filterId);
    if (filterConfig) {
      const min = Math.max(filterConfig.min, minValue);
      const max = Math.min(filterConfig.max, maxValue);

      if (min <= max) {
        this.specificFilters[filterId] = { min, max };
        this.applyFiltersAndUpdate();
      }
    }
  }

  handleSelectFilterChange(filterId, value) {
    if (value === '') {
      delete this.specificFilters[filterId];
    } else {
      this.specificFilters[filterId] = value;
    }

    this.applyFiltersAndUpdate();
  }

  handleRadioFilterChange(filterId, value) {
    this.specificFilters[filterId] = value;
    this.applyFiltersAndUpdate();
  }

  applyFiltersAndUpdate() {
    this.currentPage = 1;
    this.updateUrlParams();
    this.renderProducts();
  }

  removeFilter(filterType) {
    switch (filterType) {
      case "category":
        this.currentCategory = null;
        this.currentSubcategory = null;
        this.currentMicrocategory = null;
        this.currentNanocategory = null;
        this.currentPicocategory = null;
        this.specificFilters = {};
        break;
      case "subcategory":
        this.currentSubcategory = null;
        this.currentMicrocategory = null;
        this.currentNanocategory = null;
        this.currentPicocategory = null;
        this.filterOutIrrelevantSpecificFilters();
        break;
      case "microcategory":
        this.currentMicrocategory = null;
        this.currentNanocategory = null;
        this.currentPicocategory = null;
        this.filterOutIrrelevantSpecificFilters();
        break;
      case "nanocategory":
        this.currentNanocategory = null;
        this.currentPicocategory = null;
        this.filterOutIrrelevantSpecificFilters();
        break;
      case "picocategory":
        this.currentPicocategory = null;
        this.filterOutIrrelevantSpecificFilters();
        break;
      case "minPrice":
        this.filters.minPrice = null;
        const minPriceInput = document.getElementById("minPrice");
        if (minPriceInput) minPriceInput.value = "";
        break;
      case "maxPrice":
        this.filters.maxPrice = null;
        const maxPriceInput = document.getElementById("maxPrice");
        if (maxPriceInput) maxPriceInput.value = "";
        break;
      case "rating":
        this.filters.minRating = null;
        document.querySelectorAll(".rating-option input").forEach((input) => {
          input.checked = false;
        });
        break;
      case "discounted":
        this.filters.discountedOnly = false;
        const discountedOnly = document.getElementById("discountedOnly");
        if (discountedOnly) discountedOnly.checked = false;
        break;
      case "search":
        this.filters.searchQuery = "";
        const searchInput = document.getElementById("categorySearch");
        if (searchInput) searchInput.value = "";
        break;
      default:
        // Handle specific filters (specific-filterId)
        if (filterType.startsWith('specific-')) {
          const filterId = filterType.replace('specific-', '');
          delete this.specificFilters[filterId];
          // Re-render specific filters to update UI
          this.renderSpecificFilters();
        }
        break;
    }

    this.currentPage = 1;
    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
  }

  renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");
    if (!pagination || totalPages <= 1) {
      if (pagination) pagination.innerHTML = "";
      return;
    }

    let html = "";

    // Previous button
    html += `
            <button class="pagination-prev" ${this.currentPage === 1 ? "disabled" : ""
      }>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      html += `<button data-page="1">۱</button>`;
      if (startPage > 2) {
        html += `<span>...</span>`;
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      html += `
                <button class="${i === this.currentPage ? "active" : ""
        }" data-page="${i}">
                    ${i.toLocaleString("fa-IR")}
                </button>
            `;
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        html += `<span>...</span>`;
      }
      html += `<button data-page="${totalPages}">${totalPages.toLocaleString(
        "fa-IR"
      )}</button>`;
    }

    // Next button
    html += `
            <button class="pagination-next" ${this.currentPage === totalPages ? "disabled" : ""
      }>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

    pagination.innerHTML = html;

    // Add event listeners
    const prevBtn = pagination.querySelector(".pagination-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      });
    }

    const nextBtn = pagination.querySelector(".pagination-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentPage < totalPages) {
          this.goToPage(this.currentPage + 1);
        }
      });
    }

    pagination.querySelectorAll("button[data-page]").forEach((button) => {
      button.addEventListener("click", () => {
        const page = parseInt(button.dataset.page);
        this.goToPage(page);
      });
    });
  }

  goToPage(page) {
    this.currentPage = page;
    this.updateUrlParams();
    this.renderProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  updateViewToggle() {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === this.viewMode);
    });

    const container = document.getElementById("productsContainer");
    if (container) {
      container.className = `products-container ${this.viewMode}-view`;
    }
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  setupEventListeners() {
    console.log("⚙️ Setting up event listeners...");

    // Helper function for safe event listeners
    const safeListener = (element, event, callback) => {
      if (!element) return null;

      const handler = (e) => {
        try {
          callback(e);
        } catch (error) {
          console.warn(`⚠️ Event handler error (${event}):`, error);
        }
        return false;
      };

      element.addEventListener(event, handler);
      return handler;
    };

    // Sort select
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
      sortSelect.value = this.sortBy;
      console.log("⚙️ Sort select initialized with value:", this.sortBy);

      safeListener(sortSelect, "change", (e) => {
        console.log("⚙️ Sort changed to:", e.target.value);
        this.sortBy = e.target.value;
        this.currentPage = 1;
        this.updateUrlParams();
        this.renderProducts();
      });
    } else {
      console.warn("⚠️ Sort select element not found!");
    }

    // Price filter inputs
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");
    const applyPriceBtn = document.getElementById("applyPrice");

    if (applyPriceBtn) {
      safeListener(applyPriceBtn, "click", () => {
        if (this.priceTimeout) {
          clearTimeout(this.priceTimeout);
          this.priceTimeout = null;
        }

        const minPrice = minPriceInput?.value?.trim() || "";
        const maxPrice = maxPriceInput?.value?.trim() || "";

        this.filters.minPrice = minPrice || null;
        this.filters.maxPrice = maxPrice || null;
        this.currentPage = 1;
        this.updateUrlParams();
        this.renderProducts();
      });
    }

    // Rating filter
    const ratingInputs = document.querySelectorAll(".rating-option input");
    ratingInputs.forEach((input) => {
      safeListener(input, "change", (e) => {
        if (e.target.checked) {
          this.filters.minRating = e.target.value;
          // Uncheck others
          ratingInputs.forEach((otherInput) => {
            if (otherInput !== e.target) otherInput.checked = false;
          });
        } else {
          this.filters.minRating = null;
        }
        this.currentPage = 1;
        this.updateUrlParams();
        this.renderProducts();
      });
    });

    // Discount filter
    const discountedOnly = document.getElementById("discountedOnly");
    if (discountedOnly) {
      discountedOnly.checked = this.filters.discountedOnly;
      safeListener(discountedOnly, "change", (e) => {
        this.filters.discountedOnly = e.target.checked;
        this.currentPage = 1;
        this.updateUrlParams();
        this.renderProducts();
      });
    }

    // Clear filters
    const clearFiltersBtn = document.getElementById("clearFilters");
    if (clearFiltersBtn) {
      safeListener(clearFiltersBtn, "click", () => {
        this.clearAllFilters();
      });
    }

    // Clear search
    const clearSearchBtn = document.getElementById("clearSearch");
    if (clearSearchBtn) {
      safeListener(clearSearchBtn, "click", () => {
        this.clearAllFilters();
      });
    }

    // Handle all filter dropdown toggles using event delegation (more robust)
    const sidebar = document.querySelector(".category-sidebar");
    if (sidebar) {
      safeListener(sidebar, "click", (e) => {
        const toggle = e.target.closest(".filter-dropdown-toggle");
        if (!toggle) return;

        e.preventDefault();
        const content = toggle.nextElementSibling;
        if (content && content.classList.contains("filter-dropdown-content")) {
          toggle.classList.toggle("active");
          content.classList.toggle("expanded");
        }
      });
    }

    // Initial state check for dropdowns that should be open
    document.querySelectorAll(".filter-dropdown-toggle.active").forEach((toggle) => {
      const content = toggle.nextElementSibling;
      if (content && content.classList.contains("filter-dropdown-content")) {
        content.classList.add("expanded");
      }
    });

    // Handle browser back/forward
    safeListener(window, "popstate", () => {
      console.log("⚙️ Handling popstate event");
      this.getUrlParams();
      this.renderCategoryTree();
      this.renderSpecificFilters();
      this.renderProducts();
      this.updatePageTitle();
      this.updateBreadcrumb();
      this.updateFormValues();
    });

    console.log("✅ Event listeners setup complete");
  }

  updateFormValues() {
    console.log("⚙️ Updating form values...");

    // Update sort select
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
      sortSelect.value = this.sortBy;
      console.log("✅ Sort select updated to:", this.sortBy);
    }

    // Update price filters
    const minPriceInput = document.getElementById("minPrice");
    if (minPriceInput) {
      minPriceInput.value = this.filters.minPrice || "";
    }

    const maxPriceInput = document.getElementById("maxPrice");
    if (maxPriceInput) {
      maxPriceInput.value = this.filters.maxPrice || "";
    }

    // Update discount filter
    const discountedOnly = document.getElementById("discountedOnly");
    if (discountedOnly) {
      discountedOnly.checked = this.filters.discountedOnly;
    }

    // Update rating checkboxes
    document.querySelectorAll(".rating-option input").forEach((input) => {
      input.checked = input.value === this.filters.minRating;
    });

    console.log("✅ Form values updated");
  }

  clearAllFilters() {
    this.currentCategory = null;
    this.currentSubcategory = null;
    this.currentMicrocategory = null;

    this.filters = {
      minPrice: null,
      maxPrice: null,
      minRating: null,
      discountedOnly: false,
      searchQuery: "",
    };

    this.specificFilters = {};
    this.sortBy = "default";
    this.viewMode = "grid";
    this.currentPage = 1;

    this.updateUrlParams();
    this.renderCategoryTree();
    this.renderSpecificFilters();
    this.renderProducts();
    this.updatePageTitle();
    this.updateBreadcrumb();
    this.updateFormValues();
  }
}

// ============================================
// INITIALIZATION FOR CATEGORY PAGE
// ============================================

/**
 * Initialize category tree toggle for mobile
 */
function initCategoryTreeToggle() {
  const toggleBtn = document.getElementById("categoryToggleBtn");
  const categoryTree = document.getElementById("categoryTree");

  console.log("⚙️ Initializing category tree toggle...");
  console.log("Toggle button found:", !!toggleBtn);
  console.log("Category tree found:", !!categoryTree);

  if (!toggleBtn || !categoryTree) {
    console.warn("⚠️ Category tree toggle elements not found");
    return;
  }

  // ALWAYS start closed on mobile
  const isMobile = window.innerWidth <= 992;

  if (isMobile) {
    // Start closed on mobile
    categoryTree.classList.remove("expanded");
    const icon = toggleBtn.querySelector("i");
    if (icon) icon.className = "fas fa-bars";
    console.log("📱 Mobile: Category tree starts CLOSED");
  } else {
    // Start open on desktop
    categoryTree.classList.add("expanded");
    const icon = toggleBtn.querySelector("i");
    if (icon) icon.className = "fas fa-times";
    console.log("🖥️ Desktop: Category tree starts OPEN");
  }

  // Toggle functionality
  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("🎯 Toggle button clicked");

    categoryTree.classList.toggle("expanded");
    const icon = this.querySelector("i");

    if (categoryTree.classList.contains("expanded")) {
      if (icon) icon.className = "fas fa-times";
      console.log("✅ Category tree expanded");
    } else {
      if (icon) icon.className = "fas fa-bars";
      console.log("✅ Category tree collapsed");
    }
  });

  // Handle window resize - IMPORTANT: Reset to closed when switching to mobile
  window.addEventListener("resize", function () {
    const isMobileNow = window.innerWidth <= 992;
    const icon = toggleBtn.querySelector("i");

    if (!isMobileNow) {
      // On desktop, always show
      categoryTree.classList.add("expanded");
      if (icon) icon.className = "fas fa-times";
      console.log("🔄 Resize: Desktop mode - Tree OPEN");
    } else {
      // On mobile, ALWAYS CLOSED by default
      categoryTree.classList.remove("expanded");
      if (icon) icon.className = "fas fa-bars";
      console.log("🔄 Resize: Mobile mode - Tree CLOSED");
    }
  });

  // Add keyboard support for accessibility
  toggleBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });

  // Add aria attributes for accessibility
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-controls", "categoryTree");

  // Update aria attribute when toggling
  toggleBtn.addEventListener("click", function () {
    const isExpanded = categoryTree.classList.contains("expanded");
    this.setAttribute("aria-expanded", isExpanded.toString());
  });
}

// Call this function in your initialization
// Add it to the CategoryPage init method or call it after DOM loads

/**
 * Safe initialization wrapper for category page
 */
function initCategoryPage() {
  try {
    console.log("🚀 Starting Category Page initialization...");

    // Wait for data to be loaded
    if (typeof categories === "undefined" || typeof products === "undefined") {
      console.warn("⚠️ Data not loaded yet, retrying...");
      setTimeout(initCategoryPage, 100);
      return;
    }

    console.log("📊 Data loaded for category page:", {
      productsCount: products?.length || 0,
      categoriesCount: categories?.length || 0,
    });

    // Initialize components with error handling
    const components = [
      { name: "Mobile Menu", fn: initMobileMenu },
      { name: "Mobile Category Menu", fn: initMobileCategoryMenu },
      { name: "Mega Menu", fn: initMegaMenu },
      { name: "Clickable Categories", fn: makeCategoriesClickable },
      { name: "Sidebar Categories", fn: renderSidebarCategories },
      {
        name: "Category Page",
        fn: () => {
          window.categoryPage = new CategoryPage();
        },
      },
    ];

    let successCount = 0;
    let errorCount = 0;

    components.forEach((component) => {
      try {
        console.log(`🔄 Initializing: ${component.name}`);
        component.fn();
        successCount++;
        console.log(`✅ ${component.name} initialized`);
      } catch (componentError) {
        errorCount++;
        console.error(
          `❌ Failed to initialize ${component.name}:`,
          componentError
        );
      }
    });

    console.log(
      `🎉 Category Page initialization complete. ${successCount} successful, ${errorCount} failed`
    );
  } catch (error) {
    console.error("💥 Critical initialization error:", error);
  }
}

/**
 * Enhanced DOM ready checker for category page
 */
function domReadyCategory() {
  console.log("📄 Category Page - Document ready state:", document.readyState);

  if (document.readyState === "loading") {
    console.log("⏳ Waiting for DOM to load...");
    document.addEventListener("DOMContentLoaded", function onDOMLoaded() {
      console.log("✅ DOM fully loaded for category page");
      document.removeEventListener("DOMContentLoaded", onDOMLoaded);
      // Small delay to ensure all scripts are loaded
      setTimeout(initCategoryPage, 50);
    });
  } else {
    console.log("⚡ DOM already loaded, initializing category page...");
    setTimeout(initCategoryPage, 50);
  }
}

// Global error handler
window.addEventListener("error", function (event) {
  console.error("🚨 Unhandled error on category page:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (event) {
  console.error(
    "🚨 Unhandled promise rejection on category page:",
    event.reason
  );
});

// Start initialization
try {
  console.log("🛠️ Starting Category Page...");
  domReadyCategory();
} catch (startupError) {
  console.error("💥 Failed to start Category Page:", startupError);
}

// Global functions for potential external use
window.GigikalaCategory = {
  init: initCategoryPage,
  products: typeof products !== "undefined" ? products : [],
  categories: typeof categories !== "undefined" ? categories : [],
  getDiscountedProducts,
  getNonDiscountedProducts,
  renderStars,
  initMobileMenu,
  initMobileCategoryMenu,
  initMegaMenu,
  makeCategoriesClickable,
  renderSidebarCategories,
};
