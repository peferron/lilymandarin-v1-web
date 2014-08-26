// 'use strict';

// angular
//     .module('lmDirectives')
//     .directive('lmWrite', function() {
//         return {
//             restrict: 'E',
//             link: function(scope, element, attrs) {
//                 /* jshint evil: true */

//                 var oldWrite = document.write;
//                 document.write = function (str) {
//                     element.html(str);
//                 };

//                 var s = document.createElement('script');
//                 s.src = attrs.src;
//                 s.onload = function() {
//                     document.write = oldWrite;
//                     element.addClass('loaded');
//                 };
//                 element.append(s);
//             }
//         };
//     });
