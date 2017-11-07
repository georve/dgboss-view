(function(){

  'use strict';

  var prueba = angular.module('DGBOSS.prueba', []);

  prueba.service('prueba', ['$http', 'dgBossURL', function($http, dgBossURL){

    var self = this;
	console.log('pas activated.');

  }]);

})();

