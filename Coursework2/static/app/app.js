var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.when('/',
        {
            templateUrl: '/static/app/templates/collectionTemplate.html',
            controller: 'collectionController',
            redirectTo : redirectIfNotLoggedIn,
            caseInsensitiveMatch: true
        })
        .when('/about',
        {
            templateUrl: '/static/app/templates/about.html',
            controller: 'aboutController',
            redirectTo : redirectIfNotLoggedIn,
            caseInsensitiveMatch: true
        }).when('/login',
        {
            templateUrl: '/static/app/templates/login.html',
            controller: 'loginController',
            redirectTo : redirectIfLoggedIn,
            caseInsensitiveMatch: true
        });
         
        $routeProvider.otherwise({ redirectTo: '/login' });

    });
    
var redirectIfNotLoggedIn = function (routeParams, path) {
    console.log("redirectIfNotLoggedIn")
    if (globalParams.isLoggedIn) {
        return path;
    } else {
        return "/login";
    }
};

var redirectIfLoggedIn = function (routeParams, path) {

    if (globalParams.isLoggedIn) {
        return "/";
    } else {
        return path;
    }
};

