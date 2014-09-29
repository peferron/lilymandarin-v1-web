'use strict';

angular
    .module('lmDirectives')
    .directive('lmMore', function() {
        return {
            restrict: 'E',
            templateUrl: '/directives/lmMore/lmMore.html',
            scope: {
                status: '=',
                name: '@',
                load: '&'
            }
        };
    });
