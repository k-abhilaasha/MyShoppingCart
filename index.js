// ===== Get password fields =====
const passwordField = document.getElementById("password");
const rePasswordField = document.getElementById("reenterPassword");

// ===== Registration function =====
function register_page(event) {
    event.preventDefault(); // Prevent form reload

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = passwordField.value.trim();
    const rePassword = rePasswordField.value.trim();
    const number = document.getElementById('Number').value.trim();
    const age = document.getElementById('Age').value.trim();

    // ===== Validation =====
    if (!username || !email || !password || !rePassword || !number || !age) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== rePassword) {
        alert("Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (Number(age) < 13) {
        alert("You must be at least 13 years old to register.");
        return;
    }

    if (Number(number).toString().length < 10) {
        alert("Enter a valid number.");
        return;
    }

    // ===== Check if user exists =====
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);

    if(existingUser) {
        alert("User already exists! Please login.");
        window.location.href = "login.html";
        return;
    }

    // ===== Save new user =====
    const newUser = { username, email, password, number, age };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ===== Log in automatically and redirect =====
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    alert("Registration successful! Redirecting to catalog...");
    window.location.href = "catalog.html";
}

// ===== Attach event to the form =====
document.getElementById("registerForm").addEventListener("submit", register_page);
