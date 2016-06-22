/**
 * Created by daniel.irwin on 6/22/16.
 */
describe('sails-swaggify', function(){

    var sailsAndRoutes = {
        sails: {
            router: {
                explicitRoutes: {
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
                }
            }
        }
    };

    var expectedData = require('./testData.json');

    var swaggy = require('../index');

    var assert = require('assert-diff').deepEqual;

    it('test', function(done){

        var swaggerFactory = swaggy({ title : 'Sails Swagger', version : '1.0.0' });

        swaggerFactory(sailsAndRoutes, function(result){
            //console.log('', JSON.stringify(result, null, 3));
            assert(result, expectedData);
            swaggerFactory(sailsAndRoutes, function(secondResult){
                assert(secondResult, expectedData);
                done();
            });
        });

    });

});