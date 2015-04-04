var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;
var Slug = require('slug');


var Facility = BaseModel.extend({
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});


Facility._collection = 'facility';


Facility._idClass = String;


Facility.schema = Joi.object().keys({
    performerName: Joi.string().required(),
    contactFirstName: Joi.string().required(),
    contactLastName: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
    phone: Joi.string().required(),
    website: Joi.string(),
    contactEmail: Joi.string(),
    references: Joi.string(),
    instruments: Joi.string(),
    approvedToPerform: Joi.string(),
    approvedBy: Joi.string(),
    approvedDate: Joi.date(),
    performancesCompleted: Joi.number(),
    activePerformer: Joi.string()

});


Facility.indexes = [
    [{ id: 1 }],
    [{ performerName: 1 }],
    [{ contactLastName: 1 }]
];


Facility.create = function (payload, callback) {

    var document = {
        _id: Slug(payload.performerName + ' ' + payload.contactLastName).toLowerCase(),
        performerName: payload.performerName,
        contactFirstName: payload.contactFirstName,
        contactLastName: payload.contactLastName,
        address1: payload.address1,
        address2: payload.address2,
        city: payload.city,
        state: payload.state,
        zipcode: payload.zipcode,
        phone: payload.phone,
        website: payload.website
    };

    this.insert(document, function (err, facilities) {

        if (err) {
            return callback(err);
        }

        callback(null, facilities[0]);
    });
};


module.exports = Facility;
