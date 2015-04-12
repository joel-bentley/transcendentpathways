var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var User = require('../models/User');
var Musician = require('../models/Musician');

/**
 * GET /login
 * Login page.
 */
exports.getHomeMusician = function(req, res) {
    res.render('homeMusician', {
        title: 'Musician-Performer Home'
    });
};
