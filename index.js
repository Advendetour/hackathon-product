var citylist;
var distancePerDay = 400;
var newModel=getUserQueryModel();
var newAct;
var i;
var apikey= "NH6oq54KA957fmLpv3x1pFx8CE1xhRoc";
var breakPoint =[0,0];


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
		var output = find_cities(depcity, destcity);
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
	citylist = getCitiesInBetween(dep, dest);
	console.log(citylist);
	// [function call] returns array of city models
	//citylist = [{"name":"Montreal", "lat":"1","long":"1"},{"name":"Kingston", "lat":"1","long":"1"},{"name":"Toronto", "lat":"1","long":"1"}];

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

function totaldiff(city1,city2) {
	var lat = difflatlong(city1,city2)[0];
	var long = difflatlong(city1,city2)[1];
	var total = Math.sqrt(Math.pow(lat,2),Math.pow(long,2));
	return total;
}




function getUserQueryModel(){
	var start = $("#dep_city").val();
	var end = $("#dest_city").val();
	//var days = document.getElementById("duration").value;
	var trip={start: "start", end: "end", dur: "days"};
	return trip;
}


function getActivities(cityName) {
	var model_arr=[];
    var today = "2016-06-10"; // replace with function later
    var tmrw = "2016-06-12"; // replace with function later
	var html = "http://terminal2.expedia.com:80/x/activities/search?location="+cityName+"&startDate="+today+"&endDate="+tmrw+"&apikey="+apikey;
	$.get(html,function(data,status){ //data is an array of JSON object
		//parse an object
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

	})
	return model_arr;
}


function getCitiesInBetween(startCity, endCity){
/*	var startlat = coord(startCity)[0];
	var startlon = coord(startCity)[1];
	var endlat = coord(endCity)[0];
	var endlon = coord(endCity)[1];*/
	

	var html = queryCitiesInBetween(startCity, endCity);
	var model_arr=[];
	$.get(html,function(data,status){ //data is an array of JSON object
		//parse an object
		var actModel;
		for (i=0; i<data.length;i++){
			var name = data[i].name;
			var lat = data[i]["coordinates"][1];
			var lon = data[i]["coordinates"][0];
			var dis = getDistance(lat,lon,breakPoint[0],breakPoint[1])
			cityModel= {"name": name, "lat": lat, "lon": lon, "dis": dis};
			model_arr[i]=cityModel;
		}

	});
	return model_arr;
}

function queryCitiesInBetween(startCity, endCity)
{
    getBreakPoint(startCity, endCity);    //midpoint[0] is latitude, midpoint[1] is longitude
    //var diffInLat = (c2[0]-c1[0]);
    //var diffInLng = (c2[1]-c1[1]);
    //var midpoint = [(diffInLat/2)+c1[0],(diffInLng/2)+c1[1]];    
    var radiusInKm = Math.min(distancePerDay, 100);
    var html1 = "http://terminal2.expedia.com/x/geo/features?within="+radiusInKm+"km&lat="+breakPoint[0]+"&lng="+breakPoint[1]+"&type=city&apikey="+apikey;
    //return html1;
    return html1;
}

function sortAllCities(cityModels_arr){
	var firstModels=[]
	//sort input cityModels
	cityModels_arr.sort(function(a,b){
		if (a.dis > b.dis){
			return 1;
		}
		if (a.dis > b.dis){
			return -1;
		}
		return 0;
	});
	//get the first 5 cityModels
	for (i=0;i<5;i++){
		firstModels[i]=cityModels_arr[i];
	}
	return firstModels;

}

function getCheapestHotel(cityName){
	var model_arr=[];
    var today = "2016-06-10"; // replace with function later
    var tmrw = "2016-06-11"; // replace with function later
    var html = "http://terminal2.expedia.com:80/x/mhotels/search?city="+cityName+"&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=1&apikey="+apikey;
    $.get(html,function(data,status){ //data is an array of JSON object
		//parse an object
		var hotelModel;
		for (i=0; i<data.length;i++){
			var name = data[i].name;
			var price = data[i].price;
			
			hotelModel= {"name": name, "price": price};
			model_arr[i]=hotelModel;
		}
	});
	model_arr.sort(function(a,b){
		if (a.price > b.price){
			return 1;
		}
		if (a.price > b.price){
			return -1;
		}
		return 0;
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

/*function getBreakPoint(startCity, endCity)
{
    //c1[0] is latitude, c1[1] is longitude
    var c1 = coord(startCity);
    var c2 = coord(endCity);
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
    var bpLat = c1[0]+(c2[0]-c1[0])/times;
    var bpLng = c1[1]+(c2[1]-c1[1])/times;
    bpLat = bpLat.toFixed(3);
    bpLng = bpLng.toFixed(3);
    breakPoint = [bpLat, bpLng];
}*/


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