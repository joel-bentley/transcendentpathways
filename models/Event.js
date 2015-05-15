var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    facilityName: String,
    facilityId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Facility'
    },
    startTime: Date,
    endTime: Date,
    description: { type: String, default: ''},
    status: {
        completed: { type: Boolean, default: false },
        canceled: { type: Boolean, default: false },
        open: { type: Boolean, default: true },
        requested: { type: Boolean, default: false },
        approved: { type: Boolean, default: false }
    },
    requestedBy: [{
        musicianName: String,
        musicianId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Musician'
        }
    }],
    approvedMusicianName: String,
    approvedMusicianId:  {
        type: mongoose.Schema.Types.ObjectId, ref: 'Musician'
    },
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