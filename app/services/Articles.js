'use strict';

angular
    .module('lmServices')
    .service('Articles', function(Article, Admin) {
        this.load = function(defaultParams, $scope, callback) {
            $scope.loadStatus = 'loading';

            $scope.articles = $scope.articles || [];
            var params = defaultParams ? angular.copy(defaultParams) : {};

            var length = $scope.articles.length;
            if (!length) {
                // First load.
                params.validatedBefore = '0';
                params.validatedOnly = !Admin;
            } else {
                // Subsequent loads.
                params.validatedBefore = $scope.articles[length - 1].firstValidationTimeNano;
                // Only the first load should get non-validated articles, otherwise they will
                // end up duplicated.
                params.validatedOnly = true;
            }

            Article.query(params, function(articles) {
                // This is efficient because Angular will not recreate DOM elements for the
                // already-appended articles.
                $scope.articles = $scope.articles.concat(articles);

                if (articles.length < params.count ||
                    articles.length && !articles[articles.length - 1].validated) {
                    $scope.loadStatus = 'ended';
                } else {
                    $scope.loadStatus = 'ready';
                }

                if (callback) {
                    callback(articles);
                }
            });
        };
    });
