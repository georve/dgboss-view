(function(){

  'use strict';

  var bancoServices = angular.module('DGBOSS.bancoServices', ['DGBOSS.authorizationServices']);

  bancoServices.service('bancoServices', ['$http', 'mainServices', 'authService', function($http, mainServices, authService){
    console.log('bancoServices activated..')
    //console.log(dgBossURL);

    var self = this;

    this.consultarBanco = function(params){
      console.log('on service..');
      console.log(params);
      //console.log(dgBossURL + '/banco/consultar_banco');
      //var token = 'JWT ' + authService.getToken();
      //console.log(token);
      return $http({
        url: mainServices.getURL() + '/banco/consultar_banco',
        //url: 'http://192.168.1.107:8080/dgboss-services/rest/banco/consultar_banco',
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        data: {
          'idBanco': params.id,
          'nbBanco': params.nombre,
          'txNacionalidad': params.nacionalidad,
          'coSwift': params.codigoSwift,
          'coBanco': params.codigoBanco,
          'estatus': params.estatus
        }
      });
    };

    this.agregarBanco = function(params){
      console.log('on agregarBanco service..');
      console.log(params);
      //console.log(dgBossURL);
      //console.log(dgBossURL + '/banco/insert_update_banco');
      return $http({
        url: mainServices.getURL() + '/banco/insert_update_banco',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'idBanco': params.id,
          //'rifEmpresa': mainServices.getRifEmpresa(),
          'nbBanco': params.nombre,
          'txNacionalidad': params.nacionalidad,
          'coSwift': params.codigoSwift,
          'coBanco': params.codigoBanco,
          'estatus': params.estatus
        }
      });
    };

  }]);

  //bancoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //bancoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
