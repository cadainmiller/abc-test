const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { response } = require("express");
const { json } = require("body-parser");
const nodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "", // for Mapquest, OpenCage, Google Premier
  formatter: "json", // 'gpx', 'string', ...
};

const searchResult = "Miami FL";
const searchRadius = 10;
const arr = [];
const StringData = "";

// set request options
const responseStyle = "full"; // the length of the response
const citySize = "cities15000"; // the minimal number of citizens a city must have
const radius = searchRadius; // the radius in KM
const maxRows = 100; // the maximum number of rows to retrieve
const username = "jolones"; // the username of your GeoNames account

function GolocationInfo() {
  // const geoCoder = nodeGeocoder(options);
  //const res = geoCoder.geocode("29 champs elysée paris");
  //console.log(res);
  const latitude = 25.7742658;
  const longitude = -80.1936589;

  return { latitude, longitude };
}

async function cityList(callback) {
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

  let { latitude, longitude } = GolocationInfo();

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
    //console.log(data);
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
  });
  const StringData = JSON.stringify(arr);
  //console.log("RETURN DATA: " + StringData);
  callback(arr);
}

const list = cityList(function (newArr) {
  newList = newArr;
  return newList;
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
    // mode: "cors",
    headers,
    body: JSON.stringify({
      Addresses: newList,
    }),
  });

  return res.json();
}

async function printLocation() {
  const location = await getLocation();
  console.log(location);
}

//GolocationInfo();

printLocation();

//cityList();
