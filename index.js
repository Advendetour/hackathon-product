var apikey = "kRAwQaC1k0hxXZM2G2CfOJbgndiqGv8E";
function find_start() {
    //
    var city = document.getElementById("dep_city").value;
    city = encodeURI(city);
    var today = "2016-06-10"; // replace with function later
    var tmrw = "2016-06-12"; // replace with function later
    var beds = "1";
	var html = "http://terminal2.expedia.com/x/mhotels/search?city="+city+"&checkInDate="+today+"&checkOutDate="+tmrw+"&room1="+beds+"&apikey="+apikey;
	//console.log(html);
	return html;

}

$(document).ready(function(){
    $("#find").click(function(){
        var html = find_start();
        console.log(html);
	    $.get(html, function(data, status){
	    	//console.log(data);
			$("#results").text(JSON.stringify(data));
	    });
    });
}); 

/*$("button").click(function(){
    $.get("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}); */