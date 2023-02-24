let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", findCity);

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", currentPosition);

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function currentWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempDeg = document.querySelector("#temp-deg");
  tempDeg.innerHTML = currentTemp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
}
function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "64e5602de08f3631152c400a1c352055";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentWeather);
}
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput = cityInput.value;
  let apiKey = "64e5602de08f3631152c400a1c352055";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentWeather);
}

function formatDate(currentDate) {
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[currentDate.getDay()];

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${hour}:${minutes}`;
}

formatDate(new Date());

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", fTemp);

// function fTemp(event) {
//   event.preventDefault();
//   let tempDeg = document.querySelector("#temp-deg");
//   let tempUnit = document.querySelector("#temp-unit");
//   let fTemp = tempDeg.innerHTML;
//   fTemp = Math.round(fTemp * 1.8 + 32);
//   tempDeg.innerHTML = fTemp;
//   tempUnit.innerHTML = "F";
// }

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", cTemp);

// function cTemp(event) {
//   event.preventDefault();
//   let tempDeg = document.querySelector("#temp-deg");
//   let tempUnit = document.querySelector("#temp-unit");
//   let cTemp = tempDeg.innerHTML;
//   cTemp = Math.round((cTemp - 32) / 1.8);
//   tempDeg.innerHTML = cTemp;
//   tempUnit.innerHTML = "C";
// }
