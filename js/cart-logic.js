let cartArr = [];

export function addToCart(id, data) {
    const product = data.find(product => product.id === Number(id));
    
    // console.log(product);
    
    if(cartArr.includes(product)) {
        product.count++;
        const productUI = document.querySelector(`.cart-item[data-id="${id}"]`);
        productUI.querySelector('.cart-qty-text').textContent = product.count;
        productUI.querySelector('.cart-price').textContent = product.price * product.count;

    } else {
        cartArr.push(product);
        product.count = 1;
        renderCart(product);
    }

    console.log(cartArr);

    
}

export function renderCart(item) {
    const cartItems = document.querySelector('.cart-items');
    const template = document.querySelector('#cart-template');

    const clone = template.content.cloneNode(true);
    clone.querySelector('.cart-item').dataset.id = item.id;
    clone.querySelector('img').src = `./images/${item.id}.jpg`;
    clone.querySelector('.cart-name').textContent = item.name;
    clone.querySelector('.cart-price').textContent = item.price;
    clone.querySelector('.cart-qty-text').textContent = item.count;

    cartItems.appendChild(clone);
    

    console.log(typeof(item.price));
    
}