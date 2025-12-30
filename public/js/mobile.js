// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const navRight = document.querySelector(".nav-right");
    const navOverlay = document.querySelector(".nav-overlay");
    const navCategory = document.querySelector(".nav-category");

    if (!navRight || !navOverlay) return;

    const isOpening = !navRight.classList.contains("active");

    navRight.classList.toggle("active");
    navOverlay.classList.toggle("active");

    if (isOpening) {
        document.body.style.overflow = "hidden";
        // Close mega menu if open
        if (navCategory) navCategory.classList.remove("active");
    } else {
        document.body.style.overflow = "";
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileCloseBtn = document.querySelector(".mobile-close-btn");
    const navRight = document.querySelector(".nav-right");
    const navOverlay = document.querySelector(".nav-overlay");

    if (!mobileMenuBtn) return;

    // When hamburger is clicked → open category menu
    mobileMenuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Use the global function to open category menu
        if (typeof window.openMobileCategoryMenu === "function") {
            window.openMobileCategoryMenu();
        }

        // Close the old nav if it was open
        if (navRight) navRight.classList.remove("active");
    });

    // Keep existing close functionality for old nav
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener("click", () => {
            if (navRight) navRight.classList.remove("active");
            if (navOverlay) navOverlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", () => {
            if (navRight) navRight.classList.remove("active");
            if (navOverlay) navOverlay.classList.remove("active");
            document.body.style.overflow = "";

            // Also close mobile category menu if open
            if (typeof window.closeMobileCategoryMenu === "function") {
                window.closeMobileCategoryMenu();
            }
        });
    }
}

/**
 * Initialize enhanced mobile category menu with 3-level hierarchy
 */
