/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('service Loading', function() {
    var $rootScope, Loading;

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_$rootScope_, _Loading_) {
        $rootScope = _$rootScope_;
        Loading = _Loading_;
    }));

    it('should init $rootScope.loading to false', function() {
        $rootScope.loading.should.equal(false);
    });

    it('should set $rootScope.loading to true after a request is received', function() {
        Loading.request();
        $rootScope.loading.should.equal(true);
    });

    it('should set $rootScope.loading to false after all requests are answered', function() {
        Loading.request();
        Loading.request();
        Loading.response();
        Loading.responseError();
        $rootScope.loading.should.equal(false);
    });

    it('should keep $rootScope.loading to true if some requests are still pending', function() {
        Loading.request();
        Loading.request();
        Loading.response();
        Loading.request();
        Loading.responseError();
        $rootScope.loading.should.equal(true);
    });
});
