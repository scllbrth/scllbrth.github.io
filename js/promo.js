import { addToCart } from "./cart-logic.js";

let dataArr = [];

const getData = async () => {
  try {
    const res = await fetch("../data/promo.json");
    const data = await res.json();
    console.log(data);

    renderData(data);
  } catch (err) {
    console.log(err);
  }
};

const renderData = (data) => {
  dataArr = data;

  const itemsContainer = document.querySelector(".products-row-items");

  dataArr.forEach((data) => {
    // console.log(data);

    if ("content" in document.createElement("template")) {
      const template = document.querySelector("#template");

      const clone = template.content.cloneNode(true);
      clone.querySelector(".item-name").textContent = data.name;
      clone.querySelector(".item-price").textContent = `NT$${data.price}`;
      clone.querySelector("img").src = `./images/${data.img}.jpg`;
      
      const btn = clone.querySelector(".buy");
      btn.dataset.id = data.img;

      btn.addEventListener('click', () => {
        addToCart(data);
      })

      itemsContainer.appendChild(clone);
    } else {
      return;
    }
  });
};

getData();
