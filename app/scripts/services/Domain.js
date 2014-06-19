'use strict';

angular
    .module('lwServices')
    .constant('Domain', {
        origin: 'http://lilymandarin.com',
        media: location.hostname === 'lilymandarin.com' ? '//media.lilymandarin.com' : ''
    });