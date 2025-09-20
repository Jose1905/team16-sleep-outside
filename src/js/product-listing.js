import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const productList = new ProductList(
  dataSource.category,
  dataSource,
  document.querySelector("#index-product-list"), //made the selector more specific so that it doesn't affect the cart ul class too! JTG.
);
productList.init();
