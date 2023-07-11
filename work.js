// Time
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mins = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
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
  return `${day} ${date1}, ${month} ${year} `;
}
//Display 5 days forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ae24bf3b7efaa11e784aefb48ae9f617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log();
}

//show current city and Temperature of it
function displayWeather(response) {
  console.log(response);
  document.querySelector("#cityName").innerHTML = response.data.name;
  //display full country name
  const countryCode = response.data.sys.country;

  // Make a request to the REST Countries API
  fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
    .then((response) => response.json())
    .then((data) => {
      const fullName = data.name; // Retrieve the full name of the country from the API response
      document.querySelector("#location").innerHTML = fullName; // Display the full name in the HTML element with the id "location"
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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

  getForecast(response.data.coord);
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
