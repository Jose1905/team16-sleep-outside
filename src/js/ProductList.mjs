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
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <p>${product.NameWithoutBrand}</p>
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}