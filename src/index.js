let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", findCity);

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", currentPosition);

function currentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(findLocation);
}

function getDailyForecast(coordinates) {
	let apiKey = "64e5602de08f3631152c400a1c352055";
	let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=5&appid=${apiKey}`;
	axios.get(apiUrl).then(forecastWeather);
}

function currentWeather(response) {
	let currentTemp = Math.round(response.data.main.temp);
	let tempDeg = document.querySelector("#temp-deg");
	tempDeg.innerHTML = `${currentTemp}°C`;
	let h1 = document.querySelector("h1");
	h1.innerHTML = response.data.name;
	let weatherDescription = document.querySelector("#weather-description");
	weatherDescription.innerHTML = response.data.weather[0].description;
	let windSpeed = document.querySelector("#wind-speed");
	windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
	let weatherIcon = document.querySelector("#weather-icon");
	weatherIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	celsiusTemp = response.data.main.temp;
	getDailyForecast(response.data.coord);
}

function forecastWeather(response) {
	console.log(response.data);
	let forecastElement = document.querySelector("#forecast");
	let forecastWeatherHTML = `<div class="row">`;
	let forecast = response.data.list;
	forecast.forEach(function (i) {
		forecastWeatherHTML =
			forecastWeatherHTML +
			`
  <div class="day col-2"><p class="forecast-day">${i.dt}</p>
              <img
              class="forecast-icon"
              src="http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" />
              <p><span class="forecast-temp-high">${i.main.temp_max}°</span>&nbsp;|&nbsp;<span class="forecast-temp-low">${i.main.temp_min}°</span></p>
            </div>
`;
	});

	forecastWeatherHTML = forecastWeatherHTML + `</div>`;

	forecastElement.innerHTML = forecastWeatherHTML;
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
		"Saturday",
	];

	let day = days[currentDate.getDay()];

	let h2 = document.querySelector("h2");
	h2.innerHTML = `${day} ${hour}:${minutes}`;
}

function convertToFahrenheit(event) {
	event.preventDefault();
	let fTemp = document.querySelector("#temp-deg");
	fTemp.innerHTML = `${Math.round(celsiusTemp * 1.8 + 32)}°F`;
}

function convertToCelsius(event) {
	event.preventDefault();
	let cTemp = document.querySelector("#temp-deg");
	cTemp.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

formatDate(new Date());

//findCity(Seattle);

// function fTemp(event) {
//   event.preventDefault();
//   let tempDeg = document.querySelector("#temp-deg");
//   let tempUnit = document.querySelector("#temp-unit");
//   let fTemp = tempDeg.innerHTML;
//   fTemp = Math.round(fTemp * 1.8 + 32);
//   tempDeg.innerHTML = fTemp;
//   tempUnit.innerHTML = "F";
// }

// function cTemp(event) {
//   event.preventDefault();
//   let tempDeg = document.querySelector("#temp-deg");
//   let tempUnit = document.querySelector("#temp-unit");
//   let cTemp = tempDeg.innerHTML;
//   cTemp = Math.round((cTemp - 32) / 1.8);
//   tempDeg.innerHTML = cTemp;
//   tempUnit.innerHTML = "C";
// }
