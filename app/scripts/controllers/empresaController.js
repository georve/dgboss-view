(function () {

	'use strict';

	var empresaController = angular.module('DGBOSS.empresaController', ['ngAnimate', 'DGBOSS.empresaServices','DGBOSS.mainServices']);

	empresaController.controller('empresaController', ['$scope', '$rootScope', 'empresaServices','mainServices', function ($scope, $rootScope, empresaServices,mainServices) {

		var self = this;

		console.log('empresaController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
		this.empresaModal = undefined;

		this.views = {
			agregarEmpresa: false,
			editarEmpresa: false,
			listarEmpresa: false,
			verEmpresa: false
		};
		/*
			*/
		this.datos = {
			nombre: undefined,
			rif: undefined,
			txCorreo: undefined,
			bancos: undefined,
			logo: undefined
		};
		/*
			*/
		this.direccion = {
			direccionFiscal: undefined,
			tlfFiscal: undefined
		};
		/*
			*/
		this.banco = {
			nombre: undefined,
			tipo: undefined,
			numero: undefined,
			idEmpresa: undefined,
			idCuenta: undefined
		};

		this.desc = undefined;
		/*
			*/
		this.listaEmpresa = [];
		/*
			*/
		this.listaBancos = [];

		/* 	this.listica = [
				"instituto municipal de credito popular", "inverunion banco comercial", "banco del tesoro banco universal", "bannorte", "atlantico", "stanford bank", "bancolombia", "old ocean federal credit union", "100% banco comercial, c.a.", "banco del sol", "banco confederado, s.a.", "banco de venezuela ,s.a.,banco universal", "banco guayana, c.a.", "c.a. central banco universal", "corp banca, c.a., banco universal.", "eurobanco banco comercial, c.a.", "pershing", "citibank, n.a.,banco universal(suc.vla)", "banplus ent ahorro prestamo", "bancos extranjeros", "banco caroní, c.a.,banco universal", "banco de coro,c.a. (bancoro)", "banco del caribe, c.a., banco universal", "banco exterior, c.a., banco universal", "banco industrial de venezuela, c.a.", "banco plaza, c.a.", "bancos nacionales", "banesco banco universal", "banco federal", "banco occidental de descuento", "banco canarias de venezuela, c.a.", "banco sofitasa banco universal, c.a.", "bolívar banco, c.a.", "casa propia, entidad de ahorro y prest.", "del sur banco universal, c.a", "fondo comun banco universal, c.a", "mi casa entidad de ahorro", "nuevo mundo banco comercial, c.a.", "provivienda,entid.ahorr. y prest., c.a.", "totalbank, c.a., banco comercial", "venezolano de crédito, s.a. banco univ.", "banesco internacional puerto rico", "banesco internacional panama", "abn amro bank, n.v., (suc.venezuela)", "banco standard chartered (suc.venezuela)", "j.p. morgan bank venezuela, c.a.", "bbva banco provincial, s.a.", "banco mercantil, c.a., banco universal", "citibank, caracas", "banco nacional de crédito", "baninvest banco de inversión c.a.", "banco provivienda", "helm bank de venezuela", "bolivar banco", "commercebank", "bank of america", "hsbc private bank", "bank one, columbus na", "first union national bank", "bac florida bank", "banco santander international", "j.p. morgan chase bank", "wachovia bank, n.a.", "excel bank, n.a.", "pnc bank, n.a.", "oppenheimer portfolio access", "colonial bank", "banco do brasil", "banco idb bank", "ocean bank", "nations banc", "ebna bank n.v.", "banvalor banco comercial", "sun trust bank", "banfoandes", "union planters bank", "hsbc republic international bank", "bancaracas internatl. banking corporat", "bnp paribas", "banca amiga", "banco real", "mi banco banco comercial", "murex capital llc.", "bangente", "banco activo", "banco agricola de venezuela", "banco agricola de venezuela", "miura financial services", "miura capital", "banco bicentenario universal", "banco del pueblo soberano", "banco de desarrollo (bancrecer)", "banco de la fuerza armada nac bolivaria"
			]; */

		this.auxIndice = undefined;

		this.auxLista = [];

		this.aux = undefined;

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
		this.fillBancosFromInitialList=function(){
		console.log('fillBancosFromInitialList empresas');
		//this.listaBancos=mainServices.getBancos();
		self.listaBancos=[];
		self.auxLista=[];
		var data=[];
				data=mainServices.getBancos();
		for (var i = 0; i < data.length; i++) {
					self.listaBancos.push(data[i]);
					self.auxLista.push(data[i].nbBanco);
				};
		console.log('nomBanco', $('#nomBanco'));
		$('#nombreBanco').autocomplete({
			lookup: self.auxLista,
			onSelect: function (suggestion) {
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#nombreBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});

		$('#editarNomBanco').autocomplete({
			lookup: self.auxLista,
			onSelect: function (suggestion) {
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#editarNomBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});



	};






		this.consultarEmpresaServices = function (view) {
			console.log('consultarEmpresaServices..');
			var params = {
				idEmpresa: 0//Cambiar
			};

			empresaServices.consultarEmpresa(params)
				.success(function (data) {
					console.log(data);
					self.listaEmpresa = [];

					if (data.length == 0) {
						new PNotify({
							title: '¡Alerta!',
							text: 'Disculpe. Aún no hay empresas registradas.',
							type: 'notice',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}

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
						self.listaEmpresa.push({
							master: "DGFARM",//Cambiar
							nombre: data[i].nbEmpresa,
							rif: data[i].nuRif,
							direccionFiscal: data[i].diFiscal,
							tlfFiscal: data[i].nuTelefono,
							txCorreo: data[i].txCorreo,
							estatus: data[i].inEstatus,
							pais: data[i].pais,
							desc: data[i].descripcion,
							bancos: []
							//banco: data[i].logo //Cambiar
						});
					};

					console.log(self.listaEmpresa);

					self.viewsController(view);

					if (!$.fn.DataTable.isDataTable('#tablaConsultarempresa')) {
						self.createTable();
					} else {
						self.destroyTable();
					}
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








		};


		this.consultarDetalleEmpresa = function (view) {
			console.log('consultarEmpresaServices..');

			switch (view) {
				case 'editar':
					var params = {
						rif: self.editarEmpresas.rif
					};
					empresaServices.consultarCuentaEmpresa(params)
						.success(function (data) {
							self.editarEmpresas.bancos = [];
							console.log(data);
							for (var i = 0; i < data.length; i++) {

								switch (data[i].tipoCuenta) {
									case 1:
										data[i].tipoCuenta = 'Ahorro';
										break;
									case 0:
										data[i].tipoCuenta = 'Corriente';
										break;
									default:
										break;
								};
								console.log(data[i].idBanco);
								self.buscarNombreBanco(data[i].idBanco);
								data[i].idBanco = self.aux;

								self.editarEmpresas.bancos.push({
									nombre: data[i].idBanco,
									tipo: data[i].tipoCuenta,
									numero: data[i].nuCuenta,
									nuRifEmpresa: data[i].nuRifEmpresa,
									idEmpresaBanco: data[i].idEmpresaBanco
								});
							};

							console.log(self.editarEmpresas.bancos);
							self.editarEmpresas.bancos = self.editarEmpresas.bancos;
							self.viewsController('editarEmpresa');

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


					break;
				case 'modal':
					var params = {
						rif: self.empresaModal.rif
					};

					console.log(params);

					empresaServices.consultarCuentaEmpresa(params)
						.success(function (data) {
							console.log(data);

							self.empresaModal.bancos = [];

							for (var i = 0; i < data.length; i++) {

								switch (data[i].tipoCuenta) {
									case 1:
										data[i].tipoCuenta = 'Ahorro';
										break;
									case 0:
										data[i].tipoCuenta = 'Corriente';
										break;
								};

								console.log(data[i].idBanco);
								self.buscarNombreBanco(data[i].idBanco);
								data[i].idBanco = self.aux;

								self.empresaModal.bancos.push({
									nombre: data[i].idBanco,
									tipo: data[i].tipoCuenta,
									numero: data[i].nuCuenta,
									nuRifEmpresa: data[i].nuRifEmpresa,
									idEmpresaBanco: data[i].idEmpresaBanco
								});
							};

							console.log(self.empresaModal.bancos);
							self.empresaModal.bancos = self.empresaModal.bancos;
							$('#consultarEmpresa').modal('show');

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
					break;
			};
		};

		this.agregarEmpresaService = function (option) {

			var params = {};
			switch (option) {
				case 'agregar':
					params.estatus = 1;
					params.nombre = self.datos.nombre;
					params.rif = self.datos.rif;
					params.txCorreo = self.datos.txCorreo;
					params.tlfFiscal = self.direccion.tlfFiscal;
					params.dirFiscal = self.direccion.direccionFiscal;
					params.desc = self.desc;
					params.master = "DGFARM";//CAMBIAR
					params.pais = { 'idPais': mainServices.getIdPais() };//CAMBIAR mainServices.
					params.cuentas = [];
					params.dominio = mainServices.getDominio();//CAMBIAR

					if (self.datos.bancos) {
						for (var i = 0; i < self.datos.bancos.length; i++) {
							self.buscarIdBanco(self.datos.bancos[i].nombre);
							params.cuentas.push({
								idCuenta: "0",
								nuCuenta: self.datos.bancos[i].numero,
								tipoCuenta: self.datos.bancos[i].tipo,
								idBanco: self.aux,
								rifEmpresa: self.datos.rif
							});
							switch (params.cuentas[i].tipoCuenta) {
								case 'Ahorro':
									params.cuentas[i].tipoCuenta = 1;
									break;
								case 'Corriente':
									params.cuentas[i].tipoCuenta = 0;
									break;
							};
						}
					}

					console.log(params);
					break;

				case 'editar':

					params = JSON.parse(JSON.stringify(self.editarEmpresas));
					params.dominio =  mainServices.getDominio();//CAMBIAR
					params.master = "DGFARM";//CAMBIAR
					params.pais = { 'idPais': mainServices.getIdPais() };//CAMBIAR mainServices.

					params.dirFiscal = self.editarEmpresas.direccionFiscal;
					params.cuentas = [];

					if (self.editarEmpresas.bancos) {
						for (var i = 0; i < self.editarEmpresas.bancos.length; i++) {

							self.buscarIdBanco(self.editarEmpresas.bancos[i].nombre);
							params.cuentas.push({
								idCuenta: "0",
								nuCuenta: self.editarEmpresas.bancos[i].numero,
								idBanco: self.aux,
								tipoCuenta: self.editarEmpresas.bancos[i].tipo,
								rifEmpresa: self.editarEmpresas.rif
							});

							switch (params.cuentas[i].tipoCuenta) {
								case 'Ahorro':
									params.cuentas[i].tipoCuenta = 1;
									break;
								case 'Corriente':
									params.cuentas[i].tipoCuenta = 0;
									break;
							};
						}
					}

					if (self.editarEmpresas.estatus == 'Activo')
						params.estatus = 1;
					else if (self.editarEmpresas.estatus == 'Inactivo')
						params.estatus = 0

					console.log(params);

					break;
			}
			console.log('antes del servicio');

			empresaServices.agregarEmpresa(params)
				.success(function (data) {
					console.log('agrege empresa');

					if (data.codigo = 200) {
						empresaServices.agregarCuentaEmpresa(params)
							.success(function (data) {
								switch (option) {
									case 'agregar':
										new PNotify({
											title: 'Empresa creada!',
											text: 'La empresa fue creada con éxito.',
											type: 'success',
											styling: 'bootstrap3',
											cornerclass: 'ui-pnotify-sharp'
										});
										break;

									case 'editar':
										new PNotify({
											title: 'Empresa Editada!',
											text: 'La empresa fue editada con éxito.',
											type: 'success',
											styling: 'bootstrap3',
											cornerclass: 'ui-pnotify-sharp'
										});
										break;

									default:
										break;
								};

								if (self.views.editarEmpresa)
									self.consultarEmpresaServices('listarEmpresa');
								if (self.view.agregarEmpresa)
									self.consultarEmpresaServices('agregarEmpresa');


								self.setObjectElems(self.datos, undefined);
								self.setObjectElems(self.direccion, undefined);
								self.desc = undefined;
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

					} else {

						switch (option) {
							case 'agregar':
								new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de crear la empresa.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								break;

							case 'editar':
								new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de editar la empresa.',
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
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				});

			console.log('Despues del servicio');
		};

		this.eliminarEmpresaCuentaServices = function(){
		  console.log('eliminarEmpresaCuentaServices..');
		  self.buscarIdBanco(self.editarEmpresas.bancos[self.auxIndice].nombre);
		  var params = {
		      "idEmpresaBanco": self.editarEmpresas.bancos[self.auxIndice].idEmpresaBanco,
		      "nuRifEmpresa":self.editarEmpresas.rif,
		      "idBanco": self.aux
		  };
					empresaServices.eliminarEmpresaCuenta(params)
						.success(function (data) {
							console.log(data);
							new PNotify({
									title: '¡Número de cuenta eliminada!',
									text: 'El número de cuenta fue eliminada con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
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

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/
		this.viewsController = function (view) {
			self.setObjectElems(self.views, false);
			self.fillBancosFromInitialList();
			switch (view) {
				case 'agregarEmpresa':
					self.views.agregarEmpresa = true;
					console.log('viewsController > agregarEmpresa');
					break;
				case 'editarEmpresa':
					self.views.editarEmpresa = true;
					//self.views.listarEmpresa = true;
					console.log('viewsController > editarEmpresa');
					break;
				case 'listarEmpresa':
					self.views.listarEmpresa = true;
					console.log('viewsController > listarEmpresa');
					break;
				case 'verEmpresa':
					self.views.verEmpresa = true;
					console.log('viewsController > verEmpresa');
					break;
				default:
					break;
			}
		};

		this.agregarBanco = function () {
			if (self.views.agregarEmpresa) {
				var validatorResult = validator.checkAll($('#empresaBancos'));
				var bool = true;
				if (!self.datos.bancos) {
					self.datos.bancos = new Array();
				} else {
					for (var i = 0; i < self.datos.bancos.length; i++) {
						console.log(self.datos.bancos.numero);
						if (self.datos.bancos[i].numero == self.banco.numero) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese numero de cuenta',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
					}
				}

				if (validatorResult && bool) {
					self.aux = JSON.parse(JSON.stringify(self.banco));;
					self.datos.bancos.push(self.aux);
					self.setObjectElems(self.banco, undefined);
					self.aux = undefined;
				}
			}
			if (self.views.editarEmpresa) {
				var validatorResult = validator.checkAll($('#editarEmpresaBancos'));
				var bool = true;
				for (var i = 0; i < self.editarEmpresas.bancos.length; i++) {
					console.log(self.editarEmpresas.bancos.numero);
					if (self.editarEmpresas.bancos[i].numero == self.banco.numero) {
						new PNotify({
							title: 'Error',
							text: 'Ya existe ese numero de cuenta',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
						bool = false;
					}
				}
				var id = self.buscarIdBanco(self.banco.nombre);
				console.log(id);
				if (validatorResult && bool && id != '-1') {
					self.aux = JSON.parse(JSON.stringify(self.banco));;
					self.editarEmpresas.bancos.push(self.aux);
					self.setObjectElems(self.banco, undefined);
					self.aux = undefined;
				}else if (!bool) {
					new PNotify({
						title: 'Error',
						text: 'La cuenta de banco ya se encuentra asociada.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}else if(id == '-1'){
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
			if (self.views.agregarEmpresa) {
				var a = self.datos.bancos.indexOf(elemt);
				console.log(self.banco);
				if(self.banco.nombre != undefined && self.banco.tipo != undefined && self.banco.numero != undefined){
					this.datos.bancos.push(self.banco);
				}
				self.banco = self.datos.bancos[a];
				this.datos.bancos.splice(a, 1);
			}
			if (self.views.editarEmpresa) {
				var a = self.editarEmpresas.bancos.indexOf(elemt);
				if(self.banco.nombre != undefined && self.banco.tipo != undefined && self.banco.numero != undefined){
					this.editarEmpresas.bancos.push(self.banco);
				}
				self.banco = self.editarEmpresas.bancos[a];
				this.editarEmpresas.bancos.splice(a, 1);
			}
		};

		this.eliminarbanco = function (elemt) {
			//console.log("elimando ");

			if (self.views.agregarEmpresa) {
				self.auxIndice = self.datos.bancos.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.datos.bancos[self.auxIndice].numero + '?';
			}
			if (self.views.editarEmpresa) {
				self.auxIndice = self.editarEmpresas.bancos.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.editarEmpresas.bancos[self.auxIndice].numero + '?';
			}
			self.listaMensaje = 'banco';
			$('.eliminarEmpresaModal').modal({
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
					break;
				}
			}
		};

		this.guardar = function () {
			if (self.views.agregarEmpresa) {
				var validatorResult = validator.checkAll($('#empresaDatos'));
				var exitnombre = false;
				var exitRIF = false;
				if (validatorResult) {
					for (var i = 0; i < self.listaEmpresa.length; i++) {
						if (self.listaEmpresa[i].nombre == self.datos.nombre) {
							exitnombre = true;
							console.log('repetido 1');
							break;
						}
						if (self.listaEmpresa[i].RIF == self.datos.rif) {
							exitRIF = true;
							console.log('repetido 2');
							break;
						}
					}
					if (exitnombre) {
						new PNotify({
							title: 'Error',
							text: 'El nombre ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else {

						if (exitRIF) {
							new PNotify({
								title: 'Error',
								text: 'El RIF ya existe.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						} else {
							/*
													self.setObjectElems(self.datos, undefined);
													self.setObjectElems(self.direccion, undefined);
													self.desc = undefined;	 */
							self.agregarEmpresaService('agregar');
						}
					}
				} else {
					var datosGenerales = $('#empresaDatosGenerales'),
						vistaCuentas = $('#empresaCuentasBancarias');
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaCuentas.hasClass('in'))
						{ vistaCuentas.collapse('hide'); console.log(' no abierto 2 valido'); }
					}

				}
			} else {
				var validatorResult = validator.checkAll($('#editarEmpresaDatos'));
				var exitnombre = false;
				var exitRIF = false;
				if (validatorResult) {
					for (var i = 0; i < self.listaEmpresa.length; i++) {
						console.log(self.listaEmpresa[i]);
						console.log(i);
						if (self.listaEmpresa[i].nombre == self.editarEmpresas.nombre && self.auxIndice != i) {
							exitnombre = true;
							console.log('repetido 1');
							break;
						}
						if (self.listaEmpresa[i].RIF == self.editarEmpresas.rif && self.auxIndice != i) {
							exitRIF = true;
							console.log('repetido 2');
							break;
						}
					}
					if (exitnombre) {
						new PNotify({
							title: 'Error',
							text: 'El nombre ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else {

						if (exitRIF) {
							new PNotify({
								title: 'Error',
								text: 'El RIF ya existe.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						} else {
							/* 	self.setObjectElems(self.datos, undefined);
								self.setObjectElems(self.direccion, undefined);
								self.desc = undefined;	 */
							self.agregarEmpresaService('editar');
						}
					}
				} else {
					var datosGenerales = $('#editarEmpresaDatosGenerales'),
						vistaCuentas = $('#editarEmpresaCuentasBancarias');
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaCuentas.hasClass('in'))
						{ vistaCuentas.collapse('hide'); console.log(' no abierto 2 valido'); }
					}

				}
			}
		};

		this.cancelar = function () {
			if (self.views.agregarEmpresa) {
				self.setObjectElems(self.datos, undefined);
				self.setObjectElems(self.direccion, undefined);
				self.desc = undefined;
			} else {
				this.viewsController('listarEmpresa');
			}
		};

		this.consultarempresa = function (elemt) {
			self.consultarDetalleEmpresa("modal");
		};

		this.editarempresa = function (elemt) {
			self.consultarDetalleEmpresa("editar");
		};

		this.eliminarempresa = function (elemt) {
			console.log('preparando para eliminar');
			this.auxIndice = this.listaEmpresa.indexOf(elemt);
			self.datos.nombre = elemt.nombre;
			self.mensaje = '¿Está seguro que desea eliminar la Empresa  ' + self.datos.nombre + ' ?';
			$('.eliminarEmpresaModal').modal({
				show: 'true'
			});

		};

		this.eliminarModal = function (opcion) {
			switch (opcion) {
				case 'aceptar':
					//CALL SERVICE

					if (self.listaMensaje == 'empresa') {
						$('.modal-backdrop').remove();
						$('#tablaConsultarempresa').DataTable().row('.choosed').remove().draw(false);
						self.listaEmpresa.splice(self.auxIndice, 1);
						new PNotify({
							title: '¡Empresa eliminada!',
							text: 'La Empresa fue eliminada con éxito.',
							type: 'success',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}

					//CALL SERVICE2
					if (self.listaMensaje == 'banco') {

						if(self.views.agregarEmpresa)
							self.datos.bancos.splice(self.auxIndice, 1);

						if(self.views.editarEmpresa){
							console.log(self.editarEmpresas.bancos);
							console.log(self.editarEmpresas.bancos[self.auxIndice].idEmpresaBanco);
							if(self.editarEmpresas.bancos[self.auxIndice].idEmpresaBanco == undefined || self.editarEmpresas.bancos[self.auxIndice].idEmpresaBanco != 0){
								self.eliminarEmpresaCuentaServices();
								self.editarEmpresas.bancos.splice(self.auxIndice, 1);
							}else{
								self.editarEmpresas.bancos.splice(self.auxIndice, 1);
							}
						}



						$('.modal-backdrop').remove();

						//LLAMADA AL SERVICIO
					}

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



		$rootScope.$on('agregarEmpresa', function () {
			self.consultarEmpresaServices('agregarEmpresa');
		});

		$rootScope.$on('editarEmpresa', function () {

			self.viewsController('editarEmpresa');
		});

		$rootScope.$on('listarEmpresa', function () {
			self.consultarEmpresaServices('listarEmpresa');
		});

		$('#tablaConsultarempresa tbody').on('click', 'tr', function () {
			$('#tablaConsultarempresa').DataTable().$('tr.choosed').removeClass('choosed');
			$(this).addClass('choosed');
		});

		$('#nombreEmpresa').on('blur', null, validator.checkField);
		$('#rifEmpresa').on('blur', null, validator.checkField);
		$('#dirFiscalEmpresa').on('blur', null, validator.checkField);
		$('#tlfFiscalEmpresa').on('blur', null, validator.checkField);
		$('#descEmpresa').on('blur', null, validator.checkField);
		$('#correoElectronico').on('blur', null, validator.checkField);
		$('#nombreBanco').on('blur', null, validator.checkField);
		$('#numeroBanco').on('blur', null, validator.checkField);


		$('#editarNombreEmpresa').on('blur', null, validator.checkField);
		$('#editarRifEmpresa').on('blur', null, validator.checkField);
		$('#editarDirFiscalEmpresa').on('blur', null, validator.checkField);
		$('#editarTlfFiscalEmpresa').on('blur', null, validator.checkField);
		$('#editarDescEmpresa').on('blur', null, validator.checkField);
		$('#editarCorreoElectronico').on('blur', null, validator.checkField);
		$('#editarNomBanco').on('blur', null, validator.checkField);
		$('#editarNumeroBanco').on('blur', null, validator.checkField);

		this.destroyTable = function () {
			$('#tablaConsultarempresa').dataTable().fnDestroy();
			console.log('on destroyTable function..');
			self.createTable();
		};

		this.createTable = function () {

			var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
										<a class="verEmpresa cursor-pointer" data-toggle="modal">\
										<i class="fa fa-search"></i>\
										</a>\
									</td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editEmpre' && permisos[i].inEstatus == 1){
					console.log('has editar empre');
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
				acciones = '<td style="text-align: center;">\
										<a class="verEmpresa cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
											<i class="fa fa-search"></i>\
										</a>\
										<a class="editarEmpresa cursor-pointer" style="margin-right: 10px">\
											<i class="fa fa-pencil"></i>\
										</a>\
									</td>';
			}

			$('#tablaConsultarempresa').DataTable({
				data: self.listaEmpresa,
				aoColumns: [
					{ 'data': 'nombre', sDefaultContent: '' },
					{ 'data': 'rif', sDefaultContent: '' },
					// { 'data': 'dirFiscal', sDefaultContent: '' },
					// { 'data': 'tlfFiscal', sDefaultContent: '' },
					{ 'data': 'estatus', sDefaultContent: '' },
					{ 'defaultContent': acciones }
				],
				columnDefs: [
					{ "className": "text-center", "targets": "_all" }
				]
			});

			$('#tablaConsultarempresa tbody').on('click', '.verEmpresa', function () {

				self.empresaModal = undefined;

				self.empresaModal = $('#tablaConsultarempresa').DataTable().row($(this).parents('tr')).data();
				console.log(self.empresaModal);

				//self.auxIndice = self.listaEmpresa.indexOf(self.empresaModal);

				console.log(self.listaEmpresa[self.auxIndice]);

				$('.activarModalEmpresa').click();
			});

			$('#tablaConsultarempresa tbody').on('click', '.editarEmpresa', function () {

				self.editarEmpresas = undefined;

				self.editarEmpresas = $('#tablaConsultarempresa').DataTable().row($(this).parents('tr')).data();
				console.log(self.editarEmpresas);

				self.auxIndice = self.listaEmpresa.indexOf(self.editarEmpresas);

				console.log(self.auxIndice);

				$('.activarEditarEmpresa').click();
			});
			/*  	$('#tablaConsultarempresa tbody').on( 'click', '.eliminarRamo', function () {
							var data = $('#tablaConsultarempresa').DataTable().row( $(this).parents('tr') ).data();
							//self.nombreEliminarBanco = data.nombre;
							self.editarRamos = data;
							console.log(data);
						//  var spanBancoModalText = data.nombre;
							$("#spanRamoModal").text( data.nombre );
							$('.eliminarRamoModal').modal({
								show: 'true'
							});

						});

						 $('#tablaConsultarempresa tbody').on( 'click', 'tr', function () {
							$('#tablaConsultarempresa').DataTable().$('tr.choosed').removeClass('choosed');
							$(this).addClass('choosed');
						});  */
		};
		/*
		$('#nombreBanco').autocomplete({
			lookup: self.listaBancos,
			onSelect: function (suggestion){
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#nombreBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});

		$('#editarNomBanco').autocomplete({
			lookup: self.listaBancos,
			onSelect: function (suggestion){
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#editarNomBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});		*/


		$('.empresa.collapse-link').on('click', function () {

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
