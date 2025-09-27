import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  //updateCartCount(".cart-count");
});

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  if (!cartCountElem) return; // nothing to update yet

  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const totalQty = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  cartCountElem.textContent = totalQty;
}
