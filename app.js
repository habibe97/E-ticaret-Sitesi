// Ürün listesi (kategori eklendi, açıklama eklendi)
const products = [
    { id: 1, name: "Bluetooth Kulaklık", price: 499, category: "audio", image: "resimler/jbl-tune-670btnc-kulakustu-anc-bluetooth-kulaklik-mor-9736.webp", description: "Yüksek kaliteli ses ve konfor." },
    { id: 2, name: "Akıllı Saat", price: 899, category: "wearable", image: "resimler/20292603_r1_1000_1000 (1).jpg", description: "Sağlık takibi ve bildirimler." },
    { id: 3, name: "Kablosuz Şarj Aleti", price: 299, category: "accessories", image: "resimler/61gHRuSE+eL.jpg", description: "Hızlı şarj desteği." },
    { id: 4, name: "Taşınabilir Hoparlör", price: 699, category: "audio", image: "resimler/Q218 Mobil Standlı Taşınabilir Bluetooth Hoparlör.png", description: "Yüksek ses kalitesi ve dayanıklılık." },
    { id: 5, name: "USB-C Hub", price: 199, category: "accessories", image: "resimler/61ZrDcJ4nYL.jpg", description: "Çoklu bağlantı desteği." },
    { id: 6, name: "Laptop Soğutucu Stand", price: 259, category: "accessories", image: "resimler/images (6).jpg", description: "Laptopunuzu serin tutar." },
    { id: 7, name: "Gaming Mouse", price: 399, category: "gaming", image: "resimler/oyuncumousepclaptopikloyuncumousegamingusbkablolusiyah1600dpi-1.avif", description: "Yüksek hassasiyet ve programlanabilir tuşlar." },
    { id: 8, name: "4K Web Kamera", price: 749, category: "accessories", image: "resimler/61hXp-68Y3L.jpg", description: "Net görüntü kalitesi." },
    { id: 9, name: "RGB Klavye", price: 599, category: "gaming", image: "resimler/hyperx_alloy_core_rgb_uk_1_main.webp", description: "Özelleştirilebilir aydınlatma." },
    { id: 10, name: "Taşınabilir SSD", price: 1199, category: "accessories", image: "resimler/71RdCw-AveL.jpg", description: "Hızlı veri aktarımı." },
    { id: 11, name: "Drone Kamera", price: 2499, category: "accessories", image: "resimler/1_org_zoom.webp", description: "Havadan çekim için ideal." },
    { id: 12, name: "Kablosuz Mouse", price: 229, category: "accessories", image: "resimler/9820166389810.jpg", description: "Ergonomik tasarım." },
    { id: 13, name: "VR Gözlük", price: 1899, category: "gaming", image: "resimler/61VqqIgzlrL._UF1000,1000_QL80_.jpg", description: "Sanal gerçeklik deneyimi." },
    { id: 14, name: "Tablet Kalemi", price: 159, category: "accessories", image: "resimler/for-ios-android-windows-uyumlu-tablet-ipad-yazi-kalemi-yedek-uc-kcm30268371-1-8f66d3677d984e5a8800a7882aa24c91.jpg", description: "Hassas ve dayanıklı." },
    { id: 15, name: "Powerbank 20.000 mAh", price: 399, category: "accessories", image: "resimler/142887-1_large.webp", description: "Uzun pil ömrü." },
    { id: 16, name: "Akıllı Ampul", price: 129, category: "accessories", image: "resimler/akilli-ampul-9w-titresimsiz-16.webp", description: "Uzaktan kontrol." },
    { id: 17, name: "Wi-Fi Sinyal Güçlendirici", price: 279, category: "accessories", image: "resimler/images (7).jpg", description: "Daha güçlü internet." },
    { id: 18, name: "Akıllı Termometre", price: 349, category: "accessories", image: "resimler/thermopro-tp359-bluetooth-sicaklik-alarmli-akilli-ic-mekan-dijital-isi-ve-nem-olcer-termometre-133086.webp", description: "Anlık sıcaklık takibi." },
    { id: 19, name: "HDMI Kablo (4K)", price: 89, category: "accessories", image: "resimler/indir (3).jpg", description: "Yüksek çözünürlük." },
    { id: 20, name: "Laptop Sırt Çantası", price: 499, category: "accessories", image: "resimler/images (8).jpg", description: "Dayanıklı ve şık." },
    { id: 21, name: "Kablosuz Kulak İçi Kulaklık", price: 379, category: "audio", image: "resimler/pro-60-bluetooth-kulaklik-tws-kulakici-kablosuz-gaming-kulaklik-kcm86497072-1-c23da32eeb1d46b8aee7aabfa49a5dc2.jpg", description: "Konforlu ve kaliteli ses." },
    { id: 22, name: "Oyun Konsolu Kontrolcüsü", price: 699, category: "gaming", image: "resimler/asus-rog-tessen-mobil-oyun-kontrolcusu-5.jpg", description: "Hassas kontrol." },
    { id: 23, name: "Mobil Soğutucu Fan", price: 219, category: "accessories", image: "resimler/1_org (1).webp", description: "Telefonunuzu serin tutar." }
];

