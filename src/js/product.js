import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./main.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

const category = getParam("category");

const dataSource = new ProductData(category);

const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);

productDetails.init();

// Removed this handler since the class already handles that. JTG
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   productDetails.addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);