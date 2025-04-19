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
// Dữ liệu về sản phẩm
const chocolateData = {
    small: {
        name: "Socola Truffle Hạt Dẻ Loại Nhỏ",
        image: "../IMG/scl4.jpg",
        price: 100000,
    },
    medium: {
        name: "Socola Truffle Hạt Dẻ Loại Vừa",
        image: "../IMG/scl4.jpg",
        price: 120000,
    },
    large: {
        name: "Socola Truffle Hạt Dẻ Loại Lớn",
        image: "../IMG/scl4.jpg",
        price: 140000,
    }
};
function changeChocolateType(type) {
    const chocolate = chocolateData[type];
    document.getElementById("product-name").textContent = chocolate.name;
    document.getElementById("product-image").src = chocolate.image;
    document.getElementById("product-price").textContent = chocolate.price.toLocaleString() + "đ";
    const addToCartButton = document.querySelector(".btn-add-to-cart");
    const buyNowButton = document.querySelector(".btn-danger");

    addToCartButton.setAttribute("data-name", chocolate.name);
    addToCartButton.setAttribute("data-image", chocolate.image);
    addToCartButton.setAttribute("data-price", chocolate.price);

    buyNowButton.setAttribute("data-name", chocolate.name);
    buyNowButton.setAttribute("data-image", chocolate.image);
    buyNowButton.setAttribute("data-price", chocolate.price);
}
document.getElementById("chocolateType").addEventListener("change", function () {
    const selectedType = this.value;
    changeChocolateType(selectedType);
});
changeChocolateType("small");
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
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessageText = document.getElementById('toastMessageText');
    toastMessageText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
document.querySelectorAll('.product-card-footer a:last-child').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const cardFooter = this.closest('.product-card-footer');
        const addToCartBtn = cardFooter.querySelector('.btn-add-to-cart');
        const productName = addToCartBtn.getAttribute('data-name');
        const productPrice = parseInt(addToCartBtn.getAttribute('data-price'));
        const productImage = addToCartBtn.getAttribute('data-image');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = '../HTML/cart.html';
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