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

router.get("/burgers", function(req, res) {
  burger.all(function(data) {
    var handlebrsObject = {
      burgers: data
    };
//    console.log(handlebrsObject);
    console.log(('controller response  = ' + JSON.stringify(handlebrsObject)).inverse.cyan);
    res.render("index", handlebrsObject);
  });
});

router.post("/burgers/create", function(req, res) {
  console.log("res", res);
  console.log("req.body", req.body);
  burger.create(req.body.burger_name, function(result) {
//    console.log("result", result);
    console.log(('controller response  = ' + JSON.stringify(result)).inverse.cyan);
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

//  console.log("condition", condition);

  console.log(('controller condition  = ' + JSON.stringify(condition)).inverse.cyan);
  
  burger.update({devoured: req.body.devoured}, condition, function() {
      console.log(('\ncontroller devoured  = ' + JSON.stringify(req.body.devoured)).inverse.cyan);
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(('\ncontroller devoured  = ' + JSON.stringify(req.params.id)).inverse.blue);
  burger.delete(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
