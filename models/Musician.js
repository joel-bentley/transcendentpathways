var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    performerName: { type: String, unique: true },
    userIds: Array,
    contactName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    instruments: String,
    website: String,
    picture: String,
    biography: String,

    approved: Boolean,
    approvedDate: Date,
    signUpDate: Date,
    approvedBy: String,
    notes: Array
});

module.exports = mongoose.model('Musician', userSchema);


