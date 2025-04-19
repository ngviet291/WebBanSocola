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