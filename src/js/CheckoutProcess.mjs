import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    // if your storage key is always "so-cart", you can leave it hardcoded
    this.key = "so-cart"; 
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(this.key) || [];
    this.itemTotal = 0;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }

  calculateItemSummary() {
    const subtotalElement = document.querySelector(
      this.outputSelector + " #sub-total"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );

    itemNumElement.innerText = this.list.length;

    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

    subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrdertotal() {
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #total`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}
