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
let currentTime = document.querySelector("#date-display");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

// Search Button

function showTemperature(response) {
  let location = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let conditions = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
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
}

let currentLoc = document.querySelector("#current-location-button");
currentLoc.addEventListener("click", currentLocationTemp);
