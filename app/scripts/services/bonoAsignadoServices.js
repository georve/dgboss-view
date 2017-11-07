(function(){

  'use strict';

  var bonoAsignadoServices = angular.module('DGBOSS.bonoAsignadoServices', []);

  bonoAsignadoServices.service('bonoAsignadoServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;

    // this.agregarBonoAsignadoAseguradora = function(params){
    //   console.log('on agregarBonoAsignado service..');
    //   console.log(params);
    //   //console.log(dgBossURL);
    //   //console.log(dgBossURL + '/bonoAsignado/insert_update_bono_asignado');
    //   return $http({
    //     url: mainServices.getURL() + '/bonoAsignado/insert_update_bono_asignado',
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     data: {
    //       'id': params.id,
    //       //'bono': bono.id,
    //       'nuRifAseguradora':params.nuRifAseguradora,
    //       //'nuRifFinanciadora': params.financiadora.idFinanciadora,
    //       'observaciones': params.observaciones,
    //       'nbUsuario': params.nbUsuario,
    //       'monto': params.monto,
    //       'moneda': params.moneda,
    //       'banco': params.banco,
    //       'fechaCobro': params.fechaCobro,
    //       //'primaCobrada':params.primaCobrada,
    //       'formaPago':params.formaPago
    //       //'numero':params.numero
    //     }
    //   });
    // };
    //
    // this.agregarBonoAsignadoFinanciadora = function(params){
    //   console.log('on agregarBonoAsignado service..');
    //   console.log(params);
    //   //console.log(dgBossURL);
    //   //console.log(dgBossURL + '/bonoAsignado/insert_update_bono_asignado');
    //   return $http({
    //     url: mainServices.getURL() + '/bonoAsignado/insert_update_bono_asignado',
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     data: {
    //       'id': params.id,
    //       //'bono': bono.id,
    //       //'nuRifAseguradora':params.aseguradoras.id,
    //       'nuRifFinanciadora': params.nuRifFinanciadora,
    //       'observaciones': params.observaciones,
    //       'nbUsuario': params.nbUsuario,
    //       'monto': params.monto,
    //       'moneda': params.moneda,
    //       'banco': params.banco,
    //       'fechaCobro': params.fechaCobro,
    //       //'primaCobrada':params.primaCobrada,
    //       'formaPago':params.formaPago
    //       //'numero':params.numero
    //     }
    //   });
    // };

    this.consultarUsuario = function () {
      return $http({
        url: mainServices.getURL() + '/admin/consultar_productores',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
        }
      });

    };

    this.consultarAseguradora = function () {
      return $http({
        url: mainServices.getURL() + '/aseguradoras/get_aseguradoras',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
	        "id_pais": 1
        }

      });

    };


    this.consultarContactos = function(params){
      console.log('on service..');
      return $http({
          url: mainServices.getURL() + '/aseguradoras/get_contactos?rifAseguradora='+params.rifAseguradora+'&rifEmpresa='+params.rifEmpresa,
          method: 'GET',
          headers: {'Content-Type': 'application/json'},

        });

    };


    this.consultarFinanciadora = function () {
      return $http({
        url: mainServices.getURL() + '/financiadora/get_financiadoras',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {

            "nuRifempresa": mainServices.getRifEmpresa(),//"J402457111"
			"control":1
        }
      });

    };

    this.consultarMoneda = function () {
      return $http({
        url: mainServices.getURL() + '/moneda/consultar_moneda',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {

            "idMoneda": 0
        }
      });

    };

    this.consultarBanco = function () {
      return $http({
        url: mainServices.getURL() + '/banco/consultar_banco',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {

          //'idBanco': 0
        }
      });

    };

    this.agregarBonoAsignado = function(params){
      console.log('on agregarBonoAsignado service..');
      console.log(params);
      //console.log(dgBossURL);
      //console.log(dgBossURL + '/bonoAsignado/insert_update_bono_asignado');
      return $http({
        url: mainServices.getURL() + '/bonoAsignado/insert_update_bono_asignado',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'id': params.id,
          'tipoEmpresa': params.tipoEmpresa,
          'rifEmpresaAsegFinan': params.rifEmpresaAsegFinan,
          'observaciones': params.observaciones,
          'tipoPersona': 'J',
          'nuCedRif': params.nuCedRif,
          'monto': params.monto,
          'moneda': params.moneda,
          'banco': params.banco,
          'fechaCobro': params.fechaCobro,
          'formaPago': params.formaPago,
          'rifEmpresa': mainServices.getRifEmpresa()
        }
      });
    };

    this.consultarBonoAsignado = function(params){
      console.log('on consultarBonoAsignado service..');
      console.log(params);
      //console.log(dgBossURL + '/bonoAsignado/consultar_bono_asignado');
      return $http({
        url: mainServices.getURL() + '/bonoAsignado/consultar_bono_asignado',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'id': params.id,
          "rifEmpresa": mainServices.getRifEmpresa()
        }
      });
    };

  }]);

  //bonoAsignadoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //bonoAsignadoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');


})();
