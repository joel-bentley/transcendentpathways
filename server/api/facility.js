var Joi = require('joi');
var Hoek = require('hoek');
var AuthPlugin = require('../auth');


exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);


    server.route({
        method: 'GET',
        path: options.basePath + '/facility',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                query: {
                    facilityName: Joi.string().allow(''),
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

            var Facility = request.server.plugins['hapi-mongo-models'].Facility;
            var query = {};
            if (request.query.facilityName) {
                query.facilityName = new RegExp('^.*?' + request.query.facilityName + '.*$', 'i');
            }
            if (request.query.contactName) {
                query.contactName = new RegExp('^.*?' + request.query.contactName + '.*$', 'i');
            }
            var fields = request.query.fields;
            var sort = request.query.sort;
            var limit = request.query.limit;
            var page = request.query.page;

            Facility.pagedFind(query, fields, sort, limit, page, function (err, results) {

                if (err) {
                    return reply(err);
                }

                reply(results);
            });
        }
    });


    server.route({
        method: 'GET',
        path: options.basePath + '/facility/{id}',
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

            var Facility = request.server.plugins['hapi-mongo-models'].Facility;

            Facility.findById(request.params.id, function (err, status) {

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
        path: options.basePath + '/facility',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                payload: {
                    facilityName: Joi.string().required(),
                    contactName: Joi.string().required(),
                    address1: Joi.string().required(),
                    address2: Joi.string().allow(''),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.number().required(),
                    phone: Joi.string().required(),
                    website: Joi.string()
                }
            },
            pre: [
                AuthPlugin.preware.ensureAdminGroup('root')
            ]
        },
        handler: function (request, reply) {

            var Facility = request.server.plugins['hapi-mongo-models'].Facility;

            Facility.create(request.payload, function (err, status) {

                if (err) {
                    return reply(err);
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'PUT',
        path: options.basePath + '/facility/{id}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            validate: {
                payload: {
                    id: Joi.string(),
                    facilityName: Joi.string(),
                    contactName: Joi.string(),
                    address1: Joi.string(),
                    address2: Joi.string().allow(''),
                    city: Joi.string(),
                    state: Joi.string(),
                    zipcode: Joi.number(),
                    phone: Joi.string(),
                    website: Joi.string(),
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

            var Facility = request.server.plugins['hapi-mongo-models'].Facility;
            var id = request.params.id;
            var update = {
                $set: {
                    facilityName: request.payload.facilityName,
                    contactName: request.payload.contactName,
                    address1: request.payload.address1,
                    address2: request.payload.address2,
                    city: request.payload.city,
                    state: request.payload.state,
                    zipcode: request.payload.zipcode,
                    phone: request.payload.phone,
                    website: request.payload.website,
                    approvedToPerform: request.payload.approvedToPerform,
                    approvedDate: request.payload.approvedDate,
                    performancesCompleted: request.payload.performancesCompleted
                }
            };

            Facility.findByIdAndUpdate(id, update, function (err, status) {

                if (err) {
                    return reply(err);
                }

                reply(status);
            });
        }
    });


    server.route({
        method: 'DELETE',
        path: options.basePath + '/facility/{id}',
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

            var Facility = request.server.plugins['hapi-mongo-models'].Facility;

            Facility.findByIdAndRemove(request.params.id, function (err, count) {

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
    name: 'facility'
};
