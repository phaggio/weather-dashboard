# weather-dashboard
application link: https://phaggio.github.io/weather-dashboard/

## Overview
This is a weather dashboard, where user can search for a city and find its current weather condition, 3-hour interval forecast, and 5-days weather forecast of the city.

Many cities have the same name, so it is best to include the country code when you search for a city (e.g. search 'San Jose, US').

## Features
* User can input desire name of the city (e.g. 'city name, country code') and click on the search button or press enter to get its current and forecast weather
* When search field is empty, search button is hidden and a location button is shown instead, user can click on the location button for current location's weather info
* If the it takes too long to get the weather api response (more than 60 seconds), the call will time out and display the time out message
* Most recent 8 city searches are saved in the 'Recent cities' section
* User can click on the recent city search for the city's weather info
* User can delete specific recent city search by clicking on the delete button next to the city

## Libraries and Frameworks used
* Jquery
* Moment.js
* Bootstrap
* Google Fonts


## Contributing
If you like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.