import { addToCart, initCart } from "./cart-logic.js";

initCart();

const cartBtn = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const buyBtns = document.querySelectorAll('.buy');
const buyModal = document.querySelector('#buy-modal');


cartBtn.addEventListener("click", () => {
    cart.classList.toggle("closed");
})

// window.addEventListener('click', e => {
//     if (!cart.contains(e.target) && !cart.classList.contains('closed')) {
//         cart.classList.add('closed');
//     }
// })