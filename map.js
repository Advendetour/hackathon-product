/*
	map.js
	This file shoudl contain all variable and functions related to the use of google maps api
*/

// GLOBAL VARS

var dep_coords;
var dest_coords;
var origin;
var dest;
var bypass=[];

// MAP OBJECTS

var map;
var geocoder;
var directionsService;
var directionsDisplay;

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

	geocoder = new google.maps.Geocoder();

	directionsService = new google.maps.DirectionsService;

	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);

}

// take string input, return lat/long coordinates
function geocodeAddress(address, output, callback) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			output = results[0].geometry.location;
			console.log (output);
			callback();
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}

/*function centreMap(address, callback){
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}*/