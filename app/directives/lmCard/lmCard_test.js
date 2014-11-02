/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmCard', function() {
    var element;

    beforeEach(module('lmDirectives', 'lmTemplates'));

    function mockSelection(selection) {
        inject(function($window) {
            $window.getSelection = function() {
                return {
                    anchorNode: element[0],
                    toString: function() {
                        return selection;
                    }
                };
            };
        });
    }

    beforeEach(inject(function($compile, $rootScope) {
        element = $compile('<lm-card><div class="abc">def</div></lm-card>')($rootScope);
        $rootScope.$digest();
    }));

    it('inserts the transcluded elements', function() {
        element.should.have.length(1);
        element.find('.abc').html().should.equal('def');
    });

    it('is not flipped at startup', function() {
        element.hasClass('lm-card--flipped').should.equal(false);
    });

    it('can be flipped', function() {
        element.click();
        element.hasClass('lm-card--flipped').should.equal(true);
    });

    it('can be flipped back if no text is selected', function() {
        element.click();
        mockSelection('');
        element.click();
        element.hasClass('lm-card--flipped').should.equal(false);
    });

    it('cannot be flipped back if some text is selected', function() {
        element.click();
        mockSelection('ghi');
        element.click();
        element.hasClass('lm-card--flipped').should.equal(true);
    });
});
