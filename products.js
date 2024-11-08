document.addEventListener('DOMContentLoaded', function () {
    // Sample product data (can be fetched from an API in real use cases)
    const products = [
        {
            id: 1,
            name: 'Aviator Sunglasses',
            price: 50.00,
            image: 'image2.jpg',
            description: 'Classic aviator sunglasses for a stylish look.',
        },
        {
            id: 2,
            name: 'Round Sunglasses',
            price: 45.00,
            image: 'image2.jpg',
            description: 'Retro round sunglasses for the vintage vibe.',
        },
        {
            id: 3,
            name: 'Wayfarer Sunglasses',
            price: 55.00,
            image: 'image2.jpg',
            description: 'Iconic wayfarer sunglasses for everyday wear.',
        },
        {
            id: 4,
            name: 'Sports Sunglasses',
            price: 60.00,
            image: 'image2.jpg',
            description: 'Perfect sunglasses for outdoor sports and activities.',
        }
    ];

    // Function to render product cards
    const renderProducts = () => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear any existing content

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    };

    // Function to handle "Add to Cart" action
    const handleAddToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity if product already in cart
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
            alert(`${product.name} has been added to your cart.`);
        }
    };

    // Add event listener to "Add to Cart" buttons
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            handleAddToCart(productId);
        }
    });

    // Render the products on page load
    renderProducts();
});
