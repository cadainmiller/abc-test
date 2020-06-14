const fetch = require("node-fetch");
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
      Addresses: ["Miami FL"],
    }),
  });

  return res.json();
}

async function printLocation() {
  const location = await getLocation();

  console.log(location);
}

printLocation();
