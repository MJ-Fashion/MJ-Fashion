// Retrieve clothing items from localStorage or initialize an empty array if not present
let clothingItems = JSON.parse(localStorage.getItem('clothingItems')) || [];

// Function to display clothing items on the page
function displayItems() {
    const clothingContainer = document.getElementById('clothing-items');
    clothingContainer.innerHTML = ''; // Clear existing items

    clothingItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="deleteItem(${index})">Delete</button>
            <button onclick="editItem(${index})">Edit</button>
        `;
        clothingContainer.appendChild(itemDiv);
    });
}

// Function to add a new item to localStorage
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;

    const newItem = { name, price, image };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Store updated list in localStorage

    displayItems(); // Update the clothing items display
    document.getElementById('add-item-form').reset(); // Clear the form
});

// Function to delete an item from localStorage
function deleteItem(index) {
    clothingItems.splice(index, 1); // Remove item from array
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Update localStorage

    displayItems(); // Update the clothing items display
}

// Function to edit an item (populates the form with the item data)
function editItem(index) {
    const item = clothingItems[index];

    // Populate the form with the item's current data
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-image').value = item.image;

    // Change the submit button to "Update" and update the event listener for the form
    const addItemForm = document.getElementById('add-item-form');
    addItemForm.removeEventListener('submit', addNewItem); // Remove the "add" event listener

    addItemForm.addEventListener('submit', function updateItem(event) {
        event.preventDefault();

        item.name = document.getElementById('item-name').value;
        item.price = document.getElementById('item-price').value;
        item.image = document.getElementById('item-image').value;

        clothingItems[index] = item; // Update the item in the array
        localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Update localStorage

        displayItems(); // Update the clothing items display
        addItemForm.reset(); // Clear the form

        // Change the button back to "Add Item"
        addItemForm.removeEventListener('submit', updateItem); // Remove the "update" event listener
        addItemForm.addEventListener('submit', addNewItem); // Add the "add" event listener back
    });
}

// Function to handle adding a new item
function addNewItem(event) {
    event.preventDefault();

    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;

    const newItem = { name, price, image };
    clothingItems.push(newItem);
    localStorage.setItem('clothingItems', JSON.stringify(clothingItems)); // Store updated list in localStorage

    displayItems(); // Update the clothing items display
    document.getElementById('add-item-form').reset(); // Clear the form
}

// Initialize the page with existing clothing items from localStorage
if (document.getElementById('clothing-items')) {
    displayItems();
}
