import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter,getParam} from "./utils.mjs";
loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  renderProductListing();
});

export function renderProductListing() {
  // Get ?category= from URL, default to "tents"
  //const params = new URLSearchParams(window.location.search);
  const category = getParam("category") || "tents";

  const dataSource = new ProductData();

  const listElement = document.querySelector("#index-product-list");
  if (!listElement) {
    console.error("Product list container not found!");
    return;
  }
  const productList = new ProductList(category, dataSource, listElement);
  
  productList.init();
}
