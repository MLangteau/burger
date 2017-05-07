// create all functions that has the routing for the app

var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Import colors for console.logging 
var colors = require('colors');

// Create all our routes
router.get("/", function(req, res) {
    res.redirect("/burgers");
  });

// Router to the burger.js file with the handlebars Object for displaying all
router.get("/burgers", function(req, res) {
  burger.selectAll(function(data) {
    var handlebrsObject = {
      burgers: data
    };
    //  using the index.handlebars file for displaying the object
    res.render("index", handlebrsObject);
  });
});

// Router to the burger.js file with the burger name
router.post("/burgers/create", function(req, res) {
  burger.insertOne(req.body.burger_name, function(result) {
    res.redirect("/");
  });
});

// Router for updating one of the "burgers" from "not devoured" to "devoured"
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({devoured: req.body.devoured}, condition, function() {
    res.redirect("/");
  });
});

// Router for deletion 
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
