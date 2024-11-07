<?php
// Start the session to store product data
session_start();

// Default products (can be replaced with data from a database)
if (!isset($_SESSION['products'])) {
    $_SESSION['products'] = [
        ['id' => 1, 'name' => 'Stylish T-shirt', 'price' => 25.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 2, 'name' => 'Denim Jeans', 'price' => 39.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 3, 'name' => 'Casual Jacket', 'price' => 49.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 4, 'name' => 'Summer Dress', 'price' => 35.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 5, 'name' => 'Leather Boots', 'price' => 75.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 6, 'name' => 'Formal Shirt', 'price' => 45.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 7, 'name' => 'Track Pants', 'price' => 29.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 8, 'name' => 'Cardigan Sweater', 'price' => 42.99, 'image' => 'https://via.placeholder.com/200'],
        ['id' => 9, 'name' => 'Hoodie', 'price' => 39.99, 'image' => 'https://via.placeholder.com/200'],
    ];
}

// Handle product update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = $_POST['product_id'];
    $newName = $_POST['name'];
    $newPrice = $_POST['price'];
    $newImage = $_POST['image'];

    // Update the product in the session data
    foreach ($_SESSION['products'] as &$product) {
        if ($product['id'] == $productId) {
            $product['name'] = $newName;
            $product['price'] = $newPrice;
            $product['image'] = $newImage;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clothing Brand</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Clothing Brand</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="products">
            <?php foreach ($_SESSION['products'] as $product): ?>
                <div class="product">
                    <form method="POST" action="">
                        <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
                        
                        <img src="<?= $product['image'] ?>" alt="<?= $product['name'] ?>" width="200">
                        
                        <label for="name">Product Name</label>
                        <input type="text" name="name" value="<?= htmlspecialchars($product['name']) ?>" required>

                        <label for="price">Price</label>
                        <input type="number" step="0.01" name="price" value="<?= $product['price'] ?>" required>

                        <label for="image">Image URL</label>
                        <input type="text" name="image" value="<?= $product['image'] ?>" required>

                        <button type="submit">Update Product</button>
                    </form>
                </div>
            <?php endforeach; ?>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Clothing Brand. All rights reserved.</p>
    </footer>
</body>
</html>
