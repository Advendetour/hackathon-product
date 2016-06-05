var citylist;

$(document).ready(function(){
	// start the search by finding 5 cities between the start and end destinations
	$("#start_search").click(function(){
		$("#cities").html("");
		var depcity = $("#dep_city").val();
		var destcity = $("#dest_city").val();

		// add starting city first
		var ret = '<div class="city" data-index=0 data-set="true" data-name='+depcity+'>'+depcity+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		// find and display mid cities
		var output = find_cities($("#dep_city"), $("#dest_city"));
		$("#cities").append(output);

		// finally add destination city
		var lastindex = citylist.length;
		var ret = '<div class="city" data-index='+(lastindex+1)+' data-set="true" data-name='+destcity+'>'+destcity+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		// lastly, hide all activities section so toggle() works later
		$(".activities").hide();
	});
	$("#end_search").click(function(){
		$(".city[data-set='false']").hide();
	});
});

function find_cities(dep, dest){

	// [function call] returns array of city models
	citylist = [{"name":"Montreal", "lat":"1","long":"1"},{"name":"Kingston", "lat":"1","long":"1"},{"name":"Toronto", "lat":"1","long":"1"}];

	var output = "";
	// add each returned city
	$.each(citylist, function(index, value){
		// ideally, value will be a big ol object with extra info and stuff
		// like cheapest hotel, coordinates, region id, etc
		// but right now, i am just assuming name
		var ret = '<div class="city" data-index='+(index+1)+' data-set="false" data-name='+value.name+'>'+value.name+'<button type="button" class="add_city">Add to route</button><div class="activities"></div></div>';
		output += ret;
	})

	return output;

}

// on click of city tab, query or toggle display of related activities
$(document).on('click', '.city', function(){
	var city = $(this);
	var activities = city.find(".activities");
	// if activities section is blank, run query!!
	if (activities.text()==""){
		find_activities(city);
	} //else (console.log("not empty"));
	activities.slideToggle();
});

function find_activities(city){
	// [function call] returns array of activities
	var activitylist = [{"name":"swim", "price":"p", "dur":"d", "score":"s", "img":"i"},{"name":"camp", "price":"p", "dur":"d", "score":"s", "img":"i"},{"name":"ski", "price":"p", "dur":"d", "score":"s", "img":"i"}];
	// list each activity in a city
	$.each(activitylist, function(index, value){
		// again, would like value to be a big ol object with time, price, details, etc
		var ret = '<div class="activity">'+value.name+'<button type="button" value="'+value.name+'" class="add_act">Add to route</button></div>';
		city.find(".activities").append(ret);
	})
}

// add city to route, remove old cities, find new sets in between
$(document).on('click', '.add_city', function(){
	$(this).hide();
	$(this).parent().attr("data-set","true");
	var mid = $(this).parent().attr("data-name");
	// remove prev and next cities in list up to those already added to itinerary
	var start = remove_prev($(this).parent());
	var end = remove_next($(this).parent());

	var set1 = find_cities(start,mid);
	var set2 = find_cities(mid,end);
	//console.log(set2);
	$(this).parent().before(set1);
	$(this).parent().after(set2);
	$(".activities").hide();
});

function remove_prev(div){
	var prev = div.prev();
	if (prev.attr("data-set")=="false"){
		prev.hide();
		return remove_prev(prev);
	} else {
		return prev.attr("data-name");
	}
}
function remove_next(div){
	var next = div.next();
	if (next.attr("data-set")=="false"){
		next.hide();
		return remove_next(next);
	} else {
		return next.attr("data-name");
	}
}

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

function totaldiff(city1,city2) {
	var lat = difflatlong(city1,city2)[0];
	var long = difflatlong(city1,city2)[1];
	var total = Math.sqrt(Math.pow(lat,2),Math.pow(long,2));
	return total;
}
