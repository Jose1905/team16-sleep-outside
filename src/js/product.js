import ProductData from "./ProductData.mjs";
import { updateCartCount } from "./main.js";
import { getParam, qs } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

const dataSource = new ProductData("tents");
const productId = getParam("product");

console.log(dataSource.findProductById(productId));
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
