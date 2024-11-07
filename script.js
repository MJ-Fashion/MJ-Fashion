document.addEventListener('DOMContentLoaded', function () {
    // Get clothing items from localStorage or use default items
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

    // Function to display all clothing items on the page
    function displayClothingItems() {
        const clothingContainer = document.getElementById('clothing-items');
        clothingContainer.innerHTML = '';  // Clear the existing items
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

    // Function to handle admin login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic login validation
        if (username === 'admin' && password === 'admin123') {
            document.getElementById('admin-login').style.display = 'none';
            document.getElementById('admin-dashboard').style.display = 'block';
            displayAdminForm();  // Display the admin form for all items
        } else {
            alert('Invalid credentials');
        }
    });

    // Admin logout functionality
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function () {
        document.getElementById('admin-login').style.display = 'block';
        document.getElementById('admin-dashboard').style.display = 'none';
    });

    // Function to display the editable form for each item
    function displayAdminForm() {
        const updateForm = document.getElementById('update-form');
        updateForm.innerHTML = '';  // Clear any existing form

        clothingItems.forEach((item, index) => {
            const formDiv = document.createElement('div');
            formDiv.classList.add('form-item');
            formDiv.innerHTML = `
                <h3>Edit ${item.name}</h3>
                <label for="item-name-${index}">Item Name</label>
                <input type="text" id="item-name-${index}" value="${item.name}">
                <label for="item-price-${index}">Price (MRP)</label>
                <input type="text" id="item-price-${index}" value="${item.price}">
                <label for="item-image-${index}">Upload Image</label>
                <input type="file" id="item-image-${index}" accept="image/*">
                <button type="button" onclick="updateItem(${index})">Update Item</button>
                <button type="button" onclick="removeImage(${index})">Remove Image</button>
                <hr>
            `;
            updateForm.appendChild(formDiv);
        });
    }

    // Function to update an item
    window.updateItem = function (index) {
        const name = document.getElementById(`item-name-${index}`).value;
        const price = parseFloat(document.getElementById(`item-price-${index}`).value);
        const imageInput = document.getElementById(`item-image-${index}`);
        let imageURL = clothingItems[index].image;  // Keep existing image if no new image is selected

        // Handle image upload
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageURL = e.target.result;  // Base64 encoded image
                updateClothingItem(index, name, price, imageURL);
            };
            reader.readAsDataURL(imageInput.files[0]);  // Trigger the read process for the file
        } else {
            // No new image uploaded, update name and price only
            updateClothingItem(index, name, price, imageURL);
        }
    };

    // Function to remove image for a clothing item
    window.removeImage = function (index) {
        const defaultImage = 'images/default.jpg';  // Define the default image
        updateClothingItem(index, clothingItems[index].name, clothingItems[index].price, defaultImage);
    };

    // Helper function to update an item in the array and localStorage
    function updateClothingItem(index, name, price, imageURL) {
        clothingItems[index] = { name, price, image: imageURL };  // Update the clothing item
        localStorage.setItem('clothingItems', JSON.stringify(clothingItems));  // Save changes to localStorage
        displayClothingItems();  // Refresh the clothing items on the page
        displayAdminForm();  // Refresh the admin form with updated items
    }

    // Initial display of clothing items
    displayClothingItems();
});
