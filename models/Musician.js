var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    performerName: { type: String, unique: true },
    username: Array,
    contactName: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    website: String,
    references: Array,
    instruments: Array,
    approvedToPerform: Boolean,
    approvedDate: Date,
    signUpDate: Date,
    approvedBy: String,
    scheduledPerformances: {
        facilityName: {type: String},
        performanceDate: {type: Date},
        performanceTime: {type: String},
        performanceCompleted: {type: Boolean},
        payAmount: {type: Number},
        paid: {type: Boolean},
        paidDate: {type: Date},
        paidReference: {type: String}
    },
    performerPhoto: String
});

module.exports = mongoose.model('Musician', userSchema);


