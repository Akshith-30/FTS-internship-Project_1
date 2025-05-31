document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('categoryFilter');
  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const overlay = document.getElementById('overlay');

  const API_BASE_URL = 'http://localhost:5555/api/product';
  const FALLBACK_API_URL = '/api/products';

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let products = [];
  let productsLoaded = false;

  async function fetchProducts(category = "all") {
    try {
      let url = API_BASE_URL;
      if (category !== "all") {
        url += `?category=${encodeURIComponent(category)}`;
      }

      let response;
      try {
        response = await fetch(url);
      } catch (error) {
        console.warn('Primary API failed, trying fallback:', error);
        response = await fetch(FALLBACK_API_URL);
      }

      if (!response.ok) throw new Error("Failed to fetch products");

      const fetchedProducts = await response.json();
      products = fetchedProducts;
      productsLoaded = true;

      displayProducts(products);
      renderCartItems();
      updateCartCount();
      updateCartTotal();
    } catch (error) {
      console.error('Error fetching products:', error);
      productsLoaded = false;
      if (productList) productList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
      if (cartItemsDiv) cartItemsDiv.innerHTML = '<p>Failed to load cart.</p>';
    }
  }

  function displayProducts(filteredProducts) {
    if (!productList) return;
    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>No products available in this category.</p>";
      return;
    }

    filteredProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.imagePath || product.image || 'images/default.jpg'}"
             alt="${product.name}"
             onerror="this.onerror=null;this.src='images/default.jpg';" />
        <h3>${product.name}</h3>
        <p class="description">${product.description || ''}</p>
        <div class="price">$${Number(product.price).toFixed(2)}</div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    if (cartCount) cartCount.textContent = totalItems;
  }

  function updateCartTotal() {
    const total = Object.entries(cart).reduce((acc, [productId, qty]) => {
      const product = products.find(p => String(p.id) === productId);
      return acc + (product ? product.price * qty : 0);
    }, 0);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
  }

  function addToCart(productId) {
    productId = String(productId);
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart();
    renderCartItems();
    openCart();
  }

  function removeFromCart(productId) {
    productId = String(productId);
    delete cart[productId];
    saveCart();
    renderCartItems();
  }

  function changeQty(productId, delta) {
    productId = String(productId);
    if (!cart[productId]) return;
    cart[productId] += delta;
    if (cart[productId] <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      renderCartItems();
    }
  }

  function clearCart() {
    cart = {};
    localStorage.removeItem('cart');
    saveCart();
    renderCartItems();
  }

  function openCart() {
    if (!productsLoaded) {
      if (cartItemsDiv) cartItemsDiv.innerHTML = '<p>Loading cart...</p>';
      if (cartTotal) cartTotal.textContent = '0.00';
    } else {
      renderCartItems();
    }
    if (overlay) overlay.style.display = "block";
    if (cartPanel) {
      cartPanel.style.right = "0";
      cartPanel.classList.add('open');
    }
    if (overlay) overlay.classList.add('active');
  }

  function closeCart() {
    if (overlay) overlay.style.display = "none";
    if (cartPanel) {
      cartPanel.style.right = "-100%";
      cartPanel.classList.remove('open');
    }
    if (overlay) overlay.classList.remove('active');
  }

  function renderCartItems() {
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = '';

    if (!productsLoaded) {
      cartItemsDiv.innerHTML = '<p>Loading cart...</p>';
      if (cartTotal) cartTotal.textContent = '0.00';
      return;
    }

    if (Object.keys(cart).length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      updateCartTotal();
      return;
    }

    Object.entries(cart).forEach(([productId, qty]) => {
      const product = products.find(p => String(p.id) === productId);
      if (!product) {
        console.warn('Product not found for ID:', productId);
        return;
      }

      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">$${Number(product.price).toFixed(2)} x ${qty} = $${(product.price * qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn qty-decrease" data-id="${productId}">-</button>
          <span class="quantity-value">${qty}</span>
          <button class="quantity-btn qty-increase" data-id="${productId}">+</button>
          <button class="remove-item-btn" data-id="${productId}" title="Remove item">&times;</button>
        </div>
      `;
      cartItemsDiv.appendChild(item);
    });

    document.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        changeQty(id, 1);
      });
    });

    document.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        changeQty(id, -1);
      });
    });

    document.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        removeFromCart(id);
      });
    });

    updateCartTotal();
  }

  async function populateCategoryFilter() {
    try {
      const res = await fetch('http://localhost:5555/api/product/categories');
      if (!res.ok) throw new Error("Failed to fetch categories");

      const categories = await res.json();
      const filter = document.getElementById('categoryFilter');

      filter.innerHTML = '';

      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'All';
      filter.appendChild(allOption);

      categories.forEach(cat => {
        if (!cat) return; // ✅ Skip null or empty categories

        const option = document.createElement('option');
        option.value = cat.toLowerCase();
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        filter.appendChild(option);
      });
    } catch (err) {
      console.error("Could not populate category filter:", err);
    }
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      const selectedCategory = categoryFilter.value;
      fetchProducts(selectedCategory);
    });
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (Object.keys(cart).length === 0) {
        alert('Your cart is empty.');
        return;
      }
      window.location.href = "checkout.html";
    });
  }

  populateCategoryFilter();
  fetchProducts("all");
});
