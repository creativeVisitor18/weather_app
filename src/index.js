function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}, ${hours}:${minutes}`;
}

//function Date
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//function Search City
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let calledCity = cityInput.value;
  let apiKey = "5806d705fd98779db49e73f524f93d7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${calledCity}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//function change temperature
function showTemperature(response) {
  let temperature = response.data.main.temp;
  let changeTemp = document.querySelector("#temperaturePlaceholder");
  changeTemp.innerHTML = `${temperature}°C`;
}

//function change city
function showCity(response) {
  let city = response.data.name;
  let changeCity = document.querySelector("#cityPlaceholder");
  changeCity.innerHTML = `${city}`;
}

//function current Position
let buttonCurrent = document.querySelector("#currentLocationButton");
buttonCurrent.addEventListener("click", currentPosition);

navigator.geolocation.getCurrentPosition(currentPosition);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5806d705fd98779db49e73f524f93d7b";
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlPosition).then(showTemperature);
  axios.get(apiUrlPosition).then(showCurrentCity);
}

function showCurrentCity(response) {
  let city = response.data.name;
  let changeCity = document.querySelector("#cityPlaceholder");
  changeCity.innerHTML = `${city}`;
}
