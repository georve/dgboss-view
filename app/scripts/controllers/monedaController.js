(function(){

  'use strict';

  var monedaController = angular.module('DGBOSS.monedaController', ['DGBOSS.monedaServices', 'DGBOSS.mainServices','DGBOSS.inicioServices']);

  monedaController.controller('monedaController', ['$scope', '$rootScope', 'mainServices', 'monedaServices', 'inicioServices',function($scope, $rootScope, mainServices, monedaServices,inicioServices){

    var self = this;

    console.log('monedaController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

	this.aux = undefined;

    this.vista = undefined;

    this.views = {
      agregarMoneda: false,
      editarMoneda: false,
      listarMonedas: false,
      verMonedas: false
    };

    this.agregarMoneda = {
      idMoneda:undefined,
      nombreMoneda: undefined,
      resumenMoneda: undefined,
      estatusMoneda:undefined
    };

    this.listaMonedas = [];

    this.autoCompletarDatos = {
      data: undefined,
      selectedItem: undefined,
      searchText: undefined
    };

    this.monedaModalVer = [];
    this.editarMoneda = [];
    this.monedaModalEliminar = [];

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



        this.updateListasIniciales=function(){
          inicioServices.listasInicialesService()
            .success(function(data){
              console.log('valores iniciales after moneda update: ', data);

              mainServices.setAseguradoras(data.aseguradoras);
              mainServices.setBancos(data.bancos);
              mainServices.setMarcasVehiculos(data.marcasVehiculo);
              mainServices.setMonedas(data.monedas);
              mainServices.setPaises(data.paises);
              mainServices.setRamos(data.ramos);
              mainServices.setTiposSiniestros(data.tiposSiniestros);

            })
            .error(function(data, status, headers, config, ){
              console.log(data);
            });
        }

    this.consultarMonedasService = function(){
        console.log('consultarMonedasService..');
        var params = {
            idMoneda: 0,
            resumenMoneda: '',
            nombreMoneda: '',
            estatusMoneda: ''
        };

        monedaServices.consultarMonedas(params)
        .success(function(data){
            console.log(data);

            self.listaMonedas = [];

            if(data.length == 0 ){

            } else {

                for(var i = 0; i < data.length; i ++){

                    self.listaMonedas.push({
                        idMoneda: data[i].idMoneda,
                        nombreMoneda: data[i].nbMoneda,
                        resumenMoneda: data[i].txSimbolo,
                        estatusMoneda: data[i].estatus
                    });
                };
            }

            self.viewsController('agregarMoneda');
        })
        .error(function(data, status, headers, config){

            new PNotify({
                title: '¡Error!',
                text: data.mensaje,
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
            });
        })

    };

    this.agregarMonedaService = function(option){

        var params = {};

        if(self.views.agregarMoneda){

            params={
              idMoneda:0,
              estatusMoneda:1,
              nombreMoneda: self.agregarMoneda.nombreMoneda,
              resumenMoneda:self.agregarMoneda.resumenMoneda

            };

        }else if(self.views.editarMoneda){
            self.editarMoneda.estatusMonedaString = undefined;
            params = JSON.parse(JSON.stringify(self.editarMoneda));
            params.idMoneda = self.editarMoneda.idMoneda;

            //if(self.editarMoneda.estatusMoneda == 'Activo')
            params.estatusMoneda = self.editarMoneda.estatusMoneda ;
          //  else if(self.editarMoneda.estatusMoneda == 'Inactivo')
          //    params.estatus = 0
          }


        monedaServices.agregarMoneda(params)
          .success(function(data){
            console.log(data);

            self.updateListasIniciales();
            if(self.views.agregarMoneda){

                  new PNotify({
                    title: '¡Moneda creada!',
                    text: 'La moneda fue creada con éxito.',
                    type: 'success',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  self.setObjectElems(self.agregarMoneda, undefined);
              }else if(self.views.editarMoneda){

                  new PNotify({
                    title: '¡Moneda editada!',
                    text: 'La moneda fue editada con éxito.',
                    type: 'success',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  self.setObjectElems(self.editarMoneda, undefined);
              };
              self.consultarMonedasService2();
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

    }

    this.consultarMonedasService2 = function(){
        console.log('consultarMonedasService2..');
        var params = {
            idMoneda: 0,
            resumenMoneda: '',
            nombreMoneda: '',
            estatusMoneda: ''
        };

        monedaServices.consultarMonedas(params)
        .success(function(data){
            console.log(data);
            self.listaMonedas = [];

            if(data.length == 0 ){

                  new PNotify({
                    title: '¡Alerta!',
                    text: 'Disculpe. Aún no hay monedas registradas.',
                    type: 'notice',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
            } else {

                for(var i = 0; i < data.length; i ++){


                    self.listaMonedas.push({
                        idMoneda: data[i].idMoneda,
                        nombreMoneda: data[i].nbMoneda,
                        resumenMoneda: data[i].txSimbolo,
                        estatusMoneda: String(data[i].estatus),
                        estatusMonedaString:  String(data[i].estatus) == '1'? 'Activo':'Inactivo'
                    });
                };
            }

            if (!$.fn.DataTable.isDataTable('#tablaConsultarMonedas')) {

                self.createTable();
            } else {

                self.destroyTable();
            }
            self.viewsController('listarMonedas');
        })
        .error(function(data, status, headers, config){

            if (!$.fn.DataTable.isDataTable('#tablaConsultarMonedas')) {

                self.createTable();
            } else {

                self.destroyTable();
            }
            self.viewsController('listarMonedas');
            new PNotify({

                title: '¡Error!',
                text: data.mensaje,
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
            });
        })

    };

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/
    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'agregarMoneda':
          self.views.agregarMoneda = true;
          console.log('viewsController > agregarMoneda');
          break;
        case 'editarMoneda':
          self.views.editarMoneda = true;
          console.log('viewsController > editarMoneda');
          break;
        case 'listarMonedas':
          self.views.listarMonedas = true;
          console.log('viewsController > listarMonedas');
          break;
        default:
          break;
      };
    };

    this.submit	= function(){

      var validatorResult = validator.checkAll($('#monedaDatos'));
      if(validatorResult){

        var nombreExistente = false, resumenExistente = false;

        for(var i = 0; i < self.listaMonedas.length; i ++){

          if(self.listaMonedas[i].nombreMoneda.toUpperCase() == self.agregarMoneda.nombreMoneda.toUpperCase()){
            nombreExistente = true;
            console.log('Nombre Existente');
            break;
          }else if(self.listaMonedas[i].resumenMoneda.toUpperCase() == self.agregarMoneda.resumenMoneda.toUpperCase()){
            resumenExistente = true;
            console.log('Resumen Existente');
            break;
          }
        }

        if(nombreExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El nombre de la moneda ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(resumenExistente){
          new PNotify({
            title: '¡Error!',
            text: 'La abreviatura de la moneda ya se encuentra registrada.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{

          //******************
          //LLAMAR AL SERVICIO
          //******************
          self.agregarMonedaService();
        }
      }
    };

    this.submit2 = function(){

      var validatorResult = validator.checkAll($('#monedaDatos2'));
      if(validatorResult){

        var nombreExistente = false, resumenExistente = false;

        for(var i = 0; i < self.listaMonedas.length; i ++){

          if(self.listaMonedas[i].idMoneda != self.editarMoneda.idMoneda){

            if(self.listaMonedas[i].nombreMoneda.toUpperCase() == self.editarMoneda.nombreMoneda.toUpperCase()){

              nombreExistente = true;
              console.log('Nombre Existente');
              break;
            }else if(self.listaMonedas[i].resumenMoneda.toUpperCase() == self.editarMoneda.resumenMoneda.toUpperCase()){

              resumenExistente = true;
              console.log('Resumen Existente');
              break;
            }
          }
        }

        if(nombreExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El nombre de la moneda ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(resumenExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El resumen de la moneda ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{

          //******************
          //LLAMAR AL SERVICIO
          //******************
          self.agregarMonedaService();
        }
      }
    };

    this.showTable = function () {

      self.tableVisibility = true;
    };

    this.ver = function(){

      self.views.editarMoneda = false;
      $('.verMonedaModal').modal({
        backdrop:'static',
        show: 'true'
      });
    }

    this.editar = function(tablaItem){
      this.viewsController('editarMoneda');
    };

    this.eliminar = function(tablaItem){

      this.editarMoneda.nombreMoneda = tablaItem.nombreMoneda;
      this.editarMoneda.resumenMoneda = tablaItem.resumenMoneda;
      this.aux = this.tableItems.indexOf(tablaItem);
      self.views.editarMoneda = false;
    }

    this.cancelar = function(){
      self.setObjectElems(self.agregarMoneda, undefined);
      self.setObjectElems(self.editarMoneda, undefined);
    };

    this.eliminarModal = function(opcion){
      switch(opcion){
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarMonedas').DataTable().row('.choosed').remove().draw( false );

          for(var i = 0; i < self.listaMonedas.length; i ++){
            if(self.listaMonedas[i].nombreMoneda == self.eliminarMonedaModal.nombreMoneda){
              self.listaMonedas.splice(i, 1);
              break;
            }
          }

          new PNotify({
            title: '¡Moneda eliminada!',
            text: 'La moneda fue eliminada con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.viewsController('listarMonedas');
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

  	$('#nombreMoneda').on('blur', null, validator.checkField);
    $('#acronimoMoneda').on('blur', null, validator.checkField);
    $('#nombreMoneda2').on('blur', null, validator.checkField);
    $('#acronimoMoneda2').on('blur', null, validator.checkField);

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarMoneda', function(){
      self.setObjectElems(self.agregarMoneda, undefined);
      self.consultarMonedasService();
      self.viewsController('agregarMoneda');
    });

    $rootScope.$on('editarMoneda', function(){
      self.viewsController('editarMoneda');
    });

    $rootScope.$on('listarMonedas', function(){

      self.consultarMonedasService2();
    });

    this.createTable = function(){

      var permisos = mainServices.getPermisos();
      var editar = false;
      var acciones = '<td style="text-align: center;">\
                                <a class="verMonedaModal cursor-pointer" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
      console.log(permisos);

      for(var i = 0; i < permisos.length; i ++){
        if(permisos[i].coPermiso == 'editMoned' && permisos[i].inEstatus == 1){
          editar = true;
          break;
        }
      };

      if(editar || (mainServices.isAdmin() == 1)){
        acciones = '<td style="text-align: center;">\
                                <a class="verMonedaModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarMoneda cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
      }

      $('#tablaConsultarMonedas').DataTable({
        data: self.listaMonedas,
        aoColumns: [
          { 'data': 'nombreMoneda',  sDefaultContent: ''  },
          { 'data': 'resumenMoneda', sDefaultContent: '' },
          { 'data': 'estatusMonedaString', sDefaultContent: '' },
          { 'defaultContent': acciones }
        ],
        columnDefs: [
          {"className": "text-center", "targets": "_all"}
        ]
      });


      //Agregado por Yennifer Grau (Faltaba dicha funcion validar al hacer merge)
      this.destroyTable = function(){
        $('#tablaConsultarMonedas').dataTable().fnDestroy();
        console.log('on destroyTable function..');
        self.createTable();
      };

      $('#tablaConsultarMonedas tbody').on( 'click', '.verMonedaModal', function () {
        self.monedaModalVer = $('#tablaConsultarMonedas').DataTable().row( $(this).parents('tr') ).data();
        console.log(self.monedaModalVer);

        $('.consultarMonedasVer').click();

      });

      $('#tablaConsultarMonedas tbody').on( 'click', '.editarMoneda', function () {
        self.editarMoneda = $('#tablaConsultarMonedas').DataTable().row( $(this).parents('tr') ).data();
        console.log(self.editarMoneda);
        $('.consultarMonedasEditar').click();
      });
      editar = false;

    };

  $('.moneda.collapse-link').on('click', function() {

      var $BOX_PANEL = $(this).closest('.x_panel'),
          $ICON = $(this).find('i'),
          $BOX_CONTENT = $BOX_PANEL.find('.x_content');

      // fix for some div with hardcoded fix class
      if ($BOX_PANEL.attr('style')) {
        $BOX_CONTENT.slideToggle(200, function(){
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
