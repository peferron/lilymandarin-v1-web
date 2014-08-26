'use strict';

describe('filter Plural', function() {
    beforeEach(module('lmFilters'));

    var plural;
    beforeEach(inject(function(PluralFilter) {
        plural = PluralFilter;
    }));

    it('should not append a "s" if the value is <= 1', function() {
        plural(0, 'item').should.equal('0 item');
        plural(1, 'item').should.equal('1 item');
    });

    it('should append a "s" if the value is > 1', function() {
        plural(1.1, 'item').should.equal('1.1 items');
        plural(2, 'item').should.equal('2 items');
    });
});
