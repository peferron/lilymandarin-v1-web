'use strict';

angular
    .module('lmDirectives')
    .directive('lmCenter', function() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div><div><div><div ng-transclude></div></div></div></div>'
        };
    });


