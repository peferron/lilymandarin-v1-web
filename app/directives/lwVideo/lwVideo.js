'use strict';

angular
    .module('lwDirectives')
    .directive('lwVideo', function() {
        return {
            restrict: 'E',
            scope: {
                source: '='
            },
            templateUrl: '/directives/lwVideo/lwVideo.html'
        };
    });
