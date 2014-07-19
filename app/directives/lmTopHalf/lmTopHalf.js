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
            controller: function($element, $window, $document, $scope) {
                // available returns the maximum width and height available for use
                function available() {
                    return {
                        width: $document[0].body.clientWidth,
                        height: $window.innerHeight
                    };
                }

                // updatePosition needs to be called every time the aspect ratio or the window size
                // has changed
                function updatePosition() {
                    var ratio = parseFloat($scope.ratio);
                    if (isNaN(ratio)) {
                        return;
                    }

                    var a = available();

                    var maxHeight = a.height / 2;
                    var maxWidth = maxHeight * ratio;

                    $scope.width = Math.min(a.width, maxWidth);
                    $scope.height = $scope.width / ratio;
                }

                // Update position on aspect ratio change
                $scope.$watch('ratio', updatePosition);

                // Update position on window resize
                // Avoid an issue in Chrome (and maybe other browsers) where the window resize event
                // is fired twice every time
                var prevAvailable = available();
                angular
                    .element($window)
                    .on('resize', function () {
                        var a = available();
                        if (prevAvailable.width !== a.width || prevAvailable.height !== a.height) {
                            prevAvailable = a;
                            $scope.$apply(updatePosition);
                        }
                    });
            }
        };
    });
