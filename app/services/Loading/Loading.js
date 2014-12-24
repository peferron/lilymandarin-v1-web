'use strict';

angular
    .module('lmServices')
    .service('Loading', function($q, $rootScope) {
        $rootScope.loading = false;

        var concurrent = 0;

        function increment() {
            if (concurrent === 0) {
                $rootScope.loading = true;
            }
            concurrent++;
        }

        function decrement() {
            if (concurrent === 1) {
                $rootScope.loading = false;
            }
            if (concurrent > 0) {
                concurrent--;
            }
        }

        this.request = function(config) {
            increment();
            return config || $q.when(config);
        };

        this.response = function(response) {
            decrement();
            return response || $q.when(response);
        };

        this.responseError = function(rejection) {
            decrement();
            return $q.reject(rejection);
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('Loading');
    });
