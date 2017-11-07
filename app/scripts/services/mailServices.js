(function(){

  'use strict';

  var mailServices = angular.module('DGBOSS.mailServices', []);

  mailServices.service('mailServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;

    this.enviarEmail = function(params){
        console.log('on enviarEmail Service..');
        console.log(params);
        return $http({
            url: mainServices.getURL() + '/mail/enviar_email_data',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
             id: params.idCotizacion,
             dominio:params.dominio
              //  'toEmail': params.toEmail,
              //  'subject': params.subject,
              //  'body': params.body
            }
          });

      };
  }]);

})();
