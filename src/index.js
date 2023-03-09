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

function formatForecastDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
  <div class="day col-2"><p class="forecast-day">${formatForecastDay(
		forecastDay.dt
	)}</p>
              <img
              alt="${forecastDay.weather[0].description}"
              class="forecast-icon"
              src="https://openweathermap.org/img/wn/${
								forecastDay.weather[0].icon
							}@2x.png" />
              <p><span class="forecast-temp-high">${Math.round(
								forecastDay.temp.max
							)}°</span>&nbsp;|&nbsp;<span class="forecast-temp-low">${Math.round(
					forecastDay.temp.min
				)}°</span></p>
            </div>
`;
		}
	});

	forecasHTML = forecastHTML + `</div>`;

	forecastElement.innerHTML = forecastHTML;
}

function getDailyForecast(coordinates) {
	let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=5&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
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
	windSpeed.innerHTML = `Wind Speed: ${response.data.wind.speed} km/h`;
	let weatherIcon = document.querySelector("#weather-icon");
	weatherIcon.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	celsiusTemp = response.data.main.temp;
	getDailyForecast(response.data.coord);
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

function findLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "64e5602de08f3631152c400a1c352055";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(currentWeather);
}

function currentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(findLocation);
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

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let celsiusTemp = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", findCity);

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", currentPosition);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

formatDate(new Date());
