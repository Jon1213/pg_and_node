"use strict"

var pg = require('pg');

var db = {};
db.config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: ""
};

db.connect = function(buzzer) {
  pg.connect(db.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);
      done();
  });
};

db.query = function(statement, params, anotherBuzzer){
  db.connect(function(client){
    client.query(statement, params, anotherBuzzer);
  });
};

db.query("SELECT * FROM books;", function(err, resultSet){
    if (err) console.log("SELECT FAILED :-(", err);
    console.log(resultSet.rows);
});

db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
["The Great Gatsby", "Fitzgerald"], function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
});

// Excercise: add UPDATE and DELETE calls

db.query("UPDATE books SET author = 'F. Scott Fitzgerald' WHERE title = 'The Great Gatsby", function(err, resultSet){
  if (err) console.log("UPDATE failed", err);
});

db.query("DELETE from books WHERE title = $1 AND author = $2", ["F. Scott Fitzgerald"], function(err, resultSet){
  if (err) console.log("UPDATE failed", err);
});

pg.end();
