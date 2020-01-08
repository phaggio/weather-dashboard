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
const daysForecastDiv = $('#days-forecast');
const forecastHeader = $('.forecast-header');
const forecastDaysButtons = $('#forecast-days');

// Weather API constant
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const cityForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const coordUVIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?';
const key = '786953f37f3a1158ba41f05aad533b5b';

// Global variables
let currentWeatherObj = {};
let currentUVObj = {};
let forecastWeatherObj = {};
let recentCities = [];
let searchCity = 'Seattle';
let daysForecast = 3;

// constant event listeners
searchButton.on('click', searchButtonPressed);
searchInput.keypress(function (event) {
  if (event.which === 13) {
    if (searchInput.val().trim() === '') {
      locateMe();
    } else {
      searchButtonPressed();
    };
  };
});
searchInput.on('keyup', switchButton);
locateMeButton.on('click', locateMe);
recentCitiesDiv.on('click', '#recent-city-button', checkRecentCityWeather);
recentCitiesDiv.on('click', '#remove-city-button', removeRecentCity);
forecastDaysButtons.on('click', 'input', updateDaysForecast);


// initial call upon page load
init();


function init() {
  checkStorage();
  searchCity = recentCities[0] === undefined ? searchCity : recentCities[0];
  currentWeatherApiCall(searchCity);
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
  if (searchInput.val().trim()) {
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
    let message = $('<h2>').text('Getting your local weather...');
    let timeoutMessage = $('<h4>').text('(timeout after 60 seconds)');
    currentCityDiv.append(message);
    currentCityDiv.append(timeoutMessage);
    let options = { timeout: 60000 };
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    currentWeatherApiCall(null, latitude, longitude);
  };

  function error() {
    clearMainDivs();
    let message = $('<h2>');
    message.text('Unable to retrieve your location ...');
    currentCityDiv.append(message);
  };
};

// put user input in currentWeatherApiCall function
function searchButtonPressed() {
  event.preventDefault();
  let city = searchInput.val().trim();
  currentWeatherApiCall(city);
  searchInput.val('');
};

// update number of days in forecast days
function updateDaysForecast() {
  let selectedDays = $(this).data('name');
  daysForecast = selectedDays;
  updateDaysForecastDiv();
};

// function that checks event target's weather from user click.
function checkRecentCityWeather() {
  let city = $(this).data('name');
  currentWeatherApiCall(city);
};

// function that removes selected recent city from the recentCities array and update the list.
function removeRecentCity() {
  let key = $(this).data('index');
  recentCities.splice(key, 1);
  updateRecentCitiesDiv();
};

// first api call for current weather.
function currentWeatherApiCall(city, lat, lon) {
  clearMainDivs();
  let message = $('<h2>').text('Getting weather info ...')
  currentCityDiv.append(message);

  if (city !== null) {
    $.ajax({
      url: currentWeatherURL + 'q=' + city + '&APPID=' + key,
      method: 'GET',
      statusCode: {
        404: function () {
          alert('We cannot find that city! (404)')
        }
      }
    }).then(function (response) {
      currentWeatherObj = response;
      let city = currentWeatherObj.name + ', ' + currentWeatherObj.sys.country;
      forecastApiCall(city);
    });
  } else {
    $.ajax({
      url: currentWeatherURL + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key,
      method: 'GET',
      statusCode: {
        404: function () {
          alert('We cannot find that city! (404)')
        }
      }
    }).then(function (response) {
      currentWeatherObj = response;
      let city = currentWeatherObj.name + ', ' + currentWeatherObj.sys.country;
      forecastApiCall(city);
    });
  };
};

// second api call for forecast data.
function forecastApiCall(city) {
  $.ajax({
    url: cityForecastURL + city + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    forecastWeatherObj = response;
    makeUVIndexApiCall(currentWeatherObj.coord.lat, currentWeatherObj.coord.lon);
  });
};

// third api call for uv index, then updates divs.
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
    updateDaysForecastDiv();
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
    updateRecentCitiesDiv();
  };
};

