/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmSocial', function() {
    var element;

    beforeEach(module('lmDirectives', 'lmTemplates'));

    beforeEach(inject(function($rootScope, $compile) {
        $rootScope.text = 'abctext';
        $rootScope.url = 'http://example.com/abcurl';

        element = $compile('<lm-social url="url" text="text"></lm-social>')($rootScope);
        $rootScope.$digest();
    }));

    it('sets the Facebook share link URL to the correct value', function() {
        element.find('.lm-social__facebook').attr('href').should.equal(
            'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fexample.com%2Fabcurl'
        );
    });

    it('sets the Twitter share link URL to the correct value', function() {
        element.find('.lm-social__twitter').attr('href').should.equal(
            'http://twitter.com/intent/tweet?text=abctext&url=http%3A%2F%2Fexample.com%2Fabcurl'
        );
    });
});
