(function(){

  'use strict';

  var DGBOSS = angular.module('DGBOSS', [
    'ngAnimate',                                                                //ngAnimate, componente angular para animar los ng-show
    'angular-loading-bar',                                                      //angular-loading-bar, loading-bar del angular.
    'ui.bootstrap.datetimepicker',                                              //datetimepicker, componente date del angular.
    'ui.mask',
    'ui.router',                                                                 //ui-mask, Mascara para los inputs
    'ngCookies',
    'ui.utils.masks',                                                            //ui-mask, Mascara para los inputs de monto
    'ngExcel',

    'DGBOSS.authorizationServices',
    'DGBOSS.rolesServices',                                                     //Lista de los servicios de cada módulo
    'DGBOSS.bancoServices',  													                          //de la aplicación DgBoss
    'DGBOSS.aseguradoraServices',
    'DGBOSS.ramoServices',
    'DGBOSS.financiadoraServices',
    'DGBOSS.monedaServices',
    'DGBOSS.aseguradoServices',
    'DGBOSS.empresaServices',
    'DGBOSS.coberturaServices',
    'DGBOSS.usuarioServices',
    'DGBOSS.mainServices',


    //'DGBOSS.mainController',                                                  //Lista de los controladores de cada módulo
    'DGBOSS.loginController',                                                   //de la aplicación DgBoss
    'DGBOSS.inicioController',
    'DGBOSS.usuarioController',
    'DGBOSS.aseguradoController',
    'DGBOSS.rolesController',
    'DGBOSS.aseguradoraController',
    'DGBOSS.bancoController',
    'DGBOSS.monedaController',
    'DGBOSS.ramoController',
    'DGBOSS.financiadoraController',
	  'DGBOSS.productoresController',
    'DGBOSS.siniestroController',
    'DGBOSS.ejecutivoCtaController',
    'DGBOSS.polizasController',
    'DGBOSS.renovacionesController',
    // 'DGBOSS.adminController',
    'DGBOSS.corretajeController',
    'DGBOSS.formularioDirective',
    'DGBOSS.coberturaController',
    'DGBOSS.empresaController',
    'DGBOSS.bonoController',
    'DGBOSS.bonoAsignadoController',
    'DGBOSS.reciboController',
    'DGBOSS.comisionesController',
	  'DGBOSS.cotizacionesController',
    'DGBOSS.facturaController',
    'DGBOSS.letterController',
    'DGBOSS.vehiculoServices',
    'DGBOSS.mainController'

  ]);

  DGBOSS.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('cambiar_clave', {
        url: "/cambiar_clave/:prm",
        templateUrl: './views/cambiarClave.html',
				resolve: {
					auth: ['$state', '$rootScope', '$stateParams', 'mainServices', 'loginServices', function ($state, $rootScope, $stateParams, mainServices, loginServices) {

            // $rootScope.$emit('hideLogin');
            console.log($stateParams.prm);
            // loginServices.urlValidate($stateParams.prm)
            //   .success(function(data){
            //     console.log('success');
            //   })
            //   .error(function(){
            //     console.log('error');
            //   });

            loginServices.urlValidate($stateParams.prm)
              .then(
                function(response){
                  // console.log('dsa');
                  console.log(response);
                  mainServices.setChangePassData(response.data);
                  $rootScope.$emit('hideLogin');
                },
                function(response){
                  // console.log('asd');
                  $rootScope.$emit('toLogin');
                }
              );


						// loginService.validar_url($stateParams.prm)
						// 	.then(
						// 		function(response){
						// 			if(mainService.manejarExcepcion(response.data, response.status)){
						// 				loginService.set_codigo(response.data.codigo);
						// 				loginService.set_email(response.data.email);
						// 			}
						// 			else{
						// 				$state.go('login');
						// 			};
						// 		},
						// 		function(response){
						// 			mainService.manejarExcepcion(response.data, response.status);
						// 			$state.go('login');
						// 		}
						// 	);

					}]
				}
      });
  });

  // function httpInterceptor($q, authService) {
  //   return {
  //     // automatically attach Authorization header
  //     request: function(config) {
  //       var token = authService.getToken();
  //       console.log(token);
  //         if(config.url.indexOf('auth/login') === -1 && token != undefined) {
  //         config.headers.Authorization = 'JWT ' + token;
  //         }
  //       return config;
  //     },

  //     // If a token was sent back, save it
  //     response: function(data) {
  //         console.log('response');
  //         if(data.config.url.indexOf('auth/login') > 0 && data.data.token != undefined) {
  //             console.log('response > if response');
  //             authService.saveToken(data.data.token);
  //         }
  //       return data;
  //     },

  //     responseError: function(rejection) {
  //       console.log('rejection', rejection);
  //         // do something on error
  //         // if (canRecover(rejection)) {
  //         //   return responseOrNewPromise
  //         // }
  //         return $q.reject(rejection);
  //     }
  //   };
  // };

  // DGBOSS.config(['$httpProvider', function($httpProvider){
  //   $httpProvider.interceptors.push('httpInterceptor');
  // }]);

  // DGBOSS.factory('httpInterceptor', httpInterceptor);

  // DGBOSS.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  //   cfpLoadingBarProvider.spinnerTemplate = '<div id="loadingDiv">\
  //                                             <div class="loader">\
  //                                               <div class="wrapperLoader">\
  //                                                 <div class="dgBossLoader"></div>\
  //                                               </div>\
  //                                             </div>\
  //                                            </div>';
  // }]);



  // DGBOSS.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  //   cfpLoadingBarProvider.spinnerTemplate = '<div id="loadingDiv" class="text-center">\
  //                                             <img style="width: 25%;" src="./images/dgBossLogotipo.png">\
  //                                               <div class="cssload-bell">\
  //                                                 <div class="cssload-circle">\
  //                                                   <div class="cssload-inner"></div>\
  //                                                 </div>\
  //                                                 <div class="cssload-circle">\
  //                                                   <div class="cssload-inner"></div>\
  //                                                 </div>\
  //                                                 <div class="cssload-circle">\
  //                                                   <div class="cssload-inner"></div>\
  //                                                 </div>\
  //                                                 <div class="cssload-circle">\
  //                                                   <div class="cssload-inner"></div>\
  //                                                 </div>\
  //                                                 <div class="cssload-circle">\
  //                                                   <div class="cssload-inner"></div>\
  //                                                 </div>\
  //                                               </div>\
  //                                               </br>\
  //                                             LOADING\
  //                                            </div>';

  DGBOSS.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loadingDiv" class="text-center">\
                                              <img style="width: 25%; opacity: 1" src="./images/dgBossLogotipo.png">\
                                              <div class="loading">\
                                                <div class="loading-text">\
                                                  <span class="loading-text-words">L</span>\
                                                  <span class="loading-text-words">O</span>\
                                                  <span class="loading-text-words">A</span>\
                                                  <span class="loading-text-words">D</span>\
                                                  <span class="loading-text-words">I</span>\
                                                  <span class="loading-text-words">N</span>\
                                                  <span class="loading-text-words">G</span>\
                                                </div>\
                                              </div>\
                                             </div>';

  // DGBOSS.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  //   cfpLoadingBarProvider.spinnerTemplate = '<div id="loadingDiv" class="text-center">\
  //                                             <img style="width: 25%;" src="./images/dgBossLogotipo.png">\
  //                                             <div class="wrapperLoader">\
  //                                               <div class="dgBossLoader"></div>\
  //                                             </div>\
  //                                             LOADING\
  //                                            </div>';
  }]);



})();
