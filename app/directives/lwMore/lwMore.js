'use strict';

angular
    .module('lwDirectives')
    .directive('lwMore', function() {
        return {
            restrict: 'E',
            templateUrl: '/directives/lwMore/lwMore.html'
        };
    });
