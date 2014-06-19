'use strict';

describe('Filter: lolFilter', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var lolFilter;
  beforeEach(inject(function ($filter) {
    lolFilter = $filter('lolFilter');
  }));

  it('should return the input prefixed with "lolFilter filter:"', function () {
    var text = 'angularjs';
    expect(lolFilter(text)).toBe('lolFilter filter: ' + text);
  });

});
