const naverMap = document.getElementById("naver-map");
const statusMenu = document.querySelector(".status-bar");
const navBtn = document.querySelector(".header span");
const navMenu = document.querySelector(".nav-menu");
const navLayer = document.querySelector(".nav-layer");
const navItem = document.querySelectorAll(".nav-item");

// for geocode
var geoData = [];

// for gps
var currentLat = "";
var currentLon = "";

const TITLE_HEIGHT = 70;



// const values
  const searchHtml = `<form id="map-search"><input type="text" placeholder="주소를 검색해 주세요" /><a><i class="fas fa-search"></i></a></form>`;
  const gpsHtml = `<a id="gps"><i class="fas fa-map-marker-alt"></i></a>`;
  const zoomHtml = `<div id="zoom"><a id="plus">+</a><a id="minus">-</a></div>`;
  const statusHtml = `<a id="status-menu"><i class="fas fa-bars"></i></a>`;

// set map options
  var mapOptions = {
    center: new naver.maps.LatLng(37.647821, 126.835465),
    zoom: 11,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false
  };

// dot location data
  var dotData = [
    // Our Home
    new naver.maps.visualization.WeightedLocation(37.647821, 126.835465, 1),

    // GwangMyeong
    new naver.maps.visualization.WeightedLocation(37.48465, 126.855322, 1),

    // Pazu
    new naver.maps.visualization.WeightedLocation(37.75677, 126.7523, 1)
  ];



// make naver map
  var map = new naver.maps.Map("naver-map", mapOptions);

// initialize map size
  var size = new naver.maps.Size(window.innerWidth, window.innerHeight - TITLE_HEIGHT);
  map.setSize(size);

// make dot in map
  naver.maps.onJSContentLoaded = function() {
    var dotmap = new naver.maps.visualization.DotMap({
      map: map,
      data: dotData,
      radius: 30
    });

  };
  // naver.maps.onJSContentLoaded();

  // resize map event listener
  window.addEventListener("resize", () =>{
    resizeMap(map)
  }); // reset map size when user resize window

  /*********************************/
  /*     custom control button     */
  /*********************************/

// get html
  var searchForm = searchHtml;
  var gpsBtn = gpsHtml;
  var zoomBtn = zoomHtml;
  var statusBtn = statusHtml;

// create custom control
  var searchControl = new naver.maps.CustomControl(searchForm, {
    position: naver.maps.Position.TOP_LEFT
  });
  var gpsControl = new naver.maps.CustomControl(gpsBtn, {
    position: naver.maps.Position.LEFT_TOP
  });
  var zoomControl = new naver.maps.CustomControl(zoomBtn, {
    position: naver.maps.Position.TOP_RIGHT
  });
  var statusControl = new naver.maps.CustomControl(statusBtn, {
    position: naver.maps.Position.LEFT_TOP
  });

  const zoomPlus = zoomControl.getElement().querySelector("#plus");
  const zoomMinus = zoomControl.getElement().querySelector("#minus");

// add event
  naver.maps.Event.once(map, "init_stylemap", function() {
    searchControl.setMap(map);
    gpsControl.setMap(map);
    zoomControl.setMap(map);
    statusControl.setMap(map);

    // search function
    naver.maps.Event.addDOMListener(searchControl.getElement(), "submit", function(event) {
      event.preventDefault();
    });

    // gps function
    naver.maps.Event.addDOMListener(gpsControl.getElement(), "click", function() {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.85322267, 129.2244209),
        map: map
      });
      map.morph(new naver.maps.LatLng(currentLat, currentLon));
    });

    // zoom function
    naver.maps.Event.addDOMListener(zoomPlus, "click", function() {
      let setzoom = map.getOptions("zoom") + 1;
      map.setZoom(setzoom, true);
    });
    naver.maps.Event.addDOMListener(zoomMinus, "click", function() {
      let setzoom = map.getOptions("zoom") - 1;
      map.setZoom(setzoom, true);
    });

    // status menu function
    naver.maps.Event.addDOMListener(statusControl.getElement(), "click", function() {
      if (!statusMenu.classList.contains("show")) {
        statusMenu.classList.add("show");
      } else {
        statusMenu.classList.remove("show");
      }
    });
  });


function resizeMap(map) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  var size = new naver.maps.Size(w, h - TITLE_HEIGHT);
  map.setSize(size);
}

function addEvent() {
  navBtn.addEventListener("click", showNavMenu);
  navLayer.addEventListener("click", hideNavMenu);
  navItem[0].addEventListener("click", goBackHome);
  navItem[1].addEventListener("click", notPrepare);
}

function showNavMenu() {
  navMenu.classList.add("menu-show");
  navLayer.classList.add("layer-show");
}

function hideNavMenu() {
  navMenu.classList.remove("menu-show");
  navLayer.classList.remove("layer-show");
}

function goBackHome() {
  location.href = "../";
}

function notPrepare() {
  alert("아직 준비되지 않았습니다.");
}

function fetchAPI() {
  $.ajax({
    url: "/json/data",
    type: "GET"
  })
      .done(data => {
        console.log("성공");
        geoData = data.slice();
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log("실패");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      })
      .then((data) => {
        geoData = data.slice();
        geoData.forEach(function (geoData) {
          dotData.push( new naver.maps.visualization.WeightedLocation(geoData.geoY, geoData.geoX, 1));
        })
        map.refresh();
      });
}

function askLocation() {
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
}

function successLocation(pos) {
  currentLat = pos.coords.latitude;
  currentLon = pos.coords.longitude;
  console.log("complete to load geolocation");
}

function errorLocation() {
  console.log("failed to get location");
}

function init() {
  fetchAPI();
  addEvent();
  askLocation();
}

init();
