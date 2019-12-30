var city = $('#search-city');
var searchButton = $('#search-button');

searchButton.on('click', function () {
    event.preventDefault();
    console.log(city.val());
});
