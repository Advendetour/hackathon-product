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

function coordinatesConvert(cityName)
{
	var newcoord = "https://maps.googleapis.com/maps/api/geocode/json?address="+cityName+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
	//console.log(html);
	var res = JSON.parse(newcoord)
	return res;
	//var latitude = res.results[0].geometry.location.lat;
	//var longitude = res.results[0].geometry.location.lng;
	//return [latitude,longitude];
	//return (res.results[0].geometry.location.lat,res.results[0].geometry.location.lng);
}

function citiesInBetween(startCity, endCity)
{
	//c1[0] is latitude, c1[1] is longitude
	var c1 = coordinatesConvert(startCity);
	var c2 = coordinatesConvert(endCity);
	//midpoint[0] is latitude, midpoint[1] is longitude
	var diffInLat = (c2[0]-c1[0]);
	var diffInLng = (c2[1]-c1[1]);
	var midpoint = {(diffInLab/2)+c1[0],(diffInLng/2)+c1[1]};
	var radiusInKm = Math.sqrt(pow((midpoint[0] * 110.574),2) + pow((111.320 * cos(midpoint[0])),2));
	var html = "http://terminal2.expedia.com/x/geo/features?within="+radiusInKm+"mi&lat="+midpoint[0]"&lng="+midpoint[1]"&type=city&apikey="+apikey
}

/*$("button").click(function(){
    $.get("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}); */
