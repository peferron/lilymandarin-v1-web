'use strict';

// This "admin" cookie is not intended to be secure. All it does is display a few convenience
// buttons for quick access to the admin interface. Access to the admin interface is unrestricted;
// the admin interface merely displays the same data as the normal web interface, but in an
// editable manner. Authentication happens server-side when the user attempts to save changes.
angular
    .module('lmServices')
    .constant('Admin', (/((; )|^)admin=true(;|$)/).test(document.cookie));
