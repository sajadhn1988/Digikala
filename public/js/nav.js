// ============================================
// NAVIGATION & MEGA MENU FUNCTIONALITY
// ============================================

/**
 * Make all category elements with data-category-id clickable
 */
function makeCategoriesClickable() {
    console.log('🔗 Initializing clickable category elements...');
    document.querySelectorAll('[data-category-id]').forEach(el => {
        // Skip elements that already have specific handlers if needed, 
        // but generally redirectToCategory is safe to call
        el.addEventListener('click', (e) => {
            // If it's a link or button, prevent default
            if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a')) {
                e.preventDefault();
                e.stopPropagation();
            }

            const catId = el.getAttribute('data-category-id');
            const subId = el.getAttribute('data-subcategory-id');
            const microId = el.getAttribute('data-microcategory-id');
            const nanoId = el.getAttribute('data-nanocategory-id');
            const picoId = el.getAttribute('data-picocategory-id');

            if (catId) {
                redirectToCategory(catId, subId, microId, nanoId, picoId);
            }
        });
    });
}


/**
 * Render star rating
 */
function renderStars(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

/**
 * Format number to Persian with thousand separators
 * Example: 8990000 -> ۸,۹۹۰,۰۰۰
 */
function formatPersianNumber(num) {
    if (num === null || num === undefined) return "";

    // Convert to string and remove existing commas
    let n = num.toString().replace(/,/g, '');

    // Add thousand separators
    const formattedEn = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Convert English digits to Persian
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return formattedEn.replace(/\d/g, (d) => persianDigits[d]);
}

/**
 * Helper function to redirect to category page with parameters
 * Works with file:// protocol (local file system)
 */
function redirectToCategory(categoryId, subcategoryId, microcategoryId, nanocategoryId, picocategoryId) {
    console.log('🚀 Redirecting to category:', {
        categoryId,
        subcategoryId,
        microcategoryId,
        nanocategoryId,
        picocategoryId
    });

    // Get current URL parameters to preserve filters
    const currentUrl = window.location.href;
    let urlParams = new URLSearchParams();

    try {
        // Try to parse current URL for parameters
        if (currentUrl.includes('?')) {
            const queryString = currentUrl.split('?')[1];
            urlParams = new URLSearchParams(queryString);
        }
    } catch (e) {
        console.log('Using empty URL params');
    }

    const sort = urlParams.get('sort') || 'default';
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const rating = urlParams.get('rating');
    const discounted = urlParams.get('discounted');
    const searchQuery = urlParams.get('q') || '';

    // Build URL with proper file:// protocol handling
    let url = 'category.html';  // Simple relative path

    // Start building query parameters
    const params = [];

    if (categoryId) {
        params.push(`cat=${categoryId}`);
    }

    if (subcategoryId) {
        params.push(`sub=${subcategoryId}`);
    }

    if (microcategoryId) {
        params.push(`micro=${microcategoryId}`);
    }

    if (nanocategoryId) {
        params.push(`nano=${nanocategoryId}`);
    }

    if (picocategoryId) {
        params.push(`pico=${picocategoryId}`);
    }

    // Preserve filters
    if (sort !== 'default') params.push(`sort=${sort}`);
    if (minPrice) params.push(`minPrice=${minPrice}`);
    if (maxPrice) params.push(`maxPrice=${maxPrice}`);
    if (rating) params.push(`rating=${rating}`);
    if (discounted) params.push(`discounted=${discounted}`);
    if (searchQuery) params.push(`q=${encodeURIComponent(searchQuery)}`);

    // Add parameters to URL
    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    console.log('🔗 Final redirect URL:', url);

    // Close mega menu if open (for better UX)
    const megaMenu = document.querySelector('.mega-menu');
    const navCategory = document.querySelector('.nav-category');
    if (megaMenu) megaMenu.style.display = 'none';
    if (navCategory) navCategory.classList.remove('active');

    // Redirect
    window.location.href = url;
}

/**
 * Initialize mega menu functionality
 */
function initMegaMenu() {
    const navCategory = document.querySelector(".nav-category");
    const megaMenu = document.querySelector(".mega-menu");
    const megaMenuCategories = document.getElementById("megaMenuCategories");
    const megaMenuHeader = document.getElementById("megaMenuHeader");
    const megaMenuColumns = document.getElementById("megaMenuColumns");

    if (!navCategory || !megaMenu || !megaMenuCategories) return;

    let currentActiveCategory = null;

    // Render mega menu categories
    function renderMegaMenuCategories() {
        if (!megaMenuCategories) return;

        megaMenuCategories.innerHTML = "";

        // Check if categories data is available
        if (typeof categories === "undefined") {
            console.error("⚠️ Categories data not available for mega menu");
            return;
        }

        categories.forEach((category, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            li.setAttribute("data-category-id", category.id);

            // Set first category as active by default
            if (index === 0) {
                li.classList.add("active");
                currentActiveCategory = category;
                renderMegaMenuContent(category);
            }

            megaMenuCategories.appendChild(li);
        });
    }

    /**
     * Render mega menu content for a category
     */
    function renderMegaMenuContent(category) {
        if (!megaMenuHeader || !megaMenuColumns) return;

        // Update header
        megaMenuHeader.innerHTML = `همه محصولات ${category.name} <i class="fas fa-chevron-left"></i>`;

        // Clear columns
        megaMenuColumns.innerHTML = "";

        if (category.subcategories && category.subcategories.length > 0) {
            // For many categories, use 3 columns max
            const columnsCount = Math.min(
                3,
                Math.ceil(category.subcategories.length / 3)
            );
            const itemsPerColumn = Math.ceil(
                category.subcategories.length / columnsCount
            );

            for (let i = 0; i < columnsCount; i++) {
                const column = document.createElement("div");
                column.className = "mega-menu-column";

                const startIndex = i * itemsPerColumn;
                const endIndex = Math.min(
                    startIndex + itemsPerColumn,
                    category.subcategories.length
                );

                for (let j = startIndex; j < endIndex; j++) {
                    const subcategory = category.subcategories[j];
                    const subcategoryGroup = document.createElement("div");
                    subcategoryGroup.className = "sub-category-group";

                    // Create interactive subcategory title
                    const subcategoryTitle = document.createElement("div");
                    subcategoryTitle.className = "sub-category-title";
                    subcategoryTitle.textContent = subcategory.name;
                    subcategoryTitle.setAttribute("data-category-id", category.id);
                    subcategoryTitle.setAttribute("data-subcategory-id", subcategory.id);
                    subcategoryTitle.style.cursor = "pointer";

                    // Add hover effect
                    subcategoryTitle.addEventListener("mouseenter", () => {
                        subcategoryTitle.style.color = "#ef394e";
                        subcategoryTitle.style.textDecoration = "underline";
                    });

                    subcategoryTitle.addEventListener("mouseleave", () => {
                        subcategoryTitle.style.color = "";
                        subcategoryTitle.style.textDecoration = "";
                    });

                    // Add click event
                    subcategoryTitle.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        redirectToCategory(category.id, subcategory.id, null);
                    });

                    // Create microcategories list
                    let microcategoriesHTML = "";
                    if (
                        subcategory.microcategories &&
                        subcategory.microcategories.length > 0
                    ) {
                        microcategoriesHTML = subcategory.microcategories
                            .map((micro) => {
                                // Build nanocategories HTML
                                let nanocategoriesHTML = "";
                                if (micro.nanocategories && micro.nanocategories.length > 0) {
                                    nanocategoriesHTML = micro.nanocategories
                                        .map((nano) => {
                                            // Build picocategories HTML
                                            let picocategoriesHTML = "";
                                            if (
                                                nano.picocategories &&
                                                nano.picocategories.length > 0
                                            ) {
                                                picocategoriesHTML = nano.picocategories
                                                    .map(
                                                        (pico) =>
                                                            `<li class="pico-category-item" 
                                  data-category-id="${category.id}"
                                  data-subcategory-id="${subcategory.id}"
                                  data-microcategory-id="${micro.id}"
                                  data-nanocategory-id="${nano.id}"
                                  data-picocategory-id="${pico.id}">
                                 ${pico.name}
                              </li>`
                                                    )
                                                    .join("");
                                                picocategoriesHTML = `<ul class="pico-category-list">${picocategoriesHTML}</ul>`;
                                            }

                                            return `<li class="nano-category-item" 
                                  data-category-id="${category.id}"
                                  data-subcategory-id="${subcategory.id}"
                                  data-microcategory-id="${micro.id}"
                                  data-nanocategory-id="${nano.id}">
                                 ${nano.name}
                                 ${picocategoriesHTML}
                              </li>`;
                                        })
                                        .join("");
                                    nanocategoriesHTML = `<ul class="nano-category-list">${nanocategoriesHTML}</ul>`;
                                }

                                return `<li class="micro-category-item" 
                            data-category-id="${category.id}"
                            data-subcategory-id="${subcategory.id}"
                            data-microcategory-id="${micro.id}"
                            style="cursor: pointer; padding: 5px 0; transition: all 0.2s;">
                           ${micro.name}
                           ${nanocategoriesHTML}
                        </li>`;
                            })
                            .join("");
                    } else {
                        microcategoriesHTML =
                            '<li class="micro-category-item" style="color: #999; cursor: default;">محصولی در این دسته موجود نیست</li>';
                    }

                    subcategoryGroup.innerHTML = `
                    <div class="sub-category-title-container"></div>
                    <ul class="micro-category-list">
                        ${microcategoriesHTML}
                    </ul>
                `;

                    // Insert the interactive title
                    const titleContainer = subcategoryGroup.querySelector(
                        ".sub-category-title-container"
                    );
                    titleContainer.appendChild(subcategoryTitle);

                    column.appendChild(subcategoryGroup);
                }

                megaMenuColumns.appendChild(column);
            }

            // Add click event listeners to category items (micro, nano, pico)
            setTimeout(() => {
                // Microcategories
                document
                    .querySelectorAll(".micro-category-item[data-microcategory-id]")
                    .forEach((item) => {
                        // Prevent event bubbling from children
                        item.addEventListener("click", (e) => {
                            // Only redirect if it's the microcategory itself being clicked, not a child
                            if (e.target === item || (e.target.parentElement === item && !e.target.classList.contains('nano-category-list'))) {
                                e.preventDefault();
                                e.stopPropagation();

                                const categoryId = item.getAttribute("data-category-id");
                                const subcategoryId = item.getAttribute("data-subcategory-id");
                                const microcategoryId = item.getAttribute("data-microcategory-id");

                                if (categoryId && subcategoryId && microcategoryId) {
                                    redirectToCategory(categoryId, subcategoryId, microcategoryId);
                                }
                            }
                        });
                    });

                // Nanocategories
                document
                    .querySelectorAll(".nano-category-item[data-nanocategory-id]")
                    .forEach((item) => {
                        item.addEventListener("click", (e) => {
                            // Only redirect if it's the nanocategory itself being clicked, not a child
                            if (e.target === item || (e.target.parentElement === item && !e.target.classList.contains('pico-category-list'))) {
                                e.preventDefault();
                                e.stopPropagation();

                                const categoryId = item.getAttribute("data-category-id");
                                const subcategoryId = item.getAttribute("data-subcategory-id");
                                const microcategoryId = item.getAttribute("data-microcategory-id");
                                const nanocategoryId = item.getAttribute("data-nanocategory-id");

                                if (categoryId && subcategoryId && microcategoryId && nanocategoryId) {
                                    redirectToCategory(categoryId, subcategoryId, microcategoryId, nanocategoryId);
                                }
                            }
                        });
                    });

                // Picocategories
                document
                    .querySelectorAll(".pico-category-item[data-picocategory-id]")
                    .forEach((item) => {
                        item.addEventListener("click", (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            const categoryId = item.getAttribute("data-category-id");
                            const subcategoryId = item.getAttribute("data-subcategory-id");
                            const microcategoryId = item.getAttribute("data-microcategory-id");
                            const nanocategoryId = item.getAttribute("data-nanocategory-id");
                            const picocategoryId = item.getAttribute("data-picocategory-id");

                            if (
                                categoryId &&
                                subcategoryId &&
                                microcategoryId &&
                                nanocategoryId &&
                                picocategoryId
                            ) {
                                redirectToCategory(
                                    categoryId,
                                    subcategoryId,
                                    microcategoryId,
                                    nanocategoryId,
                                    picocategoryId
                                );
                            }
                        });
                    });
            }, 100);
        } else {
            // No subcategories
            const column = document.createElement("div");
            column.className = "mega-menu-column";

            // Create interactive category title
            const categoryTitleEl = document.createElement("div");
            categoryTitleEl.className = "sub-category-title";
            categoryTitleEl.textContent = category.name;
            categoryTitleEl.setAttribute("data-category-id", category.id);
            categoryTitleEl.style.cursor = "pointer";

            // Add hover effect
            categoryTitleEl.addEventListener("mouseenter", () => {
                categoryTitleEl.style.color = "#ef394e";
                categoryTitleEl.style.textDecoration = "underline";
            });

            categoryTitleEl.addEventListener("mouseleave", () => {
                categoryTitleEl.style.color = "";
                categoryTitleEl.style.textDecoration = "";
            });

            // Add click event
            categoryTitleEl.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                redirectToCategory(category.id, null, null);
            });

            column.innerHTML = `
            <div class="sub-category-group">
                <div class="sub-category-title-container"></div>
                <ul class="micro-category-list">
                    <li class="micro-category-item" style="color: #999;">محصولی در این دسته موجود نیست</li>
                </ul>
            </div>
        `;

            // Insert the interactive title
            const titleContainer = column.querySelector(
                ".sub-category-title-container"
            );
            titleContainer.appendChild(categoryTitleEl);

            megaMenuColumns.appendChild(column);
        }
    }

    // Category item interactions
    function setupCategoryInteractions() {
        const categoryItems = megaMenuCategories.querySelectorAll("li");

        categoryItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                if (window.innerWidth <= 991) {
                    // On mobile, toggle active state
                    categoryItems.forEach((i) => i.classList.remove("active"));
                    item.classList.add("active");

                    const categoryId = item.getAttribute("data-category-id");
                    const category = categories.find((cat) => cat.id === categoryId);
                    if (category) {
                        currentActiveCategory = category;
                        renderMegaMenuContent(category);
                    }
                } else {
                    // On desktop, navigate to the category page
                    const categoryId = item.getAttribute("data-category-id");
                    if (categoryId) {
                        redirectToCategory(categoryId, null, null, null, null);
                    }
                }
            });

            item.addEventListener("mouseenter", () => {
                if (window.innerWidth > 991) {
                    categoryItems.forEach((i) => i.classList.remove("active"));
                    item.classList.add("active");

                    const categoryId = item.getAttribute("data-category-id");
                    const category = categories.find((cat) => cat.id === categoryId);
                    if (category) {
                        currentActiveCategory = category;
                        renderMegaMenuContent(category);
                    }
                }
            });
        });
    }

    // Show mega menu on hover (desktop)
    navCategory.addEventListener("mouseenter", () => {
        if (window.innerWidth > 991 && megaMenu) {
            megaMenu.style.display = "flex";
            // Ensure current category content is displayed
            if (currentActiveCategory) {
                renderMegaMenuContent(currentActiveCategory);
            } else if (categories && categories.length > 0) {
                currentActiveCategory = categories[0];
                renderMegaMenuContent(currentActiveCategory);
            }
        }
    });

    navCategory.addEventListener("mouseleave", () => {
        if (window.innerWidth > 991 && megaMenu) {
            megaMenu.style.display = "none";
        }
    });

    // Toggle mega menu on click (mobile)
    navCategory.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            navCategory.classList.toggle("active");
            if (megaMenu) {
                megaMenu.style.display = navCategory.classList.contains("active")
                    ? "flex"
                    : "none";

                if (navCategory.classList.contains("active")) {
                    // Ensure current category content is displayed when opening
                    if (currentActiveCategory) {
                        renderMegaMenuContent(currentActiveCategory);
                    } else if (categories && categories.length > 0) {
                        currentActiveCategory = categories[0];
                        renderMegaMenuContent(currentActiveCategory);
                    }
                }
            }
        }
    });

    // Close mega menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navCategory && megaMenu) {
            if (!navCategory.contains(e.target) && !megaMenu.contains(e.target)) {
                if (window.innerWidth <= 991) {
                    navCategory.classList.remove("active");
                    megaMenu.style.display = "none";
                } else {
                    megaMenu.style.display = "none";
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            if (megaMenu) megaMenu.style.display = "none";
            navCategory.classList.remove("active");
        }
    });

    // Initialize mega menu
    renderMegaMenuCategories();
    setupCategoryInteractions();
}

