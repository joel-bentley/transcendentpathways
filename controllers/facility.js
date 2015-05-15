var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');

var User = require('../models/User');
var Facility = require('../models/Facility');
var Event = require('../models/Event');



exports.getSignupFacility = function(req, res) {
    if (req.user) return res.redirect('/');
    res.render('account/signupFacility', {
        title: 'Create Facility Account'
    });
};


exports.getFacilityDetails = function(req, res){
    if(!req.user) return res.redirect('/');

    if(req.user.detailsId) return res.redirect('/homeFacility');

    if(req.user.accountType==='Facility') {

        return res.render('account/facilityDetails', {
            title: 'Facility Details'
        });
    }
    res.redirect('/');
};



exports.postFacilityDetails = function(req, res, next){
    var facility = new Facility({
        facilityName: req.body.facilityName || '',
        userIds: req.user.id || '',
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

        User.findById(req.user.id, function(err, user) {                    // Save Id from Facility in User
            if (err) return next(err);

            user.detailsId = facility.id;

            user.save(function(err) {
                if (err) return next(err);

                res.redirect('/homeFacility');
            });
        });
    });
};


exports.getHomeFacility = function(req, res) {

    if (req.user.accountType==='Facility') {

        if (req.user.detailsId) {
            return res.render('homeFacility', {
                title: 'Facility Home'
            });
        } else {
            return res.redirect('/facilityDetails');
        }
    }
    res.redirect('/');
};


exports.getUpdateFacilityDetails = function(req, res) {

    Facility.findOne( { userIds : { $all : [ req.user.id ] } }, function(err, facility) {

        if (facility === null) {
            req.flash('error', { msg: 'Facility account not found.' });
            return res.redirect('/facilityDetails');
        } else {

            return res.render('account/updateFacilityDetails', {
                title: 'Update Facility Details',
                facilityName: facility.facilityName,
                address1: facility.address1,
                address2: facility.address2,
                city: facility.city,
                state: facility.state,
                zipcode: facility.zipcode,
                contactName: facility.contactName,
                contactPhone: facility.contactPhone,
                contactEmail: facility.contactEmail,
                buildingName: facility.buildingName,
                locationName: facility.locationName,
                roomSize: facility.roomSize,
                securityNeeded: facility.securityNeeded,
                waiverNeeded: facility.waiverNeeded,
                patientNumber: facility.patientNumber
            });
        }
    });
};

exports.postUpdateFacilityDetails = function(req, res, next) {
    Facility.findOne( { userIds : { $all : [ req.user.id ] } }, function(err, facility) {

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
            return res.redirect('/account');
        });
    });
};


exports.postGigDetails = function(req, res, next) {

    Facility.findById( req.user.detailsId, function(err, facility) {

        if (err) return next(err);

        var event = new Event({
            facilityName: facility.facilityName,
            facilityId: facility.id,
            startTime: new Date(req.body.date + ' ' + req.body.startTime),
            endTime: new Date(req.body.date + ' ' + req.body.endTime),
            description: req.body.description
        });

        event.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Event details posted for ' + facility.facilityName });
            return res.redirect('/homeFacility');
        });
    });
};


exports.getGigListing = function(req, res, next) {
    Event.find( { 'status.open': true } , {
            facilityName: true,
            startTime: true,
            endTime: true,
            description: true,
            _id: false
        }, {sort: {startTime: 1}}, function(err, gigs) {

            if (err) return next(err);

            if (!(gigs===null)) {
                res.json(gigs);
        }
    });
};