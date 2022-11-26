// Day and Time Display
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#date-display");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

// Forecast Cards

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecast = response.data.daily;
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm-2">
      <div class="card">
        <div class="card-body">
          <div class="forecast-day">
          ${formatForecastDay(forecastDay.dt)}
        </div>
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="weather icon">
          <div class="forecast-temp">
            <span class="forecast-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="forecast-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
        </div>
      </div>
    </div>
    </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4cefc11f1f38ea5cac3c215cbf9217d2";
  let apiURLCoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURLCoord).then(displayForecast);
}

// Search

function showTemperature(response) {
  let location = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let conditions = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  let locationHeader = document.querySelector("#location-header");
  locationHeader.innerHTML = `${location}`;
  let temperatureHeader = document.querySelector("#temperature-header");
  temperatureHeader.innerHTML = `${temperature}`;
  let weatherConditions = document.querySelector("#weather-conditions");
  weatherConditions.innerHTML = `${conditions}`;
  let weatherHumidity = document.querySelector("#weather-humidity");
  weatherHumidity.innerHTML = `Humidity ${humidity}%`;
  let weatherWindy = document.querySelector("#weather-winds");
  weatherWindy.innerHTML = `Winds ${wind}km/h`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  let apiKey = "4cefc11f1f38ea5cac3c215cbf9217d2";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showTemperature);
}

let form = document.querySelector("#search-button");
form.addEventListener("click", search);

// Current Location Button

showTemperature;

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4cefc11f1f38ea5cac3c215cbf9217d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
  console.log(getCurrentPosition);
}

let currentLoc = document.querySelector("#current-location-button");
currentLoc.addEventListener("click", currentLocationTemp);

function defaultCity() {
  let apiKey = "4cefc11f1f38ea5cac3c215cbf9217d2";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(showTemperature);
}

defaultCity("load");
