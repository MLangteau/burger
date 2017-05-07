// Inside burger.js, import orm.js into burger.js  to create functions that 
// 		"models" how to interface with burgers_db database
var orm = require("../config/orm.js");

// Also inside burger.js, created the code that will call the ORM functions/methods using 
// 		burger specific input for the ORM.

var burger = {
  table: "burgers",
  // Prints out all of the burgers onto the page (devoured and not-devoured)
  selectAll: function(cb) {
    orm.selectAll(this.table, function(res) {
//      console.log(('MODEL all response  = ' + JSON.stringify(res)).inverse.red);
      cb(res);
    });
  },

  // The variables cols and vals are arrays.  Passing the burgers string, etc.
  insertOne: function(name, cb) {
    orm.insertOne(this.table, ["burger_name", "devoured"], [name, false], function(res) {
//        console.log(('MODEL create response  = ' + JSON.stringify(name)).inverse.red);
      cb(res);
    });
  },

  updateOne: function(objColVals, condition, cb) {
    // update one field {devoured: true} and passes it to function in objColVals
    orm.updateOne(this.table, {devoured: true}, condition, function(res) {
//        console.log(('MODEL update response  = ' + JSON.stringify(objColVals)).inverse.red);
      cb(res);
    });
  },

  delete: function(condition, cb) {
    // deletes an entry from the table
    orm.delete(this.table, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
