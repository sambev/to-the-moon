// fake milestone data
var milestones = [
  {distance: 13 , label : 'Half Marathon'},
  {distance: 26.2 , label : "Marathon"},
  {distance: 42 , label : "This distance is the answer, but what is the question?"},
  {distance: 0.10511, label : "The height of the Washington Monument"},
  {distance: 0.25246, label : "The farthest thrown object ever (an aerobie!)"},
  {distance: 0.3363, label : "The height of One World Trade Center"},
  {distance: 0.5155, label : "The height of the Burj Khalifa, the worlds tallest building"},
  {distance: 3.22, label : "Bullets can't hit you!  You've run farther than any of them can fly!"},
  {distance: 17, label : "The circumference of the Large Hadron Collider"},
  {distance: 21.46, label : "You've run around Halley's Comet."},
  {distance: 24.2, label : "You've run around the moon! (well, around Deimos, a moon of Mars"},
  {distance: 39.02, label : "The circumference of a neutron star"},
  {distance: 43.31, label : "The circumference of Phobos, the other moon of Mars"},
  {distance: 44.8, label : "From Provo to SLC"},
  {distance: 50, label : "The height of the aurora borealis"},
  {distance: 68, label : "The length of the Provo River"},
  {distance: 230 , label : "The height of the International Space Station"},
  {distance: 500, label : "Would you walk 500 more?"},
  {distance: 100, label : "Your first century!"},
  {distance: 894, label : "The length of the Colorado River"},
  {distance: 1025, label : "The circumference of the asteroid Vesta"},
  {distance: 1795, label : "You've waltzed the length of the blue Danube!"},
  {distance: 1900, label : "Her name is Rio, and she's dancing on the Sand.  You've run the Rio Grande!"},
  {distance: 0.012, label : "Vous êtes un petit prince. You're run around asteroid B-612!"},
  {distance: 0.86, label : "Distance a blood cell flows in a day"},
  {distance: 767, label : "How fast sound can travel in an hour"}
];

// the current amount of miles traveled
// var progressMiles = +location.search.replace(/^\?/,"");

var progressMiles = .001;
var lastProgressMiles = 0;

$.ajax({
  url : "/teams/",
  method : "GET",
  success : function(res){
    var total = 0;
    console.log(JSON.parse(res));
    res = JSON.parse(res);
    res["users"].forEach(function(d){
      total += d.distance;
    });
    console.log(total);
    progressMiles = total;
  }
}).done( function(){
  buildMap();
});

// manually setting latitude, longitude
var startPoint = [40.2261491,-111.6606];
var endPoint = [40.6700, -73.9400];

// manual entry of distance in miles
var tripDistanceMiles = 1972;

function buildMap(){

  // figure out the percentage of miles. Max of 1
  var progressPercent = Math.min(progressMiles/tripDistanceMiles, 1);

  // calculate the latitude longitude point based on percentage miles travelled
  var progressPoint = [startPoint[0] + (progressPercent * (endPoint[0]-startPoint[0])), startPoint[1] + (progressPercent * (endPoint[1]-startPoint[1]))];

  // progress pin
  // var progressMarker = L.marker(progressPoint).addTo(map);
  progressMarker.setLatLng(progressPoint).update();
  progressMarker.bindPopup("You've made it " + progressMiles.toFixed(2) + " miles!" + '<a href="#">Share!</a>');

  // progress line
  polyline.setLatLngs([
    startPoint,
    progressPoint
  ]);

  milestones.forEach(function(k){
    if(k.distance >= lastProgressMiles && k.distance < progressMiles){
      var thisMarker = L.circleMarker(milesToPoint(k.distance), {riseOnHover : true});
      thisMarker
        .setRadius(6)
        .addTo(map);
      var thisPop = new L.popup()
        .setLatLng(milesToPoint(k.distance))
        .setContent(k.distance.toFixed(2) + " Miles! " + k.label + '<a href="#"> Share! </a>')
        .openOn(map);
      thisMarker.bindPopup(thisPop);
    }
  });

  // zoom in if the progress is small. Zoom out if you're above a specified percent
  if(progressPercent < .50){
    map.fitBounds([
      startPoint,
      progressPoint
      ], {padding : [50, 50]})
  } else {
    map.fitBounds([
      startPoint,
      endPoint
      ]);

  }
  lastProgressMiles = progressMiles;
}

// convert a miles number into a latitude, longitude point
function milesToPoint(miles){
  var percent = Math.min(miles/tripDistanceMiles, 1);
  var point = [startPoint[0] + (percent * (endPoint[0]-startPoint[0])), startPoint[1] + (percent * (endPoint[1]-startPoint[1]))];
  return point;
}

// create map
var map = L.map('map', {
  scrollWheelZoom: false
});

// select stame map style
// var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
var stamen = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
// var stamen = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
// var openStreet = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

// progress pin
var progressMarker = L.marker(startPoint).addTo(map);
progressMarker.bindPopup("You've made it " + progressMiles + " miles!").openPopup();

// start point pin
var marker = L.marker(startPoint).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>We're going to the New York! " + Math.round(tripDistanceMiles) + " miles");

// end point pin
var marker2 = L.marker(endPoint).addTo(map);
marker2.bindPopup((tripDistanceMiles - progressMiles) + " Miles To Go!");

// drop milestone pins reached. and the next one to be reached
milestones.forEach(function(k){
  if(k.distance < progressMiles){
    L.circleMarker(milesToPoint(k.distance), {riseOnHover : true}).setRadius(6).addTo(map).bindPopup(k.distance + "Miles! " + k.label);
  }
});

var polyline = L.polyline([
    startPoint,
    startPoint
  ]).addTo(map);


function incrementProgress(){
  location.href= "/?" + (progressMiles + 20);

}
