'use strict';

angular
    .module('lmServices')
    .factory('Modal', function($rootScope, $document) {
        function onDocumentKeydown(e) {
            if (e.which === 27) {
                $rootScope.$apply(hide);
            }
        }

        function show(templateUrl) {
            $rootScope.modalTemplateUrl = templateUrl;
            $document.on('keydown', onDocumentKeydown);
        }

        function hide() {
            $rootScope.modalTemplateUrl = null;
            $document.off('keydown', onDocumentKeydown);
        }

        return {
            show: show,
            hide: function($event) {
                if (!$event || angular.element($event.target).hasClass('modal')) {
                    hide();
                }
            }
        };
    });
