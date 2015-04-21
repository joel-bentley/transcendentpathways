var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var User = require('../models/User');
var Facility = require('../models/Facility');



exports.getSignupFacility = function(req, res) {
    if (req.user) return res.redirect('/');
    res.render('account/signupFacility', {
        title: 'Create Facility Account'
    });
};

exports.getFacilityDetails = function(req, res){
    if(!req.user) return res.redirect('/');
    res.render('account/facilityDetails', {
        title: 'Facility Details'
    });
};

exports.postFacilityDetails = function(req, res, next){
    var facility = new Facility({
        facilityName: req.body.facilityName || '',
        userIds: req.user._id || '',
        address1: req.body.address1 || '',
        address2: req.body.address2 || '',
        city: req.body.city || '',
        state: req.body.state || '',
        zipcode: req.body.zipcode || '',
        contactName: req.body.contactName || '',
        contactPhone: req.body.contactPhone || '',
        contactEmail: req.body.contactEmail || '',
        buildingName: req.body.buildingName || '',
        locationName: req.body.locationName || '',
        roomSize: req.body.roomSize || '',
        securityNeeded: req.body.securityNeeded || '',
        waiverNeeded: req.body.waiverNeeded || '',
        patientNumber: req.body.patientNumber || ''
    });
    facility.save(function(err) {
        if (err) return next(err);
        res.redirect('/homeFacility');
    });
};


exports.getHomeFacility = function(req, res) {
    res.render('homeFacility', {
        title: 'Facility Home'
    });
};










exports.getUpdateFacilityDetails = function(req, res) {

    Facility.findOne( { userIds : { $all : [ req.user._id ] } }, function(err, facility) {

        if (facility === null) return null;   // added to prevent crash, should change this to proper error

        res.render('account/updateFacilityDetails', {
            title: 'Update Facility Details',
            facilityName: facility._doc.facilityName,
            address1: facility._doc.address1,
            address2: facility._doc.address2,
            city: facility._doc.city,
            state: facility._doc.state,
            zipcode: facility._doc.zipcode,
            contactName: facility._doc.contactName,
            contactPhone: facility._doc.contactPhone,
            contactEmail: facility._doc.contactEmail,
            buildingName: facility._doc.buildingName,
            locationName: facility._doc.locationName,
            roomSize: facility._doc.roomSize,
            securityNeeded: facility._doc.securityNeeded,
            waiverNeeded: facility._doc.waiverNeeded,
            patientNumber: facility._doc.patientNumber
        });
    });
};

exports.postUpdateFacilityDetails = function(req, res, next) {
    Facility.findOne( { userIds : { $all : [ req.user._id ] } }, function(err, facility) {

        if (err) return next(err);

        facility.facilityName = req.body.facilityName || '';
        facility.address1 = req.body.address1 || '';
        facility.address2 = req.body.address2 || '';
        facility.city = req.body.city || '';
        facility.state = req.body.state || '';
        facility.zipcode = req.body.zipcode || '';
        facility.contactName = req.body.contactName || '';
        facility.contactPhone = req.body.contactPhone || '';
        facility.contactEmail = req.body.contactEmail || '';
        facility.buildingName = req.body.buildingName || '';
        facility.locationName = req.body.locationName || '';
        facility.roomSize = req.body.roomSize || '';
        facility.securityNeeded = req.body.securityNeeded || '';
        facility.waiverNeeded = req.body.waiverNeeded || '';
        facility.patientNumber = req.body.patientNumber || '';


        facility.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Facility Details Updated for ' + facility.facilityName });
            res.redirect('/account');
        });
    });
};
