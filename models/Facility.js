var mongoose = require('mongoose');

var facilitySchema = new mongoose.Schema({
    facilityName: String,
    username: Array,
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
    securityNeeded: String,
    securityQty: Number,
    peformanceAreaLength: Number,
    performanceAreaWidth: Number,
    waiverNeeded: Boolean,
    waiverURL: String,
    performanceAreaCapacity: Number,
    isActive: Boolean,
    approved: Boolean,
    approvedBy: String,
    previousEngagements: Number,
    canceledEngagements: Number,
    notes: Array
});

module.exports = mongoose.model('Facility', facilitySchema);
