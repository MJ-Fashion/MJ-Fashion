// Predefined admin password
const adminPassword = 'admin123';

// Retrieve clothing items from localStorage
let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [];

// Function to display all clothing items
function displayClothingItems() {
    const clothingContainer = document.getElementById('clothing-items');
    clothingContainer.innerHTML = '';  // Clear current items

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

// Admin Login Logic
document.getElementById('login-button').addEventListener('click', function() {
    const password = document.getElementById('admin-password').value;
    
    if (password === adminPassword) {
        // Password is correct, show the add item form
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('add-item-form').style.display = 'block';
    } else {
        alert('Incorrect password!');
    }
});

// Handle adding new clothing item
document.getElementById('add-item')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const imageInput = document.getElementById('item-image');
    let imageURL = 'images/default.jpg';  // Default image if no image selected

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageURL = e.target.result;  // Use the uploaded image
            addItemToStorage(name, price, imageURL);
        };
        reader.readAsDataURL(imageInput.files[0]);  // Read image as base64
    } else {
        addItemToStorage(name, price, imageURL);  // Use default image if no file is selected
    }
});

// Function to add item to localStorage and update the display
function addItemToStorage(name, price, image) {
    const newItem = { name, price, image };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems));
    displayClothingItems();  // Update the clothing display on the main page
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-image').value = '';
}

// Display clothing items on the public page (index.html)
if (document.getElementById('clothing-items')) {
    displayClothingItems();
}

// Ensure the admin panel is not visible until logged in
if (document.getElementById('add-item-form')) {
    displayClothingItems();
}
