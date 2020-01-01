// HTML elements
const searchInput = $('#search-input');
const searchButton = $('#search-button');
const currentCityDiv = $('#current-city');
const weatherIconImg = $('#weather-icon');
const temperatureDiv = $('#current-temperature');
const detailDiv = $('#current-detail');

// Weather API constant
const currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q=';
const forecastWeather = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const key = '&APPID=786953f37f3a1158ba41f05aad533b5b';
const searchCity = 'Seattle';

// current weather Obj.
let currentWeatherObj = {"coord":{"lon":-122.33,"lat":47.6},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":283.9,"feels_like":278.31,"temp_min":282.04,"temp_max":285.37,"pressure":1004,"humidity":81},"visibility":16093,"wind":{"speed":7.2,"deg":220,"gust":11.3},"clouds":{"all":75},"dt":1577867176,"sys":{"type":1,"id":3417,"country":"US","sunrise":1577894250,"sunset":1577924861},"timezone":-28800,"id":5809844,"name":"Seattle","cod":200};

let currentUVObj = {
  "lat": 47.6,
  "lon": -122.33, 
  "date_iso": "2020-01-01T12:00:00Z", 
  "date": 1577880000, 
  "value": 0.58
};

// parsed Obj values
let city = currentWeatherObj.name;
let country = currentWeatherObj.sys.country;
let currentDate = convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone);
let currentDescription = currentWeatherObj.weather.description;
let currentImgIcon = currentWeatherObj.weather.icon;

let currentTemp = kelvinToFahrenheit(currentWeatherObj.main.temp);
let feelsLikeTemp = kelvinToFahrenheit(currentWeatherObj.main.feels_like);
let highTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_min);
let lowTemp = kelvinToFahrenheit(currentWeatherObj.main.temp_min);

let sunrise = convertUTC(currentWeatherObj.sys.sunrise, currentWeatherObj.timezone).format('h:mm a');
let sunset = convertUTC(currentWeatherObj.sys.sunset, currentWeatherObj.timezone).format("h:mm a");
let humidity = currentWeatherObj.main.humidity + '%';
let windSpeed = mpsToMph(currentWeatherObj.wind.speed);
let uvIndex = currentUVObj.value;

console.log(city, currentDate.format('MM-DD h:mm a'), currentTemp);
console.log(sunrise, sunset, humidity);
console.log(windSpeed);



searchButton.on('click', function () {
  event.preventDefault();
  let searchCity = searchInput.val();
  console.log(searchCity);
  searchInput.val('');
  makeApiCall();
});


// a function that makes api call to openweathermap when user clicks on the search button
function makeApiCall() {
  $.ajax({
    url: currentWeather + searchCity + key,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    currentWeatherObj = response;
    // console log out local time from the api call
    console.log(convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone));
    // updateCurrentWeather();
  });
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
  return fahrenheit;
};

// a function that converts meter per second to mile per hour
function mpsToMph(mps) {
  let mph = mps * 60 * 60 / 1609.34;
  mph = mph.toFixed(2);
  return mph;
};