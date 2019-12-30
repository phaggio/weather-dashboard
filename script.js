const searchInput = $('#search-city');
const searchButton = $('#search-button');

const URL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=';
const key = '786953f37f3a1158ba41f05aad533b5b';
const queryURL = 'api.openweathermap.org/data/2.5/weather?q=';
const city = 'Seattle';
var title = 'space+jam';
var query = 'https://www.omdbapi.com/?t=' + title + '&y=&plot=short&apikey=trilogy';


$.ajax({
    url: query,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    console.log(response.Runtime);
  });
$.ajax({
    url: queryURL + city,
    method: 'GET',
    dataType: 'json'
  }).then(function(response) {
    console.log(response);
  });



searchButton.on('click', function () {
    event.preventDefault();
    let searchCity = searchInput.val();
    console.log(searchCity);
    searchInput.val('');
});
