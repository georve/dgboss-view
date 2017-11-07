(function(){

  'use strict';

  var mainController = angular.module('DGBOSS.mainController', ['DGBOSS.mainServices']);

  mainController.controller('mainController', ['$scope', '$rootScope', '$state', '$cookies', 'mainServices','$location', function($scope, $rootScope, $state, $cookies, mainServices,$location){

    var self = this;

    console.log('mainController activated.');


    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the application view. }
    */
    this.views = {
      login: true,
      lostPass: false,
      main: false,
      admin: false
    };

    this.sidebarMenu = {
      inicio: true,
      agregarAsegurado: false,
      editarAsegurado: false,
      listarAsegurados: false,
      cargarAsegurados: false,
      agregarAseguradora: false,
      editarAseguradora: false,
      listarAseguradora: false,
      agregarBanco: false,
      listarBancos: false,
      agregarMoneda: false,
      listarMonedas: false,
      agregarRamo: false,
      listarRamos: false,
      agregarFinanciadora: false,
      listarFinanciadoras:false,
      usuario: false,
      editProfile: false,
      agregarUsuarios: false,
      listarUsuarios: false,
      gestionarRoles: false,
      asignarPermisos: false,
      agregarProductores: false,
      listarProductores: false,
  	  agregarSiniestro: false,
      listarSiniestros: false,
      reporteSiniestro: false,
  	  agregarEjecutivoCta: false,
  	  listarEjecutivoCta: false,
  	  agregarPolizasIndividuales: false,
  	  agregarPolizasColectivas: false,
  	  editarPolizasIndividuales: false,
  	  listarPolizasIndividuales: false,
  	  agregarPolizasCertificado: false,
	    listarPolizasColectivas: false,
  	  agregarCobertura: false,
      agregarComision: false,
      listarComisiones: false,
      ConsultarComisiones:false,
      cargarCotizaciones: false,
      listarCotizaciones: false,
      listarCotizacionesSeleccionadas: false,
      agregarRenovacion: false,
      listarRenovaciones: false,
  	  agregarBono: false,
      listarBonos: false,
      agregarBonoAsignado: false,
      listarBonosAsignados: false,
  	  agregarRecibo: false,
      listarRecibos: false,
      agregarFactura: false,
      consultarFactura: false,
      agregarEmpresa: false,
      listarEmpresa: false,
      cargarPolizas:false,
      repoPolizas:false,
      repoRecibos:false,

    };

    this.permisologia = {

    };

    this.rol = 0;

    this.displayName = undefined;

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

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.redirectToMain = function(permisos){
      console.log('on redirectToMain function.');
      //self.permisologia = permisos;
      console.log(permisos);

      for( var i = 0; i < permisos.length; i ++ ){
        self.permisologia[permisos[i].codigo] = permisos[i].value;
      };

      self.setObjectElems(self.views, false);
      self.views.main = true;
      console.log('Ahora permisologia es: ');
      console.log(self.permisologia);

    // self.permisos[self.permisologia[0].codigo] = self.permisologia[0].value;
    // self.permisos[self.permisologia[1].codigo] = self.permisologia[1].value;

    // console.log('Permisos listos');
    // console.log(self.permisos);

      new PNotify({
        title: "¡Bienvenido!",
        text: "Usuario verificado de manera satisfactoria.",
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
    };

    this.redirectToAdmin = function(){
      console.log('on redirectToAdmin function.');
      self.setObjectElems(self.views, false);
      self.views.admin = true;
    };

    this.sidebarController = function(option){
      console.log('on sidebarController function.', option);
      self.setObjectElems(self.sidebarMenu, false);

      switch(option){
        case 'inicio':
          console.log('inicio');
          self.sidebarMenu.inicio = true;
          $rootScope.$emit('inicio');
          break;
        case 'agregarAsegurado':
          self.sidebarMenu.agregarAsegurado = true;
          $rootScope.$emit('agregarAsegurado');
          break;
        case 'editarAsegurado':
          self.sidebarMenu.editarAsegurado = true;
          break;
        case 'listarAsegurados':
          self.sidebarMenu.listarAsegurados = true;
          $rootScope.$emit('listarAsegurados');
          console.log('sidebarController > listarAsegurados');
          break;
        case 'cargarAsegurados':
          self.sidebarMenu.cargarAsegurados = true;
          $rootScope.$emit('cargarAsegurados');
          console.log('sidebarController > cargarAsegurados');
          break;
        case 'editProfile':
          self.sidebarMenu.editProfile = true;
          console.log(self.sidebarMenu.editProfile);
          $rootScope.$emit('editProfile');
          console.log('sidebarController > editProfile');
          break;
        case 'usuario':
          self.sidebarMenu.usuario = true;
          break;
    		case 'agregarUsuarios':
          self.sidebarMenu.agregarUsuarios = true;
          $rootScope.$emit('agregarUsuarios');
  		    console.log('sidebarController > agregarUsuarios');
          break;
        case 'listarUsuarios':
          self.sidebarMenu.listarUsuarios = true;
		      $rootScope.$emit('listarUsuarios');
		      console.log('sidebarController > listarUsuarios');
          break;
        case 'gestionarRoles':
          self.sidebarMenu.gestionarRoles = true;
          $rootScope.$emit('gestionarRoles');
          break;
        case 'asignarPermisos':
          self.sidebarMenu.asignarPermisos = true;
          $rootScope.$emit('asignarPermisos');
          break;
        case 'agregarAseguradora':
          self.sidebarMenu.agregarAseguradora = true;
          $rootScope.$emit('agregarAseguradora');
          break;
        case 'editarAseguradora':
          self.sidebarMenu.editarAseguradora = true;
          $rootScope.$emit('editarAseguradora');
          break;
        case 'listarAseguradoras':
          self.sidebarMenu.listarAseguradoras = true;
          $rootScope.$emit('listarAseguradoras');
          break;
        case 'agregarBanco':
          self.sidebarMenu.agregarBanco = true;
          $rootScope.$emit('agregarBanco');
          break;
        case 'listarBancos':
          self.sidebarMenu.listarBancos = true;
          $rootScope.$emit('listarBancos');
          break;
        case 'agregarMoneda':
          self.sidebarMenu.agregarMoneda = true;
          $rootScope.$emit('agregarMoneda');
          break;
        case 'listarMonedas':
         self.sidebarMenu.listarMonedas = true;
         $rootScope.$emit('listarMonedas');
         break;
        case 'agregarRamo':
          self.sidebarMenu.agregarRamo = true;
          $rootScope.$emit('agregarRamo');
          break;
        case 'listarRamos':
          self.sidebarMenu.listarRamos = true;
          $rootScope.$emit('listarRamos');
          break;
        case 'agregarFinanciadora':
          self.sidebarMenu.agregarFinanciadora = true;
          $rootScope.$emit('agregarFinanciadora');
          break;
        case 'listarFinanciadoras':
          self.sidebarMenu.listarFinanciadoras = true;
          $rootScope.$emit('listarFinanciadoras');
          break;
        case 'listarEmpresa':
          self.sidebarMenu.listarEmpresa = true;
          $rootScope.$emit('listarEmpresa');
          break;
        case 'agregarEmpresa':
          self.sidebarMenu.agregarEmpresa = true;
          $rootScope.$emit('agregarEmpresa');
          break;
        case 'listarCobertura':
          self.sidebarMenu.listarCobertura = true;
          $rootScope.$emit('listarCobertura');
          break;
        case 'agregarProductores':
          self.sidebarMenu.agregarProductores = true;
          $rootScope.$emit('agregarProductores');
          break;
        case 'listarProductores':
          self.sidebarMenu.listarProductores = true;
          $rootScope.$emit('listarProductores');
          break;
        case 'agregarSiniestro':
          self.sidebarMenu.agregarSiniestro = true;
          $rootScope.$emit('agregarSiniestro');
          break;
        case 'listarSiniestros':
          self.sidebarMenu.listarSiniestros = true;
          $rootScope.$emit('listarSiniestros');
          break;
        case 'reporteSiniestro':
          self.sidebarMenu.reporteSiniestro = true;
          $rootScope.$emit('reporteSiniestro');
          break;
        case 'agregarEjecutivoCta':
          self.sidebarMenu.agregarEjecutivoCta = true;
          $rootScope.$emit('agregarEjecutivoCta');
          break;
        case 'listarEjecutivoCta':
          self.sidebarMenu.listarEjecutivoCta = true;
          $rootScope.$emit('listarEjecutivoCta');
          break;
        case 'agregarPolizasIndividuales':
          self.sidebarMenu.agregarPolizasIndividuales = true;
          $rootScope.$emit('agregarPolizasIndividuales');
          break;
        case 'editarPolizasIndividuales':
          self.sidebarMenu.editarPolizasIndividuales = true;
          $rootScope.$emit('editarPolizasIndividuales');
          break;
        case 'agregarPolizasColectivas':
          self.sidebarMenu.agregarPolizasColectivas = true;
          $rootScope.$emit('agregarPolizasColectivas');
          break;
        case 'listarPolizasIndividuales':
          self.sidebarMenu.listarPolizasIndividuales = true;
          $rootScope.$emit('listarPolizasIndividuales');
          break;
        case 'agregarPolizasCertificado':
          self.sidebarMenu.agregarPolizasCertificado = true;
          $rootScope.$emit('agregarPolizasCertificado');
          break;
        case 'listarPolizasColectivas':
          self.sidebarMenu.listarPolizasColectivas = true;
          $rootScope.$emit('listarPolizasColectivas');
          break;
        case 'agregarCobertura':
          self.sidebarMenu.agregarCobertura = true;
          $rootScope.$emit('agregarCobertura');
          break;
        case 'agregarComision':
          self.sidebarMenu.agregarComision = true;
          $rootScope.$emit('agregarComision');
          break;
        case 'listarComisiones':
          self.sidebarMenu.listarComisiones = true;
          $rootScope.$emit('listarComisiones');
          break;
        case 'ConsultarComisiones':
          self.sidebarMenu.ConsultarComisiones = true;
          $rootScope.$emit('ConsultarComisiones');
          break;
        case 'cargarCotizaciones':
          console.log('cargar');
          self.sidebarMenu.cargarCotizaciones = true;
          $rootScope.$emit('cargarCotizaciones');
          break;
        case 'listarCotizaciones':
          console.log('listar');
          self.sidebarMenu.listarCotizaciones = true;
          $rootScope.$emit('listarCotizaciones');
          break;
        case 'listarCotizacionesSeleccionadas':
          console.log('listar');
          self.sidebarMenu.listarCotizacionesSeleccionadas = true;
          $rootScope.$emit('listarCotizacionesSeleccionadas');
          break;
        case 'listarRenovaciones':
          self.sidebarMenu.listarRenovaciones = true;
          $rootScope.$emit('listarRenovaciones');
          break;
        case 'agregarBono':
          self.sidebarMenu.agregarBono = true;
          $rootScope.$emit('agregarBono');
          break;
        case 'listarBonos':
          self.sidebarMenu.listarBonos = true;
          $rootScope.$emit('listarBonos');
          break;
        case 'agregarBonoAsignado':
          self.sidebarMenu.agregarBonoAsignado = true;
          $rootScope.$emit('agregarBonoAsignado');
          break;
        case 'listarBonosAsignados':
          self.sidebarMenu.listarBonosAsignados = true;
          $rootScope.$emit('listarBonosAsignados');
          break;
        case 'agregarRecibo':
          self.sidebarMenu.agregarRecibo = true;
          $rootScope.$emit('agregarRecibo');
          break;
        case 'listarRecibos':
          self.sidebarMenu.listarRecibos = true;
          $rootScope.$emit('listarRecibos');
          break;
        case 'agregarFactura':
          self.sidebarMenu.agregarFactura = true;
          $rootScope.$emit('agregarFactura');
          break;
        case 'consultarFactura':
          self.sidebarMenu.consultarFactura = true;
          $rootScope.$emit('consultarFactura');
          break;
        case 'reportePrimasCobradas':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reportePrimasCobradas = true;
          $rootScope.$emit('reportePrimasCobradas');
          break;
        case 'reportePrimasPendientes':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reportePrimasPendientes = true;
          $rootScope.$emit('reportePrimasPendientes');
          break;
        case 'reporteComisionesCobradas':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteComisionesCobradas = true;
          $rootScope.$emit('reporteComisionesCobradas');
          break;
        case 'reporteComisionesPendientes':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteComisionesPendientes = true;
          $rootScope.$emit('reporteComisionesPendientes');
          break;
        case 'reporteBonosCobrados':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteBonosCobrados = true;
          $rootScope.$emit('reporteBonosCobrados');
          break;
        case 'reporteBonosPendientes':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteBonosPendientes = true;
          $rootScope.$emit('reporteBonosPendientes');
          break;
        case 'reportePolizaPersona':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reportePolizaPersona = true;
          $rootScope.$emit('reportePolizaPersona');
          break;
        case 'reportePolizaPatrimoniales':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reportePolizaPatrimoniales = true;
          $rootScope.$emit('reportePolizaPatrimoniales');
          break;
        case 'reportePolizaAutomovil':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reportePolizaAutomovil = true;
          $rootScope.$emit('reportePolizaAutomovil');
          break;
        case 'reporteSiniestroPersona':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteSiniestroPersona = true;
          $rootScope.$emit('reporteSiniestroPersona');
          break;
        case 'reporteSiniestroPatrimoniales':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteSiniestroPatrimoniales = true;
          $rootScope.$emit('reporteSiniestroPatrimoniales');
          break;
        case 'reporteSiniestroAutomovil':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteSiniestroAutomovil = true;
          $rootScope.$emit('reporteSiniestroAutomovil');
          break;
        case 'reporteSiniestroGeneral':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteSiniestroGeneral = true;
          $rootScope.$emit('reporteSiniestroGeneral');
          break;
        case 'reporteCantidadRenovaciones':
          self.sidebarMenu.inicio = true;
          self.sidebarMenu.reporteCantidadRenovaciones = true;
          $rootScope.$emit('reporteCantidadRenovaciones');
          break;
        case 'cargarPolizas':
          self.sidebarMenu.cargarPolizas = true;
          $rootScope.$emit('cargarPolizas');
          break;
        case 'repoPolizas':
          self.sidebarMenu.repoPolizas = true;
          $rootScope.$emit('repoPolizas');
          break;
        case 'repoRecibos':
          self.sidebarMenu.repoRecibos = true;
          $rootScope.$emit('repoRecibos');
          break;
      case 'agregarCartas':
            self.sidebarMenu.agregarCartas = true;
            $rootScope.$emit('agregarCartas');
            break;
      case 'listarCartas':
            self.sidebarMenu.listarCartas = true;
            $rootScope.$emit('listarCartas');
            break;
          case 'emitirCartas':
            self.sidebarMenu.emitirCartas = true;
            $rootScope.$emit('emitirCartas');
            break;
        default:
          break;
      }
    };

    this.editProfile = function(){
      self.sidebarController('editProfile')
    };

    this.logOut = function(){
      self.setObjectElems(self.views, false);
      self.views.login = true;
      self.permisologia = [];
      self.rol = 0;
      self.displayName = undefined;
      $rootScope.$emit('resetLoginData');
      $('body').css("background-color", "#F7F7F7");
      $('.active').closest('.child_menu').css('display', 'none');
      $('.menuItem.active').removeClass('active');
      self.setObjectElems(self.sidebarMenu, false);
      self.sidebarMenu.inicio = true;
      mainServices.setAdmin(0);
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('toDashboard', function(){
      self.sidebarController('inicio');
    });

    $rootScope.$on('hideLogin', function(){
      self.views.login = false;
      self.views.lostPass = true;
    });

    $rootScope.$on('toLogin', function(){
      self.views.login = true;
      self.views.lostPass = false;
      // $state.go('/login');
    });

    $rootScope.$on('redirectToMain', function(event, data, profileData){
      self.redirectToMain(data, profileData);
      console.log('permisos', data);
      // if(profileData.logged){

      // }else{
      //   // self.setObjectElems(self.sidebarMenu, false);
      //   // self.sidebarMenu.inicio = true;
      // }

      console.log(profileData);
      if(profileData.inAdmin == 1){
        self.rol = 3;
        mainServices.setUserRol('admin');

        mainServices.setAdmin(1);
        console.log(mainServices.getUserRol());
      };
	  mainServices.setUser(profileData.nbUsuarioApp);
      //self.rol = 3;
      self.displayName = profileData.nombre;
      // console.log('Imprimiendo en mainController..');
      // console.log(data);
      $('body').css("background-color", "#2A3F54");
      $rootScope.$emit('inicio');
      console.log('on redirectToMain..');
    });

    $rootScope.$on('redirectToAdmin', function(){
      self.redirectToAdmin();
      $('body').css("background-color", "#2A3F54");
    })

    $scope.$on('$viewContentLoaded', function(){
        console.log('on view content loaded');
        mainServices.setDomain('localhost:8080');
      // mainServices.setDomain('dgfarmdv01');
      //  mainServices.setDomain($location.host());
        mainServices.setDominio('INTERFILE-1');
        // mainServices.setDominio($location.host());
        console.log('DOMAIN',mainServices.getDomain());
        mainServices.setURL();
        console.log('setURL',mainServices.getURL());
      //self.sidebarController($cookies.getObject('view'));
    });

  }]);

})();
