'use strict';

angular
    .module('lmDirectives')
    .directive('lmAlert', function() {
        return {
            restrict: 'E',
            scope: {
                alert: '=',
            },
            templateUrl: '/directives/lmAlert/lmAlert.html',
            controller: function($scope, Alert) {
                $scope.hideAlert = Alert.hide;
            }
        };
    });
