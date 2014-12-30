/* global describe: false, beforeEach: false, module: false, inject: false, it: false,
    should: false */

'use strict';

describe('service Modal', function() {
    var $rootScope, Modal, $document;

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_$rootScope_, _Modal_, _$document_) {
        $rootScope = _$rootScope_;
        Modal = _Modal_;
        $document = _$document_;
    }));

    it('should start with $rootScope.modalTemplateUrl null or undefined', function() {
        should.not.exist($rootScope.modalTemplateUrl);
    });

    describe('after calling Modal.show(/abc)', function() {
        beforeEach(function() {
            Modal.show('/abc');
        });

        it('should set $rootScope.modalTemplateUrl to /abc', function() {
            $rootScope.modalTemplateUrl.should.equal('/abc');
        });

        it('should reset $rootScope.modalTemplateUrl after calling Modal.hide()', function() {
            Modal.hide();
            should.not.exist($rootScope.modalTemplateUrl);
        });

        it('should reset $rootScope.modalTemplateUrl after getting an Escape keydown', function() {
            var event = angular.element.Event('keydown', {which: 27});
            $document.trigger(event);
            should.not.exist($rootScope.modalTemplateUrl);
        });
    });
});
