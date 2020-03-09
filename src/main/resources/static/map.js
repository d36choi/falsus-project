const naverMap = document.getElementById("naver-map");
const statusMenu = document.querySelector(".status-bar");
const navBtn = document.querySelector(".header span");
const navMenu = document.querySelector(".nav-menu");
const navLayer = document.querySelector(".nav-layer");
const navItem = document.querySelectorAll(".nav-item");

// for data
var fetchData = [];
var geoData = [];
var markers = [];
var infoWindows = [];

// for gps
var currentLat = "";
var currentLon = "";

// const variable
const TITLE_HEIGHT = 70;

// const values
const searchHtml = `<form id="map-search"><input type="text" placeholder="주소를 검색해 주세요" /><a><i class="fas fa-search"></i></a></form>`;
const gpsHtml = `<a id="gps"><i class="fas fa-map-marker-alt"></i></a>`;
const zoomHtml = `<div id="zoom"><a id="plus">+</a><a id="minus">-</a></div>`;
const statusHtml = `<a id="status-menu"><i class="fas fa-bars"></i></a>`;
const htmlMarker1 = {
  content: '<div id="cluster"></div>',
  size: N.Size(50, 50),
  anchor: N.Point(25, 25)
};
//   htmlMarker2 = {
//     content:
//       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
//       HOME_PATH +
//       '/img/cluster-marker-2.png);background-size:contain;"></div>',
//     size: N.Size(40, 40),
//     anchor: N.Point(20, 20)
//   },
//   htmlMarker3 = {
//     content:
//       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
//       HOME_PATH +
//       '/img/cluster-marker-3.png);background-size:contain;"></div>',
//     size: N.Size(40, 40),
//     anchor: N.Point(20, 20)
//   },
//   htmlMarker4 = {
//     content:
//       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
//       HOME_PATH +
//       '/img/cluster-marker-4.png);background-size:contain;"></div>',
//     size: N.Size(40, 40),
//     anchor: N.Point(20, 20)
//   },
//   htmlMarker5 = {
//     content:
//       '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
//       HOME_PATH +
//       '/img/cluster-marker-5.png);background-size:contain;"></div>',
//     size: N.Size(40, 40),
//     anchor: N.Point(20, 20)
//   };

// set map options
var mapOptions = {
  center: new naver.maps.LatLng(37.566685, 126.978415),
  zoom: 8,
  scaleControl: false,
  logoControl: false,
  mapDataControl: false
};

// make naver map
var map = new naver.maps.Map("naver-map", mapOptions);

// initialize map size
var size = new naver.maps.Size(window.innerWidth, window.innerHeight - TITLE_HEIGHT);
map.setSize(size);

// resize map event listener
window.addEventListener("resize", () => {
  resizeMap(map); // reset map size when user resize window
});

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

  //////////////////////  !!warning!!  ////////////////////
  // fetcgAPI()                                          //
  // warning : This function is important that order is  //
  // warning : This function must be in "init_stylemap"  //
  /////////////////////////////////////////////////////////
  fetchAPI();

  // search function
  naver.maps.Event.addDOMListener(searchControl.getElement(), "submit", function(event) {
    event.preventDefault();

    const searchInput = searchControl.getElement().querySelector("input");
    const address = searchInput.value;
    searchInput.value = "";

    searchAddress(address);
  });

  naver.maps.Event.addDOMListener(searchControl.getElement().querySelector("a"), "click", function(event) {
    const searchInput = searchControl.getElement().querySelector("input");
    const address = searchInput.value;
    searchInput.value = "";

    searchAddress(address);
  });

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

  // when zoom changed
  naver.maps.Event.addListener(map, "zoom_changed", function(zoom) {
    // console.log(zoom);
  });
});

function resizeMap(map) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  var size = new naver.maps.Size(w, h - TITLE_HEIGHT);
  map.setSize(size);
}

// fetch geo data
function fetchAPI() {
  $.ajax({
    url: "/json/data",
    type: "GET"
  })
    .done(data => {
      console.log("성공");
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log("실패");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    })
    .then(data => {
      fetchData = data.slice();
      data.forEach(function(data) {
        geoData.push(new naver.maps.LatLng(data.geoY, data.geoX));
      });
      makeMarkerClustering(geoData);
    });
}

// make marker clustering
function makeMarkerClustering(geoData) {
  // marker
  geoData.forEach(function(data) {
    var marker = new naver.maps.Marker({
      position: data,
      icon: {
        content: ["<div id='marker-icon'>", "<i class='fas fa-times'>", "</i>", "</div>"].join(""),
        size: new naver.maps.Size(13, 19),
        anchor: new naver.maps.Point(6, 10)
      }
    });
    markers.push(marker);
  });

  // marker information
  for (var i = 0; i < fetchData.length; i++) {
    var infoWindow = new naver.maps.InfoWindow({
      content: [
        "<div id='marker-info'>",
        "<div class='title'>",
        "<h1>그들의 지부</h1>",
        "</div>",
        "<div class='context'>",
        "<ul>",
        `<li>구분 : ${fetchData[i].div}</li>`,
        `<li>주소 : ${fetchData[i].address}</li>`,
        `<li>방역여부 : ${fetchData[i].protection}</li>`,
        "</ul>",
        "</div>",
        "</div>"
      ].join(""),
      borderWidth: 0,
      backgroundColor: "none",
      disableAnchor: true
    });
    infoWindows.push(infoWindow);
  }
  // marker cluster
  var markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 14,
    map: map,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [htmlMarker1],
    // indexGenerator: [5],
    stylingFunction: function(clusterMarker, count) {
      $(clusterMarker.getElement())
        .find("div:first-child")
        .text(count);
    }
  });

  // add event listener to marker for each
  for (var i = 0; i < markers.length; i++) {
    naver.maps.Event.addListener(markers[i], "click", openInfo(i));
  }
}

// function of opening information
function openInfo(seq) {
  return function(e) {
    var marker = markers[seq],
      infoWindow = infoWindows[seq];

    if (infoWindow.getMap()) {
      infoWindow.close();
    } else {
      infoWindow.open(map, marker);
      naver.maps.Event.addListener(map, "click", function() {
        infoWindow.close();
      });
    }
  };
}

function searchAddress(address) {
  naver.maps.Service.geocode({ query: address }, function(status, response) {
    if (status !== naver.maps.Service.Status.OK) {
      return alert("Something wrong!");
    }

    var result = response.v2, // 검색 결과의 컨테이너
      items = result.addresses; // 검색 결과의 배열

    if (items.length > 1) {
      return alert(`검색하신 "${address}"의 결과가 너무 많습니다. 주소를 좀 더 자세히 입력해주세요!`);
    }

    map.morph(new naver.maps.LatLng(items[0].y, items[0].x), 13);
  });
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
