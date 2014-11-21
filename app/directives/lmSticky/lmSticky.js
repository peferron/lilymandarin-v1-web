'use strict';

angular
    .module('lmDirectives')
    .directive('lmSticky', function(CanSticky) {
        var d = {
            restrict: 'A',
            transclude: true,
            templateUrl: '/directives/lmSticky/lmSticky.html'
        };

        if (CanSticky) {
            // Native browser support, no custom controller needed.
            return d;
        }

        // Explicit dependency injection because ngmin only works with basic patterns.
        d.controller = ['$element', '$window', function( $element, $window) {
            // updateSize needs to be called every time the height of the content changes.
            var height;
            function updateSize() {
                var newHeight = '';
                if (stuck) {
                    newHeight = $element.children()[0].clientHeight + 'px';
                }
                if (height === newHeight) {
                    return;
                }
                height = newHeight;
                $element.css('height', height);
            }

            // JS polyfill.
            // Calling toggleClass at every scroll event would be costly, so let's use an
            // intermediary variable and only update the class when it really needs to.
            var stuck = false;
            angular
                .element($window)
                .on('scroll', function() {
                    var newStuck = $element[0].offsetTop < window.scrollY;
                    if (stuck === newStuck) {
                        return;
                    }
                    stuck = newStuck;

                    updateSize();
                    $element.toggleClass('lm-sticky--stuck', stuck);
                })
                .triggerHandler('scroll');

            // We could use a setInterval to keep track of the content height changes, but to
            // save some resources we'll put the responsibility on the user to trigger a
            // resize event on the lm-sticky element.
            $element.on('resize', updateSize);
        }];

        return d;
    });
