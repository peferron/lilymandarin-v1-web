'use strict';

describe('filter VideoSrc', function() {
    beforeEach(module('lmFilters'));
    beforeEach(module('lmServices'));

    var src;
    beforeEach(inject(function(VideoSrcFilter) {
        src = VideoSrcFilter;
    }));

    it('should return the best variant height if native height >= best variant height', function() {
        src({value: 'abc', height: 600}, 'mp4').should.equal('/media/abc_h540p-b1000k.mp4');
        src({value: 'abc', height: 2000}, 'webm').should.equal('/media/abc_h540p-b1000k.webm');
    });

    it('should return the next lower variant height if native height < best variant height',
        function() {
        src({value: 'abc', height: 500}, 'mp4').should.equal('/media/abc_h360p-b650k.mp4');
        src({value: 'abc', height: 300}, 'mp4').should.equal('/media/abc_h270p-b350k.mp4');
        src({value: 'abc', height: 200}, 'webm').should.equal('/media/abc_h270p-b350k.webm');
    });
});
