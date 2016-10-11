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
	$("#testbtn").click(searchNearby);
});

// FUNCTIONS

// dynamic display of search range when using slider
// called by html
function showVal(km){
	$("#distance").text(km);
}

function start_search(){
	dep_string = $("#dep_city").val();
	dest_string = $("#dest_city").val();
	check_dep();
}

function next_step(){
	console.log("reached next step!");
	$("#startpanel").slideUp();
}


// HELPER FUNCTIONS

// returns true if a string is empty, null or undefined
function isEmpty(str) {
	return (!str || 0 === str.length);
}