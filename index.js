/* 
	index.js
	should contain only stuff NOT related to the map
	aka: buttons, displays, forms
*/

// GLOBAL VARS

var distancePerDay;
var dep_string;
var dest_string;

// DOC READY AND BUTTON CALLS

$(document).ready(function(){
	$("#start_search").click(start_search);
});


// FUNCTIONS

// dynamic display of search range when using slider
// called by html
function showVal(km){
	$("#distance").text(km);
}
// returns true if a string is empty, null or undefined
function isEmpty(str) {
    return (!str || 0 === str.length);
}

function start_search(){
	dep_string = $("#dep_city").val();
	dest_string = $("#dest_city").val();
	check_dep();
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
			init_route();
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}

function init_route(){
	console.log("next step is to initialize the route!");
}