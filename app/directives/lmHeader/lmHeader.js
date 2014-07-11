'use strict';

angular
    .module('lmDirectives')
    .directive('lmHeader', function() {
        return {
            restrict: 'E',
            scope: {
                modal: '=',
                alert: '='
            },
            templateUrl: '/directives/lmHeader/lmHeader.html',
            controller: function($scope, Modal, Alert) {
                $scope.hideModal = Modal.hide;
                $scope.hideAlert = Alert.hide;
            }
        };
    });
