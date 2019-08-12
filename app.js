var mysql = require("mysql");
var inquirer = require(inquirer);

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Leila@1357",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      choice: [
        "Find songs by artist",
        "Find all artists who appear more than once",
        "Find data within a specific range",
        "Search for a specific song",
        "exit"
      ]
    })
    .then(function(answers) {
      switch (answers.action) {
        case "Find songs by artist":
          artistSearch();
          break;
        case "Find all artists who appear more than once":
          artistSearch();
          break;
        case "Find data within a specific range":
          artistSearch();
          break;
        case "Find data within a specific range":
          artistSearch();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}
