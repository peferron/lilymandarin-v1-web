'use strict';

angular
    .module('lmDirectives')
    .directive('lmCard', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/directives/lmCard/lmCard.html',
            scope: {},
            controller: function($scope, $window) {
                $scope.flipped = false;

                $scope.flip = function($event) {
                    if ($scope.flipped) {
                        // Do not annoy the user by flipping the card if they were selecting text
                        // for copy/pasting.
                        var t = $event.target;
                        var s = selectedElement();
                        if (t === s || isParent(t, s, 3)) {
                            return;
                        }
                    }

                    $scope.flipped = !$scope.flipped;
                };

                function selectedElement() {
                    if (!angular.isFunction($window.getSelection)) {
                        return null;
                    }

                    var s = $window.getSelection();
                    if (s && s.toString().length) {
                        return s.anchorNode;
                    }
                    return null;
                }

                function isParent(parent, element, depth) {
                    if (depth <= 0) {
                        return false;
                    }

                    var $p = angular.element(element).parent();
                    if (!$p.length) {
                        return false;
                    }

                    var p = $p[0];
                    if (p === parent) {
                        return true;
                    }

                    return isParent(parent, p, depth - 1);
                }
            }
        };
    });
