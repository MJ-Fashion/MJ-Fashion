document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('product-container');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const saveChangesButton = document.getElementById('save-changes');
    const editImageInput = document.getElementById('edit-image');
    const editPriceInput = document.getElementById('edit-price');

    let products = JSON.parse(localStorage.getItem('products')) || [
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+1", price: 20 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+2", price: 25 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+3", price: 30 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+4", price: 35 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+5", price: 40 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+6", price: 45 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+7", price: 50 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+8", price: 55 },
        { imageUrl: "https://via.placeholder.com/200x200?text=Cloth+9", price: 60 }
    ];

    // Function to display products
    const displayProducts = () => {
        productContainer.innerHTML = '';
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="Product Image">
                <p>Price: $<span class="price">${product.price}</span></p>
                <button data-index="${index}" class="edit-btn">Edit</button>
            `;
            productContainer.appendChild(productDiv);
        });

        // Add event listeners to edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                openEditModal(index);
            });
        });
    };

    // Open the edit modal
    const openEditModal = (index) => {
        const product = products[index];
        editImageInput.value = '';  // Clear previous value
        editPriceInput.value = product.price;
        saveChangesButton.dataset.index = index;
        editModal.style.display = 'block';
    };

    // Handle image file upload
    editImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                // Show image preview
                const imgPreview = document.createElement('img');
                imgPreview.src = base64Image;
                imgPreview.style.width = '100px';
                imgPreview.style.height = 'auto';
                document.querySelector('.modal-content').appendChild(imgPreview);
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    });

    // Close the edit modal
    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Save changes to the product
    saveChangesButton.addEventListener('click', () => {
        const index = saveChangesButton.dataset.index;
        const newImageUrl = editImageInput.files[0] ? editImageInput.files[0] : products[index].imageUrl;
        products[index].imageUrl = newImageUrl;
        products[index].price = parseFloat(editPriceInput.value);

        // Save updated products to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        editModal.style.display = 'none';
        displayProducts();
    });

    // Initial display
    displayProducts();
});
