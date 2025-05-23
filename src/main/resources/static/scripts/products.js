document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const overlay = document.getElementById('overlay');

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let products = [];
  let productsLoaded = false;

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    cartCount.textContent = totalItems;
  }

  function updateCartTotal() {
    const total = Object.entries(cart).reduce((acc, [productId, qty]) => {
      const product = products.find(p => String(p.id) === productId);
      return acc + (product ? product.price * qty : 0);
    }, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
  }

  function openCart() {
    if (!productsLoaded) {
      cartItemsDiv.innerHTML = '<p>Loading cart...</p>';
      cartTotal.textContent = '0.00';
      cartPanel.classList.add('open');
      overlay.classList.add('active');
      return;
    }
    renderCartItems();
    cartPanel.classList.add('open');
    overlay.classList.add('active');
  }

  function closeCart() {
    cartPanel.classList.remove('open');
    overlay.classList.remove('active');
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

  function renderProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
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

    if (!productsLoaded) {
      cartItemsDiv.innerHTML = '<p>Loading cart...</p>';
      cartTotal.textContent = '0.00';
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
          <div class="cart-item-price">$${product.price.toFixed(2)} x ${qty} = $${(product.price * qty).toFixed(2)}</div>
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

  // Event Listeners
  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Proceeding to checkout...');
  });

  // Add clear cart button functionality here:
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function () {
      cart = {};                  // Clear cart in memory
      localStorage.removeItem('cart');  // Clear from localStorage
      renderCartItems();          // Update the UI
      updateCartCount();          // Update count display
      updateCartTotal();          // Update total display
    });
  }

  // Fetch products dynamically
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      products = await response.json();

      console.log("Fetched products:", products);

      productsLoaded = true;
      renderProducts();
      renderCartItems();
      updateCartCount();
    } catch (error) {
      console.error('Error fetching products:', error);
      productsLoaded = false;
      productList.innerHTML = '<p>Failed to load products.</p>';
      cartItemsDiv.innerHTML = '<p>Failed to load cart.</p>';
    }
  }

  fetchProducts();
});
