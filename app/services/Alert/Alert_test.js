/* global describe: false, beforeEach: false, module: false, inject: false, it: false,
    should: false */

'use strict';

describe('service Alert', function() {

    var $rootScope, Alert;

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_$rootScope_, _Alert_) {
        $rootScope = _$rootScope_;
        Alert = _Alert_;
        Alert.show('123', 'error', 'abc');
    }));

    it('sets the alert', function() {
        $rootScope.alert.should.deep.equal({
            id: '123',
            type: 'error',
            message: 'abc'
        });
    });

    it('replaces the alert if the id is identical', function() {
        Alert.show('123', 'warning', 'def');
        $rootScope.alert.should.deep.equal({
            id: '123',
            type: 'warning',
            message: 'def'
        });
    });

    it('replaces the alert if the id is different', function() {
        Alert.show('456', 'warning', 'def');
        $rootScope.alert.should.deep.equal({
            id: '456',
            type: 'warning',
            message: 'def'
        });
    });

    it('hides the alert if the id is undefined', function() {
        Alert.hide();
        should.not.exist($rootScope.alert);
    });

    it('hides the alert if the id matches', function() {
        Alert.hide('123');
        should.not.exist($rootScope.alert);
    });

    it('does not hide the alert if the id does not match', function() {
        Alert.hide('456');
        $rootScope.alert.should.deep.equal({
            id: '123',
            type: 'error',
            message: 'abc'
        });
    });

});
