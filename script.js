// Sample credentials for admin login
const adminCredentials = { username: 'admin', password: 'admin123' };

// Retrieve clothing items from localStorage or initialize empty array if none exist
let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [];

// Display clothing items on the main page
function displayItems() {
    const clothingContainer = document.getElementById('clothing-items');
    clothingContainer.innerHTML = ''; // Clear existing items

    clothingItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        clothingContainer.appendChild(itemDiv);
    });
}

// Admin login logic
document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Login successful, show admin section
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        displayItemsForAdmin(); // Show existing items in admin panel
    } else {
        alert('Incorrect username or password');
    }
});

// Display existing items in the admin panel with option to delete
function displayItemsForAdmin() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ''; // Clear existing items in admin panel

    clothingItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        itemsContainer.appendChild(listItem);
    });
}

// Add item to localStorage and update the admin panel
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const imageInput = document.getElementById('item-image');
    const imageURL = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : 'images/default.jpg';

    const newItem = { name, price, image: imageURL };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Update localStorage

    displayItemsForAdmin(); // Update admin panel with new item
    displayItems(); // Update main page with new item
});

// Delete item from localStorage
function deleteItem(index) {
    clothingItems.splice(index, 1); // Remove item from array
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Update localStorage

    displayItemsForAdmin(); // Update admin panel with new list
    displayItems(); // Update main page with new list
}

// Initialize main page with clothing items
if (document.getElementById('clothing-items')) {
    displayItems();
}

// Initialize admin panel with clothing items if logged in
if (document.getElementById('items-container')) {
    displayItemsForAdmin();
}
