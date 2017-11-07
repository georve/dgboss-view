(function(){

  'use strict';

  var ramoServices = angular.module('DGBOSS.ramoServices', []);

  ramoServices.service('ramoServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarRamos = function(){
      console.log('on service..');
      //console.log(dgBossURL);	
      return $http({
          url: mainServices.getURL() + '/ramo/consultar_sub_ramo',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'coRamo': ""
          }
        });
      
    };
    
    this.agregarRamo = function(params){

    	console.log('on service..');
        //console.log(dgBossURL);
		console.log(params);
        return $http({
            url: mainServices.getURL() + '/ramo/update_ramo',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idRamo': params.id,
			        'coRamo': params.coRamo,
              'inPatrimonial': params.inPatrimonial,
              'nbRamo': params.nombre,
              'inEstatus': params.estatus,
              'tipoRamo': params.tipoRamo
            }
          });
    	
    };
    
   
  }]);

  //ramoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
  //ramoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
})();