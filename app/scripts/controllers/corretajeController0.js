(function(){

  'use strict';

  var corretajeController = angular.module('DGBOSS.corretajeController', []);

  corretajeController.controller('corretajeController', ['$scope', '$rootScope', function($scope, $rootScope){

    var self = this;

    console.log('corretajeController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the application view. }
    */
    this.views = {
    admin: true,
    login: false,
    main: false,
    editUsuaCorretajes : false,
    verCorretaje: false

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

		case 'agregarCorretaje':
          self.views.agregarCorretaje = true;
          console.log('viewsController > agregarCorretaje');
		  console.log(self.views.agregarCorretaje);
          break;
		case 'listarCorretajes':
          self.views.listarCorretajes = true;
          console.log('viewsController > listarCorretajes');
		  console.log(self.views.listarCorretajes);
          break;
   case 'editUsuaCorretajes':
          self.views.editUsuaCorretajes = true;
         console.log('viewsController > editUsuaCorretajes');
    		  console.log(self.views.editUsuaCorretajes);
          break;
  case 'verCorretaje':
          self.views.verCorretaje = true;
          console.log('viewsController > verCorretaje');
          console.log(self.views.verCorretaje);
         break;
        default:
          break;
      }
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarCorretaje', function(){
    self.viewsController('agregarCorretaje');
  });

    $rootScope.$on('listarCorretajes', function(){
    self.viewsController('listarCorretajes');
  });

  $rootScope.$on('editUsuaCorretajes', function(){
  self.viewsController('editUsuaCorretajes');
});


  }]);

})();
