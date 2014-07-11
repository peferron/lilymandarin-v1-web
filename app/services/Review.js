'use strict';

angular
    .module('lwServices')
    .factory('Review', function($resource) {
        return $resource('', {}, {
            query: {
                method: 'GET',
                url: '/static/data/reviews.json',
                isArray: true
            }
        });
    });
