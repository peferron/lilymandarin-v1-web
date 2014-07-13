'use strict';

angular
    .module('lmDirectives')
    .directive('lmModal', function() {
        return {
            restrict: 'E',
            scope: {
                modal: '=',
            },
            templateUrl: '/directives/lmModal/lmModal.html',
            controller: function($scope, Modal) {
                $scope.hideModal = Modal.hide;
            }
        };
    });
