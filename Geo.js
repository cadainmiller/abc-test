var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
const { json } = require("body-parser");
const nodeGeocoder = require("node-geocoder");

function CityListFunction() {
  searchResult = "Miami";
  const geoCoder = nodeGeocoder(options);
  geoCoder
    .geocode(searchResult)
    .then((res) => {
      console.log("Latitude: " + res[0].latitude);
      console.log("Longitude: " + res[0].longitude);
      //
      //
      // get latitude and longitude from geocode object
      const latitude = res[0].latitude;
      const longitude = res[0].longitude;

      // set request options
      const responseStyle = "full"; // the length of the response
      const citySize = "cities15000"; // the minimal number of citizens a city must have
      const radius = searchRadius; // the radius in KM
      const maxRows = 30; // the maximum number of rows to retrieve
      const username = "jolones"; // the username of your GeoNames account

      async function postData_first(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          timeout: 3000,
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        });
        return response.json();
      }

      postData_first(
        "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" +
          latitude +
          "&lng=" +
          longitude +
          "&style=" +
          responseStyle +
          "&cities=" +
          citySize +
          "&radius=" +
          radius +
          "&maxRows=" +
          maxRows +
          "&username=" +
          username,
        true
      ).then((data) => {
        const count = Object.keys(data.geonames).length;
        console.log("Number of Records: " + count);
        for (var i = 0; i < count; i++) {
          arr.push(data.geonames[i].name);
        }
        //console.log(arr);
        //console.log(JSON.stringify(arr));
        //arr = JSON.parse(data.geonames);
        const StringData = JSON.stringify(arr);
        console.log(StringData);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return StringData;
}

CityListFunction();
