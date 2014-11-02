/* global describe: false, beforeEach: false, afterEach: false, module: false, inject: false,
    it: false */

'use strict';

describe('directive lmLatest', function() {
    var $httpBackend, $compile, $rootScope, element;

    beforeEach(module('lmDirectives', 'lmServices', 'lmFilters', 'lmTemplates'));

    beforeEach(inject(function(_$httpBackend_, _$compile_, _$rootScope_) {
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function createDirective() {
        element = $compile('<lm-latest></lm-latest>')($rootScope);
        $rootScope.$digest();
    }

    function createAndExpect(articles) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=post,photo,music%7Cmovie' +
            '&count=4' +
            '&validated_before=0' +
            '&validated_only=true'
        ).respond(articles);
        createDirective();
    }

    function createAndFlush(articles) {
        createAndExpect(articles);
        $httpBackend.flush();
    }

    describe('before the articles are loaded', function() {
        beforeEach(function() {
            createAndExpect([]);
        });

        afterEach(function() {
            $httpBackend.flush();
        });

        it('should have 3 tabs', function() {
            element.find('.lm-latest__tab').should.have.length(3);
        });

        it('should not have articles yet', function() {
            element.find('.lm-latest__tab__placeholder').should.have.length(0);
        });
    });

    describe('before the articles are loaded', function() {
        beforeEach(function() {
            createAndFlush([
                { id: '0', category: 'photo' },
                { id: '1', category: 'post' },
                { id: '2', category: 'music' },
                { id: '3', category: 'movie' },
                { id: '4', category: 'photo' },
                { id: '5', category: 'music' }
            ]);
        });

        it('should have 3 tabs', function() {
            element.find('.lm-latest__tab').should.have.length(3);
        });

        it('should place each article in the corresponding tab', function() {
            var tabs = element.find('.lm-latest__tab');
            tabs.eq(0).find('.lm-latest__tab__placeholder').should.have.length(1);
            tabs.eq(1).find('.lm-latest__tab__placeholder').should.have.length(2);
            tabs.eq(2).find('.lm-latest__tab__placeholder').should.have.length(3);
        });
    });
});
