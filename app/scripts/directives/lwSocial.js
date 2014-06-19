'use strict';

angular
    .module('lwDirectives')
    .directive('lwSocial', function() {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                text: '='
            },
            templateUrl: '/views/lwSocial.html',
            controller: function($scope) {
                function open(url) {
                    window.open(
                         url,
                        '',
                        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
                    );
                }

                function getHref($e) {
                    return $e[0].href;
                }

                $scope.$watch('url', function(v) {
                    $scope.encodedUrl = v ? encodeURIComponent(v) : '';
                });

                $scope.$watch('text', function(v) {
                    $scope.encodedText = v ? encodeURIComponent(v) : '';
                });

                $scope.popup = function($event) {
                    var $target = angular.element($event.target);

                    // The target might not be the <a> itself, but one of its children. Go up at
                    // most 5 parents until we find the <a> href.
                    var href = getHref($target);
                    var i = 0;
                    while (!href && i < 5) {
                        $target = $target.parent();
                        href = getHref($target);
                    }

                    // If the href wasn't found, let the browser handle the event normally.
                    if (!href) {
                        return;
                    }

                    // The href was found: replace the default browser behavior by a popup.
                    $event.preventDefault();
                    open(href);

                    // Prevent the photo card from being flipped.
                    $event.stopPropagation();
                };
            }
        };
    });
