exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/signup/musician',
        handler: function (request, reply) {

            reply.view('signup/musician');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/musician'
};
