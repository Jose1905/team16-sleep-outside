// BreadCrumb functionality by Fernando Costa 09/20/2025

// Getting current category by URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
if (category) {
  localStorage.setItem("category", category);
}
const id = params.get("product");

// Getting <ol> that holds the breadcrumb feature
const breadcrumb = document.querySelector(".breadcrumb");

//Adds breadcrumb
function breadCrumber(cat) {
  //Interval so it gets the .product-card tags after they are rendered assynchronously
  const interval = setInterval(() => {
    const cards = document.querySelectorAll(".product-card");
    if (cards.length > 0) {
      //Creates Breadcrumb and adds it dynamically
      const li = document.createElement("li");
      if (cat) {
        li.innerHTML = `${cat} -> ${cards.length} items`;
        breadcrumb.appendChild(li);
      } else {
        li.innerHTML = "";
      }
      clearInterval(interval);
    }
  }, 200);
}

// Gets saved category to display it in the products page dynamically
function getId() {
  let temporary = localStorage.getItem("category");
  const li = document.createElement("li");
  li.innerHTML = temporary;
  breadcrumb.appendChild(li);
}

breadCrumber();
if (id) {
  getId();
}
