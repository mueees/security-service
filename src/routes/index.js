'use strict';

let _ = require('lodash');

let error = require('mue-core/modules/error');
let utils = require('mue-core/modules/utils');

// add necessary actions
let action = require('mue-core/modules/action');
require('mue-core/modules/actions/request-to-service');

let trustedHostMiddleware = require('../middlewares/trusted-host');

const API_PREFIX = '/api';

function isUserDataValid(userData) {
    return utils.isStringWithLength(userData.password) && utils.isEmail(userData.email);
}

module.exports = function (app) {
    app.post(API_PREFIX + '/signin', trustedHostMiddleware, function (request, response, next) {
        let userData = _.pick(request.body, ['email', 'password']);

        if (isUserDataValid(userData)) {
            action.execute('requestToService', {
                service: 'account',
                method: 'POST',
                url: '/isValidCredential',
                data: {
                    email: userData.email,
                    password: userData.password
                }
            }).then(function () {
                response.send();
            }).catch(function (err) {
                next(error.getHttpError(400, err.message));
            });
        } else {
            error.getHttpError(400, 'Invalid email or password');
        }
    });
};