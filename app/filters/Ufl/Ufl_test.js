/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('filter Ufl (UppercaseFirstLetter)', function() {
    beforeEach(module('lmFilters'));

    var ufl;
    beforeEach(inject(function(UflFilter) {
        ufl = UflFilter;
    }));

    it('should make the first letter uppercase', function() {
        ufl('').should.equal('');
        ufl('a').should.equal('A');
        ufl('A').should.equal('A');
        ufl('abc').should.equal('Abc');
        ufl('abC').should.equal('AbC');
        ufl('1').should.equal('1');
        ufl('爱').should.equal('爱');
    });
});
