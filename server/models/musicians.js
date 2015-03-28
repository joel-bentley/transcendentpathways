var Joi = require('joi');
var ObjectAssign = require('object-assign');
var BaseModel = require('hapi-mongo-models').BaseModel;


var Musicians = BaseModel.extend({
    constructor: function (attrs) {

        ObjectAssign(this, attrs);
    }
});

Musicians._collection = 'musicians';

Musicians.schema = Joi.object().keys({
    performerName: Joi.string().required(),
    timeCreated: Joi.date()
});

Musicians.create = function (document, callback) {

    //var musician = name.performerName;

    var document = {
        performerName: document.performerName,
        timeCreated: new Date()
    };

    this.insert(document, function (err, musicians) {

        if (err) {
            return callback(err);
        }

        callback(null, musicians[0]);
    });
};


module.exports = Musicians;
