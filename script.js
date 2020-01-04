// HTML elements
const searchInput = $('#search-input');
const searchButton = $('#search-button');
const locateMeButton = $('#locate-me-button');
const recentCitiesDiv = $('#recent-cities');
const currentCityDiv = $('#current-city');
const weatherIconImg = $('#weather-icon');
const currentTemperatureDiv = $('#current-temperature');
const currentDetailDiv = $('#current-detail');
const forecastDiv = $('#forecast');
const forecastHeader = $('#forecast-header');

// Weather API constant
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const cityForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const coordUVIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?';
const key = '786953f37f3a1158ba41f05aad533b5b';

// Global variables
let recentCities = [];
let searchCity;

// constant event listeners
searchButton.on('click', searchButtonPressed);
searchInput.keypress(function (event) {
  if (event.which === 13) {
    searchButtonPressed();
  };
});
searchInput.on('keyup', switchButton);
locateMeButton.on('click', locateMe);
recentCitiesDiv.on('click', '#recent-city-button', checkRecentCityWeather);

// NEED TO add function to remove city on click !!!
recentCitiesDiv.on('click', '#remove-city-button', function () {
  let key = $(this);
  console.log(key.data('name'));
});


// initial call upon page load
init();


function init() {
  checkStorage();
  searchCity = recentCities[0] === undefined ? 'Seattle' : recentCities[0];
  makeApiCallByCity(searchCity);
  searchButton.hide();
  forecastHeader.hide();
  updateRecentCitiesDiv();
};

function checkStorage() {
  let storedData = JSON.parse(localStorage.getItem('recentCities'));
  recentCities = storedData === null ? recentCities : storedData;
};

// function switches search or locate me button on display
function switchButton() {
  if (searchInput.val()) {
    locateMeButton.hide();
    searchButton.show();
  } else {
    locateMeButton.show();
    searchButton.hide();
  };
};

// a function that checks for current location weather.
function locateMe() {
  if (!navigator.geolocation) {
    clearMainDivs();
    let message = $('<h2>');
    message.text('Geolocation is not supported by your browser ...');
    currentCityDiv.append(message);
  } else {
    clearMainDivs();
    let message = $('<h2>');
    message.text('Getting your local weather ...');
    currentCityDiv.append(message);
    navigator.geolocation.getCurrentPosition(success, error);
  };

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    makeApiCallByCoord(latitude, longitude);
  };

  function error() {
    clearMainDivs();
    let message = $('<h2>');
    message.text('Unable to retrieve your location ...');
    currentCityDiv.append(message);
  };
};


// put user input in makeApiCallByCity function
function searchButtonPressed() {
  event.preventDefault();
  let city = searchInput.val().trim();
  makeApiCallByCity(city);
  searchInput.val('');
};

// function that checks event target's weather from user click.
function checkRecentCityWeather() {
  let city = $(this).data('name');
  makeApiCallByCity(city);
};

// api call first out of three. call by city name. for current weather.
function makeApiCallByCity(city) {
  $.ajax({
    url: currentWeatherURL + 'q=' + city + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    currentWeatherObj = response;
    let city = currentWeatherObj.name + ', ' + currentWeatherObj.sys.country;
    weatherForecastByCity(city);
  });
};

// api call first out of three. call by coord. for current weather.
function makeApiCallByCoord(lat, lon) {
  $.ajax({
    url: currentWeatherURL + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    currentWeatherObj = response;
    let city = currentWeatherObj.name + ', ' + currentWeatherObj.sys.country;
    weatherForecastByCity(city);
  });
};

// api call second out of three. call for forecast data.
function weatherForecastByCity(city) {
  $.ajax({
    url: cityForecastURL + city + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    forecastWeatherObj = response;
    makeUVIndexApiCall(currentWeatherObj.coord.lat, currentWeatherObj.coord.lon);
  });
};

// api call third out of three. call by coord. for uv index.
function makeUVIndexApiCall(lat, lon) {
  $.ajax({
    url: coordUVIndexURL + '&lat=' + lat + '&lon=' + lon + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    currentUVObj = response;
    updateCurrentCityDiv();
    updateCurrentTempDiv();
    updateDetailDiv();
    updateForecastDiv();
    updateRecentCitiesArr();
  });
};

// update recentCities array.
function updateRecentCitiesArr() {
  let city = currentWeatherObj.name;
  let country = currentWeatherObj.sys.country;
  let string = (city + ', ' + country);
  if (recentCities.includes(string)) {
    return;
  } else {
    if (recentCities.length >= 8) {
      recentCities.pop();
    };
    recentCities.unshift(string);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    updateRecentCitiesDiv();
  };
};

