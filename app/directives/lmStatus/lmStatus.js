'use strict';

angular
    .module('lmDirectives')
    .directive('lmStatus', function() {
        return {
            restrict: 'E',
            scope: {
                article: '='
            },
            templateUrl: '/directives/lmStatus/lmStatus.html'
        };
    });
