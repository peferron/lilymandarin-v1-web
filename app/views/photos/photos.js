'use strict';

angular
    .module('lmControllers')
    .controller('photos',
        function($rootScope, $scope, $window, Articles, Analytics) {
            $rootScope.title = 'Photos — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'photos';

            // Ideally, the padding should be specified in the CSS
            var PADDING = 5;

            // The aspect ratio of the most "vertical" supported format
            var MIN_ASPECT_RATIO = 3/4;

            // The maximum photo height, relatively to the available height
            var MAX_PHOTO_HEIGHT = 1;

            // The maximum photo width, absolute
            var MAX_PHOTO_WIDTH = 590;

            // The current state of the columns
            // { width: the width of each column in pixels,
            //   heights: an array with the summed height of all photos in each column }
            var columns;

            // Sets the positions of the given photos to fit in the given columns
            function setPositions(photos, columns) {
                $scope.css = 'lm-photo { width: ' + columns.width + 'px; }';

                photos.forEach(function(photo) {
                    var shortest = indexOfMin(columns.heights);

                    var top = columns.heights[shortest];
                    var left = shortest * (columns.width + PADDING);

                    var media = photo.internal.medias['main-photo'];
                    var photoHeight = media ? media.height : 100;
                    var photoWidth = media ? media.width : 100;

                    var height = Math.floor(photoHeight * columns.width / photoWidth);

                    columns.heights[shortest] += height + PADDING;

                    photo.style = photo.style || {};
                    photo.style.top = top + 'px';
                    photo.style.left = left + 'px';
                    photo.style.height = height + 'px';
                });
            }

            // Returns an empty columns object for the given available width and height, ready to be
            // filled with photos
            function initColumns(availableWidth, availableHeight) {
                // Minimum number of columns to keep photos below MAX_PHOTO_WIDTH
                var minCount1 = Math.ceil((availableWidth + PADDING) / (MAX_PHOTO_WIDTH + PADDING));

                // Minimum number of columns to be able to show an entire photo of aspect ratio
                // MIN_ASPECT_RATIO on screen, with LOL left to spare
                var minCount2 = Math.ceil((availableWidth + PADDING) /
                    ((availableHeight * MAX_PHOTO_HEIGHT) * MIN_ASPECT_RATIO + PADDING));

                var count = Math.max(minCount1, minCount2);

                var heights = [];
                for (var i = 0; i < count; i++) {
                    heights[i] = 0;
                }

                return {
                    width: Math.floor((availableWidth - (count - 1) * PADDING) / count),
                    heights: heights
                };
            }

            // Returns the index of the minimum value in the given array
            function indexOfMin(a) {
                var m = 0;
                for (var i = 1; i < a.length; i++) {
                    if (a[i] < a[m]) {
                        m = i;
                    }
                }
                return m;
            }

            // Returns the maximum value in the given array
            function maxValue(a) {
                return a.reduce(function(x, y) {
                    return Math.max(x, y);
                });
            }

            // Updates the style of the photo container
            function updateContainer() {
                $scope.totalHeight = maxValue(columns.heights) - PADDING;
            }

            function availableWidth() {
                return $window.document.body.clientWidth;
            }

            function availableHeight() {
                // Use screen.availHeight instead of window.height because window.height can vary
                // while scrolling vertically on Chrome Android (because of the address bar popping
                // in and out of view).
                return $window.screen.availHeight;
            }

            // Cache the available width and height to avoiding an issue in Chrome (and maybe other
            // browsers) where the window resize event is fired twice every time.
            var aw = availableWidth();
            var ah = availableHeight();
            angular
                .element($window)
                .on('resize', function () {
                    if (aw === availableWidth() && ah === availableHeight()) {
                        return;
                    }
                    aw = availableWidth();
                    ah = availableHeight();

                    columns = initColumns(aw, ah);

                    $scope.$apply(function() {
                        setPositions($scope.photos, columns);
                        updateContainer();
                    });
                });

            $scope.load = function() {
                Articles.load({categories: 'photo', count: 30}, $scope, onLoad);
            };

            $scope.load();

            function onLoad(articles) {
                // This will only happen on the first load.
                if (!columns) {
                    columns = initColumns(availableWidth(), availableHeight());
                }

                // There is no need to recompute the positions of the already-appended photos
                // in $scope.photos. Just compute the positions of the new photos, using the
                // current columns state.
                setPositions(articles, columns);

                updateContainer();
            }
        }
    );
