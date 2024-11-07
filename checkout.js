document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutResponse = document.getElementById('checkout-response');

    // Simulate checkout process
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent form from actually submitting

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const card = document.getElementById('card').value;

        // Basic validation (make sure the form fields are filled)
        if (name && address && email && card) {
            // Show a success message
            checkoutResponse.innerHTML = `
                <p>Thank you for your purchase, ${name}! Your order will be shipped to ${address}.</p>
                <p>A confirmation email has been sent to ${email}.</p>
                <p>Your payment has been successfully processed.</p>
            `;

            // Clear the cart (remove from localStorage)
            localStorage.removeItem('cart');
            
            // Optionally, after a delay, redirect the user back to the homepage
            setTimeout(() => {
                window.location.href = "index.html";  // Redirect to homepage (or any page you want)
            }, 3000);  // 3-second delay before redirect
        } else {
            checkoutResponse.innerHTML = `<p>Please fill out all fields.</p>`;
        }
    });
});
