import { loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listener to recalc totals when zip changes
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// Listen for checkout button click
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.querySelector("#checkout-form"); // grab the form
  const chk_status = myForm.checkValidity(); // run built-in validation
  myForm.reportValidity(); // show browser error messages if invalid

  if (chk_status) {
    // only run checkout if valid
    order.checkout();
  }
});
