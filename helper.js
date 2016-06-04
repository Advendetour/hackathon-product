
var newModel=getUserQueryModel();
var newAct;
var i;
var display = queryForAllCities(newModel["start"], newModel["end"]);



function getUserQueryModel(){
	var start = document.getElementById("dep_city").value;
	var end = document.getElementById("dest_city").value;
	var days = document.getElementById("duration").value;
	var trip={start: "start", end: "end", dur: "days"};
	return trip;
}


$(document).ready(function(){

	$(".tr").click(function(){
		var actName=$(this).text();
		display=queryForAllCities(newModel["start"], newModel["end"]);
		$("#updateTime").show()
		$("#updateActivity").show()
	});
});


function appendTable(sel){
	for(i=0;i<display.length;i++){
		newAct+= "<tr><tr id=\"" +display[i].name+"\">"+ display[i].name +"</td></tr>"
	}
	$(sel).appendChild(newAct);
}

	//display activities in table
	function displayTable(sel){
		var out="<tr><td>"+newModel["start"]+"</td></tr>";
		for(i=0;i<display.length;i++){
			out+= "<tr><tr id=\"" +display[i].name+"\">"+ display[i].name +"</td></tr>"
		}
		out+="<tr><td>"+endCity+"</td></tr>"
		$(sel).text = out;
	}

