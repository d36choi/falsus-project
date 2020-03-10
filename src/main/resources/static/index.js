const hrefBtn = document.querySelectorAll(".main-button button");
const goMapBtn = hrefBtn[0];
const goListBtn = hrefBtn[1];
const searchForm = document.querySelector(".main-box form");
const searchInput = document.querySelector(".main-box input");
const searchIcon = document.querySelector(".main-box i");
const noticeIcon = document.querySelector(".notice-icon");
const notice = document.querySelector(".notice");
const noticeLayer = document.querySelector(".notice-layer");

function moveMapPage() {
    location.href = "map/";
}

function moveListPage() {
    location.href = "list/";
}

function addEvents() {
    goMapBtn.addEventListener("click", moveMapPage);
    goListBtn.addEventListener("click", moveListPage);
    searchForm.addEventListener("submit", search);
    searchIcon.addEventListener("click", search);
    noticeIcon.addEventListener("click", showNotice);
    noticeLayer.addEventListener("click", closeNotice);
}

function closeNotice() {
    if (notice.classList.contains("notice-show")) {
        notice.classList.remove("notice-show");
        noticeLayer.classList.remove("notice-show");
    }
}

function showNotice() {
    if (notice.classList.contains("notice-show")) {
        notice.classList.remove("notice-show");
        noticeLayer.classList.remove("notice-show");
    } else {
        notice.classList.add("notice-show");
        noticeLayer.classList.add("notice-show");
    }
}

function search(event) {
    event.preventDefault();

    const address = searchInput.value;
    searchInput.value = "";

    localStorage.setItem("address", address);
    moveMapPage();
}

function init() {
    addEvents();
}

init();
