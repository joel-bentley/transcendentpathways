exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/signup/musicianDetailsForm',
        handler: function (request, reply) {

            reply.view('signup/musicianDetailsForm');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/musicianDetailsForm'
};
