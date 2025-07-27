// Tema değiştirici
const themeSelector = document.getElementById('theme-selector');
const themeLink = document.getElementById('theme-link');

themeSelector.addEventListener('change', (e) => {
    themeLink.href = e.target.value;
    renderCart(); // Sepet görünümünü güncelle
});

// Sepet işlemleri
const addToCartBtn = document.getElementById('add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

const CART_KEY = 'smartshop_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart() {
    const cart = getCart();
    const product = {
        id: 1,
        name: 'SmartFit Watch',
        price: 899,
        quantity: 1
    };

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push(product);
    }

    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    renderCart();
}

function renderCart() {
    const cart = getCart();

    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Sepet boş</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - ₺${item.price * item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = `Toplam: ₺${total}`;
}

addToCartBtn.addEventListener('click', addToCart);
clearCartBtn.addEventListener('click', clearCart);

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
