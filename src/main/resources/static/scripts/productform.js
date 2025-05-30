document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".reg-form");
    const categorySelect = form.querySelector('select[name="category"]');

    // 🔁 Load category options from backend
    fetch('http://localhost:5555/api/product/categories')
        .then(response => response.json())
        .then(categories => {
            categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Failed to load categories:', error);
            categorySelect.innerHTML = '<option value="">Error loading categories</option>';
        });

    // 🚀 Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Clear previous error messages
        form.querySelectorAll(".error-message").forEach(span => span.textContent = "");

        // Gather input values
        const name = form.querySelector('input[name="name"]').value.trim();
        const description = form.querySelector('textarea[name="description"]').value.trim();
        const priceValue = form.querySelector('input[name="price"]').value;
        const stockValue = form.querySelector('input[name="stock"]').value;
        const imageInput = form.querySelector('input[name="image"]');
        const imageFile = imageInput ? imageInput.files[0] : null;
        const category = categorySelect.value.trim();

        let hasError = false;

        // Validate fields
        if (!name) {
            form.querySelector('input[name="name"]').nextElementSibling.textContent = "Product name is required";
            hasError = true;
        }
        if (!description) {
            form.querySelector('textarea[name="description"]').nextElementSibling.textContent = "Description is required";
            hasError = true;
        }

        const price = parseFloat(priceValue);
        if (!priceValue || isNaN(price) || price < 0) {
            form.querySelector('input[name="price"]').nextElementSibling.textContent = "Valid price is required";
            hasError = true;
        }

        const stock = parseInt(stockValue);
        if (!stockValue || isNaN(stock) || stock < 0) {
            form.querySelector('input[name="stock"]').nextElementSibling.textContent = "Valid stock quantity is required";
            hasError = true;
        }

        if (!category) {
            categorySelect.nextElementSibling.textContent = "Please select a category";
            hasError = true;
        }

        if (!imageFile) {
            form.querySelector('input[name="image"]').nextElementSibling.textContent = "Product image is required";
            hasError = true;
        }

        if (hasError) {
            toastr.error("Please fix the errors in the form.");
            return;
        }

        try {
            let response;
            if (imageFile) {
                // Submit as multipart/form-data
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("stock", stock);
                formData.append("category", category);
                formData.append("image", imageFile);

                response = await fetch("http://localhost:5555/api/product/with-image", {
                    method: "POST",
                    body: formData,
                });
            } else {
                // Submit as JSON (optional logic in case image isn't required)
                const productData = { name, description, price, stock, category };
                response = await fetch("http://localhost:5555/api/product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productData)
                });
            }

            if (response.ok) {
                toastr.success("🎉 Product added successfully!");
                form.reset();
                setTimeout(() => {
                    window.location.href = "productpage.html"; // change this if needed
                }, 1500);
            } else {
                const errorText = await response.text();
                toastr.error("❌ Failed to add product: " + errorText);
            }
        } catch (err) {
            toastr.error("⚠️ Server error. Please try again.");
            console.error("Error adding product:", err);
        }
    });
});
