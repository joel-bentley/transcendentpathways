exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/musicians',
        handler: function (request, reply) {

            reply.view('musicians/index');
        }
    });


    next();
};


exports.register.attributes = {
    name: 'web/musicians'
};
