'use strict';

angular
    .module('lwServices')
    .factory('Review', function($resource) {
        return $resource('', {}, {
            query: {
                method: 'GET',
                url: '/data/static/reviews.json',
                isArray: true
            }
        });
    });
