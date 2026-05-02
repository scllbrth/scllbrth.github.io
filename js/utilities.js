import { addToCart, flyToCart } from "./cart-logic.js";

export function injectProductModal() {
    if (document.querySelector('#product-modal')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'product-modal';
    dialog.innerHTML = `
        <div class="modal-content">
            <button id="close-modal"><i class="bi bi-x-lg"></i></button>
            <div id="modal-body"></div>
        </div>
    `;
    document.body.appendChild(dialog);
}

export function openProductModal(product) {
  const modal = document.querySelector("#product-modal");
  const modalBody = document.querySelector("#modal-body");
  const closeBtn = document.querySelector("#close-modal");

  modalBody.innerHTML = `
        <img src="./images/${product.img}.jpg" alt="${product.name}">
        <div class="product-info">
            <div class="product-info-top">
                <h2>${product.name}</h2>
                <p class="desc">${product.desc || "本產品尚有產品資訊"}</p>
                <span>
                    <p class="price">$${product.price}</p>
                    <div class="product-modal-qty">
                        <button class="btn-sub">-</button>
                        <span class="modal-qty-text">1</span>
                        <button class="btn-add">+</button>
                    </div>
                </span>
            </div>
            <button class="buy" data-id="${product.id}">加入購物車</button>
        </div>
    `;

  modal.showModal();

  let count = 1;
  const buyCount = modalBody.querySelector(".modal-qty-text");
  const subBtn = modalBody.querySelector(".btn-sub");
  const addBtn = modalBody.querySelector(".btn-add");

  subBtn.addEventListener("click", () => {
    if (count === 1) return;

    count--;
    buyCount.textContent = count;
  });

  addBtn.addEventListener("click", () => {
    count++;
    buyCount.textContent = count;
  });

  modalBody.querySelector(".buy").addEventListener("click", (e) => {
    // e.stopPropagation();
    addToCart(product, count);
    flyToCart(e.target, product.name);
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
}
