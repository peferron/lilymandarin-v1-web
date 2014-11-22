/* global describe: false, beforeEach: false, module: false, inject: false, it: false,
    afterEach: false */

'use strict';

describe('service Article', function() {
    var $httpBackend, Article;

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_$httpBackend_, _Article_) {
        $httpBackend = _$httpBackend_;
        Article = _Article_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('gets the correct article on get()', function() {
        $httpBackend
            .expectGET('/api/v1/articles/abc.json')
            .respond('{"hello": "world"}');

        var a = Article.get({id: 'abc'});

        $httpBackend.flush();

        a.should.deep.resource.equal({hello: 'world'});
    });

    it('gets the correct articles on query()', function() {
        $httpBackend
            .expectGET('/api/v1/articles.json' +
                '?categories=c1,c2' +
                '&count=34' +
                '&validated_before=456' +
                '&validated_only=false')
            .respond('[{"hello": "world"}, {"hi": "space"}]');

        var a = Article.query({
            categories: 'c1,c2',
            count: 34,
            validatedBefore: '456',
            validatedOnly: false
        });

        $httpBackend.flush();

        a.should.deep.resource.equal([
            {hello: 'world'},
            {hi: 'space'}
        ]);
    });

});
