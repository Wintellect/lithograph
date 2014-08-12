/**
 * Created by Josh on 8/11/14.
 */
(function () {
  'use strict';

  angular.module('lithograph', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/basic-entity.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .when('/collection', {
          templateUrl: 'partials/collection.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .when('/nested-entity', {
          templateUrl: 'partials/nested-entity.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .when('/entity-with-collection', {
          templateUrl: 'partials/entity-with-collection.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .when('/deep-nesting', {
          templateUrl: 'partials/deep-nesting.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .when('/html-as-value', {
          templateUrl: 'partials/html-as-value.html',
          controller:'dataPublishCtrl',
          controllerAs:'ctrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }]);

}());