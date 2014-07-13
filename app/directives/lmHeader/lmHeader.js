'use strict';

angular
    .module('lmDirectives')
    .directive('lmHeader', function() {
        return {
            restrict: 'E',
            scope: {
                tab: '=',
                loading: '='
            },
            templateUrl: '/directives/lmHeader/lmHeader.html'
        };
    });
