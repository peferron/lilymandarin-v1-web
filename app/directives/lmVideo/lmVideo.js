'use strict';

angular
    .module('lmDirectives')
    .directive('lmVideo', function() {
        return {
            restrict: 'E',
            scope: {
                source: '='
            },
            templateUrl: '/directives/lmVideo/lmVideo.html'
        };
    });
