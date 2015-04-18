'use strict';

angular
    .module('lmControllers')
    .controller('reviews', function($rootScope, $scope, Analytics, Review, Modal) {
        if (!$rootScope.modalTemplateUrl) {
            $rootScope.title = 'Student reviews — LilyMandarin';
            $rootScope.tab = 'home';
            Analytics.page();
        } else {
            $scope.hideModal = Modal.hide;
        }

        $scope.reviews = Review.query();
    });
