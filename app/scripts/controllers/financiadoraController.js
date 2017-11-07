(function () {

    'use strict';

    var financiadoraController = angular.module('DGBOSS.financiadoraController', ['DGBOSS.mainServices', 'DGBOSS.financiadoraServices']);

    financiadoraController.controller('financiadoraController', ['$scope', '$rootScope', 'mainServices', 'financiadoraServices', function ($scope, $rootScope, mainServices, financiadoraServices) {

        var self = this;

        console.log('financiadoraController activated.');

        /********************************************************************************************
        **                                      V A R I A B L E S                                  **
        ********************************************************************************************/

        /*
        this.views: { this will set the insured view. }
        */
        this.views = {
            agregarFinanciadora: false,
            listarFinanciadoras: false,
            verFinanciadoras: false,
            editarFinanciadora: false
        };

        this.nuevaFinanciadora = {
            nombre: undefined,
            tipoRif: undefined,
            rif: undefined,
            direccionFiscal: undefined,
            telefonoFiscal: undefined,
            direccionSucursal: undefined,
            telefonoSucursal: undefined,
            contactos: [],
            bancos: []
        };

        this.editarFinanciadora = {
            nombre: undefined,
            tipoRif: undefined,
            rif: undefined,
            direccionFiscal: undefined,
            telefonoFiscal: undefined,
            direccionSucursal: undefined,
            telefonoSucursal: undefined,
            contactos: [],
            bancos: []
        };

        this.financiadoraModal = undefined;

        this.formularioEditarFinanciadora = {
            nombre: undefined,
            rif: undefined,
            direccionFiscal: undefined,
            telefonoFiscal: undefined,
            contactos: [],
            bancos: []
        };

        this.tiposRif = ['G', 'J'];

        /*
        */
        this.datos = {
            nombre: undefined,
            rif: undefined,
            bancos: undefined
        };


        /*
        */
        this.direccion = {
            dirFiscal: undefined,
            telefonoFiscal: undefined
        };

        /*
        contacto de una financiadora
        */
        this.contacto = {
            nombreContacto: undefined,
            cargo: undefined,
            numeroTelefono: undefined,
            nuRif: undefined
        };

        this.banco = {
            nombre: undefined,
            tipo: undefined,
            numero: undefined,
            idEmpresa: undefined,
            idCuenta: undefined
        };


        this.contactos = [];

        this.bancos = [];

        this.listaBancos = [];

        this.financiadoras = [];

        this.auxLista = [];

        this.aux = undefined;

        this.rifAux = undefined;

        this.mask = '';

        this.index = undefined;


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
        /*
        */
        this.consultarFinanciadorasService = function (option) {

          console.log('fillBancosFromInitialList aseguradoras');
     
     			self.listaBancos=[];
     			self.auxListaBanco=[];
     			var data=[];
     			    data=mainServices.getBancos();
     			for (var i = 0; i < data.length; i++) {
     						self.listaBancos.push(data[i]);
     						self.auxListaBanco.push(data[i].nbBanco);
     					};
     			//self.auxListaBanco = mainServices.getBancos();
     			console.log(self.auxListaBanco);
          $('#nombreBancoFinanciadora').autocomplete({
              lookup: self.auxListaBanco,
              onSelect: function (suggestion) {
                  self.banco.nombre = suggestion.value;
                  suggestion = null;
                  $('#nombreBancoFinanciadora').closest('.item').removeClass('bad').find('.alert').remove();
              }
          });

          $('#editarNomBancoFinanciadora').autocomplete({

              lookup: self.auxListaBanco,
              onSelect: function (suggestion) {
                  self.banco.nombre = suggestion.value;
                  suggestion = null;
                  $('#editarNomBancoFinanciadora').closest('.item').removeClass('bad').find('.alert').remove();
              }
          });

				var params = {
                rif: financiadora.rif,
				control: 0
            };
            financiadoraServices.consultarFinanciadoras(params)
                .success(function (data) {
                    console.log(data);
                    self.financiadoras = [];
                    for (var i = 0; i < data.length; i++) {

                        switch (data[i].estatusFinanciadora) {
                            case 0:
                                data[i].estatusFinanciadora = 'Inactivo';
                                break;

                            case 1:
                                data[i].estatusFinanciadora = 'Activo';
                                break;

                            default:
                                break;
                        };

                        if (data[i].diSucursal == 'null') {
                            data[i].diSucursal = '';
                        };

                        self.financiadoras.push({
                            direccionFiscal: data[i].diFiscal,
                            direccionSucursal: data[i].diSucursal,
                            rifEmpresa: data[i].nuRifempresa,
                            estatus: data[i].estatusFinanciadora,
                            nombre: data[i].nbFinanciadora,
                            rif: data[i].nuRif,
                            tipoRif: data[i].nuRif.substring(0, 1),
                            telefonoFiscal: data[i].nuTelefonoFiscal,
                            telefonoSucursal: data[i].nuTelefonoSucursal,
                            contactos: data[i].contactosFinanciadora,
                            bancos: [],
                        });

                        if (self.financiadoras[i].direccionFiscal == 'null') {

                            self.financiadoras[i].direccionFiscal = '';
                        }
                        if (self.financiadoras[i].telefonoFiscal == 'null') {

                            self.financiadoras[i].telefonoFiscal = '';
                        }
                        if (self.financiadoras[i].direccionSucursal == 'null') {

                            self.financiadoras[i].direccionSucursal = '';
                        }
                        if (self.financiadoras[i].telefonoSucursal == 'null') {

                            self.financiadoras[i].telefonoSucursal = '';
                        }

                        for (var j = 0; j < data[i].cuentasFinanciadora.length; j++) {
                            switch (data[i].cuentasFinanciadora[j].tipoCuenta) {
                                case 1:
                                    data[i].cuentasFinanciadora[j].tipoCuenta = "Ahorro";
                                    break;
                                case 0:
                                    data[i].cuentasFinanciadora[j].tipoCuenta = "Corriente";
                                    break;
                            };
                            self.financiadoras[i].bancos.push({
                                nombre: self.buscarNombreBanco(data[i].cuentasFinanciadora[j].idBanco),
                                tipo: data[i].cuentasFinanciadora[j].tipoCuenta,
                                numero: data[i].cuentasFinanciadora[j].nuCuenta,
                                idCuenta: data[i].cuentasFinanciadora[j].idCuenta
                            });
                        };

                    };


                    console.log(self.financiadoras);

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarFinanciadoras')) {
                        self.createTable();
                    } else {
                        self.destroyTable();
                    }
                    self.viewsController(option);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    console.log('Error..');

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarFinanciadoras')) {
                        self.createTable();
                    } else {
                        self.destroyTable();
                    }
                    self.viewsController(option);
                });
        };
		this.consultarFinanciadorasService();

        this.verFinanciadoraService = function (financiadora) {
            var params = {
                rif: financiadora.rif,
				control: 0
            };
            console.log('Entre en verFinan');
            financiadoraServices.consultarFinanciadoras(params)
                .success(function (data) {
                    console.log('success on consultar ver finan..');
                    console.log(data);

                    var contacto = undefined;
                    financiadora.contactos = [];

                    for (var i = 0; i < data[0].contactosFinanciadora.length; i++) {


                        financiadora.contactos.push({
                            idContactoFinanciadora: 0,
                            nombreContacto: data[0].contactosFinanciadora[i].nombreContacto,
                            numeroTelefono: data[0].contactosFinanciadora[i].numeroTelefono,
                            cargo: data[0].contactosFinanciadora[i].cargo
                        });
                    };

                    self.verFinanciadora();
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    console.log('Error..');

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarFinanciadoras')) {
                        self.createTable();
                    } else {
                        self.destroyTable();
                    }
                    self.viewsController('listarFinanciadoras');
                });
        };



        this.agregarFinanciadoraService = function (option) {

            var params = {};

            switch (option) {
                case 'agregar':
                    params = JSON.parse(JSON.stringify(self.nuevaFinanciadora));
                    params.id = 0;
                    params.estatus = "1";
                    params.rifEmpresa = mainServices.getRifEmpresa();
                    // params.rifEmpresa = "J402457111";
                    params.tipoRif = params.tipoRif.substring(0, 1);
                    params.rif = params.tipoRif +"-"+params.rif;
                    params.cuentasFinanciadora = [];
                    console.log('rifes');
                    console.log(params.tipoRif);
                    console.log(params.rif);
                    for (var i = 0; i < self.nuevaFinanciadora.bancos.length; i++) {
                        params.cuentasFinanciadora.push({
                            idBanco: self.buscarIdBanco(self.nuevaFinanciadora.bancos[i].nombre),
                            idCuenta: 0,
                            nuCuenta: self.nuevaFinanciadora.bancos[i].numero,
                            rifEmpresa: mainServices.getRifEmpresa(),
                            rifFinanciadora: params.rif,
                            tipoCuenta: self.nuevaFinanciadora.bancos[i].tipo
                        });
                        switch (params.cuentasFinanciadora[i].tipoCuenta) {
                            case "Ahorro":
                                params.cuentasFinanciadora[i].tipoCuenta = 1;
                                break;
                            case "Corriente":
                                params.cuentasFinanciadora[i].tipoCuenta = 0;
                                break;
                        };
                    };


                    break;

                case 'editar':
                    params = JSON.parse(JSON.stringify(self.editarFinanciadora));
                    //params.id = self.editarFinanciadora.id;

                    params.tipoRif = params.tipoRif.substring(0, 1);

                    params.rif = /* params.tipoRif +"-"+ */params.rif;

                    if (self.editarFinanciadora.estatus == 'Activo') {

                        params.estatus = 1;
                    } else if (self.editarFinanciadora.estatus == 'Inactivo') {

                        params.estatus = 0;
                    }
                    params.cuentasFinanciadora = [];
                    for (var i = 0; i < self.editarFinanciadora.bancos.length; i++) {
                        params.cuentasFinanciadora.push({
                            idBanco: self.buscarIdBanco(self.editarFinanciadora.bancos[i].nombre),
                            idCuenta: self.editarFinanciadora.bancos[i].idCuenta,
                            nuCuenta: self.editarFinanciadora.bancos[i].numero,
                            rifEmpresa: mainServices.getRifEmpresa(),
                            rifFinanciadora: params.rif,
                            tipoCuenta: self.editarFinanciadora.bancos[i].tipo
                        });
                        switch (params.cuentasFinanciadora[i].tipoCuenta) {
                            case "Ahorro":
                                params.cuentasFinanciadora[i].tipoCuenta = 1;
                                break;
                            case "Corriente":
                                params.cuentasFinanciadora[i].tipoCuenta = 0;
                                break;
                        };
                    };

                    //params.tipoRif.splice(1,1);//CAMBIAR
                    break;

                default:
                    break;
            };
            console.log('Estos son los params');
            console.log(params);

            financiadoraServices.agregarFinanciadora(params)
                .success(function (data) {
                    console.log(data);

                    if (data.codigo = 200) {

                        switch (option) {
                            case 'agregar':
                                new PNotify({
                                    title: '¡Financiadora creada!',
                                    text: 'La Financiadora fue creada con éxito.',
                                    type: 'success',
                                    styling: 'bootstrap3',
                                    cornerclass: 'ui-pnotify-sharp'
                                });
                                break;

                            case 'editar':
                                new PNotify({
                                    title: '¡Financiadora editada!',
                                    text: 'La Financiadora fue editada con éxito.',
                                    type: 'success',
                                    styling: 'bootstrap3',
                                    cornerclass: 'ui-pnotify-sharp'
                                });
                                break;

                            default:
                                break;
                        };
                        self.cancelar(option);
                        self.consultarFinanciadorasService('listarFinanciadoras');
                        self.setObjectElems(self.nuevaFinanciadora, undefined);
                        self.setObjectElems(self.editarFinanciadora, undefined);
                    } else {

                        switch (option) {
                            case 'agregar':
                                new PNotify({
                                    title: '¡Error!',
                                    text: 'Hubo un error al momento de crear la financiadora.',
                                    type: 'error',
                                    styling: 'bootstrap3',
                                    cornerclass: 'ui-pnotify-sharp'
                                });
                                break;

                            case 'editar':
                                new PNotify({
                                    title: '¡Error!',
                                    text: 'Hubo un error al momento de editar la financiadora.',
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
                        //text: data.mensaje,
                        text: 'Ha ocurrido un error en el sistema.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });

        };

        this.eliminarContactoServices = function (param) {

            var params = JSON.parse(JSON.stringify(param));;

            financiadoraServices.eliminarContacto(params)
                .success(function (data) {
                    console.log('success on eliminar contacto..');
                    console.log(data);

                    self.editarFinanciadora.contactos.splice(self.index, 1);
                    new PNotify({
                        title: '¡Contacto eliminado!',
                        text: '¡El contacto fue eliminado con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    console.log('Error..');

                });
        };

        this.eliminarCuentaServices = function (param) {

            financiadoraServices.eliminarBanco(param)
                .success(function (data) {
                    console.log('success on eliminar contacto..');
                    console.log(data);

                    self.editarFinanciadora.bancos.splice(self.auxIndice, 1);
                    new PNotify({
                        title: '¡Cuenta eliminada!',
                        text: '¡La cuenta fue eliminada con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    console.log('Error..');

                });
        };

        /********************************************************************************************
        **                                    C O N T R O L L E R S                                **
        ********************************************************************************************/

        this.viewsController = function (view) {
            self.setObjectElems(self.views, false);
            switch (view) {
                case 'agregarFinanciadora':
                    self.views.agregarFinanciadora = true;
                    console.log('viewsController > agregarFinanciadora');
                    break;

                case 'listarFinanciadoras':
                    self.views.listarFinanciadoras = true;
                    console.log('viewsController > listarFinanciadoras');
                    break;

                case 'verFinanciadoras':
                    self.views.verFinanciadoras = true;
                    console.log('viewsController > verFinanciadoras');
                    break;

                case 'editarFinanciadora':
                    self.views.editarFinanciadora = true;
                    console.log('viewsController > editarFinanciadora');
                    break;

                default:
                    break;
            }
        };

        this.agregarBanco = function () {
            if (self.views.agregarFinanciadora) {
                var validatorResult = validator.checkAll($('#financiadoraBancos'));
                var bool = true;
                if (!self.nuevaFinanciadora.bancos) {
                    self.nuevaFinanciadora.bancos = [];
                } else {
                    for (var i = 0; i < self.nuevaFinanciadora.bancos.length; i++) {
                        console.log(self.nuevaFinanciadora.bancos.numero);
                        if (self.nuevaFinanciadora.bancos[i].numero == self.banco.numero) {
                            new PNotify({
                                title: 'Error',
                                text: 'Ya existe ese numero de cuenta',
                                type: 'error',
                                styling: 'bootstrap3',
                                cornerclass: 'ui-pnotify-sharp'
                            });
                            bool = false;
                            break;
                        }
                    }
                }
                var id = self.buscarIdBanco(self.banco.nombre);
                console.log(id);
                if (validatorResult && bool && id != '-1') {
                    self.aux = JSON.parse(JSON.stringify(self.banco));;
                    self.nuevaFinanciadora.bancos.push(self.aux);
                    self.setObjectElems(self.banco, undefined);
                    self.aux = undefined;
                } else if (!bool) {
                    new PNotify({
                        title: 'Error',
                        text: 'La cuenta de banco ya se encuentra asociada.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                } else if (id == '-1') {
                    new PNotify({
                        title: 'Error',
                        text: 'El banco ingresado no se encuentra asociado.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                }
            }

            if (self.views.editarFinanciadora) {
                var validatorResult = validator.checkAll($('#editarFinanciadoraBancos'));
                var bool = true;
                if (self.editarFinanciadora.bancos.length == 0)
                    self.editarFinanciadora.bancos = [];

                for (var i = 0; i < self.editarFinanciadora.bancos.length; i++) {
                    console.log(self.editarFinanciadora.bancos.numero);
                    if (self.editarFinanciadora.bancos[i].numero == self.banco.numero) {
                        new PNotify({
                            title: 'Error',
                            text: 'Ya existe ese numero de cuenta',
                            type: 'error',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                        bool = false;
                        break;
                    }
                }
                var id = self.buscarIdBanco(self.banco.nombre);
                console.log(id);
                if (validatorResult && bool && id != '-1') {
                    self.aux = JSON.parse(JSON.stringify(self.banco));;
                    self.editarFinanciadora.bancos.push(self.aux);
                    self.setObjectElems(self.banco, undefined);
                    self.aux = undefined;
                } else if (!bool) {
                    new PNotify({
                        title: 'Error',
                        text: 'La cuenta de banco ya se encuentra asociada.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                } else if (id == '-1') {
                    new PNotify({
                        title: 'Error',
                        text: 'El banco ingresado no se encuentra asociado.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                }
            }


        };

        this.editarBanco = function (elemt) {

            if (self.views.agregarFinanciadora) {
                console.log('agregarFinanciadora');
                var a = self.nuevaFinanciadora.bancos.indexOf(elemt);
                if(self.banco.nombre != undefined && self.banco.tipo != undefined && self.banco.numero != undefined){
					self.nuevaFinanciadora.bancos.push(self.banco);
				}
                self.banco = self.nuevaFinanciadora.bancos[a];
                self.nuevaFinanciadora.bancos.splice(a, 1);
            }
            if (self.views.editarFinanciadora) {
                 console.log('Editar Financiadora');
                var a = self.editarFinanciadora.bancos.indexOf(elemt);
                if(self.banco.nombre != undefined && self.banco.tipo != undefined && self.banco.numero != undefined){
					self.editarFinanciadora.bancos.push(self.banco);
				}
                self.banco = self.editarFinanciadora.bancos[a];
                self.editarFinanciadora.bancos.splice(a, 1);
            }
        };

        this.eliminarbanco = function (elemt) {
            //console.log("elimando ");

            if (self.views.agregarFinanciadora) {
                self.auxIndice = self.nuevaFinanciadora.bancos.indexOf(elemt);
                self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.nuevaFinanciadora.bancos[self.auxIndice].numero + '?';
            }
            if (self.views.editarFinanciadora) {
                self.auxIndice = self.editarFinanciadora.bancos.indexOf(elemt);
                self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.editarFinanciadora.bancos[self.auxIndice].numero + '?';
            }
            self.listaMensaje = 'banco';
            $('.eliminarFinanciadoraModal').modal({
                show: 'true'
            });
        };

        this.buscarIdBanco = function (nombre) {
            for (var i = 0; i < self.listaBancos.length; i++) {
                if (self.listaBancos[i].nbBanco == nombre) {
                    self.aux = self.listaBancos[i].idBanco;
                    return self.listaBancos[i].idBanco;
                }
            }
            return '-1';
        };

        this.buscarNombreBanco = function (id) {
            for (var i = 0; i < self.listaBancos.length; i++) {
                if (self.listaBancos[i].idBanco == id) {
                    self.aux = self.listaBancos[i].nbBanco;
                    return self.listaBancos[i].nbBanco;
                }
            }
            return undefined;
        };

        this.identificacionComboChange = function () {
            self.nuevaFinanciadora.rif = undefined;
            console.log(self.nuevaFinanciadora.tipoRif);
            switch (self.nuevaFinanciadora.tipoRif) {

                case 'J':
                    self.mask = '99999999-9';
                    break;
                case 'G':
                    self.mask = '99999999-9';
                    break;
                default:
                    self.mask = '';
                    break;
            };
            console.log(self.mask);
        };
        /*
        */
        this.agregarContacto = function () {

            var validatorResult;

            if (self.views.editarFinanciadora) {
                validatorResult = validator.checkAll($('#editarFinanciadorasContacto'));
                console.log('editar');
            } else {
                console.log('agregar');
                validatorResult = validator.checkAll($('#financiadorasContacto'));
            }

            console.log('El validator result arrojo:', validatorResult);

            if (validatorResult) {
                if (self.views.editarFinanciadora) {

                    var bool = true;
                    for (var i = 0; i < self.editarFinanciadora.contactos.length; i++) {
                        if (self.contacto.nombreContacto == self.editarFinanciadora.contactos[i].nombreContacto) {
                            bool = false;
                            break;
                        }
                    }
                    if (!bool) {
                        new PNotify({
                            title: '¡Contacto existente!',
                            text: 'El nuevo contacto ingresado ya existe.',
                            type: 'error',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else {
                        if (self.contacto.idContactoFinanciadora > 0) {
                        } else {
                            self.contacto.idContactoFinanciadora = 0;
                        }
                        self.contacto.nuRif = self.editarFinanciadora.rif;
                        self.aux = JSON.parse(JSON.stringify(self.contacto));
                        self.editarFinanciadora.contactos.push(self.aux);
                        self.contacto = undefined;
                    }

                } else if (self.views.agregarFinanciadora) {
                    var bool = true;
                    for (var i = 0; i < self.nuevaFinanciadora.contactos.length; i++) {
                        if (self.contacto.nombreContacto == self.nuevaFinanciadora.contactos[i].nombreContacto) {
                            bool = false;
                            break;
                        }
                    }
                    if (!bool) {
                        new PNotify({
                            title: '¡Contacto existente!',
                            text: 'El nuevo contacto ingresado ya existe.',
                            type: 'error',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else {
                        console.log('after validator nueva');
                        self.contacto.idContactoFinanciadora = 0;
                        //self.contacto.nuRif = self.nuevaFinanciadora.rif;
                        self.aux = JSON.parse(JSON.stringify(self.contacto));
                        self.nuevaFinanciadora.contactos.push(self.aux);
                        self.contacto = undefined;
                    }
                }
            };
        };
        /*
        */
        this.editarContacto = function (contacto) {
            console.log('on editar');
            if (self.views.editarFinanciadora) {
                console.log('on editar');
                var index = self.editarFinanciadora.contactos.indexOf(contacto);
                if(self.contacto != undefined){
                       self.editarFinanciadora.contactos.push(self.contacto);
                }
                self.contacto = self.editarFinanciadora.contactos[index];
                self.editarFinanciadora.contactos.splice(index, 1);
            } else if (self.views.agregarFinanciadora) {
                var index = self.nuevaFinanciadora.contactos.indexOf(contacto);
                if(self.contacto != undefined){
                    self.nuevaFinanciadora.contactos.push(self.contacto);
                }
                self.contacto = self.nuevaFinanciadora.contactos[index];
                self.nuevaFinanciadora.contactos.splice(index, 1);
            }
        };
        /*
        */
        this.eliminarContacto = function (contacto) {
            if (self.views.editarFinanciadora) {
                console.log(contacto);
                self.index = self.editarFinanciadora.contactos.indexOf(contacto);
                if (self.editarFinanciadora.contactos[self.index].idContactoFinanciadora != undefined) {

                    self.datos.nombre = self.editarFinanciadora.contactos.nombreContacto;
                    $('.eliminarFinanciadoraContactoModal').modal({
                        show: 'true'
                    });
                } else {
                    self.editarFinanciadora.contactos.splice(self.index, 1);
                }
            } else {

                self.index = self.nuevaFinanciadora.contactos.indexOf(contacto);
                self.nuevaFinanciadora.contactos.splice(self.index, 1);
            }
        };


        this.verFinanciadora = function () {

            $('#verFinanciadora').modal('show');
        };
        /*
        */
        this.eliminarFinanciadora = function (elemt) {
            console.log('preparando para eliminar');
            this.aux = this.listaFinanciadora.indexOf(elemt);
            self.datos.nombre = elemt.nombre;

            $('.eliminarFinanciModal').modal({
                show: 'true'
            });
        };

        this.eliminarModal = function (opcion) {
            switch (opcion) {
                case 'aceptar':
                    //CALL SERVICE
                    $('.modal-backdrop').remove();
                    $('#tablaConsultarFinanciadoras').DataTable().row('.choosed').remove().draw(false);
                    self.financiadoras.splice(self.aux, 1);
                    new PNotify({
                        title: '¡Financiadora eliminada!',
                        text: '¡La financiadora fue eliminada con éxito.',
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


        this.eliminarModalBanco = function (opcion) {
            switch (opcion) {
                case 'aceptar':

                    if (self.listaMensaje == 'banco') {

                        if (self.views.agregarFinanciadora)
                            self.nuevaFinanciadora.bancos.splice(self.auxIndice, 1);

                        if (self.views.editarFinanciadora) {
                            if (self.editarFinanciadora.bancos[self.auxIndice].idBanco == undefined || self.editarFinanciadora.bancos[self.auxIndice].idBanco != 0) {
                                var param = {
                                    idCuenta: self.editarFinanciadora.bancos[self.auxIndice].idCuenta,
                                    rifFinanciadora: self.editarFinanciadora.tipoRif.substring(0, 1) + self.editarFinanciadora.rif,
                                    rifEmpresa: mainServices.getRifEmpresa()
                                };
                                self.eliminarCuentaServices(param);
                            } else {
                                self.editarFinanciadora.bancos.splice(self.auxIndice, 1);
                            }
                        }

                        $('.modal-backdrop').remove();

                    }

                    break;
                case 'cancelar':
                    $('.modal-backdrop').remove();
                    break;
                default:
                    break;
            }
        };

        this.eliminarModal2 = function (opcion) {
            switch (opcion) {
                case 'aceptar':
                    //CALL SERVICE
                    var params = {
                        idContactoFinanciadora: self.editarFinanciadora.contactos[self.index].idContactoFinanciadora,
                        nuRif: self.editarFinanciadora.tipoRif.substring(0, 1) + self.editarFinanciadora.rif,
                        nuRifEmpresa: mainServices.getRifEmpresa()
                    };
                    self.eliminarContactoServices(params);
                    $('.modal-backdrop').remove();
                    break;

                case 'cancelar':
                    $('.modal-backdrop').remove();
                    break;

                default:
                    break;
            }
        };
        /*
        */
        this.cancelar = function (option) {
            switch (option) {
                case 'agregar':
                    self.setObjectElems(self.nuevaFinanciadora, undefined);
                    self.setObjectElems(self.datos, undefined);
                    self.setObjectElems(self.contacto, undefined);
                    self.setObjectElems(self.banco, undefined);
                    self.nuevaFinanciadora.contactos = [];
                    self.nuevaFinanciadora.bancos = [];
                    //self.viewsController('listarFinanciadoras');
                    break;

                case 'editar':
                    self.setObjectElems(self.editarFinanciadora, undefined);
                    self.setObjectElems(self.contacto, undefined);
                    self.setObjectElems(self.banco, undefined);
                    self.editarFinanciadora.contactos = [];
                    self.editarFinanciadora.bancos = [];
                    self.viewsController('listarFinanciadoras');
                    break;

                default:
                    break;
            };
        };
        /*
        */
        this.agregarFinanciadora = function () {


            console.log(self.nuevaFinanciadora);

            if (self.views.agregarFinanciadora) {
                var validatorResult = validator.checkAll($('#financiadoraDatos'));
                var validatorResult2 = validator.checkAll($('#formFinanciadorasDireccion'));
                var datosGenerales = $('#financiadoraDatosGenerales'),
                    vistadireccion = $('#financiadoraDireccion'),
                    vistacontactos = $('#financiadoraContacto'),
                    vistabancos = $('#financiadoraBanco'),
                    nombreExistente = false,
                    rifExistente = false;

                if (validatorResult && validatorResult2) {
                    //******************
                    //LLAMAR AL SERVICIO
                    //******************
                    for (var i = 0; i < self.financiadoras.length; i++) {
                        if (self.financiadoras[i].nombre == self.nuevaFinanciadora.nombre) {
                            nombreExistente = true;
                            break;
                        }
                        if (self.financiadoras[i].rif == self.nuevaFinanciadora.tipoRif.substring(0, 1)+self.nuevaFinanciadora.rif){
                            rifExistente = true;
                            break;
                        }
                    }

                    if (nombreExistente) {
                        new PNotify({
                            title: 'Error',
                            text: 'El nombre de la financiadora ya se encuentra registrado.',
                            type: 'error',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else if (rifExistente) {
                        new PNotify({
                            title: 'Error',
                            text: 'El RIF de la financiadora ya se encuentra registrado.',
                            type: 'error',
                            styling: 'bootstrap3',
                            cornerclass: 'ui-pnotify-sharp'
                        });
                    } else {


                        console.log(self.nuevaFinanciadora);
                        self.agregarFinanciadoraService('agregar');



                    }

                } else {
                    console.log(' no valido');
                    if (!datosGenerales.hasClass('in')) {
                        console.log(' no abierto 1 valido');
                        datosGenerales.collapse('show');
                        if (vistadireccion.hasClass('in'))
                        { vistadireccion.collapse('hide'); console.log(' no abierto 2 valido'); }
                        if (vistacontactos.hasClass('in'))
                        { vistacontactos.collapse('hide'); console.log(' no abierto 3 valido'); }
                        if (vistabancos.hasClass('in'))
                        { vistabancos.collapse('hide'); console.log(' no abierto 4 valido'); }
                    }
                }
            }
        };

        this.guardarFinanciadora = function () {
            console.log('edito la financiadora');
            var validatorResult = validator.checkAll($('#editarFinanciadoraDatos'));
            var validatorResult2 = validator.checkAll($('#formEditarFinanciadorasDireccion'));
            var datosGenerales = $('#editarFinanciadoraDatosGenerales'),
                vistadireccion = $('#editarFinanciadoraDireccion'),
                vistacontactos = $('#editarFinanciadoraContacto'),
                vistabancos = $('#editarFinanciadoraBanco');

            if (validatorResult && validatorResult2) {
                self.agregarFinanciadoraService('editar');
            } else {
                console.log('editado fallido');
                if (!datosGenerales.hasClass('in')) {
                    console.log(' no abierto 1 valido');
                    datosGenerales.collapse('show');
                    if (vistadireccion.hasClass('in'))
                    { vistadireccion.collapse('hide'); console.log(' no abierto 2 valido'); }
                    if (vistacontactos.hasClass('in'))
                    { vistacontactos.collapse('hide'); console.log(' no abierto 3 valido'); }
                    if (vistabancos.hasClass('in'))
                    { vistabancos.collapse('hide'); console.log(' no abierto 4 valido'); }
                }
            }
        };

        this.editarFinanciadoraFn = function () {
            //self.editarFinanciadoraService(self.editarFinanciadora);
            self.viewsController('editarFinanciadora');
        };

        this.destroyTable = function () {
            //console.log(self.financiadoras);
            $('#tablaConsultarFinanciadoras').dataTable().fnDestroy();
            console.log('on destroyTable function..');
            self.createTable();
        };

        this.activar = function () {
            //Just to activate the module.
            console.log('activando financiadora..');

        };

        /********************************************************************************************
        **                                   M I S C E L A N E O U S                               **
        ********************************************************************************************/


        $rootScope.$on('agregarFinanciadora', function () {
            self.consultarFinanciadorasService('agregarFinanciadora');
            self.viewsController('agregarFinanciadora');
            self.cancelar('agregar');
        });

        $rootScope.$on('editarFinanciadora', function () {
            self.viewsController('editarFinanciadora');
        });

        $rootScope.$on('listarFinanciadoras', function () {
            self.cancelar('editar');
            self.consultarFinanciadorasService('listarFinanciadoras');
        });



        $('#agregarFinanciadoraNombre').on('blur', null, validator.checkField);
        $('#agregarFinanciadoraRIF').on('blur', null, validator.checkField);
        $('#agregarFinanciadoraDireccionFiscal').on('blur', null, validator.checkField);
        $('#agregarFinanciadoraTelefonoFiscal').on('blur', null, validator.checkField);
        $('#agregarContactoNombreCompletoFinanciadora').on('blur', null, validator.checkField);
        $('#agregarContactoCargoFinanciadora').on('blur', null, validator.checkField);
        $('#agregarContactoTelefonoFinanciadora').on('blur', null, validator.checkField);
        $('#nombreBancoFinanciadora').on('blur', null, validator.checkField);
        $('#numeroBanco').on('blur', null, validator.checkField);
        $('#editarFinanciadoraNombreCompleto').on('blur', null, validator.checkField);
        $('#editarFinanciadoraRIF').on('blur', null, validator.checkField);
        $('#editarFinanciadoraDireccionFiscal').on('blur', null, validator.checkField);
        $('#editarFinanciadoraTelefonoFiscal').on('blur', null, validator.checkField);
        $('#editarCargoContactoFinanciadora').on('blur', null, validator.checkField);
        $('#editarTelefonoContactoFinaciadora').on('blur', null, validator.checkField);
        $('#editarNombreContactoFinaciadora').on('blur', null, validator.checkField);
        $('#editarNomBancoFinanciadora').on('blur', null, validator.checkField);
        $('#editarNumeroBancoFinanciadora').on('blur', null, validator.checkField);



        this.createTable = function () {

            var permisos = mainServices.getPermisos();
            var editar = false;
            var acciones = '<td style="text-align: center;">\
                                        <a class="verFinanciadora cursor-pointer" data-toggle="modal">\
                                        <i class="fa fa-search"></i>\
                                        </a>\
                                    </td>';
            console.log(permisos);

            for(var i = 0; i < permisos.length; i ++){
                if(permisos[i].coPermiso == 'editFinan' && permisos[i].value == true){
                editar = true;
                break;
                }
            };

            if(editar || (mainServices.isAdmin() == 1)){
                acciones = '<td style="text-align: center;">\
                                        <a class="verFinanciadora cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                        <i class="fa fa-search"></i>\
                                        </a>\
                                        <a class="editarFinanciadora cursor-pointer" style="margin-right: 10px">\
                                        <i class="fa fa-pencil"></i>\
                                        </a>\
                                    </td>';
            }

            $('#tablaConsultarFinanciadoras').DataTable({
                data: self.financiadoras,
                aoColumns: [
                    { 'mData': 'nombre', sDefaultContent: '' },
                    { 'mData': 'rif', sDefaultContent: '' },
                    { 'mData': 'direccionFiscal', sDefaultContent: '' },
                    { 'mData': 'estatus', sDefaultContent: '' },
                    { 'defaultContent': acciones }
                ],

                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });

            $('#tablaConsultarFinanciadoras tbody').on('click', '.verFinanciadora', function () {
                self.financiadoraModal = $('#tablaConsultarFinanciadoras').DataTable().row($(this).parents('tr')).data();
                console.log(self.financiadoraModal);

                $('.activarFinanciadora').click();

            });

            $('#tablaConsultarFinanciadoras tbody').on('click', '.editarFinanciadora', function () {
                var editFinan = $('#tablaConsultarFinanciadoras').DataTable().row($(this).parents('tr')).data();
                self.editarFinanciadora = JSON.parse(JSON.stringify(editFinan));
                console.log(self.editarFinanciadora);
                console.log('evento editar');
              /*  self.editarFinanciadora.rif = self.editarFinanciadora.rif.substring(2);
                self.editarFinanciadora.tipoRif=self.editarFinanciadora.rif.substring(0,1);
                switch (self.editarFinanciadora.tipoRif) {
                    case 'G':
                        self.editarFinanciadora.tipoRif = 'G-';
                        break;
                    case 'J':
                        self.editarFinanciadora.tipoRif = 'J-';
                        break;
                };*/

                console.log(self.editarFinanciadora);
                $('.activarEditarFinanciadora').click();

            });

            $('#tablaConsultarFinanciadoras tbody').on('click', 'tr', function () {
                $('#tablaConsultarFinanciadoras').DataTable().$('tr.choosed').removeClass('choosed');
                $(this).addClass('choosed');
            });
        };

        $('.financiadora.collapse-link').on('click', function () {

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
