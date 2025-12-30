let currentProductId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    currentProductId = productId;

    if (!productId) {
        showError('محصولی یافت نشد.');
        return;
    }

    // 2. Find Product Data
    if (typeof products === 'undefined') {
        console.error('Products data not loaded!');
        showError('خطا در بارگذاری داده‌ها');
        return;
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        showError('محصول مورد نظر یافت نشد.');
        return;
    }

    // 3. Load Product Data to DOM
    loadProductData(product);

    // 4. Initialize Interactivity
    initGallery();
    initTabs();
    initCart();


    // 5. Initialize Mobile Menu Components
    try {
        if (typeof initMobileMenu === 'function') initMobileMenu();
        if (typeof initMobileCategoryMenu === 'function') initMobileCategoryMenu();
    } catch (error) {
        console.warn('Mobile menu initialization skipped:', error);
    }
});

function loadProductData(product) {
    // Basic Info
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productSubtitle').textContent = product.enTitle || "";
    document.title = `${product.title} - جی جی‌کالا`;

    // Main Image
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.image;
    mainImage.alt = product.title;
    mainImage.onerror = function () {
        this.src = 'public/images/missing.jpg';
        this.onerror = null; // Prevent infinite loop if missing.jpg is also missing
    };

    // Gallery Thumbnails
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    let thumbnailsHTML = `
        <div class="thumb active" data-src="${product.image}">
            <img src="${product.image}" alt="اصلی" onerror="this.src='public/images/missing.jpg'; this.onerror=null;">
        </div>
    `;

    // Add extra thumbnails if they exist
    ['image1', 'image2', 'image3'].forEach(imgKey => {
        if (product[imgKey]) {
            thumbnailsHTML += `
                <div class="thumb" data-src="${product[imgKey]}">
                    <img src="${product[imgKey]}" alt="تصویر ${imgKey.slice(5)}" onerror="this.src='public/images/missing.jpg'; this.onerror=null;">
                </div>
            `;
        }
    });

    galleryThumbnails.innerHTML = thumbnailsHTML;

    // Rating
    const productRating = document.getElementById('productRating');
    const ratingText = document.getElementById('productRatingText');
    if (productRating && ratingText) {
        productRating.innerHTML = `
            <div class="rating-stars">${renderStars(product.rating)}</div>
            <span id="productRatingText">${formatPersianNumber(product.rating.toFixed(1))} (${formatPersianNumber(product.ratingCount)})</span>
        `;
    }

    // Comments
    const commentsLink = document.getElementById('productCommentsLink');
    if (commentsLink) {
        commentsLink.textContent = `${formatPersianNumber(product.ratingCount)} دیدگاه`;
    }

    // Price
    const priceEl = document.getElementById('productPrice');
    const oldPriceEl = document.getElementById('productOldPrice');
    const discountEl = document.getElementById('productDiscount');
    const oldPriceRow = document.getElementById('oldPriceRow');

    if (priceEl) priceEl.textContent = formatPersianNumber(product.price);

    if (product.discounted) {
        if (oldPriceEl) oldPriceEl.textContent = formatPersianNumber(product.oldPrice);
        if (discountEl) discountEl.textContent = product.discount;
        if (oldPriceRow) oldPriceRow.style.display = 'flex';
    } else {
        if (oldPriceRow) oldPriceRow.style.display = 'none';
        if (discountEl) discountEl.style.display = 'none';
    }

    // Attributes (Features & Specs)
    if (product.attributes) {
        // Brief Features (first 3)
        const featuresList = document.getElementById('productFeaturesList');
        const attrKeys = Object.keys(product.attributes);
        featuresList.innerHTML = attrKeys.slice(0, 4).map(key => {
            const label = getAttributeLabel(key);
            const value = product.attributes[key];
            return `<li><span>${label}:</span> ${value}</li>`;
        }).join('');

        // Specs Table
        const specsTable = document.getElementById('productSpecsTable');
        specsTable.innerHTML = attrKeys.map(key => {
            const label = getAttributeLabel(key);
            const value = product.attributes[key];
            return `
                <div class="spec-row">
                    <div class="spec-label">${label}</div>
                    <div class="spec-value">${value}</div>
                </div>
            `;
        }).join('');
    }

    // Breadcrumbs (Dynamic based on category - mapping needed)
    updateBreadcrumbs(product);

    // Comments
    renderComments(product.id);
}

