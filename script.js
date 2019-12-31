const searchInput = $('#search-city');
const searchButton = $('#search-button');

const currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q='
const forecastWeather = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const key = '&APPID=786953f37f3a1158ba41f05aad533b5b';
const city = 'Seattle';

// HTML elements
const cityHeading = $('#city-name');

var currentWeatherObj = {
  "coord": { "lon": -122.33, "lat": 47.6 },
  "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }],
  "base": "stations",
  "main": { "temp": 280.8, "feels_like": 276.9, "temp_min": 279.26, "temp_max": 282.15, "pressure": 1027, "humidity": 76 },
  "visibility": 16093,
  "wind": { "speed": 3.6, "deg": 160 },
  "clouds": { "all": 90 },
  "dt": 1577756730,
  "sys": { "type": 1, "id": 3417, "country": "US", "sunrise": 1577721444, "sunset": 1577751955 },
  "timezone": -28800,
  "id": 5809844,
  "name": "Seattle",
  "cod": 200
}


cityHeading.text(currentWeatherObj.name);

function makeApiCall() {
  $.ajax({
    url: forecastWeather + city + key,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    currentWeatherObj = response;
  });
}


searchButton.on('click', function () {
  event.preventDefault();
  let searchCity = searchInput.val();
  console.log(searchCity);
  searchInput.val('');
  makeApiCall();
});

// a function converts Kelvin temperature to Fahrenheit and returns a string
function kelvinToFahrenheit(kelvin) {
  var fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
  fahrenheit = fahrenheit.toFixed(2);
  return fahrenheit;
}
