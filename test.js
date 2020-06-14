const fetch = require("node-fetch");

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
  { Addresses: ["Portland"] }
).then((data) => {
  console.log(data);
});

console.log(
  "Address: " + data.geonames[i].name + " State: " + data.geonames[i].adminCode1
);

/////////////////////////////////////////////////////////

function CityListFunction() {
  geoCoder
    .geocode(searchResult)
    .then((res) => {
      console.log(res[0].latitude);
      console.log(res[0].longitude);
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
        console.log("Number of Records:" + count);

        for (var i = 0; i < count; i++) {
          console.log(data.geonames[i].name);
          geoList = data.geonames[i].name;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return 123;
}
