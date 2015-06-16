var _ = require('lodash');
var async = require('async');
var Musician = require('../models/Musician');
var Facility = require('../models/Facility');
var Event = require('../models/Event');

exports.getHomeAdmin = function(req, res) {
    res.render('homeAdmin', {
        title: 'Admin Musicians'
    });
};

exports.getHomeAdminFacility = function(req, res) {
    res.render('homeAdminFacility', {
        title: 'Admin Facilities'
    });
};

exports.getHomeAdminEvent = function(req, res){
    res.render('homeAdminEvent', {
        title: 'Admin Events'
    })
};

 exports.getMusicianData = function(req, response) {
    Musician.find({}).exec(function(err, musician){
        var musicianData = musician;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(musicianData));
    });
};

exports.getFacilityData = function(req, response) {
    Facility.find({}).exec(function(err, facility){
        var facilityData = facility;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(facilityData));
    });
};

exports.getEventData = function(req, response) {
    Event.find({}).sort('start').exec(function(err, event){
        var eventData = event;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(eventData));
    });
};

exports.getFacilityInfo = function(req, response, next){
    Facility.findOne({facilityName: req.body.name}).exec(function(err, facility){
        if (err) return next(err);
        var facilityData = facility;
        //console.log(facility);
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(facilityData));
    });
};

exports.postUpdateMusicianDetails = function(req, res, next) {
    Musician.findOne({_id: req.body._id}).exec(function(err, musician) {
        if (err) return next(err);
        musician.performerName = req.body.performerName || '';
        musician.contactName = req.body.contactName || '';
        musician.address1 = req.body.address1 || '';
        musician.address2 = req.body.address2 || '';
        musician.city = req.body.city || '';
        musician.state = req.body.state || '';
        musician.zipcode = req.body.zipcode || '';
        musician.phone = req.body.phone || '';
        musician.instruments = req.body.instruments || '';
        musician.website = req.body.website || '';
        musician.picture = req.body.picture || '';
        musician.biography = req.body.biography || '';
        musician.approvedDate = req.body.approvedDate;
        musician.approvedBy = req.body.approvedBy;
        musician.signUpDate = req.body.signUpDate;
        musician.approved = req.body.approved;
        musician.notes = req.body.notes;

        musician.save(function(err) {
            if (err) return next(err);
            //req.flash('success', { msg: 'Musician Details Updated for ' + musician.performerName });
            //res.redirect('/account');
        });
    });
};
exports.postUpdateFacilityDetails = function(req, res, next) {
    Facility.findOne({_id: req.body._id}).exec(function(err, facility) {
        if (err) return next(err);
        facility.facilityName = req.body.facilityName || '';
        facility.address1 = req.body.address1 || '';
        facility.address2 = req.body.address2 || '';
        facility.city = req.body.city || '';
        facility.state = req.body.state || '';
        facility.zipcode = req.body.zipcode || '';
        facility.contactName = req.body.contactName || '';
        facility.contactPhone = req.body.contactPhone || '';
        facility.buildingName = req.body.buildingName || '';
        facility.locationName = req.body.locationName || '';
        facility.roomSize = req.body.roomSize || '';
        facility.securityNeeded = req.body.securityNeeded || '';
        facility.waiverNeeded = req.body.waiverNeeded;
        facility.patientNumber = req.body.patientNumber;
        facility.approved = req.body.approved;
        facility.approvedDate = req.body.approvedDate;
        facility.signUpDate = req.body.signUpDate;
        facility.approvedBy = req.body.approvedBy;
        facility.notes = req.body.notes;

        facility.save(function(err) {
            if (err) return next(err);
        });
    });
};

exports.postUpdateEventDetails = function(req, res, next) {
    Event.findOne({_id: req.body._id}).exec(function(err, event) {
        if (err) return next(err);
        event.facilityName = req.body.facilityName || '';
        event.start = req.body.start || '';
        event.end = req.body.end || '';
        event.description = req.body.description || '';
        event.status = req.body.status;
        event.requestedBy = req.body.requestedBy || '';
        event.approvedMusicianName = req.body.approvedMusicianName || '';
        event.payment = req.body.payment || '';
        event.performance = req.body.performance || '';

        event.save(function(err) {
            if (err) return next(err);
        });
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(event));
    });
};



