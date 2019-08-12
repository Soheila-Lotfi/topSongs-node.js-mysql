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
          multiSearch();
          break;
        case "Find data within a specific range":
          rangeSearch();
          break;
        case "Find data within a specific range":
          songSearch();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answers) {
      connection.query(
        "SELECT position, song, year From top1000 WHERE ?",
        { artist: answers.artist },
        function(err, res) {
          if (err) throw err;
          for (i = 0; i < res.length; i++) {
            console.log(
              "position :" +
                res[i].position +
                "|| song :" +
                res[i].song +
                "|| yesr :" +
                res[i].year
            );
          }
        }
      );
    });
  runSearch();
}

function multiSearch() {
  connection.query(
    "SELECT artist From top1000 GROUP BY artist HAVING COUNT(artist)>1",
    function(err, res) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
    }
  );
}

function rangeSearch() {
  inquirer
    .prompt(
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          } else {
            return false;
          }
        }
      }
    )
    .then(function(answers) {
      connect.query(
        "SELECT position, artist, song, year FROM top1000 WHERE position BETWEEN ? AND ?",
        [answers.start, answers.end],
        function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist +
                " || Year: " +
                res[i].year
            );
          }
          runSearch();
        }
      );
    });
}
function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query(
        "SELECT * FROM top5000 WHERE ?",
        { song: answer.song },
        function(err, res) {
          if (err) throw err;
          console.log(
            "Position: " +
              res[0].position +
              " || Song: " +
              res[0].song +
              " || Artist: " +
              res[0].artist +
              " || Year: " +
              res[0].year
          );
          runSearch();
        }
      );
    });
}
