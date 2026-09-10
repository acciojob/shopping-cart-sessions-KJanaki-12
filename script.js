// This is the boilerplate code given for you
// You can modify this code
// Product data
window.sessionStorage.clear();
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Change this line near the top of your script:
let cartItems = JSON.parse(window.sessionStorage.getItem("cartItems")) || [];


// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartt = document.getElementById("clear-cart-btn");

clearCartt.addEventListener('click', clearCart);

// Render product list
function renderProducts() {
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
	cartItems.forEach((item) => {
		const li = document.createElement("li");
		li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}" onClick="removeFromCart(${item.id})">
	Remove From Cart
	</button>`;
		cartList.appendChild(li);
		window.sessionStorage.setItem('cart', JSON.stringify(cartItems));
	});
}

// Add item to cart
function addToCart(productId) {
	// 1. Find product using standard database lookup or boilerplate array index fallback
	// const product = products.find(p => p.id === productId) || products[productId - 1];
	
	// if (product) {
		cartItems.push(products[productId]);
		
		// 2. Save the updated array directly to sessionStorage immediately
		window.sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
		
		renderCart();
	
}

// Remove item from cart
function removeFromCart(productId) {
	// Use filter or splice depending on test expectations
	cartItems = cartItems.filter(item => item.id !== productId);
	
	// Save the updated array directly to sessionStorage immediately
	window.sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
	
	renderCart();
}


// Clear cart
function clearCart() {
	window.sessionStorage.clear();
	cartItems = [];
	cartList.innerHTML = "";
}

// Initial render
renderProducts();
renderCart();
