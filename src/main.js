import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import InsightService from './insight-service.js';

// Write a function that deals with Sols (Martian days since the Mars Rover landed) and converts them to days on the Earth's calendar

// Martian weather API query: Display the per-SOL summary data for each of the last seven available Sols (Martian Days). Wind? Temp? Pressure? which units?
$('#get-weather').on("click", function() {
  let promise = InsightService.getWeather();
  promise.then(function(response) {
    const body = JSON.parse(response);
    const solsArray = Object.keys(body);
    for (let i = 0; i < solsArray.length; i++) {
      $('.results-display').append(`The average pressure for Sol ${solsArray[i]} was ${body[solsArray[i]]["PRE"]["av"]} Pa <br>`);
    }
  }, function(error) {
    $('.results-display').append(`There was an error processing your request: ${error}`);
  });
});


// Astronomy pic of the day


// views from the Mars Rover