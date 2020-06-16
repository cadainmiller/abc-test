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
      .then((results) => {
        console.log("Latitude: " + results[0].latitude);
        console.log("Longitude: " + results[0].longitude);
        //
        //
        // get latitude and longitude from geocode object
        const latitude = results[0].latitude;
        const longitude = results[0].longitude;

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
        ).then(async (data) => {
          const count = Object.keys(data.geonames).length;
          console.log("Number of Records: " + count);
          for (var i = 0; i < count; i++) {
            arr.push(data.geonames[i].name);
          }
          // console.log(arr);
          //console.log(JSON.stringify(arr));
          //arr = JSON.parse(data.geonames);
          // const StringData = JSON.stringify(arr);
          //console.log(StringData);

          ////////////////////////
          const token = "Basic YXJjaGVyd2ViOlNHTk5MV1F6WXpSbU5UTmtMVEZpTXpZdE5ESXdNUzA1WXpRMUxXRm1NRFJsTW1FeFpHUm1ZeTF0VFdGRA==";
          const url = "https://devant2.archeratlantic.com/apidev/api/carriers/QueryCarriersByAddress";
          let headers = {}; 
          headers["Authorization"] = token;
          headers["Content-Type"] = "application/json";

          await fetch(url, {
            method: "post",
            headers,
            body: JSON.stringify({
              Addresses:arr,
            }),
          }).then(data => data.json()).then( data => {
            // return res.json();
            // console.log(data)
            res.render("pages/drivers", {
              data: data,
              title: "In " + searchResult,
            });
          }).catch( err => {
            console.error(err)

            res.render("pages/drivers", {
              data: err,
              title: error,
            });
          })

          /////////////////////
        });
      })
      .catch((err) => {
        console.log(err);
      });

  });
};
