import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

//Retrieves the product category from the url
const category = getParam("category");
const topProducts = document.querySelector(".top-products");
topProducts.innerHTML = `Top Products : ${category}`;
if(!category){
    topProducts.innerHTML = "Select a Category";
}

//Initializes a ne ProductData
const dataSource = new ProductData();

//Query selects where everything will be displayed
const listElement = document.querySelector("#index-product-list"); //made the selector more specific so that it doesn't affect the cart ul class too! JTG.

//Creates a ProductList object using the previous variables
const productList = new ProductList(category, dataSource, listElement);

productList.init();