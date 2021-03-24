import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import InsightService from './insight-service.js';
import AstronomyPic from './astronomy-pic-service.js';
import MarsPics from './mars-rover-service.js';

$('#get-weather').on("click", function() {
  $('.results-display').empty();
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

$('#get-pic').on("click", function() {
  $('.show-pic').empty();
  let promise = AstronomyPic.getPic();
  promise.then(function(response) {
    const body = JSON.parse(response);
    const picture = body["url"];
    $('.show-pic').append(`<img src=${picture} alt=${body["explanation"]}>`);
    $('.show-pic').append(`<p>${body["explanation"]}</p>`);
    
  }, function(error) {
    $('.results-display').append(`There was an error processing your request: ${error}`);
  });
});

$('#get-pics').on("click", function() {
  $('.results-display').empty();
  let promise = MarsPics.getPicsEarthDay(returnTodayAsString());
  promise.then(function(response) {
    const body = JSON.parse(response);
    for (let i = 0; i < body.photos.length; i++) {
      $('.results-display').append(`<img src=${body.photos[i]["img_src"]}> <p>${body.photos[i]["camera"]["full_name"]}</p><br><p>Taken on ${body.photos[i]["earth_date"]}</p>`);
    }
  }, function(error) {
    $('.results-display').append(`There was an error. Namely, ${error}`);
  });
});
function returnTodayAsString() {
  let earthDate = new Date();
  earthDate.setDate(earthDate.getDate()-1);
  return earthDate.toISOString().slice(0,10);
}