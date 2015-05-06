var _ = require('lodash');
var async = require('async');
var Musician = require('../models/Musician');
var Facility = require('../models/Facility');

/**
 * GET /login
 * Login page.
 */
exports.getHomeAdmin = function(req, res) {
    res.render('homeAdmin', {
        title: 'Admin Home'
    });
};

exports.getHomeAdminFacility = function(req, res) {
    res.render('homeAdminFacility', {
        title: 'Admin Home'
    });
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

exports.getMusician = function(req, res) {
    Musician.findOne({_id: req.params.id}).exec(function (err, doc) {
        console.log(doc);
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

        facility.save(function(err) {
            if (err) return next(err);
        });
    });
};