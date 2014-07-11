'use strict';

angular
    .module('lmControllers')
    .controller('video',
        function($rootScope, $scope, $routeParams, $location, Article, Analytics, Source, Domain) {
            $rootScope.tab = 'videos';

            $scope.sources = {};

            function setSource(source) {
                $scope.sources.current = source;
                $scope.sources.remaining = Source.remaining($scope.sources.available, source);
            }

            $scope.setSource = function(source) {
                Source.setFavorite(source);
                setSource(source);
            };

            $scope.toggleTranslation = function(line) {
                line.showTranslation = !line.showTranslation;
            };

            Article.get({id: $routeParams.id}, function(video) {
                // Enforce canonical path
                var path = '/video/' + video.id + '/' + video.slug;
                if ($location.path() !== path) {
                    $location.path(path).replace();
                    return;
                }

                $rootScope.title = video.title + ' — LilyMandarin';
                Analytics.page();

                $scope.socialUrl = Domain.origin + path;
                $scope.socialText = video.title;

                $scope.video = video;

                var media = video.internal.medias['main-video'];
                $scope.videoHeight = media ? media.height : 100;
                $scope.videoWidth = media ? media.width : 100;

                $scope.sources.available = Source.available(video);
                setSource(Source.best($scope.sources.available));
            });
        }
    );
