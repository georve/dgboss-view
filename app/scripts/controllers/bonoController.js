(function(){

  'use strict';

  var bonosController = angular.module('DGBOSS.bonoController', ['DGBOSS.bonoServices']);

  bonosController.controller('bonoController', ['$scope', '$rootScope','bonoServices', function($scope, $rootScope, bonoServices){

    var self = this;

    console.log('bonoController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    this.views = {
      agregarBono: false,
      listarBonos: false,
      editarBono: false
    };

    this.vista = undefined;

    this.bonoAgregar = {
      //id: undefined,
      nombre: undefined,
      codigo: undefined,
      descripcion: undefined
      //estatus: undefined
    };

    this.listaBonos = [];

    this.bonoModalVer = [];

    this.bonoEditar = [];

    this.bonoModalEliminar = [];



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

    this.consultarBonoService = function(){
    	console.log('consultarBonoService..');
		var params = {
				id: 0,
				codigoBono: '',
				nombreBono: '',
        descripcionBono:'',
        estatus: ''
    };

		bonoServices.consultarBono(params)
        .success(function(data){
          console.log(data);

          //if(data.codigo == 200){

            self.listaBonos = [];

            if(data.length == 0){
              if(self.vista == 'consultar'){
                new PNotify({
                  title: '¡Alerta!',
                  text: 'Disculpe. Aún no hay bonos registrados.',
                  type: 'notice',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
              }
            } else {

              for(var i = 0; i < data.length; i ++){

                if(data[i].estatus == 1)
                  data[i].estatus = 'Activo';
                else if(data[i].estatus == 0)
                  data[i].estatus = 'Inactivo';

                self.listaBonos.push({
                  id: data[i].id,
                  codigo: data[i].codigoBono,
                  nombre: data[i].nombreBono,
                  descripcion: data[i].descripcionBono,
                  estatus: data[i].estatus
                });

              };


            if(self.vista == 'consultar'){
              if(!$.fn.DataTable.isDataTable('#tablaBonoConsultar')){
                self.createTable();
              }else{
                self.destroyTable();
              }

              self.viewsController('listarBonos');
            }
          }

          /*}else{

            switch(self.vista){
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de iniciar el módulo "Agregar Moneda".',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                self.vista = undefined;
                break;

              case 'consultar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de iniciar el módulo "Consultar Moneda".',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                self.vista = undefined;
                break;

              default:
                break;
            };

          }*/
        })
        .error(function(data, status, headers, config){

          switch(self.vista){
            case 'consultar':

              new PNotify({
                title: '¡Error!',
                text: data.mensaje,
                //text: 'Ha ocurrido un error en el sistema.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });

              if(!$.fn.DataTable.isDataTable('#tablaBonoConsultar')){
                self.createTable();
              }else{
                self.destroyTable();
              }
              break;

            default:
              break;
          }
        })

      };

      this.agregarBonoService = function(option){

        var params = {};

        switch(option){
          case 'agregar':
            params = JSON.parse(JSON.stringify(self.bonoAgregar));

            params.id = 0;
            params.estatus = 1;
            break;

          case 'editar':
            params = JSON.parse(JSON.stringify(self.bonoEditar));

            if(self.bonoEditar.estatus == 'Activo')
              params.estatus = 1;
            else if(self.bonoEditar.estatus == 'Inactivo')
              params.estatus = 0;
            break;

          case 'eliminar':
            params = JSON.parse(JSON.stringify(self.bonoEliminar));
            params.estatus = 0;
            break;

          default:
            break;
        }

        bonoServices.agregarBono(params)
          .success(function(data){
            console.log(data);

            if(data.codigo = 200){

              switch(option){
                case 'agregar':
                  new PNotify({
                    title: '¡Bono creado!',
                    text: 'El bono fue creado con éxito.',
                    type: 'success',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  break;

                case 'editar':
                  new PNotify({
                    title: '¡Bono editado!',
                    text: 'El bono fue editado con éxito.',
                    type: 'success',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  break;

                case 'eliminar':
                  new PNotify({
                    title: '¡Bono eliminado!',
                    text: 'El bono fue eliminado con éxito.',
                    type: 'success',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  break;

                default:
                  break;
              };

              self.consultarBonoService();
              //self.setObjectElems(self.agregarMoneda, undefined);
              self.setObjectElems(self.editarMoneda, undefined);

            }else{

              switch(option){
                case 'agregar':
                  new PNotify({
                    title: '¡Error!',
                    text: 'Hubo un error al momento de crear el bono.',
                    type: 'error',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  break;

                case 'editar':
                  new PNotify({
                    title: '¡Error!',
                    text: 'Hubo un error al momento de editar el bono.',
                    type: 'error',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  break;

                case 'eliminar':
                  new PNotify({
                    title: '¡Error!',
                    text: 'Hubo un error al momento de eliminar el bono.',
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

         }


    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/
    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'agregarBono':
          self.views.agregarBono = true;
          console.log('viewsController > agregarBono');
          break;
        case 'editarBono':
          self.views.listarBonos = true;
          self.views.editarBono = true;
          console.log('viewsController > editarBono');
          break;
        case 'listarBonos':
          self.views.listarBonos = true;
          console.log('viewsController > listarBonos');
          break;
        default:
          break;
      }
    };

    this.agregarBono = function(){
      var validatorResult = validator.checkAll($('#formularioBonoAgregar'));

      if(validatorResult){

        var nombreExistente = false, codigoExistente = false;

        for(var i = 0; i < self.listaBonos.length; i ++){
          if(self.listaBonos[i].nombre == self.bonoAgregar.nombre){
            nombreExistente = true;
            console.log('Nombre Existente');
            break;
          }else if(self.listaBonos[i].codigo == self.bonoAgregar.codigo){
            codigoExistente = true;
            console.log('Código Existente');
            break;
          }
        }

        if(nombreExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El nombre del bono ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(codigoExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El código del bono ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{

          if(!self.bonoAgregar.descripcion){
            self.bonoAgregar.descripcion = 'N/A';
          }
          console.log(self.vista);
          self.agregarBonoService(self.vista);

          self.listaBonos.push({
            id: 0,
            nombre: self.bonoAgregar.nombre,
            codigo: self.bonoAgregar.codigo,
            descripcion: self.bonoAgregar.descripcion,
            estatus: self.bonoAgregar.estatus
          });

          self.setObjectElems(self.bonoAgregar, undefined);
        }
      }
    };

    this.verBono = function(){

      $('.bonoVerModal').modal({
        show: 'true'
      });
    };

    this.editarBono = function(){
      self.viewsController('editarBono');
    };

    this.editar = function(){
      var validatorResult = validator.checkAll($('#formularioBonoEditar'));

      if(validatorResult){

        var nombreExistente = false, codigoExistente = false;

        for(var i = 0; i < self.listaBonos.length; i ++){

          if(self.listaBonos[i].id =! self.bonoEditar.id){
            if(self.listaBonos[i].nombre == self.bonoEditar.nombre){
              nombreExistente = true;
              console.log('Nombre Existente');
              break;
            }else if(self.listaBonos[i].codigo == self.bonoEditar.codigo){
              codigoExistente = true;
              console.log('Código Existente');
              break;
            }
          }
        }

        if(nombreExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El nombre del bono ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(codigoExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El código del bono ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{

          if(!self.bonoEditar.descripcion){
            self.bonoEditar.descripcion = 'N/A';
          }
console.log(self.bonoEditar.id);
          self.agregarBonoService('editar');

          //self.setObjectElems(self.bonoEditar, undefined);

          self.viewsController('listarBonos');
        }
      }
    };

    this.eliminarBono = function(){

      $('.bonoEliminarModal').modal({
        show: 'true'
      });
    };

    this.eliminarModal = function(opcion){
      switch(opcion){
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          /*$('.modal-backdrop').remove();
          $('#tablaConsultarMonedas').DataTable().row('.choosed').remove().draw( false );

          for(var i = 0; i < self.listaMonedas.length; i ++){
            if(self.listaMonedas[i].nombreMoneda == self.eliminarMonedaModal.nombreMoneda){
              self.listaMonedas.splice(i, 1);
              break;
            }
          }*/

          self.agregarBonoService('eliminar');

          new PNotify({
            title: '¡bono eliminado!',
            text: 'El bono fue eliminado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.viewsController('listarBonos');
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };


    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarBono', function(){
      self.vista = 'agregar';
      console.log(self.vista);
      self.consultarBonoService();
      self.viewsController('agregarBono');
      console.log('rootScope agregarBono');
      $('#tablaBonoConsultar').DataTable().destroy();
    });

    $rootScope.$on('listarBonos', function(){
      self.vista = 'consultar';
      self.createTable();
      self.viewsController('listarBonos');
      //self.consultarBonoService();
    });

    this.createTable = function(){
      $('#tablaBonoConsultar').DataTable({
        data: self.listaBonos,
        columns: [
          { 'data': 'codigo' },
          { 'data': 'nombre'},
          { 'defaultContent': '<td style="text-align: center;">\
                                <a class="bonoVerModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="bonoEditar" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                                <a class="bonoEliminarModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-trash-o"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          {"className": "text-center", "targets": "_all"}
        ]
      });

      $('#tablaBonoConsultar tbody').on( 'click', '.bonoVerModal', function () {
        self.bonoModalVer = $('#tablaBonoConsultar').DataTable().row( $(this).parents('tr') ).data();
        $('.bonosConsultarVer').click();
      });

      $('#tablaBonoConsultar tbody').on( 'click', '.bonoEditar', function () {
        self.bonoEditar = $('#tablaBonoConsultar').DataTable().row( $(this).parents('tr') ).data();
        console.log(self.bonoEditar.id);
        $('.bonosConsultaEditar').click();
      });

      $('#tablaBonoConsultar tbody').on( 'click', '.bonoEliminarModal', function () {
        self.bonoEliminar = $('#tablaBonoConsultar').DataTable().row( $(this).parents('tr') ).data();
        $('.bonosConsultarEliminar').click();
      });

      $('#tablaBonoConsultar tbody').on( 'click', 'tr', function () {
        $('#tablaBonoConsultar').DataTable().$('tr.choosed').removeClass('choosed');
        $(this).addClass('choosed');
      });

    };

    this.destroyTable = function(){
      $('#tablaBonoConsultar').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

  }]);

})();
