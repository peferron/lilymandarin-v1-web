/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('controller home', function() {
    beforeEach(module('lmControllers', 'lmServices'));

    var $rootScope, createController;

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
