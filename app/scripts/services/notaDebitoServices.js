(function(){

  'use strict';

  var notaDebitoServices = angular.module('DGBOSS.notaDebitoServices', []);

  notaDebitoServices.service('notaDebitoServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarNotasDebito = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/notaDebito/consultar_notas_debito',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'factura': params.factura
          }
        });
      
    };
    
    this.agregarNotaDebito = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/notaDebito/insert_update_nota_debito',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idNotaDebito': params.idNotaDebito,
              'factura': params.factura,
              'fechaNotaDebito': params.fechaNotaDebito,
              'monto': params.monto,
              'numeroControl': params.numeroControl,
              'descripcion': params.descripcion,
              'estatus': params.estatus             
            }
          });
    };

    

  }]);

  //notaDebitoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //notaDebitoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();