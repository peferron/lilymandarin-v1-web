'use strict';

angular
    .module('lmDirectives')
    .directive('lmTopHalf', function() {
        return {
            restrict: 'A',
            scope: {
                aspectRatio: '@lmTopHalf'
            },
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
                    var aspectRatio = parseFloat($scope.aspectRatio);
                    if (isNaN(aspectRatio)) {
                        return;
                    }

                    var a = available();

                    var maxHeight = a.height / 2;
                    var maxWidth = maxHeight * aspectRatio;

                    var width = Math.min(a.width, maxWidth);
                    var height = width / aspectRatio;

                    $element.css('height', height + 'px');
                }

                // Update position on aspect ratio change
                $scope.$watch('aspectRatio', updatePosition);

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
                            updatePosition();
                        }
                    });
            }
        };
    });
