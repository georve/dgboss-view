(function(){

  'use strict';

  var adminController = angular.module('DGBOSS.adminController', []);

  adminController.controller('adminController', ['$scope', '$rootScope', function($scope, $rootScope){

    var self = this;

    console.log('adminController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the application view. }
    */
    this.views = {
    admin: true,
    login: false,
    main: false

    };

    this.sidebarMenu = {
      inicio: false,
      agregarUsuarios: false,
      listarUsuarios: false,
      agregarCorretaje: false,
      listarCorretajes: false,
      editUsuaCorretajes: false

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

    this.sidebarAdminController = function(option){
      console.log('on sidebarAdminController function.');
      self.setObjectElems(self.sidebarMenu, false);

      switch(option){
    		case 'agregarUsuarios':
          self.sidebarMenu.agregarUsuarios = true;
          $rootScope.$emit('agregarUsuarios');
  		    console.log('sidebarAdminController > agregarUsuarios');
          break;
	      case 'listarUsuarios':
          self.sidebarMenu.listarUsuarios = true;
		      $rootScope.$emit('listarUsuarios');
		      console.log('sidebarAdminController > listarUsuarios');
          break;
        case 'agregarCorretaje':
            self.sidebarMenu.agregarCorretaje = true;
            $rootScope.$emit('agregarCorretaje');
    		    console.log('sidebarAdminController > agregarCorretaje');
            break;
  	    case 'listarCorretajes':
            self.sidebarMenu.listarCorretajes = true;
  		      $rootScope.$emit('listarCorretajes');
  		      console.log('sidebarAdminController > listarCorretajes');
            break;
        case 'editUsuaCorretajes':
            self.sidebarMenu.editUsuaCorretajes = true;
      		  $rootScope.$emit('editUsuaCorretajes');
      		  console.log('sidebarAdminController > editUsuaCorretajes');
            break;
        default:
          break;
      }

	  console.log(self.sidebarMenu);
    }

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarUsuarios', function(){
    self.viewsController('agregarUsuarios');
  });

    $rootScope.$on('listarUsuarios', function(){
    self.viewsController('listarUsuarios');
  });

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
