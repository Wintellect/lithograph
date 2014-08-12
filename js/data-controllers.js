/**
 * Created by Josh on 8/11/14.
 */
(function () {
  'use strict';

  var DataPublishCtrl = function($rootScope){
    this.$rootScope = $rootScope;
  };
  DataPublishCtrl.$inject = ['$rootScope'];

  DataPublishCtrl.prototype = {
    publish:function(){
      var data = {};

      for(var prop in this){
        if(!this.hasOwnProperty(prop) || prop === '$rootScope') continue;

        data[prop] = angular.copy(this[prop]);
      }

      this.$rootScope.$broadcast('publish-data', data);
    }
  };

  var DataListenerCtrl = function($rootScope){
    this.$rootScope = $rootScope;
    this.init();
  };
  DataListenerCtrl.$inject = ['$rootScope'];

  DataListenerCtrl.prototype = {
    init:function(){
      var _this = this;
      _this.$rootScope.$on('publish-data', function(event, data){
        _this.data = data;
      });
    }
  };

  angular.module('angular-seo')
    .controller('dataPublishCtrl', DataPublishCtrl)
    .controller('dataListenerCtrl', DataListenerCtrl);

}());