/**
 * Render sidebar categories with images (if sidebar exists)
 */
function renderSidebarCategories() {
    const sidebarCategories = document.getElementById("sidebarCategories");
    if (!sidebarCategories || typeof categories === "undefined") return;

    sidebarCategories.innerHTML = "";

    // Show all categories as tiles
    categories.forEach((category) => {
        const tile = document.createElement("div");
        tile.className = "sidebar-category-tile";
        tile.setAttribute("data-category-id", category.id);
        tile.style.cursor = "pointer";

        // Get subcategory count for this category
        const subcategoryCount = category.subcategories
            ? category.subcategories.length
            : 0;

        // Get first few subcategory names for display
        let subcategoryText = "";
        if (category.subcategories && category.subcategories.length > 0) {
            const firstSubcategories = category.subcategories.slice(0, 2);
            subcategoryText = firstSubcategories.map((sub) => sub.name).join("، ");
            if (category.subcategories.length > 2) {
                subcategoryText += " و ...";
            }
        } else {
            subcategoryText = "هیچ زیردسته‌ای موجود نیست";
        }

        // Simple HTML structure
        tile.innerHTML = `
            <img src="${category.image}" alt="${category.name}" class="sidebar-tile-icon">
            <div class="sidebar-tile-content">
                <div class="sidebar-tile-name">${category.name}</div>
                <div class="sidebar-tile-subtitle">${subcategoryText}</div>
            </div>
        `;

        // Add click event directly to tile
        tile.addEventListener("click", () => {
            // Check if we are already on category page, if so we might want to just reload or handle it
            // but redirectToCategory handles maintaining params best
            redirectToCategory(category.id, null, null);
        });

        // Add hover effects
        tile.addEventListener("mouseenter", () => {
            tile.style.transform = "translateY(-3px)";
            tile.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.12)";
            tile.style.borderColor = "#ef394e";
        });

        tile.addEventListener("mouseleave", () => {
            tile.style.transform = "";
            tile.style.boxShadow = "";
            tile.style.borderColor = "";
        });

        sidebarCategories.appendChild(tile);
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const matches = performSearch(query);
        renderSearchResults(matches);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            searchResults.classList.add('active');
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

/**
 * Perform search across products and categories
 */
function performSearch(query) {
    const matches = {
        categories: [],
        products: []
    };

    // 1. Search Categories (at all levels)
    if (typeof categories !== 'undefined') {
        categories.forEach(cat => {
            // Level 1: Category
            if (cat.name.toLowerCase().includes(query)) {
                matches.categories.push({ name: cat.name, id: cat.id, type: 'cat', path: cat.name });
            }

            if (cat.subcategories) {
                cat.subcategories.forEach(sub => {
                    // Level 2: Subcategory
                    if (sub.name.toLowerCase().includes(query)) {
                        matches.categories.push({ name: sub.name, id: sub.id, catId: cat.id, type: 'sub', path: `${cat.name} > ${sub.name}` });
                    }

                    if (sub.microcategories) {
                        sub.microcategories.forEach(micro => {
                            // Level 3: Microcategory
                            if (micro.name.toLowerCase().includes(query)) {
                                matches.categories.push({ name: micro.name, id: micro.id, catId: cat.id, subId: sub.id, type: 'micro', path: `${cat.name} > ${sub.name} > ${micro.name}` });
                            }

                            if (micro.nanocategories) {
                                micro.nanocategories.forEach(nano => {
                                    // Level 4: Nanocategory
                                    if (nano.name.toLowerCase().includes(query)) {
                                        matches.categories.push({ name: nano.name, id: nano.id, catId: cat.id, subId: sub.id, microId: micro.id, type: 'nano', path: `${cat.name} > ${sub.name} > ${micro.name} > ${nano.name}` });
                                    }

                                    if (nano.picocategories) {
                                        nano.picocategories.forEach(pico => {
                                            // Level 5: Picocategory
                                            if (pico.name.toLowerCase().includes(query)) {
                                                matches.categories.push({ name: pico.name, id: pico.id, catId: cat.id, subId: sub.id, microId: micro.id, nanoId: nano.id, type: 'pico', path: `${cat.name} > ${sub.name} > ${micro.name} > ${nano.name} > ${pico.name}` });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    // 2. Search Products
    if (typeof products !== 'undefined') {
        products.forEach(prod => {
            if (prod.title.toLowerCase().includes(query) || (prod.enTitle && prod.enTitle.toLowerCase().includes(query))) {
                matches.products.push(prod);
            }
        });
    }

    return matches;
}

/**
 * Render search results in the dropdown
 */
function renderSearchResults(matches) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (matches.categories.length === 0 && matches.products.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">نتیجه‌ای یافت نشد</div>';
        searchResults.classList.add('active');
        return;
    }

    let html = '';

    // Render Category Matches
    if (matches.categories.length > 0) {
        html += '<div class="search-result-section-title">دسته‌بندی‌ها</div>';
        matches.categories.slice(0, 5).forEach(cat => {
            html += `
                <div class="search-result-item" data-type="category" 
                     data-cat="${cat.catId || cat.id}" 
                     data-sub="${cat.subId || (cat.type === 'sub' ? cat.id : '')}" 
                     data-micro="${cat.microId || (cat.type === 'micro' ? cat.id : '')}" 
                     data-nano="${cat.nanoId || (cat.type === 'nano' ? cat.id : '')}" 
                     data-pico="${cat.picoId || (cat.type === 'pico' ? cat.id : '')}">
                    <i class="fas fa-list-ul"></i>
                    <div class="search-result-content">
                        <span class="search-result-title">${cat.name}</span>
                        <span class="search-result-category">${cat.path}</span>
                    </div>
                </div>
            `;
        });
    }

    // Render Product Matches
    if (matches.products.length > 0) {
        html += '<div class="search-result-section-title">محصولات</div>';
        matches.products.slice(0, 8).forEach(prod => {
            html += `
                <div class="search-result-item" data-type="product" data-id="${prod.id}">
                    <i class="fas fa-mobile-alt"></i>
                    <div class="search-result-content">
                        <span class="search-result-title">${prod.title}</span>
                        <span class="search-result-category">${formatPersianNumber(prod.price)} تومان</span>
                    </div>
                </div>
            `;
        });
    }

    searchResults.innerHTML = html;
    searchResults.classList.add('active');

    // Add click event to results
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            if (type === 'category') {
                const cat = item.getAttribute('data-cat');
                const sub = item.getAttribute('data-sub');
                const micro = item.getAttribute('data-micro');
                const nano = item.getAttribute('data-nano');
                const pico = item.getAttribute('data-pico');
                redirectToCategory(cat, sub, micro, nano, pico);
            } else if (type === 'product') {
                const prodId = item.getAttribute('data-id');
                console.log('Product clicked:', prodId);
                window.location.href = `product.html?id=${prodId}`;
            }
            searchResults.classList.remove('active');
        });
    });
}

// Initialize when window loads
window.addEventListener("DOMContentLoaded", () => {
    initMegaMenu();
    renderSidebarCategories();
    makeCategoriesClickable();
    initSearch(); // Initialize search
});
