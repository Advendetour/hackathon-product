function coordinatesConvert(cityName)
{
	var newcoord = "https://maps.googleapis.com/maps/api/geocode/json?address="+cityName+"&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo";
	//console.log(html);
  var res = JSON.parse(newcoord)
	return (res.results[0].geometry.location.lat,res.results[0].geometry.location.lng);
}

function citiesInBetween(startCity, endCity)
{


  request = new XMLHttpRequest();
  request.open("GET", "http://terminal2.expedia.com:80/x/geo/features?bbox=" +)
}
