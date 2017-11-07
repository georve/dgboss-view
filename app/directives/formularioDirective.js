(function(){

  'use strict';

	var formularioDirective = angular.module('DGBOSS.formularioDirective', []);

	formularioDirective.directive('formularioDirective',['$rootScope', function($rootScope){
		console.log('formularioDirective activated.');

		return {
			restrict:'AEC',
			templateUrl: 'directives/templates/formularioDirective.html',
      scope:{
        label: '@',
        values: '@',
        type: '@',
        model: '=',
        model2: '=',
        icon: '=',
        required: '=',
        blur: '@',
        class: '&',
        class2: '&',
        localFn: '&'
      },
      link: function(scope, element, attributes) {

        // scope.blur2 = function(){
        //   console.log('** on Blur2');
        //   if(typeof scope.blur === 'function'){
        //
        //     scope.blurNew = window[scope.blur];
        //
        //     console.log('** on Blur2 >> if');
        //     console.log(scope.blurNew);
        //     scope.blurNew();
        //   }
        // }

        scope.blur2 = function(){
        $rootScope.$emit(scope.blur);
        };
        console.log(scope.blur);

        scope.class = 'iradio_flat-green';
        scope.class2 = 'iradio_flat-green';

        if(scope.values != undefined && scope.values != ''){
          scope.realValues = scope.values.split(',');
        };

        scope.isInput = function(){
          if(scope.type == 'normalInput'){
            return true;
          }else{
            return false;
          }
        };

        scope.isSelect = function(){
          if(scope.type == 'selectInput'){
            return true;
          }else{
            return false;
          }
        };

        scope.isMixed = function(){
          if(scope.type == 'mixedInput'){
            return true;
          }else{
            return false;
          }
        }

        scope.isRadio = function(){
          if(scope.type == 'radioInput'){
            return true;
          }else{
            return false;
          }
        };

        scope.isDate = function(){
          if(scope.type == 'dateInput'){
            return true;
          }else{
            return false;
          }
        };

        scope.isRequired = function(){
          return scope.required;
        };

        scope.localFn = function(option){
          console.log('on localFn**');
          switch(option){
            case 'one':
              scope.class = 'iradio_flat-green checked';
              scope.class2 = 'iradio_flat-green';
              break;
            case 'two':
              scope.class = 'iradio_flat-green';
              scope.class2 = 'iradio_flat-green checked';
              break;
            default:
              break;
          }
        };


      }
		};
	}]);
})();
