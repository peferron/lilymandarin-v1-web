'use strict';

angular
    .module('lwDirectives')
    .directive('lwHeader', function() {
        return {
            restrict: 'E',
            scope: {
                modal: '=',
                alert: '='
            },
            templateUrl: '/directives/lwHeader/lwHeader.html',
            controller: function($scope, Modal, Alert) {
                $scope.hideModal = Modal.hide;
                $scope.hideAlert = Alert.hide;
            }
        };
    });
