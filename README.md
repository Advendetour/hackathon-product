# Advendetour
Grand-prize winner for AngelHack 2016 - Montreal

Team members: 
  Jing Liu,
  Jordan Quan,
  Paige Sun,
  Robin Luo,
  Yuning Bie




Workflow
Introduction & Introduce Pain Point --------------------------------------------------------
Have a Point A and a Point B? Well, Advendetour is here to show you that a straight line is NOT the best way to go. Advendetour will suggest to you places to visit and you can have your journey, your way.



Use Case Example: Billybob is travelling in Europe, arriving in Paris and flying out of Rome in 3 weeks. But Billybob doesn’t want to just go straight from France to Italy, Billybob wants to visit the sights along the way! But, Billybob doesn’t know where to go!! Advendetour will suggest places to stay and things to do along the way.
(*demo while presenting situation and function of program: explain how the cities are chosen, activities and hotel prices are classified)

Catchphrases: Spend less time planning, and more time travelling.
The road goes ever, ever on.

Architecture -----------------------------------------------
Our project takes in the starting city and an ending city, and iteratively return all the spots of attraction, including details such as price and “things to do”, within certain range, and meanwhile plans a route and shows directly on google map. Our algorithm constantly update our suggested path and attraction spots according to previous user choices. 

How our algo works: 
We initialize the graph with the start/end point input by user, and a variance number that represents how further away the user is willing to travel that would deviate from his/her final goal. Then we take points on the minimum route, using Expedia API to sort out all attraction places/cities according to how far away from the min route, and present the best 5 choices to user. After the user chooses his favourite, that choice become the current node upon which we update our graph. We run the same algo iteratively until the user is close enough to the destination point, or the user wants to finalize his trip.

Process: User inputs start and destination and how far they think they can travel in a day. We then determine the likeliest stops for such a journey, suggesting cities to stay at and fun things to do! They can view their growing itinerary on googlemaps and in a printable format online.

Selling Points & Future Implementation -----------------------------------------------------

Intuitively build an adventure trip within minutes! Get to your destination on time and within budget
Experience local culture
Would like for the user to edit their route, if they particularily want to visit a specific city.
Wanted to keep a running tally of expenses and trip duration (both for hotel stays and activities)
Wanted to provide alternative options for hotels and prices, and even ways to book online!


Conclusion/Future improvement
Add time calculator feature that will make sure that the user do not exceed his/her time limit that he/she sets, make sure that he/she does not choose too many activities
Show more details/choices about activities and hotel prices (be able to choose number of rooms, date the user arrive there)



@ helper functions

func distance(start-lat, start-lon, end-lat, end-lon) -> distance
Returns distance between two points

coord(cityName) → [lat, long]
returns latitude and longitude of start-city and end-city, which is passed as parameters for queryForAllCities()
Sample: 
start-lat, start-lon = 48.852739, 2.345838
end-lat, end-lon = 41.889698, 12.476393

difflatlong(city1,city2) -> [diff in lat, diff in long]
totaldiff(city1,city2) -> distance between city1 and city2 in KM

- getCheapestHotel( [hotelModels] ) -> hotelModel

@ global variables


@ Frontend:
--------------------------- Web Browser View --------------------------------
Start: _______________________
Destination: __________________
Number of Days: ______________
---------------------------------------------------------------------------------------

User clicks “Let’s Go!” and ends up in page 2

Upon clicking on “Let’s Go!” the frontend sends to backend a userQueryModel
userQueryModel -------- done once at the beginning 
Start-city    =  Paris
End-city     =  Rome
distancePerDay =  400km
 ←-- make sure to type in a much bigger number than 100km
How much do you want to drive in a day?   ( in km)


@ Backend 

Gets userQueryModel from frontend //DONE

func queryForCities(userQueryModel) → [5CityModels]
	Var breakPoint[latitude, longitude]

queryCitiesInBetween(start-city, end-city) → JSONObjects
getBreakpointBetweenTwoCities(start-lat, start-lon, end-lat, end-lon) → breakPoint
Sample: getMidpointBetweenTwoCities(48.852739, 2.345838,41.889698, 12.476393) → (25.5992885,27.183045500000002)
var distanceFromMidpointToEnd = getDistance(breakPoint, end-lat, end-lon)
var radius = min(distanceFromMidPointToEnd, 100km)
query for all cities within a radius from center
Use Find geographical features with a radial distance from a point defined by the lat and lng parameters
Within = radius
type = “city”
Lat & lon = mid-lat & mid-lon
Sample:
http://host:port/features?type=city&lat=25.5992885&lng=27.183045500000002&within=14.7066525km&apikey=NH6oq54KA957fmLpv3x1pFx8CE1xhRoc

getCitiesInBetween(JSONObjects) -> [cityModels] //DONE
Return [cityModels]
One CityModel Object:
name
latitude
longitude
distance = 0 
calcDistanceForCities([cityModels], breakPoint)  //DONE
For every city in [cityModels]
var city-lat = city.latitude
var city-lon = city.longitude
city.distance = getDistance(breakPoint, city-lat, city-lon)
sortAllCities ([cityModels]) → [5CityModels]  //don’t need mid-points as argument because distance is in field distance    //DONE
Sort all the cityModels by their distance to the midpoint ascending order and return the first [5CityModels]
/*get5CityModels(mid-lat, mid-lon,[cityModels]) -> [5CityModels] */

getHotelsForCities([5CityModels])
For city in [5CityModels]
city.cheapestHotel = getCheapestHotel(cityName)
hotelModel:  Name, price

@ Frontend --- displays [5CityModelsForDisplay]  in rows that automatically pops up
[5CityModelsForDisplay]
An array containing 0-5 cities
Tap a city to find more cities around that city
On each row, display:
City-name ---------------- [button to search for activities]
- getActivities(cityName) -> [activityModel,...]       //DONE
	Type model: {name: , price: , duration: , recScore: , imageURL:, }
queryActivities(cityName)  
Sample : http://terminal2.expedia.com:80/x/activities/search?location=Paris&startDate=2016-08-08&endDate=2016-08-18&apikey=NH6oq54KA957fmLpv3x1pFx8CE1xhRoc



Page 2:
----------------------------   Web Browser View ------------------------------------------------
start-city
between-city 1
between-city 2
between-city 3
between-city 4
between-city 5
end-city
-----------------------------------------------------------------------------------------------

 --- Sent from frontend to backend:

userSelection
selected-activity             	---      	null if the user selected a city
selected-city			--- 	null if the user selected an activity 


Sent from backend to frontend
[JSONObject]

Convert from [JSONObject] to [nodeObject]
 
	nodeObject
		

activityModel











--------------

APIs

Activity search:
Pros: can get location, description, and price
Cons: can only search using 
http://terminal2.expedia.com:80/x/activities/search?location=Montreal&startDate=2016-06-04&endDate=2016-06-04&apikey=pvTBSyAhBBWKLgnGxW2h8LzOIjqEGoGM


--------
Extra info:
Paige’s API key: pvTBSyAhBBWKLgnGxW2h8LzOIjqEGoGM
Jing’s API key: NH6oq54KA957fmLpv3x1pFx8CE1xhRoc

GoogleMap API key: AIzaSyB5LyIEhdrka55mYbw5pIHSwDyA-FR82gw

API CALLS (as experimented with by Jordan)

Geography Search for cities, based on a lat/long coordinate, and search radius, looking for cities in that region
http://terminal2.expedia.com:80/x/geo/features?within=30km&lat=37.7874&lng=-122.4082&type=city&apikey=API


