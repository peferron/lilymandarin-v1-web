'use strict';

angular
    .module('lwServices')
    .constant('Admin', (/((; )|^)admin=true(;|$)/).test(document.cookie));