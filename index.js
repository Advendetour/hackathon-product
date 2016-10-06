/* 
	index.js
	should contain only stuff NOT related to the map
	aka: buttons, displays, forms
*/

// GLOBAL VARS

var start_coords = false;
var dest_coords = false;
var distancePerDay;

// DOC READY AND BUTTON CALLS

$(document).ready(function(){
	$("#dest_known").click(function(){
		if ($(this).is(':checked')){
			$("#dest_input").slideDown();
		}
	});
	$("#dest_unknown").click(function(){
		if ($(this).is(':checked')){
			$("#dest_input").slideUp();
		}
	});
	$("#start_search").click(start_search);
});


// FUNCTIONS

function showVal(km){
	$("#distance").text(km);
}

function start_search(){
	dep_city_string = $("#dep_city").val();
	geocodeAddress(dep_city_string);
}