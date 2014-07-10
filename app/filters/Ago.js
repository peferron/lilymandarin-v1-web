'use strict';

angular
    .module('lwFilters')
    .filter('Ago', function($filter) {
        // Converts a time ago expressed in milliseconds to a pretty sentence.
        return function(ago) {
            if (typeof ago !== 'number' || isNaN(ago)) {
                return ago;
            }
            if (document.documentElement.lang === 'en-US') {
                var s = Math.round(ago / 1000);
                if (s < 10) {
                    return 'just now';
                }
                var prefix = ' ago';
                var f = Math.floor;
                var p = $filter('Plural');
                if (s < 60) {
                    return p(f(s / 10) * 10, 'second') + prefix;
                }
                if (s < 3600) {
                    return p(f(s / 60), 'minute') + prefix;
                }
                if (s < 3600 * 24) {
                    return p(f(s / 3600), 'hour') + prefix;
                }
                if (s < 3600 * 24 * 31) {
                    return p(f(s / 3600 / 24), 'day') + prefix;
                }
                var daysPerMonth = 365.25 / 12;
                var months = function(value) {
                    return p(f(value / 3600 / 24 / daysPerMonth), 'month') + prefix;
                };
                if (s < 3600 * 24 * daysPerMonth * 12) {
                    return months(s);
                }
                var y = f(s / 3600 / 24 / daysPerMonth / 12);
                var r = s - y * 3600 * 24 * daysPerMonth * 12;
                y = p(y, 'year');
                if (r < 3600 * 24 * daysPerMonth) {
                    return y + prefix;
                }
                return y + ' and ' + months(r);
            }
            // Unsupported language
            return ago;
        };
    });
