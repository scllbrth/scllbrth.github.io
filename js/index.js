import { addToCart, flyToCart } from "./cart-logic.js";
import { openProductModal } from "./utilities.js";

const loadData = async () => {
  try {
    const [promoRes, freeRes, amiRes, bagRes] = await Promise.all([
      fetch("../data/promo.json"),
      fetch("../data/free.json"),
      fetch("../data/amigurumi.json"),
      fetch("../data/bag.json"),
    ]);

    const promoData = await promoRes.json();
    const freeData = await freeRes.json();
    const amiData = await amiRes.json();
    const bagData = await bagRes.json();

    renderData("#promo-row", promoData);
    renderData("#free-row", freeData);
    renderData("#ami-row", amiData);
    renderData("#bag-row", bagData);

    // console.log(promoData, freeData, amiData, bagData);
  } catch (err) {
    console.error(err);
  }
};

const renderData = (id, data) => {
  const container = document.querySelector(id);
  const template = document.querySelector("#template");

  data.slice(0, 4).forEach((product) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector("img").src = `./images/${product.img}.jpg`;
    clone.querySelector("img").alt = `${product.name}`;
    clone.querySelector(".item-name").textContent = product.name;
    clone.querySelector(".item-price").textContent = `NT$${product.price}`;

    const btn = clone.querySelector(".buy");
    btn.dataset.id = product.img;

    btn.addEventListener("click", e => {
      e.stopPropagation();
      addToCart(product, 1);
      flyToCart(e.target, product.name);
    });

    clone.querySelector('.products-row-item-top').addEventListener('click', () => {
        openProductModal(product);
    })

    container.appendChild(clone);
  });
};

loadData();
