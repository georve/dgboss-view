(function () {

  'use strict';

  var aseguradoController = angular.module('DGBOSS.aseguradoController', ['ngAnimate', 'DGBOSS.aseguradoServices']);

  aseguradoController.controller('aseguradoController', ['$scope', '$rootScope', 'aseguradoServices','mainServices', function ($scope, $rootScope, aseguradoServices,mainServices) {

    var self = this;

    console.log('aseguradoController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views
    */
    this.views = {
      verAsegurado: false,
      agregarAsegurado: false,
      editarAsegurado: false,
      listarAsegurados: false,
      cagarAsegurados: false,
    };

    /*
    */
    this.naturalJuridicoRadio = {
      natural: true,
      juridico: false
    };


    this.formularioAsegurado = {

      direccionHabitacion: undefined,
      telefonoHabitacion: undefined,
      direccionOficina: undefined,
      telefonoOficina: undefined,
      profesion: undefined,
      ocupacion: undefined,
      ingresos: undefined,
      pagina: undefined,
      facebook: undefined,
      instagram: undefined,
      twitter: undefined,
      otro: undefined
    };

    this.formularioAseguradoNatural = {

      sexo: 'M',
      nombreCompleto: undefined,
      identificacion: undefined,
      tipoCedula: undefined,
      fechaNacimiento: undefined,
      estadoCivil: undefined,
      telefono: undefined,
      correo: undefined,
      localidad: undefined
    };

    this.formularioAseguradoJuridico = {

      empresa: undefined,
      rif: undefined,
      fechaConstitucion: undefined,
      fechaInicio: undefined,
      correo: undefined,
      localidad: undefined
    };

    this.editarAseguradoNatural = {

      cedula: undefined,
      correoElectronico: undefined
    };

    this.editarAseguradoJuridico = {

      rif: undefined,
      correoElectronico: undefined
    };

    this.eliminarAsegurado = {

      nombre: undefined
    };

    this.naturalJuridicoCheck = {

      natural: 'iradio_flat-green checked',
      juridico: 'iradio_flat-green'
    };

    this.naturalSexoRadio = {

      m: false,
      f: false
    };

    this.naturalSexoCheck = {

      m: 'iradio_flat-green',
      f: 'iradio_flat-green'
    };

    this.tableItems = [];

    this.editarAseguradoVa = undefined;

    this.auxAsegurado = {};

    this.auxAsegurados = [];

    this.auxIdentificacion = undefined;

    this.bankAccountTypes = ['Ahorro', 'Corriente'];

    this.ListaCorreos = [];

    this.correo = undefined;

    /********************************************************************************************
    **                                      F U N C T I O N S                                  **
    ********************************************************************************************/

    this.setObjectElems = function (obj, option) {
      angular.forEach(obj, function (value, key) {
        obj[key] = option;
      });
    };

    /********************************************************************************************
    **                                       S E R V I C E S                                   **
    ********************************************************************************************/
    this.consultarAseguradoServices = function (view) {
      console.log('consultarAseguradoServices..');
      var params = {
        id: 0
      };

      aseguradoServices.consultarAsegurados(params)
        .success(function (data) {
          console.log(data);
          self.tableItems = [];

          /*          if (data.length == 0) {
                      new PNotify({
                        title: '¡Alerta!',
                        text: 'Disculpe. Aún no hay Asegurados registrados.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                      });
                    }*/

          for (var i = 0; i < data.length; i++) {
            console.log(data[i].estatus);
            switch (data[i].inEstatus) {
              case 1:
                data[i].inEstatus = 'Activo';
                break;
              case 0:
                data[i].inEstatus = 'Inactivo';
                break;
              default:
                break;
            };
            /*            switch (data[i].txNacionalidad) {
                          case 'N':
                            data[i].txNacionalidad = 'Nacional';
                            break;
                          case 'E':
                            data[i].txNacionalidad = 'Extranjero';
                            break;
                        };*/

            if (data[i].diHabitacion == 'N/A') {
              data[i].diHabitacion = undefined;
            }
            if (data[i].txCorreo == null || data[i].txCorreo == undefined) {
              data[i].txCorreo = 'N/A';
            }

            if (data[i].diOficina == 'N/A') {
              data[i].diOficina = undefined;
            }

            if (data[i].nuTelefonoOficina == 'N/A') {
              data[i].nuTelefonoOficina = undefined;
            }

            if (data[i].nuTelefonoHabitacion == 'N/A') {
              data[i].nuTelefonoHabitacion = undefined;
            }


            //self.auxIdentificacion = data[i].txNacionalidad + data[i].nuCedulaRif;

            self.tableItems.push({
              tipo: '',//data[i].inTipoPersona,
              txNacionalidad: data[i].inTipoPersona,
              estatus: data[i].inEstatus,
              sexo: data[i].inSexo,
              nombre: data[i].nbPrimerNombre +" " + data[i].nbPrimerApellido,
              identificacion: data[i].nuCedulaRif,
              //  txNacionalidad: 'Nacional',//como se tratan la cedulas en la base de datos
              fechaNacimiento: data[i].feNacimiento,
              fechaConstitucion: data[i].feConstitucion,
              fechaInicio: data[i].feInicio,
              estadoCivil: data[i].txEstadoCivil,
              telefono: data[i].nuCelular,
              correo: data[i].txCorreo,
              localidad: data[i].diLocalidad,
              direccionHabitacion: data[i].diHabitacion,
              telefonoHabitacion: data[i].nuTelefonoHabitacion,
              direccionOficina: data[i].diOficina,
              telefonoOficina: data[i].nuTelefonoOficina,
              profesion: data[i].nbProfesion,
              ocupacion: data[i].nbOcupacion,
              ingresos: data[i].txIngresos, //parseInt(data[i].ingresos),
              pagina: data[i].txPaginaWeb,
              facebook: data[i].txFacebook,
              instagram: data[i].txInstagram,
              twitter: data[i].txTwitter,
              otro: data[i].txOtros,
              ListaCorreos: [],
              txCorreoOpcional1: data[i].txCorreoOpcional1,
              txCorreoOpcional2: data[i].txCorreoOpcional2,
              txCorreoOpcional3: data[i].txCorreoOpcional3
            });

            if (data[i].txCorreoOpcional1 != '' && data[i].txCorreoOpcional1 != null) {
              self.tableItems[i].ListaCorreos.push({
                correo: data[i].txCorreoOpcional1,
                id: 0
              });
            }
            if (data[i].txCorreoOpcional2 != '' && data[i].txCorreoOpcional2 != null) {
              self.tableItems[i].ListaCorreos.push({
                correo: data[i].txCorreoOpcional2,
                id: 0
              });
            }
            if (data[i].txCorreoOpcional3 != '' && data[i].txCorreoOpcional3 != null) {
              self.tableItems[i].ListaCorreos.push({
                correo: data[i].txCorreoOpcional3,
                id: 0
              });
            }
            switch (self.tableItems[i].txNacionalidad) {
              case "E":
                self.tableItems[i].tipo = 'Extranjero';
                break;
              case "G":
                self.tableItems[i].tipo = 'Gubernamental';
                break;
              case "J":
                self.tableItems[i].tipo = 'Juridico';
                break;
              case "V":
                self.tableItems[i].tipo = 'Venezolano';
                break;
              case "A":
                  self.tableItems[i].tipo = 'Pasaporte';
                  break;
            };


            // if (self.tableItems[i].identificacion.search('V-') != -1) {
            //   self.tableItems[i].txNacionalidad = 'V-'
            // }
            // if (self.tableItems[i].identificacion.search('E-') != -1) {
            //   self.tableItems[i].txNacionalidad = 'E-'
            // }
            // if (self.tableItems[i].identificacion.search('J-') != -1) {
            //   self.tableItems[i].txNacionalidad = 'J-'
            // }
            // if (self.tableItems[i].identificacion.search('G-') != -1) {
            //   self.tableItems[i].txNacionalidad = 'G-'
            // }
            // if (self.tableItems[i].identificacion.search('N-') != -1) {
            //   self.tableItems[i].txNacionalidad = 'N-'
            // }
          }
          console.log(self.tableItems);
          data = undefined;

          self.setObjectElems(self.formularioAsegurado, undefined);
          self.setObjectElems(self.formularioAseguradoNatural, undefined);
          self.setObjectElems(self.formularioAseguradoJuridico, undefined);
          self.setObjectElems(self.editarAseguradoVa, undefined);
          self.naturalSexoCheck.f = 'iradio_flat-green ';
          self.naturalSexoCheck.m = 'iradio_flat-green';
          self.ListaCorreos = [];
          document.getElementById("correoElectronicoNatural").value = "";
          document.getElementById("agregarAseguradoCorreoElectronico").value = "";
          $('#correoElectronicoNatural').closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
          self.viewsController(view);

          if (!$.fn.DataTable.isDataTable('#tablaConsultarAsegurados')) {
            self.createTable();
          } else {
            self.destroyTable();
          }

          // self.viewsController('listarcoberturas');

        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          console.log('Error..');
          self.viewsController(view);

          if (!$.fn.DataTable.isDataTable('#tablaConsultarAsegurados')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        });
    };

    this.agregarAseguradoService = function (option) {

      var params = {};
      params.rifEmpresa = "";

      switch (option) {
        case 'agregar':
          params = JSON.parse(JSON.stringify(self.auxAsegurado));
          params.cedulaRif = '';

          console.log(params);

          if(params.fechaNacimiento != null){
            params.fechaNacimiento = mainServices.revertDate( params.fechaNacimiento);
          }
          if(params.tipo == "J"){
            if(params.fechaConstitucion != null && params.fechaInicio != null){
            params.fechaConstitucion = mainServices.revertDate( params.fechaConstitucion);
            params.fechaInicio = mainServices.revertDate( params.fechaInicio);
            }
          }

          console.log('antes del servicio');
          aseguradoServices.agregarAsegurado(params)
            .success(function (data) {
              console.log(data);

              if (data.codigo = 200) {

                switch (option) {
                  case 'agregar':
                    new PNotify({
                      title: 'Asegurado creado!',
                      text: 'El Asegurado fue creado con éxito.',
                      type: 'success',
                      styling: 'bootstrap3',
                      cornerclass: 'ui-pnotify-sharp'
                    });
                    break;
                };

                self.consultarAseguradoServices('listarAsegurados');
                self.naturalSexoSwitch("m");
                self.naturalJuridicoSwitch('Natural');
                self.setObjectElems(self.formularioAsegurado, undefined);
                self.setObjectElems(self.formularioAseguradoNatural, undefined);
                self.setObjectElems(self.formularioAseguradoJuridico, undefined);
                //self.setObjectElems(self.editarAseguradoVa, undefined);
              } else {

                switch (option) {
                  case 'agregar':
                    new PNotify({
                      title: '¡Error!',
                      text: 'Hubo un error al momento de crear el asegurado.',
                      type: 'error',
                      styling: 'bootstrap3',
                      cornerclass: 'ui-pnotify-sharp'
                    });
                    break;
                };

              }
            })
            .error(function (data, status, headers, config) {

              new PNotify({
                title: '¡Error!',
                text: data.mensaje,
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            });

          break;

        case 'editar':

          params = JSON.parse(JSON.stringify(self.editarAseguradoVa));
          params.estatus = true;
          params.ingresos = params.ingresos.toString();
          params.identificacion = self.editarAseguradoVa.txNacionalidad + '-' + self.editarAseguradoVa.identificacion;
          if(params.fechaNacimiento != null){
            params.fechaNacimiento = mainServices.revertDate( params.fechaNacimiento);
          }
          if(params.tipo == "J"){
            if(params.fechaConstitucion != null && params.fechaInicio != null){
            params.fechaConstitucion = mainServices.revertDate( params.fechaConstitucion);
            params.fechaInicio = mainServices.revertDate( params.fechaInicio);
            }
          }

          if (self.naturalSexoRadio.m)
          { params.sexo = "M"; }
          else if (self.naturalSexoRadio.f)
            params.sexo = "F";


          if (params.tipo == 'Natural')
          { params.tipo = "N"; }
          else if (params.tipo == 'Juridico')
          { params.tipo = "J"; }



          if (self.editarAseguradoVa.estatus == 'Activo')
          { params.estatus = 1; }
          else if (self.editarAseguradoVa.estatus == 'Inactivo')
          { params.estatus = 0; }

          aseguradoServices.editarAsegurado(params)
            .success(function (data) {
              console.log(data);

              if (data.codigo = 200) {

                switch (option) {

                  case 'editar':
                    new PNotify({
                      title: 'Asegurado Editado!',
                      text: 'El Asegurado fue editado con éxito.',
                      type: 'success',
                      styling: 'bootstrap3',
                      cornerclass: 'ui-pnotify-sharp'
                    });
                    break;
                };

                self.consultarAseguradoServices('listarAsegurados');
                self.naturalSexoSwitch("m");
                self.naturalJuridicoSwitch('Natural');
                self.setObjectElems(self.editarAseguradoVa, undefined);
                self.viewsController('listarAsegurados');
                if (!$.fn.DataTable.isDataTable('#tablaConsultarAsegurados')) {
                  self.createTable();
                } else {
                  self.destroyTable();
                }
              } else {

                switch (option) {
                  case 'editar':
                    new PNotify({
                      title: '¡Error!',
                      text: 'Hubo un error al momento de editar el asegurado.',
                      type: 'error',
                      styling: 'bootstrap3',
                      cornerclass: 'ui-pnotify-sharp'
                    });
                    break;
                };

              }
            })
            .error(function (data, status, headers, config) {

              new PNotify({
                title: '¡Error!',
                text: data.mensaje,
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            });
          break;
      }

      console.log('Despues del servicio');
    };

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'verAsegurado':
          self.views.verAsegurado = true;
          console.log('viewsController > verAsegurado');
          break;
        case 'agregarAsegurado':
          self.setObjectElems(self.formularioAsegurado, undefined);
          self.setObjectElems(self.formularioAseguradoNatural, undefined);
          self.setObjectElems(self.formularioAseguradoJuridico, undefined);
          self.views.agregarAsegurado = true;
          console.log('viewsController > agregarAsegurado');
          break;
        case 'editarAsegurado':
          self.views.editarAsegurado = true;
          console.log('viewsController > editarAsegurado');
          break;
        case 'listarAsegurados':
          self.views.listarAsegurados = true;
          console.log('viewsController > listarAsegurados');
          break;
        case 'cagarAsegurados':
          self.views.cagarAsegurados = true;
          console.log('viewsController > cagarAsegurados');
          break;
        default:
          break;
      }
    };

    this.naturalJuridicoSwitch = function (tipoDePersona) {
      self.setObjectElems(self.formularioAsegurado, undefined);
      self.setObjectElems(self.formularioAseguradoNatural, undefined);
      self.setObjectElems(self.formularioAseguradoJuridico, undefined);
      //self.setObjectElems(self.editarAseguradoVa, undefined);
      switch (tipoDePersona) {
        case 'Natural':
          self.setObjectElems(self.naturalJuridicoRadio, false);
          self.naturalJuridicoRadio.natural = true;
          self.naturalJuridicoCheck.natural = 'iradio_flat-green checked';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green';
          console.log('** on naturalJuridicoSwitch. > natural **');
          break;
        case 'Juridico':
          self.setObjectElems(self.naturalJuridicoRadio, false);
          self.naturalJuridicoRadio.juridico = true;
          self.naturalJuridicoCheck.natural = 'iradio_flat-green';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green checked';
          console.log('** on naturalJuridicoSwitch. > juridico **');
          break;
      }
    };

    this.naturalSexoSwitch = function (sexo) {
      console.log('** on naturalSexoSwitch.. **');
      switch (sexo) {
        case 'm':
          //self.setObjectElems(self.naturalSexoRadio, false);
          self.naturalSexoRadio.m = true;
          self.naturalSexoRadio.f = false;
          self.naturalSexoCheck.m = 'iradio_flat-green checked';
          self.naturalSexoCheck.f = 'iradio_flat-green';
          console.log('** on naturalSexoSwitch. > m **');
          break;
        case 'f':
          //self.setObjectElems(self.naturalJuridicoRadio, false);
          self.naturalSexoRadio.f = true;
          self.naturalSexoRadio.m = false;
          self.naturalSexoCheck.f = 'iradio_flat-green checked';
          self.naturalSexoCheck.m = 'iradio_flat-green';
          console.log('** on naturalSexoSwitch. > f **');
          break;
        default:
          break;
      }
    };

    this.tipoCedulaSwitch = function () {

      if (self.views.editarAsegurado) {
        switch (self.editarAseguradoVa.txNacionalidad) {
          case 'Nacional':
            if (self.editarAseguradoVa.identificacion) {
              if (isNaN(self.editarAseguradoVa.identificacion[0]) && isNaN(self.editarAseguradoVa.identificacion[1])) {
                console.log('on Nacional');
                self.editarAseguradoVa.identificacion = self.editarAseguradoVa.identificacion.substring(2, self.editarAseguradoVa.identificacion.length);
              };
              self.editarAseguradoVa.identificacion = 'V-' + self.editarAseguradoVa.identificacion;
            }
            break;
          case 'Extranjero':
            if (self.editarAseguradoVa.identificacion) {
              if (isNaN(self.editarAseguradoVa.identificacion[0]) && isNaN(self.editarAseguradoVa.identificacion[1])) {
                console.log('on Extranjero');
                self.editarAseguradoVa.identificacion = self.editarAseguradoVa.identificacion.substring(2, self.editarAseguradoVa.identificacion.length);
              };
              self.editarAseguradoVa.identificacion = 'E-' + self.editarAseguradoVa.identificacion;
            }
            break;
          default:
            break;
        }
      }
      if (self.views.agregarAsegurado) {
        console.log("me llamaron");
        switch (self.formularioAseguradoNatural.txNacionalidad) {
          case 'Nacional':
            if (self.formularioAseguradoNatural.identificacion) {
              if (isNaN(self.formularioAseguradoNatural.identificacion[0]) && isNaN(self.formularioAseguradoNatural.identificacion[1])) {
                console.log('on Nacional');
                self.formularioAseguradoNatural.identificacion = self.formularioAseguradoNatural.identificacion.substring(2, self.formularioAseguradoNatural.identificacion.length);
              };
              self.formularioAseguradoNatural.identificacion = 'V-' + self.formularioAseguradoNatural.identificacion;
            }
            break;
          case 'Extranjero':
            if (self.formularioAseguradoNatural.identificacion) {
              if (isNaN(self.formularioAseguradoNatural.identificacion[0]) && isNaN(self.formularioAseguradoNatural.identificacion[1])) {
                console.log('on Extranjero');
                self.formularioAseguradoNatural.identificacion = self.formularioAseguradoNatural.identificacion.substring(2, self.formularioAseguradoNatural.identificacion.length);
              };
              self.formularioAseguradoNatural.identificacion = 'E-' + self.formularioAseguradoNatural.identificacion;
            }
            break;
          default:
            break;
        }
      }
    }

    this.funcasd = function () {
      var validatorResult = undefined;
      if (self.naturalJuridicoRadio.natural) {

        validatorResult = validator.checkAll($('#aseguradoNaturalForm'));
        if (validatorResult) {

          var identificacionExistente = false, correoExistente = false;

          for (var i = 0; i < self.tableItems.length; i++) {

            if (self.formularioAseguradoNatural.txNacionalidad.substring(0, 1)+'-'+self.formularioAseguradoNatural.identificacion == self.tableItems[i].identificacion ) {

              identificacionExistente = true;
              console.log('Identificación Existente');
              break;
            } /*else if (self.tableItems[i].correo == self.formularioAseguradoNatural.correo && self.formularioAseguradoNatural.correo !="" ) {

              correoExistente = true;
              console.log('Correo Existente');
              break;
            }*/
          }
        }
      }
      else if (self.naturalJuridicoRadio.juridico) {

        validatorResult = validator.checkAll($('#aseguradoJuridicoForm'));
        if (validatorResult) {

          var identificacionExistente = false, correoExistente = false;

          for (var i = 0; i < self.tableItems.length; i++) {
            if (self.formularioAseguradoNatural.txNacionalidad.substring(0, 1)+'-'+self.formularioAseguradoJuridico.rif == self.tableItems[i].identificacion ){
              identificacionExistente = true;
              console.log('Identificación Existente');
              break;
            } /*else if (self.tableItems[i].correo == self.formularioAseguradoJuridico.correo && self.formularioAseguradoJuridico.correo !="") {

              correoExistente = true;
              console.log('Correo Existente');
              break;
            }*/
          }
        }
      }

      if (validatorResult) {
        if (identificacionExistente) {
          new PNotify({
            title: '¡Error!',
            text: 'La identificación del asegurado ya se encuentra registrada.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (correoExistente) {
          new PNotify({
            title: '¡Error!',
            text: 'El correo del asegurado ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else {
          //******************
          //Se puede reducir eliminando formularioAseguradoNatural y formularioAseguradoJuridico por un unico formato
          //*****************
          //------------------------------CAMBAIAR
          console.log(self.ListaCorreos);
          if (self.ListaCorreos.length == 1)
            self.auxAsegurado.correosOpcional1 = self.ListaCorreos[0].correo;

          if (self.ListaCorreos.length == 2){
              self.auxAsegurado.correosOpcional1 = self.ListaCorreos[0].correo;
              self.auxAsegurado.correosOpcional2 = self.ListaCorreos[1].correo;
          }

          if (self.ListaCorreos.length == 3){
              self.auxAsegurado.correosOpcional1 = self.ListaCorreos[0].correo;
              self.auxAsegurado.correosOpcional2 = self.ListaCorreos[1].correo;
              self.auxAsegurado.correosOpcional3 = self.ListaCorreos[2].correo;
          }
          //------------------------------CAMBAIAR
          if (self.naturalJuridicoRadio.natural) {

            if (self.naturalSexoRadio.m) {
              self.auxAsegurado.sexo = 'M';
            } else if (self.naturalSexoRadio.f) {
              self.auxAsegurado.sexo = 'F';
            }

            self.auxAsegurado.tipo = "N";
            self.auxAsegurado.id = 0;
            self.auxAsegurado.estatus = 1;//Cambiar

            self.auxAsegurado.nombre = self.formularioAseguradoNatural.nombreCompleto;
            self.auxAsegurado.txNacionalidad = self.formularioAseguradoNatural.txNacionalidad.substring(0, 1);//Cambiar
            self.auxAsegurado.identificacion = self.auxAsegurado.txNacionalidad + '-' + self.formularioAseguradoNatural.identificacion;
            self.auxAsegurado.fechaConstitucion = null;
            self.auxAsegurado.fechaInicio = null;


            if (self.formularioAseguradoNatural.localidad)
              self.auxAsegurado.localidad = self.formularioAseguradoNatural.localidad;
            else
              self.auxAsegurado.localidad = null;

            if (self.formularioAseguradoNatural.correo)
              self.auxAsegurado.correo = document.getElementById("correoElectronicoNatural").value;
            else
              self.auxAsegurado.correo = null;

            if (self.formularioAseguradoNatural.telefono)
              self.auxAsegurado.telefono = self.formularioAseguradoNatural.telefono;
            else
              self.auxAsegurado.telefono = null;


            if (self.formularioAseguradoNatural.fechaNacimiento)
              self.auxAsegurado.fechaNacimiento = self.formularioAseguradoNatural.fechaNacimiento;
            else
              self.auxAsegurado.fechaNacimiento = null;

            if (self.formularioAseguradoNatural.estadoCivil)
              self.auxAsegurado.estadoCivil = self.formularioAseguradoNatural.estadoCivil;
            else
              self.auxAsegurado.estadoCivil = null;


            if (self.formularioAsegurado.direccionHabitacion)
              self.auxAsegurado.direccionHabitacion = self.formularioAsegurado.direccionHabitacion;
            else
              self.auxAsegurado.direccionHabitacion = "N/A";

            if (self.formularioAsegurado.telefonoHabitacion)
              self.auxAsegurado.telefonoHabitacion = self.formularioAsegurado.telefonoHabitacion;
            else
              self.auxAsegurado.telefonoHabitacion = "N/A";


            if (self.formularioAsegurado.direccionOficina)
              self.auxAsegurado.direccionOficina = self.formularioAsegurado.direccionOficina;
            else
              self.auxAsegurado.direccionOficina = "N/A";

            if (self.formularioAsegurado.telefonoOficina)
              self.auxAsegurado.telefonoOficina = self.formularioAsegurado.telefonoOficina;
            else
              self.auxAsegurado.telefonoOficina = "N/A";

            if (self.formularioAsegurado.profesion)
              self.auxAsegurado.profesion = self.formularioAsegurado.profesion;
            else
              self.auxAsegurado.profesion = '';

            if (self.formularioAsegurado.ocupacion)
              self.auxAsegurado.ocupacion = self.formularioAsegurado.ocupacion;
            else
              self.auxAsegurado.ocupacion = '';

            if (self.formularioAsegurado.ingresos && self.formularioAsegurado.ingresos != "0")
              self.auxAsegurado.ingresos = self.formularioAsegurado.ingresos.toString();
            else
              self.auxAsegurado.ingresos = "0";

            if (self.formularioAsegurado.pagina)
              self.auxAsegurado.pagina = self.formularioAsegurado.pagina;
            else
              self.auxAsegurado.pagina = '';

            if (self.formularioAsegurado.facebook)
              self.auxAsegurado.facebook = self.formularioAsegurado.facebook;
            else
              self.auxAsegurado.facebook = '';

            if (self.formularioAsegurado.instagram)
              self.auxAsegurado.instagram = self.formularioAsegurado.instagram;
            else
              self.auxAsegurado.instagram = '';

            if (self.formularioAsegurado.twitter)
              self.auxAsegurado.twitter = self.formularioAsegurado.twitter;
            else
              self.auxAsegurado.twitter = '';

            if (self.formularioAsegurado.otro)
              self.auxAsegurado.instagram = self.formularioAsegurado.otro;
            else
              self.auxAsegurado.otro = '';



            console.log(self.auxAsegurado);
            self.agregarAseguradoService('agregar');
          }
          else if (self.naturalJuridicoRadio.juridico) {



            self.auxAsegurado.tipo = "J";
            self.auxAsegurado.estatus = 1;//Cambiar
            self.auxAsegurado.sexo = null;

            self.auxAsegurado.nombre = self.formularioAseguradoJuridico.empresa;
            self.auxAsegurado.txNacionalidad = self.formularioAseguradoNatural.txNacionalidad.substring(0, 1);
            self.auxAsegurado.identificacion = self.auxAsegurado.txNacionalidad + '-' + self.formularioAseguradoJuridico.rif;
            self.auxAsegurado.fechaNacimiento = null;//cambiar
            self.formularioAseguradoJuridico.correo = document.getElementById("correoElectronicoJuridico").value;
            self.auxAsegurado.estadoCivil = "N/A";
            self.auxAsegurado.telefono = "N/A";

            if (self.formularioAseguradoJuridico.localidad)
              self.auxAsegurado.localidad = self.formularioAseguradoJuridico.localidad;
            else
              self.auxAsegurado.localidad = null;

            if (self.formularioAseguradoJuridico.correo)
              self.auxAsegurado.correo = document.getElementById("correoElectronicoJuridico").value;//self.formularioAseguradoJuridico.correo;
            else
              self.auxAsegurado.correo = null;


            if (self.formularioAseguradoJuridico.fechaInicio)
              self.auxAsegurado.fechaInicio = self.formularioAseguradoJuridico.fechaInicio;
            else
              self.auxAsegurado.fechaInicio = null;


            if (self.formularioAseguradoJuridico.fechaConstitucion)
              self.auxAsegurado.fechaConstitucion = self.formularioAseguradoJuridico.fechaConstitucion;
            else
              self.auxAsegurado.fechaConstitucion = null;


            if (self.formularioAsegurado.direccionHabitacion)
              self.auxAsegurado.direccionHabitacion = self.formularioAsegurado.direccionHabitacion;
            else
              self.auxAsegurado.direccionHabitacion = "N/A";

            if (self.formularioAsegurado.telefonoHabitacion)
              self.auxAsegurado.telefonoHabitacion = self.formularioAsegurado.telefonoHabitacion;
            else
              self.auxAsegurado.telefonoHabitacion = "N/A";


            if (self.formularioAsegurado.direccionOficina)
              self.auxAsegurado.direccionOficina = self.formularioAsegurado.direccionOficina;
            else
              self.auxAsegurado.direccionOficina = "N/A";

            if (self.formularioAsegurado.telefonoOficina)
              self.auxAsegurado.telefonoOficina = self.formularioAsegurado.telefonoOficina;
            else
              self.auxAsegurado.telefonoOficina = "N/A";

            if (self.formularioAsegurado.profesion)
              self.auxAsegurado.profesion = self.formularioAsegurado.profesion;
            else
              self.auxAsegurado.profesion = '';

            if (self.formularioAsegurado.ocupacion)
              self.auxAsegurado.ocupacion = self.formularioAsegurado.ocupacion;
            else
              self.auxAsegurado.ocupacion = '';

            if (self.formularioAsegurado.ingresos && self.auxAsegurado.ingresos != "0")
              self.auxAsegurado.ingresos = self.formularioAsegurado.ingresos.toString();
            else
              self.auxAsegurado.ingresos = "0";

            if (self.formularioAsegurado.pagina)
              self.auxAsegurado.pagina = self.formularioAsegurado.pagina;
            else
              self.auxAsegurado.pagina = '';

            if (self.formularioAsegurado.facebook)
              self.auxAsegurado.facebook = self.formularioAsegurado.facebook;
            else
              self.auxAsegurado.facebook = '';

            if (self.formularioAsegurado.instagram)
              self.auxAsegurado.instagram = self.formularioAsegurado.instagram;
            else
              self.auxAsegurado.instagram = '';

            if (self.formularioAsegurado.twitter)
              self.auxAsegurado.twitter = self.formularioAsegurado.twitter;
            else
              self.auxAsegurado.twitter = '';

            if (self.formularioAsegurado.otro)
              self.auxAsegurado.instagram = self.formularioAsegurado.otro;
            else
              self.auxAsegurado.otro = '';

            self.agregarAseguradoService('agregar');

          }


        }
      } else {
        var datosGenerales = $('#aseguradoDatosGenerales'),
          vistaDireccion = $('#aseguradoDireccion'),
          vistaEconomicos = $('#aseguradoDatosEconomicos'),
          vistaElectronicos = $('#aseguradoDatosElectronicos');
        if (!datosGenerales.hasClass('in')) {
          console.log(' no abierto 1 valido');
          datosGenerales.collapse('show');
          if (vistaDireccion.hasClass('in'))
          { vistaDireccion.collapse('hide'); console.log(' no abierto 2 valido'); }
          if (vistaEconomicos.hasClass('in'))
          { vistaEconomicos.collapse('hide'); console.log(' no abierto 3 valido'); }
          if (vistaElectronicos.hasClass('in'))
          { vistaElectronicos.collapse('hide'); console.log(' no abierto 3 valido'); }

        }
      }
    };

    this.validateEmail=function(sEmail){
       var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
       if (filter.test(sEmail)) {
        return true;
        }else {
        return false;
        }

    }

    this.funcasd2 = function () {
      var validatorResult = undefined;
      if (self.naturalJuridicoRadio.natural) {

        validatorResult = validator.checkAll($('#EditarAseguradoNaturalForm'));
        console.log("entre");
        if (validatorResult) {

          var identificacionExistente = false, correoExistente = false;

          for (var i = 0; i < self.tableItems.length; i++) {

/*            if (self.tableItems[i].identificacion == self.editarAseguradoVa.identificacion && self.tableItems[i].tipo == self.editarAseguradoVa.tipo) {

              identificacionExistente = true;
              console.log('Identificación Existente');
              break;
            }*/
            if (self.tableItems[i].correo == self.editarAseguradoVa.correo) {

              //correoExistente = true;
              console.log('Correo Existente');
              break;
            }
          }
        }
      }
      else if (self.naturalJuridicoRadio.juridico) {

        validatorResult = validator.checkAll($('#EditarAseguradoJuridicoForm'));
        if (validatorResult) {

          var identificacionExistente = false, correoExistente = false;

          for (var i = 0; i < self.tableItems.length; i++) {

            if (self.tableItems[i].identificacion == self.editarAseguradoVa.identificacion && self.tableItems[i].id != self.editarAseguradoVa.id) {

              //identificacionExistente = true;
              console.log('Identificación Existente');
              break;
            }
            if (self.tableItems[i].correo == self.editarAseguradoVa.correo && self.tableItems[i].id != self.editarAseguradoVa.id) {

              //correoExistente = true;
              console.log('Correo Existente');
              break;
            }

          }
        }
      }

      if (validatorResult) {
        if (identificacionExistente) {
          new PNotify({
            title: '¡Error!',
            text: 'La identificación del asegurado ya se encuentra registrada.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (correoExistente) {
          new PNotify({
            title: '¡Error!',
            text: 'El correo electronico del asegurado ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else {
          //------------------------------CAMBAIAR
          if (self.editarAseguradoVa.ListaCorreos.length == 0) {
            self.editarAseguradoVa.txCorreoOpcional1 = '';
            self.editarAseguradoVa.txCorreoOpcional2 = '';
            self.editarAseguradoVa.txCorreoOpcional3 = '';
          } else if (self.editarAseguradoVa.ListaCorreos.length == 1) {
            self.editarAseguradoVa.txCorreoOpcional1 = self.editarAseguradoVa.ListaCorreos[0].correo;
            self.editarAseguradoVa.txCorreoOpcional2 = '';
            self.editarAseguradoVa.txCorreoOpcional3 = '';
          } else if (self.editarAseguradoVa.ListaCorreos.length == 2) {
            self.editarAseguradoVa.txCorreoOpcional1 = self.editarAseguradoVa.ListaCorreos[0].correo;
            self.editarAseguradoVa.txCorreoOpcional2 = self.editarAseguradoVa.ListaCorreos[1].correo;
            self.editarAseguradoVa.txCorreoOpcional3 = '';
          } else if (self.editarAseguradoVa.ListaCorreos.length == 3) {
            self.editarAseguradoVa.txCorreoOpcional1 = self.editarAseguradoVa.ListaCorreos[0].correo;
            self.editarAseguradoVa.txCorreoOpcional2 = self.editarAseguradoVa.ListaCorreos[1].correo;
            self.editarAseguradoVa.txCorreoOpcional3 = self.editarAseguradoVa.ListaCorreos[2].correo;
          }
          //------------------------------CAMBAIAR
          if (self.naturalJuridicoRadio.natural) {

            self.editarAseguradoVa.txNacionalidad = self.editarAseguradoVa.txNacionalidad.substring(0, 1);

            console.log(self.naturalSexoRadio);

            if (self.naturalSexoRadio.m) {
              self.auxAsegurado.sexo = 'M';
            } else if (self.naturalSexoRadio.f) {
              self.auxAsegurado.sexo = 'F';
            }


            self.editarAseguradoVa.fechaConstitucion = "2017-05-23";
            self.editarAseguradoVa.fechaInicio = "2017-05-23";


            if (self.editarAseguradoVa.estadoCivil == 'Seleccione..' || self.editarAseguradoVa.direccionHabitacion == '')
              self.editarAseguradoVa.estadoCivil = null;

            if (self.editarAseguradoVa.direccionHabitacion == null || self.editarAseguradoVa.direccionHabitacion == undefined)
              self.editarAseguradoVa.direccionHabitacion = "N/A";

            if (self.editarAseguradoVa.telefonoHabitacion == null || self.editarAseguradoVa.telefonoHabitacion == undefined)
              self.editarAseguradoVa.telefonoHabitacion = "N/A";

            if (self.editarAseguradoVa.direccionOficina == null || self.editarAseguradoVa.direccionOficina == undefined)
              self.editarAseguradoVa.direccionOficina = "N/A";

            if (self.editarAseguradoVa.telefonoOficina == null || self.editarAseguradoVa.telefonoOficina == undefined)
              self.editarAseguradoVa.telefonoOficina = "N/A";

            if (self.editarAseguradoVa.profesion == null || self.editarAseguradoVa.profesion == undefined)
              self.editarAseguradoVa.profesion = '';

            if (self.editarAseguradoVa.ocupacion == null || self.editarAseguradoVa.ocupacion == undefined)
              self.editarAseguradoVa.ocupacion = '';

            if (self.editarAseguradoVa.ingresos == null || self.editarAseguradoVa.ingresos != 0)
              self.editarAseguradoVa.ingresos = "0";

            if (self.editarAseguradoVa.pagina == null)
              self.editarAseguradoVa.pagina = '';

            if (self.editarAseguradoVa.facebook == null)
              self.editarAseguradoVa.facebook = '';

            if (self.editarAseguradoVa.instagram == null)
              self.editarAseguradoVa.instagram = '';

            if (self.editarAseguradoVa.twitter == null)
              self.editarAseguradoVa.twitter = '';

            if (self.editarAseguradoVa.otro == null)
              self.editarAseguradoVa.otro = '';

            console.log(self.editarAseguradoVa);
            self.agregarAseguradoService('editar');
          }
          else if (self.naturalJuridicoRadio.juridico) {

            self.editarAseguradoVa.txNacionalidad = self.editarAseguradoVa.txNacionalidad.substring(0, 1);
            self.editarAseguradoVa.fechaNacimiento = "2017-05-23";//cambiar
            self.editarAseguradoVa.estadoCivil = "N/A";
            self.editarAseguradoVa.telefono = "N/A";

            if (self.editarAseguradoVa.direccionHabitacion == null || self.editarAseguradoVa.direccionHabitacion == undefined)
              self.editarAseguradoVa.direccionHabitacion = "N/A";

            if (self.editarAseguradoVa.telefonoHabitacion == null || self.editarAseguradoVa.telefonoHabitacion == undefined)
              self.editarAseguradoVa.telefonoHabitacion = "N/A";

            if (self.editarAseguradoVa.direccionOficina == null || self.editarAseguradoVa.direccionOficina == undefined)
              self.editarAseguradoVa.direccionOficina = "N/A";

            if (self.editarAseguradoVa.telefonoOficina == null || self.editarAseguradoVa.telefonoOficina == undefined)
              self.editarAseguradoVa.telefonoOficina = "N/A";

            if (self.editarAseguradoVa.profesion == null || self.editarAseguradoVa.profesion == undefined)
              self.editarAseguradoVa.profesion = '';

            if (self.editarAseguradoVa.ocupacion == null || self.editarAseguradoVa.ocupacion == undefined)
              self.editarAseguradoVa.ocupacion = '';

            if (self.editarAseguradoVa.ingresos == null || self.editarAseguradoVa.ingresos != "0")
              self.editarAseguradoVa.ingresos = "0";

            if (self.editarAseguradoVa.pagina == null)
              self.editarAseguradoVa.pagina = '';

            if (self.editarAseguradoVa.facebook == null)
              self.editarAseguradoVa.facebook = '';

            if (self.editarAseguradoVa.instagram == null)
              self.editarAseguradoVa.instagram = '';

            if (self.editarAseguradoVa.twitter == null)
              self.editarAseguradoVa.twitter = '';

            if (self.editarAseguradoVa.otro == null)
              self.editarAseguradoVa.otro = '';


            self.agregarAseguradoService('editar');

          }
        }
      } else {
        var datosGenerales = $('#aseguradoEditarDatosGenerales'),
          vistaDireccion = $('#aseguradoEditarDireccion'),
          vistaEconomicos = $('#aseguradoEditarDatosEconomicos'),
          vistaElectronicos = $('#aseguradoEditarDatosElectronicos');
        if (!datosGenerales.hasClass('in')) {
          console.log(' no abierto 1 valido');
          datosGenerales.collapse('show');
          if (vistaDireccion.hasClass('in'))
          { vistaDireccion.collapse('hide'); console.log(' no abierto 2 valido'); }
          if (vistaEconomicos.hasClass('in'))
          { vistaEconomicos.collapse('hide'); console.log(' no abierto 3 valido'); }
          if (vistaElectronicos.hasClass('in'))
          { vistaElectronicos.collapse('hide'); console.log(' no abierto 3 valido'); }

        }
      }
    };

    this.ver = function () {

      $('.verAseguradoModal').modal({
        show: 'true'
      });
    }

    this.editar = function () {
      if (self.editarAseguradoVa.sexo == 'M')
        self.naturalSexoSwitch('m');
      else if (self.editarAseguradoVa.sexo == 'F')
        self.naturalSexoSwitch('f');


      console.log(self.editarAseguradoVa);
      this.viewsController('editarAsegurado');
    };

    this.eliminar = function (tablaItem) {

      this.eliminarAsegurado.nombre = tablaItem.nombre;
      this.aux = this.tableItems.indexOf(tablaItem);
      self.views.editarAsegurado = false;
    }

    this.eliminarModal = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarMonedas').DataTable().row('.choosed').remove().draw(false);

          self.tableItems = self.tableItems.splice(self.aux, 1);

          new PNotify({
            title: '¡Asegurado eliminado!',
            text: 'El asegurado fue eliminado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.viewsController('listarAsegurados');
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.cancelar = function () {
      //if (self.views.agregarAsegurado) {
      self.setObjectElems(self.formularioAsegurado, undefined);
      self.setObjectElems(self.formularioAseguradoNatural, undefined);
      self.setObjectElems(self.formularioAseguradoJuridico, undefined);
      self.setObjectElems(self.editarAseguradoVa, undefined);
      self.naturalSexoCheck.f = 'iradio_flat-green ';
      self.naturalSexoCheck.m = 'iradio_flat-green';
      document.getElementById("correoElectronicoNatural").value = "";
      document.getElementById("agregarAseguradoCorreoElectronico").value = "";
      document.getElementById("correoElectronicoJuridico").value = "";
      self.viewsController('listarAsegurados');
      //self.setObjectElems(self.editarAseguradoVa, undefined);
      /*        var datosGenerales = $('#aseguradoDatosGenerales'),
                vistaDireccion = $('#aseguradoDireccion'),
                vistaEconomicos = $('#aseguradoDatosEconomicos'),
                vistaElectronicos = $('#aseguradoDatosElectronicos');
              if (!datosGenerales.hasClass('in')) {
                console.log(' no abierto 1 valido');
                datosGenerales.collapse('show');
                if (vistaDireccion.hasClass('in'))
                { vistaDireccion.collapse('hide'); console.log(' no abierto 2 valido'); }
                if (vistaEconomicos.hasClass('in'))
                { vistaEconomicos.collapse('hide'); console.log(' no abierto 3 valido'); }
                if (vistaElectronicos.hasClass('in'))
                { vistaElectronicos.collapse('hide'); console.log(' no abierto 3 valido'); }

              }*/
      // }
    };

    this.agregarCorreo = function () {

      if (self.views.agregarAsegurado) {
        var validatorResult = validator.checkAll($('#formularioAgregarAseguradoCorreoElectronico'));
        var exitCorreo = false;

        if (document.getElementById("agregarAseguradoCorreoElectronico").value != '')
          self.correo = document.getElementById("agregarAseguradoCorreoElectronico").value;

        if (self.correo == document.getElementById("correoElectronicoNatural").value || self.correo == document.getElementById("correoElectronicoJuridico").value)
          exitCorreo = true;

        if (self.ListaCorreos.length < 3) {
          for (var i = 0; i < self.ListaCorreos.length; i++) {
            if (self.ListaCorreos[i].correo == self.correo || self.correo == document.getElementById("correoElectronicoNatural").value || self.correo == document.getElementById("correoElectronicoJuridico").value) {
              exitCorreo = true;
              console.log('existe');
            }
          }
          if (exitCorreo || !validatorResult) {
            if (validatorResult) {
              new PNotify({
                title: '¡Error!',
                text: 'el correo del asegurado ya se encuentra registrado.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
          } else {
            var aux = JSON.parse(JSON.stringify(self.correo));
            self.ListaCorreos.push({
              correo: aux,
              id: 0
            });
            self.correo = undefined;
            document.getElementById("agregarAseguradoCorreoElectronico").value = '';

          }
        } else {
          new PNotify({
            title: '¡Error!',
            text: 'Limite de correos superado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }
      }
      if (self.views.editarAsegurado) {
        var validatorResult = validator.checkAll($('#editarFormularioAseguradoCorreoElectronico'));
        var exitCorreo = false;

        if (document.getElementById("agregarAseguradoCorreoElectronico").value != '')
          self.correo = document.getElementById("agregarAseguradoCorreoElectronico").value;

        if (self.correo == document.getElementById("correoElectronicoNatural2").value || self.correo == document.getElementById("correoElectronicoJuridico2").value)
          exitCorreo = true;

        if (self.editarAseguradoVa.ListaCorreos.length < 3) {
          for (var i = 0; i < self.ListaCorreos.length; i++) {
            if (self.editarAseguradoVa.ListaCorreos[i].correo == self.correo || self.correo == document.getElementById("correoElectronicoNatural2").value || self.correo == document.getElementById("correoElectronicoJuridico2").value) {
              exitCorreo = true;
              console.log('existe');
            }
          }
          if (exitCorreo || !validatorResult) {
            if (validatorResult) {
              new PNotify({
                title: '¡Error!',
                text: 'el correo del asegurado ya se encuentra registrado.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
          } else {
            var aux = JSON.parse(JSON.stringify(self.correo));
            self.editarAseguradoVa.ListaCorreos.push({
              correo: aux,
              id: 0
            });
            self.correo = undefined;
            document.getElementById("agregarAseguradoCorreoElectronico").value = '';
          }
        } else {
          new PNotify({
            title: '¡Error!',
            text: 'Limite de correos superado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }
      }
    };

    this.editarCorreo = function (elemt) {
      if (self.views.agregarAsegurado) {
        var a = self.ListaCorreos.indexOf(elemt);
        if(self.correo != undefined){
          self.ListaCorreos.push({
            correo:self.correo,
            id:0
          });
        }
        self.correo = self.ListaCorreos[a].correo;
        self.ListaCorreos.splice(a, 1);
      }
      if (self.views.editarAsegurado) {
        var a = self.editarAseguradoVa.ListaCorreos.indexOf(elemt);
        if(self.correo != undefined){
          self.editarAseguradoVa.ListaCorreos.push({
            correo:self.correo,
            id:0
          });
        }
        self.correo = self.editarAseguradoVa.ListaCorreos[a].correo;
        this.editarAseguradoVa.ListaCorreos.splice(a, 1);
      }
    };

    this.eliminarCorreo = function (elemt) {
      if (self.views.agregarAsegurado) {
        var a = self.ListaCorreos.indexOf(elemt);
        this.ListaCorreos.splice(a, 1);
      }
      if (self.views.editarAsegurado) {
        var a = self.editarAseguradoVa.ListaCorreos.indexOf(elemt);
        this.editarAseguradoVa.ListaCorreos.splice(a, 1);
      }
    };

    this.beforeRenderConstitucion = function ($dates) {
      /* disable future dates */
      for(var i=0; i<$dates.length;i++) {
        if(new Date().getTime() < $dates[i].utcDateValue) {
            $dates[i].selectable = false;
        }
      }
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarAsegurado', function () {
      self.consultarAseguradoServices('agregarAsegurado');
    });

    $rootScope.$on('editarAsegurado', function () {
      self.viewsController('editarAsegurado');
    });

    $rootScope.$on('listarAsegurados', function () {
      self.consultarAseguradoServices('listarAsegurados');
    });

    $rootScope.$on('cagarAsegurados', function () {
      self.viewsController('cagarAsegurados');
    });

    // this.setFirstAccordion = function(){
    //   console.log('** on setFirstAccordion function. **');
    //   $('#aseguradoDatosGeneralesHeading').click();
    // }

    // validator.message['date'] = 'not a real date';
    $('#aseguradoRIF').on('blur', null, validator.checkField);
    $('#nombreNatural').on('blur', null, validator.checkField);
    $('#identificacionNatural').on('blur', null, validator.checkField);
    $('#fechaNacimientoNatural').on('blur', null, validator.checkField);
    $('#estadoCivilNatural').on('blur', null, validator.checkField);
    $('#telefonoNatural').on('blur', null, validator.checkField);
    $('#correoElectronicoNatural').on('blur', null, validator.checkField);
    $('#localidadNatural').on('blur', null, validator.checkField);
    $('#correoElectronicoNatural').on('blur',function(){
      var sEmail = $('#correoElectronicoNatural').val();
       if ($.trim(sEmail).length == 0) {
         new PNotify({
           title: '¡Error!',
           text: 'Insertar un correo valido.',
           type: 'error',
           styling: 'bootstrap3',
           cornerclass: 'ui-pnotify-sharp'
         });
           e.preventDefault();
       }
       if (!self.validateEmail(sEmail))  {
         new PNotify({
           title: '¡Error!',
           text: 'Formato de direccion de correo inválida.',
           type: 'error',
           styling: 'bootstrap3',
           cornerclass: 'ui-pnotify-sharp'
         });
           e.preventDefault();
       }

    });

    $('#empresaJuridico').on('blur', null, validator.checkField);
    $('#rifJuridico').on('blur', null, validator.checkField);
    $('#fechaConstitucionJuridico').on('blur', null, validator.checkField);
    $('#fechaInicioJuridico').on('blur', null, validator.checkField);
    $('#correoElectronicoJuridico').on('blur', null, validator.checkField);
    $('#localidadJuridico').on('blur', null, validator.checkField);


    $('#nombreNatural2').on('blur', null, validator.checkField);
    $('#identificacionNatural2').on('blur', null, validator.checkField);
    $('#fechaNacimientoNatural2').on('blur', null, validator.checkField);
    $('#estadoCivilNatural2').on('blur', null, validator.checkField);
    $('#telefonoNatural2').on('blur', null, validator.checkField);
    $('#correoElectronicoNatural2').on('blur', null, validator.checkField);
    $('#localidadNatural2').on('blur', null, validator.checkField);

    $('#empresaJuridico2').on('blur', null, validator.checkField);
    $('#rifJuridico2').on('blur', null, validator.checkField);
    $('#fechaConstitucionJuridico2').on('blur', null, validator.checkField);
    $('#fechaInicioJuridico2').on('blur', null, validator.checkField);
    $('#correoElectronicoJuridico2').on('blur', null, validator.checkField);
    $('#localidadJuridico2').on('blur', null, validator.checkField);

    $('#tablaConsultarAsegurados tbody').on('click', 'tr', function () {
      $('#tablaConsultarAsegurados').DataTable().$('tr.choosed').removeClass('choosed');
      $(this).addClass('choosed');
    });

    this.destroyTable = function () {
      $('#tablaConsultarAsegurados').dataTable().fnDestroy();
      $('#tablaConsultarAsegurados tbody').off('click');
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTable = function () {

			var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verAsegurado cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editAsego' && permisos[i].inEstatus == 1){
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
				acciones = '<td style="text-align: center;">\
                                <a class="verAsegurado cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarAsegurado cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}

      $('#tablaConsultarAsegurados').DataTable({
        data: self.tableItems,
        aoColumns: [
          { 'data': 'nombre', sDefaultContent: '' },
          { 'data': 'identificacion', sDefaultContent: '' },
          { 'data': 'estatus', sDefaultContent: '' },
          {
            'defaultContent': acciones
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });
      $('#tablaConsultarAsegurados tbody').on('click', '.verAsegurado', function () {
        var modalAseg = $('#tablaConsultarAsegurados').DataTable().row($(this).parents('tr')).data();
        self.aseguradoModal = JSON.parse(JSON.stringify(modalAseg));

        console.log(self.aseguradoModal);

        // if (self.aseguradoModal.tipo == 'Natural') {
        //
        //   self.naturalJuridicoRadio.natural = true;
        //   self.naturalJuridicoRadio.juridico = false;
        // }
        // else if (self.aseguradoModal.tipo == 'Juridico') {
        //
        //   self.naturalJuridicoRadio.natural = false;
        //   self.naturalJuridicoRadio.juridico = true;
        // }

        if (self.aseguradoModal.tipo == 'Extranjero' || self.aseguradoModal.tipo == 'Venezolano'|| self.aseguradoModal.tipo == 'Pasaporte') {

          self.naturalJuridicoRadio.natural = true;
          self.naturalJuridicoRadio.juridico = false;
        }
        else if (self.aseguradoModal.tipo == 'Juridico' || self.aseguradoModal.tipo == 'Gubernamental') {

          self.naturalJuridicoRadio.natural = false;
          self.naturalJuridicoRadio.juridico = true;
        }

        $('.activarModalAsegurado').click();
      });

      $('#tablaConsultarAsegurados tbody').on('click', '.editarAsegurado', function () {
        var editAseg = $('#tablaConsultarAsegurados').DataTable().row($(this).parents('tr')).data();
        self.editarAseguradoVa = JSON.parse(JSON.stringify(editAseg));
        console.log(self.editarAseguradoVa);

        self.editarAseguradoVa.identificacion = self.editarAseguradoVa.identificacion.substring(2, self.editarAseguradoVa.identificacion.length);
        //var aux = parseInt(self.editarAseguradoVa.ingresos);

        //self.editarAseguradoVa.ingresos = aux;

        self.setObjectElems(self.naturalJuridicoRadio, false);

        if (self.editarAseguradoVa.tipo == 'Extranjero' || self.editarAseguradoVa.tipo == 'Venezolano'||self.editarAseguradoVa.tipo=='Pasaporte') {

          self.naturalJuridicoRadio.natural = true;

          self.naturalJuridicoCheck.natural = 'iradio_flat-green checked';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green';
          document.getElementById('JuridicoCheck').setAttribute('disabled', 'disabled');
          document.getElementById('naturalCheck').removeAttribute('disabled');

          if (self.editarAseguradoVa.tipo == 'Extranjero') {
            self.editarAseguradoVa.txNacionalidad = 'E-';
          } else if (self.editarAseguradoVa.tipo == 'Venezolano') {
            self.editarAseguradoVa.txNacionalidad = 'V-';
          }else if (self.editarAseguradoVa.tipo == 'Pasaporte') {
            self.editarAseguradoVa.txNacionalidad = 'A-';
          }

        }
        else if (self.editarAseguradoVa.tipo == 'Juridico' || self.editarAseguradoVa.tipo == 'Gubernamental') {
          self.naturalJuridicoRadio.juridico = true;
          self.naturalJuridicoCheck.natural = 'iradio_flat-green';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green checked';
          document.getElementById('naturalCheck').setAttribute('disabled', 'disabled');
          document.getElementById('JuridicoCheck').removeAttribute('disabled');

          if (self.editarAseguradoVa.tipo == 'Juridico') {
            self.editarAseguradoVa.txNacionalidad = 'J-';
          } else if (self.editarAseguradoVa.tipo == 'Gubernamental') {
            self.editarAseguradoVa.txNacionalidad = 'G-';
          }
        }
        console.log(self.editarAseguradoVa);

        $('.activarEditarAsegurado').click();
      });
      /*  	$('#tablaConsultarAsegurados tbody').on( 'click', '.eliminarRamo', function () {
              var data = $('#tablaConsultarAsegurados').DataTable().row( $(this).parents('tr') ).data();
              //self.nombreEliminarBanco = data.nombre;
              self.editarAseguradoVa = data;
              console.log(data);
            //  var spanBancoModalText = data.nombre;
              $("#spanRamoModal").text( data.nombre );
              $('.eliminarRamoModal').modal({
                show: 'true'
              });

            });

             $('#tablaConsultarAsegurados tbody').on( 'click', 'tr', function () {
              $('#tablaConsultarAsegurados').DataTable().$('tr.choosed').removeClass('choosed');
              $(this).addClass('choosed');
            });  */
    };

    this.cambiarFecha = function (id) {
      console.log(id);
      $('#' + id).closest('.item')
        .removeClass('bad')
        .find('.alert').remove();
    };


    $('.asegurado.collapse-link').on('click', function () {

      var $BOX_PANEL = $(this).closest('.x_panel'),
        $ICON = $(this).find('i'),
        $BOX_CONTENT = $BOX_PANEL.find('.x_content');

      // fix for some div with hardcoded fix class
      if ($BOX_PANEL.attr('style')) {
        $BOX_CONTENT.slideToggle(200, function () {
          $BOX_PANEL.removeAttr('style');
        });
      } else {
        $BOX_CONTENT.slideToggle(200);
        $BOX_PANEL.css('height', 'auto');
      }

      $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    document.getElementById("ingresosAsegurado").onblur = function () {
      this.value = parseFloat(this.value.replace(/,/g, ""))
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


  }]);

})();
