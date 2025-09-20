import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  //updateCartCount(".cart-count");
});

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  /*||| Begin Jay J. 09/19/2025 Duplicate Cart Item checking |||*/
  const totalQty = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  cartCountElem.textContent = totalQty;
  /*||| End Jay J. 09/19/2025 Duplicate Cart Item checking |||*/
}
