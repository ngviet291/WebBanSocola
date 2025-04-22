const toggleSearch = document.getElementById("toggleSearch");
const searchDropdown = document.getElementById("searchDropdown");
const searchBox = document.getElementById("searchBox");

toggleSearch.addEventListener("click", function (e) {
    e.preventDefault();
    searchDropdown.classList.toggle("d-none");
    if (!searchDropdown.classList.contains("d-none")) {
        searchBox.focus();
    }
});
document.addEventListener("click", function (e) {
    if (!searchDropdown.contains(e.target) && !toggleSearch.contains(e.target)) {
        searchDropdown.classList.add("d-none");
    }
});
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const productName = this.getAttribute('data-name');
        const productPrice = parseInt(this.getAttribute('data-price'));
        const productImage = this.getAttribute('data-image');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast(`${productName} đã được thêm vào giỏ hàng!`);
    });
});

document.querySelectorAll('.product-card').forEach(card => {
    const addToCartBtn = card.querySelector('.btn-add-to-cart');
    const buyNowBtn = card.querySelectorAll('.product-buttons a')[1];
    const product = {
        name: addToCartBtn.dataset.name,
        price: parseInt(addToCartBtn.dataset.price),
        image: addToCartBtn.dataset.image,
        quantity: 1
    };
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
    });
    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = './HTML/cart.html';
    });
});

const toggleButton = document.getElementById("toggleInfoButton");
const infoBoxes = document.querySelectorAll(".info-box");
let isExpanded = false;
toggleButton.addEventListener("click", function () {
    isExpanded = !isExpanded;

    infoBoxes.forEach((box, index) => {
        if (isExpanded) {
            box.classList.add("visible");
        } else {
            if (index === 0) {
                box.classList.add("visible");
            } else {
                box.classList.remove("visible");
            }
        }
    });

    toggleButton.textContent = isExpanded ? "Thu gọn" : "Xem thêm";
});
window.addEventListener("load", () => {
    if (window.innerWidth <= 500) {
        infoBoxes.forEach((box, index) => {
            if (index === 0) {
                box.classList.add("visible");
            }
        });
    }
});