const productList = document.querySelector(".product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const priceValue = document.getElementById("price-value");
const toggleThemeBtn = document.getElementById("toggle-theme");

const modal = document.getElementById("product-modal");
const modalCloseBtn = modal.querySelector(".close");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalAddToCartBtn = document.getElementById("modal-add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let filteredProducts = [...products];
let selectedProduct = null;

// Ürünleri renderla (filtrelere göre)
function renderProducts() {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3 class="product-name" data-id="${product.id}">${product.name}</h3>
      <p>₺${product.price}</p>
      <button onclick="addToCart(${product.id})">Sepete Ekle</button>
    `;
        productList.appendChild(div);
        // Animasyon için opacity sıfırdan 1'e geçiş
        setTimeout(() => {
            div.style.opacity = 1;
        }, 50);
    });
}

// Sepete ürün ekle
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Sepeti renderla
function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₺${item.price}`;

        // Ürün silme butonu
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.className = "cart-remove-btn";
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);

        cartItems.appendChild(li);
        total += item.price;
    });
    totalPrice.textContent = `Toplam: ₺${total}`;
}

// Sepetten ürün çıkar
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Sepeti temizle
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
}

// Kategori ve fiyat filtrelerini uygula
function applyFilters() {
    const category = categoryFilter.value;
    const maxPrice = Number(priceFilter.value);
    priceValue.textContent = maxPrice;

    filteredProducts = products.filter(p => {
        const matchCategory = category === "all" || p.category === category;
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchPrice;
    });
    renderProducts();
}

// Modal aç
function openModal(product) {
    selectedProduct = product;
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalName.textContent = product.name;
    modalDesc.textContent = product.description;
    modalPrice.textContent = `₺${product.price}`;
    modal.classList.remove("hidden");
}

// Modal kapa
function closeModal() {
    selectedProduct = null;
    modal.classList.add("hidden");
}

// Modal'dan sepete ekle
function modalAddToCart() {
    if (selectedProduct) {
        addToCart(selectedProduct.id);
        closeModal();
    }
}

// Event Listeners
clearCartBtn.addEventListener("click", clearCart);
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("input", applyFilters);
modalCloseBtn.addEventListener("click", closeModal);
modalAddToCartBtn.addEventListener("click", modalAddToCart);

// Ürün adına tıklayınca modal aç
productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-name")) {
        const id = Number(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === id);
        if (product) openModal(product);
    }
});

// Karanlık mod toggle
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        toggleThemeBtn.textContent = "Açık Mod";
    } else {
        toggleThemeBtn.textContent = "Karanlık Mod";
    }
});

// İlk render
applyFilters
