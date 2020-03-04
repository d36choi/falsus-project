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

function fetchAPI() {
  $.ajax({
    url: "/json/data",
    type: "GET"
  })
      .done(data => {
        console.log("성공");
        console.log(data);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log("실패");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
}

function init() {
  addEvents();
  fetchAPI();
}

init();
