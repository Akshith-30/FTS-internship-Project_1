function submitForm() {
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/register-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
