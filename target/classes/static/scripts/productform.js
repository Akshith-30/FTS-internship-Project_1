document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.reg-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const description = form.elements['description'].value.trim();
    const price = parseFloat(form.elements['price'].value);
    const stock = parseInt(form.elements['stock'].value);

    const product = { name, description, price, stock };

    try {
      const res = await fetch('http://localhost:5555/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (res.ok) {
        toastr.success('Product added successfully!');
        setTimeout(() => {
          window.location.href = 'productmanagement.html';
        }, 1500);
      } else {
        const errorData = await res.json();
        toastr.error(errorData.message || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      toastr.error('Server error. Try again later.');
    }
  });
});