function initMobileCategoryMenu() {
    const mobileCategoryBtn = document.getElementById("mobileCategoryBtn");
    const mobileCategoryMenu = document.getElementById("mobileCategoryMenu");
    const closeCategoryMenu = document.getElementById("closeCategoryMenu");
    const categoryBackButton = document.getElementById("categoryBackButton");
    const categoryTitle = document.getElementById("categoryTitle");
    const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
    const navOverlay = document.querySelector(".nav-overlay") || document.getElementById("navOverlay");

    // DOM elements for category levels
    const levelCategories = document.getElementById("level-categories");
    const levelSubcategories = document.getElementById("level-subcategories");
    const levelMicrocategories = document.getElementById("level-microcategories");
    const levelNanocategories = document.getElementById("level-nanocategories");
    const levelPicocategories = document.getElementById("level-picocategories");

    const mainCategoriesList = document.getElementById("mainCategoriesList");
    const subcategoriesList = document.getElementById("subcategoriesList");
    const microcategoriesList = document.getElementById("microcategoriesList");
    const nanocategoriesList = document.getElementById("nanocategoriesList");
    const picocategoriesList = document.getElementById("picocategoriesList");

    // Check if basic elements exist
    if (!mobileCategoryMenu || !mainCategoriesList) return;

    // Navigation state
    let currentLevel = "categories";
    let currentCategory = null;
    let currentSubcategory = null;
    let currentMicrocategory = null;
    let currentNanocategory = null;
    let navigationStack = [];

    /**
     * Open mobile category menu
     */
    function openMobileCategoryMenu() {
        if (!mobileCategoryMenu || !navOverlay) return;

        // Reset navigation state
        resetNavigation();

        // Show menu and overlay
        mobileCategoryMenu.classList.add("active");
        navOverlay.classList.add("active");
        if (mobileCategoryBtn) mobileCategoryBtn.classList.add("active");
        document.body.style.overflow = "hidden";

        // Initialize categories if not already done
        if (mainCategoriesList.children.length === 0) {
            renderMainCategories();
        }

        // Deactivate other bottom nav items
        bottomNavItems.forEach((item) => {
            if (mobileCategoryBtn && item !== mobileCategoryBtn.parentElement)
                item.classList.remove("active");
        });
        if (mobileCategoryBtn && mobileCategoryBtn.parentElement) {
            mobileCategoryBtn.parentElement.classList.add("active");
        }
    }

    /**
     * Close mobile category menu
     */
    function closeMobileCategoryMenu() {
        if (!mobileCategoryMenu || !navOverlay) return;

        mobileCategoryMenu.classList.remove("active");
        navOverlay.classList.remove("active");
        if (mobileCategoryBtn) mobileCategoryBtn.classList.remove("active");
        document.body.style.overflow = "";

        // Reset navigation state after animation
        setTimeout(() => {
            resetNavigation();
        }, 350);
    }

    /**
     * Reset navigation state
     */
    function resetNavigation() {
        if (
            !levelCategories ||
            !levelSubcategories ||
            !levelMicrocategories ||
            !categoryTitle ||
            !categoryBackButton
        )
            return;

        // Hide all levels except categories
        levelSubcategories.style.display = "none";
        levelMicrocategories.style.display = "none";
        if (levelNanocategories) levelNanocategories.style.display = "none";
        if (levelPicocategories) levelPicocategories.style.display = "none";

        // Show categories level
        levelCategories.style.display = "flex";
        levelCategories.classList.add("active");

        // Reset state
        currentLevel = "categories";
        currentCategory = null;
        currentSubcategory = null;
        currentMicrocategory = null;
        currentNanocategory = null;
        navigationStack = [];

        // Reset UI
        categoryTitle.textContent = "دسته‌بندی کالاها";
        categoryBackButton.style.display = "none";

        // Remove animation classes
        levelCategories.classList.remove("slide-out");
        levelSubcategories.classList.remove("slide-out");
        levelMicrocategories.classList.remove("slide-out");
        if (levelNanocategories) levelNanocategories.classList.remove("slide-out");
        if (levelPicocategories) levelPicocategories.classList.remove("slide-out");
    }

    /**
     * Render main categories
     */
    function renderMainCategories() {
        if (!mainCategoriesList) return;

        mainCategoriesList.innerHTML = "";

        // Check if categories data is available
        if (typeof categories === "undefined") {
            mainCategoriesList.innerHTML = `
                <li class="category-list-item">
                    <a href="#" style="justify-content: center; color: #999;">
                        خطا در بارگیری دسته‌بندی‌ها
                    </a>
                </li>
            `;
            return;
        }

        if (categories.length === 0) { // Fix: check length property properly
            mainCategoriesList.innerHTML = `
                <li class="category-list-item">
                    <a href="#" style="justify-content: center; color: #999;">
                        دسته‌بندی‌ای یافت نشد
                    </a>
                </li>
            `;
            return;
        }


        categories.forEach((category) => {
            const li = document.createElement("li");
            li.className = "category-list-item";
            li.innerHTML = `
                <a href="#" data-category-id="${category.id}" class="mobile-category-link">
                    <div style="display: flex; align-items: center;">
                        <i class="${category.icon || "fas fa-folder"} category-icon"></i>
                        <span>${category.name}</span>
                    </div>
                    <i class="fas fa-chevron-left category-arrow"></i>
                </a>
            `;
            mainCategoriesList.appendChild(li);
        });

        // Add event listeners to category items
        setTimeout(() => {
            const categoryLinks = mainCategoriesList.querySelectorAll(
                "a[data-category-id]"
            );

            categoryLinks.forEach((link) => {
                link.addEventListener("click", handleCategoryClick);
            });
        }, 100);
    }

    /**
     * Handle category click
     */
    function handleCategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.currentTarget;
        const categoryId = link.getAttribute("data-category-id");
        const category = categories.find((cat) => cat.id === categoryId);

        if (category) {
            navigateToSubcategories(category);
        }
    }

    /**
     * Navigate to subcategories level
     */
    function navigateToSubcategories(category) {
        if (
            !categoryTitle ||
            !categoryBackButton ||
            !levelCategories ||
            !levelSubcategories
        )
            return;

        currentCategory = category;
        navigationStack.push({
            level: "categories",
            title: "دسته‌بندی کالاها",
            category: null,
        });

        // Update UI
        categoryTitle.textContent = category.name;
        categoryBackButton.style.display = "flex";
        currentLevel = "subcategories";

        // Render subcategories
        renderSubcategories(category);

        // RTL Animation: current level slides left, new level slides in from right
        levelCategories.classList.remove("active");
        levelCategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelCategories && levelSubcategories) {
                levelCategories.style.display = "none";
                levelSubcategories.style.display = "flex";
                levelSubcategories.classList.add("active");
                levelSubcategories.classList.remove("slide-out");
            }
        }, 300);
    }

    /**
     * Render subcategories for a category
     */
    function renderSubcategories(category) {
        if (!subcategoriesList) return;

        subcategoriesList.innerHTML = "";

        if (category.subcategories && category.subcategories.length > 0) {
            category.subcategories.forEach((subcategory) => {
                const li = document.createElement("li");
                li.className = "category-list-item";
                li.innerHTML = `
                    <a href="#" data-subcategory-id="${subcategory.id}" class="mobile-subcategory-link">
                        <span>${subcategory.name}</span>
                        ${subcategory.microcategories &&
                        subcategory.microcategories.length > 0
                        ? '<i class="fas fa-chevron-left category-arrow"></i>'
                        : ""
                    }
                    </a>
                `;
                subcategoriesList.appendChild(li);
            });

            // Add event listeners to subcategory items
            setTimeout(() => {
                subcategoriesList
                    .querySelectorAll("a[data-subcategory-id]")
                    .forEach((link) => {
                        link.addEventListener("click", handleSubcategoryClick);
                    });
            }, 100);
        } else {
            const li = document.createElement("li");
            li.className = "category-list-item";
            li.innerHTML = `
                <a href="#" style="justify-content: center; color: #999;">
                    زیردسته‌بندی موجود نیست
                </a>
            `;
            subcategoriesList.appendChild(li);
        }
    }

    /**
     * Handle subcategory click
     */
    function handleSubcategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.currentTarget;
        const subcategoryId = link.getAttribute("data-subcategory-id");
        const subcategory = currentCategory.subcategories.find(
            (sub) => sub.id === subcategoryId
        );

        if (
            subcategory &&
            subcategory.microcategories &&
            subcategory.microcategories.length > 0
        ) {
            navigateToMicrocategories(currentCategory, subcategory);
        } else {
            // Redirect if no microcategories
            closeMobileCategoryMenu();
            setTimeout(() => {
                redirectToCategory(currentCategory.id, subcategoryId, null);
            }, 100);
        }
    }

    /**
     * Navigate to microcategories level
     */
    function navigateToMicrocategories(category, subcategory) {
        if (!categoryTitle || !levelSubcategories || !levelMicrocategories) return;

        currentSubcategory = subcategory;
        navigationStack.push({
            level: "subcategories",
            title: category.name,
            category: category,
        });

        // Update UI
        categoryTitle.textContent = subcategory.name;
        currentLevel = "microcategories";

        // Render microcategories
        renderMicrocategories(subcategory);

        // RTL Animation
        levelSubcategories.classList.remove("active");
        levelSubcategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelSubcategories && levelMicrocategories) {
                levelSubcategories.style.display = "none";
                levelMicrocategories.style.display = "flex";
                levelMicrocategories.classList.add("active");
                levelMicrocategories.classList.remove("slide-out");
            }
        }, 300);
    }

    /**
     * Render microcategories for a subcategory
     */
    function renderMicrocategories(subcategory) {
        if (!microcategoriesList) return;

        microcategoriesList.innerHTML = "";

        if (subcategory.microcategories && subcategory.microcategories.length > 0) {
            subcategory.microcategories.forEach((microcategory) => {
                const li = document.createElement("li");
                li.className = "category-list-item";
                li.innerHTML = `
            <a href="#" data-microcategory-id="${microcategory.id}" class="mobile-microcategory-link">
                <span>${microcategory.name}</span>
                ${microcategory.nanocategories &&
                        microcategory.nanocategories.length > 0
                        ? '<i class="fas fa-chevron-left category-arrow"></i>'
                        : ""
                    }
            </a>
        `;
                microcategoriesList.appendChild(li);
            });

            // Add event listeners to microcategory items
            setTimeout(() => {
                microcategoriesList
                    .querySelectorAll("a[data-microcategory-id]")
                    .forEach((link) => {
                        link.addEventListener("click", handleMicrocategoryClick);
                    });
            }, 100);
        } else {
            const li = document.createElement("li");
            li.className = "category-list-item";
            li.innerHTML = `
                <a href="#" style="justify-content: center; color: #999;">
                    محصولی در این دسته موجود نیست
                </a>
            `;
            microcategoriesList.appendChild(li);
        }
    }

    /**
     * Handle microcategory click
     */
    function handleMicrocategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.currentTarget;
        const microcategoryId = link.getAttribute("data-microcategory-id");
        const microcategory = currentSubcategory.microcategories.find(
            (m) => m.id === microcategoryId
        );

        if (
            microcategory &&
            microcategory.nanocategories &&
            microcategory.nanocategories.length > 0
        ) {
            navigateToNanocategories(currentSubcategory, microcategory);
        } else {
            // Close mobile menu first
            closeMobileCategoryMenu();

            // Redirect to category page with the selected microcategory
            setTimeout(() => {
                if (currentCategory && currentSubcategory) {
                    redirectToCategory(currentCategory.id, currentSubcategory.id, microcategoryId, null, null);
                }
            }, 100);
        }
    }

    /**
     * Navigate to nanocategories level
     */
    function navigateToNanocategories(subcategory, microcategory) {
        if (!categoryTitle || !levelMicrocategories || !levelNanocategories) return;

        currentMicrocategory = microcategory;
        navigationStack.push({
            level: "microcategories",
            title: subcategory.name,
            category: currentCategory,
            subcategory: subcategory
        });

        // Update UI
        categoryTitle.textContent = microcategory.name;
        currentLevel = "nanocategories";

        // Render nanocategories
        renderNanocategories(microcategory);

        // RTL Animation
        levelMicrocategories.classList.remove("active");
        levelMicrocategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelMicrocategories && levelNanocategories) {
                levelMicrocategories.style.display = "none";
                levelNanocategories.style.display = "flex";
                levelNanocategories.classList.add("active");
                levelNanocategories.classList.remove("slide-out");
            }
        }, 300);
    }

    /**
     * Render nanocategories for a microcategory
     */
    function renderNanocategories(microcategory) {
        if (!nanocategoriesList) return;

        nanocategoriesList.innerHTML = "";

        if (microcategory.nanocategories && microcategory.nanocategories.length > 0) {
            microcategory.nanocategories.forEach((nanocategory) => {
                const li = document.createElement("li");
                li.className = "category-list-item";
                li.innerHTML = `
                  <a href="#" data-nanocategory-id="${nanocategory.id}" class="mobile-nanocategory-link">
                      <span>${nanocategory.name}</span>
                      ${nanocategory.picocategories &&
                        nanocategory.picocategories.length > 0
                        ? '<i class="fas fa-chevron-left category-arrow"></i>'
                        : ""
                    }
                  </a>
              `;
                nanocategoriesList.appendChild(li);
            });

            // Add event listeners
            setTimeout(() => {
                nanocategoriesList
                    .querySelectorAll("a[data-nanocategory-id]")
                    .forEach((link) => {
                        link.addEventListener("click", handleNanocategoryClick);
                    });
            }, 100);
        } else {
            const li = document.createElement("li");
            li.className = "category-list-item";
            li.innerHTML = `
               <a href="#" style="justify-content: center; color: #999;">
                   محصولی در این دسته موجود نیست
               </a>
           `;
            nanocategoriesList.appendChild(li);
        }
    }

    /**
     * Handle nanocategory click
     */
    function handleNanocategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.currentTarget;
        const nanocategoryId = link.getAttribute("data-nanocategory-id");
        const nanocategory = currentMicrocategory.nanocategories.find(
            (n) => n.id === nanocategoryId
        );

        if (
            nanocategory &&
            nanocategory.picocategories &&
            nanocategory.picocategories.length > 0
        ) {
            navigateToPicocategories(currentMicrocategory, nanocategory);
        } else {
            closeMobileCategoryMenu();
            setTimeout(() => {
                if (currentCategory && currentSubcategory && currentMicrocategory) {
                    redirectToCategory(currentCategory.id, currentSubcategory.id, currentMicrocategory.id, nanocategoryId, null);
                }
            }, 100);
        }
    }


    /**
     * Navigate to picocategories level
     */
    function navigateToPicocategories(microcategory, nanocategory) {
        if (!categoryTitle || !levelNanocategories || !levelPicocategories) return;

        currentNanocategory = nanocategory;
        navigationStack.push({
            level: "nanocategories",
            title: microcategory.name,
            category: currentCategory,
            subcategory: currentSubcategory,
            microcategory: microcategory
        });

        // Update UI
        categoryTitle.textContent = nanocategory.name;
        currentLevel = "picocategories";

        // Render picocategories
        renderPicocategories(nanocategory);

        // RTL Animation
        levelNanocategories.classList.remove("active");
        levelNanocategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelNanocategories && levelPicocategories) {
                levelNanocategories.style.display = "none";
                levelPicocategories.style.display = "flex";
                levelPicocategories.classList.add("active");
                levelPicocategories.classList.remove("slide-out");
            }
        }, 300);
    }

    /**
     * Render picocategories for a nanocategory
     */
    function renderPicocategories(nanocategory) {
        if (!picocategoriesList) return;

        picocategoriesList.innerHTML = "";

        if (nanocategory.picocategories && nanocategory.picocategories.length > 0) {
            nanocategory.picocategories.forEach((picocategory) => {
                const li = document.createElement("li");
                li.className = "category-list-item";
                li.innerHTML = `
                  <a href="#" data-picocategory-id="${picocategory.id}" class="mobile-picocategory-link">
                      <span>${picocategory.name}</span>
                  </a>
              `;
                picocategoriesList.appendChild(li);
            });

            // Add event listeners
            setTimeout(() => {
                picocategoriesList
                    .querySelectorAll("a[data-picocategory-id]")
                    .forEach((link) => {
                        link.addEventListener("click", handlePicocategoryClick);
                    });
            }, 100);
        } else {
            const li = document.createElement("li");
            li.className = "category-list-item";
            li.innerHTML = `
               <a href="#" style="justify-content: center; color: #999;">
                   محصولی در این دسته موجود نیست
               </a>
           `;
            picocategoriesList.appendChild(li);
        }
    }

    /**
     * Handle picocategory click
     */
    function handlePicocategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const link = e.currentTarget;
        const picocategoryId = link.getAttribute("data-picocategory-id");

        closeMobileCategoryMenu();
        setTimeout(() => {
            if (currentCategory && currentSubcategory && currentMicrocategory && currentNanocategory) {
                redirectToCategory(currentCategory.id, currentSubcategory.id, currentMicrocategory.id, currentNanocategory.id, picocategoryId);
            }
        }, 100);
    }

    /**
     * Handle back button click
     */
    function handleBackButton() {
        if (navigationStack.length === 0) {
            closeMobileCategoryMenu();
            return;
        }

        const previousState = navigationStack.pop();

        switch (currentLevel) {
            case "picocategories":
                navigateBackToNanocategories(previousState);
                break;
            case "nanocategories":
                navigateBackToMicrocategories(previousState);
                break;
            case "microcategories":
                navigateBackToSubcategories(previousState);
                break;
            case "subcategories":
                navigateBackToCategories(previousState);
                break;
        }
    }

    // Back functions
    function navigateBackToNanocategories(state) {
        if (!categoryTitle || !levelPicocategories || !levelNanocategories) return;
        categoryTitle.textContent = state.title;
        currentLevel = "nanocategories";
        currentNanocategory = state.nanocategory;

        levelPicocategories.classList.remove("active");
        levelPicocategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelPicocategories && levelNanocategories) {
                levelPicocategories.style.display = "none";
                levelNanocategories.style.display = "flex";
                levelNanocategories.classList.add("active");
                levelNanocategories.classList.remove("slide-out");
            }
        }, 300);
    }

    function navigateBackToMicrocategories(state) {
        if (!categoryTitle || !levelNanocategories || !levelMicrocategories) return;
        categoryTitle.textContent = state.title;
        currentLevel = "microcategories";
        currentMicrocategory = state.microcategory;

        levelNanocategories.classList.remove("active");
        levelNanocategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelNanocategories && levelMicrocategories) {
                levelNanocategories.style.display = "none";
                levelMicrocategories.style.display = "flex";
                levelMicrocategories.classList.add("active");
                levelMicrocategories.classList.remove("slide-out");
            }
        }, 300);
    }

    function navigateBackToSubcategories(state) {
        if (!categoryTitle || !levelMicrocategories || !levelSubcategories) return;
        categoryTitle.textContent = state.title;
        currentLevel = "subcategories";
        currentSubcategory = state.subcategory;

        levelMicrocategories.classList.remove("active");
        levelMicrocategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelMicrocategories && levelSubcategories) {
                levelMicrocategories.style.display = "none";
                levelSubcategories.style.display = "flex";
                levelSubcategories.classList.add("active");
                levelSubcategories.classList.remove("slide-out");
            }
            if (navigationStack.length > 0) categoryBackButton.style.display = "flex";
            else if (navigationStack.length === 0) categoryBackButton.style.display = "none"; // Should be main categories if stack empty? No, stack has 1 item when at subcategories
        }, 300);
    }

    function navigateBackToCategories(state) {
        if (!categoryTitle || !levelSubcategories || !levelCategories) return;
        categoryTitle.textContent = "دسته‌بندی کالاها";
        currentLevel = "categories";
        currentCategory = null;

        levelSubcategories.classList.remove("active");
        levelSubcategories.classList.add("slide-out");

        setTimeout(() => {
            if (levelSubcategories && levelCategories) {
                levelSubcategories.style.display = "none";
                levelCategories.style.display = "flex";
                levelCategories.classList.add("active");
                levelCategories.classList.remove("slide-out");
            }
            categoryBackButton.style.display = "none";
        }, 300);
    }

    // Add event listeners
    if (mobileCategoryBtn) {
        mobileCategoryBtn.addEventListener("click", () => {
            if (mobileCategoryMenu.classList.contains("active")) {
                closeMobileCategoryMenu();
            } else {
                openMobileCategoryMenu();
            }
        });
    }

    if (closeCategoryMenu) {
        closeCategoryMenu.addEventListener("click", closeMobileCategoryMenu);
    }

    if (categoryBackButton) {
        categoryBackButton.addEventListener("click", handleBackButton);
    }

    // Document Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileCategoryMenu.classList.contains("active")) {
            closeMobileCategoryMenu();
        }
    });

    // Make functions globally available
    window.openMobileCategoryMenu = openMobileCategoryMenu;
    window.closeMobileCategoryMenu = closeMobileCategoryMenu;
}
