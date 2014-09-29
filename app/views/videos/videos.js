'use strict';

angular
    .module('lmControllers')
    .controller('videos',
        function($rootScope, $scope, Article, Analytics, Admin) {
            $rootScope.title = 'Videos — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'videos';

            $scope.videos = [];

            // Fetches and appends a new batch of videos
            $scope.load = function() {
                $scope.loadStatus = 'loading';

                var params = {
                    categories: 'music|movie',
                    count: 20
                };

                var length = $scope.videos.length;
                if (!length) {
                    // First load
                    params.validatedBefore = '0';
                    params.validatedOnly = !Admin;
                } else {
                    // Subsequent loads
                    params.validatedBefore = $scope.videos[length - 1].firstValidationTimeNano;
                    // Only the first load should get non-validated articles, otherwise they will
                    // end up duplicated.
                    params.validatedOnly = true;
                }

                Article.query(params, function(videos) {
                    // This is efficient because Angular will not recreate DOM elements for the
                    // already-appended videos in $scope.videos
                    $scope.videos = $scope.videos.concat(videos);

                    $scope.loadStatus = videos.length < params.count ? 'ended' : 'ready';
                });
            };

            $scope.load();
        }
    );
