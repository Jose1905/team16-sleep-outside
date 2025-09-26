import { loadHeaderFooter, getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = "so-cart";
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(this.key) || [];
    this.itemTotal = 0;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices(); // initialize service
  }

  init() {
    this.calculateItemSummary();
    this.calculateOrderTotal();
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

  calculateOrderTotal() {
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

  // --- Checkout with user-friendly alerts ---
  async checkout() {
    try {
      const payload = {
        items: this.list,
        subtotal: this.itemTotal,
        tax: this.tax,
        shipping: this.shipping,
        total: this.orderTotal,
        orderDate: new Date().toISOString(),
      };

      const response = await this.services.checkout(payload);

      // Success: clear cart and redirect
      localStorage.removeItem(this.key);
      window.location.href = "/checkout/success.html";
    } catch (err) {
      // Display error with alertMessage utility
      console.error("Checkout error:", err);

      const errorMessage =
        err.message && typeof err.message === "object"
          ? JSON.stringify(err.message)
          : err.message || "Unknown error occurred";

      alertMessage(
        `Sorry, something went wrong with your order: ${errorMessage}`
      );
    }
  }
}
