var mongoose = require('mongoose');

var facilitySchema = new mongoose.Schema({
    facilityName: String,
    userIds:  [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: String,
    contactName: String,
    contactPhone: String,
    contactEmail: String,
    buildingName: String,
    locationName: String,
    roomSize: String,
    securityNeeded: String,
    waiverNeeded: String,
    patientNumber: String,

    approved:  { type: Boolean, default: false },    // will change to false when admin panel able to approve
    approvedDate: Date,
    signUpDate: Date,
    approvedBy: String,
    notes: [{
        noteDate: Date,
        noteText: String
    }],
    gigs: [{
        start: Date,
        end: Date,
        details: { type: String, default: ''},
        musician: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Musician'
        }
    }]

});

module.exports = mongoose.model('Facility', facilitySchema);
