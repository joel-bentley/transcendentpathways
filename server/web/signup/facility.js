exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/signup/facility',
        handler: function (request, reply) {

            reply.view('signup/facility');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/facility'
};
