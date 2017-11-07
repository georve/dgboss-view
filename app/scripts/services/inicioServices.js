(function(){

  'use strict';

  var inicioServices = angular.module('DGBOSS.inicioServices', []);

  inicioServices.service('inicioServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;




    this.indicadoresService = function(params){
      console.log('on service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/indicadores/indicador',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          rifEmpresa: mainServices.getRifEmpresa(),
          nbUsuarioApp: mainServices.getUser()
        }
      });
    };

    this.listasInicialesService = function(params){
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/admin/valores_iniciales',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {}
      });
    };

    this.reportePolizasPorRamoService = function(params){
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/indicadores/polizas_ramo',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": params.ramo,
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.reporteSiniestrosPorRamoService = function(params){
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/indicadores/cantidad_siniestros',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": params.ramo,
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.primasCobradasService = function(){
      return $http({
        url: mainServices.getURL() + '/indicadores/primas_cobradas',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.primasPendientesService = function(){
      return $http({
        url: mainServices.getURL() + '/indicadores/primas_pendientes',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.comisionesCobradasService = function(){
      return $http({
        url: mainServices.getURL() + '/indicadores/comisiones_cobradas',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.comisionesPendientesService = function(){
      return $http({
        url: mainServices.getURL() + '/indicadores/comisiones_pendientes',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

    this.cantidadRenovacionesService = function(params){
      return $http({
        url: mainServices.getURL() + '/indicadores/cantidad_renovaciones',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa(),
          "desde": mainServices.revertDate(params.fechaDesde),
          "hasta": mainServices.revertDate(params.fechaHasta)
        }
      });
    };

    this.bonosCobradosService = function(){
      return $http({
        url: mainServices.getURL() + '/indicadores/bonos_cobrados',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          "rifEmpresa": mainServices.getRifEmpresa(),
          "nbUsuarioApp": mainServices.getUser(),
          "coRamo": "",
          "logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa()
        }
      });
    };

  }]);

  //loginServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //loginServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();
