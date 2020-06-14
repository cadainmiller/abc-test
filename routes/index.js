var bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
const { json } = require("body-parser");
const nodeGeocoder = require("node-geocoder");
//const cityList = require("../");
("use strict");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  const options = {
    provider: "openstreetmap",
  };

  const geoCoder = nodeGeocoder(options);

  app.get("/", function (req, res) {
    res.render("pages/index");
  });

  app.get("/drivers", urlencodedParser, function (req, res) {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials:
          "YXJjaGVyd2ViOlNHTk5MV1F6WXpSbU5UTmtMVEZpTXpZdE5ESXdNUzA1WXpRMUxXRm1NRFJsTW1FeFpHUm1ZeTF0VFdGRA== Basic",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData(
      "https://devant2.archeratlantic.com/apidev/api/carriers/QueryCarriersByAddress",
      { Addresses: ["Miami FL", "Portland OR", "CLEAR LAKE, MN"] }
    ).then((data) => {
      res.render("pages/drivers", { data: data, title: "" });
    });
  });

  app.post("/drivers", urlencodedParser, function (req, res, next) {
    console.log("User Address: " + req.body.search);
    var searchResult = req.body.search;
    var searchRadius = req.body.radius;
    var arr = [];
    var StringData = "";

    // set request options
    const responseStyle = "full"; // the length of the response
    const citySize = "cities15000"; // the minimal number of citizens a city must have
    const radius = searchRadius; // the radius in KM
    const maxRows = 100; // the maximum number of rows to retrieve
    const username = "jolones"; // the username of your GeoNames account

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
          //console.log(StringData);

          return StringData;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    async function getLocation() {
      const token =
        "Basic YXJjaGVyd2ViOlNHTk5MV1F6WXpSbU5UTmtMVEZpTXpZdE5ESXdNUzA1WXpRMUxXRm1NRFJsTW1FeFpHUm1ZeTF0VFdGRA==";
      const url =
        "https://devant2.archeratlantic.com/apidev/api/carriers/QueryCarriersByAddress";
      let headers = {}; //new Headers()
      headers["Authorization"] = token;
      headers["Content-Type"] = "application/json";

      const res = await fetch(url, {
        method: "post",
        headers,
        body: JSON.stringify({
          Addresses: [
            "Miami",
            "Allapattah",
            "Miami Beach",
            "Brownsville",
            "Coconut Grove",
            "Coral Gables",
            "West Little River",
            "Pinewood",
            "Coral Terrace",
            "Flagami",
            "Hialeah",
            "North Miami",
            "Westchester",
            "Glenvar Heights",
            "Golden Glades",
            "Opa-locka",
            "Fountainbleau",
            "Kendall",
            "Pinecrest",
            "Hialeah Gardens",
            "Doral",
            "Sunset",
            "University Park",
            "North Miami Beach",
            "Sweetwater",
            "Miami Lakes",
            "Carol City",
            "Miami Gardens",
            "Norland",
            "Ojus",
            "Tamiami",
            "Sunny Isles Beach",
            "Ives Estates",
            "Aventura",
            "Cutler",
            "Palmetto Bay",
            "Kendale Lakes",
            "Country Club",
            "West Park",
            "Hallandale",
            "The Crossings",
            "Miramar",
            "Three Lakes",
            "Pembroke Pines",
            "Kendall West",
            "Cutler Bay",
            "Cutler Ridge",
            "Hollywood",
            "South Miami Heights",
            "West Hollywood",
            "The Hammocks",
            "Country Walk",
            "Richmond West",
            "Dania Beach",
            "Davie",
            "Cooper City",
            "Princeton",
            "Fort Lauderdale",
            "Leisure City",
            "Plantation",
            "Lauderhill",
            "Sunrise",
            "Weston",
            "Lauderdale Lakes",
            "Homestead",
            "Oakland Park",
            "Tamarac",
            "North Lauderdale",
            "Pompano Beach",
            "Margate",
            "Coconut Creek",
            "Coral Springs",
            "Parkland",
            "Deerfield Beach",
            "Sandalfoot Cove",
            "Boca Del Mar",
            "Boca Raton",
            "Delray Beach",
            "Boynton Beach",
            "Lake Worth Corridor",
            "Lake Worth",
            "Greenacres City",
            "Palm Springs",
            "Wellington",
          ],
        }),
      });

      return res.json();
    }

    async function printLocation() {
      const location = await getLocation();

      //console.log(location);

      res.render("pages/drivers", {
        data: location,
        title: "In " + searchResult,
      });
    }

    printLocation();
  });
};
