var progressMiles = +location.search.replace(/^\?/,"");

var startPoint = [40.24,-111.66];
var endPoint = [40.6700, -73.9400];

var tripDistanceLatLong = Math.sqrt( Math.pow(startPoint[0] - endPoint[0], 2) + Math.pow(startPoint[1] - endPoint[1], 2));

var tripDistanceMiles = 1972;

var degreeToMilesratio = tripDistanceLatLong/tripDistanceMiles;

var progressPercent = (degreeToMilesratio * progressMiles)/tripDistanceLatLong;

var progressPoint = [startPoint[0] + (progressPercent * (endPoint[0]-startPoint[0])), startPoint[1] + (progressPercent * (endPoint[1]-startPoint[1]))];

var map = L.map('map').setView(startPoint, 9);
var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);

var marker = L.marker(startPoint).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>We're going to the New York! " + Math.round(tripDistanceMiles) + " miles");

var marker2 = L.marker(endPoint).addTo(map);
marker2.bindPopup("Degrees: " + tripDistanceLatLong);

var progressMarker = L.marker(progressPoint).addTo(map);
progressMarker.bindPopup("Progress: " + progressPoint[0] + ", " + progressPoint[1]);

var polyline = L.polyline([
  startPoint,
  progressPoint
]).addTo(map);

map.fitBounds(polyline.getBounds());

function incrementProgress(){
  location.href= "/?" + (progressMiles + 20);

}
