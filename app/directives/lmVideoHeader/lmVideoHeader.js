'use strict';

angular
    .module('lmDirectives')
    .directive('lmVideoHeader', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=',
                socialUrl: '=',
                socialText: '='
            },
            templateUrl: '/directives/lmVideoHeader/lmVideoHeader.html'
        };
    });
