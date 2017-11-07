(function () {

    'use strict';

    var bonoAsignadoController = angular.module('DGBOSS.bonoAsignadoController', ['DGBOSS.bonoAsignadoServices', 'DGBOSS.mainServices']);

    bonoAsignadoController.controller('bonoAsignadoController', ['$scope', '$rootScope', 'bonoAsignadoServices', 'mainServices', function ($scope, $rootScope, bonoAsignadoServices, mainServices) {

        var self = this;

        console.log('bonoAsignadoController activated.');

        /********************************************************************************************
        **                                      V A R I A B L E S                                  **
        ********************************************************************************************/

        /*
        this.views: { this will set the insured view. }
        */
        this.views = {
            agregarBono: false,
            listarBonos: false,
            editarBono: false
        };

        this.aseguradoraFinanciadoraView = {
            aseguradora: true,
            financiadora: false
        };

        this.checked = {
            Financiadora: 'iradio_flat-green',
            Aseguradora: 'iradio_flat-green checked'
        };

        this.bonificacionAsignar = {
            //   bonificacion: undefined,
            //   bono: undefined,
            //   tipo: undefined,
            nbUsuario: undefined,
            aseguradoraFinanciadora: undefined,
            //productor: undefined,
            monto: undefined,
            moneda: undefined,
            fechaCobro: undefined,
            //primasCobradas: undefined,
            banco: undefined,
            formaPago: undefined,
            observaciones: undefined
        };

        this.idAux = {

            productor: undefined,
            aseguradoraFinanciadora: undefined,
            moneda: undefined,
            banco: undefined
        }




        this.autocompletarIDBonoAsig = undefined;
        this.autocompletarListBonoAsig = undefined;

        this.bonificacionModalVer = [];

        this.bonificacionEditar = [];

        this.bonificacionEliminar = [];

        //this.bonoBackUp = undefined;

        this.listaBonos = [];

        // this.tipoBonos = [
        //   { codigo: 0, nombre: 'Bono #1'},
        //   { codigo: 1, nombre: 'Bono #2'},
        //   { codigo: 2, nombre: 'Bono #3'}
        // ];
        //
        // this.aseguradoras = [
        //   { codigo: 0, nombre: 'Aseguradora #1'},
        //   { codigo: 1, nombre: 'Aseguradora #2'},
        //   { codigo: 2, nombre: 'Aseguradora #3'}
        // ];
        //
        // this.financiadoras = [
        //   { codigo: 0, nombre: 'Financiadora #1'},
        //   { codigo: 1, nombre: 'Financiadora #2'},
        //   { codigo: 2, nombre: 'Financiadora #3'}
        // ];
        //
        // this.productores = [
        //   { codigo: 0, nombre: 'Productor #1'},
        //   { codigo: 1, nombre: 'Productor #2'},
        //   { codigo: 2, nombre: 'Productor #3'}
        // ];
        //
        // this.monedas = [
        //   { codigo: 0, nombre: 'Dólar'},
        //   { codigo: 1, nombre: 'Euro'},
        //   { codigo: 2, nombre: 'Bolívar'}
        // ];
        //
        // this.bancos = [
        //   { codigo: 0, nombre: 'Banco Mercantil'},
        //   { codigo: 1, nombre: 'Banco Bicentenario'},
        //   { codigo: 2, nombre: 'Sofitasa'}
        // ];
        //
        this.formaPago = [
            { codigo: 0, nombre: 'Efectivo' },
            { codigo: 1, nombre: 'Cheque' },
            { codigo: 2, nombre: 'Transferencia' }
        ];
        //
        // this.bonos = [
        //   { bonificacion: '0001', bono: 'Bono #1', tipo: 'Aseguradora', aseguradoraFinanciadora: 'ISLUR', productor: 'Pedro Perez', monto: '120000.00', moneda: 'Dólar', fechaConstitucion: '01/01/2017', primasCobradas: '02', banco: 'Banco Mercantil', formaPago: 'Transferencia', observaciones: 'Observacion 1' },
        //   { bonificacion: '0002', bono: 'Bono #1', tipo: 'Aseguradora', aseguradoraFinanciadora: 'ISLUR', productor: 'Pedro Perez', monto: '120000.00', moneda: 'Dólar', fechaConstitucion: '01/01/2017', primasCobradas: '02', banco: 'Banco Mercantil', formaPago: 'Transferencia', observaciones: 'Observacion 1' },
        //   { bonificacion: '0003', bono: 'Bono #1', tipo: 'Financiadora', aseguradoraFinanciadora: 'ISLUR', productor: 'Pedro Perez', monto: '120000.00', moneda: 'Dólar', fechaConstitucion: '01/01/2017', primasCobradas: '02', banco: 'Banco Mercantil', formaPago: 'Transferencia', observaciones: 'Observacion 1' },
        //   { bonificacion: '0004', bono: 'Bono #1', tipo: 'Financiadora', aseguradoraFinanciadora: 'ISLUR', productor: 'Pedro Perez', monto: '120000.00', moneda: 'Dólar', fechaConstitucion: '01/01/2017', primasCobradas: '02', banco: 'Banco Mercantil', formaPago: 'Transferencia', observaciones: 'Observacion 1' },
        //   { bonificacion: '0005', bono: 'Bono #1', tipo: 'Aseguradora', aseguradoraFinanciadora: 'ISLUR', productor: 'Pedro Perez', monto: '120000.00', moneda: 'Dólar', fechaConstitucion: '01/01/2017', primasCobradas: '02', banco: 'Banco Mercantil', formaPago: 'Transferencia', observaciones: 'Observacion 1' },
        // ];

        this.listaProductores = [];

        this.formularioAsignarBonificacionUsuarioAutocompletar = [];

        this.listaAseguradoras = [];

        this.formularioAsignarBonificacionAseguradoraAutocompletar = [];

        this.listaFinanciadoras = [];

        this.formularioAsignarBonificacionFinanciadoraAutocompletar = [];

        // this.formularioAsignarBonificacionProductorAutocompletar = [
        //   "Álava",
        //   "Albacete",
        //   "Alicante",
        //   "..."
        // ];

        this.listaMonedas = [];

        this.formularioAsignarBonificacionMonedaAutocompletar = [];

        this.listaBancos = [];

        this.formularioAsignarBonificacionBancoAutocompletar = [];

        /********************************************************************************************
        **                                      VARIABLE AUXILIRES                                **
        ********************************************************************************************/

        this.placeholderAux = 'Aseguradora';

        this.empresaAux = undefined;

        this.tipoEmpresa = undefined;

        self.auxListaBancos = [];

        //   this.formularioInputs = {
        //     Bonificacion: { label: 'Bonificacion', type: 'normalInput', model: undefined, required: true, icon: 'fa-plus', values: '' },
        //     Bono: { label: 'Bono', type: 'selectInput', model: undefined, required: true, icon: '', values: 'opcion#1,opcion#2,opcion#3' }
        //   };
        // this.formularioInputs2 = {
        //     Productor: { label: 'Productor', type: 'selectInput', model: undefined, required: true, icon: '', values: 'opcion#1,opcion#2,opcion#3' },
        //   Monto: { label: 'Monto del Bono ', type: 'normalInput', model: undefined, required: true, icon: 'fa-usd', values: '' },
        //     fecha: { label: 'Fecha de Cobro', type: 'normalInput', model: undefined, required: true, icon: 'fa-calendar', values: '' },
        //   Monto: { label: 'Primas Cobradas', type: 'normalInput', model: undefined, required: true, icon: 'fa-bar-chart', values: '' },
        //   pago: { label: 'Forma de Pago', type: 'selectInput', model: undefined, required: true, icon: '', values: 'opcion#1,opcion#2,opcion#3' }
        //
        //   };


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

        this.cargaAutocomplete = function(){

            var param = {};

            //Carga Autocomplete Productor

            self.listaProductores = [];
            self.formularioAsignarBonificacionUsuarioAutocompletar = [];

            bonoAsignadoServices.consultarUsuario()
            .success(function (data) {

                console.log(data);
                for (var i = 0; i < data.length; i++) {

                    self.listaProductores.push({

                        nuCedulaRif: data[i].nuCedulaRif,
                        nbUsuario: (data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido).toUpperCase()

                    });

                    self.formularioAsignarBonificacionUsuarioAutocompletar.push((data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido).toUpperCase());
                };
            })
            .error(function (data, status, headers, config) {
                new PNotify({
                    title: '¡Error de Carga!',
                    text: data.mensaje,
                    //text: 'Ha ocurrido un error en el sistema.',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                });
            });

            //Carga Autocomplete Aseguradora
            self.listaAseguradoras = [];
            self.formularioAsignarBonificacionAseguradoraAutocompletar = [];

            var data=mainServices.getAseguradoras();
            self.ListaAseguradoras = [];
            var listaAux = [];
            for (var i = 0; i < data.length; i++) {

                self.listaAseguradoras.push({

                  nu_rif: data[i].nu_rif,
                  nb_aseguradora: data[i].nb_aseguradora.toUpperCase()

                });

                self.formularioAsignarBonificacionAseguradoraAutocompletar.push(data[i].nb_aseguradora.toUpperCase());
            };










            //Carga Autocomplete Financiadora
            //Falta verificar como viene la información
            self.listaFinanciadoras = [];
            self.formularioAsignarBonificacionFinanciadoraAutocompletar = [];

            bonoAsignadoServices.consultarFinanciadora()
            .success(function (data) {
                for (var i = 0; i < data.length; i++) {

                    self.listaFinanciadoras.push({

                        nuRif: data[i].nuRif,
                        nbFinanciadora: data[i].nbFinanciadora.toUpperCase()

                    });

                    self.formularioAsignarBonificacionFinanciadoraAutocompletar.push(data[i].nbFinanciadora.toUpperCase());
                };
            })
            .error(function (data, status, headers, config) {
                new PNotify({
                    title: '¡Error de Carga!',
                    text: data.mensaje,
                    //text: 'Ha ocurrido un error en el sistema.',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                });
            });

            //Carga Autocomplete Moneda

            self.ListaMonedas = [];
            self.formularioAsignarBonificacionMonedaAutocompletar = [];

			var data = [];
            var data=mainServices.getMonedas();
            self.ListaMonedas = [];

            for (var i = 0; i < data.length; i++) {
              self.ListaMonedas.push({
                id: data[i].idMoneda,
                nombre: data[i].nbMoneda
              });

                self.formularioAsignarBonificacionMonedaAutocompletar.push(data[i].nbMoneda.toUpperCase());
            };




            //Carga Autocomplete Banco

            self.listaMonedasBancos = [];
            self.formularioAsignarBonificacionBancoAutocompletar = [];

            self.listaBancos=[];

       			var data=[];
       			    data=mainServices.getBancos();
       			for (var i = 0; i < data.length; i++) {
                   self.listaBancos.push({

                  idBanco: data[i].idBanco,
                  nbBanco: data[i].nbBanco.toUpperCase()

                   });

                   self.formularioAsignarBonificacionBancoAutocompletar.push(data[i].nbBanco.toUpperCase());
       					};
       			//self.auxListaBanco = mainServices.getBancos()

        };

        this.consultarBonificacionService = function () {
            console.log('consultarBonificacionService..');
            var params = {
                id: 0
            };

            bonoAsignadoServices.consultarBonoAsignado(params)
            .success(function (data) {
                console.log(data);

                //if(data.codigo == 200){

                self.listaBonos = [];

                if (data.length == 0) {

                    if (self.views.listarBonos) {
                        new PNotify({
                            title: '¡Alerta!',
                            text: 'Disculpe. Aún no hay bonificaciones registrados.',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    }
                } else {

                    for (var i = 0; i < data.length; i++) {

                        //   if(data[i].estatus == 1)
                        //     data[i].estatus = 'Activo';
                        //   else if(data[i].estatus == 0)
                        //     data[i].estatus = 'Inactivo';
                        if (data[i].tipoEmpresa == 1) {

                            //self.empresaAux = data[i].nuRifAseguradora;
                            data[i].tipoEmpresa = 'Aseguradora';
                        } else {

                            //self.empresaAux = data[i].nuRifFinanciadora;
                            data[i].tipoEmpresa = 'Financiadora';
                        }

                        self.listaBonos.push({

                            banco: data[i].banco,
                            fechaCobro: data[i].fechaCobro,
                            formaPago: data[i].formaPago,
                            id: data[i].id,
                            moneda: data[i].moneda,
                            monto: data[i].monto,
                            nbBanco: data[i].nbBanco,
                            nbEmpresa: data[i].nbEmpresa.toUpperCase(),
                            nbMoneda: data[i].nbMoneda,
                            nuCedRif: data[i].nuCedRif,
                            observaciones: data[i].observaciones,
                            primaCobrada: data[i].primaCobrada,
                            productor: data[i].productor.toUpperCase(),
                            rifEmpresa: data[i].rifEmpresa,
                            rifEmpresaAsegFinan: data[i].rifEmpresaAsegFinan,
                            tipoEmpresa: data[i].tipoEmpresa,
                            tipoPersona: data[i].tipoPersona
                        });
                    };

                    //self.viewsController('listarBonosAsignados');
                    console.log(self.listaBonos);

                }

                if (!$.fn.DataTable.isDataTable('#tablaBonificacionConsultar')) {

                    self.createTable();
                } else {

                    self.destroyTable();
                }

                self.viewsController('listarBonosAsignados');
            })
            .error(function (data, status, headers, config) {

                //switch (self.views.listarBonos) {
                    //case 'consultar':



                    if (!$.fn.DataTable.isDataTable('#tablaBonificacionConsultar')) {

                        self.createTable();
                    } else {

                        self.destroyTable();
                    }

                    self.viewsController('listarBonosAsignados');

                    new PNotify({
                        title: '¡Error!',
                        text: data.mensaje,
                        //text: 'Ha ocurrido un error en el sistema.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                    //break;

                    //default:
                    //sbreak;
                //}
            })
        };

        this.asignarBonificacionService = function (option) {

            var params = {
                // bonificacion: self.bonificacionAsignar.bonificacion,
                // bono: self.bonificacionAsignar.bono,
                // tipo: self.bonificacionAsignar.tipo,
                nuCedRif: self.idAux.productor,
                rifEmpresaAsegFinan: self.idAux.aseguradoraFinanciadora,
                // productor: self.bonificacionAsignar.productor,
                monto: self.bonificacionAsignar.monto,
                moneda: self.idAux.moneda,
                fechaCobro: mainServices.revertDate(self.bonificacionAsignar.fechaCobro),
                //primasCobradas: self.bonificacionAsignar.primasCobradas,
                banco: self.idAux.banco,
                formaPago: self.bonificacionAsignar.formaPago,
                observaciones: self.bonificacionAsignar.observaciones
            };

            switch (option) {
                case 'asignar':
                params = JSON.parse(JSON.stringify(params));
                if (self.aseguradoraFinanciadoraView.aseguradora == true) {

                    //params.nuRifAseguradora = self.bonificacionAsignar.aseguradoraFinanciadora;
                    params.tipoEmpresa = 1;
                } else if (self.aseguradoraFinanciadoraView.financiadora == true) {

                    //params.nuRifFinanciadora = self.bonificacionAsignar.aseguradoraFinanciadora;
                    params.tipoEmpresa = 2;
                }
                params.id = 0;
                //params.estatus = 1;
                break;

                case 'editar':
				params = {
					nuCedRif: self.idAux.productor,
					rifEmpresaAsegFinan: self.idAux.aseguradoraFinanciadora,
					monto: self.bonificacionEditar.monto,
					moneda: self.idAux.moneda,
					fechaCobro: mainServices.revertDate(self.bonificacionEditar.fechaCobro),
					banco: self.idAux.banco,
					formaPago: self.bonificacionEditar.formaPago,
					observaciones: self.bonificacionEditar.observaciones
				};
				params = JSON.parse(JSON.stringify(params));
				
                //params = {};
                //params = JSON.parse(JSON.stringify(self.bonificacionEditar));

                if (self.aseguradoraFinanciadoraView.aseguradora == true) {

                    //params.nuRifAseguradora = self.bonificacionAsignar.aseguradoraFinanciadora;
                    params.tipoEmpresa = 1;
                } else if (self.aseguradoraFinanciadoraView.financiadora == true) {

                    //params.nuRifFinanciadora = self.bonificacionAsignar.aseguradoraFinanciadora;
                    params.tipoEmpresa = 2;
                }
                params.id = self.bonificacionEditar.id;
                //   if(self.bonificacionEditar.estatus == 'Activo')
                //     params.estatus = 1;
                //   else if(self.bonificacionEditar.estatus == 'Inactivo')
                //     params.estatus = 0;
                break;

                case 'eliminar':
                params = JSON.parse(JSON.stringify(self.bonoEliminar));
                //   params.estatus = 0;
                break;

                default:
                break;
            }

            if (option == 'eliminar') {
                //SERVICEEEEEEEEEEEEEEEEEEEEEEEE
            } else {

                bonoAsignadoServices.agregarBonoAsignado(params)
                .success(function (data) {
                    console.log(data);

                    switch (option) {
                        case 'asignar':
                        new PNotify({
                            title: '¡Bonificacion asignada!',
                            text: 'La bonificacion fue asignada con éxito.',
                            type: 'success',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        break;

                        case 'editar':
                        new PNotify({
                            title: '¡Bonificacion editada!',
                            text: 'La bonificacion fue editada con éxito.',
                            type: 'success',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        break;

                        case 'eliminar':
                        new PNotify({
                            title: '¡Bonificacion eliminada!',
                            text: 'La bonificacion fue eliminada con éxito.',
                            type: 'success',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        break;

                        default:
                        break;
                    };

                    self.cancelarAgregarBonificacion();
                    self.consultarBonificacionService();
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
        }
        //   } else if (self.aseguradoraFinanciadoraView.aseguradora == true) {
        //
        //     //params.nuRifAseguradora = self.bonificacionAsignar.aseguradoraFinanciadora;
        //
        //     bonoAsignadoServices.agregarBonoAsignadoAseguradora(params)
        //       .success(function (data) {
        //         console.log(data);
        //
        //         //if(data.codigo = 200){
        //
        //         //self.consultarBonificacionService();
        //
        //         switch (option) {
        //           case 'asignar':
        //             new PNotify({
        //               title: '¡Bonificacion asignada!',
        //               text: 'La bonificacion fue asignada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           case 'editar':
        //             new PNotify({
        //               title: '¡Bonificacion editada!',
        //               text: 'La bonificacion fue editada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           case 'eliminar':
        //             new PNotify({
        //               title: '¡Bonificacion eliminada!',
        //               text: 'La bonificacion fue eliminada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           default:
        //             break;
        //         };
        //
        //         self.cancelarAgregarBonificacion();
        //         self.consultarBonificacionService();
        //
        //         // }else{
        //         //
        //         //   switch(option){
        //         //     case 'asignar':
        //         //       new PNotify({
        //         //         title: '¡Error!',
        //         //         text: 'Hubo un error al momento de asignar la bonificacion.',
        //         //         type: 'error',
        //         //         styling: 'bootstrap3',
        //         //         cornerclass: 'ui-pnotify-sharp'
        //         //       });
        //         //       break;
        //         //
        //         //     case 'editar':
        //         //       new PNotify({
        //         //         title: '¡Error!',
        //         //         text: 'Hubo un error al momento de editar la bonificacion.',
        //         //         type: 'error',
        //         //         styling: 'bootstrap3',
        //         //         cornerclass: 'ui-pnotify-sharp'
        //         //       });
        //         //       break;
        //         //
        //         //     case 'eliminar':
        //         //       new PNotify({
        //         //         title: '¡Error!',
        //         //         text: 'Hubo un error al momento de eliminar la bonificacion.',
        //         //         type: 'error',
        //         //         styling: 'bootstrap3',
        //         //         cornerclass: 'ui-pnotify-sharp'
        //         //       });
        //         //       break;
        //         //
        //         //     default:
        //         //       break;
        //         //   };
        //         //
        //         // }
        //       })
        //       .error(function (data, status, headers, config) {
        //
        //         new PNotify({
        //           title: '¡Error!',
        //           text: data.mensaje,
        //           //text: 'Ha ocurrido un error en el sistema.',
        //           type: 'error',
        //           styling: 'bootstrap3',
        //           cornerclass: 'ui-pnotify-sharp'
        //         });
        //       });
        //
        //   } else if (self.aseguradoraFinanciadoraView.financiadora == true) {
        //
        //     //params.nuRifFinanciadora = self.bonificacionAsignar.aseguradoraFinanciadora;
        //
        //     bonoAsignadoServices.agregarBonoAsignadoFinanciadora(params)
        //       .success(function (data) {
        //         console.log(data);
        //
        //         switch (option) {
        //           case 'asignar':
        //             new PNotify({
        //               title: '¡Bonificacion asignada!',
        //               text: 'La bonificacion fue asignada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           case 'editar':
        //             new PNotify({
        //               title: '¡Bonificacion editada!',
        //               text: 'La bonificacion fue editada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           case 'eliminar':
        //             new PNotify({
        //               title: '¡Bonificacion eliminada!',
        //               text: 'La bonificacion fue eliminada con éxito.',
        //               type: 'success',
        //               styling: 'bootstrap3',
        //               cornerclass: 'ui-pnotify-sharp'
        //             });
        //             break;
        //
        //           default:
        //             break;
        //         };
        //
        //         self.cancelarAgregarBonificacion();
        //         self.consultarBonificacionService();
        //       })
        //       .error(function (data, status, headers, config) {
        //
        //         new PNotify({
        //           title: '¡Error!',
        //           text: data.mensaje,
        //           type: 'error',
        //           styling: 'bootstrap3',
        //           cornerclass: 'ui-pnotify-sharp'
        //         });
        //       });
        //   }

        //}

        /********************************************************************************************
        **                                    C O N T R O L L E R S                                **
        ********************************************************************************************/

        this.viewsController = function (view) {
            self.setObjectElems(self.views, false);
            switch (view) {
                case 'agregarBonoAsignado':
                self.cargaAutocomplete();
                self.views.agregarBono = true;
                console.log('viewsController > agregarBonoAsignado');
                break;
                case 'editarBono':
                self.cargaAutocomplete();
                self.views.listarBonos = false;
                self.views.editarBono = true;
                console.log('viewsController > editarBono');
                break;
                case 'listarBonosAsignados':
                self.views.listarBonos = true;
                console.log('viewsController > listarBonosAsignados');
                break;
                default:
                break;
            }
        };

        this.aseguradoraFinanciadora = function (view) {
            self.setObjectElems(self.aseguradoraFinanciadoraView, false);
            switch (view) {
                case 'aseguradora':
                self.checked.Aseguradora = 'iradio_flat-green checked';
                self.checked.Financiadora = 'iradio_flat-green';
                self.placeholderAux = 'Aseguradora';
                self.aseguradoraFinanciadoraView.aseguradora = true;
                break;
                case 'financiadora':
                self.checked.Financiadora = 'iradio_flat-green checked';
                self.checked.Aseguradora = 'iradio_flat-green';
                self.placeholderAux = 'Financiadora';
                self.aseguradoraFinanciadoraView.financiadora = true;
                break;
                default:
                break;
            }
        };

        this.cambiarFecha = function (option) {
            switch (option) {
                case 'agregar':
                $('#formularioAsignarBonificacionFechaCobro').closest('.item')
                .removeClass('bad')
                .find('.alert').remove();
                break;
                case 'editar':
                $('#formularioEditarBonificacionFechaCobro').closest('.item')
                .removeClass('bad')
                .find('.alert').remove();
                break;
                default:
                break;
            }
        };

        this.asignarBonificacion = function () {

            var validatorResult = validator.checkAll($('#formularioAsignarBonificacion'));

            if (validatorResult) {

                // var bonificacionExistente = false;
                // //
                // for(var i = 0; i < self.listaBonos.length; i ++){
                //   if(self.listaBonos[i].bonificacion == self.bonificacionAsignar.bonificacion){
                //     bonificacionExistente = true;
                //     console.log('Bonificacion Existente');
                //     break;
                //   }
                // }

                // if(bonificacionExistente){
                //   new PNotify({
                //     title: '¡Error!',
                //     text: 'La bonificación ya se encuentra registrada.',
                //     type: 'error',
                //     styling: 'bootstrap3',
                //     cornerclass: 'ui-pnotify-sharp'
                //   });
                //
                // }else{

                //   if(self.aseguradoraFinanciadoraView.aseguradora == true){
                //
                //     self.bonificacionAsignar.tipo = 'Aseguradora';
                //   } else if(self.aseguradoraFinanciadoraView.financiadora == true){
                //
                //     self.bonificacionAsignar.tipo = 'Financiadora';
                //   }

                var verificacionAutocomplete = false;
                var ciclo;

                for(ciclo = 0; ciclo < self.listaProductores.length; ciclo++){

                    if(self.bonificacionAsignar.nbUsuario.toUpperCase() == self.listaProductores[ciclo].nbUsuario){

                        verificacionAutocomplete = true;
                        self.idAux.productor = self.listaProductores[ciclo].nuCedulaRif;
                        ciclo--;
                        break;

                    }
                }

                if(ciclo == self.listaProductores.length){

                    //verificacionAutocomplete = false;

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'El productor ingresado no se encuentra registrado',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                };

                if(self.aseguradoraFinanciadoraView.aseguradora && verificacionAutocomplete){
                    console.log('Aseguradora');
                    for(ciclo = 0; ciclo < self.listaAseguradoras.length; ciclo++){

                        if(self.bonificacionAsignar.aseguradoraFinanciadora.toUpperCase() == self.listaAseguradoras[ciclo].nb_aseguradora){
                            console.log(self.listaAseguradoras[ciclo].nu_rif);
                            verificacionAutocomplete = true;
                            self.idAux.aseguradoraFinanciadora = self.listaAseguradoras[ciclo].nu_rif;
                            ciclo--;
                            break;
                        }
                    }

                    if(ciclo == self.listaAseguradoras.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La aseguradora ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };

                } else if(self.aseguradoraFinanciadoraView.financiadora && verificacionAutocomplete){
                    console.log('Financiadora');
                    for(ciclo = 0; ciclo < self.listaFinanciadoras.length; ciclo++){

                        if(self.bonificacionAsignar.aseguradoraFinanciadora.toUpperCase() == self.listaFinanciadoras[ciclo].nbFinanciadora){
                            console.log(self.listaFinanciadoras[ciclo].nuRif);
                            verificacionAutocomplete = true;
                            self.idAux.aseguradoraFinanciadora = self.listaFinanciadoras[ciclo].nuRif;
                            ciclo--;
                            break;

                        }
                    }

                    if(ciclo == self.listaFinanciadoras.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La financiadora ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }

                /*if(verificacionAutocomplete){

                    for(ciclo = 0; ciclo < self.listaMonedas.length; ciclo++){

                        if(self.bonificacionAsignar.moneda.toUpperCase() == self.listaMonedas[ciclo].nbMoneda){
							console.lo
                            validatorResult = true;
                            self.idAux.moneda = self.listaMonedas[ciclo].idMoneda;
                            ciclo --;
                            break;
                        }
                    }

                    if(ciclo == self.listaMonedas.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La moneda ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }*/
				 self.idAux.moneda = self.bonificacionAsignar.moneda.id;
                if(verificacionAutocomplete){

                    for(ciclo = 0; ciclo < self.listaBancos.length; ciclo++){

                        if(self.bonificacionAsignar.banco.toUpperCase() == self.listaBancos[ciclo].nbBanco){

                            validatorResult = true;
                            self.idAux.banco = self.listaBancos[ciclo].idBanco;
                            ciclo --;
                            break;
                        }
                    }

                    if(ciclo == self.listaBancos.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'El banco ingresado no se encuentra registrado',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }

                if(verificacionAutocomplete){

                    console.log(self.bonificacionAsignar);
                    console.log(self.idAux);

                    if (!self.bonificacionAsignar.observaciones) {

                        self.bonificacionAsignar.observaciones = 'N/A';
                    }

                    self.asignarBonificacionService('asignar');

                    //   self.listaBonos.push({
                    //     // bonificacion: self.bonificacionAsignar.bonificacion,
                    //     // bono: self.bonificacionAsignar.bono,
                    //     // tipo: self.bonificacionAsignar.tipo,
                    //     nbUsuario: self.bonificacionAsignar.nbUsuario,
                    //     aseguradoraFinanciadora: self.bonificacionAsignar.aseguradoraFinanciadora,
                    //     //productor: self.bonificacionAsignar.productor,
                    //     monto: self.bonificacionAsignar.monto,
                    //     moneda: self.bonificacionAsignar.moneda,
                    //     fechaCobro: self.bonificacionAsignar.fechaConstitucion,
                    //     primasCobradas: self.bonificacionAsignar.primasCobradas,
                    //     banco: self.bonificacionAsignar.banco,
                    //     formaPago: self.bonificacionAsignar.formaPago,
                    //     observaciones: self.bonificacionAsignar.observaciones
                    //   });

                    // new PNotify({
                    //   title: '¡Bonificacion creada!',
                    //   text: 'El bono fue creado con éxito.',
                    //   type: 'success',
                    //   styling: 'bootstrap3',
                    //   cornerclass: 'ui-pnotify-sharp'
                    // });

                    self.setObjectElems(self.bonificacionAsignar, undefined);
                }
            }
        };

        this.cancelarAgregarBonificacion = function () {

            self.setObjectElems(self.bonificacionAsignar, undefined);
            self.setObjectElems(self.aseguradoraFinanciadoraView, false);
            self.aseguradoraFinanciadoraView.aseguradora = true;
            self.checked.Financiadora = 'iradio_flat-green';
            self.checked.Aseguradora = 'iradio_flat-green checked';
            self.placeholderAux = 'Aseguradora';
            self.consultarBonificacionService();
        };

        this.verBonificacion = function () {

            $('.verBonificacionModal').modal({
                show: 'true'
            });
        };

        this.editarBonificacion = function (bono) {
            // if(self.bonoBackUp){
            //   for(var i = 0; i < self.bonos.length; i ++){
            //     if(self.bonos[i].bonificacion == self.bonoBackUp){
            //       self.bonos[i].editar = false;
            //       break;
            //     }
            //   }
            // }

            console.log('** on editarBonificacion function..**');
            //self.editarBono = JSON.parse(JSON.stringify(bono));
            // bono.editar = true;
            // self.bonoBackUp = bono.idBono;
            // self.editarBanco.nombre = banco.nombre;
            // self.editarBanco.codigo = parseInt(banco.codigo);
            // self.editarBanco.descripcion = banco.descripcion;

            if (self.bonificacionEditar.tipoEmpresa == 'Aseguradora'){

                self.aseguradoraFinanciadora('aseguradora');
            } else if (self.bonificacionEditar.tipoEmpresa == 'Financiadora'){

                self.aseguradoraFinanciadora('financiadora');
            }

            if (self.bonificacionEditar.observaciones == 'N/A'){
                self.bonificacionEditar.observaciones = undefined;
            }

            self.viewsController('editarBono');
        };

        this.editar = function () {

            var validatorResult = validator.checkAll($('#formularioEditarBonificacion'));

            if (validatorResult) {

                var verificacionAutocomplete = false;
                var ciclo;

                for(ciclo = 0; ciclo < self.listaProductores.length; ciclo++){

                    if(self.bonificacionEditar.productor.toUpperCase() == self.listaProductores[ciclo].nbUsuario){

                        verificacionAutocomplete = true;
                        self.idAux.productor = self.listaProductores[ciclo].nuCedulaRif;
                        ciclo--;
                        break;

                    }
                }

                if(ciclo == self.listaProductores.length){

                    //verificacionAutocomplete = false;

                    new PNotify({
                        title: '¡Alerta!',
                        text: 'El productor ingresado no se encuentra registrado',
                        type: 'notice',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                };

                if(self.aseguradoraFinanciadoraView.aseguradora && verificacionAutocomplete){
                    console.log('Aseguradora');
                    for(ciclo = 0; ciclo < self.listaAseguradoras.length; ciclo++){

                        if(self.bonificacionEditar.nbEmpresa.toUpperCase() == self.listaAseguradoras[ciclo].nb_aseguradora){
                            console.log(self.listaAseguradoras[ciclo].nu_rif);
                            verificacionAutocomplete = true;
                            self.idAux.aseguradoraFinanciadora = self.listaAseguradoras[ciclo].nu_rif;
                            ciclo--;
                            break;
                        }
                    }

                    if(ciclo == self.listaAseguradoras.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La aseguradora ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };

                } else if(self.aseguradoraFinanciadoraView.financiadora && verificacionAutocomplete){
                    console.log(self.bonificacionEditar.aseguradoraFinanciadora);
                    console.log(self.bonificacionEditar);
                    console.log('Financiadora');
                    for(ciclo = 0; ciclo < self.listaFinanciadoras.length; ciclo++){

                        if(self.bonificacionEditar.nbEmpresa.toUpperCase() == self.listaFinanciadoras[ciclo].nbFinanciadora){
                            console.log(self.listaFinanciadoras[ciclo].nuRif);
                            verificacionAutocomplete = true;
                            self.idAux.aseguradoraFinanciadora = self.listaFinanciadoras[ciclo].nuRif;
                            ciclo--;
                            break;

                        }
                    }

                    if(ciclo == self.listaFinanciadoras.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La financiadora ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }

               /* if(verificacionAutocomplete){

                    for(ciclo = 0; ciclo < self.listaMonedas.length; ciclo++){

                        if(self.bonificacionEditar.nbMoneda.toUpperCase() == self.listaMonedas[ciclo].nbMoneda){

                            validatorResult = true;
                            self.idAux.moneda = self.listaMonedas[ciclo].idMoneda;
                            ciclo --;
                            break;
                        }
                    }

                    if(ciclo == self.listaMonedas.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'La moneda ingresada no se encuentra registrada',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }*/
				self.idAux.moneda = self.bonificacionEditar.moneda;
                if(verificacionAutocomplete){

                    for(ciclo = 0; ciclo < self.listaBancos.length; ciclo++){

                        if(self.bonificacionEditar.nbBanco.toUpperCase() == self.listaBancos[ciclo].nbBanco){

                            validatorResult = true;
                            self.idAux.banco = self.listaBancos[ciclo].idBanco;
                            ciclo --;
                            break;
                        }
                    }

                    if(ciclo == self.listaBancos.length){

                        verificacionAutocomplete = false;

                        new PNotify({
                            title: '¡Alerta!',
                            text: 'El banco ingresado no se encuentra registrado',
                            type: 'notice',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    };
                }

                if(verificacionAutocomplete){

                    console.log(self.bonificacionEditar);
                    console.log(self.idAux);

                    if (!self.bonificacionEditar.observaciones) {
                        self.bonificacionEditar.observaciones = 'N/A';
                    }
                    // }

                    self.asignarBonificacionService('editar');

                    self.viewsController('listarBonosAsignados');
                }
            }
        };

        this.cancelarEditarBonificacion = function () {
            self.viewsController('listarBonosAsignados');
        };

        this.eliminarBonificacion = function () {

            $('.eliminarBonificacionModal').modal({
                show: 'true'
            });
        };

        this.eliminarModal = function (opcion) {
            switch (opcion) {
                case 'aceptar':
                //CALL SERVICE
                // $('.modal-backdrop').remove();
                // $('#tablaBonificacionConsultar').DataTable().row('.choosed').remove().draw( false );
                // for(var i = 0; i < self.bonos.length; i ++){
                //   if(self.bonos[i].bonificacion == self.eliminarBono.bonificacion){
                //     console.log('entro');
                //     self.bonos[i].editar = false;
                //     self.bonos.splice(i, 1);
                //     break;
                //   }
                // };
                // new PNotify({
                //   title: '¡Bono eliminado!',
                //   text: 'El bono fue eliminado con éxito.',
                //   type: 'success',
                //   styling: 'bootstrap3',
                //   cornerclass: 'ui-pnotify-sharp'
                // });
                // console.log(self.bonos);
                self.asignarBonificacionService('eliminar');
                self.viewsController('listarBonosAsignados');
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

        $rootScope.$on('agregarBonoAsignado', function () {
            self.setObjectElems(self.bonificacionAsignar, undefined);
            self.viewsController('agregarBonoAsignado');
            console.log('rootScope agregarBonoAsignado');
            //$('#tablaBonificacionConsultar').DataTable().destroy();
        });

        $rootScope.$on('listarBonosAsignados', function () {

            self.consultarBonificacionService();
            //$('#tablaBonificacionConsultar').DataTable();
        });


        $(".autocompletarIDBonoAsig").on('click', function (e) {

            self.autocompletarIDBonoAsig = $(e.target).attr('id');
            //alert("The id of the button that was clicked: "+ self.autocompletarIDBonoAsig);

            //Switch de autocompletes en autocompletarListBonoAsig
            switch (self.autocompletarIDBonoAsig) {
                case 'formularioAsignarBonificacionUsuario':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionUsuarioAutocompletar;
                break;
                case 'formularioAsignarBonificacionAseguradoraFinanciadora':
                if (self.aseguradoraFinanciadoraView.aseguradora) {
                    self.autocompletarListBonoAsig = self.formularioAsignarBonificacionAseguradoraAutocompletar;
                } else {
                    self.autocompletarListBonoAsig = self.formularioAsignarBonificacionFinanciadoraAutocompletar;
                }
                break;
                // case 'formularioAsignarBonificacionProductor':
                //   self.autocompletarListBonoAsig = self.formularioAsignarBonificacionProductorAutocompletar;
                //   break;
                case 'formularioAsignarBonificacionMoneda':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionMonedaAutocompletar;
                break;
                case 'formularioAsignarBonificacionBanco':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionBancoAutocompletar;
                break;
                case 'formularioEditarBonificacionUsuario':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionUsuarioAutocompletar;
                break;
                case 'formularioEditarBonificacionAseguradoraFinanciadora':
                if (self.aseguradoraFinanciadoraView.aseguradora) {
                    self.autocompletarListBonoAsig = self.formularioAsignarBonificacionAseguradoraAutocompletar;
                } else {
                    self.autocompletarListBonoAsig = self.formularioAsignarBonificacionFinanciadoraAutocompletar;
                }
                break;
                // case 'formularioEditarBonificacionProductor':
                //   self.autocompletarListBonoAsig = self.formularioAsignarBonificacionProductorAutocompletar;
                //   break;
                case 'formularioEditarBonificacionMoneda':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionMonedaAutocompletar;
                break;
                case 'formularioEditarBonificacionBanco':
                self.autocompletarListBonoAsig = self.formularioAsignarBonificacionBancoAutocompletar;
                break;
                default:
                break;
            };
            //console.log(self.autocompletarListBonoAsig);
            $('#' + self.autocompletarIDBonoAsig).autocomplete({

                lookup: self.autocompletarListBonoAsig,
                onSelect: function (suggestion) {
                    //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    //Switch de Asignaciones
                    switch (self.autocompletarIDBonoAsig) {
                        case 'formularioAsignarBonificacionUsuario':
                        self.bonificacionAsignar.nbUsuario = suggestion.value;
                        break;
                        case 'formularioAsignarBonificacionAseguradoraFinanciadora':
                        self.bonificacionAsignar.aseguradoraFinanciadora = suggestion.value;
                        break;
                        // case 'formularioAsignarBonificacionFinanciadora':
                        //     self.autocompletarListBonoAsig = self.formularioAsignarBonificacionBonoAutocompletar;
                        //     break;
                        // case 'formularioAsignarBonificacionProductor':
                        //   self.bonificacionAsignar.productor = suggestion.value;
                        //   break;
                        case 'formularioAsignarBonificacionMoneda':
                        self.bonificacionAsignar.moneda = suggestion.value;
                        break;
                        case 'formularioAsignarBonificacionBanco':
                        self.bonificacionAsignar.banco = suggestion.value;
                        break;
                        case 'formularioEditarBonificacionUsuario':
                        self.bonificacionEditar.productor = suggestion.value;
                        break;
                        case 'formularioEditarBonificacionAseguradoraFinanciadora':
                        self.bonificacionEditar.nbEmpresa = suggestion.value;
                        break;
                        // case 'formularioEditarBonificacionProductor':
                        //   self.bonificacionEditar.productor = suggestion.value;
                        //   break;
                        case 'formularioEditarBonificacionMoneda':
                        self.bonificacionEditar.moneda = suggestion.value;
                        break;
                        case 'formularioEditarBonificacionBanco':
                        self.bonificacionEditar.banco = suggestion.value;
                        break;
                        default:
                        break;
                    }
                    suggestion = null;
                    $('#' + self.autocompletarIDBonoAsig).closest('.item')
                    .removeClass('bad')
                    .find('.alert').remove();
                }
            });

        });

        //MIRA ESTO
        // <a class="bonificacionEliminarModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
        // <i class="fa fa-trash-o"></i>\
        // </a>
        this.createTable = function () {

            var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="bonificacionVerModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editBono' && permisos[i].inEstatus == 1){
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
				acciones = '<td style="text-align: center;">\
                                <a class="bonificacionVerModal cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="bonificacionEditar cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}

            $('#tablaBonificacionConsultar').DataTable({
                data: self.listaBonos,
                aoColumns: [
                    //   { 'data': 'bonificacion' },
                    //   { 'data': 'bono'},
                    //   { 'data': 'aseguradoraFinanciadora'},
                    //   { 'data': 'productor'},
                    { 'data': 'productor', sDefaultContent: '' },
                    { 'data': 'tipoEmpresa', sDefaultContent: '' },
                    { 'data': 'nbEmpresa', sDefaultContent: '' },
                    { 'data': 'fechaCobro', sDefaultContent: '' },
                    { 'data': 'nbMoneda', sDefaultContent: '' },
                    {
                        'defaultContent': acciones
                    }
                ],
                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });

            $('#tablaBonificacionConsultar tbody').on('click', '.bonificacionVerModal', function () {
                self.bonificacionModalVer = angular.copy($('#tablaBonificacionConsultar').DataTable().row($(this).parents('tr')).data());
                console.log('monto',self.bonificacionModalVer.monto);
                self.bonificacionModalVer.monto = mainServices.setCurrency(self.bonificacionModalVer.monto);
                $('.consultarBonificacionVer').click();
            });

            $('#tablaBonificacionConsultar tbody').on('click', '.bonificacionEditar', function () {
                self.bonificacionEditar = $('#tablaBonificacionConsultar').DataTable().row($(this).parents('tr')).data();
                $('.consultarBonificacionEditar').click();
            });

            $('#tablaBonificacionConsultar tbody').on('click', '.bonificacionEliminarModal', function () {
                self.bonificacionEliminar = $('#tablaBonificacionConsultar').DataTable().row($(this).parents('tr')).data();
                $('.consultarBonificacionEliminar').click();
            }); 

            $('#tablaBonificacionConsultar tbody').on('click', 'tr', function () {
                $('#tablaBonificacionConsultar').DataTable().$('tr.choosed').removeClass('choosed');
                $(this).addClass('choosed');
            });

        };

        this.destroyTable = function () {
            $('#tablaBonificacionConsultar').dataTable().fnDestroy();
            console.log('on destroyTable function..');
            self.createTable();
        };

        // $('#formularioAsignarBonificacionBonificacion').on('blur', null, validator.checkField);
        // $('#formularioAsignarBonificacionBono').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionAseguradora').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionFinanciadora').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionUsuario').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionMonto').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionMoneda').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionFechaCobro').on('blur', null, validator.checkField);
        //$('#formularioAsignarBonificacionPrimasCobradas').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionBanco').on('blur', null, validator.checkField);
        $('#formularioAsignarBonificacionformaPago').on('blur', null, validator.checkField);

        $(".FormatIntegerNumBono").on('blur', function (e) {
            var id = $(e.target).attr('id');
            var monto = document.getElementById(id).value;
            document.getElementById(id).value =  mainServices.setCurrency(monto);   
        });

        $('.bono.collapse-link').on('click', function () {

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
