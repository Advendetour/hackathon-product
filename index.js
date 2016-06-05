var citylist;
var distancePerDay = 400;
var newModel=getUserQueryModel();
var newAct;
var i;
var apikey= "NH6oq54KA957fmLpv3x1pFx8CE1xhRoc";
var breakPoint =[0,0];
var depcity;
var destcity;

$(document).ready(function(){
	// start the search by finding 5 cities between the start and end destinations
	$("#start_search").click(function(){
		$("#cities").html("");
		depcity = $("#dep_city").val();
		destcity = $("#dest_city").val();
		distancePerDay = $("#distance_per_day").val();

		// add starting city first
		var ret = '<div class="city" data-set="true" data-name='+depcity+'>'+depcity+", "+stateCountry(depcity)[0]+", "+stateCountry(depcity)[1]+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		// find and display mid cities
		var output = find_cities(depcity, destcity);
		$("#cities").append(output);

		// finally add destination city
		var ret = '<div class="city" data-set="true" data-name='+destcity+'>'+destcity+", "+stateCountry(destcity)[0]+", "+stateCountry(destcity)[1]+'<div class="activities"></div></div>';
		$("#cities").append(ret);

		// lastly, hide all activities section so toggle() works later
		$(".activities").hide();
	});
	$("#end_search").click(function(){
		$(".city[data-set='false']").hide();
	});
});

function find_cities(dep, dest){
	citylist = getCitiesInBetween(dep, dest);
	var output = "";
	// add each returned city
	citylist.forEach(function(value){
		city = encodeURIComponent(value.name);
		var hotel = getCheapestHotel(city);
		var ret = '<div class="city" data-set="false" data-name='+city+'>'+value.name+'<span class="hotel">$'+hotel.price+'<span class="mini"> (one night hotel)</span></span><button type="button" class="add_city">Add to route</button><div class="activities"></div></div>';
		output += ret;
		//calculateAndDisplayRoute(value.name);
	});
	return output;
}

// on click of city tab, query or toggle display of related activities
$(document).on('click', '.city', function(){
	var city = $(this);
	var activities = city.find(".activities");

	// if activities section is blank, run query!!
	if (activities.text()==""){
		var activitylist = getActivities(city.attr("data-name"));
		if (activitylist=="-1"){
			city.find(".activities").append("No activities could be found in this region.");
		}else{
			// list each activity in a city
			activitylist.forEach(function(value){
				// again, would like value to be a big ol object with time, price, details, etc
				var ret = '<div class="activity" style="background-image:url(http:'+value.img+');">'+value.name+", "+value.price+'</div>';

				city.find(".activities").append(ret);
			})
		}
		activities.slideDown("slow");
	} else {
		if(activities.css('display') == 'none'){ 
			activities.show('slow'); 
		} else { 
			activities.hide('slow'); 
		}
	}
	
	/*if (activities.display)
	activities.slideToggle();*/

});

// on click of city tab, query or toggle display of related activities
$(document).on('click', '.add_city', function(){
	// keep chosen city and remove others
	var p = $(this).parent();
	$(this).hide();
	p.attr("data-set", "true");
	$(".city[data-set='false']").slideUp();
	// now find the new set of cities!
	//console.log(p.attr("data-name"));
	var output = find_cities(p.attr("data-name"),destcity);
	$(".activities").hide(); // look into this!
	p.after(output);
	//console.log(output);
});

