const naverMap = document.getElementById("naver-map");
const statusMenu = document.querySelector(".status-bar");
const navBtn = document.querySelector(".header span");
const navMenu = document.querySelector(".nav-menu");
const navLayer = document.querySelector(".nav-layer");

// for gps
var currentLat = "";
var currentLon = "";

// const values
const gpsHtml = `<a id="gps"><i class="fas fa-map-marker-alt"></i></a>`;
const zoomHtml = `<div id="zoom"><a id="plus">+</a><a id="minus">-</a></div>`;
const statusHtml = `<a id="status-menu"><i class="fas fa-bars"></i></a>`;
const TITLE_HEIGHT = 70;

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
  new naver.maps.visualization.WeightedLocation(37.647821, 126.835465, 1.9),

  // GwangMyeong
  new naver.maps.visualization.WeightedLocation(37.48465, 126.855322, 1.8),

  // Pazu
  new naver.maps.visualization.WeightedLocation(37.75677, 126.7523, 1.7)
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
    radius: 50
  });
};

/*********************************/
/*     custom control button     */
/*********************************/

// get html
var gpsBtn = gpsHtml;
var zoomBtn = zoomHtml;
var statusBtn = statusHtml;

// create custom control
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
  gpsControl.setMap(map);
  zoomControl.setMap(map);
  statusControl.setMap(map);

  // gps function
  naver.maps.Event.addDOMListener(gpsControl.getElement(), "click", function() {
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(currentLat, currentLon),
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

function resizeMap() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  var size = new naver.maps.Size(w, h - TITLE_HEIGHT);
  map.setSize(size);
}

function addEvent() {
  window.addEventListener("resize", resizeMap); // reset map size when user resize window
  navBtn.addEventListener("click", showNavMenu);
  navLayer.addEventListener("click", hideNavMenu);
}

function showNavMenu() {
  navMenu.classList.add("menu-show");
  navLayer.classList.add("layer-show");
}

function hideNavMenu() {
  navMenu.classList.remove("menu-show");
  navLayer.classList.remove("layer-show");
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
  addEvent();
  askLocation();
}

init();
