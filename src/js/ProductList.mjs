import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

  /*||| BEGIN Jay Jorgensen 09/12/2025 - Discount indicator-product listing |||*/
  let priceHtml = `$${product.FinalPrice.toFixed(2)}`;

  if (product.ListPrice > product.FinalPrice) {
    const diff = (product.ListPrice - product.FinalPrice).toFixed(2);
    priceHtml += `&nbsp;&nbsp;<span style="color:red;"><i>--  $${diff} off!</i><span>`;
  }

  return `<li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">${priceHtml}</p>
      </a>
    </li>`;
  /*||| END Jay Jorgensen 09/12/2025 - Discount indicator-product listing |||*/
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      //console.log(this.list);
      //this.renderList(list);
      renderListWithTemplate(
        productCardTemplate,
        this.listElement,
        list,
        "afterbegin",
        true,
      );
    } catch (error) {
      console.log(error);
    }
  }

  /*renderList(productList) {
        const html = productList.map(productCardTemplate).join("");

        console.log(html);
        this.listElement.innerHTML = "";
        this.listElement.insertAdjacentHTML("afterbegin",html);
    }*/
}
