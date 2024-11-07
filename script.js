document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('product-container');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const saveChangesButton = document.getElementById('save-changes');
    const editImageInput = document.getElementById('edit-image');
    const editPriceInput = document.getElementById('edit-price');

    const adminPassword = "admin123";  // Hardcoded password for simplicity
    let products = JSON.parse(localStorage.getItem('products')) || [];

    let isAdmin = false;

    // Check if admin is already authenticated
    if (localStorage.getItem("isAdmin") === "true") {
        isAdmin = true;
    } else {
        // Ask for admin password if not authenticated
        const password = prompt("Please enter the admin password:");
        if (password === adminPassword) {
            isAdmin = true;
            localStorage.setItem("isAdmin", "true");  // Store admin status in localStorage
        }
    }

    // Function to display products
    const displayProducts = () => {
        productContainer.innerHTML = '';
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="Product Image">
                <p>Price: $<span class="price">${product.price}</span></p>
            `;

            // Only show the "Edit" button if the user is admin
            if (isAdmin) {
                const editButton = document.createElement('button');
                editButton.textContent = "Edit";
                editButton.dataset.index = index;
                productDiv.appendChild(editButton);

                editButton.addEventListener('click', (e) => {
                    const index = e.target.dataset.index;
                    openEditModal(index);
                });
            }

            productContainer.appendChild(productDiv);
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
                // Show image preview (optional)
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

    // Initialize product data if empty (first-time setup)
    if (products.length === 0) {
        for (let i = 0; i < 10; i++) {
            products.push({
                imageUrl: "https://via.placeholder.com/200?text=Cloth+" + (i + 1),
                price: (i + 1) * 10
            });
        }
        localStorage.setItem('products', JSON.stringify(products)); // Save to localStorage
    }

    // Initial display
    displayProducts();
});
