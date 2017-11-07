(function () {

  'use strict';

  var usuarioController = angular.module('DGBOSS.usuarioController', ['DGBOSS.mainServices', 'DGBOSS.usuarioServices', 'DGBOSS.rolesServices']);

  usuarioController.controller('usuarioController', ['$scope', '$rootScope', 'mainServices', 'usuarioServices', 'rolesServices', function ($scope, $rootScope, mainServices, usuarioServices, rolesServices) {

    var self = this;

    console.log('usuarioController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the login view. }
    */
    this.views = {
      editProfile: false,
      agregarUsuario: false,
      listarUsuarios: false,
      editarUsuario: false,
      verUsuario: false
    };

    this.nuevoUsuario = {
      primerNombre: undefined,
      segundoNombre: undefined,
      primerApellido: undefined,
      segundoApellido: undefined,
      sexo: undefined,
      tipoPersona: undefined,
      cedulaRif: undefined,
      rifEmpresa: undefined,
      fechaNacimiento: undefined,
      telefonoCelular: undefined,
      direccionHabitacion: undefined,
      telefonoHabitacion: undefined,
      direccionLocalidad: undefined,
      telefonoFiscal: undefined,
      direccionFiscal: undefined,
      numeroCredencial: undefined,
      fechaCredencial: undefined,
      administrador: undefined,
      productor: undefined,
      rol: undefined,
      usuario: undefined,
      clave: undefined,
      confirmarClave: undefined,
      correoElectronico: undefined,
      estatus: undefined
    };

    this.editarUsuario = {
      id: undefined,
      nombreCompleto: undefined,
      documento: undefined,
      cedulaRif: undefined,
      tipoPersona: undefined,
      telefonoCelular: undefined,
      telefonoFiscal: undefined,
      telefonoHabitacion: undefined,
      fechaNacimiento: undefined,
      direccionHabitacion: undefined,
      direccionLocalidad: undefined,
      administrador: false,
      productor: false,
      numeroCredencial: undefined,
      fechaCredencial: undefined,
      direccionFiscal: undefined,
      rol: undefined,
      usuario: undefined,
      clave: undefined,
      confirmarClave: undefined,
      correoElectronico: undefined
    };

    this.tiposPersona = [
      { codigo: 'E', nombre: 'E-' },
      { codigo: 'G', nombre: 'G-' },
      { codigo: 'J', nombre: 'J-' },
      // { codigo: 'N', nombre: 'N-' },
      { codigo: 'V', nombre: 'V-' }
    ];
    this.roles = [
		// { codigo: 'ANA', nombre : 'Analista' }, 
		// { codigo: 'CLI', nombre : 'Cliente' }, 
		// { codigo: 'EX', nombre : 'Ejecutivo de Cuenta' }
	];
    this.auxClave = undefined;
    this.auxClaveConfirmar = undefined;

    this.usuarios = [
      // { nombreCompleto: 'Fabian Celis', usuario: 'fcelis', correoElectronico: 'fabiancelis@grupodigifarm.com', tipoUsuario: 'Productor', editar: false },
      // { nombreCompleto: 'Yennifer Grau', usuario: 'ygrau', correoElectronico: 'yennifergrau@grupodigifarm.com', tipoUsuario: 'Asegurado', editar: false },
      // { nombreCompleto: 'Jean Freitas', usuario: 'jfreitas', correoElectronico: 'jeanfreitas@grupodigifarm.com', tipoUsuario: 'Productor', editar: false },
      // { nombreCompleto: 'Joshua Guerra', usuario: 'jguerra', correoElectronico: 'joshuaguerra@grupodigifarm.com', tipoUsuario: 'Asegurado', editar: false },
      // { nombreCompleto: 'Georman Calderon', usuario: 'gcalderon', correoElectronico: 'geormancalderon@grupodigifarm.com', tipoUsuario: 'Tipo nº4', editar: false },
      // { nombreCompleto: 'Domingo Rondon', usuario: 'drondon', correoElectronico: 'domingorondon@grupodigifarm.com', tipoUsuario: 'Tipo nº4', editar: false },
      // { nombreCompleto: 'Ciret Martinez', usuario: 'cmartinez', correoElectronico: 'ciretmartinez@grupodigifarm.com', tipoUsuario: 'Tipo nº4', editar: false },
      // { nombreCompleto: 'Marlyn', usuario: 'marlyng', correoElectronico: 'marlyng@grupodigifarm.com', tipoUsuario: 'Tipo nº5', editar: false },
      // { nombreCompleto: 'Yenni Delgado', usuario: 'ydelgado', correoElectronico: 'yennidelgado@grupodigifarm.com', tipoUsuario: 'Tipo nº5', editar: false },
      // { nombreCompleto: 'Juan Figueira', usuario: 'jfigueira', correoElectronico: 'juanfigueira@grupodigifarm.com', tipoUsuario: 'Tipo nº5', editar: false }
    ];

    this.usuarioModal = undefined;
    this.usuarioBackUp = undefined;
    this.eliminarUsuario = undefined;

    //TODOs
    self.mask  //mascara para imputs de RIFs
    this.documento = undefined;
    this.tiposDocumento = ['Nacional', 'Extranjero', 'RIF'];

    this.checkboxClass = {
      administrador: undefined,
      productor: undefined
    };

    this.sexoRadioClass = {
      masculino: 'iradio_flat-green checked',
      femenino: 'iradio_flat-green'
    };

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

    this.consultarUsuarioService = function (value) {
      var params = {
        nbUsuarioApp : ""
      };

      usuarioServices.consultarUsuarios(params)
        .success(function (data) {
          console.log(data);
          self.usuarios = [];

          if (data.length == 0 && value == 'consultar') {
            new PNotify({
              title: '¡Alerta!',
              text: 'Disculpe. Aún no hay usuarios registrados.',
              type: 'notice',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }

          for (var i = 0; i < data.length; i++) {

            // switch(data[i].txNacionalidad){
            //   case 'N':
            //     data[i].txNacionalidad = 'Nacional';
            //     break;
            //   case 'E':
            //     data[i].txNacionalidad = 'Extranjero';
            //     break;
            //   default:
            //     break;
            // };

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

            data[i].tipoRol = 'Normal';

            switch (data[i].inProductor) {
              case 1:
                data[i].inProductor = true;
                data[i].tipoRol = 'Productor';
                break;
              case 0:
                data[i].inProductor = false;
                break;
              default:
                break;
            };

            switch (data[i].inAdministrador) {
              case 1:
                data[i].inAdministrador = true;
                data[i].tipoRol = 'Administrador';
                break;
              case 0:
                data[i].inAdministrador = false;
                break;
              default:
                break;
            };



            if(!data[i].nbSegundoNombre)
              data[i].nbSegundoNombre = 'N/A';
            if(!data[i].nbPrimerApellido)
              data[i].nbPrimerApellido = 'N/A';
            if(!data[i].nbSegundoApellido)
              data[i].nbSegundoApellido = 'N/A';
            if(!data[i].nuCelular)
              data[i].nuCelular = 'N/A';
            if(!data[i].diLocalidad)
              data[i].diLocalidad = 'N/A';
            if(!data[i].diHabitacion)
              data[i].diHabitacion = 'N/A';
            if(!data[i].nuTelefonoHabitacion)
              data[i].nuTelefonoHabitacion = 'N/A';

            self.usuarios.push({
              primerNombre: data[i].nbPrimerNombre,
              segundoNombre: data[i].nbSegundoNombre,
              primerApellido: data[i].nbPrimerApellido,
              segundoApellido: data[i].nbSegundoApellido,
              nombre: data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido,
              sexo: data[i].inSexo,
              tipo:'',
              tipoPersona: data[i].inTipoPersona,
              cedulaRif: data[i].nuCedulaRif,
              rifEmpresa: data[i].nuRifEmpresa,
              fechaNacimiento: mainServices.revertDate(data[i].feNacimiento),
              telefonoCelular: data[i].nuCelular,
              direccionHabitacion: data[i].diHabitacion,
              telefonoHabitacion: data[i].nuTelefonoHabitacion,
              direccionLocalidad: data[i].diLocalidad,
              telefonoFiscal: data[i].nuTelefonoFiscal,
              direccionFiscal: data[i].diFiscal,
              numeroCredencial: data[i].nuCredencial,
              fechaCredencial: data[i].feCredencial,
              administrador: data[i].inAdministrador,
              productor: data[i].inProductor,
              estatus: data[i].inEstatus,
              rol: data[i].coRol,
              tipoRol: data[i].tipoRol,
              usuario: data[i].nbUsuarioApp,
              clave: data[i].txClave,
              confirmarClave: data[i].txClave,
              correoElectronico: data[i].txCorreo
            });
            // switch (self.usuarios[i].rol) {
            //   case 'ADM':
            //     self.usuarios[i].tipoRol = 'Administrador';
            //     break;
            //   default:
            //     self.usuarios[i].tipoRol = 'Normal';
            //     break;
            // }
            switch (self.usuarios[i].tipoPersona) {
              case 'E':
                self.usuarios[i].tipo = 'Extranjero';
                break;
              case 'G':
                self.usuarios[i].tipo = 'Gubernamental';
                break;
              case 'J':
                self.usuarios[i].tipo =  'Jurídico';
                break;
              case 'V':
                self.usuarios[i].tipo =  'Venezolano';
                break;
              default:
                break;
            };
          };

          switch (value) {
            case 'agregar':
              self.consultarRolesService();
              break;

            case 'consultar':
              self.consultarRolesService('editar');
              break;

            default:
              break;
          }

        })
        .error(function (data, status, headers, config) {

          switch (value) {
            case 'agregar':
              self.viewsController('agregarUsuario');
              break;

            case 'consultar':
              if (!$.fn.DataTable.isDataTable('#tablaConsultarBancos')) {
                self.createTable();
              } else {
                self.destroyTable();
              }

              self.viewsController('listarUsuarios');
              break;
          };
        });
    };



    this.agregarUsuarioService = function () {

      console.log(self.nuevoUsuario);

      var params = JSON.parse(JSON.stringify(self.nuevoUsuario));

      switch (self.nuevoUsuario.estatus) {
        case "Activo":
          params.estatus = 1;
          break;
        case "Inactivo":
          params.estatus = 0;
          break;
      };

      if (self.nuevoUsuario.productor)
        params.productor = 1;
      else
        params.productor = 0;

      if (self.nuevoUsuario.administrador)
        params.administrador = 1;
      else
        params.administrador = 0;

      switch (self.nuevoUsuario.tipoPersona) {
        case 'E-':
          params.tipoPersona = 'E';
          break;
        case 'G-':
          params.tipoPersona = 'G';
          break;
        case 'J-':
          params.tipoPersona = 'J';
          break;
        case 'N-':
          params.tipoPersona = 'N';
          break;
        case 'V-':
          params.tipoPersona = 'V';
          break;
        default:
          break;
      };
      params.cedulaRif =  params.tipoPersona+'-'+params.cedulaRif;
      params.rifEmpresa = mainServices.getRifEmpresa();
      console.log('parámetros de usuario..');
      console.log(params);
      params.fechaNacimiento = mainServices.revertDate(self.nuevoUsuario.fechaNacimiento);

      usuarioServices.agregarUsuario(params)
        .success(function (data) {

          if (self.views.agregarUsuario) {
            new PNotify({
              title: '¡Usuario creado!',
              text: 'El usuario ' + self.nuevoUsuario.usuario + ' fue creado con éxito.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
            self.cancelar('agregar');//No importa lo q se pase, limpia formularios
            self.consultarUsuarioService('consultar');
          }

          if (self.views.editarUsuario) {
            new PNotify({
              title: '¡Usuario editado!',
              text: 'El usuario ' + self.nuevoUsuario.usuario + ' fue editado con éxito.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
            self.cancelar('agregar');//No importa lo q se pase, limpia formularios
            self.consultarUsuarioService('consultar');
          }


        })
        .error(function (data, status, headers, config) {
          new PNotify({
            title: '¡Error!',
            text: 'Hubo un error al momento de crear el usuario.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
    };

    this.consultarRolesService = function(option){
	    console.log('consultarRolesService..');

			var params = {
				codigo: '',
        rifEmpresa: mainServices.getRifEmpresa()
			};
		
			rolesServices.consultarRoles(params)
				.success(function(data){
					console.log('success on consultar..');
					console.log(data);
					self.roles = [];

					for(var i = 0; i < data.length; i ++){
            console.log('asd');
						switch(data[i].inEstatus){
							case 0:
								data[i].inEstatus = 'Inactivo';
								break;
							
							case 1:
								data[i].inEstatus = 'Activo';
								break;
							
							default:
								break;
            }

						self.roles.push({
              codigo: data[i].coRol,
              nombre: data[i].nbRol,
              descripcion: data[i].txDescripcion,
              estatus: data[i].inEstatus,
              default: data[i].default,
              permisologia: [],
            });
            
          };
          
          if(option == 'editar'){
              if (!$.fn.DataTable.isDataTable('#tablaConsultarUsuarios')) {
                self.createTable();
              } else {
                self.destroyTable();
              }
              self.viewsController('listarUsuarios');
          } else {
            self.viewsController('agregarUsuario');
          }


				})
				.error(function(data, status, headers, config){
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            console.log('Error..');
            new PNotify({
              title: '¡Error!',
              text: 'Hubo un error en el sistema.',
              type: 'error',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
				});
    };

    this.getUserInfoService = function(){
      var params = {
        nbUsuarioApp: mainServices.getUser()
      };

      usuarioServices.consultarUsuarios(params)
        .success(function (data) {
          console.log(data);

          self.editarPerfil = {
            primerNombre: data[0].nbPrimerNombre,
            segundoNombre: data[0].nbSegundoNombre,
            primerApellido: data[0].nbPrimerApellido,
            segundoApellido: data[0].nbSegundoApellido,
            nombre: data[0].nbPrimerNombre + ' ' + data[0].nbPrimerApellido,
            sexo: data[0].inSexo,
            tipo: '',
            tipoPersona: data[0].inTipoPersona,
            cedulaRif: data[0].nuCedulaRif,
            rifEmpresa: data[0].nuRifEmpresa,
            fechaNacimiento: data[0].feNacimiento,
            telefonoCelular: data[0].nuCelular,
            direccionHabitacion: data[0].diHabitacion,
            telefonoHabitacion: data[0].nuTelefonoHabitacion,
            direccionLocalidad: data[0].diLocalidad,
            telefonoFiscal: data[0].nuTelefonoFiscal,
            direccionFiscal: data[0].diFiscal,
            numeroCredencial: data[0].nuCredencial,
            fechaCredencial: data[0].feCredencial,
            administrador: data[0].inAdministrador,
            productor: data[0].inProductor,
            estatus: data[0].inEstatus,
            rol: data[0].coRol,
            tipoRol:'',
            usuario: data[0].nbUsuarioApp,
            clave: undefined,
            confirmarClave: undefined,
            correoElectronico: data[0].txCorreo
          };

          self.viewsController('editProfile');

        })
        .error(function (data, status, headers, config) {

          $rootScope.$emit('redirectToMain');

          new PNotify({
            title: '¡Error!',
            text: 'No es posible editar su perfil en este momento.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
    };


    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      console.log(view);
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'login':
          self.views.login = true;
          break;
        case 'forgotPassword':
          self.views.forgotPassword = true;
          break;
        case 'editProfile':
          self.views.editProfile = true;
          console.log('viewsController > editProfile');
          break;
        case 'agregarUsuario':
          self.views.agregarUsuario = true;
          console.log('viewsController > agregarUsuario');
          break;
        case 'editarUsuario':
          self.views.editarUsuario = true;
          console.log('viewsController > editarUsuario');
          break;
        case 'listarUsuarios':
          self.views.listarUsuarios = true;
          console.log('viewsController > listarUsuarios');
          break;
        case 'verUsuario':
          self.views.verUsuario = true;
          console.log('viewsController > verUsuario');
          break;
        default:
          break;
      }
    };

    this.sexoSwitch = function (mode, value) {
      switch (mode) {

        case 'nuevo':
          switch (value) {

            case 'm':
              self.sexoRadioClass.masculino = 'iradio_flat-green checked';
              self.sexoRadioClass.femenino = 'iradio_flat-green';
              self.nuevoUsuario.sexo = 'M';
              break;

            case 'f':
              self.sexoRadioClass.masculino = 'iradio_flat-green';
              self.sexoRadioClass.femenino = 'iradio_flat-green checked';
              self.nuevoUsuario.sexo = 'F';
              break;

            default:
              break;
          }
          break;

        case 'editar':
          switch (value) {

            case 'M':
              self.sexoRadioClass.masculino = 'iradio_flat-green checked';
              self.sexoRadioClass.femenino = 'iradio_flat-green';
              self.editarUsuario.sexo = 'M';
              break;

            case 'F':
              self.sexoRadioClass.masculino = 'iradio_flat-green';
              self.sexoRadioClass.femenino = 'iradio_flat-green checked';
              self.editarUsuario.sexo = 'F';
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    };

    this.identificacionComboChange = function () {

      console.log(self.nuevoUsuario.tipoPersona);
      switch (self.nuevoUsuario.tipoPersona) {
        case 'V-':
          self.mask = '999999?9?9';
          break;
        case 'E-':
          self.mask = '999999?9?9';
          break;
        case 'J-':
          self.mask = '9999999?9?9';
          break;
        case 'G-':
          self.mask = '9999999?9?9';
          break;
        default:
          self.mask = '';
          break;
      };

    };

    this.agregarUsuario = function () {
      console.log('** on agregarUsuario function() **');

      if(self.views.editProfile){
        self.editProfile();
        return 0;
      }

      if(!self.nuevoUsuario.tipoPersona || !self.nuevoUsuario.cedulaRif){
        if(self.views.agregarUsuario){
          $('#formularioAgregarUsuarioTipoPersona').blur();
          return 0;
        }
      }else if(self.nuevoUsuario.sexo != 'M' && self.nuevoUsuario.sexo != 'F'){
        new PNotify({
          title: '¡Error!',
          text: 'Debe seleccionar el sexo del usuario.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });

        return 0;
      }

      
      // if (self.views.editarUsuario && (self.nuevoUsuario.clave == '' || self.nuevoUsuario.clave == undefined)) {
      //   self.nuevoUsuario.clave = self.auxClave;
      //   self.nuevoUsuario.confirmarClave = self.auxClaveConfirmar;
      //   document.getElementById("formularioAgregarUsuarioClave").value = self.auxClave;
      //   document.getElementById("formularioAgregarUsuarioConfirmarClave").value = self.auxClaveConfirmar;
      // }

      console.log(self.nuevoUsuario);
      if (self.nuevoUsuario.productor)
        var validatorResultProductor = validator.checkAll($('#formularioAgregarUsuarioDos'));

      var validatorResult = validator.checkAll($('#formularioAgregarUsuarioUno'));
      var validatorResult2 = validator.checkAll($('#formularioAgregarUsuarioTres'));
      var passwordValidator = self.nuevoUsuario.clave == self.nuevoUsuario.confirmarClave;

      console.log(validatorResult);
      console.log(validatorResult2);
      console.log('Productor');
      console.log(validatorResultProductor);

      if(self.views.editarUsuario && self.nuevoUsuario.usuario && !self.nuevoUsuario.clave && !self.nuevoUsuario.confirmarClave){
        validatorResult2 = true;
        self.nuevoUsuario.clave = '';
        self.nuevoUsuario.confirmarClave = '';
      };

      var noProductorValidator = !self.nuevoUsuario.productor && validatorResult && validatorResult2;
      var productorValidator = self.nuevoUsuario.productor && validatorResult && validatorResult2 && validatorResultProductor;

      if (noProductorValidator || productorValidator) {
        var usuarioExistente = false, correoExistente = false;

        for (var i = 0; i < self.usuarios.length; i++) {
          if (self.usuarios[i].usuario == self.nuevoUsuario.usuario) {
            usuarioExistente = true;
            console.log('Usuario Existente');
            break;
          } else if (self.usuarios[i].correoElectronico == self.nuevoUsuario.correoElectronico && self.nuevoUsuario.correoElectronico && self.nuevoUsuario.correoElectronico != '') {
            correoExistente = true;
            console.log('Correo Existente');
            break;
          }
        }

        if (usuarioExistente && !self.views.editarUsuario) {
          new PNotify({
            title: '¡Error!',
            text: 'El nombre de usuario ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (correoExistente && !self.views.editarUsuario) {
          new PNotify({
            title: '¡Error!',
            text: 'El correo electronico ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (!passwordValidator) {
          new PNotify({
            title: '¡Error!',
            text: 'Las contraseñas ingresadas no coinciden.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else {

          if (self.views.agregarUsuario) {

            self.nuevoUsuario.estatus = 1;
          }
          console.log(self.nuevoUsuario);
          if (self.nuevoUsuario.productor) { //Cambiar para q se manden esos datos

            if(!self.nuevoUsuario.direccionFiscal)
            {
                self.nuevoUsuario.direccionFiscal = '';
            }
            if(!self.nuevoUsuario.telefonoFiscal)
            {
                self.nuevoUsuario.telefonoFiscal = '';
            }
            if(!self.nuevoUsuario.direccionHabitacion)
            {
                self.nuevoUsuario.direccionHabitacion = '';
            }
            if(!self.nuevoUsuario.telefonoHabitacion)
            {
                self.nuevoUsuario.telefonoHabitacion = '';
            }
            if(!self.nuevoUsuario.fechaCredencial)
            {
                self.nuevoUsuario.fechaCredencial = undefined;
            }
            if(!self.nuevoUsuario.numeroCredencial)
            {
                self.nuevoUsuario.numeroCredencial = undefined;
            }
            if(!self.nuevoUsuario.telefonoCelular)
            {
                self.nuevoUsuario.telefonoCelular = '';
            }

          } else {

            self.nuevoUsuario.telefonoCelular = document.getElementById('formularioAgregarUsuarioTelefonoCelular').value;
          }

          self.agregarUsuarioService();

          // new PNotify({
          //   title: '¡Usuario creado!',
          //   text: 'El usuario fue creado con éxito.',
          //   type: 'success',
          //   styling: 'bootstrap3',
          //   cornerclass: 'ui-pnotify-sharp'
          // });

          // self.usuarios.push({
          //   nombreCompleto: self.nuevoUsuario.nombreCompleto,
          //   usuario: self.nuevoUsuario.usuario,
          //   correoElectronico: self.nuevoUsuario.correoElectronico,
          //   tipoUsuario: self.nuevoUsuario.tipoUsuario,
          //   editar: false
          // });

          // self.setObjectElems(self.nuevoUsuario, undefined);
          // console.log('success');
          //ERROR SERVICE
        };

      }
    };

    this.editarUsuario = function(){
       if (self.nuevoUsuario.productor)
        var validatorResultProductor = validator.checkAll($('#formularioAgregarUsuarioDos'));

      var validatorResult = validator.checkAll($('#formularioAgregarUsuarioUno'));
      var validatorResult2 = validator.checkAll($('#formularioAgregarUsuarioTres'));
      var passwordValidator = self.nuevoUsuario.clave == self.nuevoUsuario.confirmarClave;

      console.log(validatorResult);
      console.log(validatorResult2);
      console.log('Productor');
      console.log(validatorResultProductor);

      var noProductorValidator = !self.nuevoUsuario.productor && validatorResult && validatorResult2;
      var productorValidator = self.nuevoUsuario.productor && validatorResult && validatorResult2 && validatorResultProductor;

      if (noProductorValidator || productorValidator) {
        var usuarioExistente = false, correoExistente = false;

        for (var i = 0; i < self.usuarios.length; i++) {
          if (self.usuarios[i].usuario == self.nuevoUsuario.usuario) {
            usuarioExistente = true;
            console.log('Usuario Existente');
            break;
          } else if (self.usuarios[i].correoElectronico == self.nuevoUsuario.correoElectronico && self.nuevoUsuario.correoElectronico && self.nuevoUsuario.correoElectronico != '') {
            correoExistente = true;
            console.log('Correo Existente');
            break;
          }
        }

        if (usuarioExistente && !self.views.editarUsuario) {
          new PNotify({
            title: '¡Error!',
            text: 'El nombre de usuario ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (correoExistente && !self.views.editarUsuario) {
          new PNotify({
            title: '¡Error!',
            text: 'El correo electronico ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else if (!passwordValidator) {
          new PNotify({
            title: '¡Error!',
            text: 'Las contraseñas ingresadas no coinciden.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        } else {

          if (self.views.agregarUsuario) {

            self.nuevoUsuario.estatus = 1;
          }
          console.log(self.nuevoUsuario);
          if (self.nuevoUsuario.productor) { //Cambiar para q se manden esos datos

            if(!self.nuevoUsuario.direccionFiscal)
            {
                self.nuevoUsuario.direccionFiscal = '';
            }
            if(!self.nuevoUsuario.telefonoFiscal)
            {
                self.nuevoUsuario.telefonoFiscal = '';
            }
            if(!self.nuevoUsuario.direccionHabitacion)
            {
                self.nuevoUsuario.direccionHabitacion = '';
            }
            if(!self.nuevoUsuario.telefonoHabitacion)
            {
                self.nuevoUsuario.telefonoHabitacion = '';
            }
            if(!self.nuevoUsuario.fechaCredencial)
            {
                self.nuevoUsuario.fechaCredencial = undefined;
            }
            if(!self.nuevoUsuario.numeroCredencial)
            {
                self.nuevoUsuario.numeroCredencial = undefined;
            }
            if(!self.nuevoUsuario.telefonoCelular)
            {
                self.nuevoUsuario.telefonoCelular = '';
            }

          } else {

            self.nuevoUsuario.telefonoCelular = document.getElementById('formularioAgregarUsuarioTelefonoCelular').value;
          }

          self.agregarUsuarioService();
        };

      }
    };

    this.editProfile = function(){
      var params = {
        nbUsuarioApp: mainServices.getUser(),
        primerNombre: self.editarPerfil.primerNombre,
        segundoNombre: self.editarPerfil.segundoNombre,
        primerApellido: self.editarPerfil.primerApellido,
        segundoApellido: self.editarPerfil.segundoApellido,
        fechaNacimiento: self.editarPerfil.fechaNacimiento,
        correoElectronico: self.editarPerfil.correoElectronico,
        nuCedulaRif: self.editarPerfil.cedulaRif,
        clave: ''
      }

      if(self.editarPerfil.clave && self.editarPerfil.clave != ''){
        if(self.editarPerfil.clave != self.editarPerfil.confirmarClave){
          new PNotify({
            title: '¡Error!',
            text: 'Las contraseñas deben coincidir.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{
          params.clave = self.editarPerfil.clave;
        }
      }

      usuarioServices.editarPerfil(params)
        .success(function(data){
          console.log('on success', data);

          new PNotify({
            title: '¡Perfil editado!',
            text: 'El perfil de usuario fue editado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });

          $rootScope.$emit('toDashboard');
        })
        .error(function(data){
          console.log('on error: ', data);

          new PNotify({
            title: '¡Error!',
            text: 'No se pudo editar el perfil de usuario.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        })
    };

    this.verUsuario = function (usuario) {
      //self.usuarioModal = usuario;

      // console.log(self.roles);

      $('.verUsuarioModal').modal({
        show: 'true'
      });
    };

    this.cancelar = function (option) {

      if(self.views.editProfile){
        $rootScope.$emit('toDashboard');
        return 0;
      }

      if (self.views.editarUsuario)
        self.viewsController('listarUsuarios');

      self.sexoRadioClass.masculino = 'iradio_flat-green';
      self.sexoRadioClass.femenino = 'iradio_flat-green';
      self.mask = '';

      self.setObjectElems(self.nuevoUsuario, undefined);

      document.getElementById("formularioAgregarUsuarioTelefonoFiscal").value = "";
      document.getElementById("formularioAgregarUsuarioNumeroCredencial").value = "";
      document.getElementById("formularioAgregarUsuarioCorreoElectronico").value = "";
    };

    self.editarUsuarioFn = function (usuario) {

      console.log(usuario);

      switch (self.nuevoUsuario.tipoPersona) {
        case 'E':
          self.nuevoUsuario.tipoPersona = 'E-';
          break;
        case 'G':
          self.nuevoUsuario.tipoPersona = 'G-';
          break;
        case 'J':
          self.nuevoUsuario.tipoPersona = 'J-';
          break;
        case 'V':
          self.nuevoUsuario.tipoPersona = 'V-';
          break;
      };

      // switch (self.nuevoUsuario.rol) {
      //   case 'ADM':
      //       self.toggleCheck('administrador');
      //     break;
      //   default:
      //     break;
      // };

      // if(self.nuevoUsuario.administrador)
      //   self.toggleCheck('administrador');

      // if(self.nuevoUsuario.productor){
      //   self.toggleCheck('productor');
      // }
        

      console.log('el rol es: ', self.nuevoUsuario.rol);

      self.sexoSwitch('editar', self.nuevoUsuario.sexo);

      this.auxClave = JSON.parse(JSON.stringify(self.nuevoUsuario.clave));
      this.auxClaveConfirmar = JSON.parse(JSON.stringify(self.nuevoUsuario.confirmarClave));

      self.nuevoUsuario.clave = "";
      self.nuevoUsuario.confirmarClave = "";

      document.getElementById('formularioAgregarUsuarioTipoPersona').setAttribute('disabled', 'disabled');
      document.getElementById('formularioAgregarUsuarioCedulaRif').setAttribute('disabled', 'disabled');

      console.log('on editarUsuario function..');
      self.viewsController('editarUsuario');
    };

    self.guardarUsuario = function () {
      for (var i = 0; i < self.usuarios.length; i++) {
        if (self.usuarios[i].usuario == self.usuarioBackUp) {
          self.usuarios[i] = self.editarUsuario;
          self.usuarios[i].editar = false;
          break;
        }
      }

      //SUCCESS SERVICIO
      new PNotify({
        title: '¡Usuario editado!',
        text: 'El usuario fue editado con éxito.',
        type: 'success',
        styling: 'bootstrap3',
        cornerclass: 'ui-pnotify-sharp'
      });

      self.viewsController('listarUsuarios');
    };

    self.eliminarUsuarioFn = function (usuario) {
      self.nombreEliminarUsuario = usuario.usuario;
      self.eliminarUsuario = usuario;

      $('.eliminarUsuarioModal').modal({
        show: 'true'
      });
    };

    this.eliminarModal = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarUsuarios').DataTable().row('.choosed').remove().draw(false);
          for (var i = 0; i < self.usuarios.length; i++) {
            if (self.usuarios[i].usuario == self.eliminarUsuario.usuario) {
              self.usuarios[i].editar = false;
              self.usuarios.splice(i, 1);
              break;
            }
          }
          new PNotify({
            title: '¡Usuario eliminado!',
            text: 'El usuario fue eliminado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          console.log(self.bancos);
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.toggleCheck = function (option) {
      switch (option) {
        case 'administrador':
          self.nuevoUsuario.administrador = !self.nuevoUsuario.administrador;
          //self.nuevoUsuario.rol = 'ADM';

          if(self.nuevoUsuario.productor){
            self.nuevoUsuario.administrador = self.nuevoUsuario.productor;
            document.getElementById('formularioAgregarUsuarioRol').removeAttribute('required');
          }


          console.log(self.nuevoUsuario.administrador);
          break;

        case 'productor':
          self.nuevoUsuario.productor = !self.nuevoUsuario.productor;

          if(self.nuevoUsuario.administrador){
             //self.nuevoUsuario.rol = 'ADM';
             self.nuevoUsuario.administrador = self.nuevoUsuario.productor;
              document.getElementById('formularioAgregarUsuarioRol').removeAttribute('required');
            }else{
              //self.nuevoUsuario.rol = '';
              document.getElementById('formularioAgregarUsuarioRol').setAttribute('required', 'required');
            }

          console.log(self.nuevoUsuario.productor);
          break;

        default:
          break;
      };
    };

    this.destroyTable = function () {
      $('#tablaConsultarUsuarios').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.activar = function () {
      //Just to activate the module.
      console.log('activando financiadora..');
    };

    this.startDateBeforeRender = function($dates) {
      const todaySinceMidnight = new Date();
        todaySinceMidnight.setUTCHours(0,0,0,0);
        $dates.filter(function (date) {
          return date.utcDateValue >= todaySinceMidnight.getTime();
        }).forEach(function (date) {
          date.selectable = false;
        });
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/
    $rootScope.$on('agregarUsuarios', function () {
      self.cancelar('agregar');
      self.consultarUsuarioService('agregar');
      document.getElementById('formularioAgregarUsuarioTipoPersona').removeAttribute('disabled');
      document.getElementById('formularioAgregarUsuarioCedulaRif').removeAttribute('disabled');
      //$('#tablaConsultarUsuarios').DataTable().destroy();
    });

    $rootScope.$on('editProfile', function () {
      self.getUserInfoService();
      //self.viewsController('editProfile');
      //$('#tablaConsultarUsuarios').DataTable().destroy();
    });


    $rootScope.$on('listarUsuarios', function () {
      self.cancelar('agregar');
      self.consultarUsuarioService('consultar');
      //self.viewsController('listarUsuarios');
      //$('#tablaConsultarUsuarios').DataTable();
    });

    $('#formularioAgregarUsuarioPrimerNombre').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioPrimerApellido').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioTipoPersona').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioCedulaRif').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioRol').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioUsuario').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioClave').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioConfirmarClave').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioNumeroCredencial').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioFechaCredencial').on('blur', null, validator.checkField);

    // $('#formularioAgregarUsuarioTelefonoHabitacion').keyup(function() {
    //   $("#formularioAgregarUsuarioTelefonoHabitacion").val(this.value.match(/[0-9]*/));
    // });

    // $('#formularioAgregarUsuarioTelefonoCelular').keyup(function() {
    //   $("#formularioAgregarUsuarioTelefonoCelular").val(this.value.match(/[0-9]*/));
    // });

    // $('#formularioAgregarUsuarioTelefonoFiscal').keyup(function() {
    //   $("#formularioAgregarUsuarioTelefonoFiscal").val(this.value.match(/[0-9]*/));
    // });

    // $('#formularioAgregarUsuarioNumeroCredencial').keyup(function() {
    //   $("#formularioAgregarUsuarioNumeroCredencial").val(this.value.match(/[0-9]*/));
    //});



    this.createTable = function () {

      var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verUsuario cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editUser' && permisos[i].inEstatus == 1){
          console.log('asd');
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
        console.log('dsa');
				acciones = '<td style="text-align: center;">\
                                <a class="verUsuario cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarUsuario cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}

      $('#tablaConsultarUsuarios').DataTable({
        data: self.usuarios,
        aoColumns: [
          { 'mData': 'usuario', sDefaultContent: '' },
          { 'mData': 'rol', sDefaultContent: '' },
          { 'mData': 'tipoRol', sDefaultContent: '' },
          { 'mData': 'nombre', sDefaultContent: '' },
          { 'mData': 'cedulaRif', sDefaultContent: '' },
          { 'mData': 'estatus', sDefaultContent: '' },
          {
            'defaultContent': acciones
          }
        ],
        columnDefs: [
          { 'className': 'text-center', 'targets': '_all' }
        ]
      });

      $('#tablaConsultarUsuarios tbody').on('click', '.verUsuario', function () {
        self.usuarioModal = $('#tablaConsultarUsuarios').DataTable().row($(this).parents('tr')).data();
        console.log(self.usuarioModal);

        for(var i = 0; i < self.roles.length; i ++){
          if(self.roles[i].codigo == self.usuarioModal.rol){
            self.usuarioModal.rolNombre = self.roles[i].nombre;
            break;
          }
        }



        $('.activarUsuario').click();
        self.verUsuario(self.usuarioModal);
      });

      $('#tablaConsultarUsuarios tbody').on('click', '.editarUsuario', function () {
        console.log($('#tablaConsultarUsuarios').DataTable().row($(this).parents('tr')).data());
        var editData = JSON.parse(JSON.stringify($('#tablaConsultarUsuarios').DataTable().row($(this).parents('tr')).data()));
        self.nuevoUsuario = JSON.parse(JSON.stringify(editData));
        self.nuevoUsuario.rol = editData.rol;
        self.nuevoUsuario.cedulaRif = self.nuevoUsuario.cedulaRif.substring(2, self.nuevoUsuario.cedulaRif.length);
        $('.activarEditarUsuario').click();
        //self.viewsController('editarFinanciadora');
        console.log(self.nuevoUsuario);
      });

      $('#tablaConsultarUsuarios tbody').on('click', 'tr', function () {
        $('#tablaConsultarUsuarios').DataTable().$('tr.choosed').removeClass('choosed');
        $(this).addClass('choosed');
      });
    };

    this.cambiarFecha = function(id){
      console.log(id);
      $('#'+id).closest('.item')
                          .removeClass('bad')
                          .find('.alert').remove();
    };

    $('.usuario.collapse-link').on('click', function () {
      console.log('asdasdasdasd');
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

  }]);

})();
