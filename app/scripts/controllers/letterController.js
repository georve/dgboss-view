(function(){

  'use strict';

  var letterController = angular.module('DGBOSS.letterController', ['DGBOSS.letterServices', 'DGBOSS.mainServices']);

  letterController.controller('letterController', ['$scope', '$rootScope', 'letterServices', 'mainServices' ,function($scope, $rootScope, letterServices, mainServices){

    var self = this;

    console.log('letterController activated.');

    this.views = {
      agregarCartas: false,
      listarCartas: false,
      emitirCartas: false
    };

    this.nuevoletter={
       title:undefined,
       module:undefined,
       isAutomatic:undefined,
       template:undefined,

    };

    this.parameter={
      name:undefined,
      type:undefined
    };

    this.parameter=[];

    /********************************************************************************************
    **                                      F U N C T I O N S                                  **
    ********************************************************************************************/

    this.setObjectElems = function (obj, option) {
      angular.forEach(obj, function (value, key) {
        obj[key] = option;
      });
    };


    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'agregarCartas':
          self.views.agregarCartas = true;
          console.log('viewsController > agregarCartas');
          break;
        case 'listarCartas':
          self.views.listarCartas = true;
          console.log('viewsController > listarCartas');

          break;
        case 'emitirCartas':
          self.views.emitirCartas = true;
          console.log('viewsController > consultarFactura');
          break;

        default:
          break;
      };
    };





    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/


    $rootScope.$on('agregarCartas', function () {
      console.log('agregarCartas');
      self.viewsController('agregarCartas');
    });

    $rootScope.$on('listarCartas', function () {
     console.log('listarCartas');
       self.viewsController('listarCartas');
    });

    $rootScope.$on('emitirCartas', function () {
      console.log('emitirCartas');
      self.viewsController('emitirCartas');
    });





  }]);

})();
