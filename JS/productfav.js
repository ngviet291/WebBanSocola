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
document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sortSelect");
  const productContainer = document.querySelector(".row.row-cols-1");

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ""), 10);

  sortSelect.addEventListener("change", function () {
    const products = Array.from(productContainer.children);
    const sortValue = sortSelect.value;

    products.sort((a, b) => {
      const nameA = a.querySelector(".card-title").textContent.trim();
      const nameB = b.querySelector(".card-title").textContent.trim();
      const priceA = parsePrice(a.querySelector(".product-card-footer span").textContent);
      const priceB = parsePrice(b.querySelector(".product-card-footer span").textContent);

      switch (sortValue) {
        case "name-asc":
          return nameA.localeCompare(nameB);
        case "name-desc":
          return nameB.localeCompare(nameA);
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        default:
          return 0;
      }
    });

    products.forEach(p => productContainer.appendChild(p));
  });
});
const productsPerPage = 12;
const productCards = document.querySelectorAll('#productContainer .product-card-wrapper');
const totalPages = Math.ceil(productCards.length / productsPerPage);
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;

function showPage(page) {
  currentPage = page;
  productCards.forEach((card, index) => {
    card.style.display = (index >= (page - 1) * productsPerPage && index < page * productsPerPage)
      ? 'block'
      : 'none';
  });
  updatePagination();
}

function updatePagination() {
  paginationContainer.innerHTML = '';

  const prevLi = document.createElement('li');
  prevLi.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
  const prevLink = document.createElement('a');
  prevLink.className = 'page-link';
  prevLink.href = '#';
  prevLink.innerHTML = '&laquo;';
  prevLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) showPage(currentPage - 1);
  });
  prevLi.appendChild(prevLink);
  paginationContainer.appendChild(prevLi);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = 'page-item' + (i === currentPage ? ' active' : '');
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = i;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(i);
    });
    li.appendChild(a);
    paginationContainer.appendChild(li);
  }

  const nextLi = document.createElement('li');
  nextLi.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
  const nextLink = document.createElement('a');
  nextLink.className = 'page-link';
  nextLink.href = '#';
  nextLink.innerHTML = '&raquo;';
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) showPage(currentPage + 1);
  });
  nextLi.appendChild(nextLink);
  paginationContainer.appendChild(nextLi);
}
if (productCards.length > 0) {
  showPage(1);
}
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