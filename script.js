// HTML elements
const searchInput = $('#search-input');
const searchButton = $('#search-button');
const locateMeButton = $('#locate-me-button');
const recentCitiesDiv = $('#recent-cities');
const currentCityDiv = $('#current-city');
const weatherIconImg = $('#weather-icon');
const temperatureDiv = $('#current-temperature');
const detailDiv = $('#current-detail');
const forecastDiv = $('#forecast');

// Weather API constant
const cityWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const coordWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const cityForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const coordUVIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?';
const key = '786953f37f3a1158ba41f05aad533b5b';
const imperial = '&units=imperial';
const metric = '&units=metric';

// Global variables
let searchCity = 'Seattle';
let recentCities = ['Seattle, US', 'New York, US', 'San Jose, US'];


// constant event listeners
searchButton.on('click', searchButtonPressed);
searchInput.keypress(function (event) {
  if (event.which === 13) {
    searchButtonPressed();
  };
});
searchInput.on('keyup', switchButton);
locateMeButton.on('click', locateMe);



// initial call upon page load
makeApiCallByCity(searchCity);
searchButton.hide();



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

// test current location function
function locateMe() {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser.');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    makeApiCallByCoord(latitude, longitude);
  };

  function error() {
    console.log('Unable to retrieve your location.');
  };
};


// put user input in makeApiCallByCity function
function searchButtonPressed() {
  // searchButton.prop('disabled', true);
  event.preventDefault();
  searchCity = searchInput.val();
  makeApiCallByCity(searchCity);
  searchInput.val('');
};

// a function that makes weather api call by city name to openweathermap when user clicks on the search button
function makeApiCallByCity(city) {
  $.ajax({
    url: cityWeatherURL + city + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    currentWeatherObj = response;
    makeUVIndexApiCall(currentWeatherObj.coord.lat, currentWeatherObj.coord.lon);
  });

  $.ajax({
    url: cityForecastURL + city + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    forecastWeatherObj = response;
  });
};

function makeApiCallByCoord(lat, lon) {
  $.ajax({
    url: coordWeatherURL + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
    currentWeatherObj = response;
    makeUVIndexApiCall(currentWeatherObj.coord.lat, currentWeatherObj.coord.lon);
  });
};

// take lat and lon data from currentWeatherObj and make UV Index API call, then calls div updates
function makeUVIndexApiCall(lat, lon) {
  $.ajax({
    url: coordUVIndexURL + '&APPID=' + key + '&lat=' + lat + '&lon=' + lon,
    method: 'GET'
  }).then(function (response) {
    currentUVObj = response;
    updateCurrentCityDiv();
    updateCurrentTempDiv();
    updateDetailDiv();
    updateForecastDiv();
    searchButton.prop('disabled', false);
  });
};



// a function that updates recent-cities div
function updateRecentCitiesDiv() {
  for (i in recentCities) {
    recentCitiesDiv.empty();
    let city = $('<button>');
    city.attr('class', 'btn btn-light w-100');
    city.attr('data-name', recentCities[i]);
    city.text(recentCities[i]);
    recentCitiesDiv.append(city);
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
  temperatureDiv.empty();
  let currentTemp = kelvinToFahrenheit(currentWeatherObj.main.temp);
  let feelsLikeTemp = kelvinToFahrenheit(currentWeatherObj.main.feels_like);
  let highTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_max);
  let lowTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_min);
  let html = "<p> Now: " + currentTemp + "<br>"
    + "Feels like: " + feelsLikeTemp + "<br>"
    + "High: " + highTemp + "<br>"
    + "Low: " + lowTemp + "<br></p>";
  temperatureDiv.append(html);
};

function updateDetailDiv() {
  detailDiv.empty();
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
  detailDiv.append(html);
};

function updateForecastDiv() {
  forecastDiv.empty();
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
