'use strict';

angular
    .module('lmServices')
    .constant('CanSticky', (function() {
        // Returns whether the current browser has native support for CSS position: sticky.
        var el = angular.element('<div></div>')[0];
        el.style.cssText =
            'position: -webkit-sticky;' +
            'position: -moz-sticky;' +
            'position: -ms-sticky;' +
            'position: -o-sticky;' +
            'position: sticky;';
        return (/sticky/).test(el.style.position);
    }()));
