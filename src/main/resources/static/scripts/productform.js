document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".reg-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get form values
        const name = form.querySelector('input[name="name"]').value.trim();
        const description = form.querySelector('textarea[name="description"]').value.trim();
        const price = parseFloat(form.querySelector('input[name="price"]').value);
        const stock = parseInt(form.querySelector('input[name="stock"]').value);

        // Basic validation
        if (!name || !description || isNaN(price) || isNaN(stock)) {
            toastr.error("Please fill all fields correctly.");
            return;
        }

        const productData = { name, description, price, stock };

        try {
            const response = await fetch("http://localhost:5555/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                toastr.success("🎉 Product added successfully!");
                form.reset();
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
