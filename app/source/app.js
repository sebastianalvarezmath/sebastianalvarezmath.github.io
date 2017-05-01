'use strict';

// Declare app level module which depends on views, and components
angular.module('musicApp', [
    'ngRoute',
    'ngMaterial',
    'musicApp.resources',
    'musicApp.version',
    'musicApp.startPage',
    'musicApp.directives'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.otherwise({redirectTo: '/start'});
}])
;
