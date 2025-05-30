const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("categoryFilter");
const API_BASE_URL = 'http://localhost:5555/api/product'; // Correct endpoint

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch products from backend, optionally by category
function fetchProducts(category = "all") {
    let url = API_BASE_URL;
    if (category !== "all") {
        url += `?category=${encodeURIComponent(category)}`;
    }
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch products");
            return response.json();
        })
        .then(fetchedProducts => {
            products = fetchedProducts;
            displayProducts(products);
        })
        .catch(error => {
            productList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
        });
}

// Display products in the grid
function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products available in this category.</p>";
        return;
    }
    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image && product.image.trim() !== '' ? product.image : 'images/default.jpg'}" alt="${product.name}" onerror="this.onerror=null;this.src='images/default.jpg';" />
            <h3>${product.name}</h3>
            <p>$${Number(product.price).toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });

    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

// Category filter event
categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    fetchProducts(selectedCategory);
});

// Initial fetch on page load
window.addEventListener("DOMContentLoaded", () => {
    fetchProducts("all");
    updateCartUI();
});

// Cart logic unchanged...
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <p>${item.name} - $${Number(item.price).toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        total += Number(item.price);
        cartItemsContainer.appendChild(itemDiv);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);
}

// Clear cart button
document.getElementById("clearCartBtn").addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartUI();
});

// Cart open/close logic
document.getElementById("cartBtn").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("cartPanel").style.right = "0";
});

document.getElementById("closeCartBtn").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("cartPanel").style.right = "-100%";
});