// a function that updates recent-cities div
function updateRecentCitiesDiv() {
  recentCitiesDiv.empty();
  for (i in recentCities) {
    let cityDiv = $('<div>').attr({
      class: 'btn-group',
      role: 'group'
    });
    let city = $('<button>').attr({
      class: 'btn btn-light w-100',
      id: 'recent-city-button',
      'data-name': recentCities[i].toString(),
      'data-index': i.toString()
    });
    city.text(recentCities[i]);

    let removeButton = $('<button>').attr({
      class: 'btn btn-light w-25',
      id: 'remove-city-button',
      'data-name': recentCities[i].toString(),
      'data-index': i.toString()
    });
    let removeButtonIcon = $('<i>').attr('class', 'material-icons').text('delete_outline');
    removeButton.append(removeButtonIcon);
    cityDiv.append(city);
    cityDiv.append(removeButton);
    recentCitiesDiv.append(cityDiv);
  };
  localStorage.setItem('recentCities', JSON.stringify(recentCities));
};

function updateCurrentCityDiv() {
  currentCityDiv.empty();
  let city = currentWeatherObj.name;
  let country = currentWeatherObj.sys.country;
  let currentDate = convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone);
  let currentDescription = currentWeatherObj.weather[0].description;
  let currentImgIcon = currentWeatherObj.weather[0].icon;
  weatherIconImg.attr('src', "./assets/" + currentImgIcon + "@2x.png");
  let html = "<h2>" + city + ", " + country + "</h2>"
    + "<h4>" + currentDate.format("MMM Do, YYYY") + '<br>' + currentDate.format("h:mm a") + "</h4>"
    + "<p>" + currentDescription + "</p>" + "<hr>";
  currentCityDiv.append(html);
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
    + "Low: " + lowTemp + "</p>";
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
  for (var i = 0; i < 6; ++i) {
    let date = convertUTC(forecastWeatherObj.list[i].dt, forecastWeatherObj.city.timezone);
    let html =
      '<div class="card d-flex align-items-center px-2 mb-1 mx-0 mx-sm-1 mx-md-auto">'
      + '<div class="card-body p-2">'
      + '<h6 class="text-center">' + date.format('h:mm a') + '<br>' 
      + '<small>' + date.format('MMM Do') + '</small>'
      + '</div>'
      + '<img class="mh-75" src="./assets/' + forecastWeatherObj.list[i].weather[0].icon + '@2x.png" alt="weather icon">'
      + '<div class="card-body p-2">'
      + '<small class="text-break">' + 'Temperature: ' + '<br>' + kelvinToFahrenheit(forecastWeatherObj.list[i].main.temp) + '<br>'
      + 'Humidity: ' + '<br>' + forecastWeatherObj.list[i].main.humidity + '%</small>'
      + '</div>'  
      + '</div>'
    forecastDiv.append(html);
  };
};

function updateDaysForecastDiv() {
  daysForecastDiv.empty();
  let header = $('#days-forecast-header');
  header.text(daysForecast + '-Days Forecast');
  forecastHeader.show();
  var index = 7;
  for (var i = 0; i < daysForecast; ++i) {
    let date = convertUTC(forecastWeatherObj.list[index].dt, forecastWeatherObj.city.timezone);
    let html =
      '<div class="row py-1 px-sm-2 mb-1 border border-secondary rounded d-flex align-items-center">'
      + '<div class="col-3">'
      + '<h5 class="px-sm-2">' + date.format('dddd') + '</h5>'
      + '<h6 class="px-sm-2">' + date.format('MMM Do') + '</h6>'
      + '</div>'
      + '<div class="col-3">'
      + '<img class="mh-25" src="./assets/' + forecastWeatherObj.list[index].weather[0].icon + '@2x.png" alt="weather icon">'
      + '</div>'
      + '<div class="col-6">'
      + '<p class="text-break px-2">' + 'Temperature: ' + kelvinToFahrenheit(forecastWeatherObj.list[index].main.temp) + '<br>'
      + 'Humidity: ' + forecastWeatherObj.list[index].main.humidity + '%</p>'
      + '</div>'
      + '</div>'
    daysForecastDiv.append(html);
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
  daysForecastDiv.empty();
};

// a function that takes unix utc and timezone difference and returns to local time
function convertUTC(utc, timezone) {
  let localTime = (utc + timezone);
  localTime = moment.unix(localTime).utc(false);
  return (localTime);
};

// a function converts Kelvin temperature to Fahrenheit and returns a string
function kelvinToFahrenheit(kelvin) {
  var fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
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