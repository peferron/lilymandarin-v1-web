/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('filter Ufl (UppercaseFirstLetter)', function() {
    var ufl;

    beforeEach(module('lmFilters'));

    beforeEach(inject(function(UflFilter) {
        ufl = UflFilter;
    }));

    it('should return the original string if empty', function() {
        ufl('').should.equal('');
    });

    it('should return the original string if the first character is already uppercase', function() {
        ufl('A').should.equal('A');
        ufl('AbC').should.equal('AbC');
    });

    it('should return the original string if the first character is not a letter', function() {
        ufl('1bC').should.equal('1bC');
        ufl('爱bC').should.equal('爱bC');
    });

    it('should make the first letter uppercase', function() {
        ufl('a').should.equal('A');
        ufl('abc').should.equal('Abc');
        ufl('abC').should.equal('AbC');
    });
});
