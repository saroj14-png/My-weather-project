// Time
function formatTime(time) {
  let hour = time.getHours();
  let min = time.getMinutes();

  return `${hour}:${min}`;
}
//date
function formatDate(now) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "December",
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
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
  document.querySelector("#localTemperture").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feellike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );

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
