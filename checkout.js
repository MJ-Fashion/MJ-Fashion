document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutResponse = document.getElementById('checkout-response');
    const whatsappBtnContainer = document.getElementById('whatsapp-btn-container');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // Simulate getting cart data (you would typically get this from localStorage or a database)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;

        // Basic form validation
        if (name && address && email) {
            // Create order summary text
            let orderSummary = `
                Name: ${name}
                Address: ${address}
                Email: ${email}
                Products: \n`;

            let totalAmount = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                orderSummary += `- ${item.name} (x${item.quantity}): $${itemTotal.toFixed(2)}\n`;
            });

            orderSummary += `Total: $${totalAmount.toFixed(2)}`;

            // Display order confirmation message
            checkoutResponse.innerHTML = `
                <p>Thank you for your order, ${name}! Your order will be shipped to ${address}.</p>
                <p>A confirmation email will be sent to ${email}.</p>
                <p>Click below to confirm your order via WhatsApp:</p>
            `;

            // Prepare the WhatsApp link with pre-filled message
            const whatsappMessage = encodeURIComponent(orderSummary);
            const whatsappPhoneNumber = '+917507420295';  // Replace with your WhatsApp phone number (e.g., '+1234567890')
            const whatsappLink = `https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`;

            // Set the WhatsApp button link
            whatsappBtn.href = whatsappLink;

            // Show the WhatsApp button
            whatsappBtnContainer.style.display = 'block';

            // Optionally, clear the cart after order confirmation (simulating order completion)
            localStorage.removeItem('cart');
        } else {
            checkoutResponse.innerHTML = `<p>Please fill out all fields.</p>`;
        }
    });
});
