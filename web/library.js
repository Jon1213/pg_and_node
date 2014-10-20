"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost", "postgres", "postgresql");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

	// retrieve books
	db.query("SELECT * from books ORDER BY id;",[], function(err, resultSet){
		if (err) console.log("QUERY FAILED", err);
		resultSet.rows.forEach(function(row){
			//row.author, row.title, row.id
			var next_book = new Book(row.title, row.author, row.id);
			allBooks.push(next_book);
			console.log(row);
		});
		buzzer(allBooks);
	});


//	return allBooks;
};

Library.prototype.add = function(title, author, buzzer) {
	var newBook = {};
	db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *;",[title, author], function(err, resultSet){
		if (err) console.log("QUERY FAILED", err);
		resultSet.rows.forEach(function(row){
			var new_book = new Book(row.title, row.author, row.id);
		});
	});

	buzzer(newBook);
};

Library.prototype.destroy = function(id, buzzer) {
	// TODO
	// db.query... DELETE
	db.query("DELETE FROM books WHERE id = $1;",[id], function(err, resultSet){
		if (err) console.log("QUERY FAILED", err);
	});
	var buzzer = function(){

	};
	// call buzzer without params when done
	buzzer();
};

Library.prototype.update = function(id, title, author, buzzer) {
	// TODO
	// db.query... UPDATE
	db.query("UPDATE books SET title = $1, author = $2 WHERE id = $3;",[title, author, id], function(err, resultSet){
		if (err) console.log("QUERY FAILED", err);
	});
	// call buzzer without params when done

	buzzer();
};


Library.prototype.findById = function(id, buzzer) {
	var foundBook = {};
	// TODO
	// db.query... SELECT
	db.query("SELECT * from books WHERE id = $1;",[id], function(err, resultSet){
		if (err) console.log("QUERY FAILED", err);
		resultSet.rows.forEach(function(row){
			//row.author, row.title, row.id
			foundBook = new Book(row.title, row.author, row.id);
		});
		buzzer(foundBook);
	});
	// call buzzer with the book found
};

module.exports = Library;
