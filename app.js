'use strict';

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/hotel');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var Hotel = require('./models/hotel');
var Room = require('./models/room');
// Constants
const PORT = 3000;
// App
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  Hotel.find({},function(err,hotels){
              res.render('pages/index', { hotels : hotels});
   });
});

app.get('/hotel/:name', function (req, res) {
  	Room.find({hotelname: req.params.name},function(err,rooms){
  		//booked: false,bookeduntil: {"$lt": new Date()}
              res.render('pages/item', { name : req.params.name, rooms: rooms});
    });
});

app.post('/book/:hotelname/:room', function (req, res) {
	var nights = JSON.parse(req.body.numberofnights.toString());
  	Room.findOne({hotelname: req.params.hotelname,roomnumber:req.params.room},function(err,item){
  		item.booked = true;
  		var newDate = new Date().getTime()+nights*86400000;
  		item.bookeduntil = new Date(newDate);
  		item.save();
  	});
    res.redirect('/hotel/'+req.params.hotelname);          
});

app.post('/cancel/:hotelname/:room', function (req, res) {
  	Room.findOne({hotelname: req.params.hotelname,roomnumber:req.params.room},function(err,item){
  		item.booked = false;
  		item.bookeduntil = new Date();
  		item.save();
  	});
    res.redirect('/hotel/'+req.params.hotelname);          
});


app.listen(PORT);
console.log('Running on http://localhost:' + PORT);