(function(){

  'use strict';

  var aseguradoraServices = angular.module('DGBOSS.aseguradoraServices', []);

  aseguradoraServices.service('aseguradoraServices', ['$http', 'mainServices', function($http, mainServices){

    ////console.log(dgBossURL);

    var self = this;

    this.consultarAseguradoras = function(params){
      console.log('on service..');
      ////console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/aseguradoras/get_aseguradoras',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'id_pais': params.id
          }
        });
    };

    this.agregarAseguradora = function(params){

    	console.log('on service agregarAseguradora..');
      console.log(params);
        ////console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/aseguradoras/saveUpdate',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'id': params.id,
              'nu_rif': params.nu_rif,
              'nb_aseguradora': params.nb_aseguradora,
              'nu_telefono': params.nu_telefono,
              'in_estatus': params.in_estatus,
              'id_pais': params.id_pais
            }
          });
    };

	this.agregarContactosAseguradora = function(params){
    	console.log('on service..');
        ////console.log(dgBossURL);
        console.log(params);
        return $http({
            url: mainServices.getURL() + '/aseguradoras/saveUpdateContactos',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'rifAseguradora': params.rif,
              'contactos': params.contactos,
              'redesSociales': params.redesSociales,
              'extranet': params.extranet,
              'cuentas': params.cuentas,
			        'corretajes':params.corretajes
            }
          });
	};

    this.consultarContactos = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/aseguradoras/get_contactos?rifAseguradora='+params.rifAseguradora+'&rifEmpresa='+params.rifEmpresa,
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
/*           data: {
            'rifAseguradora': params.rifAseguradora,
            'rifEmpresa': params.rifEmpresa
          } */
        });

    };


	this.consultarBanco = function(params){
      return $http({
          url: mainServices.getURL() + '/banco/consultar_banco',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'idBanco': 0
          }
        });
	};

  this.eliminarBancoAseguradora = function(params){
        console.log(params);
      return $http({
          url: mainServices.getURL() + '/aseguradoras/delete_cuenta_aseguradora',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
                  'idCuenta':params.id,
                  'rifAseguradora':params.rifAseguradora,
                  'rifEmpresa':params.rifEmpresa
                }
        });
  };

  this.eliminarContactoAseguradora = function(params){
      return $http({
          url: mainServices.getURL() + '/aseguradoras/delete_contacto_aseguradora',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
                  'id':params.id,
                  'rifAseguradora':params.rifAseguradora,
                  'rifEmpresa':params.rifEmpresa
                }
        });
  };

  }]);

  //aseguradoraServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //aseguradoraServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();
