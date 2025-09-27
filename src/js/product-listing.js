import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

loadHeaderFooter();

const category = getParam("category");
document.querySelector(".products h2").textContent =
  `Top Products: ${category.charAt(0).toUpperCase()}${category.slice(1)}`;

const dataSource = new ProductData();
const productList = new ProductList(
  category,
  dataSource,
  document.querySelector("#index-product-list"), //made the selector more specific so that it doesn't affect the cart ul class too! JTG.
);

productList.init();

const alert = new Alert("alerts");
alert.renderAlert();
