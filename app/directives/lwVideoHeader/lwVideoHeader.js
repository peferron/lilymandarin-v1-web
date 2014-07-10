'use strict';

angular
    .module('lwDirectives')
    .directive('lwVideoHeader', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=',
                socialUrl: '=',
                socialText: '='
            },
            templateUrl: '/directives/lwVideoHeader/lwVideoHeader.html'
        };
    });
