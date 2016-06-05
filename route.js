function coordinatesConvert(cityName)
{
	var newcoord = "https://maps.googleapis.com/maps/api/geocode/json?address="+cityName+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
	//console.log(html);
  var res = JSON.parse(newcoord)
	return (res.results[0].geometry.location.lat,res.results[0].geometry.location.lng);
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
	
  request = new XMLHttpRequest();
  request.open("GET", "http://terminal2.expedia.com:80/x/geo/features?bbox=" +)
}
