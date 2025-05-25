document.addEventListener('DOMContentLoaded', () => {

  // TODO: Replace with actual user ID logic (from login/session/localStorage)
  const USER_ID = 1;

  const cartItemsContainer = document.querySelector('.cart-items');
  const summaryContainer = document.querySelector('.summary');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Fetch cart items from backend
  fetch(`/api/cart?userId=${USER_ID}`)
    .then(response => response.json())
    .then(cartItems => {
      cartItemsContainer.innerHTML = ''; // Clear any previous content
      let total = 0;

      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        summaryContainer.innerHTML = '';
        checkoutBtn.disabled = true;
        return;
      }

      cartItems.forEach(item => {
        const { product, quantity } = item;
        const itemTotal = product.price * quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
          <span class="product-name">${product.name}</span>
          <span class="product-qty">x${quantity}</span>
          <span class="product-price">₹${product.price.toFixed(2)}</span>
          <span class="item-total">= ₹${itemTotal.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
      });

      summaryContainer.innerHTML = `
        <div class="total-row">
          <span>Total:</span>
          <span class="total-amount">₹${total.toFixed(2)}</span>
        </div>
      `;
      checkoutBtn.disabled = false;
    })
    .catch(error => {
      cartItemsContainer.innerHTML = '<p>Failed to load cart items. Please try again.</p>';
      summaryContainer.innerHTML = '';
      checkoutBtn.disabled = true;
      console.error('Error fetching cart:', error);
    });

  const form = document.getElementById('checkoutForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission

    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!street || !city || !state || !postalCode || !country) {
      alert('Please fill in all the required fields.');
      return;
    }

    const addressData = {
      userId: USER_ID,
      street,
      city,
      state,
      postalCode,
      country
    };

    // Send address data to backend (adjust endpoint as needed)
    fetch('/api/checkout/address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to save address');
      return response.json();
    })
    .then(data => {
      alert('Address saved successfully!');
      form.reset();
      // Optionally, proceed to payment or order confirmation
    })
    .catch(error => {
      alert('There was an error saving your address. Please try again.');
      console.error('Address submission error:', error);
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('Proceeding to checkout...');
      // You can add order submission logic here, or trigger the form submission programmatically
      // form.submit(); // If you want to submit the form when clicking checkout
    });
  }
});
