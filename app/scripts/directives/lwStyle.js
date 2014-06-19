'use strict';

angular
    .module('lwDirectives')
    .directive('lwStyle', function() {
        return {
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs) {
                attrs.$observe('css', function (css) {
                    element.html(css || '');
                });
            }
        };
    });