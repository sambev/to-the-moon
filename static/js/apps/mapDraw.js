// fake milestone data
var milestones = [
  {distance: 13 , label : 'Half Marathon'},
  {distance: 26 , label : "Marathon"},
  {distance: 42 , label : ""},
  {distance: 326 , label : ""},
  {distance: 356 , label : ""},
  {distance: 1234 , label : ""},
  {distance: 500, label : "Would you walk 500 more?"},
  {distance: 767, label : "How fast sound can travel in an hour"}
];

// the current amount of miles traveled
// var progressMiles = +location.search.replace(/^\?/,"");

var progressMiles = 400;
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


function buildMap(){
  // manually setting latitude, longitude
  var startPoint = [40.24,-111.66];
  var endPoint = [40.6700, -73.9400];

  // manual entry of distance in miles
  var tripDistanceMiles = 1972;

  // figure out the percentage of miles. Max of 1
  var progressPercent = Math.min(progressMiles/tripDistanceMiles, 1);

  // calculate the latitude longitude point based on percentage miles travelled
  var progressPoint = [startPoint[0] + (progressPercent * (endPoint[0]-startPoint[0])), startPoint[1] + (progressPercent * (endPoint[1]-startPoint[1]))];


  // select stame map style
  // var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
  var stamen = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
  // var stamen = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {attribution: 'Add some attributes here!'}).addTo(map);
  // var openStreet = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

  // start point pin
  var marker = L.marker(startPoint).addTo(map);
  marker.bindPopup("<b>Hello world!</b><br>We're going to the New York! " + Math.round(tripDistanceMiles) + " miles");

  // end point pin
  var marker2 = L.marker(endPoint).addTo(map);
  marker2.bindPopup((tripDistanceMiles - progressMiles) + " Miles To Go!");

  // progress pin
  var progressMarker = L.marker(progressPoint).addTo(map);
  progressMarker.bindPopup("You've made it " + progressMiles + " miles!").openPopup();

  // progress line
  var polyline = L.polyline([
    startPoint,
    progressPoint
  ]).addTo(map);

  // drop milestone pins reached. and the next one to be reached
  milestones.forEach(function(k){
    if(k.distance <progressMiles){
      L.circleMarker(milesToPoint(k.distance), {riseOnHover : true}).setRadius(6).addTo(map).bindPopup(k.distance + "Miles! " + k.label);
    }
  });

  // convert a miles number into a latitude, longitude point
  function milesToPoint(miles){
    var percent = Math.min(miles/tripDistanceMiles, 1);
    var point = [startPoint[0] + (percent * (endPoint[0]-startPoint[0])), startPoint[1] + (percent * (endPoint[1]-startPoint[1]))];
    return point;
  }


  // zoom in if the progress is small. Zoom out if you're above a specified percent
  if(progressPercent < .50){
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
}

// create map
var map = L.map('map', {
  scrollWheelZoom: false
});


function incrementProgress(){
  location.href= "/?" + (progressMiles + 20);

}
