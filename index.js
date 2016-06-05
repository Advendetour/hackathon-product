$(document).ready(function(){
	// start the search by finding 5 cities between the start and end destinations
	$("#start_search").click(function(){

		// [function call] returns array of cities
		var citylist = ["Montreal", "Kingston", "Toronto"];

		// add starting city first
		var depcity = $("#dep_city").val();
		var ret = '<div class="city">'+depcity+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		// add each returned city
		$.each(citylist, function(index, value){
			// ideally, value will be a big ol object with extra info and stuff
			// like cheapest hotel, coordinates, region id, etc
			// but right now, i am just assuming name
			var ret = '<div class="city">'+value+'<div class="activities"></div></div>';
			$("#cities").append(ret);
		})

		// finally add destination city
		var destcity = $("#dest_city").val();
		var ret = '<div class="city">'+destcity+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		$(".activities").hide();
	});

});

//functions for dynamic/new doms

// on click of city tab, query or toggle display of related activities
$(document).on('click', '.city', function(){
	var city = $(this);
	var activities = city.find(".activities");

	// if activities section is blank, run query!!
	if (activities.text()==""){
		// [function call] returns array of activities
		var activitylist = ["swim", "camp", "drive", "ski"];
		// list each activity in a city
		$.each(activitylist, function(index, value){
			// again, would like value to be a big ol object with time, price, details, etc
			var ret = '<div class="activity">'+value+'</div>';
			city.find(".activities").append(ret);
		})
	} else (console.log("not empty"));
	activities.slideToggle();

});

function coord(cityName){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+cityName+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
    var ret;
    jQuery.getJSON({
        url: url,
        async:false,
        success: function(result){
            var lat = result.results[0].geometry.location.lat;
            var long = result.results[0].geometry.location.lng;
            var result = [lat,long];
            ret = result;
        }
    });
    return ret;
}

function difflatlong(city1,city2){
  var lat;
  var long;

  var difflat = coord(city2)[0] - coord(city1)[0]
  var lat = difflat * 110.574;

  var difflong = coord(city2)[1] - coord(city1)[1];
  var long = difflong * 111.320 * Math.cos(lat/(2 * Math.PI));

  var result = [lat,long];
  return result;

}

var apikey = "2yF8AJJcItBwK5UYYbyGrArGlpbPqyIL";
function queryCitiesInBetween(startCity, endCity, distancePerDay)
{
	//c1[0] is latitude, c1[1] is longitude
	var c1 = coordinatesConvert(startCity);
	var c2 = coordinatesConvert(endCity);
	//var c1 = [48.85, 2.35];
	//var c2 = [41.89, 12.48];
	var radlat1 = Math.PI * c1[0]/180;
	var radlat2 = Math.PI * c1[1]/180;
	var theta = c1[1] - c2[1];
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344;

	var times = dist/distancePerDay;
	var bpLat = (c1[0] + times * c2[0])/(1+times);
	var bpLng = (c1[1] + times * c2[1])/(1+times);
	bpLat = bpLat.toFixed(3);
	bpLng = bpLng.toFixed(3);
	//var breakPoint = (bpLat, bpLng);

	//midpoint[0] is latitude, midpoint[1] is longitude
	//var diffInLat = (c2[0]-c1[0]);
	//var diffInLng = (c2[1]-c1[1]);
	//var midpoint = [(diffInLat/2)+c1[0],(diffInLng/2)+c1[1]];

	var radiusInKm = Math.min(distancePerday, 100);
	var html1 = "http://terminal2.expedia.com/x/geo/features?within="+radiusInKm+"km&lat="+bpLat+"&lng="+bpLng+"&type=city&apikey="+apikey;
	//return html1;
	return html1;
}

