'use strict';

angular
    .module('lwControllers')
    .controller('videos',
        function($rootScope, $scope, $routeParams, $location, Article, Analytics, Admin) {
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
                if (length) {
                    params.validatedBefore = $scope.videos[length - 1].firstValidationTimeNano;
                    // Only get non-validated articles on the first load, otherwise they will end up
                    // duplicated!
                    params.validatedOnly = true;
                } else {
                    params.validatedBefore = '0';
                    params.validatedOnly = !Admin;
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
