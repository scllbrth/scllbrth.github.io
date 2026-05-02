import { addToCart, initCart } from "./cart-logic.js";
import { injectProductModal } from "./utilities.js";

initCart();
injectProductModal();

const cartBtn = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const navBtn = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-links");
const buyBtns = document.querySelectorAll(".buy");
const buyModal = document.querySelector("#buy-modal");
const overlay = document.querySelector(".overlay");

cartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (navMenu.classList.contains("open")) navMenu.classList.remove("open");
  cart.classList.toggle("closed");

  if (!cart.classList.contains("closed")) {
    overlay.classList.add("active");
  } else overlay.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!cart.contains(e.target) && !cart.classList.contains("closed")) {
    cart.classList.add("closed");
    overlay.classList.remove("active");
  }
});

navBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!cart.classList.contains("closed")) cart.classList.add("closed");
  navMenu.classList.toggle("open");

  if (navMenu.classList.contains("open")) {
    overlay.classList.add("active");
  } else overlay.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    overlay.classList.remove("active");
  }
});
