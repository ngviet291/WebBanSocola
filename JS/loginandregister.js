function showError(message) {
    const msg = document.getElementById("errorMessage");
    msg.textContent = message;
    msg.style.display = "block";
  }

  function clearError() {
    document.getElementById("errorMessage").style.display = "none";
  }

  const form = document.getElementById("authForm");
  const toggleLink = document.getElementById("toggleLink");
  const authTitle = document.getElementById("authTitle");
  const authButton = document.getElementById("authButton");
  const toggleText = document.getElementById("toggleText");
  const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
  const usernameGroup = document.getElementById("usernameGroup");
  const phoneGroup = document.getElementById("phoneGroup");
  const addressGroup = document.getElementById("addressGroup");
  let isLogin = true;

  toggleText.addEventListener("click", function (e) {
    if (e.target && e.target.id === "toggleLink") {
      e.preventDefault();
      isLogin = !isLogin;

      authTitle.textContent = isLogin ? "Đăng Nhập" : "Đăng Ký";
      authButton.textContent = isLogin ? "Đăng Nhập" : "Đăng Ký";
      toggleText.innerHTML = isLogin
        ? 'Chưa có tài khoản? <a href="#" id="toggleLink">Đăng ký</a>'
        : 'Đã có tài khoản? <a href="#" id="toggleLink">Đăng nhập</a>';

      confirmPasswordGroup.classList.toggle("d-none", isLogin);
      usernameGroup.classList.toggle("d-none", isLogin);
      phoneGroup.classList.toggle("d-none", isLogin);
      emailGroup.classList.toggle("d-none", isLogin);
      addressGroup.classList.toggle("d-none", isLogin);
      emailOrUsernameGroup.classList.toggle("d-none", !isLogin);
      document.getElementById("forgotPasswordGroup").style.display = isLogin ? "block" : "none";
      document.getElementById("rememberMeGroup").style.display = isLogin ? "block" : "none";
      if (!isLogin) {
        const emailOrUsernameValue = document.getElementById("emailOrUsername").value.trim();
        document.getElementById("username").value = emailOrUsernameValue;
        document.getElementById("emailOrUsername").value = "";
      }
      clearError();
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const emailOrUsername = document.getElementById("emailOrUsername").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!emailOrUsername || !password) {
      showError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (isLogin) {
      alert("Giả lập đăng nhập: không có xử lý thực tế.");
    } else {
      const username = document.getElementById("username").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!username || !phone || !address || !confirmPassword) {
        showError("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (password !== confirmPassword) {
        showError("Mật khẩu xác nhận không khớp!");
        return;
      }

      alert("Giả lập đăng ký: không có xử lý thực tế.");
      isLogin = true;
      toggleLink.click();
    }
  });

  document.getElementById("googleLogin").addEventListener("click", function () {
    alert("Chức năng Google login chưa được tích hợp.");
  });

  document.getElementById("facebookLogin").addEventListener("click", function () {
    alert("Chức năng Facebook login chưa được tích hợp.");
  });

  document.getElementById("forgotPasswordLink").addEventListener("click", function (e) {
    e.preventDefault();
    alert("Giả lập quên mật khẩu. Không có dữ liệu để xử lý.");
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