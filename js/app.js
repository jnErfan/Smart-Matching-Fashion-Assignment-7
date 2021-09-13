// Loading Spinner 
const spinner = document.getElementById('spinner');

// Set Api Url And Search Button And Input.
const loadProducts = () => {
  const searchInput = document.getElementById('input-field');
  spinner.classList.remove('d-none');
  console.log(searchInput.value);
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      spinner.classList.add('d-none');
      showProducts(data)
    });

  //Clear Input Field
  searchInput.value = '';
};
// Calling Function
loadProducts();

// Show All Product In UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product shadow-sm rounded-3">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title.slice(0, 25)}</h3>
      <p>Category: ${product.category}</p>
      <h4>Price : $${product.price}</h4>
      <p>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="far fa-star text-warning"></i>
              <span class="rating">${product.rating.rate}</span>
      </p>
      <p><span class="fw-bold">${product.rating.count}</span> Person Rated</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info text-light">Add To Cart</button>
      <button onclick="detailsItem('${product.id}')" class="btn btn-outline-info px-4">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


// Cart Quantity Update 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  // Calling Main Price Update Function 
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// Connvert String To Number Price
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// Main Price Update Function 
const updatePrice = (id, value) => {
  const convertedOldPrice = parseFloat(getInputValue(id));
  const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.min(total.toFixed(2));
};

// set InnerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.min(value.toFixed(2));
};

// Update Delivery charge and total Tax
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
  // Grand Total Call 
  updateTotal()
};

//GrandTotal Balance Update 
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
updateTotal();

// Buy Now Button Handller
const cheackOut = () => {
  const promo = prompt('Enter Promo Code For 20% Discount (phero)')
  // Use Promo Code (phero) Get Discount 20% 
  if (promo.toLowerCase() == 'phero'.toLowerCase()) {
    confirm('You Got 20% Discount');
    const grandTotal = document.getElementById("total").innerText;
    const discountTotal = (80 / 100) * grandTotal;
    document.getElementById("total").innerText = discountTotal.toFixed(3);
  }
  else if (promo === null) {
    alert('Sure You Want To Cancel')
  }
  else {
    alert('Enter Valid Promo Code');
  }
}

//Single Product Details Api
const detailsItem = id => {
  spinner.classList.remove('d-none');
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      spinner.classList.add('d-none');
      detailsUI(data)
    });
}

// Product Detailse Showing In UI
const detailsUI = details => {
  const detailsContainer = document.getElementById('detailsContainer');
  detailsContainer.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="shadow-lg pt-5 bg-white text-center p-3 rounded-3">
        <img width="100px" height="100px" src="${details.image}" alt="">
        <h4 class="text-warning">${details.title}</h4>
        <h5><span class="text-info">Price: </span>$${details.price}</h5>
        <p> <small><span class="text-info fw-bold">Description:</span> <br> ${details.description.slice(0,
    100)}</small> </p>
        <h6><span class="text-info">Rate Count:</span> ${details.rating.count}</h6>
        <button onclick="locationReload()" class="btn btn-danger px-3y-2">Clear</button>
      </div>
`;
  detailsContainer.appendChild(div);
}

// Reload Web Site When Button Click
const locationReload = () => {
  location.reload();
}