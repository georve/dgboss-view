(function(){

  'use strict';

  var vehiculoServices = angular.module('DGBOSS.vehiculoServices', []);

  vehiculoServices.service('vehiculoServices', ['$http', 'mainServices', function($http, mainServices){
    console.log('vehiculoServices activated..')
    //console.log(dgBossURL);

    var self = this;

    this.consultarMarcasVehiculo = function(params){
      console.log('on service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/vehiculo/consultar_marca_vehiculo',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'idMarca': params.idMarca
        }
      });
    };
    
    this.consultarModelosVehiculo = function(params){
        console.log('on service..');
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/vehiculo/consultar_modelo_vehiculo',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'idModeloVehiculo': params.idModeloVehiculo
          }
        });
      };
	  
	this.consultarMarcas = function(params){
      console.log('on service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/consulta/consultar_marcas',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: params
      });
    };
    
    this.consultarModelos = function(params){
        console.log('on service..');
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/consulta/consultar_modelos',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: params
        });
      };
	  
	  this.consultarVersiones = function(params){
        console.log('on service..');
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/consulta/consultar_versiones',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: params
        });
      };
	  
	  this.consultarValorInma = function(params){
        console.log('on service..');
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/consulta/consultar_inma',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: params
        });
      };

  }]);

  //vehiculoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //vehiculoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');



})();
