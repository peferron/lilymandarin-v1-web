'use strict';

angular
    .module('lmDirectives')
    .directive('lmCard', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/directives/lmCard/lmCard.html',
            controller: function($scope) {
                $scope.flipped = false;
                $scope.flip = function() {
                    $scope.flipped = !$scope.flipped;
                };
            }
        };
    });
