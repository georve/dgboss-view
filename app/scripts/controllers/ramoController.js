(function(){

  'use strict';

  var ramoController = angular.module('DGBOSS.ramoController', ['DGBOSS.ramoServices']);

  ramoController.controller('ramoController', ['$scope', '$rootScope','ramoServices', function($scope, $rootScope,ramoServices){

    var self = this;

    console.log('ramoController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      agregarRamo: false,
      editarRamo: false,
      listarRamos: false,
      verRamos: false
    };

	this.datos = {
		nombre: undefined
	};
	this.estatus = [
		'Activo',
		'Inactivo'];

	this.editarRamos = undefined;

	this.listaRamos = [];

	this.auxIndice = undefined;

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

    this.consultarRamosServices = function(){
    	console.log('consultarRamosServices..');
      ramoServices.consultarRamos()
        .success(function(data){
          console.log(data);
          self.listaRamos = [];

          if(data.length == 0){
            new PNotify({
              title: '¡Alerta!',
              text: 'Disculpe. Aún no hay Ramos registrados.',
              type: 'notice',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }

          for(var i = 0; i < data.length; i ++){
            switch(data[i].inEstatus){
              case 1:
                data[i].inEstatus = 'Activo';
                break;
              case 0:
                data[i].inEstatus = 'Inactivo';
                break;

            };
            switch(data[i].coRamo){
              case 'PAT':
                data[i].coRamo = 'Patrimonial';
                break;
              case 'PER':
                data[i].coRamo = 'Persona';
                break;
              case 'AUT':
                data[i].coRamo = 'Vehiculo';
                break;
              case 'FIA':
                data[i].coRamo = 'Fianza';
                break;
            };

            self.listaRamos.push({
			  nombre: data[i].nbRamo,
			  coSubRamo: data[i].coSubRamo,
			  coRamo :data[i].coRamo,
			  estatus: data[i].inEstatus
            });
          };
		  console.log(self.listaRamos);
          if(!$.fn.DataTable.isDataTable('#tablaConsultarRamo')){
            self.createTable();
          }else{
            self.destroyTable();
          }

         // self.viewsController('listarRamos');

        })
        .error(function(data, status, headers, config){
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          console.log('Error..');

          if(!$.fn.DataTable.isDataTable('#tablaConsultarRamo')){
            self.createTable();
          }else{
            self.destroyTable();
          }
        });
    };

    this.agregarRamoService = function(option){

      var params = {};

      switch(option){
        case 'agregar':
          params = JSON.parse(JSON.stringify(self.datos));
          params.id = 0;
          params.estatus = 1;
		  params.inPatrimonial = 0;
		  params.txTipoRamo =	self.datos.nombre[0];
		  console.log(params);
          break;

        case 'editar':
          params = JSON.parse(JSON.stringify(self.editarRamos));
          params.id = self.editarRamos.id;
		  params.inPatrimonial = 0;
          params.txTipoRamo =	self.editarRamos.nombre[0];

          if(self.editarRamos.estatus == 'Activo')
            params.estatus = 1;
          else if(self.editarRamos.estatus == 'Inactivo')
            params.estatus = 0
          break;

        default:
          break;
      }
	  console.log('antes del servicio');
      ramoServices.agregarRamo(params)
        .success(function(data){
          console.log(data);

          if(data.codigo = 200){

            switch(option){
              case 'agregar':
					new PNotify({
						title: 'Ramo creado!',
						text: 'El Ramo fue creado con éxito.',
						type: 'success',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
                break;

               case 'editar':
					new PNotify({
						title: 'Ramo Editado!',
						text: 'El Ramo fue editado con éxito.',
						type: 'success',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
                break;

              default:
                break;
            };

            self.consultarRamosServices();
			self.setObjectElems(self.datos, undefined);
			self.setObjectElems(self.editarRamos, undefined);
          }else{

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de crear el ramo.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de editar el ramo.',
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
		console.log('Despues del servicio');
    };


    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/
    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'agregarRamo':
          self.views.agregarRamo = true;
          console.log('viewsController > agregarRamo');
          break;
        case 'editarRamo':
          self.views.editarRamo = true;
          self.views.listarRamos = true;
          console.log('viewsController > editarRamo');
          break;
        case 'listarRamos':
          self.views.listarRamos = true;
          console.log('viewsController > listarRamos');
          break;
        case 'verRamos':
          self.views.verRamos = true;
          console.log('viewsController > verRamos');
          break;
        default:
          break;
      }
    };

	this.consultarRamo = function(){
		  $('.verRamoModal').modal({
			show: 'true'
		  });
	};

	this.editarRamo = function(){
		self.viewsController('editarRamo');
	};

	this.elimnarRamo = function(elemt){
	  console.log('preparando para eliminar');
	  this.auxIndice = this.listaRamos.indexOf(elemt);
      self.datos.nombre = elemt.nombre;

      $('.eliminarRamoModal').modal({
        show: 'true'
      });
	};

    this.eliminarModal = function(opcion){
      switch(opcion){
        case 'aceptar':
          //CALL SERVICE
          $('.modal-backdrop').remove();
          $('#tablaConsultarRamo').DataTable().row('.choosed').remove().draw( false );
          //self.listaRamos.splice(self.auxIndice, 1);
		  self.editarRamos.estatus ='Inactivo';
		  self.agregarRamoService('editar');

		/*
			new PNotify({
				title: '¡Ramo eliminado!',
				text: 'El Ramo fue eliminado con éxito.',
				type: 'success',
				styling: 'bootstrap3',
				cornerclass: 'ui-pnotify-sharp'
			  });
		  */
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

	this.guardar = function(){
		if(self.views.agregarRamo){
			var validatorResult = validator.checkAll($('#ramosDatos'));
			var exitnombre = false;
			if(validatorResult){
				for(var i = 0; i < self.listaRamos.length; i++){
						if(self.listaRamos[i].nombre == self.datos.nombre){
							exitnombre = true;
							break;
						}
					}
				if(exitnombre){
					new PNotify({
						title: 'Error',
						text: 'El nombre ya exite.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}else{
/* 					self.listaRamos.push({
						nombre: self.datos.nombre
					  });	 */

		            self.agregarRamoService('agregar');
				}
			}

		}else{
			var exitnombre = true;
			var validatorResult = validator.checkAll($('#editarRamosDatos'));
				for(var i = 0; i < self.listaRamos.length; i++){
						if(self.listaRamos[i].nombre == self.editarRamos.nombre && self.listaRamos[i].id != self.editarRamos.id){
							exitnombre = false;
							break;
						}
					}
						if(!exitnombre){
							new PNotify({
								title: 'Error',
								text: 'El nombre ya exite.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						}
							if(validatorResult && exitnombre){

								self.agregarRamoService('editar');
								this.viewsController('listarRamos');
							}

					}

		};

	this.cancelar = function(){
		console.log('Vaciado Exitoso');
		self.setObjectElems(self.datos, undefined);
		self.viewsController('listarRamos');
	};
    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarRamo', function(){
	  self.consultarRamosServices();
	  //$('#tablaConsultarRamo').DataTable().destroy();
      self.viewsController('agregarRamo');
    });

    $rootScope.$on('editarRamo', function(){
      self.viewsController('editarRamo');
    });

    $rootScope.$on('listarRamos', function(){
		self.viewsController('listarRamos');
		self.consultarRamosServices();
    });

	$('#nombreRamo').on('blur', null, validator.checkField);
	$('#editarNombreRamo').on('blur', null, validator.checkField);

	this.destroyTable = function(){
      $('#tablaConsultarRamo').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTable = function(){
      $('#tablaConsultarRamo').DataTable({
        data: self.listaRamos,
        aoColumns: [
          { 'data': 'coRamo', sDefaultContent: '' },
		  { 'data': 'nombre', sDefaultContent: '' },
		  { 'data': 'estatus', sDefaultContent: ''},
          { 'defaultContent': '<td style="text-align: center;">\
                                <a class="verRamo cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          {"className": "text-center", "targets": "_all"}
        ]
      });
      $('#tablaConsultarRamo tbody').on( 'click', '.verRamo', function () {
        self.ramoModal = $('#tablaConsultarRamo').DataTable().row( $(this).parents('tr') ).data();
        console.log(self.ramoModal);
        $('.activarModalRamo').click();
        self.consultarRamo();
      });

/*     $('#tablaConsultarRamo tbody').on( 'click', '.editarRamos', function () {
        self.editarRamos = $('#tablaConsultarRamo').DataTable().row( $(this).parents('tr') ).data();
        //self.eliminarModal();
		console.log(self.editarRamos);
		self.auxIndice = self.listaRamos.indexOf(self.editarRamos);
        self.editarRamos.editar = true;
        $('.activarEditarRamo').click();


		<a class="editarRamos cursor-pointer" style="margin-right: 10px">\
		  <i class="fa fa-pencil"></i>\
		</a>\
      });
/*  	$('#tablaConsultarRamo tbody').on( 'click', '.eliminarRamo', function () {
        var data = $('#tablaConsultarRamo').DataTable().row( $(this).parents('tr') ).data();
        //self.nombreEliminarBanco = data.nombre;
        self.editarRamos = data;
        console.log(data);
      //  var spanBancoModalText = data.nombre;
        $("#spanRamoModal").text( data.nombre );
        $('.eliminarRamoModal').modal({
          show: 'true'
        });

      });

       $('#tablaConsultarRamo tbody').on( 'click', 'tr', function () {
        $('#tablaConsultarRamo').DataTable().$('tr.choosed').removeClass('choosed');
        $(this).addClass('choosed');
      });  */
    };


	$('.ramo.collapse-link').on('click', function() {

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
