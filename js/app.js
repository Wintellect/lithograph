/**
 * Created by Josh on 8/11/14.
 */
(function () {
  'use strict';

  angular.module('angular-seo', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
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
        .otherwise({
          redirectTo: '/'
        });
    }]);

}());