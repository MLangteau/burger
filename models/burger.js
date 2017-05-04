// Inside burger.js, import orm.js into burger.js  to create functions that 
// 		"models" how to interface with burgers_db database
var orm = require("../config/orm.js");

// Also inside burger.js, create the code that will call the ORM functions using 
// 		burger specific input for the ORM.

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.  Passing the burgers string
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
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

