(function(){

  'use strict';

  var rolesController = angular.module('DGBOSS.rolesController', ['DGBOSS.mainServices', 'DGBOSS.rolesServices']);

  rolesController.controller('rolesController', ['$scope', '$rootScope', 'mainServices','rolesServices', function($scope, $rootScope, mainServices, rolesServices){

    var self = this;

    console.log('rolesController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the application view. }
    */
    this.views = {
      gestionarRoles: false,
      asignarPermisos: false
    };

    this.nuevoRol = {
      nombre: undefined,
      codigo: undefined,
      descripcion: undefined,
      estatus: undefined
    };

    this.editarRol = {
      nombre: undefined,
      codigo: undefined,
      descripcion: undefined,
      estatus: undefined,
    };

    this.editandoRol = false;

    this.rifEmpresa = undefined;

    this.buscarDisponibles = undefined;
    this.buscarAsignados = undefined;
    this.rolSeleccionado = undefined;

    this.nombreRolModal = undefined, this.codigoRolModal = undefined, this.descripcionRolModal = undefined, this.estatusRolModal = undefined;
    
    this.indexEditandoRol = undefined;
    this.nombreEliminarRol = undefined;

    this.estatus = [
      'Activo', 
      'Inactivo'
    ];

    this.roles = [
      // {
      //   nombre: 'Admin',
      //   descripcion: 'Descripcion Rol Productor',
      //   permisologia: [
      //     { codigo: '001_asegurado', nombre: 'Consultar asegurados', activo: true, toggle: false },
      //     { codigo: '002_asegurado', nombre: 'Agregar asegurados', activo: true, toggle: false },
      //     { codigo: '003_asegurado', nombre: 'Editar asegurados', activo: true, toggle: false },
      //     { codigo: '001_productor', nombre: 'Consultar productores', activo: true, toggle: false },
      //     { codigo: '002_productor', nombre: 'Agregar productores', activo: true, toggle: false },
      //     { codigo: '003_productor', nombre: 'Editar productores', activo: true, toggle: false },
      //     { codigo: '001_aseguradora', nombre: 'Consultar aseguradoras', activo: true, toggle: false },
      //     { codigo: '002_aseguradora', nombre: 'Agregar aseguradoras', activo: true, toggle: false },
      //     { codigo: '003_aseguradora', nombre: 'Editar aseguradoras', activo: true, toggle: false }
      //   ],
      //   editar: false
      // },
      // {
      //   nombre: 'Productor',
      //   descripcion: 'Descripcion Rol Productor',
      //   permisologia: [
      //     { codigo: '001_asegurado', nombre: 'Consultar asegurados', activo: true, toggle: false },
      //     { codigo: '002_asegurado', nombre: 'Agregar asegurados', activo: false, toggle: false },
      //     { codigo: '003_asegurado', nombre: 'Editar asegurados', activo: false, toggle: false },
      //     { codigo: '001_productor', nombre: 'Consultar productores', activo: true, toggle: false },
      //     { codigo: '002_productor', nombre: 'Agregar productores', activo: false, toggle: false },
      //     { codigo: '003_productor', nombre: 'Editar productores', activo: false, toggle: false },
      //     { codigo: '001_aseguradora', nombre: 'Consultar aseguradoras', activo: true, toggle: false },
      //     { codigo: '002_aseguradora', nombre: 'Agregar aseguradoras', activo: true, toggle: false },
      //     { codigo: '003_aseguradora', nombre: 'Editar aseguradoras', activo: true, toggle: false }
      //   ],
      //   editar: false
      // },
      // {
      //   nombre: 'Empleado',
      //   descripcion: 'Descripcion Rol Productor',
      //   permisologia: [
      //     { codigo: '001_asegurado', nombre: 'Consultar asegurados', activo: true, toggle: false },
      //     { codigo: '002_asegurado', nombre: 'Agregar asegurados', activo: false, toggle: false },
      //     { codigo: '003_asegurado', nombre: 'Editar asegurados', activo: false, toggle: false },
      //     { codigo: '001_productor', nombre: 'Consultar productores', activo: true, toggle: false },
      //     { codigo: '002_productor', nombre: 'Agregar productores', activo: false, toggle: false },
      //     { codigo: '003_productor', nombre: 'Editar productores', activo: false, toggle: false },
      //     { codigo: '001_aseguradora', nombre: 'Consultar aseguradoras', activo: true, toggle: false },
      //     { codigo: '002_aseguradora', nombre: 'Agregar aseguradoras', activo: false, toggle: false },
      //     { codigo: '003_aseguradora', nombre: 'Editar aseguradoras', activo: false, toggle: false }
      //   ],
      //   editar: false
      // }
    ];

    this.mostrarRoles = false;

    this.rolesBackUp = [];

    this.vistas = [
      'aseguradoAgregar', 'aseguradoConsultar', 'aseguradoEditar', 'polizasIndividualesAgregar', 'polizasIndividualesConsultar',
      'polizasColectivasAgregar', 'polizasColectivasConsultar', 'productoresAgregar', 'productoresConsultar', 'productoresEditar'
    ];

    this.permisologia = [
      { codigo: '001_asegurado', nombre: 'Consultar asegurados', activo: true, toggle: false },
      { codigo: '002_asegurado', nombre: 'Agregar asegurados', activo: false, toggle: false },
      { codigo: '003_asegurado', nombre: 'Editar asegurados', activo: false, toggle: false },
      { codigo: '001_productor', nombre: 'Consultar productores', activo: true, toggle: false },
      { codigo: '002_productor', nombre: 'Agregar productores', activo: true, toggle: false },
      { codigo: '003_productor', nombre: 'Editar productores', activo: true, toggle: false },
      { codigo: '001_aseguradora', nombre: 'Consultar aseguradoras', activo: false, toggle: false },
      { codigo: '002_aseguradora', nombre: 'Agregar aseguradoras', activo: false, toggle: false },
      { codigo: '003_aseguradora', nombre: 'Editar aseguradoras', activo: false, toggle: false }
    ];

    /********************************************************************************************
    **                                      F U N C T I O N S                                  **
    ********************************************************************************************/

    this.setObjectElems = function(obj, option){
      angular.forEach(obj, function(value, key){
        obj[key] = option;
      });
    };

    /********************************************************************************************
    **                                       S E R V I C E S                                   **
    ********************************************************************************************/

    // this.consultarRolesService = function(){
    // 	console.log('consultarRolesService..');

		// 	var params = {
		// 		codigo: '',
    //     rifEmpresa: self.rifEmpresa
		// 	};

    //   console.log(params);
		
		// 	rolesServices.consultarRoles(params)
		// 		.success(function(data){
		// 			console.log('success on consultar..');
		// 			console.log(data);
		// 			self.roles = [];

		// 			for(var i = 0; i < data.length; i ++){

		// 				switch(data[i].inEstatus){
		// 					case '0':
		// 						data[i].inEstatus = 'Inactivo';
		// 						break;
							
		// 					case '1':
		// 						data[i].inEstatus = 'Activo';
		// 						break;
							
		// 					default:
		// 						break;
		// 				}

		// 				self.roles.push({
    //           id: data[i].idRol,
    //           codigo: data[i].coRol,
    //           nombre: data[i].nbRol,
    //           descripcion: data[i].txDescripcion,
    //           estatus: data[i].inEstatus,
		// 				});
		// 			};

		// 			console.log(self.roles);
    //       self.viewsController('gestionarRoles');
    //       self.mostrarRoles = true;
		// 		})
		// 		.error(function(data, status, headers, config){
		// 			console.log(data);
		// 			console.log(status);
		// 			console.log(headers);
		// 			console.log(config);
		// 			console.log('Error..');

    //       self.viewsController('gestionarRoles');
		// 		});
		// };

    
		this.agregarRolService = function(option){
      
      var params = {};

      switch(option){
        case 'agregar':
          //params = JSON.parse(JSON.stringify(self.nuevoRol));
          params.nombre = self.nuevoRol.nombre;
          params.codigo = self.nuevoRol.codigo;
          params.descripcion = self.nuevoRol.descripcion;
          params.rifEmpresa = self.rifEmpresa;
          params.id = 0;
          params.estatus = 1;
          break;

        case 'editar':
          params = JSON.parse(JSON.stringify(self.nuevoRol));
          params.rifEmpresa = self.rifEmpresa;
          if(self.nuevoRol.estatus == 'Activo')
            params.estatus = 1;
          else if(self.nuevoRol.estatus == 'Inactivo')
            params.estatus = 0;

          break;

        default:
          break;
      }

			console.log(params);

      rolesServices.agregarRol(params)
        .success(function(data){
          console.log(data);

          if(data.codigo = 200){

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Rol creado!',
                  text: 'El rol fue creado con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Rol editado!',
                  text: 'El rol fue editado con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              default:
                break;
            };
            
            self.mostrarRoles = false;
            self.roles = [];
            self.consultarRolesService('roles');
            self.nuevoRol = undefined;
          }else{

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de crear el rol.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de editar el rol.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              default:
                break;
            };

          }
        })
        .error(function(data, status, headers, config){

          new PNotify({
            title: '¡Error!',
            text: data.mensaje,
            //text: 'Ha ocurrido un error en el sistema.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
    };

    this.consultarRolesService = function(option){
    	console.log('consultarRolesService..');
      console.log(option);

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
              
            if(data[i].coRol == 'EX' || data[i].coRol == 'ANA' || data[i].coRol == 'CLI'){
              data[i].default = true;
            }else{
              data[i].default = false;
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
          if(option == 'roles'){
            console.log('on roles..');
            self.viewsController('gestionarRoles');
            self.mostrarRoles = true;
          }else if(option == 'permisos'){
            console.log('on permisos..');
            self.consultarPermisosService();
          }
            console.log(self.roles);
            mainServices.setRoles(self.roles);

				})
				.error(function(data, status, headers, config){
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            console.log('Error..');

            if(option == 'roles'){
              self.viewsController('gestionarRoles');
            }else if(option == 'permisos'){

            };
				});
		};

    this.consultarPermisosService = function(){

      self.permisologia = [];

      rolesServices.consultarPermisos()
        .success(function(data){
          console.log(data);
          //self.viewsController('asignarPermisos');

          for(var i = 0; i < data.length; i ++){
            var item = {
              id: 0,
              codigo: data[i].coPermiso,
              nombre: data[i].nbPermiso,
              activo: false,
              toggle: false
            };

            self.permisologia.push(item);
          };

          for(var i = 0; i < self.roles.length; i ++){
            self.roles[i].permisologia = JSON.parse(JSON.stringify(self.permisologia));
          };

          console.log('permisos: ', self.permisologia);

          self.consultarPermisosPorRolService();
        })
        .error(function(data, status, headers, config){
          console.log('Error..');
        });
    };

    this.consultarPermisosPorRolService = function(){
      rolesServices.consultarPermisosPorRol()
        .success(function(data){
          console.log(data);

          for(var i = 0; i < data.length; i ++){
            for(var j = 0; j < self.roles.length; j ++){
              if(self.roles[j].codigo == data[i].coRol){
                console.log('entro en segundo for..');
                for(var k = 0; k < self.roles[j].permisologia.length; k ++){
                  if(self.roles[j].permisologia[k].codigo == data[i].coPermiso){
                    console.log('entro tercer for..');
                    self.roles[j].permisologia[k].id = data[i].idRp;
                    
                    if(data[i].inEstatus == 1)
                      self.roles[j].permisologia[k].activo = true;
                    else
                      self.roles[j].permisologia[k].activo = false;

                    self.roles[j].permisologia[k].toggle = false;
                    break;
                  }
                }
                break;
              }
            }
          };

          console.log('roles: ', self.roles);
          self.rolesBackUp = JSON.parse(JSON.stringify(self.roles));
          self.viewsController('asignarPermisos');
        })
        .error(function(data, status, headers, config){
          console.log('Error..');
        });
    };

    this.guardarPermisosService = function(){

      var item = [];

      for(var i = 0; i < self.roles.length; i ++){
        for( var j = 0; j < self.roles[i].permisologia.length; j ++){
          var element = {
            idRp: self.roles[i].permisologia[j].id,
            coRol: self.roles[i].codigo,
            coPermiso: self.roles[i].permisologia[j].codigo,
            inEstatus: 0,
            nuRifEmpresa: mainServices.getRifEmpresa()
          };

          if(self.roles[i].permisologia[j].activo)
            element.inEstatus = 1;

          item.push(element);
        }
      }; 

      console.log(item);

      rolesServices.agregarPermisosService(item)
        .success(function(data){
          console.log(data);

          new PNotify({
            title: '¡Roles Editados!',
            text: 'Permisos asignados con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        })
        .error(function(data, status, headers, config){
          console.log(data);
        });

    };


    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'gestionarRoles':
          self.views.gestionarRoles = true;
          break;
        case 'asignarPermisos':
          self.views.asignarPermisos = true;
          break;
        default:
          break;
      }
    };

    this.guardar = function(){
      // console.log(self.roles);
      // console.log(self.rolesBackUp);
      // if(self.roles == self.rolesBackUp){
      //     new PNotify({
      //       title: '¡Aerta!',
      //       text: 'No se ha modificado ningún rol.',
      //       type: 'warning',
      //       styling: 'bootstrap3',
      //       cornerclass: 'ui-pnotify-sharp'
      //     });
      // }else{
      //   console.log('serviceee!');
      // }
    };

    this.cancelar = function(){
      console.log('** on cancelar function() **');
      console.log(self.rolesBackUp);
      self.rolSeleccionado = undefined;
      self.roles = [];
      self.roles = JSON.parse(JSON.stringify(self.rolesBackUp));
      console.log(self.roles);
      self.permisologia = undefined;
    };

    this.switchRol = function(){
      console.log(self.roles);
      console.log(self.rolSeleccionado.permisologia);

      for(var i = 0; i < self.roles.length; i ++){
        if(self.roles[i].nombre == self.rolSeleccionado.nombre){
          self.permisologia = self.roles[i].permisologia;
        } 
      }

      // self.permisologia = self.rolSeleccionado.permisologia;
    };

    this.agregarRol = function(){
      var validatorResult = validator.checkAll($('#formularioAgregarRol'));
      console.log(validatorResult);
      if(validatorResult){

        if(self.editandoRol){
          self.agregarRolService('editar');
        }else{
          self.agregarRolService('agregar');
        };

        self.editandoRol = false;
      };
    };

    this.cancelarAgregarRol = function(){
      self.nuevoRol = undefined;
      self.editandoRol = false;
    };

    this.verRolModal = function(rol){
      self.nombreRolModal = rol.nombre;
      self.codigoRolModal = rol.codigo;
      self.descripcionRolModal = rol.descripcion;
      self.estatusRolModal = rol.estatus;
      $('.verRolModal').modal({
        show: 'true'
      });
    };

    this.editarRol = function(rol){
      self.nuevoRol = JSON.parse(JSON.stringify(rol));
      self.editandoRol = true;
      console.log(rol);
    };

    this.eliminarRol = function(rol){
      self.nombreEliminarRol = rol.nombre;

      $('.eliminarRolModal').modal({
        show: 'true'
      });
    }

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('gestionarRoles', function(){
      self.setObjectElems(self.nuevoRol, undefined);
      self.rifEmpresa = mainServices.getRifEmpresa();
      console.log('El id empresa es: ' + self.rifEmpresa);
      self.consultarRolesService('roles');
    });

    $rootScope.$on('asignarPermisos', function(){
      self.consultarRolesService('permisos');
    })

    this.togglePermiso = function(permiso){
      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){
        permiso.toggle = !permiso.toggle;
      }else{
        new PNotify({
          title: '¡Error!',
          text: 'No se puede editar los permisos de ese rol.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }
    };

    this.switchPermiso = function(permiso){
      console.log(permiso);
      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){
        permiso.activo = !permiso.activo;
        permiso.toggle = true;
      }else{
        // new PNotify({
        //   title: '¡Error!',
        //   text: 'No se puede editar los permisos de ese rol.',
        //   type: 'error',
        //   styling: 'bootstrap3',
        //   cornerclass: 'ui-pnotify-sharp'
        // });
      }
    };

    this.seleccionarDisponibles = function(){

      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){

        var contadorDisponibles = 0, contadorActivos = 0;
        angular.forEach(self.permisologia, function(value, key){
          if(!self.permisologia[key].activo){
            contadorDisponibles ++;
            if(self.permisologia[key].toggle){
              contadorActivos ++;
            };
          };
        });
        if(contadorDisponibles != contadorActivos){
          angular.forEach(self.permisologia, function(value, key){
            if(!self.permisologia[key].activo){
              self.permisologia[key].toggle = true;
            };
          });
        }else{
          angular.forEach(self.permisologia, function(value, key){
            if(!self.permisologia[key].activo){
              self.permisologia[key].toggle = false;
            };
          });
        }

      }else{
        new PNotify({
          title: '¡Error!',
          text: 'No se puede editar los permisos de ese rol.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }

    };

    this.seleccionarAsignados = function(){

      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){

        var contadorDisponibles = 0, contadorActivos = 0;
        angular.forEach(self.permisologia, function(value, key){
          if(self.permisologia[key].activo){
            contadorDisponibles ++;
            if(self.permisologia[key].toggle){
              contadorActivos ++;
            };
          };
        });
        if(contadorDisponibles != contadorActivos){
          angular.forEach(self.permisologia, function(value, key){
            if(self.permisologia[key].activo){
              self.permisologia[key].toggle = true;
            };
          });
        }else{
          angular.forEach(self.permisologia, function(value, key){
            if(self.permisologia[key].activo){
              self.permisologia[key].toggle = false;
            };
          });
        }        

      }else{
        new PNotify({
          title: '¡Error!',
          text: 'No se puede editar los permisos de ese rol.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }
    };

    this.agregarSeleccion = function(){

      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){

        angular.forEach(self.permisologia, function(value, key){
          if(!self.permisologia[key].activo && self.permisologia[key].toggle && !self.buscarDisponibles){
            self.permisologia[key].activo = true;
            self.permisologia[key].toggle = false;
          }else if(self.buscarDisponibles){
            if(!self.permisologia[key].activo && self.permisologia[key].toggle && !self.permisologia[key].nombre.toLowerCase().indexOf(self.buscarDisponibles.toLowerCase())){
              self.permisologia[key].activo = true;
            };
            self.permisologia[key].toggle = false;
          };
        });

      }else{
        new PNotify({
          title: '¡Error!',
          text: 'No se puede editar los permisos de ese rol.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }

    };

    this.removerSeleccion = function(){

      if(self.rolSeleccionado.codigo != 'ANA' && self.rolSeleccionado.codigo != 'ADM' && self.rolSeleccionado.codigo != 'EX'){

        angular.forEach(self.permisologia, function(value, key){
          if(self.permisologia[key].activo && self.permisologia[key].toggle && !self.buscarAsignados){
            self.permisologia[key].activo = false;
            self.permisologia[key].toggle = false;
          }else if(self.buscarAsignados){
            if(self.permisologia[key].activo && self.permisologia[key].toggle && !self.permisologia[key].nombre.toLowerCase().indexOf(self.buscarAsignados.toLowerCase())){
              self.permisologia[key].activo = false;
            };
            self.permisologia[key].toggle = false;
          };
        });

      }else{
        new PNotify({
          title: '¡Error!',
          text: 'No se puede editar los permisos de ese rol.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }

    };

    this.validarSubstring = function(){
      var substring = 'asdasd';
      var sub = 'da';

      if(substring.search(sub)){
        console.log('Lo encontró');
      }else{
        console.log('No lo encontró');
      };
    };

    self.validarSubstring();

    // var move_right = '<span class="glyphicon glyphicon-minus pull-left  dual-list-move-right" title="Remove Selected"></span>';
    // var move_left  = '<span class="glyphicon glyphicon-plus  pull-right dual-list-move-left " title="Add Selected"></span>';
    //
    // $(".dual-list.list-left .list-group").sortable({
    //     stop: function( event, ui ) {
    //         updateSelectedOptions();
    //     }
    // });
    //
    // $('body').on('click', '.list-group .list-group-item', function () {
    //     $(this).toggleClass('active');
    // });
    //
    // $('body').on('click', '.dual-list-move-right', function (e) {
    //     e.preventDefault();
    //
    //     actives = $(this).parent();
    //     $(this).parent().find("span").remove();
    //     $(move_left).clone().appendTo(actives);
    //     actives.clone().appendTo('.list-right ul').removeClass("active");
    //     actives.remove();
    //
    //     sortUnorderedList("dual-list-right");
    //
    //     updateSelectedOptions();
    // });
    //
    // $('body').on('click', '.dual-list-move-left', function (e) {
    //     e.preventDefault();
    //
    //     actives = $(this).parent();
    //     $(this).parent().find("span").remove();
    //     $(move_right).clone().appendTo(actives);
    //     actives.clone().appendTo('.list-left ul').removeClass("active");
    //     actives.remove();
    //
    //     updateSelectedOptions();
    // });
    //
    // $('.move-right, .move-left').click(function () {
    //     var $button = $(this), actives = '';
    //     if ($button.hasClass('move-left')) {
    //         actives = $('.list-right ul li.active');
    //         actives.find(".dual-list-move-left").remove();
    //         actives.append($(move_right).clone());
    //         actives.clone().appendTo('.list-left ul').removeClass("active");
    //         actives.remove();
    //
    //     } else if ($button.hasClass('move-right')) {
    //         actives = $('.list-left ul li.active');
    //         actives.find(".dual-list-move-right").remove();
    //         actives.append($(move_left).clone());
    //         actives.clone().appendTo('.list-right ul').removeClass("active");
    //         actives.remove();
    //
    //     }
    //
    //     updateSelectedOptions();
    // });
    //
    // function updateSelectedOptions() {
    //     $('#dual-list-options').find('option').remove();
    //
    //     $('.list-left ul li').each(function(idx, opt) {
    //         $('#dual-list-options').append($("<option></option>")
    //             .attr("value", $(opt).data("value"))
    //             .text( $(opt).text())
    //             .prop("selected", "selected")
    //         );
    //     });
    // }
    //
    // $('.dual-list .selector').click(function () {
    //     var $checkBox = $(this);
    //     if (!$checkBox.hasClass('selected')) {
    //         $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
    //         $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
    //     } else {
    //         $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
    //         $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    //     }
    // });
    //
    // $('[name="SearchDualList"]').keyup(function (e) {
    //     var code = e.keyCode || e.which;
    //     if (code == '9') return;
    //     if (code == '27') $(this).val(null);
    //     var $rows = $(this).closest('.dual-list').find('.list-group li');
    //     var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    //     $rows.show().filter(function () {
    //         var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    //         return !~text.indexOf(val);
    //     }).hide();
    // });
    //
    // $(".glyphicon-search").on("click", function() {
    //     $(this).next("input").focus();
    // });
    //
    // function sortUnorderedList(ul, sortDescending) {
    //     $("#" + ul + " li").sort(sort_li).appendTo("#" + ul);
    //
    //     function sort_li(a, b){
    //         return ($(b).data('value')) < ($(a).data('value')) ? 1 : -1;
    //     }
    // }
    //
    // $("#dual-list-left li").append(move_right);
    // $("#dual-list-right li").append(move_left);
    //



  }]);

})();
