# weather-dashboard

![alt text][logo]

[logo]:https://raw.githubusercontent.com/phaggio/weather-dashboard/master/screenshot/weather-dashboard.png

application link: https://phaggio.github.io/weather-dashboard/

## Overview
This is a weather dashboard, where user can search for a city and find its current weather condition, 3-hour interval forecast, and 5-days weather forecast of the city.

The current weather info includes:
* current temperature
* feel like temperature
* high temperature of the remainder of the day
* low temperature of the remainder of the day
* sunrise time
* sunset time
* humidity
* wind speed (mph)
* UV index

Forecast includes: 
* temperature and humidity in a 3-hour interval for the next 18 hours
* temperature and humidity of the next 5 days

Many cities have the same name, so for the best result, include the country code when you search for a city (e.g. search 'San Jose, US').

## Features
* User can input desire name of the city (e.g. 'city name, country code') and click on the search button or press enter to get its current and forecast weather
* When search field is empty, search button is hidden and a location button is shown instead, user can click on the location button for current location's weather info
* If city is not found (incorrect name or typo), it will alert the user
* If the it takes too long to get your current location, (more than 60 seconds), the request will time out and display the time out message
* Most recent 8 city searches are saved in the 'Recent cities' section
* User can click on the recent city search for the city's weather info
* User can delete specific recent city search by clicking on the delete button next to the city
* User can choose number of days (3 or 5) in weather forecast 

## Libraries and Frameworks used
* jQuery
* Moment.js
* Bootstrap
* Google Fonts


## Contributing
If you like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.