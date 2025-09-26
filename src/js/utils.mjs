export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  if (!Array.isArray(list) || list.length === 0) return;

  const html = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, html);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    //callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const resp = await fetch(path);

    if (!resp.ok) {
      throw new Error(`Error status:${resp.status}`);
    }

    const html = await resp.text();

    return html;
  } catch (error) {
    console.log(error);
  }

  return "";
}

export async function loadHeaderFooter() {
  const headerHtml = await loadTemplate("../partials/header.html");
  const footerHtml = await loadTemplate("../partials/footer.html");

  const headerElem = document.querySelector("#header");
  const footerElem = document.querySelector("#footer");

  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerElem);
}

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartCountElem.textContent = cartItems.length;
}

// ------------------- New function -------------------
export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");

  // Create container for alert
  const alert = document.createElement("div");
  alert.classList.add("alert"); // Make sure to style .alert in your CSS

  // Set alert content: message + close button
  alert.innerHTML = `
    <span class="alert-message">${message}</span>
    <button type="button" class="alert-close">&times;</button>
  `;

  // Close alert when clicking the X button
  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-close")) {
      main.removeChild(this);
    }
  });

  // Add alert to the top of main
  main.prepend(alert);

  // Scroll to top if needed
  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
