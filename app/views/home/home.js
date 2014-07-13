'use strict';

angular
    .module('lmControllers')
    .controller('home', function($rootScope, $scope, Article, Analytics, Modal, Alert) {
        $rootScope.title = 'LilyMandarin';
        Analytics.page();

        $rootScope.tab = 'home';

        function showReviewsModal() {
            Modal.show('/views/reviews/reviewsModal.html');
        }

        $scope.showReviews = function($event) {
            if ($event.which === 1) {
                $event.preventDefault();
                showReviewsModal();
            }
        };
    });
