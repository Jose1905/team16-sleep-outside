import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./main.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

/*||| Begin Jay J. 09/19/2025 Quantity Controls + Cart Total |||*/

document.addEventListener("DOMContentLoaded", () => {
  // Render cart and update count **once the DOM is ready**
  renderCartContents();
  updateCartCount(".cart-count");
});

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listEl = document.querySelector(".product-list");

  if (!cartItems.length) {
    listEl.innerHTML = "<li>Your cart is empty.</li>";
    document.querySelector(".cart-total").style.display = "none";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  listEl.innerHTML = htmlItems.join("");

  // Remove button
  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      removeFromCart(e.currentTarget.dataset.id);
    });
  });

  // Quantity increase/decrease buttons PVA
  document
    .querySelectorAll(".qty-increase")
    .forEach((button) =>
      button.addEventListener("click", (e) =>
        changeQuantity(e.currentTarget.dataset.id, 1),
      ),
    );

  document
    .querySelectorAll(".qty-decrease")
    .forEach((button) =>
      button.addEventListener("click", (e) =>
        changeQuantity(e.currentTarget.dataset.id, -1),
      ),
    );

  // Quantity manual input PVA
  document.querySelectorAll(".qty-input").forEach((input) =>
    input.addEventListener("change", (e) => {
      const value = parseInt(e.currentTarget.value, 10);
      const id = e.currentTarget.dataset.id;
      if (!isNaN(value) && value > 0) setQuantity(id, value);
      else {
        e.currentTarget.value = 1;
        setQuantity(id, 1);
      }
    }),
  );

  cartTotal(); // update totals after render PVA
}

function cartItemTemplate(item) {
  const p = item.product;
  const qty = item.quantity || 1;
  const colorName = p.Colors?.[0]?.ColorName ?? "";
  const unitPrice = Number(p.FinalPrice) || 0;
  const lineTotal = (unitPrice * qty).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image"><img src="${p.Image}" alt="${p.Name}" /></a>
    <a href="#"><h2 class="card__name">${p.Name}</h2></a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">
      Qty:
      <button class="qty-decrease" data-id="${p.Id}">-</button>
      <input type="number" class="qty-input" data-id="${p.Id}" value="${qty}" min="1">
      <button class="qty-increase" data-id="${p.Id}">+</button>
    </p>
    <p class="cart-card__price">$${unitPrice.toFixed(2)} each</p>
    <p class="cart-card__line-total"><strong>Line total: $${lineTotal}</strong></p>
    <button class="remove-button" data-id="${p.Id}">X</button>
  </li>`;
}

function cartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalElement = document.querySelector(".cart-total");
  if (!totalElement) return;

  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + (Number(item.product?.FinalPrice) || 0) * (item.quantity || 1),
      0,
    );
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    totalElement.style.display = "block";
  } else totalElement.style.display = "none";
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item) => item.product?.Id !== id);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  updateCartCount(".cart-count");
  renderCartContents();
}

function changeQuantity(id, delta) {
  let cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find((i) => i.product?.Id === id);
  if (item) {
    item.quantity = Math.max(1, (item.quantity || 1) + delta);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    updateCartCount(".cart-count");
  }
}

function setQuantity(id, qty) {
  let cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems.find((i) => i.product?.Id === id);
  if (item) {
    item.quantity = qty;
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    renderCartContents();
    updateCartCount(".cart-count");
  }
}

/*||| End Jay J. 09/19/2025 Quantity Controls + Cart Total |||*/
