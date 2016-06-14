
	function initMap() {
		
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 6,
			center: {lat: 41.85, lng: -87.65}
		});
		directionsDisplay.setMap(map);

		$("#start_search").click(function(){
		
			startName = $("#dep_city").val()
			start = coord(startName);
			end = coord($("#dest_city").val());
			origin= new google.maps.LatLng(start[0],start[1]);
			dest = new google.maps.LatLng(end[0],end[1]);
			calculateAndDisplayRoute(directionsService,directionsDisplay);

		});

	}

	var start ;
	var end ;
	var origin;
	var dest ;
	var bypass=[];
	
	

	function calculateAndDisplayRoute(directionsService,directionsDisplay) {
		var city_arr = $(".city[data-set='true']");
		var wypts;
		var i;
		for(i=1;i<city_arr.length-1;i++){
			var city = city_arr[i].getAttribute("data-name");
			var coords = coord(city);
			var loc = new google.maps.LatLng(coords[0],coords[1]);
			wypts= {location: loc, stopover: true};
			bypass[i]=wypts;
		}
		
		

		directionsService.route({
    //origin and dest needs to add province to value, otherwise map doesn't work
    origin: origin,
    destination: dest,
    waypoints: bypass,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
}, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                        var summaryPanel = document.getElementById("directions_panel");
                        summaryPanel.innerHTML = "";
                        // For each route, display summary information.
                        for (var i = 0; i < route.legs.length; i++) {
                            // var routeSegment = i + 1;
                            // summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
                            // summaryPanel.innerHTML += route.legs[i].start_address + " to ";
                            // summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
                            // summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
                        }
                    } else {
                        alert("directions response " + status);
                    }
                });
            }