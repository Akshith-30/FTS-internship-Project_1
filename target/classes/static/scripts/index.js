document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            console.log("Login button clicked");
            window.location.href = "login.html";
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Register button clicked");
            window.location.href = "register.html";
        });
    }
});
