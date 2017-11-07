(function(){

  'use strict';

  var notaCreditoServices = angular.module('DGBOSS.notaCreditoServices', []);

  notaCreditoServices.service('notaCreditoServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarNotasCredito = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/notaCredito/consultar_notas_credito',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'factura': params.factura
          }
        });
      
    };
    
    this.agregarNotaCredito = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/notaCredito/insert_update_nota_credito',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idNotaCredito': params.idNotaDebito,
              'factura': params.factura,
              'fechaNotaCredito': params.fechaNotaDebito,
              'monto': params.monto,
              'numeroControl': params.numeroControl,
              'descripcion': params.descripcion,
              'estatus': params.estatus             
            }
          });
    };

    

  }]);

  //notaCreditoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //notaCreditoServices.constant('dgBossURL', 'http://localhost:8082/dgboss-services/rest');
})();