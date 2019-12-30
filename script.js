var city = $('#search-city');
var searchButton = $('#search-button');

searchButton.on('click', function () {
    event.preventDefault();
    let searchCity = city.val();
    console.log(searchCity);
    city.val('');
});
