document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const cartContainer = document.getElementById('cart-container');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsDiv = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let products = [];

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    cartCount.textContent = totalItems;
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart();
    updateCartCount();
    renderCartItems();
    openCart();  // Open sidebar on add
  }

  function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    updateCartCount();
    renderCartItems();
  }

  function changeQty(productId, delta) {
    if (!cart[productId]) return;
    cart[productId] += delta;
    if (cart[productId] <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartCount();
      renderCartItems();
    }
  }

  function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.description}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      `;

      productList.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  function renderCartItems() {
    cartItemsDiv.innerHTML = '';
    if (Object.keys(cart).length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    Object.entries(cart).forEach(([productId, qty]) => {
      const product = products.find(p => p.id == productId);
      if (!product) return;

      const item = document.createElement('div');
      item.className = 'cart-item';

      item.innerHTML = `
        <div>
          <div class="cart-item-name">${product.name}</div>
          <div>$${product.price.toFixed(2)} x ${qty} = $${(product.price * qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-decrease" data-id="${productId}">-</button>
          <span>${qty}</span>
          <button class="qty-increase" data-id="${productId}">+</button>
        </div>
      `;

      cartItemsDiv.appendChild(item);
    });

    document.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');
        changeQty(id, 1);
      });
    });

    document.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');
        changeQty(id, -1);
      });
    });
  }

  // CART SIDEBAR TOGGLE
  function openCart() {
    cartSidebar.classList.add('cart-sidebar-open');
    cartSidebar.classList.remove('cart-sidebar-closed');
  }

  function closeCart() {
    cartSidebar.classList.remove('cart-sidebar-open');
    cartSidebar.classList.add('cart-sidebar-closed');
  }

  cartContainer.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Proceeding to checkout...');
    // Add your checkout logic here
  });

  // Fetch products dynamically
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      products = await response.json();
      renderProducts();
      renderCartItems();
      updateCartCount();
    } catch (error) {
      console.error('Error fetching products:', error);
      productList.innerHTML = '<p>Failed to load products.</p>';
    }
  }

  fetchProducts();
});
