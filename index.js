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
