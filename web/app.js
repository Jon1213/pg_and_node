"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

var header = "<header></header>";
var footer = "<footer><ul><li>Contact</li><li>About Us</li><li>Careers</li></ul></footer>";

var includes = {};
includes.header = header;
includes.footer = footer;

//let's get some templating up in here shortly. 

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS");
  
  var buzzer = function(leBooks){
    res.render('library/index', {allBooks: leBooks});
  };

  library.all(buzzer);
});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
	//TODO

  console.log("/books -> Implement me.");
  var buzzer = function(){
    res.redirect('/books');
  };
  library.add(req.body.book.title, req.body.book.author, buzzer);
  
});

//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  //TODO
  // library.findById ...
  var foundBook = {};
  
  var buzzer = function(foundBook){
    res.render('library/edit', {book: foundBook});
  };
  library.findById(id, buzzer);
  buzzer(foundBook);
 
  // Add library/show.ejs page and render it with found book
  // Add "Show" link on '/books' page.
  res.send("implement show book. showing book " + req.params.id);
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  //TODO
  // library.findById ...

  var foundBook = {};
  
  var buzzer = function(foundBook){
    res.render('library/edit', {book: foundBook});
  };
  library.findById(id, buzzer);
});

//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  console.log("book: " + req.params.id + " title: " + req.body.book.title + " author: " + req.body.book.author);
  // library.update ...
  var buzzer = function(){
    res.redirect('/books');
  };
  library.update(req.params.id, req.body.book.title, req.body.book.author, buzzer);
  
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  var buzzer = function(){
    res.redirect('/books');
  };
  //TODO
  // library.destroy ...
  library.destroy(id, buzzer);
  
  
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});