/* globals angular: false */

'use strict';

angular
    .module('lwFilters')
    .filter('ResponseError', function() {
        return function(response) {
            return response.config.method + ' ' + response.config.url +
                ' → Error ' + response.status + ': ' + response.data;
        };
    });
