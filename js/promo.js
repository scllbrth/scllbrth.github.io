import { addToCart } from "./cart-logic.js";

let dataArr = [];

const getData = async () => {
  try {
    const res = await fetch("../data/MOCK_DATA.json");
    const data = await res.json();
    console.log(data);

    showData(data);
  } catch (err) {
    console.log(err);
  }
};

const showData = (data) => {
  dataArr = data;

  const items = document.querySelector(".products-row-items");

  dataArr.forEach((data) => {
    // console.log(data);

    if ("content" in document.createElement("template")) {
      const template = document.querySelector("#template");

      const clone = template.content.cloneNode(true);
      clone.querySelector(".item-name").textContent = data["name"];
      clone.querySelector(".item-price").textContent = `$${data["price"]}`;
      clone.querySelector("img").src = `./images/${data["id"]}.jpg`;
      clone.querySelector(".buy").dataset.id = data.id;

      items.appendChild(clone);
    } else {
      return;
    }
  });

  items.addEventListener("click", (e) => {
    // buyModal.classList.toggle('show');

    // e.preventDefault();
    if (e.target.classList.contains("buy")) {
      const id = e.target.dataset.id;
      console.log(id);
      addToCart(id, dataArr);
    }
  });
};

getData();
