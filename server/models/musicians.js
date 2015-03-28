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

Musicians.create = function (name, timeCreated, callback) {

    var musician = name.trim();
    var document = {
        performerName: musician,
        timeCreated: timeCreated
    };

    this.insert(document, function (err, Musicians) {

        if (err) {
            return callback(err);
        }

        callback(null, Musicians);
    });
};


module.exports = Musicians;
