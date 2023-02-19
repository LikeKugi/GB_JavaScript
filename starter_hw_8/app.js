"use strict";

let fitlerPopup = document.querySelector(".filterPopup");
let fitlerLabel = document.querySelector(".filterLabel");
let filterIcon = document.querySelector(".filterIcon");

fitlerLabel.addEventListener("click", function () {
  fitlerPopup.classList.toggle("hidden");
  fitlerLabel.classList.toggle("filterLabelPink");
  filterIcon.classList.toggle("filterIconPink");

  if (filterIcon.getAttribute("src") === "images/filter.svg") {
    filterIcon.setAttribute("src", "images/filterHover.svg");
  } else {
    filterIcon.setAttribute("src", "images/filter.svg");
  }
});

let filterHeaders = document.querySelectorAll(".filterCategoryHeader");
filterHeaders.forEach(function (header) {
  header.addEventListener("click", function (event) {
    event.target.nextElementSibling.classList.toggle("hidden");
  });
});

let filterSizes = document.querySelector(".filterSizes");
let filterSizeWrap = document.querySelector(".filterSizeWrap");
filterSizeWrap.addEventListener("click", function () {
  filterSizes.classList.toggle("hidden");
});

// -----------------------------------------------------------

class Supply {
  constructor(name, ID, price) {
    this.name = name;
    this.ID = ID;
    this.price = price;
  }
}

class Cart {
  constructor(elem) {
    this._elem = document.querySelector(elem);
    this._cart = {};
  }
  check(id) {
    return Object.keys(this._cart).includes(id);
  }
  push(val, qty) {
    let id = val.ID;
    this._cart[id] = {
      ...val,
      quantity: qty,
    };
  }
  change(id, qty = 1) {
    this._cart[id].quantity += qty;
    if (this._cart[id].quantity === 0) {
      delete this._cart[id];
    }
  }
  toRow() {
    let out = "";
    for (let id in this._cart) {
      const el = this._cart[id];
      out += `<tr>
      <td class="titem">${el.name}</td>
      <td class="titem">${+el.quantity}</td>
      <td class="titem">\$${el.price}</td>
      <td class="titem">\$${el.quantity * el.price}</td>
      </tr>`;
    }
    this._elem.querySelector("tbody").innerHTML = out;
    return out;
  }
  get totalPrice() {
    let total = 0;
    for (let id in this._cart) {
      const el = this._cart[id];
      total += el.quantity * el.price;
    }
    this._elem.querySelector("#total").textContent = total;
    return total;
  }

  get quantity() {
    let total = 0;
    for (let id in this._cart) {
      const el = this._cart[id];
      total += el.quantity;
    }
    return total;
  }
}

const supplies = new Cart("#cartBox");
const featuredItems = document.querySelector(".featuredItems");
const cartQty = document.querySelector("#cartQty");
const cartIconEl = document.querySelector(".cartIconWrap");
const boxTemplate = document.querySelector("#cartBox");
const wrapper = document.querySelector(".cartItems");

featuredItems.addEventListener("click", (event) => {
  if (!event.target.classList.contains("featuredBtnAdd")) {
    return;
  }
  const item = event.target.closest(".featuredItem");
  const supplyID = item.dataset.id;
  const price = +item
    .querySelector(".featuredPrice")
    .textContent.trim()
    .replace(/\$/, "");
  const name = item.querySelector(".featuredName").textContent.trim();

  console.log(supplyID);

  if (supplies.check(supplyID)) {
    supplies.change(supplyID);
  } else {
    const item = new Supply(name, supplyID, price);
    supplies.push(item, 1);
  }

  supplies.toRow();
  supplies.totalPrice;
  countSupplies(supplies.quantity);
});

function countSupplies(qty) {
  cartQty.style.visibility = qty ? "visible" : "hidden";
  cartQty.textContent = qty;
}

cartIconEl.addEventListener("click", () => {
  wrapper.classList.toggle("none");
});
