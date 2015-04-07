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
    facilityName: Joi.string().required(),
    contactName: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.number().required(),
    phone: Joi.string().required(),
    website: Joi.string(),
    instruments: Joi.string(),
    approvedToPerform: Joi.boolean(),
    approvedDate: Joi.date(),
    performancesCompleted: Joi.number()

});


Facility.indexes = [
    [{ id: 1 }],
    [{ facilityName: 1 }],
    [{ contactName: 1 }]
];


Facility.create = function (payload, callback) {

    var document = {
        _id: Slug(payload.facilityName + ' ' + payload.contactName).toLowerCase(),
        facilityName: payload.facilityName,
        contactName: payload.contactName,
        address1: payload.address1,
        address2: payload.address2,
        city: payload.city,
        state: payload.state,
        zipcode: payload.zipcode,
        phone: payload.phone,
        website: payload.website,
        instruments: payload.instruments
    };

    this.insert(document, function (err, musicians) {

        if (err) {
            return callback(err);
        }

        callback(null, musicians[0]);
    });
};


module.exports = Facility;
