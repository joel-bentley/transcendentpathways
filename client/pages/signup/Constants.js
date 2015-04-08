var FluxConstant = require('flux-constant');
var PayloadSources = require('../../constants/PayloadSources');


module.exports = {
    PayloadSources: PayloadSources,
    ActionTypes: FluxConstant.set([
        'SEND_REQUEST',
        'RECEIVE_RESPONSE',
        'SAVE_DETAIS',
        'SAVE_DETAIS_RESPONSE'
    ])
};
