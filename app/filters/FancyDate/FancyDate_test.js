/* jshint newcap: false */
/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('filter FancyDate', function() {
    beforeEach(module('lmFilters'));

    var fancy;
    beforeEach(inject(function(FancyDateFilter) {
        fancy = function(s) {
            return FancyDateFilter(new Date(s).getTime());
        };
    }));

    it('should return a fancy date', function() {
        fancy('2014-01-01').should.equal('January 1st, 2014');
        fancy('2014-01-02').should.equal('January 2nd, 2014');
        fancy('2014-01-03').should.equal('January 3rd, 2014');
        fancy('2014-01-04').should.equal('January 4th, 2014');

        fancy('2014-01-10').should.equal('January 10th, 2014');
        fancy('2014-01-11').should.equal('January 11th, 2014');
        fancy('2014-01-12').should.equal('January 12th, 2014');
        fancy('2014-01-13').should.equal('January 13th, 2014');

        fancy('2014-01-20').should.equal('January 20th, 2014');
        fancy('2014-01-21').should.equal('January 21st, 2014');
        fancy('2014-01-22').should.equal('January 22nd, 2014');
        fancy('2014-01-23').should.equal('January 23rd, 2014');
        fancy('2014-01-24').should.equal('January 24th, 2014');

        fancy('2014-01-30').should.equal('January 30th, 2014');
        fancy('2014-01-31').should.equal('January 31st, 2014');
    });
});
