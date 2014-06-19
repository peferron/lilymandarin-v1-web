'use strict';

angular
    .module('lwFilters')
    .filter('videoSrc', function(Alert, Domain) {
        var BEST_VARIANT_HEIGHT = 360;

        // Must be sorted from lowest height to highest.
        var DEFAULT_VARIANTS = [
            {h: 270, b: 350},
            {h: 360, b: 650},
            {h: 540, b: 1000},
            {h: 720, b: 1500},
            {h: 1080, b: 2300}
        ];

        // The list of variants for each format. Must be sorted from lowest height to highest.
        var VARIANTS = {
            mp4: DEFAULT_VARIANTS,
            webm: DEFAULT_VARIANTS
        };

        // Returns the best available variant. The available variants must be sorted from lowest
        // height to highest.
        function bestVariant(availableVariants) {
            var variant;
            for (var i = 0; i < availableVariants.length; i++) {
                if (i > 0 && variant.h > BEST_VARIANT_HEIGHT) {
                    break;
                }
                variant = availableVariants[i];
            }
            return variant;
        }

        // Returns the list of available variants for the given source and format, sorted from
        // lowest height to highest.
        function availableVariants(source, format) {
            var variants = VARIANTS[format];
            if (!variants) {
                Alert.show(
                    'Article',
                    'error',
                    'Cannot get videoSrc variants for format: ' + format
                );
                return null;
            }

            var a = [];
            for (var i = 0; i < variants.length; i++) {
                var variant = variants[i];
                if (i === 0 || variant.h < source.height) {
                    a.push(variant);
                } else {
                    break;
                }
            }
            return a;
        }

        // Returns the file suffix corresponding to the given variant.
        function suffix(variant) {
            return '_h' + variant.h + 'p-b' + variant.b + 'k';
        }

        // Returns the src of the best video for the given source, with the given format.
        return function(source, format) {
            var available = availableVariants(source, format);
            if (!available) {
                return '';
            }

            var variant = bestVariant(available);

            return Domain.media + '/media/' + source.value + suffix(variant) + '.' + format;
        };
    });
