'use strict';

angular
    .module('lmServices')
    .constant('Admin', (/((; )|^)admin=true(;|$)/).test(document.cookie));