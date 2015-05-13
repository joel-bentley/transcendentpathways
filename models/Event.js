var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    facilityName: String,
    startTime: Date,
    endTime: Date,
    description: String,
    status: {
        completed: Boolean,
        canceled: Boolean,
        open: Boolean,
        requested: Boolean,
        approved: Boolean
    },
    requestedBy: [{
        musicianName: String
    }],
    approvedMusician: String,
    payment: {
        status: String,
        paidDate: Date,
        reference: String
    },
    performance: {
        facilityRating: Number,
        facilityFeedback: String,
        musicianRating: Number,
        musicianFeedback: String
    }
});

module.exports = mongoose.model('Event', eventSchema);