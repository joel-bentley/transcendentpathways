var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var User = require('../models/User');
var Musician = require('../models/Musician');




exports.getSignupMusician = function(req, res) {
    if (req.user) return res.redirect('/');
    res.render('account/signupMusician', {
        title: 'Create Musician Account'
    });
};
exports.getMusicianDetails = function(req, res){
    if(!req.user) return res.redirect('/');
    res.render('account/musicianDetails', {
        title: 'Musician - Performer Details'
    });
};

exports.postMusicianDetails = function(req, res, next){
    var musician = new Musician({
        performerName: req.body.performerName || '',                   // Not sure if   || ''  is needed
        userIds: req.user._id || '',
        contactName: req.body.contactName || '',
        address1: req.body.address1 || '',
        address2: req.body.address2 || '',
        city: req.body.city || '',
        state: req.body.state || '',
        zipcode: req.body.zipcode || '',
        phone: req.body.phone || '',
        instruments: req.body.instruments || '',
        website: req.body.website || '',
        picture: req.body.picture || '',
        biography: req.body.biography || ''
    });
    musician.save(function(err) {
        if (err) return next(err);
        res.redirect('/homeMusician');
    });
};

exports.getHomeMusician = function(req, res) {
    res.render('homeMusician', {
        title: 'Musician-Performer Home'
    });
};


exports.getUpdateMusicianDetails = function(req, res) {

    Musician.findOne( { userIds : { $all : [ req.user._id ] } }, function(err, musician) {

        if (musician === null) return null;

        res.render('account/updateMusicianDetails', {
            title: 'Update Musician Details',
            performerName: musician._doc.performerName,
            address1: musician._doc.address1,
            address2: musician._doc.address2,
            city: musician._doc.city,
            state: musician._doc.state,
            zipcode: musician._doc.zipcode,
            phone: musician._doc.phone,
            instruments: musician._doc.instruments,
            website: musician._doc.website,
            picture: musician._doc.picture,
            biography: musician._doc.biography
        });
    });
};


exports.postUpdateMusicianDetails = function(req, res, next) {
    Musician.findOne( { userIds : { $all : [ req.user._id ] } }, function(err, musician) {

        if (err) return next(err);   // added to prevent crash, should change this to proper error

        musician.performerName = req.body.performerName || '';
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

        musician.save(function(err) {
            if (err) return next(err);
            req.flash('success', { msg: 'Musician Details Updated for ' + musician.performerName });
            res.redirect('/account');
        });
    });
};