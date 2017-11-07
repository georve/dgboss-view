(function () {

  'use strict';

  var reciboServices = angular.module('DGBOSS.reciboServices', []);

  reciboServices.service('reciboServices', ['$http', 'mainServices', function ($http, mainServices) {

    //console.log(dgBossURL);

    var self = this;

    this.consultarPolizaRecibo = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      console.log(params);
      return $http({
        //url: mainServices.getURL() + '/recibo/consultar_poliza_recibo',
        url: mainServices.getURL() + '/poliza/consultar_poliza_detalle',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'numeroPoliza': params.poliza,
          'numeroCertificado': params.numeroCertificado,
          'coRamo': params.coRamo,
          'nuRifEmpresa': mainServices.getRifEmpresa()
        }
      });

    };

    this.consultarRecibo = function (params) {

      console.log('on service..');
      //console.log(dgBossURL);
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/recibo/consultar_recibo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'poliza': params.poliza,
          'coRamo': params.coRamo,
          'nuRifEmpresa': mainServices.getRifEmpresa(),
          'numeroCertificado': params.numeroCertificado,
          'isGlobal': params.isGlobal
        }
      });

    };

    this.insertarRecibo = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/recibo/insertar_recibo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'recibo': params.recibo,
          'poliza': params.poliza,
          'fechaVigenciaDesde': params.fechaVigenciaDesde,
          'fechaVigenciaHasta': params.fechaVigenciaHasta,
          'fechaRecepcion': params.fechaRecepcion,
          'fechaEmision': params.fechaEmision,
          'tipoRecibo': params.tipoRecibo,
          'coRamo': params.coRamo,
          'nuRifEmpresa': mainServices.getRifEmpresa(),
          'montoRecibo': params.montoRecibo,
          'comision': params.comision,
          'estatusRecibo': params.estatusRecibo,
          'isGlobal': params.isGlobal,
          'numeroCertificado': params.numeroCertificado,
          'usuario':  mainServices.getUser()
        }
      });

    };

    this.consultarReciboReporte = function(params){
      return $http({
        url: mainServices.getURL() + '/recibo/get_recibos_filtros',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params
      });
    };

    this.consultarReciboReporteDetalle = function(params){
      return $http({
        url: mainServices.getURL() + '/recibo/detalle_historico',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params
      });
    };    
  }]);

  //reciboServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //reciboServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
