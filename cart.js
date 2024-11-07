document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutBtn.style.display = "none";  // Hide checkout button if the cart is empty
    } else {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;

            // Display cart items
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item-btn" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    }

    // Handle item removal
    const removeItemBtns = document.querySelectorAll('.remove-item-btn');
    removeItemBtns.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = button.getAttribute('data-name');
            removeItemFromCart(itemName);
        });
    });
});

// Function to remove an item from the cart
function removeItemFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();  // Reload the page to update cart
}
