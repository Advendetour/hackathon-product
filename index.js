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

// dynamic display of search range when using slider
// called by html
function showVal(km){
	$("#distance").text(km);
}

// start search
// checks inputs, hides input form, starts route, performs initial explore search
function start_search(){
	dep_city_string = $("#dep_city").val();
	/* if dest_city is not blank, 
		pass geocodeAddress callback X, 
			callback X just attempts to geocode the dest_city too!
			and itself then uses callback to display route
		else pass callback Y
	*/
	geocodeAddress(dep_city_string, console.log);
}