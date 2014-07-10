'use strict';

angular
    .module('lwFilters')
    .filter('FancySource', function() {
        // Converts a source into a human-readable description string.
        return function(source) {
            if (!source) {
                return '[cannot get type of null source]';
            }
            switch (source.type) {
                case 'internal':
                    return 'LilyMandarin.com';
                case 'external-youtube':
                    return 'YouTube';
                case 'external-youku':
                    return 'Youku';
                default:
                    return '[unknown source type: "' + source.type + '"]';
            }
        };
    });
