var Dispatcher = require('flux-dispatcher');
var Constants = require('./Constants');
var Fetch = require('../../helpers/jsonFetch');


var VIEW_ACTION = Constants.PayloadSources.VIEW_ACTION;
var SERVER_ACTION = Constants.PayloadSources.SERVER_ACTION;
var ActionTypes = Constants.ActionTypes;
var dispatch = Dispatcher.handleAction;


var Actions = {
    sendRequest: function (data) {
        console.log(data);
        dispatch(VIEW_ACTION, ActionTypes.SEND_REQUEST, data);

        var request = {
            method: 'POST',
            url: '/api/musicians',
            data: data
        };

        Fetch(request, function (err, response) {

            if (!err) {
                window.location.href = '/musicians';
                response.success = true;
            }

            dispatch(SERVER_ACTION, ActionTypes.RECEIVE_RESPONSE, response);
        });
    }
};


module.exports = Actions;
