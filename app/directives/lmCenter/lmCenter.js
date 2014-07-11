'use strict';

angular
    .module('lmDirectives')
    .directive('lmCenter', function() {
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: '/directives/lmCenter/lmCenter.html'
        };
    });


