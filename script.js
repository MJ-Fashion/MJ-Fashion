document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");
    const adminSection = document.getElementById("admin-section");
    const loginButton = document.getElementById("login-btn");
    const adminPasswordInput = document.getElementById("admin-password");
    const editModal = document.getElementById("edit-modal");
    const closeModal = document.getElementById("close-modal");
    const saveChangesButton = document.getElementById("save-changes");
    const editImageInput = document.getElementById("edit-image");
    const editPriceInput = document.getElementById("edit-price");

    let products = JSON.parse(localStorage.getItem("products")) || [
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+1", price: 20 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+2", price: 25 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+3", price: 30 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+4", price: 35 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+5", price: 40 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+6", price: 45 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+7", price: 50 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+8", price: 55 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+9", price: 60 },
        { imageUrl: "https://via.placeholder.com/200?text=Cloth+10", price: 65 }
    ];

    let isAdmin = false;

    // Admin login
    loginButton.addEventListener("click", () => {
        const password = adminPasswordInput.value;
        if (password === "admin123") {
            isAdmin = true;
            localStorage.setItem("isAdmin", "true");
            adminSection.style.display = "none"; // Hide admin section after login
            displayProducts(); // Display products
        } else {
            alert("Incorrect password!");
        }
    });

    // Display products
    function displayProducts() {
        productContainer.innerHTML = "";
        products.forEach((product, index) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.imageUrl}" alt="Product Image">
                <p>Price: $<span class="price">${product.price}</span></p>
            `;

            // Show edit button for admin only
            if (isAdmin) {
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.dataset.index = index;
                productDiv.appendChild(editButton);

                editButton.addEventListener("click", () => openEditModal(index));
            }

            productContainer.appendChild(productDiv);
        });
    }

    // Open the edit modal to edit product details
    function openEditModal(index) {
        const product = products[index];
        editImageInput.value = "";
        editPriceInput.value = product.price;
        saveChangesButton.dataset.index = index;
        editModal.style.display = "block";
    }

    // Save the changes to the product
    saveChangesButton.addEventListener("click", () => {
        const index = saveChangesButton.dataset.index;
        const newPrice = parseFloat(editPriceInput.value);
        const newImage = editImageInput.files[0];

        if (newImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                products[index].imageUrl = reader.result;
                products[index].price = newPrice;
                localStorage.setItem("products", JSON.stringify(products));
                displayProducts();
                editModal.style.display = "none";
            };
            reader.readAsDataURL(newImage);
        } else {
            // If no new image is uploaded, only update the price
            products[index].price = newPrice;
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
            editModal.style.display = "none";
        }
    });

    // Close the modal without saving
    closeModal.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    // Check if the user is already admin
    if (localStorage.getItem("isAdmin") === "true") {
        isAdmin = true;
        adminSection.style.display = "none";
        displayProducts();
    } else {
        adminSection.style.display = "block";
    }

    // Initial display of products
    displayProducts();
});
