/**
 * Created by Josh on 8/11/14.
 */
(function () {
  'use strict';

  var EntityController = function ($scope, $element, $attrs, $parse, $log) {
    this.$scope = $scope;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$parse = $parse;
    this.$log = $log;
    this.init();
  };
  EntityController.$inject = ['$scope', '$element', '$attrs', '$parse', '$log'];

  EntityController.prototype = {
    destroyElement: false,
    entityAccessor: null,
    isEntitySet: false,
    init: function () {
      this.startTime = Date.now();

      this.destroyElement = this.$attrs.destroyElement === 'true';
      this.isEntitySet = this.$attrs.plIsCollection === 'true';

      this.entityAccessor = this.createEntityAccessor();

      this.$log.debug({ src: 'EntityController', msg: 'Begin Parsing Entity Set' });
    },
    createEntity: function () {
      if (this.isEntitySet) {
        this.entityAccessor.set([]);
      } else {
        this.entityAccessor.set({});
      }
    },
    createEntityAccessor: function () {
      var _this = this,
        expressionGetter = this.$parse(this.$attrs.plEntity),
        accessor = {
          get: function () {
            return expressionGetter(_this.$scope);
          },
          getCurrentContext: function () {
            var result = expressionGetter(_this.$scope);

            if (_this.isEntitySet) {
              return result.length === 0 ? undefined : result[result.length - 1];
            }

            return result;
          },
          set: function (val, overwrite) {
            var result = expressionGetter(_this.$scope);

            if (angular.isUndefined(result) || overwrite) {
              _this.isEntitySet = angular.isArray(val);
              expressionGetter.assign(_this.$scope, val);
            }
          }
        };

      return accessor;
    },
    addItem: function () {
      var entity = this.entityAccessor.get();

      if (angular.isArray(entity)) {
        entity.push({});
      } else {
        this.$log.error("expression '" + this.$attrs.plEntity + "' does not evaluate to an array");
      }
    },
    addPropertyToCurrentEntity: function (name, val) {
      var entity = this.entityAccessor.getCurrentContext();

      entity[name] = val;
    },
    finalize: function () {
      this.$log.debug({ src: 'EntityController', msg: 'Finished Parsing Entity Set', elapsed: (Date.now() - this.startTime) });

      if (this.destroyElement) {
        this.$log.debug({ src: 'EntityController', msg: 'Removing EntitySet Element From DOM' });
        this.$element.remove();
      }

      this.$log.debug({ src: 'EntityController', msg: 'Evaluating on-loaded attribute' });

      this.$scope.$eval(this.$attrs.onLoaded);
    }
  };

  var EntityDirective = function () {
    return {
      restrict: 'A',
      controller: EntityController,
      compile: function () {
        return {
          pre: function (scope, elem, attrs, ctrl) {
            ctrl.createEntity();
          },
          post: function (scope, elem, attrs, ctrl) {
            ctrl.finalize();
          }
        };
      }
    };
  };

  var EntitySetItemDirective = function () {
    return {
      restrict: 'A',
      require: '^plEntity',
      compile: function () {
        return {
          pre: function (scope, elem, attrs, esCtrl) {
            esCtrl.addItem();
          },
          post: function () {
          }
        };
      }
    };
  };

  var EntityPropertyDirective = function () {
    return {
      restrict: 'A',
      require: '^plEntity',
      link: function (scope, elem, attrs, esCtrl) {
        esCtrl.addPropertyToCurrentEntity(
          attrs.plPropName,
          attrs.plPropVal || elem.text()
        );
      }
    }
  };

  angular.module('angular-seo')
    .directive('plEntity', EntityDirective)
    .directive('plItem', EntitySetItemDirective)
    .directive('plPropName', EntityPropertyDirective);

}());