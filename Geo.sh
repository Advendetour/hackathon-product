#!/bin/bash

#Takes 1 argument (city), and gives latitude and longitude
function geocode () {
  city=$1
  curl "https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAwe6XMoayWw_yOH48YW4zBNf2XGnyZYeo" > newcode


  lat=$(cat newcode | jq '.results[0] .geometry .location .lat')
  long=$(cat newcode | jq '.results[0] .geometry .location .lng')

  echo lat $lat
  echo long $long
}
geocode $1
