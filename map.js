/*
	map.js
	This file shoudl contain all variable and functions related to the use of google maps api
*/

// GLOBAL VARS

var dep_coords;
var dest_coords;
var origin;
var dest;
var waypoints=[];
var route;

// MAP OBJECTS

var map;
var geocoder;
var directionsService;
var directionsDisplay;
var placesService;
var infowindow;


// KEY - should be kept seperate

var gmapkey = "AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";

// FUNCTIONS

// initialize map and services
function initMap() {	
	map = new google.maps.Map(document.getElementById('map'), {
		mapTypeControl: false,
		streetViewControl: false,
		zoom: 6,
		center: {lat: 41.85, lng: -87.65}
	});
	infowindow = new google.maps.InfoWindow();
	geocoder = new google.maps.Geocoder();
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	placesService = new google.maps.places.PlacesService(map);
	


}
function check_dep(){
	geocoder.geocode({'address': dep_string}, function(results, status) {
		if (status === 'OK') {
			dep_coords = results[0].geometry.location;
			check_dest();
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}
function check_dest(){
	geocoder.geocode({'address': dest_string}, function(results, status) {
		if (status === 'OK') {
			dest_coords = results[0].geometry.location;
			calculateAndDisplayRoute();
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}
function calculateAndDisplayRoute() {
	var request = {
		origin: dep_coords,
		destination: dest_coords,
		travelMode: 'DRIVING',
		waypoints: waypoints
	};
	directionsService.route(request, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			route = response.routes[0];
			next_step();
		} else {
			console.log('Directions request failed due to ' + status);
		}
	});
}
function getViewportBounds(){
	var bounds = map.getBounds();
	var urlBounds = bounds.toUrlValue();
	console.log(urlBounds);
}
function searchNearby(){
	placesService.nearbySearch({
		bounds: map.getBounds(),
		rankby: google.maps.places.RankBy.PROMINENCE,
		type: 'locality'
		}, searchCallback);
}

function searchCallback(results, status) {
	console.log(results);
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		  for (var i = 0; i < results.length; i++) {
		    createMarker(results[i]);
		  }
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	  map: map,
	  position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.setContent(place.name);
	  infowindow.open(map, this);
	});
}



// take string input, return lat/long coordinates
/*function geocodeAddress(address, output, callback) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			output = results[0].geometry.location;
			console.log (output);
			callback();
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}*/
/*function centreMap(address, callback){
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}*/