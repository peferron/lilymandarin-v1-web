/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmPost', function() {
    var element;

    beforeEach(module('lmDirectives', 'lmTemplates', 'lmFilters', 'lmServices'));

    beforeEach(inject(function($compile, $rootScope) {
        $rootScope.post = {
            id: 'abcid',
            type: 'photo',
            title: 'abctitle',
            slug: 'abcslug',
            internal: {
                medias: {
                    'main-photo': {
                        height: 345,
                        width: 678,
                        filename: 'abcfilename'
                    }
                }
            },
            lines: [
                {
                    'zh-CN': 'abczhcn',
                    'pinyin': 'abcpinyin',
                    'en-US': 'abcenus'
                }
            ]
        };
        element = $compile('<lm-post post="post"></lm-post>')($rootScope);
        $rootScope.$digest();
    }));

    it('sets the img src', function() {
        var img = element.find('img');
        img.should.have.length(1);
        img.attr('src').should.equal('/media/abcfilename_w400p.jpg');
    });

    it('sets the lines', function() {
        element.find('.zh-cn').text().should.equal('abczhcn');
        element.find('.pinyin').text().should.equal('abcpinyin');
        element.find('.en-us').text().should.equal('abcenus');
    });

    it('sets the social url and text', function() {
        var $scope = element.isolateScope();
        $scope.socialUrl.should.equal('http://lilymandarin-v1.peferron.com/post/abcid/abcslug');
        $scope.socialText.should.equal('abczhcn / abcenus');
    });
});
