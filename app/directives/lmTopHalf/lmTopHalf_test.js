/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmTopHalf', function() {
    var element;

    beforeEach(module('lmDirectives', 'lmTemplates'));

    function compile(width, height, ratio) {
        module(function($provide) {
            $provide.value('$document', [{
                body: {
                    clientWidth: width
                }
            }]);
            $provide.value('$window', {
                innerHeight: height
            });
        });
        inject(function($compile, $rootScope) {
            element = $compile('<lm-top-half ratio="' + ratio + '"><span class="content"></span></lm-top-half>')($rootScope);
            $rootScope.$digest();
        });
    }

    it('transcludes', function() {
        compile();
        element.find('.content').should.have.length(1);
    });

    describe('with available width = 100px, available height = 100px, and ratio = 1.5', function() {
        beforeEach(function() {
            compile(100, 100, 1.5);
        });

        it('sets the element height to 50px and the content width to 75px', function() {
            element.css('height').should.equal('50px');
        });

        it('sets the content width to 75px', function() {
            element.find('.lm-top-half__content').css('width').should.equal('75px');
        });
    });
});
