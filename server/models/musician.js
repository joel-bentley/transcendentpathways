var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;
var Slug = require('slug');


var Musician = BaseModel.extend({
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});


Musician._collection = 'musician';


Musician._idClass = String;


Musician.schema = Joi.object().keys({
    performerName: Joi.string().required(),
//    contactName: Joi.string().required(),            // Remove?
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


Musician.indexes = [
    [{ id: 1 }],
    [{ performerName: 1 }],
//    [{ contactName: 1 }]             // Remove?
];


Musician.create = function (payload, callback) {

    var document = {
//        _id: Slug(payload.performerName + ' ' + payload.contactName).toLowerCase(),   // Remove?
        performerName: payload.performerName,
//        contactName: payload.contactName,                                             // Remove?
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


module.exports = Musician;
