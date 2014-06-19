'use strict';

angular
    .module('lwDirectives')
    .directive('lwMore', function() {
        return {
            restrict: 'E',
            templateUrl: '/views/lwMore.html'
        };
    });