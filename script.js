document.addEventListener('DOMContentLoaded', function () {
    // Add item to cart
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function () {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addItemToCart(productName, productPrice);
        });
    });

    // Update cart icon count on page load
    updateCartCount();

    // Handle Contact Form submission (simulated)
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent actual form submission
        formResponse.innerHTML = `<p>Thank you for your message! We will get back to you soon.</p>`;
        contactForm.reset();
    });
});

// Function to add items to cart in localStorage
function addItemToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex === -1) {
        // Item not in cart, add it
        cart.push({ name, price, quantity: 1 });
    } else {
        // Item exists, update quantity
        cart[itemIndex].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
    });

    document.getElementById('cart-count').textContent = totalItems;
}
