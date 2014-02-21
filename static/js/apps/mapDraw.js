// the current amount of miles traveled
var progressMiles = +location.search.replace(/^\?/,"");

// manually setting latitude, longitude
var startPoint = [40.24,-111.66];
var endPoint = [40.6700, -73.9400];

// manual entry of distance in miles
var tripDistanceMiles = 1972;

// figure out the percentage of miles. Max of 1
var progressPercent = Math.min(progressMiles/tripDistanceMiles, 1);

// calculate the latitude longitude point based on percentage miles travelled
var progressPoint = [startPoint[0] + (progressPercent * (endPoint[0]-startPoint[0])), startPoint[1] + (progressPercent * (endPoint[1]-startPoint[1]))];

// create map
var map = L.map('map');

// select stame map style
var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);

// start point pin
var marker = L.marker(startPoint).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>We're going to the New York! " + Math.round(tripDistanceMiles) + " miles");

// end point pin
var marker2 = L.marker(endPoint).addTo(map);
marker2.bindPopup("Degrees: ");

// progress pin
var progressMarker = L.marker(progressPoint).addTo(map);
progressMarker.bindPopup("You've made it " + progressMiles + " miles!").openPopup();

// progress line
var polyline = L.polyline([
  startPoint,
  progressPoint
]).addTo(map);

// set the map to show distance
if(progressPercent < .15){
  map.fitBounds([
    startPoint,
    progressPoint
    ])
} else {
  map.fitBounds([
    startPoint,
    endPoint
    ]);

}

function incrementProgress(){
  location.href= "/?" + (progressMiles + 20);

}
