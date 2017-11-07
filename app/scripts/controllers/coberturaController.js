(function () {

  'use strict';

  var coberturaController = angular.module('DGBOSS.coberturaController', ['DGBOSS.coberturaServices']);

  coberturaController.controller('coberturaController', ['$scope', '$rootScope', 'coberturaServices', function ($scope, $rootScope, coberturaServices) {

    var self = this;

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      agregarCobertura: false,
      listarCobertura: false,
      editarCobertura: false
    };

    this.formCobertura = {
      id: undefined,
      nombre: undefined,
      tipo: undefined,
      ramo: undefined
    };

    this.estatus = [
      'Activo',
      'Inactivo'
    ];

    //Llenado de comboBox Ramo
    this.ramos = [];

    this.basicaOpcionalCheck = {
      basica: 'iradio_flat-green checked',
      opcional: 'iradio_flat-green'
    };

    this.editarCoberturas = undefined;

    //Lista de coberturas
    this.listaCobertura = [];

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

    this.consultarCoberturaServices = function () {
      console.log('consultarCoberturaServices..');
      var params = {

      };

      coberturaServices.consultarCoberturasByRamo(params)
        .success(function (data) {
          console.log(data);
          self.listaCobertura = [];

/*          if (data.length == 0) {
            new PNotify({
              title: '¡Alerta!',
              text: 'Disculpe. Aún no hay coberturas registradas.',
              type: 'notice',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }*/

          for (var i = 0; i < data.length; i++) {
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

            switch (data[i].txTipoCobertura) {
              case 'O':
                data[i].txTipoCobertura = 'Básica';
                break;
              case 'B':
                data[i].txTipoCobertura = 'Opcional';
                break;
              default:
                break;
            };

            self.listaCobertura.push({
              nombre: data[i].nbCobertura,
              subRamo: data[i].coSubRamo,
              tipo: data[i].txTipoCobertura,
              ramo: data[i].nbRamo,
              coCobertura: data[i].coCobertura,
              estatus: data[i].inEstatus
            });
          };
          console.log(self.listaCobertura);
          if (!$.fn.DataTable.isDataTable('#tablaConsultarCobertura')) {
            self.createTable();
          } else {
            self.destroyTable();
          }

          // self.viewsController('listarcoberturas');

        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          console.log('Error..');

          if (!$.fn.DataTable.isDataTable('#tablaConsultarCobertura')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        });
    };

    this.setUpCombobox = function () {
      console.log('consultarCoberturaServices..');
      var params = {
        idRamo: 0
      };

      coberturaServices.consultarRamos(params)
        .success(function (data) {
          console.log(data);
          self.ramos = [];


          for (var i = 0; i < data.ramos.length; i++) {
            self.ramos.push(data.ramos[i].nbRamo);
          };
          console.log(self.ramos);

          // self.viewsController('listarcoberturas');

        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          console.log('Error..');
        });
    };

    this.agregarCoberturaService = function (option) {

      var params = {};
      switch (option) {
        case 'agregar':
          params = JSON.parse(JSON.stringify(self.formCobertura));
          params.id = 0;
          params.estatus = 1;
          params.inPatrimonial = 0;
          params.txTipoCobertura = self.formCobertura.nombre[0];
          console.log(params);
          break;

        case 'editar':

          params = JSON.parse(JSON.stringify(self.editarCoberturas));
          params.txTipoRamo = self.editarCoberturas.nombre[0];
          console.log(params);

          if (self.editarCoberturas.estatus == 'Activo')
            params.estatus = 1;
          else if (self.editarCoberturas.estatus == 'Inactivo')
            params.estatus = 0
          break;

        default:
          break;
      }
      console.log('antes del servicio');
      coberturaServices.agregarCobertura(params)
        .success(function (data) {
          console.log(data);

          if (data.codigo = 200) {

            switch (option) {
              case 'agregar':
                self.basicaOpcionalSwitch('Básico');
                new PNotify({
                  title: 'Cobertura creada!',
                  text: 'La Cobertura fue creada con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: 'Cobertura Editada!',
                  text: 'La Cobertura fue editada con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              default:
                break;
            };

            self.consultarCoberturaServices();
            self.setObjectElems(self.formCobertura, undefined);
            self.setObjectElems(self.editarcoberturas, undefined);
          } else {

            switch (option) {
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de crear la cobertura.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de editar la cobertura.',
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
        .error(function (data, status, headers, config) {

          new PNotify({
            title: '¡Error!',
            text: data.mensaje,
            //text: 'Ha ocurrido un error en el sistema.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
      console.log('Despues del servicio');
    };

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/
    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'agregarCobertura':
          self.views.agregarCobertura = true;
          break;
        case 'listarCobertura':
          self.views.listarCobertura = true;
          break;
        case 'editarCobertura':
          self.views.editarCobertura = true;
          self.views.listarCobertura = true;
          break;
        default:
          break;
      }
    };

    this.basicaOpcionalSwitch = function (tipoCobertura) {
      switch (tipoCobertura) {
        case 'Básico':
          self.basicaOpcionalCheck.basica = 'iradio_flat-green checked';
          self.basicaOpcionalCheck.opcional = 'iradio_flat-green';
          self.formCobertura.tipo = "Básico";
          break;
        case 'Opcional':
          self.basicaOpcionalCheck.basica = 'iradio_flat-green';
          self.basicaOpcionalCheck.opcional = 'iradio_flat-green checked';
          self.formCobertura.tipo = "Opcional";
          break;
        default:
          break;
      }
    };

    this.cancelarCobertura = function () {
      self.formCobertura.nombre = undefined;
      self.formCobertura.tipo = undefined;
      self.basicaOpcionalSwitch('Básico');
      self.formCobertura.ramo = undefined;

      if (self.views.editarCobertura)
        self.viewsController('listarCobertura');
    };

    this.eliminarCoberturaModal = function (elemt) {
      this.aux = this.listaCobertura.indexOf(elemt);
      self.formCobertura.nombre = elemt.nombre;

      $('.eliminarCoberturaModal').modal({
        show: 'true'
      });
    };

    this.consultarCobertura = function (elemt) {
      $('#consultarCobertura').modal({
        show: 'true'
      });
    };

    this.editarCobertura = function (elemt) {
      /*this.aux = this.listaCobertura.indexOf(elemt);
      this.formCobertura.nombre = elemt.nombre;
      this.basicaOpcionalSwitch(elemt.tipo);
      this.formCobertura.ramo = elemt.ramo;*/
      self.basicaOpcionalSwitch(self.editarCoberturas.tipo);
      self.viewsController('editarCobertura');
    };

    this.eliminarModal = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          //CALL SERVICE
          $('.modal-backdrop').remove();
          $('#tablaConsultarCobertura').DataTable().row('.choosed').remove().draw(false);
          self.listaCobertura.splice(self.aux, 1);
          new PNotify({
            title: 'Cobertura eliminada!',
            text: 'La Cobertura fue eliminada con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.guardarCobertura = function () {
      if (self.views.agregarCobertura) {
        var validatorResult = validator.checkAll($('#agregarCoberturaDatosGenerales'));
        var exitnombre = true;
        /*for(var i = 0; i < self.listaCobertura.length; i++){
            if(self.listaCobertura[i].nombre == self.formCobertura.nombre && self.listaCobertura[i].id != self.formCobertura.id){
              exitnombre = false;
              break;
            }
          }*/
        if (!exitnombre) {
          new PNotify({
            title: 'Error',
            text: 'El nombre ya exite.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }
        if (validatorResult && exitnombre) {

          self.agregarCoberturaService('agregar');
        }
      } else {
        /*self.listaCobertura[this.aux].nombre = self.formCobertura.nombre;
        self.listaCobertura[this.aux].tipo = self.formCobertura.tipo;
        self.listaCobertura[this.aux].ramo = self.formCobertura.ramo;*/
        var validatorResult = validator.checkAll($('#editarCoberturaDatosGenerales'));
        var exitnombre = true;
        /*for(var i = 0; i < self.listaCobertura.length; i++){
            if(self.listaCobertura[i].nombre == self.editarCoberturas.nombre && self.listaCobertura[i].id != self.editarCoberturas.id){
              exitnombre = false;
              break;
            }
          }*/
        if (!exitnombre) {
          new PNotify({
            title: 'Error',
            text: 'El nombre ya exite.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }
        if (validatorResult && exitnombre) {
          console.log(self.editarCoberturas);
          self.editarCoberturas.tipo = self.formCobertura.tipo;
          self.agregarCoberturaService('editar');
          self.viewsController('listarCobertura');
        }
        /*new PNotify({
          title: '¡Cobertura Actualizada!',
          text: 'La cobertura fue actualizada con éxito.',
          type: 'success',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });*/
      }
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $('#inputNombre').on('blur', null, validator.checkField);
    $('#selectRamo').on('blur', null, validator.checkField);
    // acordeon editar Datos Generales
    $('#editarInputNombre').on('blur', null, validator.checkField);
    $('#editarSelectRamo').on('blur', null, validator.checkField);


    $rootScope.$on('agregarCobertura', function () {
      self.setUpCombobox();
      self.consultarCoberturaServices();
      self.viewsController('agregarCobertura');
    });

    $rootScope.$on('listarCobertura', function () {
      self.consultarCoberturaServices();
      self.viewsController('listarCobertura');
    });

    $rootScope.$on('editarCobertura', function () {
      self.viewsController('editarCobertura');
    });


    $('#tablaConsultarCobertura tbody').on('click', 'tr', function () {
      $('#tablaConsultarCobertura').DataTable().$('tr.choosed').removeClass('choosed');
      $(this).addClass('choosed');
    });

    this.destroyTable = function () {
      $('#tablaConsultarCobertura').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTable = function () {
      $('#tablaConsultarCobertura').DataTable({
        data: self.listaCobertura,
        columns: [
          { 'data': 'ramo' },
          { 'data': 'subRamo' },
          { 'data': 'nombre' },
          { 'data': 'tipo' },
          {
            'defaultContent': '<td style="text-align: center;">\
                                <a class="verCobertura cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });
      $('#tablaConsultarCobertura tbody').on('click', '.verCobertura', function () {
        self.coberturaModal = $('#tablaConsultarCobertura').DataTable().row($(this).parents('tr')).data();
        console.log(self.coberturaModal);

        $('.activarModalCobertura').click();
      });

      /*     $('#tablaConsultarCobertura tbody').on( 'click', '.editarCobertura', function () {
              self.editarCoberturas = $('#tablaConsultarCobertura').DataTable().row( $(this).parents('tr') ).data();
          <a class="editarCobertura cursor-pointer" style="margin-right: 10px">\
            <i class="fa fa-pencil"></i>\
          </a>\
          console.log(self.editarCoberturas);
          self.auxIndice = self.listaCobertura.indexOf(self.editarCoberturas);
              self.editarCoberturas.editar = true;
              $('.activarEditarCobertura').click();
            }); */
      /*  	$('#tablaConsultarCobertura tbody').on( 'click', '.eliminarRamo', function () {
              var data = $('#tablaConsultarCobertura').DataTable().row( $(this).parents('tr') ).data();
              //self.nombreEliminarBanco = data.nombre;
              self.editarCoberturas = data;
              console.log(data);
            //  var spanBancoModalText = data.nombre;
              $("#spanRamoModal").text( data.nombre );
              $('.eliminarRamoModal').modal({
                show: 'true'
              });

            });

             $('#tablaConsultarCobertura tbody').on( 'click', 'tr', function () {
              $('#tablaConsultarCobertura').DataTable().$('tr.choosed').removeClass('choosed');
              $(this).addClass('choosed');
            });  */
    };


    $('.cobertura.collapse-link').on('click', function () {

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
