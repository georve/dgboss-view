(function(){

  'use strict';

  var certificadoPolizaServices = angular.module('DGBOSS.certificadoPolizaServices', []);

  certificadoPolizaServices.service('certificadoPolizaServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarCertificadoPoliza = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/certificadoPoliza/consultar_certificado_poliza',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'idPoliza': params.idPoliza
          }
        });
      
    };
    
    this.agregarCertificadoPoliza = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/certificadoPoliza/insert_update_certificado_poliza',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idCertificadoPoliza': params.idCertificadoPoliza,
              'idPoliza': params.idPoliza,
              'idAsegurado': params.idAsegurado,
              'fechaVencimiento': params.fechaVencimiento,
              'numeroCertificado': params.numeroCertificado,
              'tipoPago': params.tipoPago,
              'fechaInclusion': params.fechaInclusion             
            }
          });
    };

    

  }]);

  //certificadoPolizaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //certificadoPolizaServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();