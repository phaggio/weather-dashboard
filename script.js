// HTML elements
const searchInput = $('#search-input');
const searchButton = $('#search-button');
const locateMeButton = $('#locate-me-button');
const countrySelection = $('#country-select');
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
let searchCountry = 'US';
let daysForecast = 3;

const init = () => {
  checkStorage();
  currentWeatherApiCall(searchCity, searchCountry);
  searchButton.hide();
  forecastHeader.hide();
  updateRecentCitiesDiv();
};

const checkStorage = () => {
  let storedData = JSON.parse(localStorage.getItem('recentCities'));
  recentCities = storedData === null ? recentCities : storedData;
  if (recentCities[0] !== undefined) {
    searchCity = (recentCities[0].slice(0, recentCities[0].indexOf(',')));
    searchCountry = (recentCities[0].substring(recentCities[0].indexOf(',') + 1).trim());
  };
};

// function switches search or locate me button on display
const switchButton = () => {
  if (searchInput.val().trim()) {
    locateMeButton.hide();
    searchButton.show();
  } else {
    locateMeButton.show();
    searchButton.hide();
  };
};

// a function that checks for current location weather.
const locateMe = () => {
  const success = position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    currentWeatherApiCall(null, null, latitude, longitude);
  };

  const error = () => {
    clearMainDivs();
    let message = $('<h2>');
    message.text('Unable to retrieve your location ...');
    currentCityDiv.append(message);
  };

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
};

// put user input in currentWeatherApiCall function
const searchButtonPressed = () => {
  event.preventDefault();
  searchCity = searchInput.val().trim();
  currentWeatherApiCall(searchCity, searchCountry);
  searchInput.val('');
  switchButton();
};

// update searchCountry
const updateSearchCountry = () => {
  searchCountry = countrySelection.val();
};

// update number of days in forecast days
const updateDaysForecast = () => {
  let selectedDays = $(this).data('name');
  daysForecast = selectedDays;
  updateDaysForecastDiv();
};

// function that checks event target's weather from user click.
const checkRecentCityWeather = () => {
  let comma = $(this).data('name').indexOf(',');
  let city = $(this).data('name').slice(0, comma);
  let country = $(this).data('name').substring(comma + 1).trim();
  currentWeatherApiCall(city, country);
};

// function that removes selected recent city from the recentCities array and update the list.
const removeRecentCity = () => {
  let key = $(this).data('index');
  recentCities.splice(key, 1);
  updateRecentCitiesDiv();
};

// first api call for current weather.
const currentWeatherApiCall = (city, country, lat, lon) => {
  clearMainDivs();
  let message = $('<h2>').text('Getting weather info ...')
  currentCityDiv.append(message);
  country = country === null ? searchCountry : country
  if (city !== null) {
    $.ajax({
      url: currentWeatherURL + 'q=' + city + ',' + country + '&APPID=' + key,
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
      searchCountry = response.sys.country;
      let city = currentWeatherObj.name + ', ' + currentWeatherObj.sys.country;
      forecastApiCall(city);
    });
  };
};

// second api call for forecast data.
const forecastApiCall = city => {
  $.ajax({
    url: cityForecastURL + city + ',' + searchCountry + '&APPID=' + key,
    method: 'GET'
  }).then(function (response) {
    forecastWeatherObj = response;
    makeUVIndexApiCall(currentWeatherObj.coord.lat, currentWeatherObj.coord.lon);
  });
};

// third api call for uv index, then updates divs.
const makeUVIndexApiCall = (lat, lon) => {
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
const updateRecentCitiesArr = () => {
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
const updateRecentCitiesDiv = () => {
  recentCitiesDiv.empty();
  for (let i = 0; i < recentCities.length; ++i) {
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

const updateCurrentCityDiv = () => {
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

const updateCurrentTempDiv = () => {
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

const updateDetailDiv = () => {
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

const updateForecastDiv = () => {
  forecastDiv.empty();
  forecastHeader.show();
  for (let i = 0; i < 6; ++i) {
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

const updateDaysForecastDiv = () => {
  daysForecastDiv.empty();
  let header = $('#days-forecast-header');
  header.text(daysForecast + '-Days Forecast');
  forecastHeader.show();
  let index = 7;
  for (let i = 0; i < daysForecast; ++i) {
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
const clearMainDivs = () => {
  currentCityDiv.empty();
  weatherIconImg.attr('src', '');
  currentTemperatureDiv.empty();
  currentDetailDiv.empty();
  forecastHeader.hide();
  forecastDiv.empty();
  daysForecastDiv.empty();
};

// a function that takes unix utc and timezone difference and returns to local time
const convertUTC = (utc, timezone) => {
  let localTime = (utc + timezone);
  localTime = moment.unix(localTime).utc(false);
  return (localTime);
};

// a function converts Kelvin temperature to Fahrenheit and returns a string
const kelvinToFahrenheit = kelvin => {
  let fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
  fahrenheit = fahrenheit.toFixed(2);
  fahrenheit = fahrenheit + ' ' + String.fromCharCode(176) + 'F';
  return fahrenheit;
};

// a function that converts meter per second to mile per hour
const mpsToMph = mps => {
  let mph = mps * 60 * 60 / 1609.34;
  mph = mph.toFixed(2);
  return mph;
};


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
countrySelection.on('change', updateSearchCountry);
recentCitiesDiv.on('click', '#recent-city-button', checkRecentCityWeather);
recentCitiesDiv.on('click', '#remove-city-button', removeRecentCity);
forecastDaysButtons.on('click', 'input', updateDaysForecast);


// initial call upon page load
init();