function coord(cityName){
	city = encodeURIComponent(cityName);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
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

function stateCountry(cityName){
	city = encodeURIComponent(cityName);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
    var ret;
    jQuery.getJSON({
        url: url,
        async:false,
        success: function(result){
					var reslength = result.results[0].address_components.length;
					for (i=0;i<reslength;i++){
						if (result.results[0].address_components[i].types[0] == "country"){
							var state = result.results[0].address_components[i-1].long_name;
	            var country = result.results[0].address_components[i].long_name;
	            var result = [state,country];
	            ret = result;
						}
					}
        }
    });
    return ret;
}

/*function difflatlong(city1,city2){
  var lat;
  var long;

  var difflat = coord(city2)[0] - coord(city1)[0]
  var lat = difflat * 110.574;

  var difflong = coord(city2)[1] - coord(city1)[1];
  var long = difflong * 111.320 * Math.cos(lat/(2 * Math.PI));

  var result = [lat,long];
  return result;
}*/

/*function totaldiff(city1,city2) {
	var lat = difflatlong(city1,city2)[0];
	var long = difflatlong(city1,city2)[1];
	var total = Math.sqrt(Math.pow(lat,2),Math.pow(long,2));
	return total;
}*/

function getUserQueryModel(){
	var start = $("#dep_city").val();
	var end = $("#dest_city").val();
	//var days = document.getElementById("duration").value;
	var trip={start: "start", end: "end", dur: "days"};
	return trip;
}

function getActivities(cityName) {
	city=encodeURIComponent(cityName);
	console.log(city);
	var model_arr=[];
    var today = "2016-06-10"; // replace with function later
    var tmrw = "2016-06-12"; // replace with function later
	var html = "http://terminal2.expedia.com:80/x/activities/search?location="+city+"&startDate="+today+"&endDate="+tmrw+"&apikey="+apikey;
	//console.log(html);
    jQuery.getJSON({
        url: html,
        async:false,
        success: function(data){
        	if (data.status=="failed"){
        		model_arr = -1;
        	} else {
	        	data = data.activities;
		        var actModel;
				for (i=0; i<data.length;i++){
					var name = data[i].title;
					var price = data[i].fromPrice;
					var dur = data[i].duration;
					var recScore = data[i].recommendationScore;
					var img = data[i].imageUrl;
					actModel= {"name": name, "price": price, "dur": dur, "recScore": recScore, "img": img};
					model_arr[i]=actModel;
				}
				//console.log(model_arr);
				model_arr = sortActivities(model_arr);
			}
		}
    });

	return model_arr;
}

function sortActivities(model_arr){
	var firstModels=[]
	//sort input cityModels
	model_arr.sort(function(a,b){
		return b.recScore-a.recScore;
	});
	//get the first 5 cityModels
	for (i=0;i<5;i++){
		//console.log(citylist[i])
		firstModels[i]=model_arr[i];
	}
	return firstModels;
}

function getCitiesInBetween(startCity, endCity){

	var html = queryCitiesInBetween(startCity, endCity);
	var model_arr=[];

	$.get({
		url: html,
		async:false,
		success: function(data){
			var actModel;
			for (i=0; i<data.length;i++){
				var name = data[i]["name"];
				//console.log(name);
				var lat = data[i]["position"]["coordinates"][1];
				var lon = data[i]["position"]["coordinates"][0];
				var dis = calcCrow(lat,lon,breakPoint[0],breakPoint[1])
				cityModel= {"name": name, "lat": lat, "lon": lon, "dis": dis};
				model_arr[i]=cityModel;
			}
			model_arr = sortAllCities(model_arr);
		}
	});
	return model_arr;
}

function queryCitiesInBetween(startCity, endCity){
    getBreakPoint(startCity, endCity);    //midpoint[0] is latitude, midpoint[1] is longitude
    //var diffInLat = (c2[0]-c1[0]);
    //var diffInLng = (c2[1]-c1[1]);
    //var midpoint = [(diffInLat/2)+c1[0],(diffInLng/2)+c1[1]];
    var radiusInKm = Math.min(distancePerDay, 100);
    var html1 = "http://terminal2.expedia.com/x/geo/features?within="+radiusInKm+"km&lat="+breakPoint[0]+"&lng="+breakPoint[1]+"&type=city&apikey="+apikey;
    //return html1;
    return html1;
}

function sortAllCities(model_arr){
	var firstModels=[]
	//sort input cityModels
	model_arr.sort(function(a,b){
		return b.dis-a.dis;
	});
	//get the first 5 cityModels
	for (i=0;i<5;i++){
		firstModels[i]=model_arr[i];
	}
	return firstModels;
}

function getCheapestHotel(cityName){
	//city=encodeURIComponent(cityName);
	var model_arr=[];
    var today = "2016-06-10"; // replace with function later
    var tmrw = "2016-06-11"; // replace with function later
    var html = "http://terminal2.expedia.com:80/x/mhotels/search?city="+city+"&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=1&apikey="+apikey;
    //console.log(html);
    $.get({
    	url: html,
    	async:false,
    	success: function(data){
			data = data.hotelList;
			//parse an object
			var hotelModel;
			for (i=0; i<data.length;i++){
				var name = data[i].name;
				var price = data[i].lowRate;
				//console.log(hotelModel);
				hotelModel= {"name": name, "price": price};
				model_arr[i]=hotelModel;
			}
			model_arr.sort(function(a,b){
				return a.price-b.price;
			});
    	}
	});
	return model_arr[0];
}

function getHotelsForCities(cityModels_arr){
	var cheapHotelModel_arr;
	for(i=0;i<5;i++){
		var city_name = cityModels_arr[i].name;
		var hotelModel = getCheapestHotel(city_name);
		cheapHotelModel_arr[i] = hotelModel;
	}
	return cheapHotelModel_arr;
}

function getBreakPoint(startCity, endCity){
	var c1 = coord(startCity);
	var c2 = coord(endCity);
	var d = calcCrow(c1[0], c1[1], c2[0], c2[1]);
	var numbreaks = d/distancePerDay;

	var deltaX = (c2[0]-c1[0])/numbreaks;
	var deltaY = (c2[1]-c1[1])/numbreaks;

	var bX = c1[0]+deltaX;
	var bY = c1[1]+deltaY;
	breakPoint = [bX, bY];
}
function calcCrow(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;
}
function toRad(Value) {
	return Value * Math.PI / 180;
}
