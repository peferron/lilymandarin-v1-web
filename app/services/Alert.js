'use strict';

angular
    .module('lwServices')
    .factory('Alert', function($rootScope, $filter) {
        return {
            // Displays an alert with the given id, type and message. Type should be 'success',
            // 'warning' or 'error'. Message can be either a string, or a $http response object
            show: function(id, type, message) {
                if (typeof message === 'object') {
                    message = $filter('ResponseError')(message);
                }
                $rootScope.alert = {
                    id: id,
                    type: type,
                    message: message
                };
            },

            // Hides the current alert if it matches the given id. If id is empty, always hides the
            // current alert
            hide: function(id) {
                if (!id || $rootScope.alert && $rootScope.alert.id === id) {
                    $rootScope.alert = null;
                }
            }
        };
    });
