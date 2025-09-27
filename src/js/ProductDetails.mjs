import { updateCartCount } from "./main";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Product details:", this.product);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails() {
    document.querySelector("h2").textContent = this.product.Brand.Name;
    document.querySelector("h3").textContent = this.product.NameWithoutBrand;

    const productImage = document.querySelector("img.divider");
    productImage.src = this.product.Images.PrimaryLarge;
    productImage.alt = this.product.NameWithoutBrand;

    const originalPriceEl = document.querySelector(".original-price");
    const discountedPriceEl = document.querySelector(".discounted-price");
    const discountBadgeEl = document.querySelector(".discount-badge");
    // Calculate discount dynamically based on SuggestedRetailPrice and FinalPrice PVA
    const discount =
    this.product.SuggestedRetailPrice &&
    this.product.SuggestedRetailPrice > this.product.FinalPrice
      ? Math.round(
          ((this.product.SuggestedRetailPrice - this.product.FinalPrice) /
            this.product.SuggestedRetailPrice) *
            100
        )
      : 0;

    if (discount > 0) {
      // Show original price with strikethrough
      originalPriceEl.textContent = `$${this.product.SuggestedRetailPrice.toFixed(2)}`;
      originalPriceEl.classList.add("original-price-strikethrough");
    
      // Show discounted price
      discountedPriceEl.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
      discountedPriceEl.classList.add("discounted-price-highlight");
    
      // Show discount badge
      discountBadgeEl.textContent = `${discount}% OFF`;
      discountBadgeEl.classList.add("badge-discount");
    } else {
      // No discount
      originalPriceEl.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
      discountedPriceEl.textContent = "";
      discountBadgeEl.textContent = "";
    }
    

    document.querySelector(".product__color").textContent =
      this.product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = this.product.Id;
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array

    /*||| Begin Jay J. 09/19/2025 Duplicate Cart Item checking |||*/
    const exists = cartItems.find(
      (item) => item.product.Id === this.product.Id,
    );

    if (!exists) {
      //push item onto cart normally if it's not there
      cartItems.push({ product: this.product, quantity: 1 });
    } else {
      //otherwise increment the count
      exists.quantity += 1;
    }
    /*||| End Jay J. 09/19/2025 Duplicate Cart Item checking |||*/

    setLocalStorage("so-cart", cartItems);
    updateCartCount(".cart-count"); // Update cart count after adding product

    /*||| Begin Jay J. 09/26/2025 Animate Cart Icon |||*/
    console.log("got here");
    // ---- Animate the cart icon ----
    const cartEl = document.querySelector(".cart");
    const countEl = document.querySelector(".cart-count");

    // Respect reduced motion
    if (
      !window.matchMedia ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // restart animation by removing & re-adding the class
      if (cartEl) {
        cartEl.classList.remove("bump");
        // force reflow to reset the animation
        // eslint-disable-next-line no-unused-expressions
        cartEl.offsetWidth;
        cartEl.classList.add("bump");
        setTimeout(() => cartEl.classList.remove("bump"), 450);
      }
      if (countEl) {
        countEl.classList.remove("pulse");
        // eslint-disable-next-line no-unused-expressions
        countEl.offsetWidth;
        countEl.classList.add("pulse");
        setTimeout(() => countEl.classList.remove("pulse"), 450);
      }
    }
    /*||| End Jay J. 09/26/2025 Animate Cart Icon |||*/
  }
}
