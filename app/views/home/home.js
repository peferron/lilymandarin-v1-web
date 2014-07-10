'use strict';

angular
    .module('lwControllers')
    .controller('home', function($rootScope, $scope, Article, Analytics, Modal, Alert) {
        $rootScope.title = 'LilyMandarin';
        Analytics.page();

        $rootScope.tab = 'home';

        $scope.email = 'fangyan61@gmail.com';

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

        function showReviewsModal() {
            Modal.show({
                templateUrl: '/views/reviews/reviewsModal.html',
                controller: 'reviews'
            });
        }

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

        $scope.showReviews = function($event) {
            if ($event.which === 1) {
                $event.preventDefault();
                showReviewsModal();
            }
        };
    });
