// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Initialize cart from sessionStorage if it exists, otherwise empty array
let cartItems = JSON.parse(window.sessionStorage.getItem("cartItems")) || [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartt = document.getElementById("clear-cart-btn");

clearCartt.addEventListener('click', clearCart);

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear list before rendering to avoid duplicates
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
	<button class="add-to-cart-btn" data-id="${product.id}" onClick="addToCart(${product.id})">
	Add to Cart
	</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	cartList.innerHTML = "";
	
	// Save the entire array cleanly into sessionStorage
	window.sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

	cartItems.forEach((item) => {
		const li = document.createElement("li");
		li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}" onClick="removeFromCart(${item.id})">
	Remove From Cart
	</button>`;
		cartList.appendChild(li);
	});
}

// Add item to cart
function addToCart(productId) {
	// Robust search by ID instead of assuming array position
	const product = products.find(p => p.id === productId);
	if (product) {
		cartItems.push(product);
		renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	// Removes only the first matching item found, handling duplicate items cleanly
	const index = cartItems.findIndex(item => item.id === productId);
	if (index > -1) {
		cartItems.splice(index, 1);
	}
	renderCart();
}

// Clear cart
function clearCart() {
	window.sessionStorage.clear();
	cartItems = [];
	renderCart(); // Let renderCart handle wiping the UI and updating storage
}

// Initial render
renderProducts();
renderCart();
