// Import MySQL connection.
var connection = require("../config/connection.js");

// This function is used to have a changeable number of ? marks for the queryString,
//     depending on the number of values to be added to the database (num is the vals.length)
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
      arr.push("?");
    }

    return arr.toString();
};

//  This helper function takes the objColVals ({devoured: true}, in this case) and put it into
//  the correct SQL syntax for the queryString to be used in the connection.query
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
      if (Object.hasOwnProperty.call(ob, key)) {
        arr.push(key + "=" + ob[key]);
      }
    }
//    console.log("arr.toString: " +  arr.toString());
    return arr.toString();
};

// orm is the Object for all our SQL statement functions/methods.
var orm = {
//  selectAll is used to display all burgers
  selectAll: function(tableInput, cb) {

      //  var queryString = "SELECT * FROM " + tableInput + ";  (using ES6 template literal below)
        var queryString = `SELECT * FROM ${tableInput};`;

      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

  insertOne: function(table, cols, vals, cb) {
    // insertOne function creates a row in the database with the values passed in.
      // The variables cols and vals are arrays.  Passing the burgers string, devoured value (false)
      cols = cols.toString();
      //  Using template literals `${}` to create cleaner lines of code in many cases (**New for ES6)
      //  The NEW WAY: (one line of code);
      //  Using template literals, you can call a function (denoted like a variable)

      //  An example of the queryString is "INSERT INTO burgers (burger_name,devoured) VALUES (?,?)""
      //  with the VALUES being [name, false] - 

      var queryString = `INSERT INTO ${table} (${cols}) VALUES (${printQuestionMarks(vals.length)});`;

      // The OLD WAY: (7 lines of code down to 1);

      // var queryString = "INSERT INTO " + table;
      // queryString += " (";
      // queryString += cols.toString();  //  would be cols now since 'cols = cols.toString();' above
      // queryString += ") ";
      // queryString += "VALUES (";
      // queryString += printQuestionMarks(vals.length);
      // queryString += ") ";

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
  },


  updateOne: function(table, objColVals, condition, cb) {

  // updateOne function changes the devoured field from false to true in the database
  // objColVals would be {devoured: true} 

  //  Using the ES6 template literal again (dropped 5 lines down to 1) for queryString
  //  An example the queryString is "UPDATE table SET devoured=true WHERE id = 27"
      var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
      connection.query(queryString, function(err, result) {
          if (err) {
              throw err;
          }
          cb(result);
      });
  },

  //  ADD DELETE for keeping database and localhost screen entries clean
  delete: function(table, condition, cb) {
      var queryString = `DELETE FROM ${table} WHERE ${condition};`;
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