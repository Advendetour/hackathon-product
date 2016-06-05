var apikey = "2yF8AJJcItBwK5UYYbyGrArGlpbPqyIL";
function queryCitiesInBetween(startCity, endCity, distancePerDay)
{
	//c1[0] is latitude, c1[1] is longitude
	//var c1 = coordinatesConvert(startCity);
	//var c2 = coordinatesConvert(endCity);
	var c1 = [48.85, 2.35];
	var c2 = [41.89, 12.48];
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
	var bpLat = (c1[0] + times * c2[0])/(1+times);
	var bpLng = (c1[1] + times * c2[1])/(1+times);
	//var breakPoint = (bpLat, bpLng);

	//midpoint[0] is latitude, midpoint[1] is longitude
	//var diffInLat = (c2[0]-c1[0]);
	//var diffInLng = (c2[1]-c1[1]);
	//var midpoint = [(diffInLat/2)+c1[0],(diffInLng/2)+c1[1]];

	var radiusInKm = Math.min(distancePerday, 100);
	var html1 = "http://terminal2.expedia.com/x/geo/features?within="+radiusInKm+"km&lat="+bpLat+"&lng="+bpLng+"&type=city&apikey="+apikey;
	return html1;
}
