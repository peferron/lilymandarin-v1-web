'use strict';

angular
    .module('lwDirectives')
    .directive('lwStatus', function() {
        return {
            restrict: 'E',
            scope: {
                article: '='
            },
            templateUrl: '/directives/lwStatus/lwStatus.html'
        };
    });
