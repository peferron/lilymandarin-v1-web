'use strict';

angular
    .module('lwServices')
    .constant('ClickTap', 'ontouchstart' in document.documentElement ? 'tap' : 'click');