let bagItemObjects;
onLoad();
function onLoad(){
  loadBagItemObjects ();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElement=document.querySelector('.bag-summary');
  let total_items=bagItemObjects.length;
  let total_price=0;
  let total_discount=0;
  
  bagItemObjects.forEach(bagItem => {
    total_price+=bagItem.original_price;
    total_discount+=bagItem.original_price - bagItem.current_price;
  });
  let final_payment=total_price-total_discount+99;

  bagSummaryElement.innerHTML=`  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${total_items} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${total_price}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${total_discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${final_payment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  }).filter(item => item !== undefined);  // optional safety
  console.log(bagItemObjects);
}

function displayBagItems(){
  let containerElement=document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemObjects.forEach(bagitem => {
    innerHTML += generateItemHTML(bagitem);
  });
  containerElement.innerHTML= innerHTML;
}

function removeFromBag(itemId){
  bagItems=bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  dispalyBagIcon();
  displayBagSummary();
}
function generateItemHTML(item){
      return  `  <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name"> ${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>
`;
}