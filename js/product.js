import { addToCart, flyToCart } from "./cart-logic.js";
import { openProductModal } from "./utilities.js";

let dataArr = [];

const getData = async () => {
  const pageType = document.body.dataset.pageType;

  try {
    const res = await fetch(`../data/${pageType}.json`);
    const data = await res.json();
    console.log(data);
    dataArr = data;

    renderData(data);
  } catch (err) {
    console.log(err);
  }
};

const renderData = (data) => {
  const itemsContainer = document.querySelector(".products-row-items");
  itemsContainer.innerHTML = "";

  if (data.length === 0) {
    itemsContainer.innerHTML = `<p class="no-results">查無相關商品</p>`;
    // change later
    return;
  }

  data.forEach((d) => {
    // console.log(d);

    if ("content" in document.createElement("template")) {
      const template = document.querySelector("#template");

      const clone = template.content.cloneNode(true);
      clone.querySelector(".item-name").textContent = d.name;
      clone.querySelector(".item-price").textContent = `NT$${d.price}`;
      clone.querySelector("img").src = `./images/${d.img}.jpg`;
      clone.querySelector("img").alt = `${d.name}`;

      const btn = clone.querySelector(".buy");
      btn.dataset.id = d.img;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(d, 1);
        flyToCart(e.target, d.name);
      });

      clone
        .querySelector(".products-row-item-top")
        .addEventListener("click", () => {
          openProductModal(d);
        });

      itemsContainer.appendChild(clone);
    } else {
      return;
    }
  });
};

getData();

const headers = document.querySelectorAll(".filter-header");

headers.forEach((header) => {
  header.addEventListener("click", (e) => {
    e.stopPropagation();

    const container = e.target.parentElement;
    container.classList.toggle("active");

    const icon = e.target.querySelector(".filter-icon");
    icon.textContent = container.classList.contains("active") ? "-" : "+";
  });
});

const filterProduct = () => {
  const selectedFilters = {
    hook: Array.from(
      document.querySelectorAll('.filter-check[name="hook"]:checked'),
    ).map((el) => el.value),
    yarn: Array.from(
      document.querySelectorAll('.filter-check[name="yarn"]:checked'),
    ).map((el) => el.value),
    technique: Array.from(
      document.querySelectorAll('.filter-check[name="technique"]:checked'),
    ).map((el) => el.value),
  };
  console.log(selectedFilters);

  const filtered = dataArr.filter((data) => {
    return Object.keys(selectedFilters).every((key) => {
      if (selectedFilters[key].length === 0) return true;
      return selectedFilters[key].includes(data[key]);
    });
  });

  renderData(filtered);
};

const filterCheckboxes = document.querySelectorAll(".filter-check");

filterCheckboxes.forEach((box) => {
  console.log("box");

  box.addEventListener("change", filterProduct);
});

const sideMenu = document.querySelector(".side-menu");

const filterBtn = document.querySelector(".filter-toggle");
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sideMenu.classList.add("open");
});

const filterCloseBtn = document.querySelector(".filter-close");
filterCloseBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open");
});

document.addEventListener("click", (e) => {
  if (sideMenu.classList.contains("open") && !sideMenu.contains(e.target)) {
    sideMenu.classList.remove("open");
  }
});
