(function(){

  'use strict';

  var bancoController = angular.module('DGBOSS.bancoController', ['DGBOSS.bancoServices', 'DGBOSS.mainServices','DGBOSS.inicioServices']);

  bancoController.controller('bancoController', ['$scope', '$rootScope', 'bancoServices', 'mainServices','inicioServices' ,function($scope, $rootScope, bancoServices, mainServices,inicioServices){

    var self = this;

    console.log('bancoController activated.');

    //variables de la listas iniciales


    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      agregarBanco: false,
      editarBanco: false,
      listarBancos: false,
      verBancos: false
    };

    this.nuevoBanco = {
      nombre: undefined,
      codigoBanco: undefined,
      codigoSwift: undefined,
      nacionalidad: undefined
    };

    this.codigoBackUp = undefined;
    this.editarBanco = {
      nombre: undefined,
      codigoBanco: undefined,
      codigoSwift: undefined,
      nacionalidad: undefined
    };

    this.nombreEliminarBanco;
    this.eliminarBanco = undefined;

    this.verBancoModal = undefined;

    this.nacionalidades = [
      { nombre: 'Nacional', valor: 'N' },
      { nombre: 'Extranjero', valor: 'E' }
    ];

    this.estatus = [
      { nombre: 'Activo', valor: 1 },
      { nombre: 'Inactivo', valor: 0 }
    ];

    this.bancos = [];

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
          console.log('valores iniciales after banco update: ', data);

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

    this.consultarBancoService = function(option){
      var params = {
        id: 0,
        nombre: '',
        codigo: 0,
        nacionalidad: '',
        descripcion: ''
      };

      bancoServices.consultarBanco(params)
        .success(function(data){
          console.log(data);
          self.bancos = [];

          if(data.length == 0){
            new PNotify({
              title: '¡Alerta!',
              text: 'Disculpe. Aún no hay bancos registrados.',
              type: 'notice',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }

          for(var i = 0; i < data.length; i ++){

            switch(data[i].txNacionalidad){
              case 'N':
                data[i].txNacionalidad = 'Nacional';
                break;
              case 'E':
                data[i].txNacionalidad = 'Extranjero';
                break;
              default:
                break;
            };

            switch(data[i].estatus){
              case 1:
                data[i].estatus = 'Activo';
                break;
              case 0:
                data[i].estatus = 'Inactivo';
                break;
              default:
                break;
            };

            //TODO : Lista de bancos para el usuario

                self.bancos.push({
                  id: data[i].idBanco,
                  nombre: data[i].nbBanco,
                  nacionalidad: data[i].txNacionalidad,
                  codigoBanco: data[i].coBanco,
                  codigoSwift: data[i].coSwift,
                  estatus: data[i].estatus,
                  editar: false
                });



          };

          if(!$.fn.DataTable.isDataTable('#tablaConsultarBancos')){
            self.createTable();
          }else{
            self.destroyTable();
          }

          console.log('option is: ', option);
          self.viewsController(option);
          // $('#tablaConsultarBancos').DataTable().destroy();
          // $('#tablaConsultarBancos').DataTable();
        })
        .error(function(data, status, headers, config){
          self.viewsController('listarBancos');
          if(!$.fn.DataTable.isDataTable('#tablaConsultarBancos')){
            self.createTable();
          }else{
            self.destroyTable();
          }
        });
    };

    this.agregarBancoService = function(option){

      var params = {};

      switch(option){
        case 'agregar':
          params = JSON.parse(JSON.stringify(self.nuevoBanco));
          params.id = 0;
          params.estatus = 1;
          break;

        case 'editar':
          params = JSON.parse(JSON.stringify(self.editarBanco));
          params.id = self.editarBanco.id;

          if(self.editarBanco.estatus == 'Activo')
            params.estatus = 1;
          else if(self.editarBanco.estatus == 'Inactivo')
            params.estatus = 0
          break;

        default:
          break;
      }

      bancoServices.agregarBanco(params)
        .success(function(data){
          console.log(data);
          self.updateListasIniciales();
          if(data.codigo = 200){

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Banco creado!',
                  text: 'El banco fue creado con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Banco editado!',
                  text: 'El banco fue editado con éxito.',
                  type: 'success',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              default:
                break;
            };


            self.consultarBancoService('listarBancos');
            //self.viewsController('listarBancos');
            self.setObjectElems(self.nuevoBanco, undefined);
            self.setObjectElems(self.editarBanco, undefined);
          }else{

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de crear el banco.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de editar el banco.',
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
    };

    //this.agregarBancoServices

    //Mientras tanto esta llamada..

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'agregarBanco':
          self.views.agregarBanco = true;
          console.log('viewsController > agregarBanco');
          break;
        case 'editarBanco':
          self.views.listarBancos = true;
          self.views.editarBanco = true;
          console.log('viewsController > editarBanco');
          break;
        case 'listarBancos':
          self.views.listarBancos = true;
          console.log('viewsController > listarBancos');
          break;
        case 'verBancos':
          self.views.verBancos = true;
          console.log('viewsController > verBancos');
          break;
        default:
          break;
      }
    };

    this.agregarBanco = function(){
      var validatorResult = validator.checkAll($('#formularioAgregarBanco'));

      if(!self.nuevoBanco.nacionalidad){
        $('#formularioAgregarNacionalidad').blur();
      }

      if(validatorResult){

        var nombreExistente = false, codigoExistente = false, swiftExistente = false;

        for(var i = 0; i < self.bancos.length; i ++){
          if(self.bancos[i].nombre == self.nuevoBanco.nombre){
            nombreExistente = true;
            console.log('Nombre Existente');
            break;
          }else if(self.bancos[i].codigoBanco == self.nuevoBanco.codigoBanco && self.bancos[i].codigoBanco != '' && self.bancos[i].codigoBanco != undefined && self.nuevoBanco.codigobanco != '' && self.nuevoBanco.codigoBanco != undefined){
            codigoExistente = true;
            console.log('Código Existente');
            break;
          }else if(self.bancos[i].codigoSwift == self.nuevoBanco.codigoSwift && (self.nuevoBanco.codigoSwift != undefined && self.nuevoBanco.codigoSwift != '') && (self.bancos[i].codigoSwift != undefined && self.bancos[i].codigoSwift != '')){
            console.log(self.bancos[i].codigoSwift);
            console.log(self.nuevoBanco.codigoSwift);
            swiftExistente = true;
            console.log('Swift Existente');
            break;
          }
        }

        if(nombreExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El nombre del banco ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(codigoExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El código del banco ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else if(swiftExistente){
          new PNotify({
            title: '¡Error!',
            text: 'El código swift ya se encuentra registrado.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }else{

          switch(self.nuevoBanco.nacionalidad){
            case 'Nacional':
              self.nuevoBanco.nacionalidad = 'N';
              break;
            case 'Extranjero':
              self.nuevoBanco.nacionalidad = 'E';
              break;
            default:
              break;
          };

          self.agregarBancoService('agregar');
        }
      }
    };

    this.cancelar = function(){
      self.setObjectElems(self.nuevoBanco, undefined);
      //self.consultarBancoService('listarBancos');
    };

    this.verBanco = function(banco){
      //self.bancoModal = banco;
      // $scope.verBancoModal2 = true;
      $('.verBancoModal').modal({
        show: 'true'
      });
    };

    this.editarBancoFn = function(){


      self.viewsController('editarBanco');
    };

    this.guardarBanco = function(){
      for(var i = 0; i < self.bancos.length; i ++){
        if(self.bancos[i].codigoSwift == self.codigoBackUp){
          self.bancos[i] = self.editarBanco;
          self.bancos[i].editar = false;
          break;
        }
      }

      switch(self.editarBanco.nacionalidad){
        case 'Nacional':
          self.editarBanco.nacionalidad = 'N';
          break;
        case 'Extranjero':
          self.editarBanco.nacionalidad = 'E';
          break;
        default:
          break;
      };

      self.agregarBancoService('editar');

    };

    this.cancelarEditarBanco = function(){
      self.viewsController('listarBancos');
      self.editarBanco = undefined;

      for(var i = 0; i < self.bancos.length; i ++){
        if(self.bancos[i].codigoSwift== self.codigoBackUp){
          self.bancos[i].editar = false;
          break;
        }
      }
    };

    this.eliminarBancoFn = function(banco){
      // self.nombreEliminarBanco = banco.nombre;
      // self.eliminarBanco = banco;
      $('.eliminarBancoModal').modal({
        show: 'true'
      });
    };

    this.eliminarModal = function(opcion){
      switch(opcion){
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarBancos').DataTable().row('.choosed').remove().draw( false );
          for(var i = 0; i < self.bancos.length; i ++){
            if(self.bancos[i].codigoSwift== self.eliminarBanco.codigo){
              self.bancos[i].editar = false;
              self.bancos.splice(i, 1);
              break;
            }
          }
          new PNotify({
            title: '¡Banco eliminado!',
            text: 'El banco fue eliminado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          console.log(self.bancos);
          break;
        case 'cancelar':
          console.log('on cancelar');
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.destroyTable = function(){
      $('#tablaConsultarBancos').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };



    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    // $('#tablaConsultarBancos').DataTable().draw( false );

    $rootScope.$on('agregarBanco', function(){
      self.setObjectElems(self.nuevoBanco, undefined);
      self.consultarBancoService('agregarBanco');
    });

    $rootScope.$on('editarBanco', function(){
      self.viewsController('editarBanco');
    });

    $rootScope.$on('listarBancos', function(){
      self.consultarBancoService('listarBancos');
    });

    $('#formularioAgregarBancoNombre').on('blur', null, validator.checkField);
    // $('#formularioAgregarCodigoBanco').on('blur', null, validator.checkField);
    // $('#formularioAgregarBancoSwift').on('blur', null, validator.checkField);
    $('#formularioAgregarNacionalidad').on('blur', null, validator.checkField);



    this.createTable = function(){

      var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verSiniestro cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editBanc' && permisos[i].inEstatus == 1){
          console.log('asd');
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
        console.log('dsa');
				acciones = '<td style="text-align: center;">\
                                <a class="verBanco cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarBanco cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}

      $('#tablaConsultarBancos').DataTable({
        data: self.bancos,
        aoColumns: [
          { 'data': 'nombre' , sDefaultContent: ''},
          { 'data': 'nacionalidad' , sDefaultContent: ''},
          { 'data': 'estatus', sDefaultContent: '' },
          { 'defaultContent': acciones }

        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });

      $('#tablaConsultarBancos tbody').on( 'click', '.verBanco', function () {
        self.bancoModal = $('#tablaConsultarBancos').DataTable().row( $(this).parents('tr') ).data();
        console.log(self.bancoModal);
        // $("#verBancoModalCodigo").text( data.codigoSwift);
        // $("#verBancoModalNombre").text( data.nombre );
        // $("#verBancoModalNacionalidad").text( data.nacionalidad );

        //self.verBancoModal = data;
        $('.activarModal').click();
        self.verBanco(self.bancoModal);
      });

      $('#tablaConsultarBancos tbody').on( 'click', '.editarBanco', function () {
        self.editarBanco = $('#tablaConsultarBancos').DataTable().row( $(this).parents('tr') ).data();
        //self.eliminarModal();
        self.editarBanco.editar = true;
        $('.activarEditarBanco').click();
      });

      $('#tablaConsultarBancos tbody').on( 'click', '.eliminarBanco', function () {
        var data = $('#tablaConsultarBancos').DataTable().row( $(this).parents('tr') ).data();
        self.nombreEliminarBanco = data.nombre;
        self.eliminarBanco = data;
        console.log(data);
        var spanBancoModalText = data.nombre;
        $("#spanBancoModal").text( spanBancoModalText );
        $('.eliminarBancoModal').modal({
          show: 'true'
        });

      });

      $('#tablaConsultarBancos tbody').on( 'click', 'tr', function () {
        $('#tablaConsultarBancos').DataTable().$('tr.choosed').removeClass('choosed');
        $(this).addClass('choosed');
      });
    };

    // $('#formularioAgregarBancoNombre').on('blur', null, validator.checkField);
    // $('#formularioAgregarBancoSwift').on('blur', null, validator.checkField);
    // $('#formularioAgregarBancoDescripcion').on('blur', null, validator.checkField);

    $('.banco.collapse-link').on('click', function() {

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
