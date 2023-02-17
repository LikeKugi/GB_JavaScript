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

const supplies = {};
const featuredItems = document.querySelector(".featuredItems");
const cartQty = document.querySelector("#cartQty");

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

  if (supplies[supplyID]) {
    supplies[supplyID].quantity += 1;
  } else {
    supplies[supplyID] = {
      name,
      price,
      quantity: 1,
    };
  }

  console.log(supplies);
  countSupplies();
});

function countSupplies() {
  let sum = 0;
  let qty = 0;
  for (const id in supplies) {
    const supply = supplies[id];
    console.log(supply);
    qty += supply.quantity;
    sum += supply.price * supply.quantity;
  }
  console.log(`sum = ${sum}; qty = ${qty}`);
  cartQty.textContent = qty;
}
