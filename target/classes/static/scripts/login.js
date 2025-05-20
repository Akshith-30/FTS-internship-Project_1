document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login-btn');
    const inputFields = document.querySelectorAll('.input-box input');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();

        const username = inputFields[0].value.trim();
        const password = inputFields[1].value.trim();

        let errors = [];

        if (username === '') {
            errors.push("Please enter your username.");
        }

        if (password === '') {
            errors.push("Please enter your password.");
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            console.log("Login successful with:");
            console.log("Username:", username);
            console.log("Password:", password);
            alert("Login submitted successfully.");
        }
    });
});
