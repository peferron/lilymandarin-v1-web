'use strict';

angular
    .module('lmServices')
    .service('Window', function($window) {
        var callbacks = [];
        var listening = false;

        // Cache the available width and height to avoiding an issue in Chrome (and maybe other
        // browsers) where the window resize event is fired twice every time.
        var w, h;

        function onResize(callback) {
            if (angular.isFunction(callback) && callbacks.indexOf(callback) < 0) {
                callbacks.push(callback);
            }
            if (!listening) {
                startListening();
            }
        }

        function offResize(callback) {
            var i = callbacks.indexOf(callback);
            if (i >= 0) {
                callbacks.splice(i, 1);
                if (!callbacks.length && listening) {
                    stopListening();
                }
            }
        }

        function startListening() {
            w = width();
            h = height();
            angular.element($window).on('resize', onWindowResize);
            listening = true;
        }

        function stopListening() {
            w = NaN;
            h = NaN;
            angular.element($window).off('resize', onWindowResize);
            listening = false;
        }

        function onWindowResize() {
            var nw = width();
            var nh = height();
            if (nw === w && nh === h) {
                return;
            }
            w = nw;
            h = nh;
            callbacks.forEach(function(callback) {
                callback(w, h);
            });
        }

        function height() {
            // Use screen.availHeight instead of window.height because window.height can vary while
            // scrolling vertically on Chrome Android (because of the address bar popping in and out
            // of view).
            return $window.screen.availHeight;
        }

        function width() {
            return $window.document.body.clientWidth;
        }

        this.onResize = onResize;
        this.offResize = offResize;
        this.height = height;
        this.width = width;
    });
