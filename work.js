// Time
function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = "0${hours}";
  }
  let mins = time.getMinutes();
  if (mins < 10) {
    mins = "0${mins}";
  }
  return `${hours}:${mins}`;
}
//Date
function formatDate(now) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
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
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `${day}, ${month} ${date}, ${year}`;
}

//show current city and Temperature of it
function displayWeather(response) {
  console.log(response);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#location").innerHTML = response.data.sys.country;

  /*let iconElement = document.querySelector("#demo");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );*/

  //Current Temperature
  let temperatureElement = document.querySelector("#localTemperture");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#feellike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  //section
  document.querySelector("#pressure ").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#visibility").innerHTML = response.data.visibility;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

let currentDate = document.querySelector("#date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

let currentTime = document.querySelector("#time");
let time = new Date();
currentTime.innerHTML = formatTime(time);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleForm);

let currentLocationButton = document.querySelector("#currentLocButton");
currentLocationButton.addEventListener("click", getCurrentLoc);

searchCity("Sunnyvale");

// ºc To ºF
function displayFahreheitTemperature(event) {
  event.preventDefault();
  let fahreheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahreheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahreheitLink = document.querySelector("#fahrenheit");
fahreheitLink.addEventListener("click", displayFahreheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
