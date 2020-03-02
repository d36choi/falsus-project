const hrefBtn = document.querySelectorAll(".main-button button");
const goMapBtn = hrefBtn[0];
const goListBtn = hrefBtn[1];

function moveMapPage() {
  location.href = "map/";
}

function moveListPage() {
  location.href = "list/";
}

function addEvents() {
  goMapBtn.addEventListener("click", moveMapPage);
  goListBtn.addEventListener("click", moveListPage);
}

function init() {
  addEvents();
}

init();
