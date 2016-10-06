/* 
	index.js
	should contain only stuff NOT related to the map
	aka: buttons, displays, forms
*/

// GLOBAL VARS

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
// start search
// checks inputs, hides input form, starts route, performs initial explore search
function check_dep(){
	var dep_string = $("#dep_city").val();
	if (!isEmpty(dep_string)){
		geocodeAddress(dep_string, dep_coords, check_dest);
	}
}

function check_dest(){
	var dest_string = $("#dest_input").val();
	if ($("#dest_known").is(':checked') && !isEmpty(dest_string)) {
		geocodeAddress(dest_string, dest_coords, next_step);
	} else next_step;
}

function next_step(){
	console.log("reached next step!");
}
	/* if dest_city is not blank, 
		pass geocodeAddress callback X, 
			callback X just attempts to geocode the dest_city too!
			and itself then uses callback to display route
		else pass callback Y
	*/
	
