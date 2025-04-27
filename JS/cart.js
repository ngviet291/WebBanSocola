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
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items-container');
  const totalAmount = document.getElementById('totalAmount');
  const checkoutRow = document.getElementById('checkoutRow');
  const emptyCartMessage = document.getElementById('emptyCartMessage');

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCartMessage.classList.remove('d-none');
    checkoutRow.classList.add('d-none');
    totalAmount.textContent = '0 VND';
    document.getElementById('modalTotalAmount').textContent = 'Tổng tiền: 0 VND';
    document.getElementById('cart-table').classList.add('d-none');
    return;
  }

  emptyCartMessage.classList.add('d-none');
  checkoutRow.classList.remove('d-none');
  document.getElementById('cart-table').classList.remove('d-none');

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const row = document.createElement('tr');
    row.classList.add('align-middle', 'text-center');
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" 
           style="width: 140px; height: 100px; object-fit: cover;">
    </td>
    <td style="font-size: 1.1rem; font-weight: 500;">${item.name}</td>
    <td>
      <input type="number" class="form-control quantity-input mx-auto" 
             style="max-width: 80px;" value="${item.quantity}" min="1" max="10" 
             data-index="${index}">
    </td>
    <td class="text-primary fw-bold">${itemTotal.toLocaleString()} VND</td>
    <td>
      <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Xóa</button>
    </td>
  `;
    cartContainer.appendChild(row);
  });

  totalAmount.textContent = `${totalPrice.toLocaleString()} VND`;
  document.getElementById('modalTotalAmount').textContent = `Tổng tiền: ${totalPrice.toLocaleString()} VND`;

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      const confirmed = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
      if (confirmed) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    });
  });


  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function () {
      const index = this.getAttribute('data-index');
      const newQty = parseInt(this.value);
      if (newQty >= 1 && newQty <= 10) {
        cart[index].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    });
  });
}

document.getElementById('clearCartBtn').addEventListener('click', function () {
  if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
    localStorage.removeItem('cart');
    renderCart();
  }
});
function saveOrderHistory(orderDetails) {
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  orderHistory.push(orderDetails);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

const checkoutForm = document.getElementById('checkoutForm');
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn hiện tại trống. Vui lòng thêm sản phẩm vào giỏ.");
    return;
  }

  const customerName = document.getElementById('checkoutName').value;
  const customerPhone = document.getElementById('checkoutPhone').value;
  const customerAddress = document.getElementById('checkoutAddress').value;

  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  const orderDetails = {
    customerName,
    customerPhone,
    customerAddress,
    items: cart,
    totalAmount,
    date: new Date().toLocaleString()
  };

  saveOrderHistory(orderDetails);
  alert("Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn sớm.");
  localStorage.removeItem('cart');
  renderCart();

  const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
  modal.hide();
  checkoutForm.reset();
});


document.addEventListener('DOMContentLoaded', renderCart);
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