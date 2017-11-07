(function(){

  'use strict';

  var comisionServices = angular.module('DGBOSS.comisionServices', []);

  comisionServices.service('comisionServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;

    this.obtenerPolizas = function(){
        console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/comisiones/polizas_sin_comisiones',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                'nuRifEmpresa': mainServices.getRifEmpresa()
            }
        });
     };

    this.obtenerPolizasConComisiones = function(){
        console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/comisiones/polizas_con_comisiones',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                'nuRifEmpresa': mainServices.getRifEmpresa()
            }
        });
     };

    this.consultarDetallePolizas = function (params) {
      console.log('on service.. consultar_poliza_detalle');
      return $http({
        url: mainServices.getURL() + '/poliza/consultar_poliza_detalle',
        method: 'POST',
        data: params
      });
    };    
    
    this.obtenerRoles = function(params){
        console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/comisiones/get_comisiones',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idPoliza': params.idPoliza,
              'nuRifEmpresa': mainServices.getRifEmpresa()

            }
        });
    };
    this.agregarComision = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/comisiones/saveUpdate',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: params
        });
    };

    this.consultarProductores = function(){
        return $http({
            url: mainServices.getURL() + '/admin/consultar_productores',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
            }
        });
    };
  }]);

  //comisionServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');

})();
