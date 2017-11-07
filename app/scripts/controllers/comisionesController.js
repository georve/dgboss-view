(function () {

  'use strict';

  var comisionesController = angular.module('DGBOSS.comisionesController', ['DGBOSS.comisionServices']);

  comisionesController.controller('comisionesController', ['$scope', '$rootScope', 'comisionServices', 'mainServices', function ($scope, $rootScope, comisionServices, mainServices) {

    var self = this;

    console.log('comisionesController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/
    this.percetageLimit=40;
    this.views = {
      agregarComision: false,
      editarComision: false,
      listarComisiones: false,
      verComision: false
    };

    this.polizas = [];

    this.comisionAgregar = {
      ejecutivo: undefined,
      porcentaje: undefined,
      monto: undefined,
      estatus: undefined,
      fechaCarga: undefined,
    };

    this.comisionVerModal = undefined;

    this.comisionEditar = undefined;

    this.autocompletarIDComisiones = undefined;
    this.autocompletarList = undefined;


    this.comisiones = [];
    this.listaProductores = [];
    this.auxListaProductores = [];
    this.bool = true;
    // variable
    this.productorRif=undefined;


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

    this.consultarComisionesService = function () {
      self.editComi = false;
      console.log('consultar productores');
      self.comisiones=[];
      comisionServices.consultarProductores()
        .success(function (data) {
          self.listaProductores = [];
          self.auxListaProductores = [];
          for (var i = 0; i < data.length; i++) {
            self.listaProductores.push({
              value:data[i],
              data:data[i].nuCedulaRif});
            self.auxListaProductores.push({
              value:data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido,
              data:data[i].nuCedulaRif
            });
            self.auxListaProductores[i].value = self.auxListaProductores[i].value.toUpperCase();
          };
          console.log(self.listaProductores);
          console.log(self.auxListaProductores);
          comisionServices.obtenerPolizas()
            .success(function (data) {
              console.log(data);
              self.polizas = [];

              if (data.length == 0) {
                               new PNotify({
                                  title: '¡Alerta!',
                                  text: 'Disculpe. Aún no hay comisiones registradas.',
                                  type: 'notice',
                                  styling: 'bootstrap3',
                                  cornerclass: 'ui-pnotify-sharp'
                                });
              } else {

                for (var i = 0; i < data.length; i++) {



                  self.polizas.push({
                    numeroPoliza: data[i].numeroPoliza,
                    numeroCertificado: data[i].numeroCertificado,
                    coberturas: data[i].coberturas,
                    fechaEmision: data[i].feEmision,
                    fechaInicio: data[i].feInicio,
                    fechaSuscripcion: data[i].feSubcripcion,
                    fechaVencimiento: data[i].feVencimiento,
                    fechaVigenciaFin: data[i].feVigFin,
                    fechaVigenciaInicio: data[i].feVigInicio,
                    idFrecuenciaPago: data[i].idFreqPago,
                    idMoneda: data[i].idMoneda,
                    nbMoneda: data[i].nbMoneda,
                    identificacion: data[i].nuCiRif,
                    numeroRifAsegurado: data[i].nuRifAsegurado,
                    numeroRifAseguradora: data[i].nuRifAseguradora,
                    nbAseguradora: data[i].nbAseguradora,
                    numeroRifAseguradoTomador: data[i].nuRifAseguradoTomador,
                    nuRifEmpresa: data[i].nuRifEmpresa,
                    coRamo: data[i].coRamo,
                    tipoPago: data[i].tipoPago,
                    tipoPoliza: data[i].tipoPoliza,
                    tiposCoberturas: data[i].tiposCoberturas,
                    totalPrima: data[i].totalPrima,
                    tipoIdentificacion: data[i].txTipoIdentificacion,
                    usuarios: 0,
                    estado: data[i].estado
                  });
                };
              }
              if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
                self.createTable();
              } else {
                self.destroyTable();
              }
              self.viewsController('listarComisiones');
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

              if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
                self.createTable();
              } else {
                self.destroyTable();
              }

            })
        })
        .error(function (data, status, headers, config) {

          if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
            self.createTable();
          } else {
            self.destroyTable();
          }

          new PNotify({
            title: '¡Error de Carga!',
            text: data.mensaje,
            //text: 'Ha ocurrido un error en el sistema.',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });

    };

    this.consultarConComisionesService = function(){
      self.editComi = true;
      self.comisiones=[];
      comisionServices.consultarProductores()
        .success(function (data) {
          self.listaProductores = [];
          self.auxListaProductores = [];
          for (var i = 0; i < data.length; i++) {
            self.listaProductores.push({
              value:data[i],
              data:data[i].nuCedulaRif});
            self.auxListaProductores.push({
              value:data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido,
              data:data[i].nuCedulaRif
            });
            self.auxListaProductores[i].value = self.auxListaProductores[i].value.toUpperCase();
          };
          comisionServices.obtenerPolizasConComisiones()//CAMBIAR LLAMADA DE SERVICIO
            .success(function (data) {
              console.log(data);
              self.polizas = [];

              if (data.length == 0) {
                               new PNotify({
                                  title: '¡Alerta!',
                                  text: 'Disculpe. Aún no hay comisiones registradas.',
                                  type: 'notice',
                                  styling: 'bootstrap3',
                                  cornerclass: 'ui-pnotify-sharp'
                                });
              } else {

                for (var i = 0; i < data.length; i++) {



                  self.polizas.push({
                    numeroPoliza: data[i].numeroPoliza,
                    numeroCertificado: data[i].numeroCertificado,
                    coberturas: data[i].coberturas,
                    fechaEmision: data[i].feEmision,
                    fechaInicio: data[i].feInicio,
                    fechaSuscripcion: data[i].feSubcripcion,
                    fechaVencimiento: data[i].feVencimiento,
                    fechaVigenciaFin: data[i].feVigFin,
                    fechaVigenciaInicio: data[i].feVigInicio,
                    idFrecuenciaPago: data[i].idFreqPago,
                    idMoneda: data[i].idMoneda,
                    nbMoneda: data[i].nbMoneda,
                    identificacion: data[i].nuCiRif,
                    numeroRifAsegurado: data[i].nuRifAsegurado,
                    numeroRifAseguradora: data[i].nuRifAseguradora,
                    nbAseguradora: data[i].nbAseguradora,
                    numeroRifAseguradoTomador: data[i].nuRifAseguradoTomador,
                    nuRifEmpresa: data[i].nuRifEmpresa,
                    coRamo: data[i].coRamo,
                    tipoPago: data[i].tipoPago,
                    tipoPoliza: data[i].tipoPoliza,
                    tiposCoberturas: data[i].tiposCoberturas,
                    totalPrima: data[i].totalPrima,
                    tipoIdentificacion: data[i].txTipoIdentificacion,
                    usuarios: 0,
                    estado: data[i].estado
                  });
                };
              }
              if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
                self.createTableConsulta();
              } else {
                self.destroyTableConsulta();
              }
              self.viewsController('listarComisiones');
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
              self.viewsController('ConsultarComisiones');
              if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
                self.createTableConsulta();
              } else {
                self.destroyTableConsulta();
              }

            })
        })
        .error(function (data, status, headers, config) {

          if (!$.fn.DataTable.isDataTable('#tablaComisionesConsultar')) {
            self.createTableConsulta();
          } else {
            self.destroyTableConsulta();
          }
          self.viewsController('ConsultarComisiones');
          new PNotify({
            title: '¡Error de Carga!',
            text: data.mensaje,
            //text: 'Ha ocurrido un error en el sistema.',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });      
    };
    //Mientras tanto esta llamada..
    //this.consultarComisionesServices();

    this.agregarComisionService = function () {
      var params = [];
      //var params = JSON.parse(JSON.stringify(self.comisiones));
      for (var i = 0; i < self.comisiones.length; i++) {
        params.push({
          id: self.comisiones[i].id,
          numeroPoliza: self.comisionEditar.numeroPoliza,
          numeroRifUsuario: self.comisiones[i].nuCedulaRif,
          montoComision: self.comisiones[i].monto.toString(),
          estatus: parseFloat(self.comisiones[i].estatus),
          fePago: mainServices.revertDate(angular.copy(self.comisiones[i].fechaPago)),
          feCarga: mainServices.revertDate(angular.copy(self.comisiones[i].fechaCarga)),
          coRamo: self.comisionEditar.coRamo,
          nuRifEmpresa: self.comisiones[i].nuRifEmpresa,
          nombreUsuarioApp: self.comisiones[i].nombreUsuarioApp,
          poComision: self.comisiones[i].porcentaje
        });
      };
      console.log(params);

      comisionServices.agregarComision(params)
        .success(function (data) {
          console.log(data);

          if (data.codigo = 200) {

            new PNotify({
              title: '¡Comisión asignada!',
              text: 'La comisión fue asignada con éxito.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
            self.comisiones = [];
            if(!self.editComi)  
              self.consultarComisionesService();
            else
              self.consultarConComisionesService();
            //self.viewsController('listarComisiones');
          } else {

            new PNotify({
              title: '¡Error!',
              text: 'Hubo un error al momento de asignar la comisión.',
              type: 'error',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
    };

		this.constalPolizasService = function () {
			comisionServices.consultarDetallePolizas(self.comisionEditar)
				.success(function (data) {
					self.comisionEditar.adicionales = [];
					self.comisionEditar.beneficiarios = [];
					self.comisionEditar.comisiones = [];
					self.comisionEditar.recibos = [];
					self.comisionEditar.tiposCoberturas = undefined;
					self.comisionEditar.coberturas = [];
          self.comisiones=[];
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							self.comisionEditar.coberturas = JSON.parse(JSON.stringify(data[0].coberturas));
						}
					}
					//se llena adicionales
					if (data[0].adicionales != null) {
						if (data[0].adicionales.length > 0) {
							self.comisionEditar.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.comisionEditar.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
                self.comisionEditar.comisiones = JSON.parse(JSON.stringify(data[0].comisiones));

                for (var i = 0; i < data[0].comisiones.length; i++) {

                 // insertar las comisiones en la lista
                 self.comisiones.push({
                  id:data[0].comisiones[i].id,
                  ejecutivo:data[0].comisiones[i].nbProductor,
                  porcentaje:data[0].comisiones[i].poComision,
                  estatus:data[0].comisiones[i].estatus == "null" ? "1":data[0].comisiones[i].estatus,
                  monto:data[0].comisiones[i].montoComision,
                  fechaPago:data[0].comisiones[i].fePago,
                  fechaCarga:data[0].comisiones[i].feCarga,
                  nombreUsuarioApp:data[0].comisiones[i].nbProductor,
                  nuRifEmpresa:data[0].comisiones[i].nuRifEmpresa,
                  nuCedulaRif:data[0].comisiones[i].numeroRifUsuario
                 });

                };
              self.bool = false;
						}
          }

					//se llena recibos solo del primero
					if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.comisionEditar.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					}
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.comisionEditar.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
          }
          data = undefined;
          console.log('editarCOMi',self.comisionEditar);
				})
				.error(function (data) {
					new PNotify({
						title: 'Error',
						text: data.mensaje,
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				});
		};

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'agregarComision':
          self.views.agregarComision = true;
          console.log('viewsController > agregarComision');
          break;
        case 'editarComision':
          self.views.editarComision = true;
          console.log('viewsController > editarComision');
          break;
        case 'listarComisiones':
          self.views.listarComisiones = true;
          console.log('viewsController > listarComisiones');
          break;
        case 'verComision':
          self.views.verComision = true;
          console.log('viewsController > verComision');
          break;
        default:
          break;
      }
    };

    this.calularComision = function () {
      console.log(self.comisionAgregar.porcentaje);
      console.log(self.comisionEditar.totalPrima);
      self.comisionAgregar.monto = (parseFloat(self.comisionAgregar.porcentaje) * parseFloat(self.comisionEditar.recibos.comision.montoComision)) / 100;
    };

    this.calularPorcentaje = function () {
      console.log(parseFloat(self.comisionEditar.totalPrima));
      self.comisionAgregar.porcentaje = (100 * parseFloat(self.comisionAgregar.monto)) / parseFloat(self.comisionEditar.recibos.comision.montoComision);
      console.log(self.comisionAgregar.porcentaje);
    };
    //CAMBIAR Por posible error, dado la incosistencia de la data la funcion termino asi ....
    this.buscarProductor = function (cedulaRif) {
      for (var i = 0; i < self.listaProductores.length; i++) {

        if(self.listaProductores[i].data==cedulaRif){
            var productor = (self.listaProductores[i].value.nbPrimerNombre + ' ' + self.listaProductores[i].value.nbPrimerApellido).toUpperCase();
          return{
            nbProductor: productor,
            nombreUsuarioApp: self.listaProductores[i].value.nbUsuarioApp,
            nuCedulaRif: self.listaProductores[i].value.nuCedulaRif,
            tipoIdentificacion: self.listaProductores[i].value.inTipoPersona

          }
        };

      }
      return false;
    };

    this.agregarComision = function () {
      var porcentaje = 0;
      var idComision=0;
      var validatorResult = validator.checkAll($('#formularioAgregarComision'));
      if(validatorResult){

          var productor = self.buscarProductor(self.productorRif);
          if(productor){

            //calculate all porcentaje
            for (var i = 0; i < self.comisiones.length; i++) {
              porcentaje = porcentaje + parseInt(self.comisiones[i].porcentaje);
            };

            porcentaje = porcentaje + parseInt(self.comisionAgregar.porcentaje);

            if(porcentaje<=self.percetageLimit){

             console.log(self.comisionAgregar);
             console.log(productor);


            for (var i = 0; i <  self.comisionEditar.comisiones.length; i++) {
                 if( self.comisionEditar.comisiones[i].nbProductor == document.getElementById("formularioAgregarComisionEjecutivodecuentas").value){
                     self.comisionAgregar.fechaCarga = self.comisionEditar.comisiones[i].feCarga;
                     idComision = self.comisionEditar.comisiones[i].id;
                     console.log('Fecha de carga ',self.comisionAgregar.fechaCarga);
                   break;
                 }
               };



              self.comisiones.push({
                id: idComision,
                ejecutivo: productor.nbProductor,
                porcentaje: self.comisionAgregar.porcentaje,
                estatus: self.comisionAgregar.estatus,
                monto: self.comisionAgregar.monto,
                fechaPago: self.comisionAgregar.fechaPago,
                fechaCarga: self.comisionAgregar.fechaCarga,
                nombreUsuarioApp: productor.nombreUsuarioApp,
                nuCedulaRif: productor.nuCedulaRif,
                tipoIdentificacion: productor.tipoIdentificacion,
                nuRifEmpresa: mainServices.getRifEmpresa(),

              });
              document.getElementById("formularioAgregarComisionEjecutivodecuentas").value = '';
              self.comisionAgregar = undefined;



            }else{
              new PNotify({
                title: '¡Error!',
                text: 'El porcentaje de comisión excede el 40%.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
          }else{
            new PNotify({
              title: '¡Error!',
              text: 'El ejecutivo seleccionado no existe.',
              type: 'error',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }
      }else{

        new PNotify({
          title: '¡Error!',
          text: 'Faltan campo obligatorios en las comisiones.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });


      }

    };

    this.verPoliza = function () {

      $('.comisionVer').modal({
        show: 'true'
      });
    };

    this.agregar = function () {
      self.viewsController('editarComision');
      self.constalPolizasService();
    };

    this.guardarComision = function () {
      self.agregarComisionService();
    };

    this.cancelarComision = function () {
      self.cleanDates();
      self.comisionAgregar = undefined;
      self.comisiones = [];
      self.viewsController('listarComisiones');

    };

    this.eliminarComisionFn = function (item) {

      self.itemEliminar = item;
      self.eliminarIndice = self.comisiones.indexOf(item);

      $('.eliminarItemModal').modal({
        backdrop:'static',
        show: 'true'
      });
    }

    this.editarComisionFn=function(item){
      self.comisionAgregar=item;
      self.productorRif = item.nuCedulaRif;
      var index=self.comisiones.indexOf(item);
      self.comisiones.splice(index,1);
    }

    this.eliminarComision2 = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarComisiones').DataTable().row('.choosed').remove().draw(false);
          self.comisiones.splice(self.eliminarIndice, 1);
          new PNotify({
            title: '¡Elemento eliminado!',
            text: 'El elemento fue eliminado con éxito.',
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

    this.cargarDatos = function(){
      for (var i = 0; i <  self.comisionEditar.comisiones.length; i++) {
        console.log('imput ',document.getElementById("formularioAgregarComisionEjecutivodecuentas").value);
        console.log('lista ',self.comisionEditar.comisiones[i].nbProductor);
        if( self.comisionEditar.comisiones[i].nbProductor == document.getElementById("formularioAgregarComisionEjecutivodecuentas").value){
          self.comisionAgregar.fechaCarga = self.comisionEditar.comisiones[i].feCarga;
           console.log('Fecha de carga ',self.comisionAgregar.fechaCarga);
          break;
        }
      };
    };


    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/




    $rootScope.$on('agregarComision', function () {
      self.viewsController('agregarComision');
      //$('#tablaConsultarPolizasComisiones').DataTable().destroy();
    });

    $rootScope.$on('listarComisiones', function () {
      //Servicio, polizas sin comisiones
      self.consultarComisionesService();
      self.cancelarComision();
      //   self.viewsController('listarComisiones');
      //$('#tablaConsultarPolizasComisiones').DataTable();
    });

    $rootScope.$on('ConsultarComisiones', function () {
      //Servicio, polizas con comisiones
      self.consultarConComisionesService();
      self.cancelarComision();
    });

    this.createTable = function () {
      $('#tablaComisionesConsultar').DataTable({
        data: self.polizas,
        aoColumns: [
          { 'data': 'numeroPoliza', sDefaultContent: '' },
          { 'data': 'coRamo', sDefaultContent: '' },
          { 'data': 'nbAseguradora', sDefaultContent: '' },
          { 'data': 'nbMoneda', sDefaultContent: '' },
          { 'data': 'totalPrima', sDefaultContent: '' },
          {
            'defaultContent': '<td style="text-align: center;">\
                                <a class="comisionAgregar cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-plus"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });


      $('#tablaComisionesConsultar tbody').on('click', '.comisionAgregar', function () {
        var editComi = $('#tablaComisionesConsultar').DataTable().row($(this).parents('tr')).data();
        self.comisionEditar = JSON.parse(JSON.stringify(editComi));
        $('.comisionConsultarAgregar').click();
      });
    };

    this.destroyTable = function () {
      $('#tablaComisionesConsultar').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTableConsulta =  function (){
      $('#tablaComisionesConsultar').DataTable({
        data: self.polizas,
        aoColumns: [
          { 'data': 'numeroPoliza', sDefaultContent: '' },
          { 'data': 'coRamo', sDefaultContent: '' },
          { 'data': 'nbAseguradora', sDefaultContent: '' },
          { 'data': 'nbMoneda', sDefaultContent: '' },
          { 'data': 'totalPrima', sDefaultContent: '' },
          {
            'defaultContent': '<td style="text-align: center;">\
                                <a class="comisionAgregar cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });


      $('#tablaComisionesConsultar tbody').on('click', '.comisionAgregar', function () {
        var editComi = $('#tablaComisionesConsultar').DataTable().row($(this).parents('tr')).data();
        self.comisionEditar = JSON.parse(JSON.stringify(editComi));
        
        $('.comisionConsultarAgregar').click();
      });



    };

    this.destroyTableConsulta = function () {
      $('#tablaComisionesConsultar').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTableConsulta();
    };
		// Validaciones para datetimepiker

		this.cambiarFecha = function (id, starDate, Endate) {
			console.log(id);
			$('#' + id).closest('.item')
				.removeClass('bad')
				.find('.alert').remove();
			self.starDate = starDate;
			self.Endate = Endate;
			console.log('starDate', starDate);
			console.log('Endate', Endate);
		};

		this.startDateOnSetTime = function (id) {
			$scope.$broadcast(id);
		};

		this.endDateOnSetTime = function (id) {
			$scope.$broadcast(id);
		};
		this.setStarDate = function ($dates) {
			const todaySinceMidnight = new Date();
			todaySinceMidnight.setUTCHours(0, 0, 0, 0);
			$dates.filter(function (date) {
				return date.utcDateValue >= todaySinceMidnight.getTime();
			}).forEach(function (date) {
				date.selectable = true;
			});

			todaySinceMidnight.setUTCHours(0, 0, 0, 0);
			$dates.filter(function (date) {
				return date.utcDateValue < todaySinceMidnight.getTime();
			}).forEach(function (date) {
				date.selectable = true;
			});
		};

		this.setBeforeDate = function ($dates) {
			const todaySinceMidnight = new Date();
			todaySinceMidnight.setUTCHours(0, 0, 0, 0);
			$dates.filter(function (date) {
				return date.utcDateValue >= todaySinceMidnight.getTime();
			}).forEach(function (date) {
				date.selectable = false;
			});
		};

		this.startDateBeforeRender = function ($dates) {
			if (self.Endate && self.Endate != '') {
				var activeDate = moment(mainServices.revertDate(angular.copy(self.Endate)));
				$dates.filter(function (date) {
					return date.localDateValue() >= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				})
			}
		};

		this.startDateRender = function ($view, $dates) {
			if (self.starDate && self.starDate != '') {
				var activeDate = moment(mainServices.revertDate(angular.copy(self.starDate))).subtract(1, $view).add(1, 'minute');

				$dates.filter(function (date) {
					return date.localDateValue() <= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				})
			}
		};

		this.endDateBeforeRender = function ($view, $dates) {
			if (self.starDate && self.starDate != '') {
				var activeDate = moment(mainServices.revertDate(angular.copy(self.starDate))).subtract(1, $view).add(1, 'minute');

				$dates.filter(function (date) {
					return date.localDateValue() <= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				})
			}
		};

		//Solucion Rapida 	
		this.cleanDates = function(){
			self.cambiarFecha('formularioAgregarFechaComision',undefined,undefined);
			self.cambiarFecha('formularioAgregarFechaCargaComision',undefined,undefined);		
		};
		// Fin de Validaciones para datetimepiker    

    $(".autocompletarIDComisiones").on('click', function (e) {
      self.autocompletarIDComisiones = $(e.target).attr('id');
      //alert("The id of the button that was clicked: "+ self.autocompletarIDComisiones);

      //Switch de autocompletes
      $('#' + self.autocompletarIDComisiones).autocomplete({

        lookup: self.auxListaProductores,
        onSelect: function (suggestion) {
          //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
          self.productorRif = suggestion.data;
          console.log(self.productorRif);
          suggestion = null;
          $('#' + self.autocompletarIDComisiones).closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
        }
      });

    });

    $('.comision.collapse-link').on('click', function () {

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
