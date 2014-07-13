'use strict';

angular
    .module('lmDirectives')
    .directive('lmLatest', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/directives/lmLatest/lmLatest.html',
            controller: function($scope, Article) {
                function getArticleTab(article) {
                    if (!article) {
                        Alert.show('Home', 'error', 'Cannot get tab for null article');
                        return null;
                    }
                    switch (article.category) {
                        case 'post':
                            return 'posts';
                        case 'photo':
                            return 'photos';
                        case 'music':
                        case 'movie':
                            return 'videos';
                        default:
                            Alert.show('Home', 'error', 'Cannot get tab for article category: "' +
                                article.category + '"');
                            return null;
                    }
                }

                $scope.latest = {
                    posts: [],
                    photos: [],
                    videos: []
                };

                var params = {
                    categories: 'post,photo,music|movie',
                    count: 4,
                    validatedBefore: '0',
                    validatedOnly: true
                };

                Article.query(params, function(articles) {
                    articles.forEach(function(article) {
                        var tab = getArticleTab(article);
                        if (tab) {
                            $scope.latest[tab].push(article);
                        }
                    });
                });
            }
        };
    });
