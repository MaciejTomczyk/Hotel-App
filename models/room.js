var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Room = new Schema({
	roomnumber: {type: Number, required:true},
    hotelname: {type: String, required: true},
    roomtype: {type: String, required: true},
    side: {type: String, required: true},
    booked: {type: Boolean, default: false},
    bookeduntil: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', Room);