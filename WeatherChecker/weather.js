const API_KEY = 'e6be6ad793a1c6ac9a2d0de7dacd7ea8';
const COORDS_LS = '';
const weather = document.querySelector(".js-weather");
const temper= document.querySelector(".js-temperature");

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then((response) => {
    return response.json();
  }).then((json)=>{
    console.log(json);
    const temperature = json.main.temp;
    const location = json.name;
    const climate = json.weather[0].main;

    weather.innerText = `${location} , ${climate}`;
    temper.innerText = `${temperature}℃`;

  });
}

function handleGetGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);

  getWeather(latitude, longitude);
}

function handleGetGeoFail(position) {
  console.log('Permision Denied');
}

function registerCoords() {
  navigator.geolocation.getCurrentPosition(handleGetGeoSuccess, handleGetGeoFail);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords === null) {
    registerCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();