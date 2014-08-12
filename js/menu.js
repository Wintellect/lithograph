/**
 * Created by Josh on 7/8/14.
 */
(function () {
  'use strict';

  var MenuCtrl = function ($location) {
    this.$location = $location;
    this.siteTitle = "Lithograph";
    this.menu = [
      {
        'title': 'Basic Entity',
        'link': '/'
      },
      {
        'title': 'Nested Entity',
        'link':'/nested-entity'
      },
      {
        'title':'Collection',
        'link':'/collection'
      },
      {
        'title':'Entity With Collection',
        'link':'/entity-with-collection'
      },
      {
        'title':'Deep Nesting',
        'link':'/deep-nesting'
      }
    ];
  };

  MenuCtrl.$inject = ['$location'];

  angular.extend(MenuCtrl.prototype, {
    isActive: function (route) {
      return route === this.$location.path();
    }
  });

  angular.module('lithograph')
    .controller('MenuCtrl', MenuCtrl);

}());