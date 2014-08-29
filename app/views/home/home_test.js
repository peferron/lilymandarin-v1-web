/* global describe: false, beforeEach: false, module: false, inject: false, it: false */

'use strict';

describe('controller home', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $rootScope, createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
            $controller('home', {
                $scope: {}
            });
        };
    }));

    it('should set everything right', function() {
        createController();
        $rootScope.title.should.equal('LilyMandarin');
        $rootScope.tab.should.equal('home');
    });
});
