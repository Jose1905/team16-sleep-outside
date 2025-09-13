import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./main.js";

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; //  fallback to []
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty.</li>";
    return;}
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Cart total functionality JTG
function cartTotal() {
  const cartItems = getLocalStorage("so-cart"); // gets array from localStorage
  const totalElement = document.querySelector(".cart-total");

  if (cartItems && cartItems.length > 0) {
    // add up all FinalPrice values
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // show total inside the <div class="cart-total">
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    totalElement.style.display = "block";
  } else {
    // hide the div if no items
    totalElement.style.display = "none";
  }
}

renderCartContents();
cartTotal();
