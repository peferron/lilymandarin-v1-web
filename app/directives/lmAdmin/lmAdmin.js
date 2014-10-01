'use strict';

angular
    .module('lmDirectives')
    .directive('lmAdmin', function(Admin) {
        if (!Admin) {
            return {
                restrict: 'E',
                transclude: 'element',
                template: ''
            };
        }

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="lm-admin" ng-transclude></div>'
        };
    });
