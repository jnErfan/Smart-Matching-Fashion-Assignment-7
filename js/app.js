// Set Api Url 
const loadProducts = () => {
  const searchInput = document.getElementById('input-field');
  console.log(searchInput.value);
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

  //Clear Input
  searchInput.value = '';
};
loadProducts();

// Show All Product In UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product shadow-sm rounded-3">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">Add To Cart</button>
      <button onclick="detailsItem('${product.id}')" class="btn btn-success">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// Cart Quantity Update 
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

// Main Price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = parseFloat(getInputValue(id));
  // console.log(convertedOldPrice);
  const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.min(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.min(value.toFixed(2));
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
  updateTotal()
};

// const price = document.getElementById('price').innerText;
// const delevaryCharge = document.getElementById('delivery-charge').innerText;
// const tax = document.getElementById('total-tax').innerText;

//GrandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
updateTotal();

// Buy Now Button 
const cheackOut = () => {
  const promo = prompt('Enter Promo Code For 20% Discount (phero)')
  if (promo === 'phero') {
    confirm('You Got 20% Discount')
  }
  else if (promo === null) {
    alert('Sure You Want To Cancel')
  }
  else {
    alert('Enter Valid Promo Code');
  }
}

// Click Item Details
const detailsItem = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => detailsUI(data.id));
}

const detailsUI = details => {
  const detailsContainer = document.getElementById('detailsContainer');
  const div = document.createElement('div');
  div.innerHTML = `

`
}