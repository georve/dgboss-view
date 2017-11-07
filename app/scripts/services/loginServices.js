(function(){

  'use strict';

  var loginServices = angular.module('DGBOSS.loginServices', []);

  loginServices.service('loginServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.logIn = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/admin/login',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'usuario': params.usuario,
          'clave': params.password,
          'dominio': params.empresa
        }
      });
      
    }; 

    this.sendRequestService = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/admin/enviar_solicitud',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'correo': params.correo,
          'dominio': params.dominio
        }
      });  
    }; 

    // this.urlValidate = function(params){
    //   console.log('on service..');
    //   //console.log(dgBossURL);
    //   console.log(params);
    //   return $http({
    //     url: mainServices.getURL() + '/admin/validar_url',
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     data: {
    //       'correo': params.correo,
    //       'dominio': params.dominio
    //     }
    //   });  
    // };

    this.urlValidate = function(values){
      console.log('on urlValidate');
      return $http({
        // prm: values,
        url: mainServices.getURL() + '/admin/validar_url?prm=' + values,
        method:"GET"
      });
    };

    this.cambiarClave = function(params){
      return $http({
        url: mainServices.getURL() + '/admin/registrar',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'correo': params.correo,
          'dominio': params.dominio,
          'clave': params.clave,
          'codigo': params.codigo
        }
      });
    }

  }]);

  //loginServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //loginServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();