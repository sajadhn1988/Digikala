// Track if mobile components have been initialized
let mobileComponentsInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu components only once
    if (!mobileComponentsInitialized) {
        try {
            if (typeof initMobileMenu === 'function') {
                initMobileMenu();
            }
            if (typeof initMobileCategoryMenu === 'function') {
                initMobileCategoryMenu();
            }
            mobileComponentsInitialized = true;
        } catch (error) {
            console.warn('Mobile menu initialization skipped:', error);
        }
    }

    renderCart();
});

function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const emptyMsg = document.getElementById('emptyCartMessage');
    const summaryCount = document.getElementById('summaryCount');
    const cartItemCountText = document.getElementById('cartItemCountText');

    const cart = getCart();

    if (cart.length === 0) {
        container.style.display = 'none';
        emptyMsg.style.display = 'block';
        updateSummary(0, 0, 0);
        summaryCount.textContent = formatPersianNumber(0) + ' کالا';
        cartItemCountText.textContent = formatPersianNumber(0) + ' کالا';
        return;
    }

    container.style.display = 'block';
    emptyMsg.style.display = 'none';

    let html = '';
    let totalRaw = 0;
    let totalDiscount = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        itemCount += item.qty;
        const rawPrice = parseInt(product.oldPrice || product.price) * item.qty;
        const finalPrice = parseInt(product.price) * item.qty;
        totalRaw += rawPrice;
        totalDiscount += (rawPrice - finalPrice);

        html += `
            <div class="cart-item" data-id="${product.id}">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='public/images/missing.jpg'">
                </div>
                <div class="cart-item-details">
                    <div>
                        <a href="product.html?id=${product.id}" class="cart-item-title">${product.title}</a>
                        <div class="cart-item-meta">
                            <i class="fas fa-shield-alt"></i> گارانتی اصالت و سلامت فیزیکی کالا
                        </div>
                    </div>
                    
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="qty-btn plus" onclick="changeQty(${product.id}, 1)"><i class="fas fa-plus"></i></button>
                            <span class="qty-value">${formatPersianNumber(item.qty)}</span>
                            <button class="qty-btn minus" onclick="changeQty(${product.id}, -1)">
                                ${item.qty > 1 ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-trash"></i>'}
                            </button>
                        </div>
                        
                        <div class="cart-item-price">
                            ${product.discounted ? `<div class="item-old-price">${formatPersianNumber(rawPrice)} تومان</div>` : ''}
                            <div class="item-current-price">${formatPersianNumber(finalPrice)} <span>تومان</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    summaryCount.textContent = formatPersianNumber(itemCount) + ' کالا';
    cartItemCountText.textContent = formatPersianNumber(itemCount) + ' کالا';

    updateSummary(totalRaw, totalDiscount, (totalRaw - totalDiscount));
}

function updateSummary(raw, discount, final) {
    document.getElementById('totalRawPrice').textContent = formatPersianNumber(raw) + ' تومان';
    document.getElementById('totalDiscount').textContent = formatPersianNumber(discount) + ' تومان';
    document.getElementById('totalFinalPrice').textContent = formatPersianNumber(final) + ' تومان';
}

window.changeQty = function (id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        const newQty = item.qty + delta;
        if (newQty <= 0) {
            removeFromCart(id);
        } else {
            updateCartQty(id, newQty);
        }
        renderCart();
    }
}
