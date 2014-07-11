'use strict';

angular
    .module('lmServices')
    .factory('Source', function(Alert) {
        // Ordered from best to worst.
        var TYPES = ['internal', 'external-youtube', 'external-youku'];

        return {
            available: function(video) {
                var sources = [];

                var media = video.internal.medias['main-video'];
                if (media && media.filename) {
                    sources.push({
                        type: 'internal',
                        value: media.filename,
                        height: media.height
                    });
                }

                var e = video.external;
                for (var type in e) {
                    if (e.hasOwnProperty(type) && e[type]) {
                        sources.push({
                            type: 'external-' + type,
                            value: e[type]
                        });
                    }
                }

                return sources;
            },

            setFavorite: function(source) {
                localStorage.favoriteSourceType = source.type;
            },

            best: function(sources) {
                var favoriteType = localStorage.favoriteSourceType;
                var types = favoriteType ? [favoriteType].concat(TYPES) : TYPES;

                for (var i = 0; i < TYPES.length; i++) {
                    var type = types[i];
                    for (var j = 0; j < sources.length; j++) {
                        var source = sources[j];
                        if (source.type === type) {
                            return source;
                        }
                    }
                }

                Alert.show(
                    'Source',
                    'error',
                    'No best source found: ' + JSON.stringify(sources)
                );
            },

            remaining: function(available, current) {
                return available.filter(function(source) {
                    return source.type !== current.type;
                });
            }
        };
    });