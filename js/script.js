const cartBtn = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const buyBtn = document.querySelector('.buy');
const buyModal = document.querySelector('#buy-modal');

// const addToCart = (id) => {
    
    
// }




cartBtn.addEventListener("click", () => {
    cart.classList.toggle("closed");
})

// window.addEventListener('click', e => {
//     if (!cart.contains(e.target) && !cart.classList.contains('closed')) {
//         cart.classList.add('closed');
//     }
// })