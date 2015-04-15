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
        //scripts: ["js/admin.min.js"]
    });
};

exports.getUserData = function(req, response) {
    User.find({}, function (err, user) {
        var userData = user.map(function(e){
            return e.email;
        });
        console.log(userData);
        console.log(JSON.stringify(userData));
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(userData));
    });
};


