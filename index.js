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
	$("#start_search").click(check_dep);
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

function check_dep(){
	dep_string = $("#dep_city").val();
	if (!isEmpty(dep_string)){
		geocoder.geocode({'address': dep_string}, function(results, status) {
			if (status === 'OK') {
				dep_coords = results[0].geometry.location;
				check_dest();
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
}

function check_dest(){
	dest_string = $("#dest_input").val();
	if ($("#dest_known").is(':checked') && !isEmpty(dest_string)) {
		geocoder.geocode({'address': dest_string}, function(results, status) {
			if (status === 'OK') {
				dest_coords = results[0].geometry.location;
				next_step();
			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	} else next_step();
}

function next_step(){
	console.log("reached next step!");
	console.log(dep_coords);
	map.setCenter(dep_coords);
}
	/* if dest_city is not blank, 
		pass geocodeAddress callback X, 
			callback X just attempts to geocode the dest_city too!
			and itself then uses callback to display route
		else pass callback Y
	*/
	
