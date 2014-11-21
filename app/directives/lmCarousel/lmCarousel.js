'use strict';

angular
    .module('lmDirectives')
    .directive('lmCarousel', function() {
        return {
            restrict: 'E',
            controller: function($scope, $attrs, $timeout) {
                $scope.carousel = 0;

                var period = 0;
                var max = 0;
                var timeout;

                function run() {
                    // Out-of-range carousel needs to be immediately corrected.
                    if ($scope.carousel >= max) {
                        $scope.carousel = Math.max(0, max - 1);
                    }

                    // Don't start a timeout if it's already started or if the input parameters are
                    // invalid.
                    if (timeout || period <= 0 || max < 2) {
                        return;
                    }

                    timeout = $timeout(function() {
                        $scope.carousel = ($scope.carousel + 1) % max;
                        timeout = null;
                        run();
                    }, period * 1000);
                }

                // Follow changes to input parameters.
                $attrs.$observe('period', function(value) {
                    period = angular.isDefined(value) ? value : 4;
                    run();
                });
                $attrs.$observe('max', function(value) {
                    max = angular.isDefined(value) ? value : Number.MAX_VALUE;
                    run();
                });
            }
        };
    });
