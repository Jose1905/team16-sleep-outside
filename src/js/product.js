import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./main.js";

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount(".cart-count"); // Update cart count after adding product
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