// need to fix remove button.
// a function that updates recent-cities div
function updateRecentCitiesDiv() {
  recentCitiesDiv.empty();
  for (i in recentCities) {
    let cityDiv = $('<div>');
    cityDiv.attr('class', 'btn-group');
    cityDiv.attr('role', 'group');
    let city = $('<button>');
    let removeButton = $('<button>');
    removeButton.attr('class', 'btn btn-light w-25');
    removeButton.attr('id', 'remove-city-button');
    removeButton.attr('data-name', recentCities[i]);
    city.attr('class', 'btn btn-light w-100');
    city.attr('id', 'recent-city-button');
    city.attr('data-name', recentCities[i]);
    city.text(recentCities[i]);
    cityDiv.append(city);
    cityDiv.append(removeButton);
    recentCitiesDiv.append(cityDiv);
  };
};

function updateCurrentCityDiv() {
  currentCityDiv.empty();
  let city = currentWeatherObj.name;
  let country = currentWeatherObj.sys.country;
  let currentDate = convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone);
  let currentDescription = currentWeatherObj.weather[0].description;
  let currentImgIcon = currentWeatherObj.weather[0].icon;
  let html = "<h2>" + city + ", " + country + "</h2>"
    + "<h4>" + currentDate.format("MMM Do, YYYY h:mm a") + "</h4>"
    + "<p>" + currentDescription + "</p>"
    + "<hr>";
  currentCityDiv.append(html);
  weatherIconImg.attr('src', "./assets/" + currentImgIcon + "@2x.png");
};

function updateCurrentTempDiv() {
  currentTemperatureDiv.empty();
  let currentTemp = kelvinToFahrenheit(currentWeatherObj.main.temp);
  let feelsLikeTemp = kelvinToFahrenheit(currentWeatherObj.main.feels_like);
  let highTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_max);
  let lowTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_min);
  let html = "<p> Now: " + currentTemp + "<br>"
    + "Feels like: " + feelsLikeTemp + "<br>"
    + "High: " + highTemp + "<br>"
    + "Low: " + lowTemp + "<br></p>";
  currentTemperatureDiv.append(html);
};

function updateDetailDiv() {
  currentDetailDiv.empty();
  let sunrise = convertUTC(currentWeatherObj.sys.sunrise, currentWeatherObj.timezone).format('h:mm a');
  let sunset = convertUTC(currentWeatherObj.sys.sunset, currentWeatherObj.timezone).format("h:mm a");
  let humidity = currentWeatherObj.main.humidity + '%';
  let windSpeed = mpsToMph(currentWeatherObj.wind.speed);
  let uvIndex = currentUVObj.value;
  let html = "<p> Sunrise: " + sunrise + "<br>"
    + "Sunset: " + sunset + "<br>"
    + "Humidity: " + humidity + "<br>"
    + "Wind Speed: " + windSpeed + " mph<br>"
    + "UV Index: " + uvIndex + "</p>";
  currentDetailDiv.append(html);
};

function updateForecastDiv() {
  forecastDiv.empty();
  forecastHeader.show();
  var index = 0;
  for (var i = 0; i < 5; ++i) {
    let html = '<div class="col-4 col-md-2 py-2 mb-2 mx-auto border border-secondary rounded">'
      + '<h5 class="text-center">' + convertUTC(forecastWeatherObj.list[index].dt, forecastWeatherObj.city.timezone).format('MMM Do') + '</h5>'
      + '<hr>'
      + '<img class="w-100" src="./assets/' + forecastWeatherObj.list[index].weather[0].icon + '@2x.png" alt="weather icon">'
      + '<p>' + 'Temperature: <br>' + kelvinToFahrenheit(forecastWeatherObj.list[index].main.temp) + '<br>' + '<hr>'
      + 'Humidity: ' + forecastWeatherObj.list[index].main.humidity + '%</p>' + '</div>';
    forecastDiv.append(html);
    index += 8;
  };
};

// function that clears main divs, used in checking current location.
function clearMainDivs() {
  currentCityDiv.empty();
  weatherIconImg.attr('src', '');
  currentTemperatureDiv.empty();
  currentDetailDiv.empty();
  forecastHeader.hide();
  forecastDiv.empty();
};


// a function that takes unix utc and timezone difference and returns to local time
function convertUTC(utc, timezone) {
  let localTime = (utc + timezone);
  localTime = moment.unix(localTime).utc(false);
  return (localTime);
};

// a function converts Kelvin temperature to Fahrenheit and returns a string
function kelvinToFahrenheit(kelvin) {
  var fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
  fahrenheit = fahrenheit.toFixed(2);
  fahrenheit = fahrenheit + ' ' + String.fromCharCode(176) + 'F';
  return fahrenheit;
};

// a function that converts meter per second to mile per hour
function mpsToMph(mps) {
  let mph = mps * 60 * 60 / 1609.34;
  mph = mph.toFixed(2);
  return mph;
};
