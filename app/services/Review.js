'use strict';

angular
    .module('lmServices')
    .factory('Review', function($resource) {
        return $resource('', {}, {
            query: {
                method: 'GET',
                url: '/static/data/reviews.json',
                isArray: true
            }
        });
    });
