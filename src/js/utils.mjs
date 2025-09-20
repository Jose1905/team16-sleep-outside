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
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  /*if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  if (!Array.isArray(list) || list.length === 0) return;

  const html = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, html);*/
  parentElement.innerHTML = template;

  //console.log(parentElement);

  if (callback) {
    //callback(data);
  }
}

export async function loadTemplate(
  path
) {
  try {
    const resp = await fetch(path);

    if (!resp.ok) {
      throw new Error(`Error status:${resp.status}`)
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

  //renderWithTemplate(headerHtml, headerElem, null, updateCartCount);
  //renderWithTemplate(footerHtml, footerElem, null, updateCartCount);
  renderWithTemplate(headerHtml, headerElem);
  renderWithTemplate(footerHtml, footerElem);
}

export function updateCartCount() {
  let cartCountElem = document.querySelector(".cart-count");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartCountElem.textContent = cartItems.length;
}