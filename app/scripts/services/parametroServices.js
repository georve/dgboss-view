(function(){

  'use strict';

  var parametroServices = angular.module('DGBOSS.parametroServices', []);

  parametroServices.service('parametroServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarParametro = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
	  console.log(params);	
      return $http({
          url: mainServices.getURL() + '/parametro/consultar_parametros',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'identificador': ''
          }
        });
      
    };
      
   
  }]);

  //parametroServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
})();