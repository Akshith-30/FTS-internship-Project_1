const API_BASE_URL = 'http://localhost:5555/api/products';
async function loadProducts(category = 'all') {
    try {
        let url = API_BASE_URL;
        if (category && category !== 'all') {
            url += `?category=${encodeURIComponent(category)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();

        const tbody = document.querySelector('#productsTable tbody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td class="price-cell">${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td><button class="remove-btn">Remove</button></td>
                <td><button class="change-price-btn">Change Price</button></td>
            `;

            // Remove functionality
            row.querySelector('.remove-btn').addEventListener('click', async () => {
                if (confirm(`Are you sure you want to remove "${product.name}"?`)) {
                    try {
                        const deleteRes = await fetch(`http://localhost:5555/api/products/${product.id}`, {
                            method: 'DELETE'
                        });

                        if (!deleteRes.ok) throw new Error('Failed to delete product');
                        row.remove();
                    } catch (err) {
                        alert('Error deleting product');
                        console.error(err);
                    }
                }
            });

            // Change price functionality
            row.querySelector('.change-price-btn').addEventListener('click', async () => {
                const newPrice = prompt(`Enter new price for "${product.name}"`, product.price);
                if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                    try {
                        const updateRes = await fetch(`http://localhost:5555/api/products/${product.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ...product,
                                price: parseFloat(newPrice)
                            })
                        });

                        if (!updateRes.ok) throw new Error('Failed to update price');
                        row.querySelector('.price-cell').textContent = parseFloat(newPrice).toFixed(2);
                    } catch (err) {
                        alert('Error updating price');
                        console.error(err);
                    }
                } else {
                    alert('Invalid price input!');
                }
            });

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.getElementById('addProductBtn').addEventListener('click', () => {
        window.location.href = 'productform.html';
    });

    // Category filter event
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        loadProducts(e.target.value);
    });
});
