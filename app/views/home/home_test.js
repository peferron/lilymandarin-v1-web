/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('controller home', function() {
    var $rootScope, createController;

    beforeEach(module('lmControllers', 'lmServices'));

    beforeEach(inject(function(_$rootScope_, $controller) {
        $rootScope = _$rootScope_;
        createController = function() {
            $controller('home', {
                $scope: {}
            });
        };
    }));

    it('should set the title', function() {
        createController();
        $rootScope.title.should.equal('LilyMandarin');
    });

    it('should set the tab', function() {
        createController();
        $rootScope.tab.should.equal('home');
    });
});
