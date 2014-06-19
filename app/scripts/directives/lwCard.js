'use strict';

angular
    .module('lwDirectives')
    .directive('lwCard', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/views/lwCard.html',
            controller: function($scope) {
                $scope.flipped = false;
                $scope.flip = function() {
                    $scope.flipped = !$scope.flipped;
                };
            }
        };
    });