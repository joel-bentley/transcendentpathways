var Joi = require('joi');
var Hoek = require('hoek');
var Async = require('async');
var Config = require('../../config');


exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    server.route({
        method: 'POST',
        path: options.basePath + '/signupMusicianDetails',
        config: {
            auth: {
                strategy: 'session'
                //scope: 'admin'
            },
            validate: {
                payload: {
                    _id: Joi.string(),
                    performerName: Joi.string().required(),
                    //contactFirstName: Joi.string().required(),
                    //contactLastName: Joi.string().required(),
                    address1: Joi.string().required(),
                    address2: Joi.string(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.string().required(),
                    phone: Joi.string().required(),
                    website: Joi.string(),
                    references: Joi.string(),
                    instruments: Joi.string()
                }
            },
            pre: [
                // AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Musician = request.server.plugins['hapi-mongo-models'].Musician;

            Musician.create(request.payload, function (err, status) {

                if (err) {
                    return reply(err);
                }

                reply(status);
            });
        }
    });


    next();
};


exports.register.attributes = {
    name: 'signupMusicianDetails'
};