function getAttributeLabel(key) {
    const labels = {
        brand: "برند",
        operatingSystem: "سیستم عامل",
        ram: "حافظه رم",
        storage: "حافظه داخلی",
        screenSize: "اندازه صفحه",
        camera: "دوربین",
        color: "رنگ",
        processor: "پردازنده",
        weight: "وزن",
        batteryCapacity: "ظرفیت باتری",
        resolution: "رزولوشن",
        type: "نوع",
        connectivity: "اتصال",
        warranty: "گارانتی",
        material: "جنس",
        size: "سایز",
        pages: "تعداد صفحات",
        author: "نویسنده"
        // Add more as needed or use a fallback
    };
    return labels[key] || key;
}

function updateBreadcrumbs(product) {
    const breadcrumb = document.getElementById('productBreadcrumb');

    let categoryName = product.category;
    if (typeof categories !== 'undefined') {
        const category = categories.find(c => c.id === product.category);
        if (category) {
            categoryName = category.name;
        }
    }

    breadcrumb.innerHTML = `
        <a href="index.html">جی جی‌کالا</a> /
        <a href="category.html?cat=${product.category}">${categoryName}</a> /
        <span>${product.title}</span>
    `;
}

function renderComments(productId) {
    const container = document.getElementById('productCommentsContainer');
    if (!container) return;

    const comments = (typeof commentsData !== 'undefined') ? commentsData[productId] : null;

    // Add Sorting Header
    let headerHTML = `
        <div class="comments-sort-header">
            <div class="sort-title"><i class="fas fa-sort-amount-down"></i> مرتب‌سازی:</div>
            <div class="sort-options">
                <span class="sort-item active">مفیدترین</span>
                <span class="sort-item">جدیدترین</span>
                <span class="sort-item">دیدگاه خریداران</span>
            </div>
            <div class="comments-count">${formatPersianNumber(comments ? comments.length : 0)} دیدگاه</div>
        </div>
    `;

    if (!comments || comments.length === 0) {
        container.innerHTML = headerHTML + '<p class="no-comments">هنوز دیدگاهی برای این محصول ثبت نشده است.</p>';
        return;
    }

    const commentsListHTML = comments.map(comment => {
        const user = (typeof users !== 'undefined') ? users.find(u => u.id === comment.userId) : null;
        const avatarSrc = user && user.avatar ? user.avatar : 'public/images/missing.jpg';

        return `
        <div class="comment-item">
            <div class="comment-content">
                <div class="comment-user-header">
                    <div class="user-main-info">
                        <div class="user-profile-side">
                            <div class="user-avatar">
                                <img src="${avatarSrc}" alt="${comment.username}" onerror="this.src='public/images/missing.jpg'; this.onerror=null;">
                            </div>
                            <div class="comment-stars">
                                ${renderStars(comment.rating)}
                            </div>
                        </div>
                        <div class="user-text-info">
                            <span class="name">${comment.username}</span>
                            ${comment.isBuyer ? '<span class="buyer-badge">خریدار</span>' : ''}
                        </div>
                    </div>
                </div>

                <div class="comment-body">
                    ${comment.text}
                </div>

                <div class="comment-footer">
                    <div class="seller-mention">
                        <i class="fas fa-store"></i>
                        ${comment.seller}
                    </div>
                    <div class="comment-actions">
                        <div class="action-item"><i class="far fa-thumbs-up"></i> <span>${formatPersianNumber(comment.likes)}</span></div>
                        <div class="action-item"><i class="far fa-thumbs-down"></i> <span>${formatPersianNumber(comment.dislikes)}</span></div>
                    </div>
                </div>
            </div>
            <div class="comment-side">
                <div class="comment-date">${comment.date}</div>
                <div class="comment-options"><i class="fas fa-ellipsis-v"></i></div>
            </div>
        </div>
        `;
    }).join('');

    container.innerHTML = headerHTML + `<div class="comments-list">${commentsListHTML}</div>`;
}

function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.getAttribute('data-src');
            mainImage.src = newSrc;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.style.display = (content.id === targetTab) ? 'block' : 'none';
            });
        });
    });
}

function initCart() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (typeof addToCart === 'function') {
                addToCart(currentProductId, 1);
                if (typeof showToast === 'function') {
                    showToast();
                } else {
                    alert('محصول با موفقیت به سبد خرید اضافه شد!');
                }
            } else {
                alert('محصول با موفقیت به سبد خرید اضافه شد!');
            }
        });
    }
}

function showError(message) {
    const container = document.querySelector('.product-page-container');
    if (container) {
        container.innerHTML = `<div class="error-message" style="text-align: center; padding: 50px;">
            <h3>${message}</h3>
            <a href="index.html" class="back-link">بازگشت به خانه</a>
        </div>`;
    }
}
