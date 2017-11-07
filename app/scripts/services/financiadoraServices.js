(function(){

  'use strict';

  var financiadoraServices = angular.module('DGBOSS.financiadoraServices', []);

  financiadoraServices.service('financiadoraServices', ['$http', 'mainServices', function($http, mainServices){
    console.log('financiadoraServices activated..')

    var self = this;

    //console.log(dgBossURL);

    this.consultarFinanciadoras = function(params){
      console.log('on consultarFinanciadoras service..');
      return $http({
        url: mainServices.getURL() + '/financiadora/get_financiadoras',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
/*          'tipoIdentificacion': '',
          'nuRif': params.rif,*/
          'nuRifempresa': mainServices.getRifEmpresa(),
		      'control': params.control
        }
      });
    };

     this.consultarBanco = function () {
      return $http({
        url: mainServices.getURL() + '/banco/consultar_banco',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idBanco': 0
        }
      });

    };

    this.agregarFinanciadora = function(params){
    	console.log('on agregarFinanciadora service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/financiadora/saveUpdateFinanciadora',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'nuRif': params.rif,
          'nbFinanciadora': params.nombre,
          'diFiscal': params.direccionFiscal,
          'nuTelefonoFiscal': params.telefonoFiscal,
          'diSucursal': params.direccionSucursal,
          'nuTelefonoSucursal': params.telefonoSucursal,
          'nuRifempresa': params.rifEmpresa,
          'estatusFinanciadora': params.estatus,
          'tipoIdentificacion': params.tipoRif,
          'contactosFinanciadora': params.contactos,
          'cuentasFinanciadora': params.cuentasFinanciadora
          //'contactosFinanciadora': JSON.parse(JSON.stringify(params.contactosFinanciadora))

        }
      });
    };

    this.eliminarContacto = function(params){
      return $http({
          url: mainServices.getURL() + '/financiadora/delete_contacto_financiadora',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'idContactoFinanciadora': params.idContactoFinanciadora,
            'nuRifFinanciadora': params.nuRif,
             financiadora:{
                'nuRifempresa':   params.nuRifEmpresa
              }             
          }
        });
    };

    this.eliminarBanco = function(params){
      return $http({
          url: mainServices.getURL() + '/financiadora/delete_cuenta_financiadora',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
             'idCuenta': params.idCuenta,
             'rifFinanciadora': params.rifFinanciadora,
             'rifEmpresa': params.rifEmpresa
          }
        });
    };

  }]);

  //financiadoraServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //financiadoraServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
