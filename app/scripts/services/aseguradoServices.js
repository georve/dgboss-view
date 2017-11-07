(function () {

  'use strict';

  var aseguradoServices = angular.module('DGBOSS.aseguradoServices', []);

  aseguradoServices.service('aseguradoServices', ['$http', 'mainServices', function ($http, mainServices) {

    //console.log(dgBossURL);

    var self = this;

    this.consultarAsegurados = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/asegurado/consultar_asegurado',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
/*          "inTipoPersona":"",
          "nuCedulaRif": "",*/
          "rifEmpresa" : mainServices.getRifEmpresa()
        }
      });

    };

    this.agregarAsegurado = function (params) {

      console.log('on service..');
      //console.log(dgBossURL);
    
      return $http({
        url: mainServices.getURL() + '/asegurado/insert_update_asegurado',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "cedulaRif": params.identificacion,
          "diHabitacion": params.direccionHabitacion,
          "diLocalidad": params.localidad,
          "diOficina": params.direccionOficina,
          "feConstitucion": params.fechaConstitucion, //FORMATO FECHA
          "feInicio": params.fechaInicio,//FORMATO FECHA
          "feNacimiento": params.fechaNacimiento,//FORMATO FECHA
          "inEstatus": params.estatus,
          "inProductor": 0,
          "inSexo": params.sexo,
          "inTipoPersona": params.txNacionalidad, //CAMBIARRR
          "nbOcupacion": params.ocupacion,
          "nbPrimerApellido": "",
          "nbPrimerNombre": params.nombre,
          "nbProfesion": params.profesion,
          "nbSegundoApellido": "",
          "nbSegundoNombre": "",
          "nuCedulaRif": params.identificacion,
          "nuCelular": params.telefono,
          "nuTelefonoHabitacion": params.telefonoHabitacion,
          "nuTelefonoOficina": params.telefonoOficina,
          "rifEmpresa": mainServices.getRifEmpresa(),
          "txCorreo": params.correo,
          "txCorreoOpcional1": params.correosOpcional1,
          "txCorreoOpcional2": params.correosOpcional2,
          "txCorreoOpcional3": params.correosOpcional3,                                
          "txEstadoCivil": params.estadoCivil,
          "txIngresos": params.ingresos,
          "txOtros": params.otro,
          "txTwitter": params.twitter,
          "txFacebook": params.facebook,
          "txInstagram":params.instagram,
          "txPaginaWeb": params.pagina
        }
      });

    };


    this.editarAsegurado = function (params) {

      console.log('EDITOOOOOOOOOOOOOOOOOOOOOOOOOO');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/asegurado/insert_update_asegurado',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "diHabitacion": params.direccionHabitacion,
          "diLocalidad": params.localidad,
          "diOficina": params.direccionOficina,
          "feConstitucion": params.fechaConstitucion, //FORMATO FECHA
          "feInicio": params.fechaInicio,//FORMATO FECHA
          "feNacimiento": params.fechaNacimiento,//FORMATO FECHA
          "inEstatus": params.estatus,
          "inProductor": 0,
          "inSexo": params.sexo,
          "inTipoPersona": params.txNacionalidad, //CAMBIARRR
          "nbOcupacion": params.ocupacion,
          "nbPrimerApellido": "",
          "nbPrimerNombre": params.nombre,
          "nbProfesion": params.profesion,
          "nbSegundoApellido": "",
          "nbSegundoNombre": "",
          "nuCedulaRif": params.identificacion,
          "nuCelular": params.telefono,
          "nuTelefonoHabitacion": params.telefonoHabitacion,
          "nuTelefonoOficina": params.telefonoOficina,
          "rifEmpresa": mainServices.getRifEmpresa(),          
          "txCorreo": params.correo,
          "txCorreoOpcional1": params.txCorreoOpcional1,
          "txCorreoOpcional2": params.txCorreoOpcional2,
          "txCorreoOpcional3": params.txCorreoOpcional3,          
          "txEstadoCivil": params.estadoCivil,
          "txIngresos": params.ingresos,
          "txOtros": params.otro,
          "txTwitter": params.twitter,
          "txFacebook": params.facebook,
          "txInstagram":params.instagram,
          "txPaginaWeb": params.pagina
        }
      });

    };


  }]);

  //aseguradoServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //aseguradoServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();
