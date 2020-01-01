// HTML elements
const searchInput = $('#search-city');
const searchButton = $('#search-button');
const currentCityDiv = $('#current-city');

// Weather API constant
const currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q='
const forecastWeather = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const key = '&APPID=786953f37f3a1158ba41f05aad533b5b';
const searchCity = 'Seattle';

// current weather Obj.
let currentWeatherObj = {
  "coord": {
    "lon": -122.33
    , "lat": 47.6
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 280.8, // current temperature in K
    "feels_like": 276.9,
    "temp_min": 279.26,
    "temp_max": 282.15,
    "pressure": 1027,
    "humidity": 76
  },
  "visibility": 16093,
  "wind": {
    "speed": 3.6, // meters per second
    "deg": 160 // degree, 160 is South-Southeast
  },
  "clouds": { "all": 90 },
  "dt": 1577756730, // Tuesday, December 31, 2019 1:45:30 AM UTC or Monday, December 30, 2019 5:45:30 PM GMT-08:00
  "sys": { "type": 1, "id": 3417, "country": "US", "sunrise": 1577721444, "sunset": 1577751955 },
  "timezone": -28800,
  "id": 5809844,
  "name": "Seattle",
  "cod": 200
}

// parsed current weather variables
console.log(convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone));

// update current weather div
// function updateCurrentWeather() {
  let city = currentWeatherObj.name;
  let country = currentWeatherObj.sys.country;
  let currentDate = convertUTC(currentWeatherObj.dt, currentWeatherObj.timezone);
// }
// cityHeading.text(currentWeatherObj.name);


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
  let currentEpochTime = (utc + timezone);
  currentEpochTime = moment.unix(currentEpochTime).utc(false);
  return (currentEpochTime.format('MM-DD-YYYY h:mm a'));
};


// a function converts Kelvin temperature to Fahrenheit and returns a string
function kelvinToFahrenheit(kelvin) {
  var fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
  fahrenheit = fahrenheit.toFixed(2);
  return fahrenheit;
};
