var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;


var FacilityEntry = BaseModel.extend({
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});


FacilityEntry.schema = Joi.object().keys({
    id: Joi.string().required(),
    facilityName: Joi.string().required(),
    contactName: Joi.string().required(),
    timeCreated: Joi.date().required(),
    userCreated: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().lowercase().required()
    }).required()
});


module.exports = FacilityEntry;
