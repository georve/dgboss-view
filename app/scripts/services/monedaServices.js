(function(){

  'use strict';

  var monedaServices = angular.module('DGBOSS.monedaServices', []);

  monedaServices.service('monedaServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;

    this.consultarMonedas = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/moneda/consultar_moneda',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'idMoneda': params.idMoneda,
            'txSimbolo': params.resumenMoneda,
            'nbMoneda': params.nombreMoneda
            /*'estatus': params.estatusMoneda*/
          }
        });

    };

    this.agregarMoneda = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/moneda/insert_update_moneda',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idMoneda': params.idMoneda,
              'txSimbolo': params.resumenMoneda,
              'nbMoneda': params.nombreMoneda,
              'estatus': params.estatusMoneda
            }
          });

    };

  }]);

  //monedaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //consultarMonedas.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
