(function(){

  'use strict';

  var rolesServices = angular.module('DGBOSS.rolesServices', []);

  rolesServices.service('rolesServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;
    
    this.consultarRoles = function(params){
        console.log('on service..');
        //console.log(dgBossURL);
        console.log(params);
        return $http({
            url: mainServices.getURL() + '/admin/consultar_rol',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'coRol': params.codigo,
              'nuRifEmpresa': params.rifEmpresa
            }
          });
      };

    this.agregarRol = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/admin/update_rol',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            'coRol': params.codigo,
            'nbRol': params.nombre,
            'txDescripcion': params.descripcion,
            'inEstatus': params.estatus,
            'nuRifEmpresa': params.rifEmpresa
          }
        });
    };

    this.consultarPermisos = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/admin/consultar_permisos',
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          data: {
            'coPermiso': ''
          }
        });
    };

    this.consultarPermisosPorRol = function(){
      return $http({
        url: mainServices.getURL() + '/admin/consultar_rol_permisos',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idRp': 0
        }
      });
    }

    this.agregarPermiso = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/admin/update_permiso',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'idPermiso': params.idPermiso,
              'nbPermiso': params.nbPermiso
            }
          });
    };

    this.agregarPermisosService = function(params){
      console.log('on agregarPermisos service..');
      return $http({
        url: mainServices.getURL() + '/admin/update_rol_permiso',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params
      });
    };


  }]);

  //rolesServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //rolesServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
