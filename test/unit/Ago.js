'use strict';

describe('filter Ago', function() {
    beforeEach(module('lmFilters'));

    var ago;
    beforeEach(inject(function(AgoFilter) {
        ago = AgoFilter;
    }));

    it('should replace values < 10s by "just now"', function() {
        ago(-1000).should.equal('just now');
        ago(0).should.equal('just now');
        ago(9000).should.equal('just now');
        ago(10000).should.not.equal('just now');
    });
});
