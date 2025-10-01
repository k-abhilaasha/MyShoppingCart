// ======= Get cart items from localStorage =======
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// ======= References =======
const cartDiv = document.getElementById('cart-items'); // Corrected id
const totalPriceEl = document.getElementById('total-price');

// ======= Display Cart Items =======
function displayCart() {
    cartDiv.innerHTML = ""; // Clear existing items
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.textContent = "Total Price: ₹0";
        return;
    }

    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input"></p>
            <button data-index="${index}" class="remove-btn">Remove</button>
            <hr>
        `;
        cartDiv.appendChild(itemDiv);
    });

    totalPriceEl.textContent = `Total Price: ₹${totalPrice}`;

    // ======= Quantity change event =======
    const qtyInputs = cartDiv.querySelectorAll(".qty-input");
    qtyInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const idx = parseInt(e.target.dataset.index);
            let newQty = parseInt(e.target.value);
            if(newQty < 1) newQty = 1;
            cartItems[idx].quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCart(); // re-render
        });
    });

    // ======= Remove item event =======
    const removeButtons = cartDiv.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.index);
            cartItems.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCart();
        });
    });
}

// ======= Initial render =======
displayCart();
