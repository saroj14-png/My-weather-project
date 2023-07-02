// Time
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) {
    hours = "0${hours}";
  }
  if (mins < 10) {
    mins = "0${mins}";
  }
  return `${hours}:${mins}`;
}
// Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let date1 = date.getDate();
  return `${day},${date1} ${month} ${year} `;
}

//show current city and Temperature of it
function displayWeather(response) {
  console.log(response);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#location").innerHTML = response.data.sys.country;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );

  // icon changed
  let iconElement = document.querySelector("#demo");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  //Current Temperature
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#localTemperture");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#feellike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );

  //Section
  document.querySelector("#pressure ").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchCity(city) {
  let apiKey = "ae24bf3b7efaa11e784aefb48ae9f617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLoc(position) {
  let apiKey = "ae24bf3b7efaa11e784aefb48ae9f617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLoc);
}
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleForm);
let currentLocationButton = document.querySelector("#currentLocButton");
currentLocationButton.addEventListener("click", getCurrentLoc);
searchCity("Paris");

// ºc To ºF
function displayFahreheitTemperature(event) {
  event.preventDefault();
  let fahreheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#localTemperture");
  temperatureElement.innerHTML = Math.round(fahreheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#localTemperture");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahreheitLink = document.querySelector("#fahrenheit");
fahreheitLink.addEventListener("click", displayFahreheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
