'use strict';

angular
    .module('lwServices')
    .factory('Modal', function($rootScope, $document) {
        function onDocumentKeydown(e) {
            if (e.which === 27) {
                $rootScope.$apply(hide);
            }
        }

        function show(options) {
            $rootScope.modal = {
                templateUrl: options.templateUrl
            };
            $document.on('keydown', onDocumentKeydown);
        }

        function hide() {
            $rootScope.modal = null;
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