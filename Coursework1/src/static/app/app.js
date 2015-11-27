var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.when('/',
        {
            templateUrl: '/static/app/templates/collectionTemplate.html',
            controller: 'collectionController'
        })
        .when('/about',
        {
            templateUrl: '/static/app/templates/about.html',
            controller: 'aboutController'
        });
         
        $routeProvider.otherwise({ redirectTo: '/' });

    });
