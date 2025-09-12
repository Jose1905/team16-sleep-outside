import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductList(
  dataSource.category,
  dataSource,
  document.querySelector(".product-list"),
);
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
