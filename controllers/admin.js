var _ = require('lodash');
var async = require('async');
var Musician = require('../models/Musician');
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

exports.getMusicianData = function(req, response) {
    Musician.find({}, 'performerName contactName approvedToPerform').exec(function(err, musician){
        var musicianData = musician;
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(musicianData));
    });
};


exports.getMusician = function(req, res) {
    Musician.findOne({_id: req.params.id}).exec(function (err, doc) {
        console.log(doc);
    });
};