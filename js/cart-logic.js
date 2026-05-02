let cartArr = JSON.parse(localStorage.getItem("cartArr")) || [];

export function injectCartElement() {
  if (document.querySelector(".cart")) return;

  const cartEl = document.createElement("div");
  cartEl.classList.add("cart", "closed");
  cartEl.innerHTML = `
        <div class="cart-top">
            <h2 class="cart-title">您的購物車</h2>
            <button class="clear-btn">清除</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
            <p>總計: <span class="cart-total">NT$0</span></p>
            <button class="checkout-btn">結帳</button>
        </div>
    `;

  document.querySelector("main").appendChild(cartEl);
}

export function initCart() {
  injectCartElement();

  const savedCart = JSON.parse(localStorage.getItem("cartArr")) || [];

  savedCart.forEach((product) => {
    renderCart(product);
  });

  updateTotal();

  const clearBtn = document.querySelector(".clear-btn");
  const checkoutBtn = document.querySelector(".checkout-btn");

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    clearCart();
  });
}

export function addToCart(product, count) {
  console.log(product);
  let currArr = JSON.parse(localStorage.getItem("cartArr")) || [];

  const existingProduct = currArr.find(
    (item) => item.id === product.id && item.img === product.img,
  );

  if (existingProduct) {
    existingProduct.count += count;
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    updateProductUI(existingProduct);
  } else if (
    !existingProduct &&
    document.querySelector(`.cart-item[data-id="${product.img}"]`)
  ) {
    currArr.push(product);
    product.count = 1;
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    updateProductUI(product);
  } else {
    currArr.push(product);
    console.log(product.count, count);
    product.count = count;
    console.log(product.count);    
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    renderCart(product);
  }

  console.log(currArr);
}

export function subtractItemCount(product) {
  let currArr = JSON.parse(localStorage.getItem("cartArr")) || [];

  const existingProduct =
    currArr.find(
      (item) => item.id === product.id && item.img === product.img,
    ) || -1;
  console.log(existingProduct);

  if (existingProduct === -1) {
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    updateProductUI(product);
  } else if (existingProduct.count <= 1) {
    const index = currArr.findIndex(
      (item) =>
        item.id === existingProduct.id && item.img === existingProduct.img,
    );

    currArr.splice(index, 1);
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    updateProductUI(existingProduct);
  } else {
    existingProduct.count--;
    localStorage.setItem("cartArr", JSON.stringify(currArr));
    updateProductUI(existingProduct);
  }
}

export function updateProductUI(product) {
  let currArr = JSON.parse(localStorage.getItem("cartArr")) || [];
  const productUI = document.querySelector(
    `.cart-item[data-id="${product.img}"]`,
  );

  if (
    product.count === 0 ||
    currArr.findIndex(
      (item) => item.id === product.id && item.img === product.img,
    ) === -1
  ) {
    productUI.remove();
  }
  if (!productUI && product.count !== 0) {
    renderCart(product);
    return;
  } else {
    productUI.querySelector(".cart-qty-text").textContent = product.count;
    productUI.querySelector(".cart-price").textContent =
      `NT$${product.price * product.count}`;
  }

  updateTotal();
}

export function updateTotal() {
  let currArr = JSON.parse(localStorage.getItem("cartArr")) || [];
  
  const prices = [...document.querySelectorAll(".cart-price")].map((el) =>
    Number(el.textContent.slice(3)),
  );
  console.log(prices);

  const itemCounts = currArr.map(item => item.count);
  console.log(itemCounts);  

  const totalPrice = prices.reduce((acc, currVal) => acc + currVal, 0);
  const totalCount = itemCounts.reduce((acc, currVal) => acc + currVal, 0);

  const totalUI = document.querySelector(".cart-total");
  totalUI.textContent = `NT$${totalPrice}`;

  updateCartCount(totalCount);
}

export function renderCart(item) {
  const container = document.querySelector(".cart-items");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
        <div class="cart-item" data-id="${item.img}">
            <img src="./images/${item.img}.jpg" alt="">
            <div class="cart-details">
                <p class="cart-name">${item.name}</p>
                <p class="cart-price">NT$${item.price * item.count}</p>
            </div>
            <div class="cart-qty">
                <button class="btn-add">+</button>
                <span class="cart-qty-text">${item.count}</span>
                <button class="btn-sub">-</button>
            </div>
        </div>
    `;

  const addBtn = wrapper.querySelector(".btn-add");
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  });

  const subBtn = wrapper.querySelector(".btn-sub");
  subBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    subtractItemCount(item);
  });

  container.appendChild(wrapper.firstElementChild);

  updateTotal();
}

export function flyToCart (btn, name) {
  console.log(btn);
  console.log(btn.parentElement.parentElement.querySelector(`img[alt='${name}']`));
  
  const imgToClone = btn.parentElement.parentElement.querySelector(`img[alt='${name}']`);
  console.log(imgToClone);  

  const clone = imgToClone.cloneNode();
  const rect = imgToClone.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  Object.assign(clone.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: "10%",
    height: "10%",
    transition: "all 0.5s ease-in-out",
    zIndex: "1000",
    pointerEvents: "none",
    borderRadius: "50%",
    opacity: "0.8",
  });

  document.body.appendChild(clone);

  setTimeout(() => {
    Object.assign(clone.style, {
      left: `${cartRect.left + 10}px`,
      top: `${cartRect.top + 10}px`,
      width: "10px",
      height: "10px",
      opacity: "0",
    });
  }, 10);

  clone.addEventListener('transitioned', () => {
    clone.remove();
  })
};

export function updateCartCount (amount) {
    const badge = document.querySelector('.cart-badge');

    badge.textContent = amount;

    if (amount > 0) {
        badge.classList.add('show');
        badge.classList.remove('bump');
        void badge.offsetWidth;
        badge.classList.add('bump');
    } else badge.classList.remove('show');
}

export function clearCart() {
  localStorage.removeItem("cartArr");
  document.querySelector(".cart-items").innerHTML = "";
  updateTotal();
}
