function showError(message) {
  const msg = document.getElementById("errorMessage");
  msg.textContent = message;
  msg.style.display = "block";
}
function clearError() {
  const msg = document.getElementById("errorMessage");
  msg.style.display = "none";
}

let isLogin = true;
const authTitle = document.getElementById("authTitle");
const toggleText = document.getElementById("toggleText");
const toggleLink = document.getElementById("toggleLink");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

const usernameGroup = document.getElementById("usernameGroup");
const phoneGroup = document.getElementById("phoneGroup");
const addressGroup = document.getElementById("addressGroup");
const emailGroup = document.getElementById("emailGroup");
const emailOrUsernameGroup = document.getElementById("emailOrUsernameGroup");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const rememberMeGroup = document.getElementById("rememberMeGroup");
const forgotPasswordGroup = document.getElementById("forgotPasswordGroup");
const termsGroup = document.getElementById("termsGroup");

toggleLink.addEventListener("click", function (e) {
  e.preventDefault();
  isLogin = !isLogin;

  authTitle.textContent = isLogin ? "Đăng Nhập" : "Đăng Ký";
  toggleText.innerHTML = isLogin
    ? 'Chưa có tài khoản? <a href="#" id="toggleLink">Đăng ký</a>'
    : 'Đã có tài khoản? <a href="#" id="toggleLink">Đăng nhập</a>';

  document.getElementById("toggleLink").addEventListener("click", arguments.callee);

  loginButton.classList.toggle("d-none", !isLogin);
  registerButton.classList.toggle("d-none", isLogin);

  emailOrUsernameGroup.classList.toggle("d-none", !isLogin);
  usernameGroup.classList.toggle("d-none", isLogin);
  phoneGroup.classList.toggle("d-none", isLogin);
  addressGroup.classList.toggle("d-none", isLogin);
  emailGroup.classList.toggle("d-none", isLogin);
  confirmPasswordGroup.classList.toggle("d-none", isLogin);

  forgotPasswordGroup.style.display = isLogin ? "block" : "none";
  rememberMeGroup.style.display = isLogin ? "block" : "none";
  termsGroup.classList.toggle("d-none", isLogin);

  clearError();
});

// Xử lý đăng nhập
function handleLogin() {
  clearError();
  const emailOrUsername = document.getElementById("emailOrUsername").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!emailOrUsername || !password) {
    showError("Vui lòng nhập đầy đủ thông tin đăng nhập!");
    return;
  }

  alert("Đăng nhập thành công (giả lập).");
}

// Xử lý đăng ký
function handleRegister() {
  clearError();
  const username = document.getElementById("username").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!username || !phone || !address || !email || !password || !confirmPassword) {
    showError("Vui lòng nhập đầy đủ tất cả thông tin đăng ký!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!usernameRegex.test(username)) {
    showError("Tên đăng nhập không hợp lệ (chỉ chữ, số, gạch dưới, 3-20 ký tự).");
    return;
  }
  if (!emailRegex.test(email)) {
    showError("Email không hợp lệ.");
    return;
  }
  if (!phoneRegex.test(phone)) {
    showError("Số điện thoại không hợp lệ.");
    return;
  }
  if (!passwordRegex.test(password)) {
    showError("Mật khẩu phải tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số.");
    return;
  }
  if (password !== confirmPassword) {
    showError("Mật khẩu xác nhận không khớp.");
    return;
  }
  if (address.length < 5) {
    showError("Địa chỉ quá ngắn.");
    return;
  }
  const registrationInfo = `
    <div class="p-3 text-center">
      <h4 class="text-success">Đăng ký thành công!</h4>
      <p><strong>Tên đăng nhập:</strong> ${username}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Số điện thoại:</strong> ${phone}</p>
      <p><strong>Địa chỉ:</strong> ${address}</p>
      <a href="#" class="btn btn-primary mt-3" onclick="window.location.reload()">Quay lại trang đăng nhập</a>
    </div>
  `;
  document.querySelector(".right-panel").innerHTML = registrationInfo;
}
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  handleLogin();
});
registerButton.addEventListener("click", function (e) {
  e.preventDefault();
  handleRegister();
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

if (toggleButton) {
  toggleButton.addEventListener("click", function () {
    isExpanded = !isExpanded;
    infoBoxes.forEach((box, index) => {
      if (isExpanded) {
        box.classList.add("visible");
      } else {
        if (index === 0) box.classList.add("visible");
        else box.classList.remove("visible");
      }
    });
    toggleButton.textContent = isExpanded ? "Thu gọn" : "Xem thêm";
  });
}
window.addEventListener("load", () => {
  if (window.innerWidth <= 500) {
    infoBoxes.forEach((box, index) => {
      if (index === 0) box.classList.add("visible");
    });
  }
});
