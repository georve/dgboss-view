(function () {

	'use strict';

	var aseguradoraController = angular.module('DGBOSS.aseguradoraController', ['DGBOSS.aseguradoraServices', 'DGBOSS.mainServices','DGBOSS.inicioServices']);

	aseguradoraController.controller('aseguradoraController', ['$scope', '$rootScope', 'aseguradoraServices', 'mainServices','inicioServices' ,function ($scope, $rootScope, aseguradoraServices, mainServices,inicioServices) {

		var self = this;

		console.log('aseguradoraController activated.');

		console.log(mainServices);

		/********************************************************************************************
		**                                      V A R I A B L E S                                  **
		********************************************************************************************/

		/*
		  this.views: { this will set the insured view. }
		*/
		this.views = {
			agregarAseguradora: false,
			verAseguradora: false,
			editarAseguradora: false,
			listarAseguradoras: false
		};
		/*
			*/
		this.datos = {
			nombre: undefined,
			rif: undefined,
			nu_credencial: undefined,
			bancos: [],
			redesSociales: []
		};
		/*
	  */
		this.direccion = {
			dirFiscal: undefined,
			tlfFiscal: undefined
		};

		/*
		contacto de una aseguradora
		*/
		this.contacto = {

			nombre: undefined,
			cargo: undefined,
			tlf: undefined
		};

		/*
		 informacion relacionda al corretajes
		 */
		this.corretaje = {
			nu_credencial: undefined,
			di_fiscal: undefined
		};
		/*
		lista de contactos de una aseguradora
		*/
		this.contactos = [];
		/*
	  */
		this.extranet = {
			nombre: undefined,
			usuario: undefined,
			contrasena: undefined,
			url: undefined
		};
		/*
	  */
		this.internet = {
			pagWeb: undefined,
			facebook: undefined,
			instagram: undefined,
			twitter: undefined,
			otras: undefined
		};

		this.red = {
			nombre: undefined,
			usuario: undefined
		};


		this.banco = {
			idCuenta: undefined,
			nombre: undefined,
			tipo: undefined,
			numero: undefined
		};

		/*
		lista con todas las aseguradoras
		*/
		this.aux = undefined;

		this.auxIndice = undefined;

		this.auxContrasena = undefined;
		/*
		*/
		this.listaBancos = [];

		this.auxListaBanco=[];
		/*
		*/
		this.listaAseguradora = [];

		this.aseguradoraModal = undefined;

		this.tiposRif = ['G-', 'J-'];

		this.auxTipoRif = undefined;





		/*
		*/
		/********************************************************************************************
		**                                      F U N C T I O N S                                  **
		********************************************************************************************/


		this.fillBancosFromInitialList=function(){
     console.log('fillBancosFromInitialList aseguradoras');
			//this.listaBancos=mainServices.getBancos();
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
			console.log('nomBanco', $('#nomBanco'));
			$('#nomBanco').autocomplete({
				lookup: self.auxListaBanco,
				onSelect: function (suggestion) {
					self.banco.nombre = suggestion.value;
					suggestion = null;
					$('#nomBanco').closest('.item').removeClass('bad').find('.alert').remove();
				}
			});

			$('#editarAseguradoraNomBanco').autocomplete({
				lookup: self.auxListaBanco,
				onSelect: function (suggestion) {
					self.banco.nombre = suggestion.value;
					suggestion = null;
					$('#editarAseguradoraNomBanco').closest('.item').removeClass('bad').find('.alert').remove();
				}
			});



		};

		this.fillBancosFromInitialList();

		this.setObjectElems = function (obj, option) {
			angular.forEach(obj, function (value, key) {
				obj[key] = option;
			});
		};

		/********************************************************************************************
		**                                       S E R V I C E S                                   **
		********************************************************************************************/





		this.consultaAseguradoraServices = function (view) {
			console.log('consultaAseguradoraServices..');

			self.fillBancosFromInitialList();
			var params = {
				id: mainServices.getIdPais() //id_pais, cambiar cuando este el webTokin
			}
			aseguradoraServices.consultarAseguradoras(params)
				.success(function (data) {
					console.log(data);
					self.listaAseguradora = [];
					self.contactos = [];
					if (data.length == 0) {
						new PNotify({
							title: '¡Alerta!',
							text: 'Disculpe. Aún no hay aseguradoras registradas.',
							type: 'notice',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}

					for (var i = 0; i < data.length; i++) {
						switch (data[i].in_estatus) {
							case 1:
								data[i].in_estatus = 'Activo';
								break;
							case 0:
								data[i].in_estatus = 'Inactivo';
								break;
						};

						self.listaAseguradora.push({
							nombre: data[i].nb_aseguradora,
							logo: 'images/Logos/' + data[i].nu_rif + '.png',//Posible bug en el servidor
							rif: data[i].nu_rif,
							// nu_credencial: data[i].nu_credencial,
							dirFiscal: data[i].di_fiscal,
							tlfFiscal: data[i].nu_telefono,
							estatus: data[i].in_estatus,
							pais: data[i].id_pais,
							bancos: [],// JSON.parse(JSON.stringify(data[i].cuentas)),
							contactos: [],
							redesSociales: [],
							extranet: {
								id: undefined,
								nombre: undefined,
								usuario: undefined,
								contrasena: undefined,
								url: undefined
							},
							internet: {
								pagWeb: undefined,
								facebook: undefined,
								instagram: undefined,
								twitter: undefined
							},
							corretajes: []
						});
					};
					data = undefined;
					console.log(self.listaAseguradora);
					self.cancelar();

					if (!$.fn.DataTable.isDataTable('#tablaConsultarAseguradoras')) {
						self.createTable();
					} else {
						self.destroyTable();
					}

				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');

					if (!$.fn.DataTable.isDataTable('#tablaConsultarAseguradoras')) {
						self.createTable();
					} else {
						self.destroyTable();
					}
				});

			//LLAMADA TEMPORAL AL LOS SERVICIOS







			self.viewsController(view);

		};

		this.agregarAseguradoraService = function (option) {

    self.fillBancosFromInitialList();


			switch (option) {
				case 'agregar':
					var params = {
						id: 0,
						estatus: 1,
						nombre: self.datos.nombre,
						rif: self.auxTipoRif + self.datos.rif,
						//nu_credencial: self.datos.nu_credencial,
						//txCorreo: self.datos.txCorreo,
						tlfFiscal: self.direccion.tlfFiscal,
						dirFiscal: self.direccion.dirFiscal,
						//master: { 'idMaster': mainServices.getIdMaster() }, //cambiar ,
						pais: mainServices.getIdPais(), //cambiar ,
						contactos: [],
						redesSociales: [],
						extranet: undefined, //JSON.parse(JSON.stringify(self.extranet);
						cuentas: [],  //JSON.parse(JSON.stringify(self.datos.bancos);
						corretajes: []
					};

					if (self.datos.redesSociales)
						params.redesSociales = JSON.parse(JSON.stringify(self.datos.redesSociales));

					if (self.contactos)
						params.contactos = JSON.parse(JSON.stringify(self.contactos));

					//llenado de cuentas de banco
					console.log('bancos', self.datos.bancos);
					if (self.datos.bancos) {

						for (var i = 0; i < self.datos.bancos.length; i++) {
							switch (self.datos.bancos[i].tipo) {
								case 'Ahorro':
									self.datos.bancos[i].tipo = 1;
									break;
								case 'Corriente':
									self.datos.bancos[i].tipo = 0;
									break;
							};

							params.cuentas.push({
								idCuenta: self.datos.bancos[i].idCuenta,
								nuCuenta: self.datos.bancos[i].numero,
								tipoCuenta: self.datos.bancos[i].tipo,
								idBanco: self.buscarIdBanco(self.datos.bancos[i].nombre),
								rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA  mainServices.getRifEmpresa()
							});
						}
					}
					//llenado de redesSociales
					if (self.internet.pagWeb) {
						params.redesSociales.push({
							id: "0",
							redSocial: "pagWeb",
							descripcion: self.internet.pagWeb,
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.internet.facebook) {
						params.redesSociales.push({
							id: "0",
							redSocial: "facebook",
							descripcion: self.internet.facebook,
							rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.internet.instagram) {
						params.redesSociales.push({
							id: "0",
							redSocial: "instagram",
							descripcion: self.internet.instagram,
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.internet.twitter) {
						params.redesSociales.push({
							id: "0",
							redSocial: "twitter",
							descripcion: self.internet.twitter,
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.internet.otras) {
						params.redesSociales.push({
							id: "0",
							redSocial: self.internet.otras,
							descripcion: "Red social",
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					//llenado de extranet
					if (self.extranet.nombre && self.extranet.usuario && self.extranet.contrasena && self.extranet.url) {
						console.log('insert extranet');
						params.extranet = {
							id: "0",
							nombre: self.extranet.nombre,
							usuario: self.extranet.usuario,
							contrasena: self.extranet.contrasena,
							url: self.extranet.url,
							rifEmpresa: mainServices.getRifEmpresa()	//RIF DE EMPRESA mainServices.getRifEmpresa()
						};
					}
					//llenado de informacion corretajes
					if (self.datos.nu_credencial || self.direccion.dirFiscal) {
						params.corretajes.push(
							{
								id: 0,
								rifEmpresa: mainServices.getRifEmpresa(),
								rifAseguradora: self.auxTipoRif + self.datos.rif,
								di_fiscal: self.direccion.dirFiscal,
								nu_credencial: self.datos.nu_credencial
							}
						);

					}



					var params2 = {

						id: params.id,
						nu_rif: params.rif,
						nb_aseguradora: params.nombre,
						nu_credencial: params.nu_credencial,
						di_fiscal: params.dirFiscal,
						nu_telefono: params.tlfFiscal,
						in_estatus: params.estatus,
						id_pais: params.pais,
						cuentas: params.cuentas
					};
					console.log(params2);
					aseguradoraServices.agregarAseguradora(params2)
						.success(function (data) {
							console.log(data);

							// new PNotify({
							// 	title: '!Aseguradora  Creada!',
							// 	text: 'La aseguradora fue creada con éxito.',
							// 	type: 'success',
							// 	styling: 'bootstrap3',
							// 	cornerclass: 'ui-pnotify-sharp'
							// })
							console.log('antes del serviciga agregar contactos');
							console.log(params);
							aseguradoraServices.agregarContactosAseguradora(params)
								.success(function (data) {
									console.log(data);

									new PNotify({
										title: '!Aseguradora  Creada!',
										text: 'La aseguradora fue creada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									self.consultaAseguradoraServices('listarAseguradora');

									self.setObjectElems(self.datos, undefined);
									self.setObjectElems(self.direccion, undefined);
									self.setObjectElems(self.contacto, undefined);
									self.contactos = [];
									self.setObjectElems(self.banco, undefined);
									self.setObjectElems(self.extranet, undefined);
									self.setObjectElems(self.internet, undefined);
									self.datos.redesSociales = [];
									self.datos.bancos = [];

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
					console.log(params);
					break;
				case 'editar':
					var params = {
						// id: self.editarAseguradoras.id,
						estatus: self.editarAseguradoras.estatus,
						in_estatus: self.editarAseguradoras.estatus,
						nombre: self.editarAseguradoras.nombre,
						nb_aseguradora: self.editarAseguradoras.nombre,
						rif: self.editarAseguradoras.rif,
						nu_rif: self.editarAseguradoras.rif,
						//nu_credencial: self.editarAseguradoras.nu_credencial,
						txCorreo: self.editarAseguradoras.txCorreo,
						tlfFiscal: self.editarAseguradoras.tlfFiscal,//SE PUEDE BORRAR
						nu_telefono: self.editarAseguradoras.tlfFiscal,
						//dirFiscal: self.editarAseguradoras.dirFiscal,
						master: { 'idMaster': mainServices.getIdMaster() },
						pais: { 'idPais': mainServices.getIdPais() },
						id_pais:  mainServices.getIdPais(),
						contactos: JSON.parse(JSON.stringify(self.editarAseguradoras.contactos)),
						redesSociales: [],
						extranet: undefined, //JSON.parse(JSON.stringify(self.extranet);
						cuentas: [],  //JSON.parse(JSON.stringify(self.datos.bancos);
						corretajes: []
					};
					//llenado de cuentas de banco
					if (self.editarAseguradoras.bancos) {
						for (var i = 0; i < self.editarAseguradoras.bancos.length; i++) {
							self.buscarIdBanco(self.editarAseguradoras.bancos[i].nombre);
							params.cuentas.push({
								idCuenta: self.editarAseguradoras.bancos[i].idCuenta,
								nuCuenta: self.editarAseguradoras.bancos[i].numero,
								tipoCuenta: self.editarAseguradoras.bancos[i].tipo,
								idBanco: self.aux,
								rifEmpresa: mainServices.getRifEmpresa(),	//RIF DE EMPRESA mainServices.getRifEmpresa()
								rifAseguradora: self.editarAseguradoras.rif
							});
							switch (params.cuentas[i].tipoCuenta) {
								case 'Ahorro':
									params.cuentas[i].tipo = 1;
									break;
								case 'Corriente':
									params.cuentas[i].tipo = 0;
									break;
							};
						}
					}
					//llenado de redesSociales
					if (self.editarAseguradoras.internet.pagWeb) {
						params.redesSociales.push({
							id: "0",
							redSocial: "pagWeb",
							descripcion: self.editarAseguradoras.pagWeb,
							rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.editarAseguradoras.internet.facebook) {
						params.redesSociales.push({
							id: "0",
							redSocial: "facebook",
							descripcion: self.editarAseguradoras.facebook,
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.editarAseguradoras.internet.instagram) {
						params.redesSociales.push({
							id: "0",
							redSocial: "instagram",
							descripcion: self.editarAseguradoras.instagram,
							rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					if (self.editarAseguradoras.internet.twitter) {
						params.redesSociales.push({
							id: "0",
							redSocial: "twitter",
							descripcion: self.editarAseguradoras.twitter,
							rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA mainServices.getRifEmpresa()
						});
					}
					//llenado de extranet
					if (self.editarAseguradoras.extranet.id) {
						params.extranet = {
							id: self.editarAseguradoras.extranet.id,
							nombre: self.editarAseguradoras.extranet.nomUser,
							usuario: self.editarAseguradoras.extranet.usuario,
							contrasena: self.editarAseguradoras.extranet.contrasena,
							url: self.editarAseguradoras.extranet.url,
							rifEmpresa: mainServices.getRifEmpresa(),//RIF DE EMPRESA mainServices.getRifEmpresa()
							rifAseguradora: self.editarAseguradoras.rif
						};
					}

					//llenado de informacion corretajes
					if (self.editarAseguradoras.nu_credencial || self.editarAseguradoras.dirFiscal) {

						if (self.editarAseguradoras.corretajes.length > 0) {
							params.corretajes.push(
								{
									id: self.editarAseguradoras.corretajes[0].id,
									rifEmpresa: self.editarAseguradoras.corretajes[0].rifEmpresa,
									rifAseguradora: self.editarAseguradoras.corretajes[0].rifAseguradora,
									di_fiscal: self.editarAseguradoras.dirFiscal,
									nu_credencial: self.editarAseguradoras.nu_credencial,
								});


						} else {

							params.corretajes.push(
								{
									id: 0,
									rifEmpresa: mainServices.getRifEmpresa(),
									rifAseguradora: self.editarAseguradoras.rif,
									di_fiscal: self.editarAseguradoras.dirFiscal,
									nu_credencial: self.editarAseguradoras.nu_credencial,

								});

						}

					}
					//params = JSON.parse(JSON.stringify(self.editarAseguradoras));
					console.log(params);
					if (self.editarAseguradoras.estatus == 'Activo')
						params.estatus = 1;
					else if (self.editarAseguradoras.estatus == 'Inactivo')
						params.estatus = 0;

					console.log('antes del servicio');
					console.log(params);
					aseguradoraServices.agregarContactosAseguradora(params)
						.success(function (data) {
							console.log(data);
							if (data.codigo = 200) {
								new PNotify({
									title: '!Aseguradora  Editada!',
									text: 'La aseguradora  fue editada con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								self.consultaAseguradoraServices('listarAseguradora');

								self.setObjectElems(self.datos, undefined);
								self.setObjectElems(self.direccion, undefined);
								self.setObjectElems(self.contacto, undefined);
								self.setObjectElems(self.extranet, undefined);
								self.setObjectElems(self.internet, undefined);
								self.setObjectElems(self.banco, undefined);
								self.setObjectElems(self.editarAseguradoras, undefined);
								self.contacto = [];
								self.extranet = [];
								self.banco = [];

							} else {
								new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de editar la aseguradora.',
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
					console.log('Despues del servicio');

					break;
			}

		};

		this.consultarDetallesAseguradora = function (view) {
			console.log('consultarDetalleAseguradoraServices..');
			switch (view) {
				case 'editar':
					var params = {
						rifAseguradora: self.editarAseguradoras.rif,
						rifEmpresa: mainServices.getRifEmpresa()//mainServices.getRifEmpresa()
					};

					aseguradoraServices.consultarContactos(params)
						.success(function (data) {
							self.editarAseguradoras.contactos = [];
							self.editarAseguradoras.bancos = [];
							self.editarAseguradoras.redesSociales = [];
							self.editarAseguradoras.corretajes = [];
							console.log(data);
							for (var i = 0; i < data.contactos.length; i++) {
								self.editarAseguradoras.contactos.push({
									id: data.contactos[i].id,
									contacto: data.contactos[i].contacto,
									cargo: data.contactos[i].cargo,
									nuTelefono: data.contactos[i].nuTelefono,
									rifEmpresa: data.contactos[i].rifEmpresa,
									rifAseguradora: data.contactos[i].rifAseguradora
								});
							};
							for (var i = 0; i < data.cuentas.length; i++) {
								switch (data.cuentas[i].tipoCuenta) {
									case 1:
										data.cuentas[i].tipoCuenta = 'Ahorro';
										break;
									case 0:
										data.cuentas[i].tipoCuenta = 'Corriente';
										break;
								};
								self.buscarNombreBanco(data.cuentas[i].idBanco);
								self.editarAseguradoras.bancos.push({
									nombre: self.aux,
									idCuenta: data.cuentas[i].idCuenta,
									numero: data.cuentas[i].nuCuenta,
									tipo: data.cuentas[i].tipoCuenta
								});
							};
							for (var i = 0; i < data.redesSociales.length; i++) {
								switch (data.redesSociales[i].redSocial) {
									case 'facebook':
										self.editarAseguradoras.internet.facebook = data.redesSociales[i].descripcion;
										self.editarAseguradoras.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'pagWeb':
										self.editarAseguradoras.internet.pagWeb = data.redesSociales[i].descripcion;
										self.editarAseguradoras.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'instagram':
										self.editarAseguradoras.internet.instagram = data.redesSociales[i].descripcion;
										self.editarAseguradoras.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'twitter':
										self.editarAseguradoras.internet.twitter = data.redesSociales[i].descripcion;
										self.editarAseguradoras.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;

								};
							};

							if (data.extranet) {
								self.editarAseguradoras.extranet.id = data.extranet.id;
								self.editarAseguradoras.extranet.nomUser = data.extranet.nombre;
								self.editarAseguradoras.extranet.usuario = data.extranet.usuario;
								self.editarAseguradoras.extranet.contrasena = undefined;
								self.auxContrasena = data.extranet.contrasena;
								self.editarAseguradoras.extranet.url = data.extranet.url;
							};

							for (var i = 0; i < data.corretajes.length; i++) {
								self.editarAseguradoras.corretajes.push(
									{
										id: data.corretajes[i].id,
										rifEmpresa: data.corretajes[i].rifEmpresa,
										rifAseguradora: data.corretajes[i].rifAseguradora,
										di_fiscal: data.corretajes[i].di_fiscal,
										nu_credencial: data.corretajes[i].nu_credencial == 'null' ? '' : data.corretajes[i].nu_credencial,

									}
								);

							};

							/*if (self.editarAseguradoras.corretajes > 0) {
								self.editarAseguradoras.dirFiscal = self.editarAseguradoras.corretajes[0].di_fiscal == undefined ? " " : self.editarAseguradoras.corretajes[0].di_fiscal;
								self.editarAseguradoras.nu_credencial = self.editarAseguradoras.corretajes[0].nu_credencial == undefined ? " " : self.editarAseguradoras.corretajes[0].nu_credencial;

							}*/
							self.editarAseguradoras.dirFiscal = self.editarAseguradoras.corretajes[0].di_fiscal;

							console.log(self.editarAseguradoras);
							data = undefined;
							//	self.viewsController('editarEmpresa');//Esto lo borre ni idea de por que esta aqui

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
						rifAseguradora: self.aseguradoraModal.rif,//G-20008701-3
						rifEmpresa: mainServices.getRifEmpresa()//
					};

					aseguradoraServices.consultarContactos(params)
						.success(function (data) {
							console.log(data);
							self.aseguradoraModal.contactos = [];
							self.aseguradoraModal.bancos = [];
							self.aseguradoraModal.redesSociales = [];
							self.aseguradoraModal.corretajes = [];

							for (var i = 0; i < data.contactos.length; i++) {

								self.aseguradoraModal.contactos.push({
									id: data.contactos[i].id,
									contacto: data.contactos[i].contacto,
									cargo: data.contactos[i].cargo,
									nuTelefono: data.contactos[i].nuTelefono,
									rifEmpresa: data.contactos[i].rifEmpresa,
									rifAseguradora: data.contactos[i].rifAseguradora
								});
							};
							for (var i = 0; i < data.cuentas.length; i++) {
								switch (data.cuentas[i].tipoCuenta) {
									case 1:
										data.cuentas[i].tipoCuenta = 'Ahorro';
										break;
									case 0:
										data.cuentas[i].tipoCuenta = 'Corriente';
										break;
								};

								self.buscarNombreBanco(data.cuentas[i].idBanco);

								self.aseguradoraModal.bancos.push({
									idBanco: self.aux,
									idCuenta: data.cuentas[i].idCuenta,
									nuCuenta: data.cuentas[i].nuCuenta,
									tipoCuenta: data.cuentas[i].tipoCuenta,
									rifEmpresa: data.cuentas[i].rifEmpresa,
									rifAseguradora: data.cuentas[i].rifAseguradora
								});
							};

							for (var i = 0; i < data.redesSociales.length; i++) {
								switch (data.redesSociales[i].redSocial) {
									case 'facebook':
										self.aseguradoraModal.internet.facebook = data.redesSociales[i].descripcion;
										self.aseguradoraModal.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'pagWeb':
										self.aseguradoraModal.internet.pagWeb = data.redesSociales[i].descripcion;
										self.aseguradoraModal.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'instagram':
										self.aseguradoraModal.internet.instagram = data.redesSociales[i].descripcion;
										self.aseguradoraModal.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									case 'twitter':
										self.aseguradoraModal.internet.twitter = data.redesSociales[i].descripcion;
										self.aseguradoraModal.redesSociales.push({
											id: data.redesSociales[i].id,
											redSocial: data.redesSociales[i].redSocial,
											descripcion: data.redesSociales[i].descripcion,
											rifEmpresa: data.redesSociales[i].rifEmpresa,
											rifAseguradora: data.redesSociales[i].rifAseguradora
										});
										break;
									/*									default:
																			self.aseguradoraModal.redesSociales.push({
																				id: data.redesSociales[i].id,
																				redSocial: data.redesSociales[i].contacto,
																				descripcion: data.redesSociales[i].descripcion,
																				rifEmpresa: data.redesSociales[i].rifEmpresa,
																				rifAseguradora: data.redesSociales[i].rifAseguradora
																			});
																			break;*/
								};
							};

							if (data.extranet) {
								self.aseguradoraModal.extranet.id = data.extranet.id;
								self.aseguradoraModal.extranet.nomUser = data.extranet.usuario;
								self.aseguradoraModal.extranet.usuario = data.extranet.nombre;
								self.aseguradoraModal.extranet.contrasena = data.extranet.contrasena;
								self.aseguradoraModal.extranet.url = data.extranet.url;
							}

							for (var i = 0; i < data.corretajes.length; i++) {
								self.aseguradoraModal.corretajes.push(
									{
										id: data.corretajes[i].id,
										rifEmpresa: data.corretajes[i].rifEmpresa,
										rifAseguradora: data.corretajes[i].rifAseguradora,
										di_fiscal: data.corretajes[i].di_fiscal,
										nu_credencial: data.corretajes[i].nu_credencial == 'null' ? '' : data.corretajes[i].nu_credencial,

									}
								);

							};


							if (self.aseguradoraModal.corretajes.length > 0) {
								self.aseguradoraModal.dirFiscal = self.aseguradoraModal.corretajes[0].di_fiscal == undefined ? " " : self.aseguradoraModal.corretajes[0].di_fiscal;
								self.aseguradoraModal.nu_credencial = self.aseguradoraModal.corretajes[0].nu_credencial == undefined ? " " : self.aseguradoraModal.corretajes[0].nu_credencial;

							}


							console.log(self.aseguradoraModal.extranet.id);
							data = undefined;
							$('#consultarAseguradora').modal('show');

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

		this.agregarDetallesAseguradora = function () {
			var params = {
				//estatus: self.editarAseguradoras.estatus,
				id:0,
				in_estatus: self.editarAseguradoras.estatus == 'Activo'? 1:0,
				nb_aseguradora: self.editarAseguradoras.nombre,
				nu_rif: self.editarAseguradoras.rif,
				nu_telefono: self.editarAseguradoras.tlfFiscal,
				id_pais:  mainServices.getIdPais(),
				rif: self.editarAseguradoras.rif,
				contactos: JSON.parse(JSON.stringify(self.editarAseguradoras.contactos)),
				redesSociales: [], //JSON.parse(JSON.stringify(self.editarAseguradoras.redesSociales)),
				extranet: undefined, //JSON.parse(JSON.stringify(self.extranet);
				cuentas: [],   //JSON.parse(JSON.stringify(self.datos.bancos);
				corretajes: []
			};
			console.log(params.contactos);
			//llenado de cuentas de banco
			if (self.editarAseguradoras.bancos) {
				for (var i = 0; i < self.editarAseguradoras.bancos.length; i++) {
					self.buscarIdBanco(self.editarAseguradoras.bancos[i].nombre);

					params.cuentas.push({
						idCuenta: self.editarAseguradoras.bancos[i].idCuenta,
						nuCuenta: self.editarAseguradoras.bancos[i].numero,
						tipoCuenta: self.editarAseguradoras.bancos[i].tipo,
						idBanco: self.aux,
						rifEmpresa: mainServices.getRifEmpresa(),	//RIF DE EMPRESA
						rifAseguradora: self.editarAseguradoras.rif
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
			//llenado de redesSociales
			self.editarAseguradoras.internet.pagWeb = document.getElementById('editarWebInt').value;
			if (self.editarAseguradoras.internet.pagWeb != '' && self.editarAseguradoras.internet.pagWeb) {
				console.log("agrege");
				if (self.editarAseguradoras.redesSociales.length == 0) {
					params.redesSociales.push({
						id: "0",
						redSocial: "pagWeb",
						descripcion: self.editarAseguradoras.internet.pagWeb,
						rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA
					});
				} else {
					params.redesSociales.push({
						id: self.editarAseguradoras.redesSociales[0].id,
						redSocial: "pagWeb",
						descripcion: self.editarAseguradoras.internet.pagWeb,
						rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA
					});
				}
			}

			if (self.editarAseguradoras.internet.facebook) {
				if (self.editarAseguradoras.redesSociales.length == 0) {
					params.redesSociales.push({
						id: "0",
						redSocial: "facebook",
						descripcion: self.editarAseguradoras.internet.facebook,
						rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA
					});
				} else {
					params.redesSociales.push({
						id: self.editarAseguradoras.redesSociales[1].id,
						redSocial: "facebook",
						descripcion: self.editarAseguradoras.internet.facebook,
						rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA
					});
				}
			}

			if (self.editarAseguradoras.internet.instagram) {
				if (self.editarAseguradoras.redesSociales.length == 0) {
					params.redesSociales.push({
						id: "0",
						redSocial: "instagram",
						descripcion: self.editarAseguradoras.internet.instagram,
						rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA
					});
				} else {
					params.redesSociales.push({
						id: self.editarAseguradoras.redesSociales[2].id,
						redSocial: "instagram",
						descripcion: self.editarAseguradoras.internet.instagram,
						rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA
					});
				}
			}

			if (self.editarAseguradoras.internet.twitter) {
				if (self.editarAseguradoras.redesSociales.length == 0) {
					params.redesSociales.push({
						id: "0",
						redSocial: "twitter",
						descripcion: self.editarAseguradoras.internet.instagram,
						rifEmpresa: mainServices.getRifEmpresa()	  //RIF DE EMPRESA
					});
				} else {
					params.redesSociales.push({
						id: self.editarAseguradoras.redesSociales[3].id,
						redSocial: "twitter",
						descripcion: self.editarAseguradoras.internet.twitter,
						rifEmpresa: mainServices.getRifEmpresa()  //RIF DE EMPRESA
					});
				}
			}
			//llenado de extranet

			if (self.editarAseguradoras.extranet.nomUser && self.editarAseguradoras.extranet.id) {
				if (self.editarAseguradoras.extranet.contrasena == undefined || self.editarAseguradoras.extranet.contrasena == '') {
					params.extranet = {
						id: self.editarAseguradoras.extranet.id,
						nombre: self.editarAseguradoras.extranet.nomUser,
						usuario: self.editarAseguradoras.extranet.usuario,
						contrasena: self.auxContrasena,
						url: self.editarAseguradoras.extranet.url,
						rifEmpresa: mainServices.getRifEmpresa(),//RIF DE EMPRESA
						rifAseguradora: self.editarAseguradoras.rif
					};
				} else {
					params.extranet = {
						id: self.editarAseguradoras.extranet.id,
						nombre: self.editarAseguradoras.extranet.nomUser,
						usuario: self.editarAseguradoras.extranet.usuario,
						contrasena: self.editarAseguradoras.extranet.contrasena,
						url: self.editarAseguradoras.extranet.url,
						rifEmpresa: mainServices.getRifEmpresa(),//RIF DE EMPRESA
						rifAseguradora: self.editarAseguradoras.rif
					};
				}

			} else if (self.editarAseguradoras.extranet.nomUser) {
				params.extranet = {
					id: 0,
					nombre: self.editarAseguradoras.extranet.nomUser,
					usuario: self.editarAseguradoras.extranet.usuario,
					contrasena: self.editarAseguradoras.extranet.contrasena,
					url: document.getElementById('editarUrlExt').value,
					rifEmpresa: mainServices.getRifEmpresa(),//RIF DE EMPRESA
					rifAseguradora: self.editarAseguradoras.rif
				};
			}

			//llenado de la informacion de corretaje
			if (self.editarAseguradoras.nu_credencial || self.editarAseguradoras.dirFiscal) {
				if (self.editarAseguradoras.corretajes) {
					if (self.editarAseguradoras.corretajes.length == 0) {
						console.log("credenciales vacias");
						params.corretajes.push(
							{
								id: 0,
								rifEmpresa: mainServices.getRifEmpresa(),
								rifAseguradora: self.editarAseguradoras.rif,
								di_fiscal: self.editarAseguradoras.dirFiscal,
								nu_credencial: self.editarAseguradoras.nu_credencial,

							});


					} else {
						console.log("eixten elementos");
						if (self.editarAseguradoras.corretajes[0].id == undefined) {


							params.corretajes.push(
								{
									id: 0,
									rifEmpresa: mainServices.getRifEmpresa(),
									rifAseguradora: self.editarAseguradoras.rif,
									di_fiscal: self.editarAseguradoras.dirFiscal,
									nu_credencial: self.editarAseguradoras.nu_credencial,

								});

						} else {

							params.corretajes.push(
								{
									id: self.editarAseguradoras.corretajes[0].id,
									rifEmpresa: self.editarAseguradoras.corretajes[0].rifEmpresa,
									rifAseguradora: self.editarAseguradoras.corretajes[0].rifAseguradora,
									di_fiscal: self.editarAseguradoras.dirFiscal,
									nu_credencial: self.editarAseguradoras.nu_credencial,

								});



						}


					}
				}
			}
			// if (self.editarAseguradoras.estatus == 'Activo')
			// 	params.estatus = 1;
			// else if (self.editarAseguradoras.estatus == 'Inactivo')
			// 	params.estatus = 0

			console.log(params);
			console.log('antes del servicios');
			aseguradoraServices.agregarAseguradora(params)
				.success(function (data) {
					aseguradoraServices.agregarContactosAseguradora(params)
						.success(function (data) {
							console.log(data);

							if (data.codigo = 200) {

								new PNotify({
									title: '!Aseguradora  Editada!',
									text: 'La aseguradora  fue editada con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});

								self.consultaAseguradoraServices('listarAseguradoras');

								self.setObjectElems(self.datos, undefined);
								self.setObjectElems(self.direccion, undefined);
								self.setObjectElems(self.contacto, undefined);
								self.setObjectElems(self.extranet, undefined);
								self.setObjectElems(self.internet, undefined);
								self.setObjectElems(self.red, undefined);
								self.setObjectElems(self.banco, undefined);

							} else {
								new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de editar la aseguradora.',
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

		this.eliminarDetallesAseguradoraServices = function (option) {
			switch (option) {
				case 'banco':
					var params = {
						"id": self.editarAseguradoras.bancos[self.auxIndice].idCuenta,
						"rifEmpresa": mainServices.getRifEmpresa(),
						"rifAseguradora": self.editarAseguradoras.rif
					};
					aseguradoraServices.eliminarBancoAseguradora(params)
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
					break;
				case 'contacto':
					var params = {
						"id": self.editarAseguradoras.contactos[self.auxIndice].id,
						"rifEmpresa": mainServices.getRifEmpresa(),
						"rifAseguradora": self.editarAseguradoras.rif

					};
					aseguradoraServices.eliminarContactoAseguradora(params)
						.success(function (data) {
							console.log(data);
							new PNotify({
								title: '¡Contacto eliminado!',
								text: 'El contacto fue eliminado con éxito.',
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
					break;
			};
		};
		/********************************************************************************************
		**                                    C O N T R O L L E R S                                **
		********************************************************************************************/

		this.viewsController = function (view) {
			self.setObjectElems(self.views, false);
			switch (view) {
				case 'agregarAseguradora':
					self.views.agregarAseguradora = true;
					console.log('viewsController > agregarAseguradora');
					break;
				case 'editarAseguradora':
					self.views.editarAseguradora = true;
					//self.views.listarAseguradoras = true;// Esto lo quite ni idea por que esta aqui
					console.log('viewsController > editarAseguradora');
					break;
				case 'verAseguradora':
					self.views.verAseguradora = true;
					console.log('viewsController > verAseguradora');
					break;
				case 'listarAseguradoras':
					self.views.listarAseguradoras = true;
					console.log('viewsController > listarAseguradoras');
					break;
				default:
					break;
			}
		};
		/*
		*/
		this.consultarAseguradora = function () {
			self.consultarDetallesAseguradora('modal');
		}
		/*
		*/
		this.editarAseguradora = function (aseguradora) {
			/* 		this.aux = this.listaAseguradora.indexOf(aseguradora);
					this.datos.nombre = aseguradora.nombre;
					this.datos.rif = aseguradora.RIF;
					this.direccion.direccionFiscal = aseguradora.dirFiscal;
					this.direccion.tlfFiscal = aseguradora.telfFiscal; */
			//terminar de llenar la vista  editar
			/* 		this.listaAseguradora.splice(a,1);	 */
			this.viewsController('editarAseguradora');
		};
		/*
		*/
		this.eliminarAseguradora = function (aseguradora) {
			console.log('preparando para eliminar');
			this.aux = this.listaAseguradora.indexOf(aseguradora);
			self.datos.nombre = aseguradora.nombre;

			$('.eliminarAseguradoraModal').modal({
				show: 'true'
			});
		};
		/*
		*/
		this.eliminarModal = function (opcion) {
			switch (opcion) {
				case 'aceptar':
					//CALL SERVICE
					$('.modal-backdrop').remove();

					switch (self.listaMensaje) {
						case 'banco':

							if (self.views.agregarAseguradora)
								self.datos.bancos.splice(self.auxIndice, 1);
							if (self.views.editarAseguradora) {
								if (self.editarAseguradoras.bancos[self.auxIndice].idCuenta != 0) {
									self.eliminarDetallesAseguradoraServices('banco');
									self.editarAseguradoras.bancos.splice(self.auxIndice, 1);
								} else {
									self.editarAseguradoras.bancos.splice(self.auxIndice, 1);
								}
							}
							break;
						case 'contacto':

							if (self.views.agregarAseguradora)
								self.contactos.splice(self.auxIndice, 1);
							if (self.views.editarAseguradora) {
								if (self.editarAseguradoras.contactos[self.auxIndice].id != 0) {
									self.eliminarDetallesAseguradoraServices('contacto');
									self.editarAseguradoras.contactos.splice(self.auxIndice, 1);
								} else {
									self.editarAseguradoras.contactos.splice(self.auxIndice, 1);
								}
							}
							break;
						case 'red':

							if (self.views.agregarAseguradora)
								self.datos.redesSociales.splice(self.auxIndice, 1);
							if (self.views.editarAseguradora)
								self.editarAseguradoras.redesSociales.splice(self.auxIndice, 1);

							break;
					};
					/*			  $('#tablaConsultarAseguradoras').DataTable().row('.choosed').remove().draw( false );
									self.listaAseguradora.splice(self.aux, 1);
									new PNotify({
									title: '¡Aseguradora eliminada!',
									text: 'la ¡Aseguradora fue eliminada con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
									});*/
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
		this.agragarContacto = function () {

			if (self.views.agregarAseguradora) {
				var aux = validator.checkAll($('#aseguradoraContacto'));
				if (aux) {
					console.log("valido");
					var bool = true;
					for (var i = 0; i < self.contactos.length; i++) {
						if (self.contacto.nombre == self.contactos[i].contacto) {
							bool = false;
							break;
						}
					}

					if (bool) {
						self.contactos.push({
							id: 0,
							contacto: self.contacto.nombre,
							cargo: self.contacto.cargo,
							nuTelefono: self.contacto.tlf,
							rifEmpresa: mainServices.getRifEmpresa(),
							rifAseguradora: self.auxTipoRif + self.datos.rif
						});
						self.setObjectElems(self.contacto, undefined);
					} else {
						new PNotify({
							title: '¡Contacto existente!',
							text: 'El nuevo contacto ingresado ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}
				}
			}
			if (self.views.editarAseguradora) {
				var aux = validator.checkAll($('#editarAseguradorasContacto'));
				if (aux) {
					console.log("valido");
					var bool = true;
					for (var i = 0; i < self.editarAseguradoras.contactos.length; i++) {
						if (self.contacto.nombre == self.editarAseguradoras.contactos[i].nombre) {
							bool = false;
							break;
						}
					}

					if (bool) {
						self.editarAseguradoras.contactos.push({
							id: 0,
							contacto: self.contacto.nombre,
							cargo: self.contacto.cargo,
							nuTelefono: self.contacto.tlf,
							rifEmpresa: mainServices.getRifEmpresa(),
							rifAseguradora: self.editarAseguradoras.rif
						});
						self.setObjectElems(self.contacto, undefined);
					} else {
						new PNotify({
							title: '¡Contacto existente!',
							text: 'El nuevo contacto ingresado ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}
				}


			}
		};
		/*
		*/
		this.editarContacto = function (contacto) {

			if (self.views.agregarAseguradora) {
				var a = this.contactos.indexOf(contacto);
				self.contacto.nombre = this.contactos[a].contacto;
				self.contacto.cargo = this.contactos[a].cargo;
				self.contacto.tlf = this.contactos[a].nuTelefono;
				this.contactos.splice(a, 1);
			}
			if (self.views.editarAseguradora) {
				var a = this.editarAseguradoras.contactos.indexOf(contacto);
				self.contacto.nombre = this.editarAseguradoras.contactos[a].contacto;
				self.contacto.cargo = this.editarAseguradoras.contactos[a].cargo;
				self.contacto.tlf = this.editarAseguradoras.contactos[a].nuTelefono;
				this.editarAseguradoras.contactos.splice(a, 1);
			}
		};
		/*
		*/
		this.eliminarContacto = function (contacto) {
			if (self.views.agregarAseguradora) {
				self.auxIndice = self.contactos.indexOf(contacto);
				self.mensaje = '¿Está seguro que desea eliminar el contacto ' + self.contactos[self.auxIndice].contacto + '?';
			}
			if (self.views.editarAseguradora) {
				self.auxIndice = self.editarAseguradoras.contactos.indexOf(contacto);
				self.mensaje = '¿Está seguro que desea eliminar el contacto ' + self.editarAseguradoras.contactos[self.auxIndice].contacto + '?';
			}

			self.listaMensaje = 'contacto';
			$('.eliminarAseguradoraModal').modal({
				show: 'true'
			});
		};


		this.agregarBanco = function () {

			if (self.views.agregarAseguradora) {
				var validatorResult = validator.checkAll($('#empreBancos'));
				var bool = true;
				for (var i = 0; i < self.datos.bancos.length; i++) {
					console.log(self.datos.bancos.numero);
					if (self.datos.bancos[i].numero == self.banco.numero && self.datos.bancos[i].tipo == self.banco.tipo) {
						bool = false;
						break;
					}
				}

				var id = self.buscarIdBanco(self.banco.nombre);
				console.log(validatorResult);
				if (validatorResult && bool && id != '-1') {

					self.datos.bancos.push(
						{
							idCuenta: 0,
							nombre: self.banco.nombre,
							tipo: self.banco.tipo,
							numero: self.banco.numero
						}
					);
					console.log(self.datos.bancos);
					self.setObjectElems(self.banco, undefined);

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
			if (self.views.editarAseguradora) {
				var validatorResult = validator.checkAll($('#EditarEmpreBancos'));
				var bool = true;
				if (!self.editarAseguradoras.bancos)
					self.editarAseguradoras.bancos = [];
				for (var i = 0; i < self.editarAseguradoras.bancos.length; i++) {
					console.log(self.editarAseguradoras.bancos.numero);
					if (self.editarAseguradoras.bancos[i].numero == self.banco.numero && self.editarAseguradoras.bancos[i].tipo == self.banco.tipo) {		
						bool = false;
						break;
					}
				}
				var id = self.buscarIdBanco(self.banco.nombre);
				console.log(id);
				if (validatorResult && bool && id != '-1') {
					self.aux = JSON.parse(JSON.stringify(self.banco));
					self.editarAseguradoras.bancos.push({
						idCuenta: 0,
						nombre: self.banco.nombre,
						tipo: self.banco.tipo,
						numero: self.banco.numero
					});
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
		/*
		*/
		this.editarBanco = function (elemt) {

			if (self.views.agregarAseguradora) {
				var a = self.datos.bancos.indexOf(elemt);
				if (self.banco.idCuenta != undefined) {
					this.datos.bancos.push(self.banco);
				}
				self.banco = self.datos.bancos[a];
				this.datos.bancos.splice(a, 1);
			}
			if (self.views.editarAseguradora) {
				var a = self.editarAseguradoras.bancos.indexOf(elemt);
				if (self.banco.idCuenta != undefined) {
					this.editarAseguradoras.bancos.push(self.banco);
				}
				self.banco = self.editarAseguradoras.bancos[a];
				this.editarAseguradoras.bancos.splice(a, 1);
			}
		};
		/*
		*/
		this.eliminarbanco = function (elemt) {
			if (self.views.agregarAseguradora) {
				self.auxIndice = self.datos.bancos.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.datos.bancos[self.auxIndice].numero + '?';
			}
			if (self.views.editarAseguradora) {
				self.auxIndice = self.editarAseguradoras.bancos.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar el numero de cuenta ' + self.editarAseguradoras.bancos[self.auxIndice].numero + '?';
			}

			//
			self.listaMensaje = 'banco';
			$('.eliminarAseguradoraModal').modal({
				show: 'true'
			});
		};

		this.agregarRed = function () {
			if (self.views.agregarAseguradora) {
				var validatorResult = validator.checkAll($('#formualrioRedSocial'));
				var bool = true;
				for (var i = 0; i < self.datos.redesSociales.length; i++) {
					if (self.datos.redesSociales[i].usuario == self.red.usuario && self.datos.redesSociales[i].nombre == self.red.nombre) {
						bool = false;
						break;
					}
				}

				if (validatorResult && bool) {
					self.datos.redesSociales.push({
						id: 0,
						redSocial: self.red.nombre,
						descripcion: self.red.usuario,
						rifEmpresa: "J402457111",//CAMBIAR self.datos.rifEmpresa
						rifAseguradora: self.datos.rif
					});
					console.log(self.red);
					self.red = undefined;
				} else {
					new PNotify({
						title: 'Error',
						text: 'El usuario ya se encuentra registrado.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}
			}
			if (self.views.editarAseguradora) {
				var validatorResult = validator.checkAll($('#editarFormualrioRedSocial'));
				var bool = true;
				for (var i = 0; i < self.editarAseguradoras.redesSociales.length; i++) {
					if (self.editarAseguradoras.redesSociales[i].usuario == self.red.usuario && self.editarAseguradoras.redesSociales[i].nombre == self.red.nombre) {
						bool = false;
						break;
					}
				}

				if (validatorResult && bool) {
					self.editarAseguradoras.redesSociales.push({
						id: 0,
						redSocial: self.red.nombre,
						descripcion: self.red.usuario,
						rifEmpresa: "J402457111",//CAMBIAR self.editarAseguradoras.rifEmpresa
						rifAseguradora: self.editarAseguradoras.rif
					});
					console.log(self.red);
					self.red = undefined;
				} else {
					new PNotify({
						title: 'Error',
						text: 'El usuario ya se encuentra registrado.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}
			}

		};

		this.editarRed = function (elemt) {
			if (self.views.agregarAseguradora) {
				var a = self.datos.redesSociales.indexOf(elemt);
				self.banco = self.datos.redesSociales[a];
				this.datos.redesSociales.splice(a, 1);
			}
			if (self.views.editarAseguradora) {
				var a = self.editarAseguradoras.redesSociales.indexOf(elemt);
				self.banco = self.editarAseguradoras.redesSociales[a];
				this.editarAseguradoras.redesSociales.splice(a, 1);
			}
		};

		this.eliminarRed = function (elemt) {
			if (self.views.agregarAseguradora) {
				self.auxIndice = self.datos.redesSociales.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar la red de social ' + self.datos.redesSociales[self.auxIndice].redSocial + ' del usuario ' + self.datos.redesSociales[self.auxIndice].descripcion + '?';
			}
			if (self.views.editarAseguradora) {
				self.auxIndice = self.editarAseguradoras.redesSociales.indexOf(elemt);
				self.mensaje = '¿Está seguro que desea eliminar la red de social ' + self.editarAseguradoras.redesSociales[self.auxIndice].redSocial + ' del usuario ' + self.editarAseguradoras.redesSociales[self.auxIndice].descripcion + '?';
			}
			self.listaMensaje = 'red';
			$('.eliminarAseguradoraModal').modal({
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

		this.buscarNombreBanco = function (ID) {
			for (var i = 0; i < self.listaBancos.length; i++) {
				if (self.listaBancos[i].idBanco == ID) {
					self.aux = self.listaBancos[i].nbBanco;
					return self.listaBancos[i].nbBanco;
				}
			}
			return '';
		};

		this.guardar = function () {
			if (self.views.agregarAseguradora) {
				var validatorResult = validator.checkAll($('#aseguradoraDatos'));
				var validatorResult2 = validator.checkAll($('#formularioAgregarDireccionAseguradora'));
				if (validatorResult && validatorResult2) {

					var vistadireccion = $('#aseguradoraDireccion'),
						vistacontactos = $('#aseguradoraContacto'),
						vistaextranet = $('#aseguradoraExtranet'),
						vistainternet = $('#aseguradoraInternet'),
						vistaBanco = $('#aseguradoraCuentaEmpresa');
					var exitnombre = false;
					var exitrif = false;

					for (var i = 0; i < self.listaAseguradora.length; i++) {
						console.log(self.datos);
						console.log(self.listaAseguradora[i]);
						console.log(self.listaAseguradora[i].rif.replace('/-/', ''));
						console.log((self.auxTipoRif + self.datos.rif).replace('/-/', ''));
						if (self.listaAseguradora[i].nombre == self.datos.nombre) {
							exitnombre = true;
							console.log('repetido 1');
							break;
						}
						if (self.listaAseguradora[i].rif.replace('/-/', '') == (self.auxTipoRif + self.datos.rif).replace('/-/', '')) {
							exitrif = true;
							console.log('repetido 2');
							break;
						}
					}

					if (exitnombre) {
						new PNotify({
							title: 'Error',
							text: 'El nombre de la aseguradora ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else if (exitrif) {

						new PNotify({
							title: 'Error',
							text: 'El RIF de la aseguradora ya existe.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else {

						self.agregarAseguradoraService('agregar');
						self.setObjectElems(self.datos, undefined);
						self.setObjectElems(self.direccion, undefined);
						self.setObjectElems(self.contacto, undefined);
						self.setObjectElems(self.contactos, undefined);
						self.setObjectElems(self.extranet, undefined);
						self.setObjectElems(self.internet, undefined);
					}


					vistadireccion.collapse('hide');
					vistacontactos.collapse('hide');
					vistaextranet.collapse('hide');
					vistainternet.collapse('hide');
					vistaBanco.collapse('hide');
				}

			} else {

				if (validator.checkAll($('#aseguradoraDatosEditar')) && validator.checkAll($('#editarAseguradoraDireccion'))) {

					//self.agregarAseguradoraService('editar');
					// self.vistadireccion.collapse('hide');
					// self.vistacontactos.collapse('hide');
					// self.vistaextranet.collapse('hide');
					// self.vistainternet.collapse('hide');
					// self.vistaBanco.collapse('hide');
					self.agregarDetallesAseguradora();
					self.viewsController('listarAseguradoras');
					self.setObjectElems(self.datos, undefined);
					self.setObjectElems(self.direccion, undefined);
					self.setObjectElems(self.contacto, undefined);
					self.setObjectElems(self.contactos, undefined);
					self.setObjectElems(self.extranet, undefined);
					self.setObjectElems(self.internet, undefined);
				}

			}
			//poner adentro de los if...

		};
		/*
		*/
		this.cancelar = function () {
			console.log('Vaciado Exitoso');
			if (self.views.agregarAseguradora) {
				self.setObjectElems(self.datos, undefined);
				self.datos.bancos = [];
				self.datos.redesSociales = [];
				self.setObjectElems(self.direccion, undefined);
				self.setObjectElems(self.contacto, undefined);
				self.setObjectElems(self.extranet, undefined);
				self.setObjectElems(self.internet, undefined);
			} else {
				// self.vistadireccion.collapse('hide');
				// self.vistacontactos.collapse('hide');
				// self.vistaextranet.collapse('hide');
				// self.vistainternet.collapse('hide');
				// self.vistaBanco.collapse('hide');
				document.getElementById("editarConExt2").value = "";
				self.setObjectElems(self.banco, undefined);
				self.setObjectElems(self.contacto, undefined);
				self.editarAseguradoras = undefined;
				this.viewsController('listarAseguradoras');
			}
		};

		/********************************************************************************************
		**                                   M I S C E L A N E O U S                               **
		********************************************************************************************/


		$rootScope.$on('agregarAseguradora', function () {
			self.setObjectElems(self.direccion, undefined);
			self.setObjectElems(self.contacto, undefined);
			self.setObjectElems(self.contactos, undefined);
			self.setObjectElems(self.extranet, undefined);
			$('#urlExt').val('');
			$('#urlExt').closest('.item')
				.removeClass('bad')
				.find('.alert').remove();
			//self.extranet.url = undefined;
			self.setObjectElems(self.internet, undefined);
			self.datos = {
				nombre: undefined,
				rif: undefined,
				nu_credencial: undefined,
				bancos: [],
				redesSociales: []
			};
			self.setObjectElems(self.banco, undefined);
			self.auxTipoRif = undefined;
			self.consultaAseguradoraServices('agregarAseguradora');
		});

		$rootScope.$on('editarAseguradora', function () {
			self.viewsController('editarAseguradora');
		});

		$rootScope.$on('listarAseguradoras', function () {
			self.cancelar();
			self.consultaAseguradoraServices('listarAseguradoras');
		});

		$('#nombreAseguradora').on('blur', null, validator.checkField);
		$('#rifAseguradora').on('blur', null, validator.checkField);
		$('#dirFiscalAseguradora').on('blur', null, validator.checkField);
		$('#tlfFiscalAseguradora').on('blur', null, validator.checkField);
		$('#nombreContactoAseguradora').on('blur', null, validator.checkField);
		$('#tlfContactoAseguradora').on('blur', null, validator.checkField);
		$('#cargoContactoAseguradora').on('blur', null, validator.checkField);
		$('#nomExt').on('blur', null, validator.checkField);
		$('#useExt').on('blur', null, validator.checkField);
		$('#conExt').on('blur', null, validator.checkField);
		$('#urlExt').on('blur', null, validator.checkField);
		$('#webInt').on('blur', null, validator.checkField);
		$('#faceInt').on('blur', null, validator.checkField);
		$('#insInt').on('blur', null, validator.checkField);
		$('#twiInt').on('blur', null, validator.checkField);
		$('#otroNombre').on('blur', null, validator.checkField);
		$('#otroUsuario').on('blur', null, validator.checkField);
		$('#editarOtroNombre').on('blur', null, validator.checkField);
		$('#editarOtroUsuario').on('blur', null, validator.checkField);
		$('#tipoBanco').on('blur', null, validator.checkField);
		$('#nomBanco').on('blur', null, validator.checkField);
		$('#numBanco').on('blur', null, validator.checkField);
		$('#editarAseguradoraNomBanco').on('blur', null, validator.checkField);
		$('#editarNumBanco').on('blur', null, validator.checkField);
		$('#EditarNombreAseguradora').on('blur', null, validator.checkField);
		$('#editarRifAseguradora').on('blur', null, validator.checkField);
		$('#editarDirFiscalAseguradora').on('blur', null, validator.checkField);
		$('#EditarTlfFiscalAseguradora').on('blur', null, validator.checkField);
		$('#editarNombreContactoAseguradora').on('blur', null, validator.checkField);
		$('#editarTlfContactoAseguradora').on('blur', null, validator.checkField);
		$('#editarCargoContactoAseguradora').on('blur', null, validator.checkField);
		$('#editarNomExt').on('blur', null, validator.checkField);
		$('#editarUseExt').on('blur', null, validator.checkField);
		$('#editarConExt').on('blur', null, validator.checkField);
		$('#editarConExt2').on('blur', null, validator.checkField);
		/*		$('#editarUrlExt').on('blur', null, validator.checkField);
				$('#editarWebInt').on('blur', null, validator.checkField);
				$('#editarinsInt').on('blur', null, validator.checkField);
				$('#editartwiInt').on('blur', null, validator.checkField);
				$('#editarotrosInt').on('blur', null, validator.checkField);
				$('#editarfaceInt').on('blur', null, validator.checkField);*/

		/*
		$('#nomBanco').autocomplete({
			lookup: self.listaBancos,
			onSelect: function (suggestion){
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#nomBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});

		$('#editarAseguradoraNomBanco').autocomplete({
			lookup: self.listaBancos,
			onSelect: function (suggestion){
				self.banco.nombre = suggestion.value;
				suggestion = null;
				$('#editarAseguradoraNomBanco').closest('.item').removeClass('bad').find('.alert').remove();
			}
		});		*/




		this.destroyTable = function () {
			$('#tablaConsultarAseguradoras').dataTable().fnDestroy();
			console.log('on destroyTable function..');
			self.createTable();
		};

		
		/* funcion para validar que seleccionen el tipo de cuenta */
		
		this.validarTipoCuenta=function(){
			console.log('........ aqui 1');
          if (self.views.agregarAseguradora) {
			  console.log('........ aqui 2');
			if(!self.banco.tipo){
				console.log('........ aqui 3');
				new PNotify({
						title: 'Error',
						text: 'Debe seleccionar el tipo de cuenta.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
			}
		  }
		if (self.views.editarAseguradora) {
			  console.log('........ aqui 2');
			if(!self.banco.tipo){
				console.log('........ aqui 3');
				new PNotify({
						title: 'Error',
						text: 'Debe seleccionar el tipo de cuenta.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
			}
		  }
          };
		  
		this.createTable = function () {

			var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verAseguradora cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for (var i = 0; i < permisos.length; i++) {
				if (permisos[i].coPermiso == 'editAsega' && permisos[i].inEstatus == true) {
					editar = true;
					break;
				}
			};

			if (editar || (mainServices.isAdmin() == 1)) {
				acciones = '<td style="text-align: center;">\
                                <a class="verAseguradora cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarAseguradora cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}
			$('#tablaConsultarAseguradoras').DataTable({
				data: self.listaAseguradora,
				aoColumns: [
					{ 'data': 'nombre', sDefaultContent: '' },
					{ 'data': 'rif', sDefaultContent: '' },
					{ 'data': 'estatus', sDefaultContent: '' },
					{ 'defaultContent': acciones }
				],
				columnDefs: [
					{ "className": "text-center", "targets": "_all" }
				]
			});
			$('#tablaConsultarAseguradoras tbody').on('click', '.verAseguradora', function () {
				self.aseguradoraModal = undefined;
				self.aseguradoraModal = $('#tablaConsultarAseguradoras').DataTable().row($(this).parents('tr')).data();
				console.log(self.aseguradoraModal);
				$('.activarModalAseguradora').click();
			});

			$('#tablaConsultarAseguradoras tbody').on('click', '.editarAseguradora', function () {
				self.editarAseguradoras = $('#tablaConsultarAseguradoras').DataTable().row($(this).parents('tr')).data();
				//self.eliminarModal();
				console.log(self.editarAseguradoras);
				self.auxIndice = self.listaAseguradora.indexOf(self.editarAseguradoras);
				self.editarAseguradoras.editar = true;

				//	self.editarAseguradoras.logo ="./images/Logos/J.png";
				console.log(self.editarAseguradoras.logo);
				self.consultarDetallesAseguradora('editar');
				$('.activarEditarAseguradora').click();

			});
			/*  	$('#tablaConsultarAseguradoras tbody').on( 'click', '.eliminarRamo', function () {
							var data = $('#tablaConsultarAseguradoras').DataTable().row( $(this).parents('tr') ).data();
							//self.nombreEliminarBanco = data.nombre;
							self.editarRamos = data;
							console.log(data);
						//  var spanBancoModalText = data.nombre;
							$("#spanRamoModal").text( data.nombre );
							$('.eliminarRamoModal').modal({
								show: 'true'
							});

						});

						 $('#tablaConsultarAseguradoras tbody').on( 'click', 'tr', function () {
							$('#tablaConsultarAseguradoras').DataTable().$('tr.choosed').removeClass('choosed');
							$(this).addClass('choosed');
						});  */
			$('#tablaConsultarAseguradoras tbody').on('click', 'tr', function () {
				$('#tablaConsultarAseguradoras').DataTable().$('tr.choosed').removeClass('choosed');
				$(this).addClass('choosed');
			});
		};




		$('.aseguradora.collapse-link').on('click', function () {

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
