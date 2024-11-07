// Store or retrieve clothing items from localStorage
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

// Function to handle adding a new item (Admin Panel)
function handleAddItem(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const imageInput = document.getElementById('item-image');
    let imageURL = 'images/default.jpg'; // Default image if none selected

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
}

// Function to add an item to localStorage and update the page
function addItemToStorage(name, price, image) {
    const newItem = { name, price, image };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems));
    displayClothingItems(); // Update the clothing display
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-image').value = '';
}

// Event listener for adding a new item
document.getElementById('add-item').addEventListener('submit', handleAddItem);

// Event listener for the "Add More" button
document.getElementById('add-more').addEventListener('click', () => {
    const addItemForm = document.getElementById('add-item-form');
    addItemForm.style.display = 'block';  // Show the form for adding more items
});

// Display all items initially on Admin Panel page
if (document.getElementById('existing-items')) {
    const existingItemsContainer = document.getElementById('existing-items');
    clothingItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
        `;
        existingItemsContainer.appendChild(itemDiv);
    });
}

// Display clothing items on the public-facing page (index.html)
if (document.getElementById('clothing-items')) {
    displayClothingItems();
}
