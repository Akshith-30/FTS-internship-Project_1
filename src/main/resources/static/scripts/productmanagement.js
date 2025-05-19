async function loadProducts() {
    try {
        const response = await fetch('http://localhost:5555/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();

        const tbody = document.querySelector('#productsTable tbody');
        tbody.innerHTML = '';  // Clear existing sample rows

        products.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><button class="remove-btn action-btn">Remove</button></td>
                <td><button class="change-price-btn action-btn">Change Price</button></td>
            `;

            row.querySelector('.remove-btn').addEventListener('click', () => {
                alert(`Remove product "${product.name}" functionality to be implemented.`);
            });

            row.querySelector('.change-price-btn').addEventListener('click', () => {
                alert(`Change price for "${product.name}" functionality to be implemented.`);
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
});
