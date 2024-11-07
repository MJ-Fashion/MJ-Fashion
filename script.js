// Sample credentials
const adminCredentials = { username: 'admin', password: 'admin123' };

// Retrieve items from localStorage
let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [];

// Display all items on the main page
function displayItems() {
    const clothingContainer = document.getElementById('clothing-items');
    clothingContainer.innerHTML = '';

    clothingItems.forEach((item, index) => {
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
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        displayItemsForAdmin(); // Show items in admin panel
    } else {
        alert('Incorrect username or password');
    }
});

// Display items for the admin to edit or delete
function displayItemsForAdmin() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    clothingItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        itemsContainer.appendChild(listItem);
    });
}

// Add item to localStorage
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const imageInput = document.getElementById('item-image');
    const imageURL = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : 'images/default.jpg';

    const newItem = { name, price, image: imageURL };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems));

    displayItemsForAdmin(); // Update the list in the admin panel
    displayItems(); // Update the store page
});

// Delete item
function deleteItem(index) {
    clothingItems.splice(index, 1);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems));
    displayItemsForAdmin(); // Update the list in the admin panel
    displayItems(); // Update the store page
}

// Display items on the main page when the user visits the store
if (document.getElementById('clothing-items')) {
    displayItems();
}

// Display items in the admin panel when the user is logged in
if (document.getElementById('items-container')) {
    displayItemsForAdmin();
}
