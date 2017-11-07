(function () {

    'use strict';

    var reciboController = angular.module('DGBOSS.reciboController', ['DGBOSS.reciboServices','DGBOSS.polizaServices']);

    reciboController.controller('reciboController', ['$scope', '$rootScope', 'reciboServices', 'mainServices','polizaServices', function ($scope, $rootScope, reciboServices, mainServices,polizaServices) {

        var self = this;

        console.log('reciboController activated.');

        /********************************************************************************************
        **                                      V A R I A B L E S                                  **
        ********************************************************************************************/

        this.views = {
            agregarRecibo: false,
            listarRecibos: false,
            editarRecibo: false,
            repoRecibos:false,
            repoRecibosDetalle: false
        };

        this.tableVisibility = false;
        this.tableVisibility2 = false;

        this.poliza = {

            poliza: undefined,
            aseguradora: undefined,
            ramo: undefined,
            moneda: undefined,
            totalPrima:undefined,
            idFreqPago:undefined,
            recibos: undefined

        };

        this.reciboDatos = {

            //id: 0,
            recibo: undefined,
            poliza: undefined,
            coRamo: undefined,
            tipoRecibo: undefined,
            fechaVigenciaDesde: undefined,
            fechaVigenciaHasta: undefined,
            fechaEmision: undefined,
            fechaRecepcion: undefined,
            montoRecibo: undefined,
            estatusRecibo: undefined,
            inEstatus: undefined,
            isGlobal: undefined,
            numeroCertificado: undefined,
            comision: {
                id: undefined,
                numeroRecibo: undefined,
                montoComision: undefined,
                estatus: undefined,
                fechaPago: undefined,
                fehcaCarga: undefined,
                nuRifEmpresa: undefined,
                nombreUsuarioApp: undefined
            }

        };

        this.tipoReciboOpciones = [

            'Ajuste',
            "Emisión",
            "Renovación",
			"Ajuste-revalorización",
			"Ajuste-modificación",
			"Fraccionamiento",
			"Financiamiento",
			"Modificación-alta",
			"Modificación-baja"
        ];

        this.tipoPolizaOpciones = [

            'AUT',
            'PAT',
            'PER'
        ];

        this.polizaConsulta = undefined;
        this.ramoConsulta = undefined;
        this.numeroCertificado = undefined;
        this.isGlobal = undefined;

        this.tableItems = [];

        this.reciboModalVer = undefined;
        this.reciboEditar = undefined;

        this.mostrarTabla = false;

        this.polizaRecibo = undefined;

        this.modalControl = {
            si:false,
            no:false
        };

        this.recibosPagados = false;
        //this.myModal = undefined;

        this.datoFiltros = {
            nuRifEmpresa: undefined,
            numeroPoliza: undefined,
            coRamo: undefined,
            rifAseguradora: undefined,
            feHasta: undefined, 
            feDesde: undefined
        };  
        
        this.listaReporteRecibos = [];
        this.listaReporteDetalleRecibos =  [];
        this.ListaAseguradoras = [];
        /********************************************************************************************
        **                                       S E R V I C E S                                   **
        ********************************************************************************************/

        this.consultarReciboPolizaService = function () {
            console.log('consultarReciboPolizaService..');

            var params = {};

            if (self.views.agregarRecibo) {

                if (!self.numeroCertificado) {
                    self.numeroCertificado = 0;
                    self.isGlobal = 1;
                }

                params.poliza = self.reciboDatos.poliza;
                params.coRamo = self.reciboDatos.coRamo;
                params.numeroCertificado = self.numeroCertificado;

            } else if (self.views.listarRecibos) {

                if (!self.numeroCertificado) {
                    self.numeroCertificado = 0;
                    self.isGlobal = 1;
                }

                params.poliza = self.polizaConsulta;
                params.coRamo = self.ramoConsulta;
                params.numeroCertificado = self.numeroCertificado;
            }

            params = JSON.parse(JSON.stringify(params));

            reciboServices.consultarPolizaRecibo(params)
                .success(function (data) {
                    console.log(data);

                    //if(data.codigo == 200){

                    if (data.length == 0) {
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La póliza ingresada no se encuentra en el sistema.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else {
                        self.polizaRecibo = JSON.parse(JSON.stringify(data[0]));
                        self.poliza.poliza = data[0].numeroPoliza;
                        self.poliza.aseguradora = data[0].nbAseguradora.toUpperCase();
                        self.poliza.ramo = data[0].nbRamo;
                        self.poliza.moneda = data[0].nbMoneda;
                        self.poliza.asegurado = data[0].nbAsegurado;
                        self.poliza.numeroCertificado = data[0].numeroCertificado;
                        console.log('polizaRecibo',self.polizaRecibo);
                        if (self.views.agregarRecibo) {
                            if (self.polizaRecibo.isGlobal == 1 && self.poliza.numeroCertificado == 0) {
                                self.tableVisibility = true;
                            } else if (self.polizaRecibo.isGlobal == 0 && self.poliza.numeroCertificado != 0 && self.polizaRecibo.tipoPoliza == 'C' && self.numeroCertificado == 0) {
                                new PNotify({
                                    title: '¡Alerta!',
                                    text: 'La póliza ingresada es una colectiva y no posee un recibo global.',
                                    type: 'notice',
                                    styling: 'bootstrap3',
                                    cornerclass: 'ui-pnotify-sharp'
                                });
                                self.tableVisibility = true;
                            } else {
                                self.tableVisibility = true;
                            }
                        }

                        if (self.views.listarRecibos) {
							//if (self.polizaRecibo.tipoPoliza == 'C'){
							/*	if (self.polizaRecibo.isGlobal == 1 && self.poliza.numeroCertificado == 0) {
									self.mostrarTabla = true;
									self.tableVisibility2 = true;
								} else if (self.polizaRecibo.recibos[0].isGlobal == 0 && self.poliza.numeroCertificado != 0 && self.polizaRecibo.tipoPoliza == 'C' && self.numeroCertificado == 0) {
									new PNotify({
										title: '¡Alerta!',
										text: 'La póliza ingresada es una colectiva y no posee un recibo global, ingrese un numero de certificado.',
										type: 'notice',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
								} else {*/
									self.mostrarTabla = true;
									self.tableVisibility2 = true;
								//}
							//}
                        }

                    }
                })
                .error(function (data, status, headers, config) {

                    new PNotify({
                        title: '¡Error!',
                        text: data.mensaje,
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        }

        this.agregarReciboService = function () {

            var params = {};
            if (self.views.agregarRecibo) {

                params = JSON.parse(JSON.stringify(self.reciboDatos));
            } else if (self.views.editarRecibo) {
                console.log(self.reciboEditar);
                params = JSON.parse(JSON.stringify(self.reciboEditar));
               // params.comision.fechaCarga =   mainServices.revertDate(params.comision.fechaCarga);
               // params.comision.fechaPago  =  mainServices.revertDate(params.comision.fechaPago);
            }

            params.fechaEmision =  mainServices.revertDate(params.fechaEmision);
            params.fechaRecepcion =  mainServices.revertDate(params.fechaRecepcion);
            params.fechaVigenciaDesde =  mainServices.revertDate(params.fechaVigenciaDesde);
            params.fechaVigenciaHasta =  mainServices.revertDate(params.fechaVigenciaHasta);


            reciboServices.insertarRecibo(params)
                .success(function (data) {
                    console.log(data);

                    //if(data.codigo = 200){
                     if(self.views.editarRecibo)  {
                        new PNotify({
                            title: '¡Recibo editado!',
                            text: 'El recibo fue editado con éxito.',
                            type: 'success',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                     } else{
                         new PNotify({
                            title: '¡Recibo creado!',
                            text: 'El recibo fue creado con éxito.',
                            type: 'success',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                     }

                    self.mostrarTabla = false;
                    self.polizaConsulta = undefined;
                    self.numeroCertificado = undefined;
                    self.isGlobal = undefined;
                    $('#tablaConsultarRecibos').dataTable().fnDestroy();
                    self.viewsController('listarRecibos');
                    self.cancelarAgregarRecibo();

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

        }

        this.consultarRecibosService = function () {

            if (!self.numeroCertificado) {
                self.numeroCertificado = 0;
                self.isGlobal = 1;
            }

            var params = {

                poliza: self.polizaConsulta,
                coRamo: self.ramoConsulta,
                numeroCertificado: self.numeroCertificado,
                isGlobal: self.isGlobal
            };

            params = JSON.parse(JSON.stringify(params));
            self.tableItems = [];
            reciboServices.consultarRecibo(params)
                .success(function (data) {

                    self.consultarReciboPolizaService();
                    if (data.length == 0) {
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'Disculpe. No se encuentran recibos almacenados en el sistema para esta póliza.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else {
                        for (var i = 0; i < data.length; i++) {

                            self.tableItems.push(data[i]);
                            self.tableItems[i].montoReciboB = mainServices.setCurrency(self.tableItems[i].montoRecibo);

                        };

                        if (!$.fn.DataTable.isDataTable('#tablaConsultarRecibos')) {
                            self.createTable();
                        } else {
                            self.destroyTable();
                        }

                    }
                })
                .error(function (data, status, headers, config) {

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'Disculpe. No se encuentran recibos almacenados en el sistema para esta póliza.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                });

        }

        this.actualizarMontoPrimaServices = function(){
            var params = {
                numeroPoliza:self.polizaRecibo.numeroPoliza,
                numeroCertificado:self.polizaRecibo.numeroCertificado,
                coRamo:self.polizaRecibo.coRamo,
                montoPrima:self.polizaRecibo.totalPrima
            };
            polizaServices.actualizarMontoPrima(params)
            .success(function (data) {
                    new PNotify({
                        title: '¡Actualizado!',
                        text: 'El total prima de la póliza fue actualizado.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                })
            .error(function (data, status, headers, config) {
                new PNotify({
                    title: '¡Alerta!',
                    text: 'Disculpe. En estos momentos no se puede actualizar el total prima de la póliza.',
                    type: 'notice',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                });
                });
        };

        this.consultarReciboReporte = function(datoFiltros){
            self.listaReporteRecibos = [];
           
            var params = {
                nuRifEmpresa: mainServices.getRifEmpresa(),
                numeroPoliza: datoFiltros.numeroPoliza ? datoFiltros.numeroPoliza:'',
                coRamo: datoFiltros.coRamo ? datoFiltros.coRamo:'',
                rifAseguradora: datoFiltros.rifAseguradora ? datoFiltros.rifAseguradora:'',
                feHasta: datoFiltros.feHasta ? mainServices.revertDate(datoFiltros.feHasta):'', 
                feDesde: datoFiltros.feDesde ? mainServices.revertDate(datoFiltros.feDesde):''
            };

            reciboServices.consultarReciboReporte(params)
                .success(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        self.listaReporteRecibos.push(data[i]);
                        self.listaReporteRecibos[i].coRamo = self.listaReporteRecibos[i].coRamo == 'PAT' ? 'Patrimonial': self.listaReporteRecibos[i].coRamo == 'AUT' ? 'Automovil':'Persona';
                        //nombre de la aseguradora
                    };

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarRecibosReporte')) {
                        self.createTableReporteRecibo();
                    } else {
                        self.destroyTableReporteRecibo();
                    }
                })
                .error(function (data, status, headers, config) {
                    if (!$.fn.DataTable.isDataTable('#tablaConsultarRecibosReporte')) {
                        self.createTableReporteRecibo();
                    } else {
                        self.destroyTableReporteRecibo();
                    }
                    new PNotify({
                        title: '¡Alerta!',
                        text: data.mensaje,
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                });
            
            self.viewsController('repoRecibos');
        };

        this.consultarReciboReporteDetalle = function(reciboReporteConsulta){
           self.listaReporteDetalleRecibos = [];
           
            var params = {
                nuRifEmpresa: mainServices.getRifEmpresa(),
                numeroPoliza: reciboReporteConsulta.numeroPoliza ? reciboReporteConsulta.numeroPoliza:'',
                coRamo: reciboReporteConsulta.coRamo == 'Patrimonial' ? 'PAT': reciboReporteConsulta.coRamo == 'Automovil' ? 'AUT':'PER',
                numeroRecibo: reciboReporteConsulta.numeroRecibo ? reciboReporteConsulta.numeroRecibo:'',
               // rifAseguradora: reciboReporteConsulta.rifAseguradora ? reciboReporteConsulta.rifAseguradora:'',
            };

            reciboServices.consultarReciboReporteDetalle(params)
                .success(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        self.listaReporteDetalleRecibos.push(data[i]);
                        self.listaReporteDetalleRecibos[i].ramo = self.listaReporteDetalleRecibos[i].ramo == 'PAT' ? 'Patrimonial': self.listaReporteDetalleRecibos[i].ramo == 'AUT' ? 'Automovil':'Persona';
                        self.listaReporteDetalleRecibos[i].monto = mainServices.setCurrency(self.listaReporteDetalleRecibos[i].monto);
                        self.listaReporteDetalleRecibos[i].fechaOperacion = mainServices.revertDate(self.listaReporteDetalleRecibos[i].fechaOperacion);
                    };
                
                    if (!$.fn.DataTable.isDataTable('#tablaConsultarRecibosReporteDetalle')) {
                        self.createTableReporteReciboDetalle();
                    } else {
                        self.destroyTableReporteReciboDetalle();
                    }
                })
                .error(function (data, status, headers, config) {
                    if (!$.fn.DataTable.isDataTable('#tablaConsultarRecibosReporteDetalle')) {
                        self.createTableReporteReciboDetalle();
                    } else {
                        self.destroyTableReporteReciboDetalle();
                    }
                    new PNotify({
                        title: '¡Alerta!',
                        text: data.mensaje,
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                });
            
            self.viewsController('repoRecibos');
        };
        /********************************************************************************************
        **                                      F U N C T I O N S                                  **
        ********************************************************************************************/

        this.setObjectElems = function (obj, option) {
            angular.forEach(obj, function (value, key) {
                obj[key] = option;
            });
        };

        this.buscarPoliza = function () {

            if (self.reciboDatos.poliza == undefined || self.reciboDatos.coRamo == undefined) {

                if (self.views.agregarRecibo)
                    self.tableVisibility = false;
                if (self.views.listarRecibos)
                    self.tableVisibility2 = false;

                if (self.reciboDatos.poliza == undefined) {

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'Ingrese una póliza para su consulta.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                } else if (self.reciboDatos.coRamo == undefined) {

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'Ingrese un ramo para su consulta.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                }
            }

            else {

                if (self.views.agregarRecibo)
                    self.tableVisibility = false;
                if (self.views.listarRecibos)
                    self.tableVisibility2 = false;

                self.consultarReciboPolizaService();
            }
        };

        this.cambiarFecha = function (option,starDate, Endate) {
            console.log(starDate);
            self.starDate = starDate;
			self.Endate = Endate;
            switch (option) {
                case 'VD':
                    $('#formularioAgregarReciboVigenciaDesde').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'VH':
                    $('#formularioAgregarReciboVigenciaHasta').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'E':
                    $('#formularioAgregarReciboFechaEmision').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'R':
                    $('#formularioAgregarReciboFechaRecepcion').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'VDe':
                    $('#formularioEditarReciboVigenciaDesde').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'VHe':
                    $('#formularioEditarReciboVigenciaHasta').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'Ee':
                    $('#formularioEditarReciboFechaEmision').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                case 'Re':
                    $('#formularioEditarReciboFechaRecepcion').closest('.item')
                        .removeClass('bad')
                        .find('.alert').remove();
                    break;
                default:
                    break;
            }
        };

        this.cancelarAgregarRecibo = function () {
            self.cleanDates();
            self.tableVisibility = false;
            self.setObjectElems(self.poliza, undefined);
            self.setObjectElems(self.reciboDatos, undefined);
            self.reciboDatos.comision = {
                id: undefined,
                numeroRecibo: undefined,
                montoComision: undefined,
                estatus: undefined,
                fePago: undefined,
                fechaPago: undefined,
                feCarga: undefined,
                fehcaCarga: undefined,
                nuRifEmpresa: undefined,
                nombreUsuarioApp: undefined
            };
            self.mostrarTabla = false;
            $('#tablaConsultarRecibos').dataTable().fnDestroy();
            self.viewsController('listarRecibos');

        };

        this.guardarAgregarRecibo = function () {
			console.log('guardarAgregarRecibo--->++++');
            var totalRecibos = 0;
            var totalComisiones = 0;
            var boolRecibos = true;
            var boolComisiones = true;
            var validatorResult = validator.checkAll($('#formularioAgregarRecibo'));
            if (validatorResult) {

               if(self.validarRecibosPorFrecuenciaPago()){
                 if (self.polizaRecibo.recibos[0].isGlobal == 1) {
                     console.log('guardarAgregarRecibo--->validation global--');

                     self.reciboDatos.isGlobal = 1;
                     self.reciboDatos.numeroCertificado = self.numeroCertificado;
                     self.reciboDatos.estatusRecibo = 'Pendiente';
                     self.reciboDatos.comision.id = 0;
                     self.reciboDatos.comision.numeroRecibo = self.reciboDatos.recibo;
                     self.reciboDatos.comision.nuRifEmpresa = mainServices.getRifEmpresa();
                     self.reciboDatos.comision.nombreUsuarioApp = mainServices.getUser();
                     self.reciboDatos.comision.estatus = 'Pendiente';



                 } else {


                     self.reciboDatos.comision.id = 0;
                     self.reciboDatos.isGlobal = 0;
                     self.reciboDatos.numeroCertificado = self.poliza.numeroCertificado;
                     self.reciboDatos.estatusRecibo = 'Pendiente';
                     self.reciboDatos.comision.numeroRecibo = self.reciboDatos.recibo;
                     self.reciboDatos.comision.nuRifEmpresa = mainServices.getRifEmpresa();
                     self.reciboDatos.comision.nombreUsuarioApp = mainServices.getUser();
                     self.reciboDatos.comision.estatus = 'Pendiente';


                 }

                 for (var i = 0; i < self.polizaRecibo.recibos.length; i++) {
                     totalRecibos = totalRecibos + parseFloat(self.polizaRecibo.recibos[i].montoRecibo);
                     totalComisiones = totalComisiones + self.polizaRecibo.recibos[i].comision.montoComision;
                 }

                 if (parseFloat(self.reciboDatos.montoRecibo + totalRecibos) > parseFloat(self.polizaRecibo.totalPrima)) {
                     new PNotify({
                         title: '¡Alerta!',
                         text: 'El monto de los recibos es mayor al total prima de la póliza.',
                         type: 'notice',
                         styling: 'bootstrap3',
                         cornerclass: 'ui-pnotify-sharp'
                     });
                     boolRecibos = false;
                 }
                 if (((totalComisiones + parseFloat(self.reciboDatos.comision.montoComision)) * 100) / parseFloat(self.polizaRecibo.totalPrima) > 40) {
                     new PNotify({
                         title: '¡Alerta!',
                         text: 'El monto de las comisiones es mayor al 40%.',
                         type: 'notice',
                         styling: 'bootstrap3',
                         cornerclass: 'ui-pnotify-sharp'
                     });
                     boolComisiones = false;
                 }
                 if (boolRecibos && boolComisiones) {
                     if (parseFloat(self.polizaRecibo.totalPrima) < parseFloat(self.reciboDatos.montoRecibo) || parseFloat(self.polizaRecibo.totalPrima) < parseFloat(self.reciboDatos.comision.montoComision)) {
                         if (parseFloat(self.polizaRecibo.totalPrima) < parseFloat(self.reciboDatos.montoRecibo)) {
                             new PNotify({
                                 title: '¡Alerta!',
                                 text: 'El monto del recibo es mayor al total prima de la póliza.',
                                 type: 'notice',
                                 styling: 'bootstrap3',
                                 cornerclass: 'ui-pnotify-sharp'
                             });
                         } else if (parseFloat(self.polizaRecibo.totalPrima) < parseFloat(self.reciboDatos.comision.montoComision)) {
                             new PNotify({
                                 title: '¡Alerta!',
                                 text: 'El monto de la comisión es mayor al total prima de la póliza.',
                                 type: 'notice',
                                 styling: 'bootstrap3',
                                 cornerclass: 'ui-pnotify-sharp'
                             });
                         } else {
                             console.log(self.reciboDatos);
                             self.agregarReciboService();
                         }
                     } else {
                         console.log(self.reciboDatos);
                         self.agregarReciboService();
                     }
                 }



               }else{

                 new PNotify({
                     title: '¡Error!',
                     text: 'La cantidad de recibos emitidas supera la frecuencia de pago.',
                     type: 'error',
                     styling: 'bootstrap3',
                     cornerclass: 'ui-pnotify-sharp'
                 });


               }

            }else {
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hay un campo sin llenar en el formulario de recibos.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
            }
        }

        this.buscarRecibos = function () {

            if (self.polizaConsulta == undefined || self.ramoConsulta == undefined) {

                self.mostrarTabla = false;

                if (self.ramoConsulta == undefined) {

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'Ingrese un ramo para su consulta.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                } else if (self.polizaConsulta == undefined) {

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'Ingrese una póliza para su consulta.',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                }

            }

            else {

                self.mostrarTabla = false;

                self.consultarRecibosService();
            }
        }

        this.createTable = function () {
            var permisos = mainServices.getPermisos();
            var edit = false;
			var htmlButtons ='<td style="text-align: center;">\
                <a style="margin-right: 10px" data-toggle="modal" class="verReciboModal">\
                  <i class="fa fa-search"></i>\
                </a>\
              </td>';

			for( var i = 0; i < permisos.length; i ++ ){
				console.log(mainServices.isAdmin());
				if((permisos[i].coPermiso == 'editRecib' && permisos[i].inEstatus == 1) )
				{	edit = true; break;}
			};
			if (edit || (mainServices.isAdmin() == 1)){
				var htmlButtons ='<td style="text-align: center;">\
                <a style="margin-right: 10px" data-toggle="modal" class="verReciboModal">\
                  <i class="fa fa-search"></i>\
                </a>\
                <a class="editarRecibo cursor-pointer" style="margin-right: 10px">\
                  <i class="fa fa-pencil"></i>\
                </a>\
              </td>';
			}

            $('#tablaConsultarRecibos').DataTable({
                data: self.tableItems,
                aoColumns: [
                    { 'data': 'recibo', sDefaultContent: '' },
                    { 'data': 'poliza', sDefaultContent: '' },
                    { 'data': 'tipoRecibo', sDefaultContent: '' },
                    { 'data': 'montoReciboB', sDefaultContent: '' },
                    {
                        'defaultContent': htmlButtons
                    }
                ],
                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });

            $('#tablaConsultarRecibos tbody').on('click', '.verReciboModal', function () {
                self.reciboModalVer = angular.copy($('#tablaConsultarRecibos').DataTable().row($(this).parents('tr')).data());
                console.log(self.reciboModalVer);
                if (self.reciboModalVer.comision.fechaPago == null)
                    self.reciboModalVer.comision.fechaPago = '';

                $('.consultarRecibosVer').click();
            });

            $('#tablaConsultarRecibos tbody').on('click', '.editarRecibo', function () {
                self.reciboEditar = angular.copy($('#tablaConsultarRecibos').DataTable().row($(this).parents('tr')).data());
                console.log(self.reciboEditar);
				self.reciboEditar.comision = undefined;
                $('.consultarRecibosEditar').click();
            });

            $('#tablaConsultarRecibos tbody').on('click', 'tr', function () {
                $('#tablaConsultarRecibos').DataTable().$('tr.choosed').removeClass('choosed');
                $(this).addClass('choosed');
            });
        };

        this.destroyTable = function () {
            $('#tablaConsultarRecibos').dataTable().fnDestroy();
            console.log('on destroyTable function..');
            self.createTable();
        };

        this.ver = function () {

            $('.verReciboModal').modal({
                show: 'true'
            });
        }

        this.cerrarVer = function () {

            $('.modal-backdrop').remove();
        }

        this.editar = function () {

            self.views.editarRecibo = true;
            self.views.listarRecibos = false;
        }

        this.cancelarEditarRecibo = function () {
            self.cleanDates();
            self.tableVisibility2 = false;
            self.views.editarRecibo = false;
            self.setObjectElems(self.poliza, undefined);
            self.reciboEditar = undefined;
            self.viewsController('listarRecibos');
        };

        this.guardarEditarRecibo = function () {
			console.log('guardarEditarRecibo------>');
            var validatorResult = validator.checkAll($('#formularioEditarRecibo'));
            var bool = true;
            if (validatorResult) {
             //   self.reciboEditar.comision.nuRifEmpresa = mainServices.getRifEmpresa();
             //   self.reciboEditar.comision.nombreUsuarioApp = mainServices.getUser();

                console.log('recibo editado', self.reciboEditar);
                /*
                if(self.reciboEditar.estatusRecibo == 'Pagado' ){
                    if(self.reciboEditar.comision.estatus == 'Pendiente' || self.reciboEditar.comision.estatus == 'Anulado'){
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'El estatus de recibo es pagado, tiene que cambiar el estatus de la comisión a pagado.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        bool= false;
                    }
                }
                if(self.reciboEditar.estatusRecibo == 'Anulado' ){
                    if(self.reciboEditar.comision.estatus == 'Pendiente' || self.reciboEditar.comision.estatus == 'Pagado'){
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'El estatus de recibo es Anulado, tiene que cambiar el estatus de la comisión a Anulado.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        bool= false;
                    }
                } 
                if(self.reciboEditar.estatusRecibo == 'Pendiente' ){
                    if(self.reciboEditar.comision.estatus == 'Pagado' || self.reciboEditar.comision.estatus == 'Anulado'){
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'El estatus de recibo es Pendiente, tiene que cambiar el estatus de la comisión a Pendiente.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        bool= false;
                    }
                }*/
                if(bool){
                    if(self.reciboEditar.estatusRecibo == 'Anulado'){
                        var date = new Date().toJSON().slice(0,10);
                        self.reciboEditar.fechaPago = mainServices.revertDate(date); 
                        console.log(self.reciboEditar.fechaPago );
                    }
                    self.reciboEditar.nombreUsuarioApp = mainServices.getUser();
                    self.agregarReciboService();
                }

            }

        }

        this.validarRecibosPorFrecuenciaPago=function(){
          var frecuenciaPago=0;


          switch(self.polizaRecibo.idFreqPago){
              case 1:
                  frecuenciaPago = 52;
              break;
              case 2:
                  frecuenciaPago = 12;
              break;
              case 3:
                  frecuenciaPago = 4;
              break;
              case 4:
                  frecuenciaPago = 2;
              break;
              case 5:
                  frecuenciaPago = 1;
              break;
          };

          var recibosNoPagados = self.polizaRecibo.recibos.length-frecuenciaPago;

          if(recibosNoPagados >=0) {
            new PNotify({
                title: '¡Alerta!',
                text: 'La cantidad de recibos emitidos excede la máxima cantidad por la frecuencia de pago.',
                type: 'notice',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
            });

          return false;

          }

          return true;


        };

        this.validarMontoPrima = function(){
            self.modalControl = {
                si: false,
                no: false,
            };
            var frecuenciaPago = 0;
            self.recibosPagados = false;

            switch(self.polizaRecibo.idFreqPago){
                case 1:
                    frecuenciaPago = 52;
                break;
                case 2:
                    frecuenciaPago = 12;
                break;
                case 3:
                    frecuenciaPago = 4;
                break;
                case 4:
                    frecuenciaPago = 2;
                break;
                case 5:
                    frecuenciaPago = 1;
                break;
            };
            var montoReciboViejo =  self.polizaRecibo.totalPrima/frecuenciaPago;
            var recibosNoPagados = self.polizaRecibo.recibos.length-frecuenciaPago;


            if(recibosNoPagados < 0){
                  recibosNoPagados=recibosNoPagados*(-1);
            }


            var montoReciboNuevo = (self.polizaRecibo.totalPrima- (self.polizaRecibo.recibos.length * montoReciboViejo))/recibosNoPagados;
            console.log('self.poliza.recibos.length',self.polizaRecibo.recibos.length);
            console.log('montoReciboViejo',montoReciboViejo);
            console.log('recibosNoPagados',recibosNoPagados);
            console.log('montoReciboNuevo',montoReciboNuevo);
            console.log('Frecuencia de pago',frecuenciaPago);



            if((self.reciboDatos.montoRecibo < montoReciboNuevo || self.reciboDatos.montoRecibo > montoReciboNuevo)&&(self.numeroCertificado == 0)){
                $('.actualizarPolizaModal').modal({
                    show: 'true'
                });
            }


        };

        this.setModalControl = function(opcion){
            switch(opcion){
                case 'si':
                    self.modalControl.si = true;
                    break;
                case 'no':
                    self.modalControl.no = true;
                    break;
            };
        };

        this.setMontoRecibo = function(){
            self.reciboDatos.montoRecibo = undefined
        };

        this.setCurrencyModal = function(value){
           return mainServices.setCurrency(value);
        };

        this.createTableReporteRecibo = function () {
			var htmlButtons ='<td style="text-align: center;">\
                <a style="margin-right: 10px" data-toggle="modal" class="verReciboReporteModal">\
                  <i class="fa fa-search"></i>\
                </a>\
              </td>';
            $('#tablaConsultarRecibosReporte').DataTable({
                data: self.listaReporteRecibos,
                aoColumns: [
                    { 'data': 'numeroRecibo', sDefaultContent: '' },
                    { 'data': 'numeroPoliza', sDefaultContent: '' },
                    { 'data': 'aseguradora', sDefaultContent: '' },
                    { 'data': 'coRamo', sDefaultContent: '' },
                    {
                        'defaultContent': htmlButtons
                    }
                ],
                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });

            $('#tablaConsultarRecibosReporte tbody').on('click', '.verReciboReporteModal', function () {
                self.reciboReporteConsulta = angular.copy($('#tablaConsultarRecibosReporte').DataTable().row($(this).parents('tr')).data());
                self.consultarReciboReporteDetalle(self.reciboReporteConsulta);    
            });
        };

        this.destroyTableReporteRecibo = function () {
            $('#tablaConsultarRecibosReporte').dataTable().fnDestroy();
            self.viewsController('repoRecibos');
            self.createTableReporteRecibo();
        };        

        this.createTableReporteReciboDetalle = function(){
           self.viewsController('repoRecibosDetalle');
           $('#tablaConsultarRecibosReporteDetalle').DataTable({
                data: self.listaReporteDetalleRecibos,
                aoColumns: [
                    { 'data': 'fechaOperacion', sDefaultContent: '' },
                    { 'data': 'numeroPoliza', sDefaultContent: '' },
                    { 'data': 'ramo', sDefaultContent: '' },
                    { 'data': 'usuario', sDefaultContent: '' },
                    { 'data': 'monto', sDefaultContent: '' },
                    { 'data': 'operacion', sDefaultContent: '' },
                    { 'data': 'observaciones', sDefaultContent: '' },
                ],
                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });
        };

        this.destroyTableReporteReciboDetalle = function () {
            $('#tablaConsultarRecibosReporteDetalle').dataTable().fnDestroy();
            self.createTableReporteReciboDetalle();
        }; 

        this.consultarRecibo = function (){
            var bool = true;
            if(self.datoFiltros.rifAseguradora != undefined ||  document.getElementById("datoFiltrosNuRifAseguradoraRecibo").value != ""){
              bool = false;
              for (var i = 0; i < self.ListaAseguradoras.length; i++) {
                  if(self.datoFiltros.rifAseguradora == self.ListaAseguradoras[i].data ){ 
                    bool = true;                   
                    break;
                  }
                }; 
              if(!bool){
                new PNotify({
                  title: 'Error',
                  text: 'No introdujo una asegurada valida.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });

              }  
            } 
            if((self.datoFiltros.feDesde != undefined && self.datoFiltros.feHasta == undefined)||(self.datoFiltros.feDesde == undefined && self.datoFiltros.feHasta != undefined)){
                new PNotify({
                  title: 'Error',
                  text: 'No introdujo el rango completo  para las fechas de ocurrencia.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                 bool = false;
            }
            console.log(self.datoFiltros.numeroPoliza);
            if(
            (self.datoFiltros.rifAseguradora == undefined || self.datoFiltros.rifAseguradora == '')&&    
            (self.datoFiltros.numeroPoliza == undefined || self.datoFiltros.numeroPoliza == '')&&
            (document.getElementById("datoFiltrosNuRifAseguradoraRecibo").value  == '')&&
            (self.datoFiltros.coRamo == undefined || self.datoFiltros.coRamo == '')&&
            self.datoFiltros.feDesde == undefined){
                new PNotify({
                  text: 'No introdujo ningun campo para realizar la busqueda.',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
              bool = false;              
            }
        
            if(bool)         
          self.consultarReciboReporte(self.datoFiltros);   

        };

        this.cancelarConsultarRecibo = function(){
            self.listaReporteRecibos = [];  
            self.destroyTableReporteRecibo();      
            self.setObjectElems(self.datoFiltros, undefined);
            document.getElementById("datoFiltrosNuRifAseguradoraRecibo").value = "";   
			self.cambiarFecha('filtroReciboFeHastaOcu',undefined,undefined);
			self.cambiarFecha('filtroReciboFeDesdeOcu',undefined,undefined);         
        };
        /********************************************************************************************
        **                                    C O N T R O L L E R S                                **
        ********************************************************************************************/
        this.viewsController = function (view) {
            self.setObjectElems(self.views, false);
            switch (view) {
                case 'agregarRecibo':
                    self.views.agregarRecibo = true;
                    console.log('viewsController > agregarRecibo');
                    break;
                case 'listarRecibos':
                    self.views.listarRecibos = true;
                    console.log('viewsController > listarRecibos');
                    break;
                case 'repoRecibos':
                    self.views.repoRecibos = true;
                    console.log('viewsController > repoRecibos');
                    break;       
                case 'repoRecibosDetalle':
                    self.views.repoRecibosDetalle = true;
                    console.log('viewsController > repoRecibosDetalle');
                    break;                                   
                default:
                    break;
            }
        };


        /********************************************************************************************
        **                                   M I S C E L A N E O U S                               **
        ********************************************************************************************/

        $rootScope.$on('agregarRecibo', function () {
            self.cancelarAgregarRecibo();
            self.polizaConsulta = undefined;
            self.numeroCertificado = undefined;
            self.isGlobal = undefined;
            self.viewsController('agregarRecibo');
        });

        $rootScope.$on('repoRecibos', function () {
            self.ListaAseguradoras = [];
            var auxList = mainServices.getAseguradoras();
            for (var i = 0; i < auxList.length; i++) {
                self.ListaAseguradoras.push({
                data: auxList[i].nu_rif,
                value: auxList[i].nb_aseguradora
                });
            };          
            $('#datoFiltrosNuRifAseguradoraRecibo').autocomplete({
                lookup: self.ListaAseguradoras,
                onSelect: function (suggestion) {
                self.datoFiltros.rifAseguradora = suggestion.data;
                suggestion = null;
                $('#datoFiltrosNuRifAseguradoraRecibo').closest('.item').removeClass('bad').find('.alert').remove();
                }
            });
            self.cancelarConsultarRecibo();
            self.viewsController('repoRecibos');
        });

        $rootScope.$on('listarRecibos', function () {
            self.polizaConsulta = undefined;
            self.numeroCertificado = undefined;
            self.isGlobal = undefined;
            self.mostrarTabla = false;
            $('#tablaConsultarRecibos').dataTable().fnDestroy();
            self.viewsController('listarRecibos');

        });

        $('#formularioAgregarReciboRecibo').on('blur', null, validator.checkField);
        $('#formularioAgregarReciboPoliza').on('blur', null, validator.checkField);

        $('.recibo.collapse-link').on('click', function () {

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
		// Validaciones para datetimepiker

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
				date.selectable = false;
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
			self.cambiarFecha('formularioAgregarReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('formularioAgregarReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('formularioAgregarReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('formularioAgregarReciboFechaRecepcion',undefined,undefined);
			self.cambiarFecha('formularioEditarReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('formularioEditarReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('formularioEditarReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('formularioEditarReciboFechaRecepcion',undefined,undefined);
		};
		// Fin de Validaciones para datetimepiker


    }]);

})();
