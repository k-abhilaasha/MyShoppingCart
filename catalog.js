// ======= DOM ELEMENTS =======
const usernameSpan = document.getElementById("username");
const logoutBtn = document.querySelector(".header-right a[href='login.html']"); // Logout link

// ======= CHECK LOGIN =======
const userJSON = localStorage.getItem("loggedInUser");
const user = userJSON ? JSON.parse(userJSON) : null;

if (!user) {
    window.location.href = "login.html";
} else if (usernameSpan) {
    usernameSpan.textContent = `Hello, ${user.username || user.email || "User"}`;
}

// ======= LOGOUT =======
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}

// ======= ADD TO CART FUNCTION =======
function add_to_cart(id, img, name, price) {
    const cartJSON = localStorage.getItem("cart");
    let cart = cartJSON ? JSON.parse(cartJSON) : [];
    price = parseFloat(price); // Ensure price is a number

    // Check if product already in cart
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, img, name, price, quantity: 1 });
    }

    // Store cart as string
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}
