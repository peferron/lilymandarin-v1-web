/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmTopHalf', function() {
    var element, $rootScope;

    var mockWindow = {
        innerHeight: NaN,
        document: {
            body: {
                clientWidth: NaN
            }
        }
    };

    beforeEach(module('lmDirectives', 'lmTemplates', function($provide) {
        $provide.value('$window', mockWindow);
    }));

    beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    function compile() {
        inject(function($compile) {
            element = $compile('<lm-top-half ratio="ratio"><span class="content"></span></lm-top-half>')($rootScope);
            $rootScope.$digest();
        });
    }

    it('transcludes', function() {
        compile();
        element.find('.content').should.have.length(1);
    });

    describe('with available width = 100px, available height = 100px, and ratio = 1.5', function() {
        beforeEach(function() {
            mockWindow.document.body.clientWidth = 100;
            mockWindow.innerHeight = 100;
            $rootScope.ratio = 1.5;
            compile();
        });

        it('sets the element height to 50px', function() {
            element.css('height').should.equal('50px');
        });

        it('sets the content width to 75px', function() {
            element.find('.lm-top-half__content').css('width').should.equal('75px');
        });

        describe('then ratio changed to 2', function() {
            beforeEach(function() {
                $rootScope.ratio = 2;
                element.isolateScope().$digest();
            });

            it('sets the element height to 50px', function() {
                element.css('height').should.equal('50px');
            });

            it('sets the content width to 100px', function() {
                element.find('.lm-top-half__content').css('width').should.equal('100px');
            });
        });

        describe('then available width changed to 200px and available height changed to 150px', function() {
            beforeEach(function() {
                mockWindow.document.body.clientWidth = 200;
                mockWindow.innerHeight = 150;
                angular.element(mockWindow).triggerHandler('resize');
            });

            it('sets the element height to 75px', function() {
                element.css('height').should.equal('75px');
            });

            it('sets the content width to 112.5px', function() {
                element.find('.lm-top-half__content').css('width').should.equal('112.5px');
            });
        });
    });
});
