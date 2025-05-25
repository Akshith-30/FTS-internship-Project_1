document.addEventListener('DOMContentLoaded', () => {
  // Form submission handler
  document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!street || !city || !state || !postalCode || !country) {
      alert('Please fill in all the required fields.');
      return;
    }

    console.log('Checkout Form Submitted:');
    console.log(`Street: ${street}`);
    console.log(`City: ${city}`);
    console.log(`State: ${state}`);
    console.log(`Postal Code: ${postalCode}`);
    console.log(`Country: ${country}`);

    alert('Form submitted successfully!');
    this.reset();
  });

  // Go to Store button
  document.querySelector('.store-btn').addEventListener('click', () => {
    window.location.href = 'products.html';
  });

  // Load cart items from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItemsContainer = document.getElementById('checkoutCartItems');
  const itemTotalEl = document.getElementById('itemTotal');
  const totalCostEl = document.getElementById('totalCost');
  const shippingCost = 15;

  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  function renderCheckoutCart(products) {
    cartItemsContainer.innerHTML = '';
    let itemTotal = 0;

    Object.entries(cart).forEach(([productId, qty]) => {
      const product = products.find(p => String(p.id) === productId);
      if (!product) return;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.innerHTML = `
        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)} x ${qty} = $${(product.price * qty).toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(itemDiv);

      itemTotal += product.price * qty;
    });

    itemTotalEl.textContent = itemTotal.toFixed(2);
    totalCostEl.textContent = (itemTotal + shippingCost).toFixed(2);
  }

  // Initialize
  fetchProducts().then(products => {
    renderCheckoutCart(products);
  });
});
//ahhahahaahah