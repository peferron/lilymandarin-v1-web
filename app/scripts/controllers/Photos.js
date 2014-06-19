'use strict';

angular
    .module('lwControllers')
    .controller('Photos',
        function($rootScope, $scope, $window, Article, Analytics, Admin) {
            $rootScope.title = 'Photos — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'photos';

            $scope.photos = [];

            // Ideally, the padding should be specified in the CSS
            var PADDING = 5;

            // The aspect ratio of the most "vertical" supported format
            var MIN_ASPECT_RATIO = 3/4;

            // The minimum photo height, relatively to the window height
            var MAX_PHOTO_HEIGHT = 0.9;

            // The maximum photo width, absolute
            var MAX_PHOTO_WIDTH = 590;

            // The current state of the columns
            // { width: the width of each column in pixels,
            //   heights: an array with the summed height of all photos in each column }
            var columns;

            // Sets the positions of the given photos to fit in the given columns
            function setPositions(photos, columns) {
                $scope.css = 'lw-photo { width: ' + columns.width + 'px; }';

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

            // Returns an empty columns object for the given body width and window height, ready to
            // be filled with photos
            function initColumns(bodyWidth, windowHeight) {
                // Minimum number of columns to keep photos below MAX_PHOTO_WIDTH
                var minCount1 = Math.ceil((bodyWidth + PADDING) / (MAX_PHOTO_WIDTH + PADDING));

                // Minimum number of columns to be able to show an entire photo of aspect ratio
                // MIN_ASPECT_RATIO on screen, with LOL left to spare
                var minCount2 = Math.ceil((bodyWidth + PADDING) /
                    ((windowHeight * MAX_PHOTO_HEIGHT) * MIN_ASPECT_RATIO + PADDING));

                var count = Math.max(minCount1, minCount2);

                var heights = [];
                for (var i = 0; i < count; i++) {
                    heights[i] = 0;
                }

                return {
                    width: Math.floor((bodyWidth - (count - 1) * PADDING) / count),
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

            // Cache the body width and window height to avoiding an issue in Chrome (and maybe
            // other browsers) where the window resize event is fired twice every time.
            var bodyWidth = document.body.clientWidth;
            var windowHeight = $window.innerHeight;
            angular
                .element($window)
                .on('resize', function () {
                    if (bodyWidth === document.body.clientWidth &&
                        windowHeight === $window.innerHeight) {
                        return;
                    }
                    bodyWidth = document.body.clientWidth;
                    windowHeight = $window.innerHeight;

                    columns = initColumns(bodyWidth, windowHeight);

                    $scope.$apply(function() {
                        setPositions($scope.photos, columns);
                        updateContainer();
                    });
                });

            // Fetches and appends a new batch of photos
            $scope.load = function() {
                $scope.loadStatus = 'loading';

                var params = {
                    categories: 'photo',
                    count: 30
                };

                var length = $scope.photos.length;
                if (length) {
                    params.validatedBefore = $scope.photos[length - 1].firstValidationTimeNano;
                    // Only get non-validated articles on the first load, otherwise they will end up
                    // duplicated!
                    params.validatedOnly = true;
                } else {
                    params.validatedBefore = '0';
                    params.validatedOnly = !Admin;
                }

                Article.query(params, function(photos) {
                    // This will only happen on the first load
                    if (!columns) {
                        columns = initColumns(document.body.clientWidth, $window.innerHeight);
                    }

                    // There is no need to recompute the positions of the already-appended photos
                    // in $scope.photos. Just compute the positions of the new photos, using the
                    // current columns state
                    setPositions(photos, columns);

                    updateContainer();

                    // This is efficient because Angular will not recreate DOM elements for the
                    // already-appended photos in $scope.photos
                    $scope.photos = $scope.photos.concat(photos);

                    $scope.loadStatus = photos.length < params.count ? 'ended' : 'ready';
                });
            };

            $scope.load();
        }
    );
