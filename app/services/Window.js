'use strict';

angular
    .module('lmServices')
    .service('Window', function($window) {
        this.on = function(opts) {
            // Cache the available width and height to avoiding an issue in Chrome (and maybe other
            // browsers) where the window resize event is fired twice every time.

            var x = {
                width: opts.width(),
                height: opts.height(),
                off: function() {
                    angular.element($window).off('resize', onWindowResize);
                }
            };

            function onWindowResize() {
                var nw = opts.width();
                var nh = opts.height();
                if (nw === x.width && nh === x.height) {
                    return;
                }
                x.width = nw;
                x.height = nh;
                if (opts.resize) {
                    opts.resize();
                }
            }

            angular.element($window).on('resize', onWindowResize);

            return x;
        };
    });
