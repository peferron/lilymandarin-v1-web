'use strict';

angular
    .module('lmDirectives')
    .directive('lmCarousel', function() {
        return {
            restrict: 'E',
            controller: function($scope, $attrs, $timeout) {
                $scope.carousel = 0;

                var DEFAULT_PERIOD = 4;
                var DEFAULT_MAX = Number.MAX_VALUE;

                var period = DEFAULT_PERIOD;
                var max = DEFAULT_MAX;
                var timeout;

                function run() {
                    // Out-of-range carousel needs to be immediately corrected.
                    if ($scope.carousel >= max) {
                        $scope.carousel = Math.max(0, max - 1);
                    }

                    // Don't start a timeout if it's already started.
                    if (timeout) {
                        return;
                    }

                    timeout = $timeout(onTimeout, period * 1000);
                }

                function onTimeout() {
                    $scope.carousel = ($scope.carousel + 1) % max;
                    timeout = null;
                    run();
                }

                function onPeriodChange(value) {
                    if (angular.isDefined(value)) {
                        var num = parseFloat(value);
                        if (isNaN(num) || num <= 0) {
                            throw new Error('lmCarousel: period must be a number > 0');
                        }
                        period = num;
                    } else {
                        period = DEFAULT_PERIOD;
                    }
                    run();
                }

                function onMaxChange(value) {
                    if (angular.isDefined(value)) {
                        var num = parseInt(value, 10);
                        if (isNaN(num) || num < 2) {
                            throw new Error('lmCarousel: max must be an integer >= 2');
                        }
                        max = num;
                    } else {
                        max = DEFAULT_MAX;
                    }
                    run();
                }

                // Follow changes to input parameters.
                $attrs.$observe('period', onPeriodChange);
                $attrs.$observe('max', onMaxChange);
                run();
            }
        };
    });
