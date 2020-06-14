"use strict";

// ================================================================
// get all the tools we need
// ================================================================
var express = require("express");
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
var routes = require("./routes/index.js");
var port = process.env.PORT || 3000;

var app = express();

// ================================================================
// setup our express application
// ================================================================
app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

// ================================================================
// parse application/x-www-form-urlencoded
// ================================================================
app.use(bodyParser.urlencoded({ extended: false }));

// ================================================================
// parse application/json
// ================================================================
app.use(bodyParser.json());

// ================================================================
// setup routes
// ================================================================
routes(app);

// ================================================================
// start our server
// ================================================================
app.listen(port, function () {
  console.log("Server listening on port " + port + "...");
});
