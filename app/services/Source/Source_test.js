/* global describe: false, beforeEach: false, module: false, inject: false, it: false,
    afterEach: false */

'use strict';

describe('service Source', function() {
    var Source;

    var videoInternalOnly = {
        internal: {
            medias: {
                'main-video': {filename: 'abc', height: 123}
            }
        }
    };

    var video = {
        internal: {
            medias: {
                'main-video': {filename: 'abc', height: 123}
            }
        },
        external: {
            youtube: 'def',
            youku: 'ghi'
        }
    };

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_Source_) {
        Source = _Source_;
    }));

    afterEach(function() {
        Source.resetFavorite();
    });

    describe('function available()', function() {
        it('should return an array of available sources', function() {
            Source.available(videoInternalOnly).should.deep.equal([
                {type: 'internal', value: 'abc', height: 123}
            ]);

            Source.available(video).should.deep.equal([
                {type: 'internal', value: 'abc', height: 123},
                {type: 'external-youtube', value: 'def'},
                {type: 'external-youku', value: 'ghi'}
            ]);
        });
    });

    describe('function best()', function() {
        it('should pick the default source if no favorite it set', function() {
            Source.best(Source.available(video)).type.should.equal('internal');
        });

        it('should pick the favorite source if the favorite is set and available', function() {
            Source.setFavorite({type: 'external-youtube'});
            Source.best(Source.available(video)).type.should.equal('external-youtube');
        });

        it('should pick the default source if the favorite is set but unavailable', function() {
            Source.setFavorite({type: 'external-youtube'});
            Source.best(Source.available(videoInternalOnly)).type.should.equal('internal');
        });
    });

    describe('function remaining()', function() {
        var a = {type: 'a'};
        var b = {type: 'b'};
        var c = {type: 'c'};
        var d = {type: 'd'};

        it('should remove the current source from the available sources', function() {
            Source.remaining([a, b, c], b).should.deep.equal([a, c]);
            Source.remaining([b], b).should.deep.equal([]);
            Source.remaining([a, b, c], d).should.deep.equal([a, b, c]);
            Source.remaining([], b).should.deep.equal([]);
        });
    });

});
