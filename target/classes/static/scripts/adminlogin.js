document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const adminId = document.getElementById('adminid').value.trim();
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminId, password })
        });

        if (response.ok) {
            window.location.href = 'adminfeatures.html';
        } else {
            alert('Invalid Admin ID or Password');
            document.getElementById('password').value = '';
        }
    } catch (error) {
        alert('Error connecting to server.');
        console.error(error);
    }
});
