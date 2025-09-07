// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartCountElem.textContent = cartItems.length;
}
