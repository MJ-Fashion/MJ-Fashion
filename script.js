// Example JavaScript for basic interactivity (e.g., adding items to cart, form validation)
// This is just a placeholder script, you can add more features as needed.

document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtns = document.querySelectorAll('.btn');
    
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function (e) {
            alert('Added to Cart!');
        });
    });
});
