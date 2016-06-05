
var newModel=getUserQueryModel();
var newAct;
var i;
var display = queryForAllCities(newModel["start"], newModel["end"]);
var apikey= NH6oq54KA957fmLpv3x1pFx8CE1xhRoc;
//breakPoint:[lat,lon]


function getUserQueryModel(){
	var start = document.getElementById("dep_city").value;
	var end = document.getElementById("dest_city").value;
	var days = document.getElementById("duration").value;
	var trip={start: "start", end: "end", dur: "days"};
	return trip;
}


// $(document).ready(function(){

// 	$(".tr").click(function(){
// 		var actName=$(this).text();
// 		display=queryForAllCities(newModel["start"], newModel["end"]);
// 		$("#updateTime").show()
// 		$("#updateActivity").show()
// 	});
// });


// function appendTable(sel){
// 	for(i=0;i<display.length;i++){
// 		newAct+= "<tr><tr id=\"" +display[i].name+"\">"+ display[i].name +"</td></tr>"
// 	}
// 	$(sel).appendChild(newAct);
// }

// 	//display activities in table
// function displayTable(sel){
// 		var out="<tr><td>"+newModel["start"]+"</td></tr>";
// 		for(i=0;i<display.length;i++){
// 			out+= "<tr><tr id=\"" +display[i].name+"\">"+ display[i].name +"</td></tr>"
// 		}
// 		out+="<tr><td>"+endCity+"</td></tr>"
// 		$(sel).text = out;
// }

// function getMidpointBetweenTwoCities(start-lat, start-lon, end-lat, end-lon){
// 		var mid-lat = (start-lat+end-lat)/2;
// 		var mid-lon = (start-lon+end-lon)/2;
// 		return [mid-lat, mid-lon];
// }

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
	var start-lag = coordinatesConvert(startCity)[0];
	var start-lon = coordinatesConvert(startCity)[1];
	var end-lag = coordinatesConvert(endCity)[0];
	var end-lon = coordinatesConvert(endCity)[1];
	

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
    var html = "http://terminal2.expedia.com:80/x/mhotels/search?city="+cityName+"&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=1&apikey="+apikey
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

