// /* global describe: false, beforeEach: false, module: false, inject: false, it: false */

// 'use strict';

// describe('filter Ago', function() {
//     var ago;

//     beforeEach(module('lmFilters'));

//     beforeEach(inject(function(AgoFilter) {
//         ago = AgoFilter;
//     }));

//     var s = 1e3;
//     var m = 60*s;
//     var h = 60*m;
//     var d = 24*h;

//     it('should return "just now" for t < 10s', function() {
//         ago(-1*s).should.equal('just now');
//         ago(0).should.equal('just now');
//         ago(9*s).should.equal('just now');
//     });

//     it('should return the number of seconds, floored by 10, for 10s <= t < 1m', function() {
//         ago(10*s).should.equal('10 seconds ago');
//         ago(59*s).should.equal('50 seconds ago');
//     });

//     it('should return the number of minutes for 1m <= t < 1h', function() {
//         ago(1*m).should.equal('1 minute ago');
//         ago(60*m - 1*s).should.equal('59 minutes ago');
//     });

//     it('should return the number of hours for 1h <= t < 1d', function() {
//         ago(1*h).should.equal('1 hour ago');
//         ago(1*d - 1*s).should.equal('23 hours ago');
//     });

//     it('should return the number of days for 1d <= t < 1mo', function() {
//         ago(1*d).should.equal('1 day ago');
//         ago(30*d).should.equal('30 days ago');
//     });

//     it('should return the number of months for 1mo <= t < 1y', function() {
//         ago(31*d).should.equal('1 month ago');
//         ago(365*d).should.equal('11 months ago');
//     });

//     it('should return the number of years for n*y < t < n*y + 1mo', function() {
//         ago(366*d).should.equal('1 year ago');
//         ago(365*d + 30*d).should.equal('1 year ago');
//         ago(2*366*d).should.equal('2 years ago');
//     });

//     it('should return the number of years and months for n*y + 1mo < t < n*y + 12mo', function() {
//         ago(366*d + 31*d).should.equal('1 year and 1 month ago');
//         ago(2*365*d).should.equal('1 year and 11 months ago');
//         ago(2*366*d + 31*d).should.equal('2 years and 1 month ago');
//         ago(2*366*d + 2*31*d).should.equal('2 years and 2 months ago');
//     });
// });
