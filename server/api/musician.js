var Joi = require('joi');
var Hoek = require('hoek');
var AuthPlugin = require('../auth');


exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);


    server.route({
        method: 'GET',
        path: options.basePath + '/musician',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                query: {
                    performerName: Joi.string().allow(''),
                    contactName: Joi.string().allow(''),
                    fields: Joi.string(),
                    sort: Joi.string().default('_id'),
                    limit: Joi.number().default(20),
                    page: Joi.number().default(1)
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Musician = request.server.plugins['hapi-mongo-models'].Musician;
            var query = {};
            if (request.query.performerName) {
                query.performerName = new RegExp('^.*?' + request.query.performerName + '.*$', 'i');
            }
            if (request.query.contactName) {
                query.contactName = new RegExp('^.*?' + request.query.contactName + '.*$', 'i');
            }
            var fields = request.query.fields;
            var sort = request.query.sort;
            var limit = request.query.limit;
            var page = request.query.page;

            Musician.pagedFind(query, fields, sort, limit, page, function (err, results) {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: options.basePath + '/musician/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Musician = request.server.plugins['hapi-mongo-models'].Musician;

            Musician.findById(request.params.id, function (err, status) {

                if (err) {
                    return reply(err);
                }

                if (!status) {
                    return reply({ message: 'Document not found.' }).code(404);
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'POST',
        path: options.basePath + '/musician',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                payload: {
                    performerName: Joi.string().required(),
                    contactName: Joi.string().required(),
                    address1: Joi.string().required(),
                    address2: Joi.string().allow(''),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.number().required(),
                    phone: Joi.string().required(),
                    website: Joi.string(),
                    instruments: Joi.string().required()
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
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


    server.route({
        method: 'PUT',
        path: options.basePath + '/musician/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                payload: {
                    id: Joi.string(),
                    performerName: Joi.string(),
                    contactName: Joi.string(),
                    address1: Joi.string(),
                    address2: Joi.string().allow(''),
                    city: Joi.string(),
                    state: Joi.string(),
                    zipcode: Joi.number(),
                    phone: Joi.string(),
                    website: Joi.string(),
                    instruments: Joi.string(),
                    approvedToPerform: Joi.boolean(),
                    approvedDate: Joi.date().allow(''),
                    performancesCompleted: Joi.number().allow('')
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Musician = request.server.plugins['hapi-mongo-models'].Musician;
            var id = request.params.id;
            var update = {
                $set: {
                    performerName: request.payload.performerName,
                    contactName: request.payload.contactName,
                    address1: request.payload.address1,
                    address2: request.payload.address2,
                    city: request.payload.city,
                    state: request.payload.state,
                    zipcode: request.payload.zipcode,
                    phone: request.payload.phone,
                    website: request.payload.website,
                    instruments: request.payload.instruments,
                    approvedToPerform: request.payload.approvedToPerform,
                    approvedDate: request.payload.approvedDate,
                    performancesCompleted: request.payload.performancesCompleted
              }
            };

            Musician.findByIdAndUpdate(id, update, function (err, status) {

                if (err) {
                    return reply(err);
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'DELETE',
        path: options.basePath + '/musician/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Musician = request.server.plugins['hapi-mongo-models'].Musician;

            Musician.findByIdAndRemove(request.params.id, function (err, count) {

                if (err) {
                    return reply(err);
                }

                if (count === 0) {
                    return reply({ message: 'Document not found.' }).code(404);
                }

                reply({ message: 'Success.' });
            });
        }
    });


    next();
};


exports.register.attributes = {
    name: 'musician'
};
