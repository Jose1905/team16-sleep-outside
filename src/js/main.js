import ProductData from "./productData.mjs";
import ProductList from "./productList.mjs";

const productData = new ProductData("products");
const productList = new ProductList("products", productData, ".product-list");
productList.init();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartCountElem.textContent = cartItems.length;
}
