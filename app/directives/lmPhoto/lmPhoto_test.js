/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('directive lmPhoto', function() {
    var element, $compile, $rootScope;

    beforeEach(module('lmDirectives', 'lmTemplates', 'lmFilters', 'lmServices'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($compile, $rootScope) {
        $rootScope.photo = {
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
        element = $compile('<lm-photo photo="photo"></lm-photo>')($rootScope);
        $rootScope.$digest();
    }));

    it('sets the img src', function() {
        var img = element.find('img');
        img.should.have.length(1);
        img.attr('src').should.equal('/media/abcfilename_w600p.jpg');
    });

    it('sets the lines', function() {
        element.find('.zh-cn').text().should.equal('abczhcn');
        element.find('.pinyin').text().should.equal('abcpinyin');
        element.find('.en-us').text().should.equal('abcenus');
    });

    it('sets the social url and text', function() {
        var $scope = element.isolateScope();
        $scope.socialUrl.should.equal('http://lilymandarin.com/photo/abcid/abcslug');
        $scope.socialText.should.equal('abczhcn / abcenus');
    });
});
