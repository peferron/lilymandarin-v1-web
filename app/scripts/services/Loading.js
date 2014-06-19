'use strict';

angular
    .module('lwServices')
    .factory('Loading', function($q, $rootScope) {
        $rootScope.loading = false;

        var count = 0;

        function inc() {
            if (count === 0) {
                $rootScope.loading = true;
            }
            count++;
        }

        function dec() {
            if (count === 1) {
                $rootScope.loading = false;
            }
            if (count > 0) {
                count--;
            }
        }

        return {
            request: function(config) {
                //log('Request: ' + config.url);
                inc();
                return config || $q.when(config);
            },
            response: function(response) {
                //log('Response: ' + response.config.url);
                dec();
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                //log('Response error: ' + rejection.config.url);
                dec();
                return $q.reject(rejection);
            }
        };
    });