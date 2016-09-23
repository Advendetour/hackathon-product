var start;
var end;
var origin;
var dest ;
var bypass=[];
var map;

function initMap() {	
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	map = new google.maps.Map(document.getElementById('map'), {
		mapTypeControl: false,
		streetViewControl: false,
		zoom: 6,
		center: {lat: 41.85, lng: -87.65}
	});
	directionsDisplay.setMap(map);
	$("#start_search").click(function(){
		//debugger;
		start = coord($("#dep_city").val());
		end = coord($("#dest_city").val());
		origin = new google.maps.LatLng(start[0],start[1]);
		dest = new google.maps.LatLng(end[0],end[1]);
		calculateAndDisplayRoute(directionsService,directionsDisplay);
	});
	$(".add_city").click(function(){
		calculateAndDisplayRoute(directionsService,directionsDisplay);
	});
}

function calculateAndDisplayRoute(directionsService,directionsDisplay) {		
	var city_arr = $(".city[data-set='true']");
	var wypts;
	for(var i=1;i<city_arr.length-1;i++){
		var city = city_arr[i].getAttribute("data-name");
		var coords = coord(city);
		var loc = new google.maps.LatLng(coords[0],coords[1]);
		wypts= {location: loc, stopover: true};
		bypass[i-1]=wypts;
	}
	directionsService.route({
		//origin and dest needs to add province to value, otherwise map doesn't work
		origin: origin,
		destination: dest,
		waypoints: bypass,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
	}, 
	function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById("directions_panel");
			summaryPanel.innerHTML = "";
		} else {
			alert("directions response " + status);
		}
	});
}