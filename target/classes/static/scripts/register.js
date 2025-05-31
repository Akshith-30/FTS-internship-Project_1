document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous errors (if you have any inline error messages)
    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((el) => (el.textContent = ""));

    // Get form values
    const fullName = form.querySelector("input[name='fullName']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const password = form.querySelector("input[name='password']").value.trim();
    const address = form.querySelector("input[name='address']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();
    const dob = form.querySelector("input[name='dob']").value; // Expecting YYYY-MM-DD
    const gender = form.querySelector("select[name='gender']").value;
    const state = form.querySelector("select[name='state']").value;

    let hasError = false;

    // Validation
    if (!fullName) {
      alert("Full Name is required.");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert("Email is required.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      alert("Enter a valid email address.");
      hasError = true;
    }

    // Password validation: min 8 chars, uppercase, digit, special char
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      alert("Password is required.");
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."
      );
      hasError = true;
    }

    if (!address) {
      alert("Address is required.");
      hasError = true;
    }

    if (!phone) {
      alert("Phone number is required.");
      hasError = true;
    } else {
      const phoneRegex = /^\d{7,15}$/; // simple numeric phone validation (7-15 digits)
      if (!phoneRegex.test(phone)) {
        alert("Enter a valid phone number (7-15 digits).");
        hasError = true;
      }
    }

    if (!dob) {
      alert("Date of birth is required.");
      hasError = true;
    }

    if (!gender) {
      alert("Gender is required.");
      hasError = true;
    }

    if (!state) {
      alert("State is required.");
      hasError = true;
    }

    if (hasError) return;

    // Prepare data object to send
    const data = {
      fullName,
      email,
      password,
      address,
      phone,
      dob,
      gender,
      state,
    };

    try {
      const response = await fetch("http://localhost:5555/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Registration successful!");
        form.reset();
        // Redirect to login or products page after successful registration
        window.location.href = "login.html";
      } else {
        // Try to parse error response
        let errorMessage = "Unknown error occurred.";
        try {
          const errorData = await response.json();
          // Your backend sends a plain string currently — adjust accordingly if changed
          errorMessage = errorData.message || errorData || errorMessage;
        } catch {
          // If response is not JSON
          const text = await response.text();
          if (text) errorMessage = text;
        }
        alert("Registration failed: " + errorMessage);
      }
    } catch (error) {
      alert("Error submitting registration: " + error.message);
    }
  });
});
