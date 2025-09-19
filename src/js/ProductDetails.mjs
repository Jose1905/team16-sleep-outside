import { updateCartCount } from "./main";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }    

    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }

    renderProductDetails() {
        document.querySelector("h2").textContent = this.product.Brand.Name;
        document.querySelector("h3").textContent = this.product.NameWithoutBrand;

        const productImage = document.querySelector("img.divider");
        productImage.src = this.product.Images.PrimaryLarge;
        productImage.alt = this.product.NameWithoutBrand;

        document.querySelector(".product-card__price").textContent = this.product.FinalPrice;
        document.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        document.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;

        document.getElementById("addToCart").dataset.id = this.product.Id;
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        updateCartCount(".cart-count"); // Update cart count after adding product
    }
}