/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmProgress', function() {
    var bar, $compile, $rootScope, $timeout;

    beforeEach(module('lmDirectives', 'lmTemplates', 'lmFilters', 'lmServices'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    beforeEach(inject(function($compile, $rootScope) {
        var element = $compile('<lm-progress loading="loading"></lm-progress>')($rootScope);
        $rootScope.$digest();
        bar = element.find('.lm-progress__bar');
    }));

    it('has width 100% when loading is undefined', function() {
        bar.css('width').should.equal('100%');
    });

    it('has width 100% when loading is false', function() {
        $rootScope.loading = false;
        $rootScope.$digest();

        bar.css('width').should.equal('100%');
    });

    it('grows after each tick when loading is true', function() {
        $rootScope.loading = true;
        $rootScope.$digest();

        bar.css('width').should.equal('0%');
        $timeout.flush();
        bar.css('width').should.equal('10%');
        $timeout.flush();
        bar.css('width').should.equal('19%');
        $timeout.flush();
        bar.css('width').should.equal('27.1%');

        $rootScope.loading = false;
        $rootScope.$digest();

        bar.css('width').should.equal('100%');
    });
});
