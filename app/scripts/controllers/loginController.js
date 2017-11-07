(function(){

  'use strict';

  var loginController = angular.module('DGBOSS.loginController', ['DGBOSS.mainServices', 'DGBOSS.loginServices']);

  loginController.controller('loginController', ['$scope', '$rootScope', '$cookies', 'mainServices', 'loginServices', '$location', function($scope, $rootScope, $cookies, mainServices, loginServices, $location){

    var self = this;

    console.log('loginController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    $rootScope.$on('$routeChangeSuccess', function() {
      var path = $location.path();
      console.log(path);
      // this shoudl fire for all routes
    });

    /*
      this.views: { this will set the login view. }
    */
    this.views = {
      login: true,
      createUser: false,
      forgotPassword: false,
      admin: false,
    };

    /*
      this.loginData: { this will get the login inputs data. }
    */
    this.loginData = {
      username: undefined,  //THIS SHOULD BE UNDEFINED!
      password: undefined   //THIS SHOULD BE UNDEFINED!
    };

    this.forgotData = {
      email: undefined
    };

    this.changePassData = {
      password: undefined,
      confirmPass: undefined
    };

    this.logInTry = 0;

    this.permisologia = [
      // { codigo: 'addAsega',   nombre: 'Agregar aseguradora',            value: true },
      // { codigo: 'editAsega',  nombre: 'Editar aseguradora',             value: true },
      // { codigo: 'getAsega',   nombre: 'Consultar aseguradoras',         value: true },
      // { codigo: 'addFinan',   nombre: 'Agregar financiadora',           value: true },
      // { codigo: 'editFinan',  nombre: 'Editar financiadora',            value: true },
      // { codigo: 'getFinan',   nombre: 'Consultar financiadoras',        value: true },
      // { codigo: 'getBanc',    nombre: 'Consultar bancos',               value: true },
      // { codigo: 'getMoned',   nombre: 'Consultar monedas',              value: true },
      // { codigo: 'getRamo',    nombre: 'Consultar ramos',                value: true },
      // { codigo: 'editEmpre',  nombre: 'Editar empresa',                 value: true },
      // { codigo: 'getEmpre',   nombre: 'Consultar empresas',             value: true },
      // { codigo: 'getCober',   nombre: 'Consultar coberturas',           value: true },
      // { codigo: 'addAsego',   nombre: 'Agregar asegurado',              value: true },
      // { codigo: 'editAsego',  nombre: 'Editar asegurado',               value: true },
      // { codigo: 'getAsego',   nombre: 'Consultar asegurados',           value: true },
      // { codigo: 'loadAsego',  nombre: 'Cargar asegurados',              value: true },
      // { codigo: 'addPolInd',  nombre: 'Agregar poliza individual',      value: true },
      // { codigo: 'editPolInd', nombre: 'Editar poliza individual',       value: true },
      // { codigo: 'getPolInd',  nombre: 'Consultar polizas individuales', value: true },
      // { codigo: 'addPolCol',  nombre: 'Agregar poliza colectiva',       value: true },
      // { codigo: 'editPolCol', nombre: 'Editar poliza colectiva',        value: true },
      // { codigo: 'getPolCol',  nombre: 'Consultar polizas colectivas',   value: true },
      // { codigo: 'addComis',   nombre: 'Agregar comisiones',             value: true },
      // { codigo: 'addCotiz',   nombre: 'Cargar cotizaciones',            value: true },
      // { codigo: 'getCotiz',   nombre: 'Listar cotizaciones',            value: true },
      // { codigo: 'addRecib',   nombre: 'Agregar recibo',                 value: true },
      // { codigo: 'getRecib',   nombre: 'Consultar recibos',              value: true },
      // { codigo: 'addBono',    nombre: 'Agregar bono',                   value: true },
      // { codigo: 'getBono',    nombre: 'Consultar bonos',                value: true },
      // { codigo: 'addBonoAs',  nombre: 'Agregar bono asignado',          value: true },
      // { codigo: 'getBonoAs',  nombre: 'Consultar bonos asignados',      value: true },
      // { codigo: 'addFact',    nombre: 'Agregar factura',                value: true },
      // { codigo: 'getFact',    nombre: 'Consultar facturas',             value: true },
      // { codigo: 'addSinie',   nombre: 'Agregar siniestro',              value: true },
      // { codigo: 'editSinie',  nombre: 'Editar siniestro',               value: true },
      // { codigo: 'getSinie',   nombre: 'Consultar siniestros',           value: true },
      // { codigo: 'addUser',    nombre: 'Agregar usuario',                value: true },
      // { codigo: 'editUser',   nombre: 'Editar usuario',                 value: true },
      // { codigo: 'getUser',    nombre: 'Consultar usuarios',             value: true },
      // { codigo: 'mngRol',     nombre: 'Gestionar roles',                value: true },
      // { codigo: 'editPerm',   nombre: 'Asignar permisos',               value: true }
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

    this.loginService = function(){

		
		/*Se agrego la consulta del dominio para poder 
		** distinguir las diferentes empresas que tienen 
		** acceso a DGBOSS.
		**
		** Se debe eliminar la linea this.dominio = 'PLCO';
		** en mainServices para que pueda funcionar.
		*/
		//mainServices.setDominio($location.host());
	
      //TODO -- Que se le pasa en empresa? ¿0?
      var params = {
        usuario: self.loginData.username,
        password: self.loginData.password,
        empresa: mainServices.getDominio()
      };
      //$rootScope.$emit('redirectToMain', self.permisologia);
      loginServices.logIn(params)
        .success(function(data){

          var permisos = [];

          if(data.permisos){
            for(var i = 0; i < data.permisos.length; i ++){
              var item = {
                codigo: '',
                value: false
              };

              item.codigo = data.permisos[i].coPermiso;
              if(data.permisos[i].inEstatus == 1){
                item.value = true;
              };

              permisos.push(item);
            };
          };

          self.permisologia = permisos;
          console.log(self.permisologia);
          console.log(data);
          if(!data.codigo || data.codigo != 1 || data.codigo != "1"){
            //CAMBIAR A NOMBRE
            mainServices.setUser(data.nbUsuarioApp);
            mainServices.setRifUser(data.nuCedulaRif);
            mainServices.setRifEmpresa(data.nuRifEmpresa);
            mainServices.setUserRol(data.coRol);
            
            console.log(data.permisos);

            var userData = {
              dominio: data.dominio,
              inAdmin: data.inAdmin,
              inEstatus: data.inEstatus,
              inProductor: data.inProductor,
              nbUsuarioApp: data.nbUsuarioApp,
              nombre: data.nombre,
              nuCedulaRif: data.nuCedulaRif,
              nuRifEmpresa: data.nuRifEmpresa,
              logged: true
            };

            var userPermisos = [];
            for(var i = 0; i < data.permisos.length; i ++){
              userPermisos.push({
                coPermiso: data.permisos[i].coPermiso,
                inEstatus: data.permisos[i].inEstatus
              });
            }
            console.log('permisos: ', userPermisos);
            $rootScope.$emit('redirectToMain', self.permisologia, data);
            mainServices.setPermisos(data.permisos);

            // $cookies.putObject('permisosInfo', userPermisos);
            // $cookies.putObject('userInfo', userData);

          } else {
            new PNotify({
              title: "Error",
              text: data.mensaje,
              addclass: "stack-bar-bottom",
              cornerclass: "",
              width: "30%",
              type: "error",
              styling: "fontawesome",
              icon: false,
              animate: {
                animate: true,
                in_class: 'slideInDown',
                out_class: 'slideOutUp'
              }
            });


            //$rootScope.$emit('redirectToMain', self.permisologia);
            //QUITAR ESTA LINEA
          }
        })
        .error(function(data, status, headers, config){
              new PNotify({
                title: "Error",
                text: data.mensaje,
                addclass: "stack-bar-bottom",
                cornerclass: "",
                width: "30%",
                type: "error",
                styling: "fontawesome",
                icon: false,
                animate: {
                  animate: true,
                  in_class: 'slideInDown',
                  out_class: 'slideOutUp'
                }
              });
         // $rootScope.$emit('redirectToMain', self.permisologia);
        });
    };

    this.forgotPasswordService = function(){

      var params = {
        correo: self.forgotData.email,
        dominio: mainServices.getDominio()
      };
      //$rootScope.$emit('redirectToMain', self.permisologia);
      loginServices.sendRequestService(params)
        .success(function(data){
          console.log(data);
          if(data.mensaje){
            if(data.mensaje == 'Usuario no válido'){
              new PNotify({
                title: "Error",
                text: "Correo electrónico inválido.",
                addclass: "stack-bar-bottom",
                cornerclass: "",
                width: "30%",
                type: "error",
                styling: "fontawesome",
                icon: false,
                animate: {
                  animate: true,
                  in_class: 'slideInDown',
                  out_class: 'slideOutUp'
                }
              });
            }
          }else{
            new PNotify({
              title: "Correo enviado!",
              text: "Por favor, revise su correo electrónico.",
              addclass: "stack-bar-bottom",
              cornerclass: "",
              width: "30%",
              type: "success",
              styling: "fontawesome",
              icon: false,
              animate: {
                animate: true,
                in_class: 'slideInDown',
                out_class: 'slideOutUp'
              }
            });

            self.redirectToLogin();
          }
        })
        .error(function(data, status, headers, config){

         // $rootScope.$emit('redirectToMain', self.permisologia);
        });

    };

    this.changePasswordService = function(){
      var userData = mainServices.getChangePassData();
      var params = {
        correo: userData.correo,
        dominio: mainServices.getDominio(),
        clave: self.changePassData.password,
        codigo: userData.codigo
      };

      loginServices.cambiarClave(params)
        .success(function(data){
          console.log(data);

          new PNotify({
            title: "Contraseña editada",
            text: "Se cambió la contraseña satisfactoriamente.",
            addclass: "stack-bar-bottom",
            cornerclass: "",
            width: "30%",
            type: "success",
            styling: "fontawesome",
            icon: false,
            animate: {
              animate: true,
              in_class: 'slideInDown',
              out_class: 'slideOutUp'
            }
          });

          self.redirectToLogin();
          //$rootScope.$emit('toLogin');

        })
        .error(function(data, status, headers, config){
          new PNotify({
            title: "Error",
            text: "No se pudo cambiar la contraseña.",
            addclass: "stack-bar-bottom",
            cornerclass: "",
            width: "30%",
            type: "error",
            styling: "fontawesome",
            icon: false,
            animate: {
              animate: true,
              in_class: 'slideInDown',
              out_class: 'slideOutUp'
            }
          });
        });
      
    };

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'login':
          self.views.login = true;
          self.setObjectElems(self.forgotData, undefined);
          break;
        case 'createUser':
          self.views.createUser = true;
          console.log('viewsController > createUser');
          break;
        case 'forgotPassword':
          self.views.forgotPassword = true;
          self.setObjectElems(self.loginData, undefined);
          break;
        default:
          break;
      }
    };

    this.logIn = function(){

      console.log('on logIn function');
      if(self.logInTry == 5){
        new PNotify({
          title: "Error",
          text: "Ha intentado ingresar varias veces sin éxito. Por favor, contacte al administrador.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else if(!self.loginData.username || !self.loginData.password){
        var animate_in = $('#animate_in').val(),
          animate_out = $('#animate_out').val();
        new PNotify({
          title: "Error",
          text: "Debe introducir el usuario y la contraseña.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else{
        self.loginService();
      };


      // }else if(self.loginData.username == 'admin' && self.loginData.password == 'admin'){
      //   //Nothing happens..
      //   $rootScope.$emit('redirectToMain', self.permisologia);
      //   self.logInTry = 0;
      // }else if(self.loginData.username == 'asist' && self.loginData.password == 'asist'){
      //   //Nothing happens..
      //   console.log('opcion administrador');
      //   $rootScope.$emit('redirectToAdmin');
      // }else{
      //   //Service Gives error
      //   self.logInTry ++;
      //   //Incorrect username service
      //   if(self.loginData.username != 'admin'){
      //     new PNotify({
      //       title: "Error",
      //       text: "El usuario no existe.",
      //       addclass: "stack-bar-bottom",
      //       cornerclass: "",
      //       width: "30%",
      //       type: "error",
      //       styling: "fontawesome",
      //       icon: false,
      //       animate: {
      //         animate: true,
      //         in_class: 'slideInDown',
      //         out_class: 'slideOutUp'
      //       }
      //     });
      //   };

      //   if(self.loginData.username == 'admin' && self.loginData.password != 'admin'){
      //     new PNotify({
      //       title: "Error",
      //       text: "Contraseña incorrecta.",
      //       addclass: "stack-bar-bottom",
      //       cornerclass: "",
      //       width: "30%",
      //       type: "error",
      //       styling: "fontawesome",
      //       icon: false,
      //       animate: {
      //         animate: true,
      //         in_class: 'slideInDown',
      //         out_class: 'slideOutUp'
      //       }
      //     });
      //   }

      // }
    //}
    };

    this.forgotPassword = function(){
      if(!self.forgotData.email || self.forgotData.email == ''){
        new PNotify({
          title: "Error",
          text: "Debe introducir el email.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else{
        self.forgotPasswordService();
      }
    }

    this.changePassword = function(){

      if(!self.changePassData.password){
        new PNotify({
          title: "Error",
          text: "Debe introducir la nueva contraseña.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else if(!self.changePassData.confirmPass){
        new PNotify({
          title: "Error",
          text: "Debe confirmar la contraseña.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else if(self.changePassData.password != self.changePassData.confirmPass){
        new PNotify({
          title: "Error",
          text: "Las contraseñas deben coincidir.",
          addclass: "stack-bar-bottom",
          cornerclass: "",
          width: "30%",
          type: "error",
          styling: "fontawesome",
          icon: false,
          animate: {
            animate: true,
            in_class: 'slideInDown',
            out_class: 'slideOutUp'
          }
        });
      }else{
        self.changePasswordService();
      }
    };
    
    this.redirectToLogin = function(){
      self.viewsController('login');
      $rootScope.$emit('toLogin');
    }

    this.getSession = function(){
      //var user = $cookies.getObject('userInfo');
      // var permisos = $cookies.getObject('permisosInfo');
      // console.log('on session', user);
      // console.log('with permisos', permisos);
      if(user){
      //   console.log('user logged');
      //   mainServices.setPermisos(permisos);
       // $rootScope.$emit('redirectToMain', permisos, user);
      //   mainServices.setPermisos($cookies.getObject('userPermisos'));
      }

    }

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('resetLoginData', function(){
      self.setObjectElems(self.loginData, undefined);
    })

    $('#dgBossUsername').keypress(function(e){
      if(e.keyCode==13){
        angular.element(document.querySelector('#dgBossLoginButton')).triggerHandler('click');
      }
    });

    $('#dgBossPassword').keypress(function(e){
      if(e.keyCode==13){
        angular.element(document.querySelector('#dgBossLoginButton')).triggerHandler('click');
      }
    });

    //self.getSession();

    $scope.$on('$viewContentLoaded', function(){
      console.log('on view login content loaded');
     // self.sidebarController($cookies.getObject('view'));
    });

  }]);

})();
