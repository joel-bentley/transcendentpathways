var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');

var User = require('../models/User');
var Facility = require('../models/Facility');
var Event = require('../models/Event');

var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
    apiKey: "AIzaSyDumEXAOtWsGFb7FX9yoXZ6zNkZKTkvn5U",
    formatter: null
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


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
        latitude: Number,
        longitude: Number,
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

    var address = facility.address1 + ' ' + facility.address2 + ' ' + facility.city + ' ' + facility.state + ' ' +
        facility.zipcode;
    geocoder.geocode(address, function(err, response) {
        response = response.pop();
        var lat = response.latitude;
        var lon = response.longitude;
        console.log('a'+ lat, lon);
        facility.latitude = lat;
        facility.longitude = lon;
        console.log(facility.latitude);
        console.log(facility.longitude);

        facility.save(function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }

            User.findById(req.user.id, function (err, user) {                    // Save Id from Facility in User
                if (err) return next(err);

                user.detailsId = facility.id;

                user.save(function (err) {
                    if (err) return next(err);

                    res.redirect('/homeFacility');
                });
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

exports.getHomeFacility2 = function(req, res) {

    if (req.user.accountType==='Facility') {

        if (req.user.detailsId) {
            return res.render('homeFacility2', {
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





/**
 * GET /facility/getGigListing
 */
exports.getGigListing = function(req, res, next) {
    Facility.findById( req.user.detailsId, function(err, facility) {
        if (err) return next(err);

        Event.find({facilityId: facility.id, 'status.canceled': false}).lean().exec(function (err, events) {
            if (err) return next(err);

            events.map(function(event) {
                event.title = 'Event Opening';

                if (event.approvedMusicianName) {
                    event.title = event.approvedMusicianName;
                }

                //event.color = '#f00';

                if (event.status.approved === true) {
                    event.color = 'green';
                }
            });

            //console.dir(JSON.stringify(events));

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(events));
        });
    });
};


/**
 * POST /facility/postGigDetails
 */
exports.postGigDetails = function(req, res, next) {

    Facility.findById( req.user.detailsId, function(err, facility) {
        if (err) return next(err);

        var start = new Date(req.body.date + ' ' + req.body.startTime);
        var end = new Date(req.body.date + ' ' + req.body.endTime);
        var description = req.body.description;

        //console.dir(start);
        //console.dir(typeof start);
        //console.dir(end);
        //console.dir(typeof end);


        //Event.find({facilityId: facility.id, $or: [ {start: {$gte: start, $lte: end}}, {end: {$gte: start, $lte: end}} ]}).exec(function (err, overlappingEvents) {
        //    if (err) return next(err);
        //
        //    //console.dir(overlappingEvents);
        //
        //    if (overlappingEvents) {
        //        req.flash('error', { msg: 'Event Overlaps with existing event' });
        //        return res.redirect('/homeFacility');
        //
        //    } else {
        //        console.dir('no overlapping events');

                var event = new Event({
                    facilityName: facility.facilityName,
                    facilityId: facility.id,
                    start: start,
                    end: end,
                    description: description
                });

                event.save(function (err) {
                    if (err) return next(err);
                    //req.flash('success', { msg: 'Event details posted for ' + facility.facilityName });
                    return res.redirect('/homeFacility');
                    //return res.end();
                });

            //}
        //});
    });
};


/**
 * POST /facility/removeEvent
 */
exports.removeEvent = function(req, res, next) {

    console.dir(req.body.id);

    Event.findById( req.body.id, function(err, event) {
        if (err) return next(err);

        if (event.status.approved === false) {
            Event.findById(req.body.id).remove(function (err) {
                if (err) return next(err);
                return res.end();
            });
        } else {
            req.flash('error', { msg: 'Accepted events can not be deleted from this panel. Please contact system administrator.' });
            res.redirect('/homeFacility');
        }
    });
};