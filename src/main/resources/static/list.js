const navBtn = document.querySelector(".header span");
const navMenu = document.querySelector(".nav-menu");
const navLayer = document.querySelector(".nav-layer");
const navItem = document.querySelectorAll(".nav-item");
const serachForm = document.querySelector(".table-search form");
const serachInput = document.querySelector(".table-search input");
const searchIcon = document.querySelector(".table-search i");

function addEvent() {
  navBtn.addEventListener("click", showNavMenu);
  navLayer.addEventListener("click", hideNavMenu);
  navItem[0].addEventListener("click", goBackHome); // go home
  navItem[1].addEventListener("click", notPrepare); // notice
  navItem[2].addEventListener("click", goMap); // go map
  navItem[3].addEventListener("click", notPrepare); // cheer up
  serachForm.addEventListener("submit", serach);
  searchIcon.addEventListener("click", serach);
}

function showNavMenu() {
  navMenu.classList.add("menu-show");
  navLayer.classList.add("layer-show");
}

function hideNavMenu() {
  navMenu.classList.remove("menu-show");
  navLayer.classList.remove("layer-show");
}

function serach(event) {
  event.preventDefault();

  const value = serachInput.value;
  const address = encodeURI(value);
  serachInput.value = "";

  location.href = `/list/search?address=${address}`;
}

function goBackHome() {
  location.href = "../";
}

function goMap() {
  location.href = "../map/";
}

function notPrepare() {
  alert("아직 준비되지 않았습니다.");
}

function init() {
  addEvent();
}

init();

// http://localhost:8080/list/search?address={address} 이런형식으로 GET Mapping 하면될듯.
