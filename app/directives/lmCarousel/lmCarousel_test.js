/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmCarousel', function() {
    var $timeout, element;

    beforeEach(module('lmDirectives'));

    beforeEach(inject(function(_$timeout_) {
        $timeout = _$timeout_;
    }));

    describe('with max set to 3', function() {
        beforeEach(inject(function($compile, $rootScope) {
            element = $compile('<lm-carousel max="3">{{carousel}}</lm-carousel>')($rootScope);
            $rootScope.$digest();
        }));

        it('cycles through values from 0 to 2', function() {
            element.html().should.equal('0');
            $timeout.flush();
            element.html().should.equal('1');
            $timeout.flush();
            element.html().should.equal('2');
            $timeout.flush();
            element.html().should.equal('0');
        });
    });

    describe('with max not set', function() {
        beforeEach(inject(function($compile, $rootScope) {
            element = $compile('<lm-carousel>{{carousel}}</lm-carousel>')($rootScope);
            $rootScope.$digest();
        }));

        it('keeps growing without cycling', function() {
            element.html().should.equal('0');
            $timeout.flush();
            element.html().should.equal('1');
            $timeout.flush();
            element.html().should.equal('2');
            $timeout.flush();
            element.html().should.equal('3');
        });
    });
});
