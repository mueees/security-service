'use strict';

let error = require('mue-core/modules/error');
const API_PREFIX = '/api';

module.exports = function (app) {
    app.get(API_PREFIX + '/info', function (request, response, next) {
        next(error.getHttpError(400, 'Cannot parse that'));
    });
};