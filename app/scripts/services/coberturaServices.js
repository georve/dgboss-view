(function () {

  'use strict';

  var coberturaServices = angular.module('DGBOSS.coberturaServices', []);

  coberturaServices.service('coberturaServices', ['$http', 'mainServices', function ($http, mainServices) {

    //console.log(dgBossURL);

    var self = this;

    this.consultarCoberturas = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/cobertura/consultar_cobertura',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'coCobertura': params.coCobertura
        }
      });

    };

    this.consultarCoberturasByRamo = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/ramo/get_ramo_cobertura',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          
        }
      });

    };


    this.agregarCobertura = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/cobertura/update_cobertura',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idCobertura': params.id,
          'coCobertura': params.coCobertura,
          'txTipoCobertura': params.txTipoCobertura,
          'inPatrimonial': params.inPatrimonial,
          'nbCobertura': params.nbCobertura,
          'inEstatus': params.inEstatus
        }
      });
    };



  }]);

  //coberturaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //coberturaServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
