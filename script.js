const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get saved cart
let cartItems = JSON.parse(
  window.sessionStorage.getItem("cart")
) || [];

// Render products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  cartItems.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${item.id})">
        Remove From Cart
      </button>
    `;

    cartList.appendChild(li);
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(
    (product) => product.id === productId
  );

  cartItems.push(product);

  window.sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

  renderCart();
}

// Remove from cart
function removeFromCart(productId) {
  cartItems = cartItems.filter(
    (item) => item.id !== productId
  );

  window.sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

  renderCart();
}

// Clear cart
function clearCart() {
  cartItems = [];

  window.sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();