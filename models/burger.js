// Inside burger.js, import orm.js into burger.js  to create functions that 
// 		"models" how to interface with burgers_db database
var orm = require("../config/orm.js");

// Also inside burger.js, create the code that will call the ORM functions using 
// 		burger specific input for the ORM.

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      console.log(('MODEL all response  = ' + JSON.stringify(res)).inverse.red);
      cb(res);
    });
  },
  // The variables cols and vals are arrays.  Passing the burgers string
  create: function(name, cb) {
    orm.create("burgers", ["burger_name", "devoured"], [name, false], function(res) {
        console.log(('MODEL create response  = ' + JSON.stringify(name)).inverse.red);
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", {devoured: true}, condition, function(res) {
        console.log(('MODEL update response  = ' + JSON.stringify(objColVals)).inverse.red);
      cb(res);
    });
  }
  /*
  delete: function(condition, cb) {
    orm.update("burgers", condition, function(res) {
      cb(res);
    });
  }
*/

};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;

