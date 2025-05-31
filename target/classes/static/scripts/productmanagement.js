document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    categoryFilter: document.getElementById('categoryFilter'),
    productTableBody: document.querySelector('#productsTable tbody'),
    addProductBtn: document.getElementById('addProductBtn'),
  };

  const API_BASE_URL = 'http://localhost:5555/api/product';
  const CATEGORY_API_URL = `${API_BASE_URL}/categories`;

  async function loadCategories() {
    try {
      const res = await fetch(CATEGORY_API_URL);
      if (!res.ok) throw new Error('Failed to load categories');

      const categories = await res.json();
      elements.categoryFilter.innerHTML = ''; // Clear existing options

      // Add default "All"
      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'All';
      elements.categoryFilter.appendChild(allOption);

      // Add non-null categories
      categories.forEach(cat => {
        if (!cat) return; // Skip nulls

        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        elements.categoryFilter.appendChild(opt);
      });
    } catch (err) {
      console.error('❌ Category Load Error:', err);
      elements.categoryFilter.innerHTML += '<option disabled>Error loading categories</option>';
    }
  }

  async function loadProducts(category = 'all') {
    try {
      let url = API_BASE_URL;
      if (category !== 'all') url += `?category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load products');
      const products = await res.json();
      renderProducts(products);
    } catch (err) {
      console.error('❌ Product Load Error:', err);
      elements.productTableBody.innerHTML = `<tr><td colspan="7">Error loading products</td></tr>`;
    }
  }

  function renderProducts(products) {
    elements.productTableBody.innerHTML = '';
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td class="price-cell">${Number(product.price).toFixed(2)}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td><button class="remove-btn">Remove</button></td>
        <td><button class="change-price-btn">Change Price</button></td>
      `;

      row.querySelector('.remove-btn').addEventListener('click', async () => {
        if (confirm(`Remove "${product.name}"?`)) {
          try {
            const res = await fetch(`${API_BASE_URL}/${product.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            row.remove();
          } catch (err) {
            alert('Error deleting product');
            console.error(err);
          }
        }
      });

      row.querySelector('.change-price-btn').addEventListener('click', async () => {
        const newPrice = prompt(`New price for "${product.name}"`, product.price);
        if (newPrice && !isNaN(parseFloat(newPrice))) {
          try {
            const res = await fetch(`${API_BASE_URL}/${product.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...product, price: parseFloat(newPrice) }),
            });
            if (!res.ok) throw new Error('Failed to update price');
            row.querySelector('.price-cell').textContent = parseFloat(newPrice).toFixed(2);
          } catch (err) {
            alert('Error updating price');
            console.error(err);
          }
        } else {
          alert('Invalid price input!');
        }
      });

      elements.productTableBody.appendChild(row);
    });
  }

  // Init
  elements.addProductBtn?.addEventListener('click', () => {
    window.location.href = 'productform.html';
  });

  elements.categoryFilter?.addEventListener('change', (e) => {
    loadProducts(e.target.value);
  });

  loadCategories();
  loadProducts();
});
