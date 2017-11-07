(function(){

  'use strict';

  var usuarioServices = angular.module('DGBOSS.usuarioServices', []);

  usuarioServices.service('usuarioServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;

    this.consultarUsuarios = function(params){
        console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/admin/consultar_usuarios',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                 "nbUsuarioApp": params.nbUsuarioApp,
                 "nuRifEmpresa" : mainServices.getRifEmpresa(),
            }
        });
    };

    this.agregarUsuario = function(params){
        console.log('on service..');
        //console.log(dgBossURL);
        console.log('parametros de agregar usuario');
        console.log(params);
        return $http({
            url: mainServices.getURL() + '/admin/insert_update_usuario',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                'nbUsuarioApp': params.usuario,
                'txClave': params.clave,
                'nuCedulaRif': params.cedulaRif,
                'nuRifEmpresa': mainServices.getRifEmpresa(),//params.rifEmpresa,
                'coRol': params.rol,
                'inEstatus': params.estatus,
                'inProductor': params.productor,
                'diFiscal': params.direccionFiscal,
                'nuTelefonoFiscal': params.telefonoFiscal,
                'inAdministrador': params.administrador,
                'feCredencial': params.fechaCredencial,
                'txCorreo': params.correoElectronico,
                'diHabitacion': params.direccionHabitacion,
                'diLocalidad': params.direccionLocalidad,
                'feNacimiento': params.fechaNacimiento,
                'inSexo': params.sexo,
                'nuCredencial': params.numeroCredencial,
                'inTipoPersona': params.tipoPersona,
                'nbPrimerApellido': params.primerApellido,
                'nbPrimerNombre': params.primerNombre,
                'nbSegundoApellido': params.segundoApellido,
                'nbSegundoNombre': params.segundoNombre,
                'nuCelular': params.telefonoCelular,
                'nuTelefonoHabitacion': params.telefonoHabitacion
            }
          });
    };

    this.editarPerfil = function(params){
        console.log('on service..');
        console.log(params);
        return $http({
            url: mainServices.getURL() + '/admin/update_perfil_usuario',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
                'nbUsuarioApp': params.nbUsuarioApp,
                'txClave': params.clave,
                'nuCedulaRif': params.nuCedulaRif,
                // 'nuRifEmpresa': mainServices.getRifEmpresa(),
                // 'diFiscal': params.direccionFiscal,
                // 'nuTelefonoFiscal': params.telefonoFiscal,
                // 'txCorreo': params.correoElectronico,
                // 'diHabitacion': params.direccionHabitacion,
                // 'diLocalidad': params.direccionLocalidad,
                'feNacimiento': mainServices.revertDate(params.fechaNacimiento),
                'nbPrimerApellido': params.primerApellido,
                'nbPrimerNombre': params.primerNombre,
                'nbSegundoApellido': params.segundoApellido,
                'nbSegundoNombre': params.segundoNombre,
                // 'nuCelular': params.telefonoCelular,
                // 'nuTelefonoHabitacion': params.telefonoHabitacion
            }
          });
    };

  }]);

  //usuarioServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //usuarioServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
