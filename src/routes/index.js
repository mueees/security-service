'use strict';

let _ = require('lodash');

let error = require('mue-core/modules/error');
let utils = require('mue-core/modules/utils');

// add necessary actions
let action = require('mue-core/modules/action');
require('mue-core/modules/actions/request-to-service');

let trustedHostMiddleware = require('../middlewares/trusted-host');

const API_PREFIX = '/api';

module.exports = function (app) {
    app.post(API_PREFIX + '/signin', trustedHostMiddleware, function (request, response, next) {
        action.execute('requestToService', {
            service: 'account',
            method: 'POST',
            url: '/validation/credential',
            data: {
                email: request.body.email,
                password: request.body.password
            }
        }).then(function (user) {
            response.send(user);
        }).catch(function (err) {
            next(error.getHttpError(400, err.message));
        });
    });
};