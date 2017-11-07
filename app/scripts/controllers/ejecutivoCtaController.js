(function(){

  'use strict';

  var producersController = angular.module('DGBOSS.ejecutivoCtaController', []);

  producersController.controller('ejecutivoCtaController', ['$scope', '$rootScope', function($scope, $rootScope){

    var self = this;

    console.log('ejecutivoCtaController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/


    this.views = {
	  agregarEjecutivoCta: false,
	  listarEjecutivoCta: false,
    verEjecutivo: false

    };

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

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){

        case 'agregarEjecutivoCta':
          self.views.agregarEjecutivoCta = true;
		  console.log('viewsController > agregarEjecutivoCta');
          break;
        case 'listarEjecutivoCta':
          self.views.listarEjecutivoCta = true;
		  console.log('viewsController > listarEjecutivoCta');
          break;
      case 'verEjecutivo':
            self.views.verEjecutivo = true;
            console.log('viewsController > verEjecutivo');
            break;
        default:
          break;
      }
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/
      $rootScope.$on('agregarEjecutivoCta', function(){
      self.viewsController('agregarEjecutivoCta');
    });

	 $rootScope.$on('listarEjecutivoCta', function(){
      self.viewsController('listarEjecutivoCta');
    });



  }]);

})();
