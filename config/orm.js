// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {

    //  var queryString = "SELECT * FROM " + tableInput + ";";
      var queryString = `SELECT * FROM ${tableInput};`;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
//    console.log("COLLLLL", cols, "VALLLLS", vals);
    cols = cols.toString();

    //  Using template literals `${}` to create cleaner lines of code in many cases (**New for ES6)
    // The NEW WAY: (one line of code);
    var queryString = `INSERT INTO ${table} (${cols}) VALUES (${printQuestionMarks(vals.length)});`;

    // The OLD WAY: (five lines of code);  (not including cols.toString above, since it changed)
    // var queryString = "INSERT INTO " + table;
    // queryString += " (";
    // queryString += cols.toString();
    // queryString += ") ";
    // queryString += "VALUES (";

    // queryString += printQuestionMarks(vals.length);
    // queryString += ") ";

    console.log(("queryString in create"  + JSON.stringify(queryString)).inverse.blue);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {burger_name: beef, devoured: true}
  update: function(table, objColVals, condition, cb) {

  //  Using the new ES6 object literal (five line down to 1, again)
   var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

   //  var queryString = "UPDATE " + table;
   //  queryString += " SET ";
   //  queryString += objToSql(objColVals);
   //  queryString += " WHERE ";
   //  queryString += condition;

    console.log(("queryString in update: "  + JSON.stringify(queryString)).inverse.blue);
    console.log(('ORM objColVals update = ' + JSON.stringify(objColVals)).inverse.blue);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  //  ADD this DELETE for future reference
  delete: function(table, condition, cb) {

    var queryString = `DELETE FROM ${table} WHERE ${condition};`;

    // var queryString = "DELETE FROM " + table;
    // queryString += " WHERE ";
    // queryString += condition;
    console.log("delete queryString: " + queryString);
    console.log("condition: " + condition);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the ORM object in module.exports (burger.js)
module.exports = orm;