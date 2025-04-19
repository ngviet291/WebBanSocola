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
    function saveUserInfo() {
      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const customerImage = document.getElementById("customerImage").files[0];

      if (!fullname || !email || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }
      document.getElementById('welcomeMessage').innerText = "Chào mừng, " + fullname;

      if (customerImage) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("profileImage").src = e.target.result;
          document.getElementById("showProfileImage").src = e.target.result;
        };
        reader.readAsDataURL(customerImage);
      }
      const info = {
        fullname: fullname,
        email: email,
        phone: phone,
        address: address
      };
      alert("Đã lưu thông tin thành công!");

      document.getElementById('inputInfo').style.display = 'none';
      document.getElementById('savedInfo').style.display = 'block';
      document.getElementById('showFullname').textContent = fullname;
      document.getElementById('showEmail').textContent = email;
      document.getElementById('showPhone').textContent = phone;
      document.getElementById('showAddress').textContent = address;
    }
    function showSection(section) {
      document.getElementById("profileSection").style.display = "none";
      document.getElementById("orderHistorySection").style.display = "none";
      document.getElementById("accountSettingsSection").style.display = "none";

      if (section === 'profile') {
        document.getElementById("profileSection").style.display = "block";
      } else if (section === 'orderHistory') {
        document.getElementById("orderHistorySection").style.display = "block";
      } else if (section === 'accountSettings') {
        document.getElementById("accountSettingsSection").style.display = "block";
      }
    }
    window.onload = function () {
      showSection('profile');
    };
    function displayOrderHistory() {
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory'));
      if (orderHistory && orderHistory.length > 0) {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';
        orderHistory.forEach(order => {
          const row = document.createElement('tr');
          row.innerHTML = `
        <td>${order.customerName}</td>
        <td>${order.customerEmail}</td>
        <td>${order.customerPhone}</td>
        <td>${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</td>
        <td>${order.totalAmount.toLocaleString()} VND</td>
        <td>${order.date}</td>
      `;
          orderList.appendChild(row);
        });
      } else {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '<tr><td colspan="6">Chưa có đơn hàng nào.</td></tr>';
      }
    }
    document.addEventListener('DOMContentLoaded', displayOrderHistory);
    window.onload = function () {
      const hash = window.location.hash;
      if (hash === "#orderHistory") {
        showSection('orderHistory');
      } else {
        showSection('profile');
      }
    };
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