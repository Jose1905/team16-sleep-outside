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