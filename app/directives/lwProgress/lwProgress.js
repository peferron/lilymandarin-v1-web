'use strict';

angular
    .module('lwDirectives')
    .directive('lwProgress', function() {
        return {
            restrict: 'E',
            scope: {
                loading: '='
            },
            templateUrl: '/directives/lwProgress/lwProgress.html',
            controller: function($scope, $timeout) {
                $scope.progress = 0;

                var timeout;

                function inc() {
                    timeout = $timeout(inc, 500);
                    $scope.progress = 100 - (100 - $scope.progress) * 0.9;
                }

                function reset() {
                    timeout = null;
                    $scope.progress = 0;
                }

                $scope.$watch('loading', function(value) {
                    if (timeout) {
                        $timeout.cancel(timeout);
                    }

                    if (value) {
                        $scope.progress = 0;
                        timeout = $timeout(inc, 0);
                    } else {
                        timeout = $timeout(reset, 500);
                        $scope.progress = 100;
                    }
                });
            }
        };
    });
