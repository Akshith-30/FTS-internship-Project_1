document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.login-btn');
  const inputFields = document.querySelectorAll('.input-box input');

  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = inputFields[0].value.trim();   // clearer variable name
    const password = inputFields[1].value.trim();
    const errors = [];

    if (!email) {
      errors.push("Please enter your email.");
    }
    if (!password) {
      errors.push("Please enter your password.");
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // Prepare the login data payload
    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        // Optionally store JWT token or user info if your backend provides it:
        // localStorage.setItem('token', data.token);

        alert('Login successful! Redirecting to products page...');
        window.location.href = 'products.html';
      } else if (response.status === 401) {
        alert('Invalid email or password.');
      } else {
        alert('Login failed. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please check your connection and try again.');
    }
  });
});
