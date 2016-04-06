var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Hotel = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    rooms: []
});

module.exports = mongoose.model('Hotel', Hotel);