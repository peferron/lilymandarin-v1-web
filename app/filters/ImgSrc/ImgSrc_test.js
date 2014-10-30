/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('filter ImgSrc', function() {
    var src;

    beforeEach(module('lmFilters', 'lmServices'));

    beforeEach(inject(function(ImgSrcFilter) {
        src = ImgSrcFilter;
    }));

    it('should return the article native width if native width <= max width', function() {
        var article = {
            type: 'photo',
            internal: {
                medias: {
                    'main-photo': {
                        filename: 'abc',
                        width: 500
                    }
                }
            }
        };
        src(article, 500).should.equal('/media/abc_w500p.jpg');
        src(article, 1000).should.equal('/media/abc_w500p.jpg');
    });

    it('should return the next lower generated width if native width > max width', function() {
        var article = {
            type: 'photo',
            internal: {
                progress: 100,
                medias: {
                    'main-photo': {
                        filename: 'abc',
                        width: 2000
                    }
                }
            }
        };
        src(article, 500).should.equal('/media/abc_w400p.jpg');
        src(article, 1000).should.equal('/media/abc_w900p.jpg');
        src(article, 1500).should.equal('/media/abc_w1200p.jpg');
    });

    it('should defaults the max width to 600', function() {
        var article = {
            type: 'photo',
            internal: {
                medias: {
                    'main-photo': {
                        filename: 'abc',
                        width: 2000
                    }
                }
            }
        };
        src(article).should.equal('/media/abc_w600p.jpg');
    });

    it('should also handle video posters', function() {
        var article = {
            type: 'video',
            internal: {
                medias: {
                    'poster-photo': {
                        filename: 'abc',
                        width: 2000
                    }
                }
            }
        };
        src(article).should.equal('/media/abc_w600p.jpg');
    });
});
