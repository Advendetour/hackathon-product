
var newModel=getUserQueryModel();
var newAct;
var i;
var display = queryForAllCities(newModel["start"], newModel["end"]);
var apikey= NH6oq54KA957fmLpv3x1pFx8CE1xhRoc;



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

function getMidpointBetweenTwoCities(start-lat, start-lon, end-lat, end-lon){
		var mid-lat = (start-lat+end-lat)/2;
		var mid-lon = (start-lon+end-lon)/2;
		return [mid-lat, mid-lon];
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


