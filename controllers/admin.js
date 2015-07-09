var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var secrets = require('../config/secrets');
var Musician = require('../models/Musician');
var Facility = require('../models/Facility');
var Event = require('../models/Event');
var User = require('../models/User');

var moment = require('moment-timezone');

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
    Event.find({}).sort('start').lean().exec(function(err, events){

        events.map(function(event) {
            //convert timezone of stored dates/times from UTC
            event.start = moment.tz(event.start, "America/Los_Angeles").format();
            event.end = moment.tz(event.end, "America/Los_Angeles").format();
        });

        //console.log(events);

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(events));
    });
};

exports.getFacilityInfo = function(req, response, next){
    //console.dir(req.body);
    Facility.findOne(req.body, function(err, facility){
        if (err) {
            //console.log(err);
            return next(err);
        }
        var facilityData = facility;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(facilityData));
        //console.dir(facility);
    });
};

exports.postUpdateMusicianDetails = function(req, res, next) {
    Musician.findOne({_id: req.body._id}).exec(function(err, musician) {
        if (err) return next(err);
        var wasApproved = musician.approved;
        var thisMusician = null;
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
        //console.log('req.body.userIds: %s', req.body._id);
        User.findOne({detailsId: req.body._id}).exec(function(err, user) {
            if (err) return next(err);
            //console.log(user);
            thisMusician = user.email;
        });

        if(req.body.approved && !wasApproved){
            var transporter = nodemailer.createTransport({
                service: 'Mandrill',
                auth: {
                    user: secrets.mandrill.user,
                    pass: secrets.mandrill.password
                }
            });
            var mailOptions = {
                to: thisMusician,
                from: 'admin@transcendentpathways.org',
                subject: 'Account Approval Confirmation from Transcendent Pathways',
                text: 'Hello,\n\n' +
                'This is a confirmation that your account has been successfully approved. ' +
                    ' You can request performances at www.transcendentpathways.org.'
            };
            transporter.sendMail(mailOptions, function(err) {
                req.flash('success', { msg: 'Approval email sent to user.' });
                //done(err);
            });
        }
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

        var approvedMusician = event.approvedMusicianName;
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

        if(event.approvedMusicianName) {
            Musician.findOne({performerName: req.body.approvedMusicianName}).exec(function (err, musician) {
                if (err) return next(err);
                //console.log('musician: %s', musician);
                User.findOne({detailsId: musician._id}).exec(function (err, user) {
                    //console.log('userids: %s', user);
                    if (err) return next(err);
                    event.save(function (err) {
                        if (err) return next(err);
                        //console.log('req.body.approvedMusicianName: %s',req.body.approvedMusicianName);
                        //console.log('approvedMusician: %s', approvedMusician);
                        if (req.body.approvedMusicianName !== approvedMusician) {
                            var transporter = nodemailer.createTransport({
                                service: 'Mandrill',
                                auth: {
                                    user: secrets.mandrill.user,
                                    pass: secrets.mandrill.password
                                }
                            });
                            //console.log('user.email: %s', user.email);
                            var mailOptions = {
                                to: user.email,
                                from: 'admin@transcendentpathways.org',
                                subject: 'You have been approved for an event you requested!',
                                text: 'Hello,\n\n' +
                                'This is a confirmation that you have been approved to perform at the following event: \n' +
                                '\nFacility Name: ' + event.facilityName +
                                '\nDate: ' + event.start +
                                '\nEnd: ' + event.end +
                                '\nDescription: ' + event.description
                            };
                            transporter.sendMail(mailOptions, function (err) {
                                //req.flash('success', {msg: 'Success! You have successfully requested this event!'});
                                //console.log('email sent!');
                                //console.log('error: %s', err);
                                //done(err);
                            });
                        }
                    })
                })
            });
        } else if (req.body.requestedBy !== event.requestedBy){
            var musicianId = req.user.detailsId;
            //console.log('musicianId: %s', req.user.id);

            User.findOne({detailsId: musicianId}).exec(function (err, user) {
                    //console.log('userids: %s', user);
                if (err) return next(err);

                event.save(function (err) {
                    if (err) return next(err);
                    var transporter = nodemailer.createTransport({
                        service: 'Mandrill',
                        auth: {
                            user: secrets.mandrill.user,
                            pass: secrets.mandrill.password
                        }
                    });
                    //console.log('user.email: %s', user.email);
                    var mailOptions = {
                        to: user.email,
                        from: 'admin@transcendentpathways.org',
                        subject: 'You have successfully requested an event!',
                        text: 'Hello,\n\n' +
                        'This is a confirmation that you have requested the following event: \n' +
                        '\nFacility Name: ' + event.facilityName +
                        '\nDate: ' + event.start +
                        '\nEnd: ' + event.end +
                        '\nDescription: ' + event.description
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        //req.flash('success', {msg: 'Success! You have successfully requested this event!'});
                    });
                })
            })
        } else {
            event.save(function (err) {
                if (err) return next(err);
            })
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(event));
    });
};



