(function(){

    'use strict';
	
	var polizasCoberturasDirective = angular.module('DGBOSS.polizasCoberturasDirective', []);
    
	polizasCoberturasDirective.directive('coberturasDirective',function(){
		console.log('coberturasDirective activated.');
		
		return {
			restrict:'AEC',
			templateUrl: 'directives/templates/coberturasDirective.html'
		};
	});
})();
   
