'use strict';

angular
    .module('lmServices')
    .constant('ClickTap', 'ontouchstart' in document.documentElement ? 'tap' : 'click');