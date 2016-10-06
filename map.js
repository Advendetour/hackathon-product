/*
	map.js
	This file shoudl contain all variable and functions related to the use of google maps api
*/

// GLOBAL VARS

var start;
var end;
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
function geocodeAddress(address, callback) {
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			callback(results[0].geometry.location);
			/*map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});*/
		} else {
			callback('Geocode was not successful for the following reason: ' + status);
		}
	});
}