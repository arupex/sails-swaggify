# sails-swaggify
Make Swagger Docs for Sails App in a way that interspects sails routes, but gives you a clean callback function to call in your controller


[![npm version](https://badge.fury.io/js/sails-swaggify.svg)](https://badge.fury.io/js/sails-swaggify) [![dependencies](https://david-dm.org/arupex/sails-swaggify.svg)](http://github.com/arupex/sails-swaggify) ![Build Status](https://api.travis-ci.org/arupex/sails-swaggify.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>


#Install

    npm install sails-swaggify --save

#Usage

#In a Controller

    module.exports = {

      getSwagger : function(req, res){
        SwaggerService.getSwagger(this, res.swagger);
      }

    };

#In your Routes

    /**
     * Route Mappings
     * @file config/routes.js
     * (sails.config.routes)
     *
     * Your routes map URLs to views and controllers.
     */

    module.exports.routes = {

        '/': {
            view: 'homepage'
        },

        'get /groups/:id': {
            controller: 'GroupController',
            action: 'test',
            skipAssets: 'true',
            //swagger path object
            swagger: {
                methods: ['GET', 'POST'],
                summary: ' Get Groups ',
                description: 'Get Groups Description',
                produces: [
                    'application/json'
                ],
                tags: [
                    'Groups'
                ],
                responses: {
                    '200': {
                        description: 'List of Groups',
                        schema: 'Group', // api/model/Group.js,
                        type: 'array'
                    }
                },
                parameters: []

            }
        },
        'put /groups/team': {
            controller: 'GroupController',
            action: 'test',
            skipAssets: 'true',
            //swagger path object
            swagger: {
                methods: ['PUT', 'POST'],
                summary: 'Update Groups ',
                description: 'Update Groups Description',
                produces: [
                    'application/json'
                ],
                tags: [
                    'Groups'
                ],
                responses: {
                    '200': {
                        description: 'Updated Group',
                        schema: 'Group' // api/model/Group.js
                    }
                },
                parameters: [
                    'Group' // api/model/Group.js
                ]

            }
        }
    };
