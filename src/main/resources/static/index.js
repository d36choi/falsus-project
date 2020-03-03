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
    url: "http://localhost:8080/json/data",
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
    })
    .then(
      (data, textStatus, jqXHR) => {
        console.log("성공 케이스");
      },
      (jqXHR, textStatus, errorThrown) => {
        console.log("실패 케이스");
      }
    );
}

function init() {
  addEvents();
  fetchAPI();
}

init();
