document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');
  const cartItemsContainer = document.querySelector('.cart-items');
  const summaryDiv = document.querySelector('.summary');

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let products = [];

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!street || !city || !state || !postalCode || !country) {
      alert('Please fill in all the required fields.');
      return;
    }

    alert('Form submitted successfully!');
    form.reset();
  });

  // Fetch product data (same logic as in products.js)
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      products = await response.json();
      renderOrderSummary();
    } catch (err) {
      console.error('Error loading products for checkout:', err);
      cartItemsContainer.innerHTML = '<p>Failed to load cart items.</p>';
    }
  }

  function renderOrderSummary() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    Object.entries(cart).forEach(([productId, qty]) => {
      const product = products.find(p => String(p.id) === productId);
      if (!product) return;

      const itemTotal = product.price * qty;
      subtotal += itemTotal;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.innerHTML = `
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)} x ${qty} = $${itemTotal.toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    const shipping = subtotal > 0 ? 15 : 0;
    const totalCost = subtotal + shipping;

    summaryDiv.innerHTML = `
      <p>Total: $${subtotal.toFixed(2)}</p>
      <p>Shipping: $${shipping.toFixed(2)}</p>
      <p><strong>Total Cost: $${totalCost.toFixed(2)}</strong></p>
    `;
  }

  fetchProducts();

  // Button event to go back to store
  document.querySelector('.store-btn').addEventListener('click', () => {
    window.location.href = 'products.html';
  });
});
