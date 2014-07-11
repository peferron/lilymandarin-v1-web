'use strict';

angular
    .module('lmServices')
    .constant('Domain', {
        origin: 'http://lilymandarin.com',
        media: location.hostname === 'lilymandarin.com' ? '//media.lilymandarin.com' : ''
    });