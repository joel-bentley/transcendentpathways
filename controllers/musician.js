var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var User = require('../models/User');
var Musician = require('../models/Musician');


/**
 * GET /signupMusician
 * Signup as Musician
 */

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
        userIds: req.user.id || '',
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

        User.findById(req.user.id, function(err, user) {                    // Save Id from Musician in User
            if (err) return next(err);

            user.detailIds.push(musician.id);

            user.save(function(err) {
                if (err) return next(err);
            });
        });
        res.redirect('/homeMusician');
    });

};



exports.getHomeMusician = function(req, res) {

    if (req.user.accountType==='Musician') {

        if (req.user.detailIds.length) {
            res.render('homeMusician', {
                title: 'Musician-Performer Home'
            });
        } else {

            res.redirect('/musicianDetails');
        }

    } else {
        res.redirect('/');
    }

};


exports.getUpdateMusicianDetails = function(req, res) {

    Musician.findOne( { userIds : { $all : [ req.user.id ] } }, function(err, musician) {

        if (musician === null) return null;  // added to prevent crash when musician account doesn't exist, correct?

        res.render('account/updateMusicianDetails', {
            title: 'Update Musician Details',
            performerName: musician.performerName,
            address1: musician.address1,
            address2: musician.address2,
            city: musician.city,
            state: musician.state,
            zipcode: musician.zipcode,
            phone: musician.phone,
            instruments: musician.instruments,
            website: musician.website,
            picture: musician.picture,
            biography: musician.biography
        });
    });
};


exports.postUpdateMusicianDetails = function(req, res, next) {
    Musician.findOne( { userIds : { $all : [ req.user.id ] } }, function(err, musician) {

        if (err) return next(err);

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