// load all data / API
const loadProducts = () => {
  const searchInput = document.getElementById('input-field');
  const searhText = searchInput.value;
  fetch(`https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?${searhText}`)
  .then(res => res.json())
  .then(data => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = document.getElementById('all-products');
  const allProduct = products.map((pd) => pd);
  for (const product of allProduct) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
        <img class="product-image" src=${product.image}>
      </div>
      <div >
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <small class="text-warning">Rating: ${product.rating.rate}</small>
        <p class="text-secondary"><i class="fas fa-user"></i> ${product.rating.count} total</p>
        <h2>Price: $${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button>
      </div>
      `;
    allProducts.appendChild(div); 
  }
};

// cart details
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value);
  updateTotal();
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
loadProducts();
