(function () {

  'use strict';

  var empresaServices = angular.module('DGBOSS.empresaServices', []);

  empresaServices.service('empresaServices', ['$http', 'mainServices', function ($http, mainServices) {

    //console.log(dgBossURL);

    var self = this;

    this.consultarEmpresa = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/empresa/consultar_empresa',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'nuRif': ""
        }
      });

    };


    this.agregarEmpresa = function (params) {

      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/empresa/insert_update_empresa',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'dominio': params.dominio,
          'nuRif': params.rif,
          'nbEmpresa': params.nombre,
          'txCorreo': params.txCorreo,
          'nuTelefono': params.tlfFiscal,
          'inEstatus': params.estatus,
          'pais': params.pais.idPais,
          'master': params.master,
          'descripcion': params.desc,
          'diFiscal': params.dirFiscal
        }
      });

    };

    this.consultarBanco = function (params) {
      return $http({
        url: mainServices.getURL() + '/banco/consultar_banco',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idBanco': params.id
        }
      });

    };


    this.consultarCuentaEmpresa = function (params) {
      return $http({
        url: mainServices.getURL() + '/cuentas/consultar_cuenta_empresa',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'nuRif': params.rif
        }
      });

    };

    this.agregarCuentaEmpresa = function (params) {
      return $http({
        // url: mainServices.getURL() + '/cuentas/update_cuenta_empresa',
        url: mainServices.getURL() + '/empresa/insertUpdate_cuentas',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'nuRifEmpresa': params.rif,
          'cuentas': params.cuentas
        }
      });

    };

    this.eliminarEmpresaCuenta = function (params) {

        return $http({
          url: mainServices.getURL() + '/cuentas/delete_cuenta_empresa',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: {
            "idEmpresaBanco": params.idEmpresaBanco,
            "nuRifEmpresa": params.nuRifEmpresa,
            "idBanco": params.idBanco
          }
        });
    };

  }]);

  //empresaServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
  //empresaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');

})();
