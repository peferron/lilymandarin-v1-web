'use strict';

angular
    .module('lmServices')
    .service('Source', function(Alert) {
        // Ordered from best to worst.
        var TYPES = ['internal', 'external-youtube', 'external-youku'];

        this.available = function(video) {
            return internalSources(video).concat(externalSources(video));
        };

        this.setFavorite = function(source) {
            localStorage.favoriteSourceType = source.type;
        };

        this.resetFavorite = function() {
            delete localStorage.favoriteSourceType;
        };

        this.best = function(sources) {
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

            Alert.show('Source', 'error', 'No best source found: ' + JSON.stringify(sources));
        };

        this.remaining = function(available, current) {
            return available.filter(function(source) {
                return source.type !== current.type;
            });
        };

        function internalSources(video) {
            var mainVideo = video.internal.medias['main-video'];
            if (mainVideo && mainVideo.filename) {
                return [{
                    type: 'internal',
                    value: mainVideo.filename,
                    height: mainVideo.height
                }];
            }
            return [];
        }

        function externalSources(video) {
            // Example:
            // "external": {
            //     "youtube": "NJR8In-7_Ac",
            //     "youku": "XNjU3OTY3MjQ0"
            // }
            return Object.keys(video.external || {}).map(function(type) {
                return {
                    type: 'external-' + type,
                    value: video.external[type]
                };
            });
        }
    });
