(function(){

  'use strict';

  var bonoServices = angular.module('DGBOSS.bonoServices', []);

  bonoServices.service('bonoServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;

    this.consultarBono = function(params){
      console.log('on service..');
      console.log(params);
      //console.log(dgBossURL + '/bono/consultar_bono');
      return $http({
        url: mainServices.getURL() + '/bono/consultar_bono',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'idBono': params.idBono
        }
      });
    };

    this.agregarBono = function(params){
      console.log('on agregarBanco service..');
      console.log(params);
      //console.log(dgBossURL);
      //console.log(dgBossURL + '/bono/insert_update_bono');
      return $http({
        url: mainServices.getURL() + '/bono/insert_update_bono',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
          'id': params.id,
          'codigoBono': params.codigoBono,
          'nombreBono': params.nombreBono,
          'descripcionBono': params.descripcionBono,
          'estatus': params.estatus
        }
      });
    };
  }]);

  //bonoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //bonoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
