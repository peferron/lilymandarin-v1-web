'use strict';

angular
    .module('lmServices')
    .service('Alert', function($rootScope, $filter) {
        // Displays an alert with the given id, type and message. Type should be 'success',
        // 'warning' or 'error'. Message can be either a string, or a $http response object
        this.show = function(id, type, message) {
            if (typeof message === 'object') {
                message = $filter('ResponseError')(message);
            }
            $rootScope.alert = {
                id: id,
                type: type,
                message: message
            };
        };

        // Hides the current alert if it matches the given id. If id is empty, always hides the
        // current alert
        this.hide = function(id) {
            if (!id || $rootScope.alert && $rootScope.alert.id === id) {
                $rootScope.alert = null;
            }
        };
    });
