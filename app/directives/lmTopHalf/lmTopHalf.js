'use strict';

angular
    .module('lmDirectives')
    .directive('lmTopHalf', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                ratio: '='
            },
            templateUrl: '/directives/lmTopHalf/lmTopHalf.html',
            controller: function($element, $window, $scope, Window) {
                var win = Window.on({
                    width: function() {
                        return $window.document.body.clientWidth;
                    },
                    height: function() {
                        return $window.innerHeight;
                    },
                    resize: function() {
                        $scope.$apply(updatePosition);
                    }
                });

                // updatePosition needs to be called every time the aspect ratio or the window size
                // has changed.
                function updatePosition() {
                    var ratio = parseFloat($scope.ratio);
                    if (isNaN(ratio)) {
                        return;
                    }

                    var maxHeight = win.height / 2;
                    var maxWidth = maxHeight * ratio;

                    $scope.width = Math.min(win.width, maxWidth);
                    $scope.height = $scope.width / ratio;
                }

                // Update position on aspect ratio change.
                $scope.$watch('ratio', updatePosition);

                // $scope.$on is weirdly undefined during automated testing, so we must add a check
                // to prevent the tests from crashing.
                if ($scope.$on) {
                    $scope.$on('$destroy', win.off);
                }
            }
        };
    });
