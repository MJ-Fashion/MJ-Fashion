document.addEventListener('DOMContentLoaded', function () {
    // Get clothing items from localStorage, or set default items
    let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [
        { name: "T-Shirt", price: 20, image: 'images/default.jpg' },
        { name: "Jeans", price: 50, image: 'images/default.jpg' },
        { name: "Jacket", price: 80, image: 'images/default.jpg' },
        { name: "Sneakers", price: 60, image: 'images/default.jpg' },
        { name: "Dress", price: 100, image: 'images/default.jpg' },
        { name: "Shirt", price: 30, image: 'images/default.jpg' },
        { name: "Shorts", price: 25, image: 'images/default.jpg' },
        { name: "Hoodie", price: 75, image: 'images/default.jpg' },
        { name: "Cap", price: 15, image: 'images/default.jpg' }
    ];

    // Function to display clothing items dynamically
    function displayClothingItems() {
        const clothingContainer = document.getElementById('clothing-items');
        clothingContainer.innerHTML = '';  // Clear existing items
        clothingItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="editItem(${index})">Edit</button>
            `;
            clothingContainer.appendChild(itemDiv);
        });
    }

    // Admin Login Logic
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic login check
        if (username === 'admin' && password === 'admin123') {
            document.getElementById('admin-login').style.display = 'none';
            document.getElementById('admin-dashboard').style.display = 'block';
        } else {
            alert('Invalid credentials');
        }
    });

    // Admin Logout Logic
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function () {
        document.getElementById('admin-login').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
    });

    // Edit Clothing Item (when Edit button is clicked)
    window.editItem = function (index) {
        const item = clothingItems[index];
        document.getElementById('item-name').value = item.name;
        document.getElementById('item-price').value = item.price;
        document.getElementById('item-image').value = ''; // Clear image input field
        document.getElementById('item-image').dataset.index = index; // Save the index in data attribute
    };

    // Update Clothing Item
    window.updateItem = function () {
        const name = document.getElementById('item-name').value;
        const price = parseFloat(document.getElementById('item-price').value);
        const imageInput = document.getElementById('item-image');
        const index = imageInput.dataset.index;
        
        let imageURL = clothingItems[index].image;  // Default to existing image if no new image uploaded
        
        // Handle image upload
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageURL = e.target.result; // Base64 encoded image
                updateClothingItem(index, name, price, imageURL);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            // If no image is uploaded, only update the name and price
            updateClothingItem(index, name, price, imageURL);
        }
    };

    // Helper function to update the clothing item in the array and localStorage
    function updateClothingItem(index, name, price, imageURL) {
        clothingItems[index] = { name, price, image: imageURL };
        localStorage.setItem('clothingItems', JSON.stringify(clothingItems));
        displayClothingItems();  // Refresh the clothing items on the page
    }

    // Initial display of clothing items
    displayClothingItems();
});
