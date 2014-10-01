/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmAdmin', function() {
    var $provide, $compile, $rootScope;
    beforeEach(module('lmDirectives', function(_$provide_) {
        $provide = _$provide_;
    }));
    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe('when Admin is false', function() {
        beforeEach(function() {
            $provide.value('Admin', false);
        });

        it('replaces the element with the appropriate content', function() {
            var element = $compile('<lm-admin><div>abc</div></lm-admin>')($rootScope);
            $rootScope.$digest();
            element.should.have.length(1);
            element[0].nodeType.should.equal(Node.COMMENT_NODE);
        });
    });

    describe('when Admin is true', function() {
        beforeEach(function() {
            $provide.value('Admin', true);
        });

        it('replaces the element with the appropriate content', function() {
            var element = $compile('<lm-admin><div>abc</div></lm-admin>')($rootScope);
            $rootScope.$digest();
            element.should.have.length(1);
            element.html().should.equal('<div class="ng-scope">abc</div>');
        });
    });
});
