'use strict';

angular
    .module('lmServices')
    .service('Loading', function($q, $rootScope) {
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

        this.request = function(config) {
            inc();
            return config || $q.when(config);
        };

        this.response = function(response) {
            dec();
            return response || $q.when(response);
        };

        this.responseError = function(rejection) {
            dec();
            return $q.reject(rejection);
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('Loading');
    });
