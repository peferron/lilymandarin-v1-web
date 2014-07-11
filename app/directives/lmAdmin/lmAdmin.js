'use strict';

angular
    .module('lmDirectives')
    .directive('lmAdmin', function(Admin) {
        var d = {
            restrict: 'E',
            replace: true,
            transclude: true
        };

        if (Admin) {
            d.template = '<div ng-transclude class="admin"></div>';
        } else {
            d.template = '';
        }

        return d;
    });
