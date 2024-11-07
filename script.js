// Sample credentials for admin login
const adminCredentials = { username: 'admin', password: 'admin123' };

// Retrieve clothing items from localStorage or initialize an empty array if not present
let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [];

// Function to display clothing items on the main page
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

// Admin login functionality
document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Login successful, display the admin panel
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        displayItemsForAdmin(); // Show items in the admin panel
    } else {
        alert('Incorrect username or password');
    }
});

// Display items in the admin panel with the option to delete them
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

// Add new item to localStorage and update the admin panel
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;

    const newItem = { name, price, image };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Store updated list in localStorage

    displayItemsForAdmin(); // Update the admin panel with the new item
    displayItems(); // Update the main page with the new item
});

// Delete item from localStorage
function deleteItem(index) {
    clothingItems.splice(index, 1); // Remove item from the array
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Update localStorage

    displayItemsForAdmin(); // Update the admin panel with the new list
    displayItems(); // Update the main page
}

// Ensure that the main page is populated with clothing items
if (document.getElementById('clothing-items')) {
    displayItems();
}

// Ensure that the admin panel is populated with clothing items if logged in
if (document.getElementById('items-container')) {
    displayItemsForAdmin();
}
