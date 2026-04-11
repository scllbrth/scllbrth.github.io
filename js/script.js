const cartBtn = document.querySelector("#cart");
const cart = document.querySelector(".cart");
const buyBtn = document.querySelector('.buy');
const buyModal = document.querySelector('#buy-modal');

// const addToCart = (id) => {
    
    
// }




cartBtn.addEventListener("click", () => {
    cart.classList.toggle("closed");
})

// buyBtn.addEventListener('click', (e) => {
//     // buyModal.classList.toggle('show');

//     // e.preventDefault();

//     const id = this.closest('.products-row-item').id;

//     console.log(id);
//     // addToCart(id);
// });