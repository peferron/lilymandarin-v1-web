'use strict';

angular
    .module('lwDirectives')
    .directive('lwCenter', function() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div><div><div><div ng-transclude></div></div></div></div>'
        };
    });


