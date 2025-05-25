document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkoutForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission

    // Get values from the form
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const country = document.getElementById('country').value.trim();


    if (!street || !city || !state || !postalCode || !country) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Simulate submission (log the data)
    console.log('Checkout Form Submitted:');
    console.log(`Street: ${street}`);
    console.log(`City: ${city}`);
    console.log(`State: ${state}`);
    console.log(`Postal Code: ${postalCode}`);
    console.log(`Country: ${country}`);

    alert('Form submitted successfully!');
    form.reset(); // Optional: reset the form after submission
  });
});
