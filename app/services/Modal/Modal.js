'use strict';

angular
    .module('lmServices')
    .service('Modal', function($rootScope, $document) {
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

        this.show = show;
        this.hide = hide;
    });
