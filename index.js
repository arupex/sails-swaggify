/**
 * Created by daniel.irwin on 6/22/16.
 */

'use strict';

module.exports = function SwaggerFactory(options){

    if(!options){
        options = {};
    }
    var swaggerData = {
        "swagger": "2.0",
        "info": {
            "title": options.title,
            "version": options.version
        },
        "tags": options.tags || [],
        "definitions": options.definitions || {
            "contact": {"properties": {}},
            "group": {"properties": {}}
        },
        "paths": {

        }
    };

    var calculated = false;

    //var sails = this;

    function calculateSwagger(sails, success) {
        var sailsRoutes = JSON.parse(JSON.stringify(sails.sails.router.explicitRoutes));

        process.nextTick(function() {
            Object.keys(sailsRoutes).forEach(function (path) {
                var sanityPath = path.substr(path.indexOf('/'), path.length);

                sanityPath = sanityPath.replace(/:(\w+)/, '{$1}');

                if (sailsRoutes[path] && sailsRoutes[path].swagger) {
                    var swag = sailsRoutes[path].swagger;
                    swag.methods.forEach(function (doc) {
                        if (!swaggerData.paths[sanityPath]) {
                            swaggerData.paths[sanityPath] = {};
                        }

                        swaggerData.paths[sanityPath][doc] = swag;
                    });
                    delete swag.methods;
                }
                else {
                    console.log('ignoring ', path, 'has no swagger doc');
                }
            });
            calculated = true;
            success(swaggerData);
        });
    }

    function getSwagger(sails, responder){

        if(!calculated) {
            return calculateSwagger(sails, responder);
        }
        responder(responder);
    }


    return getSwagger;

};
