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
    latitude: Number,
    longitude: Number,
    contactName: String,
    contactPhone: String,
    contactEmail: String,
    buildingName: String,
    locationName: String,
    roomSize: String,
    securityNeeded: String,
    waiverNeeded: String,
    patientNumber: String,

    approved:  { type: Boolean, default: false },
    approvedDate: Date,
    signUpDate: Date,
    approvedBy: String,
    notes: [{
        noteDate: Date,
        noteText: String
    }]
});

module.exports = mongoose.model('Facility', facilitySchema);



//gigs: [{
//    start: Date,
//    end: Date,
//    details: { type: String, default: ''},
//    musician: {
//        type: mongoose.Schema.Types.ObjectId, ref: 'Musician'
//    }
//}]
