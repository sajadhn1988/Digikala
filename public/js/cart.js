/**
 * Cart management utility using localStorage
 */

const CART_KEY = 'gigikala_cart';

/**
 * Get current cart items from localStorage
 * @returns {Array} Array of {id, qty} objects
 */
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart 
 */
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

/**
 * Add product to cart
 * @param {number} productId 
 * @param {number} qty 
 */
function addToCart(productId, qty = 1) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart(cart);
}

/**
 * Update quantity of an item in cart
 * @param {number} productId 
 * @param {number} qty 
 */
function updateCartQty(productId, qty) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.qty = Math.max(1, qty);
        saveCart(cart);
    }
}

/**
 * Remove item from cart
 * @param {number} productId 
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

/**
 * Get total number of items in cart
 * @returns {number}
 */
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.qty, 0);
}

/**
 * Update the cart badge in the header
 */
function updateCartBadge() {
    const count = getCartCount();
    const badges = document.querySelectorAll('.cart-badge');

    badges.forEach(badge => {
        badge.textContent = formatPersianNumber(count);
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

function showToast(message = 'محصول با موفقیت به سبد خرید اضافه شد!') {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Format number to Persian (helper if nav.js not loaded, but preferred from nav.js)
if (typeof formatPersianNumber === 'undefined') {
    window.formatPersianNumber = function (num) {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return num.toString().replace(/\d/g, (d) => persianDigits[d]);
    };
}

// Initialize badge count on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
