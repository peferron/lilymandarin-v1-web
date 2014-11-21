'use strict';

angular
    .module('lmServices')
    .factory('Article', function($resource, $rootScope, Alert) {
        var interceptor = {
            responseError: function(response) {
                if (response.status === 404) {
                    $rootScope.error = 'Page not found. :(';
                } else {
                    Alert.show('Article', 'error', response);
                    $rootScope.error = 'Error ' + response.status + '. :(';
                }
            }
        };

        return $resource('', {}, {
            query: {
                method: 'GET',
                url: '/api/v1/articles.json' +
                    '?categories=:categories' +
                    '&count=:count' +
                    '&validated_before=:validatedBefore' +
                    '&validated_only=:validatedOnly',
                isArray: true,
                interceptor: interceptor
            },
            get: {
                method: 'GET',
                url: '/api/v1/articles/:id.json',
                interceptor: interceptor
            }
        });
    });
