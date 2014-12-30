'use strict';

angular
    .module('lmDirectives')
    .directive('lmModal', function() {
        return {
            restrict: 'E',
            scope: {
                templateUrl: '='
            },
            templateUrl: '/directives/lmModal/lmModal.html',
            controller: function($scope, Modal) {
                $scope.hide = function($event) {
                    if (!$event || angular.element($event.target).hasClass('modal')) {
                        Modal.hide();
                    }
                };
            }
        };
    });
