// login.js

function login_page(event) {
    event.preventDefault(); // Prevent form reload

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    // Get users from localStorage (stored as string)
    const usersJSON = localStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store logged-in user as a string
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect to catalog
        window.location.href = "catalog.html";
    } else {
        // Check if the user exists but password is wrong
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert("Incorrect password! Please try again.");
        } else {
            alert("User does not exist! Please register first.");
        }
    }
}

// Attach listener to the login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", login_page);
}
