import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./main.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

/*||| Begin Jay J. 09/19/2025 Duplicate Cart Item checking |||*/
// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(".cart-count");
});

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listEl = document.querySelector(".product-list");

  if (!cartItems.length) {
    listEl.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  listEl.innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

function cartItemTemplate(item) {
  const p = item.product; // shorthand
  const qty = item.quantity || 1;
  const colorName = p.Colors?.[0]?.ColorName ?? "";
  const unitPrice = Number(p.FinalPrice) || 0;
  const lineTotal = (unitPrice * qty).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${p.Image}" alt="${p.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${p.Name}</h2></a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${qty}</p>
    <p class="cart-card__price">$${unitPrice.toFixed(2)} each</p>
    <p class="cart-card__line-total"><strong>Line total: $${lineTotal}</strong></p>
    <button class="remove-button" data-id="${p.Id}">X</button>
  </li>`;
}

// Cart total sums quantity * price
function cartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalElement = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.product?.FinalPrice) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    totalElement.style.display = "block";
  } else {
    totalElement.style.display = "none";
  }
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  // remove entries whose product.Id matches
  cartItems = cartItems.filter((item) => item.product?.Id !== id);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  updateCartCount(".cart-count");
  renderCartContents();
  cartTotal();
}

// initial render
renderCartContents();
cartTotal();
/*||| End Jay J. 09/19/2025 Duplicate Cart Item checking |||*/