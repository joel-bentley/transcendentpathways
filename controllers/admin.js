var _ = require('lodash');
var async = require('async');
var User = require('../models/User');
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
