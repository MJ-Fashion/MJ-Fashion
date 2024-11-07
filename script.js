document.addEventListener('DOMContentLoaded', function () {

    // Handle the "Add to Cart" button click
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function () {
            alert('Added to Cart!');
        });
    });

    // Contact Form Submission (Basic Simulation)
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent actual form submission
        formResponse.innerHTML = `<p>Thank you for your message! We will get back to you soon.</p>`;
        contactForm.reset();
    });
});
