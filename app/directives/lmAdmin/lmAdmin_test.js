/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmAdmin', function() {
    var element;

    beforeEach(module('lmDirectives'));

    function compile(admin) {
        module(function($provide) {
            $provide.value('Admin', admin);
        });
        inject(function($compile, $rootScope) {
            element = $compile('<lm-admin><div class="abc">def</div></lm-admin>')($rootScope);
            $rootScope.$digest();
        });
    }

    describe('when Admin is false', function() {
        beforeEach(function() {
            compile(false);
        });

        it('replaces the element with a comment', function() {
            element.should.have.length(1);
            element[0].nodeType.should.equal(Node.COMMENT_NODE);
        });
    });

    describe('when Admin is true', function() {
        beforeEach(function() {
            compile(true);
        });

        it('inserts the transcluded elements', function() {
            element.should.have.length(1);
            element.find('.abc').html().should.equal('def');
        });
    });
});
