(function(){

  'use strict';

  var letterServices = angular.module('DGBOSS.letterServices', []);

  letterServices.service('letterServices', ['$http', 'mainServices', 'authService', function($http, mainServices, authService){
    console.log('letterServices activated..')
    //console.log(dgBossURL);

    var self = this;

    this.consultarCartas = function(params){
      console.log('on service..');
      console.log(params);

      return $http({
        url: mainServices.getURL() + '/letterServices/get_letters',

        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        data: {
          'id': params.id
        }
      });
    };

    this.agregarCarta = function(params){
      console.log('on agregarCarta service..');
      console.log(params);

      return $http({
        url: mainServices.getURL() + '/letterServices/save_update_letter',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
           'params':params
        }
      });
    };

    this.cargarArchivoPoliza = function(file){
      console.log('onUploadFileToUrl..');
      var fd = new FormData();
      fd.append('file', file);
      return $http.post(mainServices.getURL() + '/letterServices/upload_file_template', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });


    };


    this.enviarCartaAutomatica=function(params){

      return $http({
        url: mainServices.getURL() + '/letterServices/enviar_carta_email',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
           'params':params
        }
      });


    };


    this.generarCartaPdf=function(params){

      return $http({
        url: mainServices.getURL() + '/letterServices/carta_pdf_streaming',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
           'params':params
        }
      });


    };

  }]);

  //bancoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //bancoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
