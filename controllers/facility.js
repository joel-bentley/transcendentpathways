var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var User = require('../models/User');
var Facility = require('../models/Facility');

/**
 * GET /login
 * Login page.
 */
exports.getHomeFacility = function(req, res) {
    res.render('homeFacility', {
        title: 'Facility Home'
    });
};
