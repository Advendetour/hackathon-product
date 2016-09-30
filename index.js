// * * * * * * * * * * * * * * * * * * * * 
// global variables

var start_coords = false;
var dest_coords = false;
var distancePerDay;
//keys should be in a seperate file and just included, do not upload to github
var gmapkey = "AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";


// * * * * * * * * * * * * * * * * * * * * 
// all the button function call
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

// * * * * * * * * * * * * * * * * * * * * 
// the actual functions go here
// keep in mind the async callbacks!!
function showVal(km){
	$("#distance").text(km);
}

function start_search(){
	//first, check inputs
	start_coords = get_coord($("#dep_city").val());
	console.log(start_coords);
	if (start_coords===false){return false;}
	if ($("#dest_known").is(':checked')){
		dest_coords = get_coord($("#dest_city").val());
		if (dest_coords===false){return false;}
	}
	distancePerDay = $("#distance_per_day").val();
	console.log(start_coords+","+dest_coords+","+distancePerDay);
}


//getting fucked by async callbacks
// i want to return true or false
// but calling functions dont wait for return
function get_coord(cityName){
	city = encodeURIComponent(cityName);
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key="+gmapkey;
	$.getJSON({
		url: url,
		async: false,
		success: function(result){
			if (result.status!="OK"){
				console.log("error returning coordinates: "+result.status);
				return false;
			} else {
				var lat = result.results[0].geometry.location.lat;
				var long = result.results[0].geometry.location.lng;
				return [lat,long];
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("error getting coordinates: "+xhr.status+"; "+thrownError);
			return false;
		}
	});
}