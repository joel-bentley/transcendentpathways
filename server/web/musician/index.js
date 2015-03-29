exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/musician',
        handler: function (request, reply) {

            reply.view('musician/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/musician'
};
