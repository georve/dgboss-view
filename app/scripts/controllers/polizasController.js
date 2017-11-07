(function () {

	'use strict';

	var polizasController = angular.module('DGBOSS.polizasController', ['ngAnimate', 'DGBOSS.polizaServices','DGBOSS.inicioServices','DGBOSS.aseguradoraServices']);

	polizasController.controller('polizasController', ['$scope', '$rootScope', 'polizaServices', 'vehiculoServices', 'mainServices', 'inicioServices','aseguradoraServices',function ($scope, $rootScope, polizaServices, vehiculoServices, mainServices,inicioServices,aseguradoraServices) {

		var self = this;

		console.log('polizasController activated.');

		/********************************************************************************************
		**                                      V A R I A B L E S                                  **
		********************************************************************************************/

		/*
		  this.views: { this will set the insured view. }
		*/
		this.views = {
			agregarPolizasIndividuales: false,
			editarPolizasIndividuales: false,
			listarPolizasIndividuales: false,
			agregarPolizasColectivas: false,
			editarPolizasColectivas: false,
			agregarPolizasCertificado: false,
			editarPolizasCertificado: false,
			listarPolizasColectivas: false,
			listarPolizasCertificados: false,
			cargarPolizas:false
		};

		this.modalControl = {
			si:false,
			no:false
		};

		this.montoReciboNuevo = undefined;

		this.opcionPoliza = undefined;

		this.opcionRamo = undefined;

		this.tipoPoliza = {
			vehiculo: false,
			vida: false,
			accidentes: false,
			polizaCoberturaFunerario: false,
			contragarante: false,
			contrato: false,
			polizaDatosFianza: false,
			Adicionales: false,
			cobertura: false,
			coberturaAccidentes: false,
			Salud: false,
			Fianza: false,
			Patrimonial: false,
			incendio: false,
			robo: false,
			empresarial: false,
			aviacion: false,
			valores: false,
			Beneficiarios: false,
			funeraria: false,
			recibo: false,

		};

		/*Listas con la informacion del acordeon  'Datos Generales'*/
		this.ListaTomador = ['A', 'B', 'C'];
		this.ListaAsegurado = ['A', 'B', 'C'];
		this.ListaAseguradoras = ['A', 'B', 'C'];
		this.ListaMonedas = [];
		this.ListaRamos = [];
		this.ListaByRamos = [];
		this.ListaAux = [];
		this.ListaTipoPago = [
			'Transferencia',
			'Cheque',
			'Financiado'
		];
		this.ListaFrecuenciaPago = [
			{ nbPago: 'Semanal', coPago: 1 },
			{ nbPago: 'Mensual', coPago: 2 },
			{ nbPago: 'Trimestral', coPago: 3 },
			{ nbPago: 'Semestral', coPago: 4 },
			{ nbPago: 'Anual', coPago: 5 }
		];
		this.ListaTipoMovimiento = [
			'Transferencia',
			'Cheque',
			'Financiado'
		];
		this.ListaTipoPoliza = [
			'Vehiculos',
			'Salud',
			'Vida',
			'Accidentes',
			'Funerarios',
			'Fianza',
			'Incendio',
			'Robo',
			'Empresarial',
			'Aviacion',
			'Dinero y Valores'
		];
		this.marcaVehiculos = [
			'Toyota',
			'Chevrolet',
			'Ford',
			'Cherokee'
		];
		this.modeloVehiculos = [];
		this.ListaCoberturas = [];
		this.ListaCuentasAseguradora=[];

		this.listaProductores = [];

		this.mismoTomadorCheck = {
			s: 'iradio_flat-green checked',
			n: 'iradio_flat-green'
		};

		this.cargaCheck = {
			v: 'iradio_flat-green',
			per: 'iradio_flat-green',
			pa: 'iradio_flat-green'
		};

		this.reciboCheck = {
			s: 'iradio_flat-green ',
			n: 'iradio_flat-green checked',
			bool: false
		};

		this.maskIdentifacionAsegurado = 99999999;
		this.maskIdentifacionTomador = 99999999;

		this.listaAuxProductores = [];

		this.listaPolizasRejected=[];

		/*********************************************************************************************************
		*************************************************************************************************************
		**                                           AGREGAR POLIZAS INDIDUALES                                    **
		*************************************************************************************************************
		********************************************************************************************************* */


		/*
			Datos del Acordeon de 'Datos Generales'
		*/
		this.datos = {
			numeroPoliza: undefined,
			certificado: undefined,
			nombre: undefined,
			tomador: undefined,
			asegurado: undefined,
			tipoDocumento: undefined,
			documento: undefined,
			aseguradora: {
				data: undefined,
				value: undefined,
			},
			prima: undefined,
			Moneda: undefined,
			fechaInicio: undefined,
			fechaFin: undefined,
			fechaEmision: undefined,
			fechaSuscripcion: undefined,
			vigenciaDesde: undefined,
			vigenciaHasta: undefined,
			tipoPago: undefined,
			frecuenciaPago: undefined,
			tipoMovimiento: undefined,
			opcionPoliza: undefined,
			montoDeducible: undefined
		};
		/*
			Datos del Acordeon de 'Asegurados Adicionales'
		*/
		this.adicional = {
			id: undefined,
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined
		};
		this.adicionales = [];
		/*
			Datos del Acordeon de 'Beneficiarios'
		*/
		this.beneficiario = {
			id: undefined,
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined,
			accion: undefined
		};
		this.beneficiarios = [];

		/*
			Datos del Acordeon de 'Datos del Productor'
		*/
		this.productor = {
			nbNombreCompleto: undefined,
			nbPrimerNombre: undefined,
			nbPrimerApellido: undefined,
			numeroRifUsuario: undefined,
			nbUsuarioApp: undefined
		};
		this.ejecutivo = {
			nombre: undefined,
			comsionEjecutivo: undefined
		};
		this.productores = [];
		this.ejecutivos = [];

		/*
			Datos del Acordeon de 'Contrato'
		*/
		this.contrato = {
			nro: undefined,
			acreedor: undefined,
			fecha: undefined,
			monto: undefined,
			ejecucion: undefined,
			objecto: undefined
		};

		/*
			Datos del Acordeon de 'Contragarante'
		*/
		this.contragarante = {
			nombre: undefined,
			tipoDocumento: undefined,
			documento: undefined
		};
		this.contragarantes = [];

		/*
			Datos del Acordeon de 'Fianza'
		*/

		this.fianza = {
			tipo: undefined,
			monto: undefined,
			observacion: undefined
		}
		this.fianzas = [];


		/*
			Datos del Acordeon de 'Coberturas'
		*/
		this.selecBasica = undefined;
		this.sumaAseguBasica = undefined;
		this.ListaSelecBasica = undefined;
		this.id = undefined;

		this.selecOpcional = undefined;
		this.sumaAseguOpcional = undefined;
		this.ListaSelecOpcional = undefined;

		this.listaCoberturas = [];

		this.listaMarca = [];
		this.listaModelo = [];
		this.listaVersion = [];
    this.listaBancos=[];
		/*
			Datos del Acordeon de 'Vehiculos'
		*/
		this.vehiculo = {
			placa: undefined,
			marca: undefined,
			modelo: undefined,
			ano: undefined,
			color: undefined,
			serial: undefined,
			carroceria: undefined,
			pasajeros: undefined,
			carga: undefined,
			uso: undefined,
			tipo: undefined,
			conductor: undefined,
			tipoDocumento: undefined,
			documento: undefined
		};
		/*
			Datos del Acordeon de 'Recibo'
		*/
		this.recibo = {
			recibo: undefined,
			poliza: undefined,
			localidad: undefined,
			coRamo: undefined,
			nuRifEmpresa: undefined,
			tipoRecibo: undefined,
			fechaVigenciaDesde: undefined,
			fechaVigenciaHasta: undefined,
			fechaRecepcion: undefined,
			fechaEmision: undefined,
			montoRecibo: undefined,
			estatusRecibo: undefined,
			isGlobal: undefined,
			numeroCertificado: undefined,
			comision: {
				id: undefined,
				numeroRecibo: undefined,
				montoComision: undefined,
				estatus: undefined,
				fechaPago: undefined,
				fechaCarga: undefined,
				nuRifEmpresa: undefined,
				nombreUsuarioApp: undefined
			}
		};
		/*
		  Lista de polizas
		*/
		this.listaPolizasIndividuales = [];


		/*********************************************************************************************************
		*************************************************************************************************************
		**                                           AGREGAR POLIZAS COLECTIVAS                                         **
		*************************************************************************************************************
		********************************************************************************************************* */
		this.tipoCertificado = {
			vehiculo: false,
			vida: false,
			accidentes: false,
			polizaCoberturaFunerario: false,
			contragarante: false,
			contrato: false,
			polizaDatosFianza: false,
			Adicionales: false,
			cobertura: false,
			coberturaAccidentes: false,
			Salud: false,
			Fianza: false,
			Patrimonial: false,
			incendio: false,
			robo: false,
			empresarial: false,
			aviacion: false,
			valores: false,
			Beneficiarios: false,
			funeraria: false
		};

		/*
			Datos del Acordeon de 'Datos Generales'
		*/
		this.datosPolizasColectivas = {
			nombre: undefined,
			tomador: undefined,
			asegurado: undefined,
			tipoDocumento: undefined,
			documento: undefined,
			aseguradora: {
				data: undefined,
				value: undefined,
			},
			prima: undefined,
			Moneda: undefined,
			fechaInicio: undefined,
			fechaFin: undefined,
			fechaEmision: undefined,
			fechaSuscripcion: undefined,
			vigenciaDesde: undefined,
			vigenciaHasta: undefined,
			tipoPago: undefined,
			frecuenciaPago: undefined,
			tipoMovimiento: undefined,
			opcionPoliza: undefined
		};

		/*
			Datos del Acordeon de 'Datos Generales Certificados'
		*/
		this.datosGeneralesCertificados = {
			nombre: undefined,
			tomador: undefined,
			fechaVencimiento: undefined,
			nro_Certificado: undefined,
			fechaInclusion: undefined
		};

		/*
			Datos del Acordeon de 'Coberturas'
		*/
		this.vehiculoPolizasColectivas = {
			placa: undefined,
			marca: undefined,
			modelo: undefined,
			año: undefined,
			color: undefined,
			motor: undefined,
			Carreceria: undefined,
			Pasajeros: undefined,
			capacidad: undefined,
			uso: undefined,
			tipo: undefined,
			conductor: undefined,
			documento: undefined,
			tipoDocumento: undefined
		}

		/*
			Datos del Acordeon de 'Datos del Productor'
		*/
		this.productorPolizasColectivas = {
			nbNombreCompleto: undefined,
			nbPrimerNombre: undefined,
			nbPrimerApellido: undefined,
			numeroRifUsuario: undefined,
			nbUsuarioApp: undefined
		};
		this.ejecutivoPolizasColectivas = {
			nombre: undefined,
			comsionEjecutivo: undefined
		};
		this.productoresPolizasColectivas = [];
		this.ejecutivosPolizasColectivas = [];
		/*
			Datos del Acordeon de 'Coberturas'
		*/
		this.selecBasicaPolizasColectivas = undefined;
		this.sumaAseguBasicaPolizasColectivas = undefined;
		/* 	this.ListaSelecBasicaPolizasColectivas = undefined;  */

		this.selecOpcionalPolizasColectivas = undefined;
		this.sumaAseguOpcionalPolizasColectivas = undefined;
		/*  	this.ListaSelecOpcionalPolizasColectivas = undefined; */

		this.listaCoberturasPolizasColectivas = [];


		/*
		  Datos del Acordeon de 'Asegurados Adicionales'
	  */
		this.adicionalPolizasColectivas = {
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined
		};
		this.adicionalesPolizasColectivas = [];

		/*
			Datos del Acordeon de 'Beneficiarios'
		*/
		this.beneficiarioPolizasColectivas = {
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined
		};
		this.beneficiariosPolizasColectivas = [];
		/*
			Datos del Acordeon de 'Contrato'
			*/
		this.contratoPolizasColectivas = {
			nro: undefined,
			acreedor: undefined,
			fecha: undefined,
			monto: undefined,
			ejecucion: undefined,
			objecto: undefined
		};

		/*
			Datos del Acordeon de 'Contragarante'
		*/
		this.contragarantePolizasColectivas = {
			nombre: undefined,
			documento: undefined
		};
		this.contragarantesPolizasColectivas = [];

		/*
			Datos del Acordeon de 'Fianza'

		*/
		this.fianzaPolizasColectivas = {
			tipo: undefined,
			monto: undefined,
			observacion: undefined
		}
		this.fianzasPolizasColectivas = [];



		/*
		  Lista de polizas Colectivas
		*/
		this.listaPolizasColectivas = [];

		/*
			Lista de Certificados
		*/

		this.ListaCertificados = [];
		this.verCertificado = false;

		/*********************************************************************************************************
		 *************************************************************************************************************
		 **                                           VARIABLES AUXILARES                                       **
		 *************************************************************************************************************
		 ********************************************************************************************************* */

		/*
			Varabiales Auxiliares
		*/
		this.polizasIndividual = false;
		this.polizaColectiva = false;
		this.polizaCertificado = false;
		this.auxIndice = undefined;
		this.auxNombreDeLista = undefined;
		this.showVista = 0;

		this.cargaMasivaPolizaViews = {
			exito: false,
			cargar: true
		};
		/*
		  Mensajes del modal
		*/
		this.mensaje = undefined;
		/*
		  Variable que almacena el archivo excel de polizas
		*/
		this.archivoPolizas = undefined;

		/*
			Variables para guardar formulario de una polizas
		*/
		this.agregarPolizaFormulario = undefined;

		/*
			Variables para editar polizas
		*/

		this.editarPolizasFormulario = undefined;

		this.editarFormularioCertificados = undefined;

		this.editarPolizasColectivasFormulario = undefined;

		this.anularPolizasFormulario = undefined;

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

		this.consultarPolizasIndividualesServices = function () {
			console.log('consultarPolizasIndividualesServices..');

			//self.consultarAseguradosServices();

			/* self.consultarProductoresServices();
			self.consultarAseguradorasServices();
			self.consultarMonedasServices();
			self.consultarRamosService(); */

			self.getListOfValues();
			console.log(self.ListaTomador);
			console.log(self.ListaAseguradoras);
			console.log(self.ListaMonedas);
			console.log(self.ListaRamos);
			console.log(self.ListaByRamos);

			self.viewsController('agregarPolizasIndividuales');

		};

		this.getListOfValues = function () {
			self.consultarAseguradorasServices();
			self.consultarMonedasServices();
			self.consultarRamosService();
			self.consultarProductoresServices();
			self.consultarBancosServices();
			/* if(self.views.editarPolizasIndividuales){
				self.consultarMarcas();
				self.consultarModelos();
				//self.consultarLocalidades();
				//self.consultarCoberturasService();
			} */
		};

		this.consultarAseguradosServices = function () {

			polizaServices.consultarAsegurados()
				.success(function (data) {
					self.ListaTomador = [];
					self.ListaAsegurado = [];

					for (var i = 0; i < data.length; i++) {
						if (data[i].estatus == 1) {
							self.ListaTomador.push({
								id: data[i].id,
								nombre: data[i].nombreAsegurado
							});
						}
					};
					self.ListaAsegurado = JSON.parse(JSON.stringify(self.ListaTomador));

					$('#polizaTomador').autocomplete({
						lookup: self.ListaTomador,
						onSelect: function (suggestion) {
							self.datos.tomador = suggestion.value;
							suggestion = null;
							$('#polizaTomador').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					$('#polizaAsegurado').autocomplete({
						lookup: self.ListaAsegurado,
						onSelect: function (suggestion) {
							self.datos.asegurado = suggestion.value;
							suggestion = null;
							$('#polizaAsegurado').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					self.showVista++;
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
		};

		this.consultarLocalidades = function () {
			polizaServices.consultarLocalidad()
				.success(function (data) {
					console.log('localidad', data);
					self.ListaLocalidades = [];
					for (var i = 0; i < data.length; i++) {
						self.ListaLocalidades.push({
							data: data[i].id,
							value: data[i].nombre
						});

					};
					$('#agregarLocalidadRenovaciones').autocomplete({
						lookup: self.ListaLocalidades,
						onSelect: function (suggestion) {
							console.log('onSelect', suggestion);
							self.recibo.idlocalidad = suggestion.data;
							suggestion = null;
							$('#agregarLocalidadRenovaciones').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
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

		this.consultarBancosServices=function(){
			var data=mainServices.getBancos();
			for (var i = 0; i < data.length; i++) {
						self.listaBancos.push(data[i]);
					};
		}

		this.consultarAseguradorasServices = function () {
			var data=mainServices.getAseguradoras();
			self.ListaAseguradoras = [];
			var listaAux = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].in_estatus == 1) {
					listaAux.push(data[i].nb_aseguradora);
					self.ListaAseguradoras.push({
						data: data[i].nu_rif,
						value: data[i].nb_aseguradora
					});
				}
			};

			console.log('self.ListaAseguradoras', self.ListaAseguradoras);

			$('#aseguradoraPoliza').autocomplete({
				lookup: self.ListaAseguradoras,
				onSelect: function (suggestion) {
					console.log('onSelect', suggestion);
					self.datos.aseguradora.data = suggestion.data;
					self.ListaCuentasAseguradora=[];
					self.obtenerCuentasAseguradora(self.datos.aseguradora.data);
					suggestion = null;
					$('#aseguradoraPoliza').closest('.item').removeClass('bad').find('.alert').remove();
				}
			});
			self.showVista++;

			$('#aseguradoraPolizaColectiva').autocomplete({
				lookup: self.ListaAseguradoras,
				onSelect: function (suggestion) {
					self.datosPolizasColectivas.aseguradora.data = suggestion.data;
					self.ListaCuentasAseguradora=[];
					self.obtenerCuentasAseguradora(self.datosPolizasColectivas.aseguradora.data);
					suggestion = null;
					$('#aseguradoraPolizaColectiva').closest('.item').removeClass('bad').find('.alert').remove();
				}
			});
		};

		this.consultarProductoresServices = function () {

			polizaServices.consultarProductores()
				.success(function (data) {
					console.log(data);
					self.listaAuxProductores = [];
					for (var i = 0; i < data.length; i++) {
						self.listaAuxProductores.push({
							value: data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido,
							data: data[i].nuCedulaRif
						});
					};
					self.listaProductores = data;

					$('#productorSelect').autocomplete({
						lookup: self.listaAuxProductores,
						onSelect: function (suggestion) {
							console.log('onSelect', suggestion);
							self.productor.numeroRifUsuario = suggestion.data;
							suggestion = null;
							console.log(self.productorPolizasColectivas);
							$('#productorSelect').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					$('#productorEditarSelect').autocomplete({
						lookup: self.listaAuxProductores,
						onSelect: function (suggestion) {
							console.log('onSelect', suggestion);
							self.productor.numeroRifUsuario = suggestion.data;
							suggestion = null;
							console.log(self.productorPolizasColectivas);
							$('#productorSelect').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					$('#productorColectivaSelect').autocomplete({
						lookup: self.listaAuxProductores,
						onSelect: function (suggestion) {
							console.log('onSelect', suggestion);
							self.productorPolizasColectivas.numeroRifUsuario = suggestion.data;
							suggestion = null;
							console.log(self.productorPolizasColectivas);
							$('#productorColectivaSelect').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
					data = undefined;
				});

		};

		this.consultarMonedasServices = function () {
      var data=mainServices.getMonedas();
			self.ListaMonedas = [];

			for (var i = 0; i < data.length; i++) {
				self.ListaMonedas.push({
					id: data[i].idMoneda,
					nombre: data[i].nbMoneda
				});
			};

			self.showVista++;



		};

		this.consultarRamosService = function () {
      var data=mainServices.getRamos();
			self.ListaByRamos = [];

			for (var i = 0; i < data.length; i++) {

				self.ListaByRamos.push({
					coRamo: data[i].coRamo,
					nbRamo: data[i].nbRamo
				});

			};

			console.log('self.ListaByRamos', self.ListaByRamos);
			self.showVista++;
			polizaServices.consultarRamos()
				.success(function (data) {
					console.log('data', data);
					self.ListaRamos = [];

					for (var i = 0; i < data.ramos.length; i++) {
						self.ListaRamos.push({
							coSubRamo: data.ramos[i].coSubRamo,
							nbRamo: data.ramos[i].nbRamo,
							coRamo: data.ramos[i].coRamo
						});

					};

					console.log('self.ListaRamos', self.ListaRamos);
					self.showVista++;
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
		};

		this.consultarCoberturasService = function () {

			console.log('self.opcionPoliza', self.opcionPoliza);
			var params = {
				coRamo: self.opcionPoliza
			};

			polizaServices.consultarCoberturas(params)
				.success(function (data) {
					console.log(data);
					self.ListaSelecBasica = [];
					self.ListaSelecOpcional = [];

					for (var i = 0; i < data.length; i++) {
						if (data[i].inEstatus == 1) {
							switch (data[i].txTipoCobertura) {
								case 'B':
									self.ListaSelecBasica.push(data[i]);
									break;
								case 'O':
									self.ListaSelecOpcional.push(data[i]);
									break;
							};
						}
					};
					console.log(self.ListaSelecBasica);
					console.log(self.ListaSelecOpcional);
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});

		}

		this.consultarMarcasVehiculoService = function () {

      var data=mainServices.getMarcasVehiculos();
			self.marcaVehiculos = [];

 		 for (var i = 0; i < data.length; i++) {
 			 self.marcaVehiculos.push({
 				 id: data[i].idMarca,
 				 nombre: data[i].nombreMarca
 			 });
 		 };

		};

		this.consultarModelosVehiculoService = function (marca) {
			var params = {
				idMarca: marca
			}
			polizaServices.consultarModelosVehiculo(params)
				.success(function (data) {
					self.modeloVehiculos = [];

					for (var i = 0; i < data.length; i++) {
						self.modeloVehiculos.push({
							id: data[i].idModeloVehiculo,
							nombre: data[i].modelo
						});
					};
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
		};

		this.mostrarCertificados = function () {
			console.log('elemt', self.editarPolizasFormulario.numeroPoliza);
			var params = {
				nroPoliza: self.editarPolizasFormulario.numeroPoliza,
				nuRifEmpresa: self.editarPolizasFormulario.nuRifEmpresa
			};

			polizaServices.consultarCertificadosColectiva(params)
				.success(function (data) {
					self.ListaCertificados = data;
					for(var i = 0 ; i<self.ListaCertificados.length; i++){
						self.ListaCertificados[i].recibos=[];
					};
					if (!$.fn.DataTable.isDataTable('#tablaConsultarCertificadosPolizasColectivas')) {
						self.createTablePolizasCertificado();
					} else {
						self.destroyTablePolizasCertificado();
					}
					data = undefined;
				})
				.error(function (data) {
					if (!$.fn.DataTable.isDataTable('#tablaConsultarCertificadosPolizasColectivas')) {
						self.createTablePolizasCertificado();
					} else {
						self.destroyTablePolizasCertificado();
					}
				});



		};

		this.consultarMarcas = function () {

			self.listaMarca = [];
			self.listaModelo = [];
			self.listaVersion = [];
			self.vehiculo.pasajeros = undefined;

			var data=mainServices.getMarcasVehiculos();
			self.listaMarca = [];
			self.listaMarca=data;
			console.log(self.listaMarca);
			if (self.views.editarPolizasIndividuales)
				self.consultarModelos();

    };

		this.consultarModelos = function () {

			self.listaModelo = [];
			self.listaVersion = [];
			self.vehiculo.pasajeros = undefined;
			console.log(self.listaMarca);
			if (self.views.editarPolizasIndividuales) {
				var params = {
					'idMarca': self.editarPolizasFormulario.vehiculo.idMarca
				};
			} else {
				var params = {
					/*				'ano': self.vehiculo.ano,*/
					'idMarca': self.vehiculo.marca.idMarca
				};
			}


			polizaServices.consultarModelosVehiculo(params)
				.success(function (data) {
					self.listaModelo = data;
					console.log(self.listaModelo);
					data = undefined;
				})
				.error(function () {
					self.vehiculo.marca.codigo = undefined;
				});


		};

		this.consultarVersiones = function () {


			var params = {
				'idMarca': 0
			};
			polizaServices.consultarModelosVehiculo(params)
				.success(function (data) {
					self.listaModelo = data;
					data = undefined;
				})
				.error(function () {
					self.vehiculo.modelo.codigo = undefined
				});


		};


    this.generateReciboAutomatico=function(params){
       console.log('Sending Automatic Recipe');
			 console.log(params);
			 polizaServices.generarReciboAutomatico(params)
			 .success(function (data){
				if(data.codigo==1){
					new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de enviar el recibo automatico.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});

				}
                data=undefined;
			 }).error(function(){
				 new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de enviar el recibo automatico.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});


			 });


		};

    this.generateCartasAutomaticas=function(ramo,tipoPoliza){

			var currentDate=new Date();
			var paramsAuto=undefined;
			var paramPAT=undefined;
			var paramPER=undefined;


			if(ramo=='AUT'){

				if(tipoPoliza=='I'){

					paramsAuto={
				 "nu_carta":self.agregarPolizaFormulario.numeroPoliza+"_"+1,
				 "day":currentDate.getDate(),
				 "month":self.getStringMonthFromNumber(currentDate.getMonth()+1),
				 "year":currentDate.getFullYear(),
				 "nbTomador":self.datos.tomador,
				 "nbAsegudado":self.datos.asegurado,
				 "email":self.tomador.txCorreo,
				 "nu_poliza":self.agregarPolizaFormulario.numeroPoliza,
				 "nu_recibo":self.recibo.recibo,
				 "marca":self.vehiculo.marca.nombreMarca,
				 "modelo":self.vehiculo.modelo.modelo,
				 "placa":self.vehiculo.placa,
				 "ano":self.vehiculo.ano,
				 "fdesde":self.recibo.fechaVigenciaDesde,
				 "fhasta":self.recibo.fechaVigenciaHasta,
				 "prima":self.datos.prima,
				 "total_prima":self.datos.prima,
				 "nb_aseguradora":self.datos.aseguradora.value,
				 "rif_aseguradora":self.datos.aseguradora.data,
				 "cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))


			   }

				}else if(tipoPoliza=='C'){

					paramsAuto={
				      "nu_carta":self.agregarPolizaFormulario.numeroPoliza+"_"+1,
				      "day":currentDate.getDate(),
				      "year":currentDate.getFullYear(),
				      "nbTomador":self.datos.tomador,
				     	"email":self.tomador.txCorreo,
				      "nu_poliza":self.agregarPolizaFormulario.numeroPoliza,
				      "nu_recibo":self.recibo.recibo,
				      "fdesde":self.recibo.fechaVigenciaDesde,
				      "fhasta":self.recibo.fechaVigenciaHasta,
				      "prima":self.datos.prima,
				      "total_prima":self.datos.prima,
				      "nb_aseguradora":self.datos.aseguradora.value,
				      "rif_aseguradora":self.datos.aseguradora.data,
		 			    "cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))

				 }

				}



			}else if(ramo=='PAT'){

				if(tipoPoliza=='I'){
				paramPAT={
             "nbTomador":self.datos.tomador,
						 "email":self.tomador.txCorreo,
						 "nbAsegurado":self.datos.asegurado,
						 "nb_aseguradora":self.datos.aseguradora.value,
						 "rif_aseguradora":self.datos.aseguradora.data,
						 "nb_ramo":self.opcionRamo,
						 "nu_fianza":self.agregarPolizaFormulario.numeroPoliza,
						 "nu_recibo":self.recibo.recibo,
						 "nb_descripcion":"poliza patrimonial",
						 "prima":self.datos.prima,
						 "total_prima":self.datos.prima,
						 "cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))

				}
			}else if(tipoPoliza=='C'){
				paramPAT={
						 "nbTomador":self.datos.tomador,
						 "email":self.tomador.txCorreo,
						 "nb_aseguradora":self.datos.aseguradora.data,
						 "rif_aseguradora":self.datos.aseguradora.value,
						 "nb_ramo":self.opcionRamo,
						 "nu_fianza":self.agregarPolizaFormulario.numeroPoliza,
						 "nu_recibo":self.recibo.recibo,
						 "nb_descripcion":"poliza patrimonial",
						 "prima":self.datos.prima,
						 "total_prima":self.datos.prima,
						 "cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))
				  }

			   }
			}else if(ramo=='PER'){
				if(tipoPoliza=='C'){
          paramPER={
						"nbTomador":self.datos.tomador,
						"email":self.tomador.txCorreo,
						"nbAsegurado":self.datos.asegurado,
						"nb_aseguradora":self.datos.aseguradora.data,
						"rif_aseguradora":self.datos.aseguradora.value,
						"nb_tipo_poliza":self.opcionRamo,
						"nu_poliza":self.agregarPolizaFormulario.numeroPoliza,
						"nb_ramo":self.opcionRamo,
						"nu_recibo":self.recibo.recibo,
						"fdesde":self.recibo.fechaVigenciaDesde,
						"fhasta":self.recibo.fechaVigenciaHasta,
						 "prima":self.datos.prima,
						"tipo_poliza":self.datos.tipoPoliza,
	 				  "cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))

					}
				}else if (tipoPoliza=='I'){
					paramPER={
						"nbTomador":self.datos.tomador,
						"email":self.tomador.txCorreo,
						"nbAsegurado":self.datos.asegurado,
						"tipo_poliza":self.datos.tipoPoliza,
						"adicionales":JSON.parse(JSON.stringify(self.adicionales)),
						"cuentaBancos":JSON.parse(JSON.stringify(self.ListaCuentasAseguradora))

					}

				}

			}

			var paramsCarta={
					 "module":"Poliza",
					"template":"POLIZA_"+self.agregarPolizaFormulario.coRamo+"_"+tipoPoliza+"_EMISION_TEMPLATE.DOCX",
					"fileName":self.agregarPolizaFormulario.numeroPoliza + "_"+ self.agregarPolizaFormulario.numeroCertificado+"_"+self.agregarPolizaFormulario.coRamo,
					"nbAsegurado":self.datos.asegurado,
					"email":self.tomador.txCorreo,
					"nbTomador":self.datos.tomador,
					"parameters":paramsAuto!=undefined ?JSON.parse(JSON.stringify(paramsAuto)):(paramPAT!=undefined?JSON.parse(JSON.stringify(paramPAT)):JSON.parse(JSON.stringify(paramPER)))
			}

			self.generateReciboAutomatico(paramsCarta);

			}

		this.getStringMonthFromNumber=function(number){
			var month="";
       switch(number){
				 case 1:
				    month="Enero";
				 break;
				 case 2:
				     month="Febrero";
				 break;
				 case 3:
				      month="Marzo";
				 break;
				 case 4:
				     month="Abril";
				 break;
				 case 5:
				     month="Mayo";
				 break;
				 case 6:
				     month="Junio";
				 break;
				 case 7:
				     month="Julio";
				 break;
				 case 8:
				      month="Agosto";
				 break;
				 case 9:
				     month="Septiembre";
				 break;
				 case 10:
				      month="Octubre";
				 break;
				 case 11:
				      month="Noviembre";
				 break;
				 case 12:
				      month="Diciembre";
				 break;
			 }


		}

    this.cargarArchivoPolizasService = function(excelFile){
            console.log('on cargarArchivoPolizasService call function..');

            var file = excelFile;
               // uploadURL = 'http://192.168.1.110:8080/dgboss-services/rest/file/upload';

            console.log(file);
			console.dir(file);
			var option = '';

			if(self.cargaCheck.v == 'iradio_flat-green checked')
				option = 'auto';

			if(self.cargaCheck.per == 'iradio_flat-green checked')
				option = 'persona';

			if(self.cargaCheck.pa == 'iradio_flat-green checked')
				option = 'patrimoniales';

            polizaServices.cargarArchivoPoliza(file,option)
                .success(function(data){
                    console.log('success on cargarArchivoPolizasService call function..');
                    console.log(data);
                    new PNotify({
                        title: '¡ Pólizas cargadas!',
                        text: 'Pólizas cargadas con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                    self.mensaje = 'Se insertó '+ data.successful + ' de ' + (data.failures+data.successful) + ' pólizas.';
                    self.cargaMasivaPolizaViews.exito = true;
					          self.cargaMasivaPolizaViews.cargar = false;
                    self.listaPolizasRejected=data.polizasRejected;
					          self.cargaCheck.v = 'iradio_flat-green';
					          self.cargaCheck.per = 'iradio_flat-green';
					          self.cargaCheck.pa = 'iradio_flat-green';
                })
                .error(function(data, status, headers, config){
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de cargar las pólizas.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

		this.anularPolizaService = function () {
			var params = {};

			params.nuRifEmpresa = mainServices.getRifEmpresa();
			params.nuPoliza = self.anularPolizasFormulario.numeroPoliza;
			params.inCertificado = self.anularPolizasFormulario.numeroCertificado;
			params.nuCedulaAsegurado = self.anularPolizasFormulario.nuRifAsegurado;
			params.coRamo = self.anularPolizasFormulario.coRamo;
			params.nuRifAseguradora = self.anularPolizasFormulario.nuRifAseguradora;
			params.observacion = self.editarPolizasFormulario.observacion;
			params.usuario = mainServices.getUser();

			polizaServices.anularPoliza(params).success(function (data) {

				console.log(self.views);
						if (self.views.listarPolizasColectivas) {
							self.listarPolizasColectivas();
							self.cancelar();
							self.viewsController('listarPolizasColectivas');
						}
						if (self.listarPolizasIndividuales){
							self.listarPolizasIndividuales();
							self.cancelar();
							self.viewsController('listarPolizasIndividuales');
						}


				new PNotify({
							title: 'Mensaje',
							text: data,
							type: 'notice',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
			})
			//$('#tablaConsultarPolizasColectivas').dataTable()._fnAjaxUpdate();
		}

		this.agregarPolizaService = function (option) {
			var params = {};
			switch (self.opcionRamo) {
				case 'PAT':

					switch (option) {
						case 'agregar':
							//llenar params
							params = angular.copy(self.agregarPolizaFormulario);//self.listaPolizasIndividuales[0];
							break;
						case 'editar':
							//llenar params
							params = angular.copy(self.agregarPolizaFormulario);
							break;
					};

					break;
				case 'PER':

					switch (option) {
						case 'agregar':
							params = angular.copy(self.agregarPolizaFormulario);//self.listaPolizasIndividuales[0];
							break;
						case 'editar':
							//llenar params
							params = angular.copy(self.agregarPolizaFormulario);
							break;
					};

					break;
				case 'AUT':

					switch (option) {
						case 'agregar':
							params = angular.copy(self.agregarPolizaFormulario);//self.listaPolizasIndividuales[0];
							break;
						case 'editar':
							//llenar params
							params = angular.copy(self.agregarPolizaFormulario);
							break;
					};

					break;
				case 'FIA':

					switch (option) {
						case 'agregar':
							//llenar params
							break;
						case 'editar':
							//llenar params
							break;
					};

					break;
				default:
					break;
			};
			params.feEmision = mainServices.revertDate(params.feEmision);
			params.feVigInicio = mainServices.revertDate(params.feVigInicio);
			params.feVigFin = mainServices.revertDate(params.feVigFin);

			for ( var i = 0 ; i<params.beneficiarios.length; i++){
				params.beneficiarios[i].feNacimiento =  mainServices.revertDate(params.beneficiarios[i].feNacimiento );
			}
			for ( var i = 0 ; i<params.adicionales.length; i++){
				params.adicionales[i].feNacimiento =  mainServices.revertDate(params.adicionales[i].feNacimiento );
			}
			if(params.recibo.length > 0 ){
				params.recibo[0].fechaEmision =  mainServices.revertDate(params.recibo[0].fechaEmision);
				params.recibo[0].fechaRecepcion =  mainServices.revertDate(params.recibo[0].fechaRecepcion);
				params.recibo[0].fechaVigenciaDesde =  mainServices.revertDate(params.recibo[0].fechaVigenciaDesde);
				params.recibo[0].fechaVigenciaHasta =  mainServices.revertDate(params.recibo[0].fechaVigenciaHasta);
			}

			params.usuario = self.editarPolizasFormulario.nombreUsuarioApp;

			console.log('params',params);
			if(option == 'agregar'){
				console.log('agregar params',params);
				//agregar
				polizaServices.agregarPoliza(params)
					.success(function (data) {
						console.log(data);

						if (data.codigo == 200) {
							if (self.polizaColectiva) {
								self.generateCartasAutomaticas(self.opcionRamo,'C');
								self.cancelar();
								self.viewsController('listarPolizasColectivas');
								self.listarPolizasColectivas();
							} else if (self.polizaCertificado) {
								self.mostrarCertificados();
								self.generateCartasAutomaticas(self.opcionRamo,'I');
								self.cancelar();
								self.viewsController('listarPolizasCertificados');
							} else {
								self.listarPolizasIndividuales();
								//hacer la llamada del servicio de carta automatico
								self.generateCartasAutomaticas(self.opcionRamo,'I');
								self.cancelar();
								self.viewsController('listarPolizasIndividuales');
							}
             		} else {
							switch (option) {
								case 'agregar':
									new PNotify({
										title: '¡Póliza creada!',
										text: data.mensaje, //'La póliza fue creada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									/// en el caso agregar se genera el recibo automatico
									console.log(self.vehiculo);
									break;

								case 'editar':
									new PNotify({
										title: '¡Póliza editada!',
										text: 'La póliza fue editada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									break;

								default:
									break;
							};

							datosGenerales.collapse('show');
							self.setObjectElems(self.datos, undefined);
							self.setObjectElems(self.vehiculo, undefined);
							self.setObjectElems(self.adicional, undefined);
							self.adicionales = [];
							self.setObjectElems(self.beneficiario, undefined);
							self.beneficiarios = [];
							self.setObjectElems(self.productor, undefined);
							self.setObjectElems(self.ejecutivo, undefined);
							self.productores = [];
							self.ejecutivos = [];
							self.setObjectElems(self.contrato, undefined);
							self.listaCoberturas = [];
							self.contragarantes = [];
							self.setObjectElems(self.fianza, undefined);
							self.fianzas = [];
							self.setObjectElems(self.tipoPoliza, false);
							self.opcionPoliza = undefined;
							self.opcionRamo = undefined;
						}
						data = undefined;
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
			}//fin actualizar
			//editar
			if(option == 'editar'){
				polizaServices.actualizarPoliza(params)
					.success(function (data) {
						console.log(data);

						if (data.codigo == 200) {
							if (self.polizaColectiva) {
								//self.generateCartasAutomaticas(self.opcionRamo,self.tipoPoliza);
								self.cancelar();
								self.viewsController('listarPolizasColectivas');
								self.listarPolizasColectivas();
							} else if (self.polizaCertificado) {
								self.mostrarCertificados();
								//self.generateCartasAutomaticas(self.opcionRamo,self.tipoPoliza);
								self.cancelar();
								self.viewsController('listarPolizasCertificados');
							} else {
								self.listarPolizasIndividuales();
								//hacer la llamada del servicio de carta automatico
								//self.generateCartasAutomaticas(self.opcionRamo,self.tipoPoliza);
								self.cancelar();
								self.viewsController('listarPolizasIndividuales');
							}

							switch (option) {
								case 'agregar':
									new PNotify({
										title: '¡Póliza creada!',
										text: data.mensaje, //'La póliza fue creada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									/// en el caso agregar se genera el recibo automatico
									console.log(self.vehiculo);
									break;

								case 'editar':
									new PNotify({
										title: '¡Póliza editada!',
										text: 'La póliza fue editada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									break;

								default:
									break;
							};




							datosGenerales.collapse('show');
							self.setObjectElems(self.datos, undefined);
							self.setObjectElems(self.vehiculo, undefined);
							self.setObjectElems(self.adicional, undefined);
							self.adicionales = [];
							self.setObjectElems(self.beneficiario, undefined);
							self.beneficiarios = [];
							self.setObjectElems(self.productor, undefined);
							self.setObjectElems(self.ejecutivo, undefined);
							self.productores = [];
							self.ejecutivos = [];
							self.setObjectElems(self.contrato, undefined);
							self.listaCoberturas = [];
							self.contragarantes = [];
							self.setObjectElems(self.fianza, undefined);
							self.fianzas = [];
							self.setObjectElems(self.tipoPoliza, false);
							self.opcionPoliza = undefined;
							self.opcionRamo = undefined;

						} else {

							switch (option) {
								case 'agregar':
									new PNotify({
										title: '¡Error!',
										text: 'Hubo un error al momento de crear la póliza.',
										type: 'error',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									break;

								case 'editar':
									new PNotify({
										title: '¡Error!',
										text: 'Hubo un error al momento de editar la póliza.',
										type: 'error',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
									break;

								default:
									break;
							};

						}
						data = undefined;
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
			}//fin editar
		};

		/********************************************************************************************
		**                                    C O N T R O L L E R S                                **
		********************************************************************************************/
		this.viewsController = function (view) {
			self.setObjectElems(self.views, false);
			self.listaPolizasRejected=[];
			switch (view) {
				case 'agregarPolizasIndividuales':
					self.views.agregarPolizasIndividuales = true;
					self.cancelar();
					console.log('viewsController > agregarPolizasIndividuales');
					break;
				case 'editarPolizasIndividuales':
					self.views.editarPolizasIndividuales = true;
					console.log('viewsController > editarPolizasIndividuales');
					break;
				case 'listarPolizasIndividuales':
					self.cargaMasivaPolizaViews.cargar = true;
					self.cargaMasivaPolizaViews.exito = false;
					self.listarPolizasIndividuales();
					self.views.listarPolizasIndividuales = true;
					console.log('viewsController > listarPolizasIndividuales');
					break;
				case 'agregarPolizasColectivas':
					self.views.agregarPolizasColectivas = true;
					self.cancelar();
					console.log('viewsController > agregarPolizasColectivas');
					break;
				case 'editarPolizasColectivas':
					self.views.editarPolizasColectivas = true;
					self.views.listarPolizasColectivas = true;
					console.log('viewsController > editarPolizasColectivas');
					break;
				case 'agregarPolizasCertificado':
					self.views.agregarPolizasCertificado = true;
					self.cancelar();
					console.log('viewsController > agregarPolizasCertificado');
					break;
				case 'listarPolizasColectivas':
					self.views.listarPolizasColectivas = true;
					console.log('viewsController > listarPolizasColectivas');
					self.listarPolizasColectivas();
					break;
				case 'listarPolizasCertificados':
					self.views.listarPolizasCertificados = true;
					console.log('viewsController > listarPolizasCertificados');
					break;
				case 'editarPolizasCertificado':
					self.views.editarPolizasCertificado = true;
					self.views.listarPolizasCertificados = true;
					console.log('viewsController > editarPolizasCertificado');
					break;
				case 'cargarPolizas':
					self.views.cargarPolizas = true;
					console.log('viewsController > cargarPolizas');
					break;
				default:
					break;
			}
			console.log(self.views);
		};

		this.TipoRamo = function () {
			self.setObjectElems(self.tipoPoliza, false);
			console.log('self.opcionRamo.coRamo', self.opcionRamo);
			switch (self.opcionRamo) {
				case 'PAT':
					self.ListaAux = [];
					for (var i = 0; i < self.ListaRamos.length; i++) {
						console.log(self.ListaRamos[i]);
						if (self.ListaRamos[i].coRamo == 'PAT') {
							self.ListaAux.push(self.ListaRamos[i]);
						}
					}
					self.tipoPoliza.incendio = true;
					self.tipoPoliza.cobertura = true;
					self.tipoPoliza.productor = true;
					self.tipoPoliza.recibo = true;
					break;
				case 'PER':
					self.ListaAux = [];
					for (var i = 0; i < self.ListaRamos.length; i++) {
						if (self.ListaRamos[i].coRamo == 'PER') {
							self.ListaAux.push(self.ListaRamos[i]);
						}
					}
					self.tipoPoliza.vida = true;
					self.tipoPoliza.Salud = true;
					self.tipoPoliza.accidentes = true;
					self.tipoPoliza.funeraria = true;
					self.tipoPoliza.cobertura = true;
					self.tipoPoliza.Adicionales = true;
					self.tipoPoliza.Beneficiarios = true;
					self.tipoPoliza.productor = true;
					self.tipoPoliza.recibo = true;
					break;
				case 'AUT':
					self.ListaAux = [];
					console.log('self.ListaByRamos.length', self.ListaRamos.length);
					for (var i = 0; i < self.ListaRamos.length; i++) {
						console.log('self.ListaByRamos[i].coRamo', self.ListaRamos[i].coRamo);
						if (self.ListaRamos[i].coRamo == 'AUT') {
							self.ListaAux.push(self.ListaRamos[i]);
						}
					}

					self.tipoPoliza.vehiculo = true;
					self.tipoPoliza.cobertura = true;
					self.tipoPoliza.productor = true;
					self.tipoPoliza.recibo = true;
					break;
				/* 			case 'FIANZA':

								break;	 */
				default:
					break;
			};
			console.log('opcionRamo', self.opcionRamo);
			console.log('ListaAux', self.ListaAux);
		};

		this.tipoPolizaSwitch = function () {
			self.consultarCoberturasService();
		};

		this.tipoCedulaSwitch = function () {
			console.log('me llamaron');
			if (self.views.agregarPolizasIndividuales) {
				console.log(self.datos.tipoDocumento);
				switch (self.datos.tipoDocumento) {
					case 'V':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					case 'E':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					default:
						self.maskIdentifacionAsegurado = '9?9?9?9999999';
						break;
				};
				if (self.datos.tipoDocumento != undefined && self.datos.documento != undefined) {
					self.maskIdentifacionAsegurado = undefined;
					var params = {
						"cedulaRif": self.datos.tipoDocumento + "-" + self.datos.documento
					};

					polizaServices.consultarAsegurado(params)
						.success(function (data) {
							console.log('Asegurado', data);
							if(data.length > 0){
								if (self.mismoTomadorCheck.n == 'iradio_flat-green checked') {

									self.tomador = data[0];
									self.datos.tomador = data[0].nbPrimerNombre;

								}
								else {
									if (data[0] != undefined) {
										self.tomador = data[0];
										self.datos.tomador = data[0].nbPrimerNombre;

										self.asegurado = data[0];
										self.datos.asegurado = data[0].nbPrimerNombre;
									}

								}
								data = undefined;
							}else{
								new PNotify({
									title: 'Error',
									text: 'El documento de identidad que introdujo no esta registrado en el sistema.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								self.datos.tomador = undefined;
								self.datos.asegurado = undefined;
							}


						});

				}
			}
			if (self.views.editarPolizasIndividuales) {
				switch (self.editarPolizasFormulario.tipoDocumentoT) {
					case 'V':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					case 'E':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					default:
						self.maskIdentifacionAsegurado = '9?9?9?9999999';
						break;
				};
				if (self.editarPolizasFormulario.tipoDocumentoT != undefined && self.editarPolizasFormulario.nuRifAseguradoTomador != undefined) {
					self.maskIdentifacionAsegurado = undefined;
					var params = {
						"cedulaRif": self.editarPolizasFormulario.tipoDocumentoT + "-" + self.editarPolizasFormulario.nuRifAseguradoTomador
					};

					polizaServices.consultarAsegurado(params)
						.success(function (data) {
							console.log('Asegurado', data);
							if(data.length > 0 ){
								if (data[0] != undefined) {
									self.editarPolizasFormulario.nbAseguradoTomador = data[0].nbPrimerNombre + ' ' + data[0].nbPrimerApellido;
								}
								data = undefined;
							}else{
								new PNotify({
									title: 'Error',
									text: 'El documento de identidad que introdujo no esta registrado en el sistema.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						});

				}
			}
			if (self.views.agregarPolizasColectivas) {
				switch (self.datosPolizasColectivas.tipoDocumento) {
					case 'V':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					case 'E':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					default:
						self.maskIdentifacionAsegurado = '9?9?9?9999999';
						break;
				};
				if (self.datosPolizasColectivas.tipoDocumento != undefined && self.datosPolizasColectivas.documento != undefined) {
					var params = {
						"cedulaRif": self.datosPolizasColectivas.tipoDocumento + "-" + self.datosPolizasColectivas.documento
					};

					polizaServices.consultarAsegurado(params)
						.success(function (data) {
							console.log('Asegurado', data);
							if(data.length > 0){
								self.tomador = data[0];
								self.datosPolizasColectivas.tomador = data[0].nbPrimerNombre;
								data = undefined;
							}else{
								new PNotify({
									title: 'Error',
									text: 'El documento de identidad que introdujo no esta registrado en el sistema.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						});
				}

			}
			if (self.views.agregarPolizasCertificado) {
				switch (self.datosGeneralesCertificados.tipoDocumento) {
					case 'V':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					case 'E':
						self.maskIdentifacionAsegurado = '9?9?9?9?999999';
						break;
					default:
						self.maskIdentifacionAsegurado = '9?9?9?9999999';
						break;
				};

				if (self.datosGeneralesCertificados.tipoDocumento != undefined && self.datosGeneralesCertificados.documento != undefined) {
					var params = {
						"cedulaRif": self.datosGeneralesCertificados.tipoDocumento + "-" + self.datosGeneralesCertificados.documento
					};

					polizaServices.consultarAsegurado(params)
						.success(function (data) {
							console.log('Asegurado', data);
							if(data.length > 0){
								self.tomador = data[0];
								self.datosGeneralesCertificados.asegurado = data[0].nbPrimerNombre;
								self.datosGeneralesCertificados.tpAsegurado = data[0].inTipoPersona;
								self.datosGeneralesCertificados.nuRifAsegurado = data[0].nuCedulaRif;
								data = undefined;
							}else{
								new PNotify({
									title: 'Error',
									text: 'El documento de identidad que introdujo no esta registrado en el sistema.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						});
				}
			}


		};

		this.tipoCedulaAseguradoSwitch = function () {

			self.maskIdentifacionTomador = undefined;
			switch (self.datos.tipoDocumento) {
				case 'V':
					self.maskIdentifacionTomador = '9?9?9?99999';
					break;
				case 'E':
					self.maskIdentifacionTomador = '9?9?9?9?999999';
					break;
				default:
					self.maskIdentifacionTomador = '9?9?9?9?999999';
					break;
			};
			var params = {
				"cedulaRif": self.datos.tipoDocumentoAsegurado + "-" + self.datos.documentoAsegurado
			};

			polizaServices.consultarAsegurado(params)
				.success(function (data) {
					console.log('Asegurado', data);
					if(data.length){
						self.asegurado = data[0];
						self.datos.asegurado = data[0].nbPrimerNombre;
						data = undefined;
					}else{
							new PNotify({
								title: 'Error',
								text: 'El documento de identidad que introdujo no esta registrado en el sistema.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						}
				});

		};

		this.tipoCedulaSwitchVehiculo = function () {
			console.log('me llamaron');
			self.maskIdentifacionVehiculo = undefined;
			switch (self.vehiculo.tipoDocumentoo) {
				case 'V':
					self.maskIdentifacionVehiculo = '9?9?9?9?999999';
					break;
				case 'E':
					self.maskIdentifacionVehiculo = '9?9?9?9?999999';
					break;
				default:
					self.maskIdentifacionVehiculo = '9?9?9?9999999';
					break;
			};

			if (self.views.agregarPolizasIndividuales) {
				switch (self.vehiculo.tipoDocumento) {
					case 'V':
						if (self.vehiculo.documento) {
							if (isNaN(self.vehiculo.documento[0]) && isNaN(self.vehiculo.documento[1])) {
								console.log('on Nacional');
								self.vehiculo.documento = self.vehiculo.documento.substring(2, self.vehiculo.documento.length);
							};
							self.vehiculo.documento = 'V-' + self.vehiculo.documento;
						}
						console.log('Documento de vehiculo', self.vehiculo.documento);
						break;
					case 'E':
						if (self.vehiculo.documento) {
							if (isNaN(self.vehiculo.documento[0]) && isNaN(self.vehiculo.documento[1])) {
								console.log('on Extranjero');
								self.vehiculo.documento = self.vehiculo.documento.substring(2, self.vehiculo.documento.length);
							};
							self.vehiculo.documento = 'E-' + self.vehiculo.documento;
						}
						break;
					case 'J':
						if (self.vehiculo.documento) {
							if (isNaN(self.vehiculo.documento[0]) && isNaN(self.vehiculo.documento[1])) {
								console.log('on Juridico');
								self.vehiculo.documento = self.vehiculo.documento.substring(2, self.vehiculo.documento.length);
							};
							self.vehiculo.documento = 'J-' + self.vehiculo.documento;
						}
						break;
					case 'G':
						if (self.vehiculo.documento) {
							if (isNaN(self.vehiculo.documento[0]) && isNaN(self.vehiculo.documento[1])) {
								console.log('on Juridico');
								self.vehiculo.documento = self.vehiculo.documento.substring(2, self.vehiculo.documento.length);
							};
							self.vehiculo.documento = 'J-' + self.vehiculo.documento;
						}
						break;
					default:
						break;
				}
			}
			if (self.views.editarPolizasIndividuales) {
				switch (self.editarPolizasFormulario.vehiculo.tipoDocumento) {
					case 'Nacional':
						if (self.editarPolizasFormulario.vehiculo.documento) {
							if (isNaN(self.editarPolizasFormulario.vehiculo.documento[0]) && isNaN(self.editarPolizasFormulario.vehiculo.documento[1])) {
								console.log('on Nacional');
								self.editarPolizasFormulario.vehiculo.documento = self.editarPolizasFormulario.vehiculo.documento.substring(2, self.editarPolizasFormulario.vehiculo.documento.length);
							};
							self.editarPolizasFormulario.vehiculo.documento = 'V-' + self.editarPolizasFormulario.vehiculo.documento;
						}
						break;
					case 'Extranjero':
						if (self.editarPolizasFormulario.vehiculo.documento) {
							if (isNaN(self.editarPolizasFormulario.vehiculo.documento[0]) && isNaN(self.editarPolizasFormulario.vehiculo.documento[1])) {
								console.log('on Extranjero');
								self.editarPolizasFormulario.vehiculo.documento = self.editarPolizasFormulario.vehiculo.documento.substring(2, self.editarPolizasFormulario.vehiculo.documento.length);
							};
							self.editarPolizasFormulario.vehiculo.documento = 'E-' + self.editarPolizasFormulario.vehiculo.documento;
						}
						break;
					case 'Juridico':
						if (self.editarPolizasFormulario.vehiculo.documento) {
							if (isNaN(self.editarPolizasFormulario.vehiculo.documento[0]) && isNaN(self.editarPolizasFormulario.vehiculo.documento[1])) {
								console.log('on Juridico');
								self.editarPolizasFormulario.vehiculo.documento = self.editarPolizasFormulario.vehiculo.documento.substring(2, self.editarPolizasFormulario.vehiculo.documento.length);
							};
							self.editarPolizasFormulario.vehiculo.documento = 'J-' + self.editarPolizasFormulario.vehiculo.documento;
						}
						break;
					default:
						break;
				}
			}
			if (self.views.agregarPolizasCertificado) {
				console.log('asdsasdasd')
			}
		};

		this.tipoCedulaSwitchFianza = function () {
			if (self.views.agregarPolizasIndividuales) {
				switch (self.contragarante.tipoDocumento) {
					case 'Nacional':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Nacional');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'V-' + self.contragarante.documento;
						}
						break;
					case 'Extranjero':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Extranjero');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'E-' + self.contragarante.documento;
						}
						break;
					case 'Juridico':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Juridico');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'J-' + self.contragarante.documento;
						}
						break;
					default:
						break;
				}
			}
			if (self.views.editarPolizasIndividuales) {
				switch (self.contragarante.tipoDocumento) {
					case 'Nacional':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Nacional');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'V-' + self.contragarante.documento;
						}
						break;
					case 'Extranjero':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Extranjero');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'E-' + self.contragarante.documento;
						}
						break;
					case 'Juridico':
						if (self.contragarante.documento) {
							if (isNaN(self.contragarante.documento[0]) && isNaN(self.contragarante.documento[1])) {
								console.log('on Juridico');
								self.contragarante.documento = self.contragarante.documento.substring(2, self.contragarante.documento.length);
							};
							self.contragarante.documento = 'J-' + self.contragarante.documento;
						}
						break;
					default:
						break;
				}
			}
			if (self.views.agregarPolizasCertificado) {
				console.log('asdsasdasd')
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
            self.recibo.montoRecibo = undefined
		};

        this.validarMontoPrima = function(){
            self.modalControl = {
                si: false,
                no: false,
			};

			if(self.recibo.montoRecibo > 0){

				var  totalPrima = 0;
				var cantRecibos = 0;
				self.montoReciboNuevo = 0;
				var idfreq = 0;
				if(self.views.agregarPolizasColectivas){
					totalPrima = self.datosPolizasColectivas.prima;
					idfreq = self.datosPolizasColectivas.frecuenciaPago;
				}
				if(self.views.agregarPolizasIndividuales){
					totalPrima = self.datos.prima;
					idfreq = self.datos.frecuenciaPago;
				}

				var frecuenciaPago = 0;
				switch(idfreq){
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
				var montoReciboViejo =  totalPrima/frecuenciaPago;
				var recibosNoPagados = cantRecibos-frecuenciaPago;
				if(recibosNoPagados < 0)
					recibosNoPagados=recibosNoPagados*(-1);

				var montoReciboNuevo = self.montoReciboNuevo =  (totalPrima- (cantRecibos * montoReciboViejo))/recibosNoPagados;
				console.log('cantRecibos',cantRecibos);
				console.log('montoReciboViejo',montoReciboViejo);
				console.log('recibosNoPagados',recibosNoPagados);
				console.log('montoReciboNuevo',montoReciboNuevo);
				console.log('Frecuencia de pago',frecuenciaPago);
				if(self.recibo.montoRecibo < montoReciboNuevo || self.recibo.montoRecibo > montoReciboNuevo){
					$('.actualizarMontoPolizaModal').modal({
						show: 'true'
					});
				}
			}
        };

		this.validaAnularPoliza = function(){
			$('.anulaPolizaModal').modal({
						show: 'true'
					});
		}
		/*
				accion para agregar, editar y eliminar una nueva cobertura a listaCoberturas
		*/
		this.agregarCobetura = function (elemt) {

			console.log('agregarCobetura', elemt);

			console.log(self.selecOpcional, 'self.selecOpcional');
			var bool = false;
			if (self.views.agregarPolizasCertificado || self.views.selecBasicaPolizasColectivas) {
				switch (elemt) {
					case 'Basica':

						if (self.selecBasicaPolizasColectivas == undefined || self.sumaAseguBasicaPolizasColectivas == null) {
							if (self.sumaAseguBasicaPolizasColectivas != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Básica',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Básica no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							console.log('cobertura 1', self.selecBasicaPolizasColectivas);
							console.log('self.ListaSelecBasica', self.ListaSelecBasica);

							var cobertura = {};
							for (var i = 0; i < self.ListaSelecBasica.length; i++) {
								if (self.ListaSelecBasica[i].coCobertura == self.selecBasicaPolizasColectivas) {
									cobertura = self.ListaSelecBasica[i];
								}
							}

							self.listaCoberturasPolizasColectivas.push({
								idCobertura: cobertura.coCobertura,
								nombre: cobertura.nbCobertura,
								tipo: 'Básica',
								sumaAsegurada: self.sumaAseguBasicaPolizasColectivas,
								nuPoliza: self.datosGeneralesCertificados.numeroPoliza,
								nuCertificado: self.datosGeneralesCertificados.nro_Certificado,
								estatus: 1
							});
							self.sumaAseguBasicaPolizasColectivas = undefined;
							self.selecBasicaPolizasColectivas = undefined;
							bool = true;
						}
						break;
					case 'Opcional':
						if (self.selecOpcionalPolizasColectivas == undefined || self.sumaAseguOpcionalPolizasColectivas == null) {
							if (self.sumaAseguOpcionalPolizasColectivas != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Opcional',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Opcional no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							console.log('cobertura 2');

							var cobertura = {};
							for (var i = 0; i < self.ListaSelecOpcional.length; i++) {
								if (self.ListaSelecOpcional[i].coCobertura == self.selecOpcionalPolizasColectivas) {
									cobertura = self.ListaSelecOpcional[i];
								}
							}

							self.listaCoberturasPolizasColectivas.push({
								idCobertura: cobertura.coCobertura,
								nombre: cobertura.nbCobertura,
								tipo: 'Opcional',
								sumaAsegurada: self.sumaAseguOpcionalPolizasColectivas,
								nuPoliza: self.datosGeneralesCertificados.numeroPoliza,
								nuCertificado: self.datosGeneralesCertificados.nro_Certificado,
								estatus: 1
							});
							self.sumaAseguOpcionalPolizasColectivas = undefined;
							self.selecOpcionalPolizasColectivas = undefined;
							bool = true;
						}
						break;
					default:
						break;
				};

			}
			if (self.views.agregarPolizasIndividuales) {
				switch (elemt) {
					case 'Basica':

						if (self.selecBasica == undefined || self.sumaAseguBasica == null) {
							if (self.sumaAseguBasica != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Básica',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Básica no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							var basica = {};
							for (var i = 0; i < self.ListaSelecBasica.length; i++) {
								if (self.ListaSelecBasica[i].coCobertura == self.selecBasica) {
									basica = self.ListaSelecBasica[i];
								}
							}
							self.listaCoberturas.push({
								idCobertura: basica.coCobertura,
								nuPoliza: self.datos.numeroPoliza,
								nuCertificado: self.datos.certificado,
								nombre: basica.nbCobertura,
								tipo: 'Básica',
								sumaAsegurada: self.sumaAseguBasica,
								estatus: 1
							});
							self.sumaAseguBasica = undefined;
							self.selecBasica = undefined;
							bool = true;
						}
						break;
					case 'Opcional':
						if (self.selecOpcional == undefined || self.sumaAseguOpcional == null) {
							if (self.sumaAseguOpcional != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Opcional',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Opcional no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							console.log('cobertura 4', self.selecOpcional);

							var cobertura = {};
							for (var i = 0; i < self.ListaSelecOpcional.length; i++) {
								if (self.ListaSelecOpcional[i].coCobertura == self.selecOpcional) {
									cobertura = self.ListaSelecOpcional[i];
								}
							}
							self.listaCoberturas.push({
								idCobertura: cobertura.coCobertura,
								nuPoliza: self.datos.numeroPoliza,
								nuCertificado: self.datos.certificado,
								nombre: cobertura.nbCobertura,
								tipo: 'Opcional',
								sumaAsegurada: self.sumaAseguOpcional,
								estatus: 1
							});
							self.sumaAseguOpcional = undefined;
							self.selecOpcional = undefined;
							bool = true;
						}
						break;
					default:
						break;
				};
			}
			if (self.views.editarPolizasIndividuales) {
				switch (elemt) {
					case 'Basica':

						if (self.selecBasica == undefined || self.sumaAseguBasica == null) {
							if (self.sumaAseguBasica != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Básica',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Básica no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							console.log('cobertura 5');
							var basica = {};
							for (var i = 0; i < self.ListaSelecBasica.length; i++) {
								if (self.ListaSelecBasica[i].coCobertura == self.selecBasica) {
									basica = self.ListaSelecBasica[i];
								}
							}
							self.editarPolizasFormulario.coberturas.push({
								id: self.id != undefined ?self.id:0,
								idCobertura: basica.coCobertura,
								nuPoliza: self.editarPolizasFormulario.numeroPoliza,
								nuCertificado: self.editarPolizasFormulario.numeroCertificado,
								nombre: basica.nbCobertura,
								tipo: 'Básica',//CAMBIAR
								sumaAsegurada: self.sumaAseguBasica,
								estatus: 1,
								accion: null
							});
							self.sumaAseguBasica = undefined;
							self.selecBasica = undefined;
							self.id = undefined;
							bool = true;
						}
						break;
					case 'Opcional':
						if (self.selecOpcional == undefined || self.sumaAseguOpcional == null) {
							if (self.sumaAseguOpcional != null) {
								new PNotify({
									title: 'Error',
									text: 'No selecciono una cobetura Opcional',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'la Cobertura Opcional no tiene suma asegurada',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							console.log(self.selecOpcional, 'self.selecOpcional');
							var cobertura = {};
							for (var i = 0; i < self.ListaSelecOpcional.length; i++) {
								if (self.ListaSelecOpcional[i].coCobertura == self.selecOpcional) {
									cobertura = self.ListaSelecOpcional[i];
								}
							}
							self.editarPolizasFormulario.coberturas.push({
								id: self.id,
								idCobertura: cobertura.coCobertura,
								nuPoliza: self.editarPolizasFormulario.numeroPoliza,
								nuCertificado: self.editarPolizasFormulario.numeroCertificado,
								nombre: cobertura.nbCobertura,
								tipo: 'Opcional',//CAMBIAR
								sumaAsegurada: self.sumaAseguOpcional,
								estatus: 1,
								accion: null
							});
							self.sumaAseguOpcional = undefined;
							self.selecOpcional = undefined;
							bool = true;
							self.id = undefined;
						}
						break;
					default:
						break;
				};
			}

			if (bool) {
				new PNotify({
					title: 'Cobertura Agregada!',
					text: 'Cobertura agragada con exito',
					type: 'success',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
			}
		};

		this.editarCobertura = function (elemt) {
			console.log('self.views.agregarPolizasIndividuales', self.views.agregarPolizasIndividuales);
			console.log('elemt', elemt);

			if (self.views.agregarPolizasIndividuales) {
				var a = self.listaCoberturas.indexOf(elemt);
				switch (elemt.tipo) {
					case 'Básica':
						self.selecBasica = elemt.idCobertura;
						self.sumaAseguBasica = elemt.sumaAsegurada;
						self.listaCoberturas.splice(a, 1);
						break;
					case 'Opcional':
						self.sumaAseguOpcional = elemt.sumaAsegurada;;
						self.selecOpcional = elemt.idCobertura;
						self.listaCoberturas.splice(a, 1);
						break;
					default:
						break;
				};
			}
			if (self.views.agregarPolizasCertificado) {
				var a = self.listaCoberturasPolizasColectivas.indexOf(elemt);
				switch (elemt.tipo) {
					case 'Básica':
						self.sumaAseguBasicaPolizasColectivas = elemt.sumaAsegurada;
						self.selecBasicaPolizasColectivas = elemt.idCobertura;
						self.listaCoberturasPolizasColectivas.splice(a, 1);
						break;
					case 'Opcional':
						self.sumaAseguOpcionalPolizasColectivas = elemt.sumaAsegurada;;
						self.selecOpcionalPolizasColectivas = elemt.idCobertura;
						self.listaCoberturasPolizasColectivas.splice(a, 1);
						break;
					default:
						break;
				};
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.coberturas.indexOf(elemt);
				switch (elemt.tipo) {
					case 'Básica':
						self.sumaAseguBasica = elemt.sumaAsegurada;
						self.selecBasica = elemt.idCobertura;
						self.id = elemt.id;
						self.editarPolizasFormulario.coberturas.splice(a, 1);
						break;
					case 'Opcional':
						self.sumaAseguOpcional = elemt.sumaAsegurada;;
						self.selecOpcional = elemt.idCobertura;
						self.id = elemt.id;
						self.editarPolizasFormulario.coberturas.splice(a, 1);
						break;
					default:
						break;
				};
			}
		};

		this.eliminarCobertura = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				self.auxIndice = self.listaCoberturas.indexOf(elemt);
				self.auxNombreDeLista = 'Cobertura';
				self.mensaje = 'La cobertura ';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
			if (self.views.agregarPolizasCertificado) {
				self.auxIndice = self.listaCoberturasPolizasColectivas.indexOf(elemt);
				self.auxNombreDeLista = 'Cobertura';
				self.mensaje = 'La cobertura ';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
			if (self.views.editarPolizasIndividuales) {
				self.auxIndice = self.editarPolizasFormulario.coberturas.indexOf(elemt);
				self.auxNombreDeLista = 'Cobertura';
				self.mensaje = 'La cobertura ';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
		};

		/*
			funciones para agregar,editar y elminar un productor de Productor
		*/
		this.agregarProductor = function () {
			if (self.views.agregarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#polizaProductor'));
				var bool = true;
				var comision = 0;
				if (self.productores.length > 0) {
					for (var i = 0; i < self.productores.length; i++) {
						console.log('self.productor', self.productor);

						if (self.productores[i].numeroRifUsuario == self.productor.numeroRifUsuario) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Productor',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
					}
				}
				if (validatorResult && bool) {

					var prod = self.buscarProductor(self.productor.numeroRifUsuario);
					if (prod) {
						console.log('self.productor', self.productor);

						this.productores.push({
							id: 0,
							nbPrimerNombre: prod.nbPrimerNombre,
							nbPrimerApellido: prod.nbPrimerApellido,
							numeroRifUsuario: self.productor.numeroRifUsuario,
							numeroPoliza: self.datos.numeroPoliza,
							nombreUsuarioApp: prod.nbUsuarioApp,
							nbNombreCompleto: prod.nbPrimerNombre + ' ' + prod.nbSegundoNombre + ' ' + prod.nbPrimerApellido + ' ' + prod.nbSegundoApellido,
							coRamo: self.opcionRamo,
							nuRifEmpresa: mainServices.getRifEmpresa(),
						});

						self.setObjectElems(self.productor, undefined);
						document.getElementById("productorSelect").value = "";
					} else {
						new PNotify({
							title: 'Error',
							text: 'El nombre del productor no existe o es invalido',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}

				}

			}
			if (self.views.agregarPolizasColectivas) {
				console.log('agregarPolizasColectivas');
				var validatorResult = validator.checkAll($('#datosProductorPolizasColectivas'));
				var bool = true;
				var comision = 0;
				if (self.productoresPolizasColectivas.length >= 1) {
					for (var i = 0; i < self.productoresPolizasColectivas.length; i++) {
						if (self.productoresPolizasColectivas[i].numeroRifUsuario == self.productorPolizasColectivas.numeroRifUsuario) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Productor',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
					}
				}

				if (validatorResult && bool) {
					console.log('self.productorPolizasColectivas', self.productorPolizasColectivas.numeroRifUsuario);
					var prod = self.buscarProductor(self.productorPolizasColectivas.numeroRifUsuario);
					if (prod) {
						self.productoresPolizasColectivas.push({
							id: 0,
							nbPrimerNombre: prod.nbPrimerNombre,
							nbPrimerApellido: prod.nbPrimerApellido,
							numeroRifUsuario: self.productorPolizasColectivas.numeroRifUsuario,
							numeroPoliza: self.datosPolizasColectivas.numero,
							nombreUsuarioApp: prod.nbUsuarioApp,
							nbNombreCompleto: prod.nbPrimerNombre + ' ' + prod.nbSegundoNombre + ' ' + prod.nbPrimerApellido + ' ' + prod.nbSegundoApellido,
							coRamo: self.opcionRamo,
							//montoComision: self.productorPolizasColectivas.monto,
							//poComision: self.productorPolizasColectivas.comsionProductor,
							//fePago: self.productorPolizasColectivas.fechaPago,
							//feCarga: self.productorPolizasColectivas.fechaCarga,
							//estatus: self.productorPolizasColectivas.estatus,
							nuRifEmpresa: mainServices.getRifEmpresa(),
							/*nuRifEmpresa: mainServices.getRifEmpresa(),
							tipoIdentificacion: self.productorPolizasColectivas.nuCedulaRif.split('-')[0],
							nuCedulaRif: self.productorPolizasColectivas.nuCedulaRif,
						poComision         : self.productorPolizasColectivas.porcentaje*/
						});
						console.log(self.productoresPolizasColectivas);
						self.setObjectElems(self.productorPolizasColectivas, undefined);
						document.getElementById("productorColectivaSelect").value = "";
					} else {
						new PNotify({
							title: 'Error',
							text: 'El nombre del productor no existe o es invalido',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}

				}
			}
			if (self.views.editarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#productorEditarSelect'));
				var bool = true;
				var comision = 0;
				if (self.editarPolizasFormulario.comisiones.length > 0) {
					for (var i = 0; i < self.editarPolizasFormulario.comisiones.length; i++) {
						console.log('self.productor.nbPrimerNombre', self.productor.nbPrimerNombre);
						if (self.editarPolizasFormulario.comisiones[i].numeroRifUsuario == self.productor.numeroRifUsuario) {
							if (self.editarPolizasFormulario.comisiones[i].accion == 'D') {
								self.editarPolizasFormulario.comisiones[i].accion = null;
								self.setObjectElems(self.productor, undefined);
								document.getElementById("productorEditarSelect").value = "";
							} else {
								new PNotify({
									title: 'Error',
									text: 'Ya existe ese Productor',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}

							bool = false;
						}
					}
				}
				if (validatorResult && bool) {

					var prod = self.buscarProductor(self.productor.numeroRifUsuario);
					if (prod) {
						console.log('self.productor', self.productor);

						self.editarPolizasFormulario.comisiones.push({
							id: self.productor.id != 0 ? self.productor.id : 0,
							nbPrimerNombre: prod.nbPrimerNombre,
							nbPrimerApellido: prod.nbPrimerApellido,
							numeroRifUsuario: self.productor.numeroRifUsuario,
							numeroPoliza: self.editarPolizasFormulario.numeroPoliza,
							nombreUsuarioApp: prod.nbUsuarioApp,
							nbNombreCompleto: prod.nbPrimerNombre + ' ' + prod.nbSegundoNombre + ' ' + prod.nbPrimerApellido + ' ' + prod.nbSegundoApellido,
							coRamo: self.editarPolizasFormulario.coRamo,
							nuRifEmpresa: mainServices.getRifEmpresa(),
							accion: null
						});

						self.setObjectElems(self.productor, undefined);
						document.getElementById("productorEditarSelect").value = "";
					} else {
						new PNotify({
							title: 'Error',
							text: 'El nombre del productor no existe o es invalido',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}
				}
			}
			if (self.views.editarPolizasColectivas) {
				var validatorResult = validator.checkAll($('#editarFormularioProductoPolizaColectivas'));
				var bool = true;
				var comision = 0;
				if (self.editarPolizasColectivasFormulario.productores.length >= 1) {
					for (var i = 0; i < self.editarPolizasColectivasFormulario.productores.length; i++) {
						console.log(self.productorPolizasColectivas.nombre);
						if (self.editarPolizasColectivasFormulario.productores[i].nombre == self.productorPolizasColectivas.nombre) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Productor',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
						comision = comision + parseInt(self.editarPolizasColectivasFormulario.productores[i].comsionProductor, 10);
					}
				}
				comision = comision + parseInt(self.productorPolizasColectivas.comsionProductor, 10);
				if (comision > 100) {
					new PNotify({
						title: 'Error',
						text: 'No se pueden asignar mas comisiones',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (validatorResult && bool) {
					self.editarPolizasColectivasFormulario.productores.push(self.productorPolizasColectivas);
					self.productorPolizasColectivas = undefined;
				}

			}

		};

		this.editarProductor = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				for (var i = 0; i < self.productores.length; i++) {
					if (self.productores[i].numeroRifUsuario == elemt.numeroRifUsuario) {
						self.productor = self.productores[i];
						console.log(self.productor);
						self.productores.splice(i, 1);
						break;
					}
				};
			}
			if (self.views.agregarPolizasColectivas) {
				for (var i = 0; i < self.productoresPolizasColectivas.length; i++) {
					if (self.productoresPolizasColectivas[i].numeroRifUsuario == elemt.numeroRifUsuario) {
						self.productorPolizasColectivas = self.productoresPolizasColectivas[i];
						console.log(self.productorPolizasColectivas);
						self.productoresPolizasColectivas.splice(i, 1);
						break;
					}
				};
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.comisiones.indexOf(elemt);
				self.productor = self.editarPolizasFormulario.comisiones[a];
				console.log(self.productor);
				self.editarPolizasFormulario.comisiones.splice(a, 1);
			}
		};

		this.eliminarProductor = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				for (var i = 0; i < self.productores.length; i++) {
					if (self.productores[i].numeroRifUsuario == elemt.numeroRifUsuario) {
						self.auxNombreDeLista = 'Productor';
						self.auxIndice = i;
						self.mensaje = 'el  productor ' + self.productores[i].nbPrimerNombre + ' ' + self.productores[i].nbPrimerApellido;
						$('.eliminarPolizaModal').modal({
							show: 'true'
						});
						break;
					}
				};
			}
			if (self.views.agregarPolizasColectivas) {
				for (var i = 0; i < self.productoresPolizasColectivas.length; i++) {
					if (self.productoresPolizasColectivas[i].numeroRifUsuario == elemt.numeroRifUsuario) {
						self.auxNombreDeLista = 'Productor';
						self.auxIndice = i;
						self.mensaje = 'el  productor ' + self.productoresPolizasColectivas[i].nbPrimerNombre + ' ' + self.productoresPolizasColectivas[i].nbPrimerApellido;
						$('.eliminarPolizaModal').modal({
							show: 'true'
						});
						break;
					}
				};
			}
			if (self.views.editarPolizasIndividuales) {
				for (var i = 0; i < self.editarPolizasFormulario.comisiones.length; i++) {
					if (self.editarPolizasFormulario.comisiones[i].numeroRifUsuario == elemt.numeroRifUsuario) {
						self.auxNombreDeLista = 'Productor';
						self.auxIndice = i;
						self.mensaje = 'el  productor ' + self.editarPolizasFormulario.comisiones[i].nbPrimerNombre + ' ' + self.editarPolizasFormulario.comisiones[i].nbPrimerApellido;
						$('.eliminarPolizaModal').modal({
							show: 'true'
						});
						break;
					}
				};
			}
			if (self.views.editarPolizasColectivas) {
				self.auxIndice = self.editarPolizasColectivasFormulario.productores.indexOf(elemt);
				self.editarPolizasColectivasFormulario.productores.splice(self.auxIndice, 1);

				self.auxNombreDeLista = 'Productor';
				self.mensaje = 'el  productor';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
		};

		this.buscarProductor = function (identidad) {
			for (var i = 0; i < self.listaProductores.length; i++) {
				if (self.listaProductores[i].nuCedulaRif == identidad) {
					console.log('self.productor', self.listaProductores[i]);
					return self.listaProductores[i];
				}
			};
			return false;
		};

		/*
			funciones para agregar,editar y elminar un ejecutivo de Productor
		*/
		this.agregarEjecutivo = function () {

			if (self.views.agregarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#polizaEjecutivo'));
				var bool = true;
				var comision = 0;
				if (self.ejecutivos.length >= 1) {
					for (var i = 0; i < self.ejecutivos.length; i++) {
						if (self.ejecutivos[i].nombre == self.ejecutivo.nombre) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Ejecutivo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
						comision = comision + parseInt(self.ejecutivos[i].comsionEjecutivo, 10);
					}
				}
				comision = comision + parseInt(self.ejecutivo.comsionEjecutivo, 10);
				if (comision > 100) {
					new PNotify({
						title: 'Error',
						text: 'No se pueden asignar mas comisiones',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (validatorResult && bool) {
					this.ejecutivos.push(self.ejecutivo);
					self.ejecutivo = undefined;
				}
			}
			if (self.views.agregarPolizasColectivas) {
				var validatorResult = validator.checkAll($('#formularioEjecutivoPolizasColectivas'));
				var bool = true;
				var comision = 0;
				if (self.ejecutivosPolizasColectivas.length >= 1) {
					for (var i = 0; i < self.ejecutivosPolizasColectivas.length; i++) {
						if (self.ejecutivosPolizasColectivas[i].nombre == self.ejecutivoPolizasColectivas.nombre) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Ejecutivo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
						comision = comision + parseInt(self.ejecutivosPolizasColectivas[i].comsionEjecutivo, 10);
					}
				}

				comision = comision + parseInt(self.ejecutivoPolizasColectivas.comsionEjecutivo, 10);
				if (comision > 100) {
					new PNotify({
						title: 'Error',
						text: 'No se pueden asignar mas comisiones',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (validatorResult && bool) {
					this.ejecutivosPolizasColectivas.push(self.ejecutivoPolizasColectivas);
					self.ejecutivoPolizasColectivas = undefined;
				}
			}
			if (self.views.editarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#editarPolizaEjecutivo'));
				var bool = true;
				var comision = 0;
				if (self.editarPolizasFormulario.ejecutivos.length >= 1) {
					for (var i = 0; i < self.editarPolizasFormulario.ejecutivos.length; i++) {
						if (self.editarPolizasFormulario.ejecutivos[i].nombre == self.ejecutivo.nombre) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe ese Ejecutivo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
						}
						comision = comision + parseInt(self.editarPolizasFormulario.ejecutivos[i].comsionEjecutivo, 10);
					}
				}
				comision = comision + parseInt(self.ejecutivo.comsionEjecutivo, 10);
				if (comision > 100) {
					new PNotify({
						title: 'Error',
						text: 'No se pueden asignar mas comisiones',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (validatorResult && bool) {
					this.editarPolizasFormulario.ejecutivos.push(self.ejecutivo);
					self.ejecutivo = undefined;
				}
			}
		};

		this.editarEjecutivo = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				var a = this.ejecutivos.indexOf(elemt);
				self.ejecutivo = this.ejecutivos[a];
				this.ejecutivos.splice(a, 1);
			}
			if (self.views.agregarPolizasColectivas) {
				var a = this.ejecutivosPolizasColectivas.indexOf(elemt);
				self.ejecutivoPolizasColectivas = this.ejecutivosPolizasColectivas[a];
				this.ejecutivosPolizasColectivas.splice(a, 1);
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.ejecutivos.indexOf(elemt);
				self.ejecutivo = self.editarPolizasFormulario.ejecutivos[a];
				self.editarPolizasFormulario.ejecutivos.splice(a, 1);
			}
		};

		this.eliminarEjecutivo = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				self.auxIndice = this.ejecutivos.indexOf(elemt);
				this.ejecutivos.splice(self.auxIndice, 1);

				self.auxNombreDeLista = 'Ejecutivo';
				self.mensaje = 'el  ejecutivo';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
			if (self.views.agregarPolizasColectivas) {
				self.auxIndice = this.ejecutivosPolizasColectivas.indexOf(elemt);
				this.ejecutivosPolizasColectivas.splice(self.auxIndice, 1);

				self.auxNombreDeLista = 'Ejecutivo';
				self.mensaje = 'el  ejecutivo';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
			if (self.views.editarPolizasIndividuales) {
				self.auxIndice = self.editarPolizasFormulario.ejecutivos.indexOf(elemt);
				self.editarPolizasFormulario.ejecutivos.splice(self.auxIndice, 1);

				self.auxNombreDeLista = 'Ejecutivo';
				self.mensaje = 'el  ejecutivo';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
			}
		};
		/*
					funciones para agregar,editar y elminar un ejecutivo de Asegurado Adicional
		*/
		this.agregarAdicional = function () {
			var bool = true;
			if (self.adicional.nbNombreCompleto == undefined || self.adicional.nbNombreCompleto == '') {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un nombre',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.adicional.nuCedulaRif == undefined || self.adicional.nuCedulaRif == '' || (self.adicional.nuCedulaRif.substring(0, 1) != "V" && self.adicional.nuCedulaRif.substring(0, 1) != "E")) && bool) {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un documento de identidad o este es invalido',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.adicional.inSexo == undefined || self.adicional.inSexo == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No seleciono un sexo',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.adicional.feNacimiento == undefined || self.adicional.feNacimiento == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No selecciono una fecha de Nacimiento',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.adicional.nbParentesco == undefined || self.adicional.nbParentesco == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un parentesco',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if (self.adicionales.length > 0) {
				for (var i = 0; i < self.adicionales.length; i++) {
					console.log(self.adicionales);
					if (self.adicionales[i].nuCedulaRif == self.adicional.nuCedulaRif || self.adicionales[i].nbNombreCompleto == self.adicional.nbNombreCompleto) {
						new PNotify({
							title: 'Error',
							text: 'Ya existe el asegurado',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
						bool = false;
						break;
					}
				}
			}
			if (bool) {
				if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
					self.adicional.id = 0;
					self.adicionales.push(self.adicional);
					self.adicional = undefined;
				}
				if (self.views.editarPolizasIndividuales) {
					self.adicional.accion = null;
					self.adicional.estatus = 1;
					if(self.adicional.id == undefined)
						self.adicional.id = 0;

					self.editarPolizasFormulario.adicionales.push(self.adicional);
					self.adicional = undefined;
				}
			}
		};

		this.editarAdicional = function (elemt) {
			if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
				var a = this.adicionales.indexOf(elemt);
				self.adicional = this.adicionales[a];
				this.adicionales.splice(a, 1);
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.adicionales.indexOf(elemt);
				self.adicional = self.editarPolizasFormulario.adicionales[a];
				self.editarPolizasFormulario.adicionales.splice(a, 1);
			}
		};

		this.eliminarAdicional = function (elemt) {
			if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
				self.auxIndice = this.adicionales.indexOf(elemt);
				self.auxNombreDeLista = 'Adicional';
				self.mensaje = 'el  adicional';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});

			}
			if (self.views.editarPolizasIndividuales) {
				self.auxIndice = self.editarPolizasFormulario.adicionales.indexOf(elemt);
				self.auxNombreDeLista = 'Adicional';
				self.mensaje = 'el  adicional';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});

			}
		};

		/*
					funciones para agregar,editar y elminar un ejecutivo de Asegurado Adicional
		*/
		this.agregarBeneficiario = function () {

			console.log('self.beneficiario', self.beneficiario);

			var bool = true;
			if (self.beneficiario.nbNombreCompleto == undefined || self.beneficiario.nbNombreCompleto == '') {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un nombre',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.beneficiario.nuCedulaRif == undefined || self.beneficiario.nuCedulaRif == '' || (self.beneficiario.nuCedulaRif.substring(0, 1) != 'V' && self.beneficiario.nuCedulaRif.substring(0, 1) != 'E')) && bool) {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un documento de identidad o este es invalido',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.beneficiario.inSexo == undefined || self.beneficiario.inSexo == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No seleciono un sexo',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.beneficiario.feNacimiento == undefined || self.beneficiario.feNacimiento == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No selecciono una fecha de Nacimiento',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if ((self.beneficiario.nbParentesco == undefined || self.beneficiario.nbParentesco == '') && bool) {
				new PNotify({
					title: 'Error',
					text: 'No introdujo un parentesco',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
				bool = false;
			}
			if (self.beneficiarios.length > 0) {
				for (var i = 0; i < self.beneficiarios.length; i++) {
					if (self.beneficiarios[i].nuCedulaRif == self.beneficiario.nuCedulaRif || self.beneficiarios[i].nbNombreCompleto == self.beneficiario.nbNombreCompleto) {
						new PNotify({
							title: 'Error',
							text: 'Ya existe el beneficiario',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
						bool = false;
						break;
					}
				}
			}
			if (bool) {
				if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
					self.beneficiario.id = 0;
					self.beneficiarios.push(self.beneficiario);
					self.beneficiario = undefined;
				}
				if (self.views.editarPolizasIndividuales) {
					self.beneficiario.accion = null;
					self.beneficiario.estatus = 1;
					if(self.beneficiario.id == undefined)
						self.beneficiario.id = 0;

					self.editarPolizasFormulario.beneficiarios.push(self.beneficiario);
					self.beneficiario = undefined;
				}
			}
			console.log('self.beneficiarios', self.beneficiarios);
		};

		this.editarBeneficiario = function (elemt) {
			if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
				var a = this.beneficiarios.indexOf(elemt);
				self.beneficiario = this.beneficiarios[a];
				this.beneficiarios.splice(a, 1);
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.beneficiarios.indexOf(elemt);
				self.beneficiario = self.editarPolizasFormulario.beneficiarios[a];
				self.editarPolizasFormulario.beneficiarios.splice(a, 1);
			}
		};

		this.eliminarBeneficiario = function (elemt) {
			if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
				self.auxNombreDeLista = 'Beneficiario';
				self.mensaje = 'el  beneficiario';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = this.beneficiarios.indexOf(elemt);
			}
			if (self.views.editarPolizasIndividuales) {
				self.auxNombreDeLista = 'Beneficiario';
				self.mensaje = 'el  beneficiario';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = self.editarPolizasFormulario.beneficiarios.indexOf(elemt);
			}
		};

		/*
			funciones para agregar,editar y elminar un contragarante
		*/
		this.agregarContragarante = function () {

			if (self.views.agregarPolizasIndividuales) {
				var bool = true;
				var validatorResult = validator.checkAll($('#contragarantesPolizasIndividuales'));
				if (validatorResult) {
					if (self.contragarantes.length > 0 && bool) {
						for (var i = 0; i < self.contragarantes.length; i++) {
							if (self.contragarantes[i].documento == self.contragarante.documento) {
								new PNotify({
									title: 'Error',
									text: 'Ya existe un contragarante con ese documento de identidad',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								bool = false;
								break;
							}
						}
					}
					if (bool) {
						self.contragarantes.push(self.contragarante);
						self.contragarante = undefined;

					}
				}
			}
			if (self.views.agregarPolizasColectivas) {
				var bool = true;
				if (self.contragarantePolizasColectivas.nombre == undefined || self.contragarantePolizasColectivas.nombre == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un nombre',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.contragarantePolizasColectivas.documento == undefined || self.contragarantePolizasColectivas.documento == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un documento de identidad',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.contragarantesPolizasColectivas.length > 0 && bool) {
					for (var i = 0; i < self.contragarantesPolizasColectivas.length; i++) {
						if (self.contragarantesPolizasColectivas[i].documento == self.contragarantePolizasColectivas.documento) {
							new PNotify({
								title: 'Error',
								text: 'Ya existe un contragarante con ese documento de identidad',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
							break;
						}
					}
				}
				if (bool) {
					self.contragarantesPolizasColectivas.push(self.contragarantePolizasColectivas);
					self.contragarantePolizasColectivas = undefined;
				}
			}
			if (self.views.editarPolizasIndividuales) {
				var bool = true;
				var validatorResult = validator.checkAll($('#editarContragarantesPolizasIndividuales'));
				if (validatorResult) {
					if (self.editarPolizasFormulario.contragarantes.length > 0 && bool) {
						for (var i = 0; i < self.contragarantes.length; i++) {
							if (self.editarPolizasFormulario.contragarantes[i].documento == self.contragarante.documento) {
								new PNotify({
									title: 'Error',
									text: 'Ya existe un contragarante con ese documento de identidad',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								bool = false;
								break;
							}
						}
					}
					if (bool) {
						self.editarPolizasFormulario.contragarantes.push(self.contragarante);
						self.contragarante = undefined;
					}
				}
			}
		};

		this.editarContragarante = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				var a = this.contragarantes.indexOf(elemt);
				self.contragarante = this.contragarantes[a];
				this.contragarantes.splice(a, 1);
			}
			if (self.views.agregarPolizasColectivas) {
				var a = this.contragarantesPolizasColectivas.indexOf(elemt);
				self.contragarantePolizasColectivas = this.contragarantesPolizasColectivas[a];
				this.contragarantesPolizasColectivas.splice(a, 1);
			}
			if (self.views.editarPolizasIndividuales) {
				var a = self.editarPolizasFormulario.contragarantes.indexOf(elemt);
				self.contragarante = self.editarPolizasFormulario.contragarantes[a];
				self.editarPolizasFormulario.contragarantes.splice(a, 1);
			}
		};

		this.eliminarContragarante = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				self.auxNombreDeLista = 'Contragarante';
				self.mensaje = 'el  contragarante';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = this.contragarantes.indexOf(elemt);
			}
			if (self.views.agregarPolizasColectivas) {
				self.auxNombreDeLista = 'Contragarante';
				self.mensaje = 'el  contragarante';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = this.contragarantesPolizasColectivas.indexOf(elemt);
			}
			if (self.views.editarPolizasIndividuales) {
				self.auxNombreDeLista = 'Contragarante';
				self.mensaje = 'el  contragarante';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = self.editarPolizasFormulario.contragarantes.indexOf(elemt);
			}
		};

		/*
			funciones para agregar,editar y elminar una Fianza
		*/
		this.agregarFianza = function () {
			if (self.views.agregarPolizasIndividuales) {
				var bool = true;
				if (self.fianza.tipo == undefined || self.fianza.tipo == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un tipo de fianza',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.fianza.monto == undefined || self.fianza.monto == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un monto ',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.fianzas.length > 0 && bool) {
					for (var i = 0; i < self.fianzas.length; i++) {
						if (self.fianzas[i].tipo == self.fianza.tipo && self.fianza.tipo != 'Otros') {
							new PNotify({
								title: 'Error',
								text: 'Ya existe una fianza de ese tipo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
							break;
						}
					}
				}
				if (bool) {
					self.fianzas.push(self.fianza);
					self.fianza = undefined;
				}
			}
			if (self.views.agregarPolizasColectivas) {
				var bool = true;
				if (self.fianzaPolizasColectivas.tipo == undefined || self.fianzaPolizasColectivas.tipo == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un tipo de fianza',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.fianzaPolizasColectivas.monto == undefined || self.fianzaPolizasColectivas.monto == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un monto ',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.fianzasPolizasColectivas.length > 0 && bool) {
					for (var i = 0; i < self.fianzasPolizasColectivas.length; i++) {
						if (self.fianzasPolizasColectivas[i].tipo == self.fianzaPolizasColectivas.tipo && self.fianzaPolizasColectivas.tipo != 'Otros') {
							new PNotify({
								title: 'Error',
								text: 'Ya existe una fianza de ese tipo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
							break;
						}
					}
				}
				if (bool) {
					self.fianzasPolizasColectivas.push(self.fianzaPolizasColectivas);
					self.fianzaPolizasColectivas = undefined;
				}
			}
			if (self.views.editarPolizasIndividuales) {
				var bool = true;
				if (self.fianza.tipo == undefined || self.fianza.tipo == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un tipo de fianza',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.fianza.monto == undefined || self.fianza.monto == '') {
					new PNotify({
						title: 'Error',
						text: 'No introdujo un monto ',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
					bool = false;
				}
				if (self.editarPolizasFormulario.fianzas.length > 0 && bool) {
					for (var i = 0; i < self.editarPolizasFormulario.fianzas.length; i++) {
						if (self.editarPolizasFormulario.fianzas[i].tipo == self.fianza.tipo && self.fianza.tipo != 'Otros') {
							new PNotify({
								title: 'Error',
								text: 'Ya existe una fianza de ese tipo',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false;
							break;
						}
					}
				}
				if (bool) {
					self.editarPolizasFormulario.fianzas.push(self.fianza);
					self.fianza = undefined;
				}
			}
		};

		this.editarFianza = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				var a = this.fianzas.indexOf(elemt);
				self.fianza = this.fianzas[a];
				this.fianzas.splice(a, 1);
			}
			if (self.views.agregarPolizasColectivas) {
				var a = this.fianzasPolizasColectivas.indexOf(elemt);
				self.fianzaPolizasColectivas = this.fianzasPolizasColectivas[a];
				this.fianzasPolizasColectivas.splice(a, 1);
			}
			if (self.views.agregarPolieditarPolizasIndividualeszasIndividuales) {
				var a = self.editarPolizasFormulario.fianzas.indexOf(elemt);
				self.fianza = self.editarPolizasFormulario.fianzas[a];
				self.editarPolizasFormulario.fianzas.splice(a, 1);
			}
		};

		this.eliminarFianza = function (elemt) {
			if (self.views.agregarPolizasIndividuales) {
				self.auxNombreDeLista = 'Fianza';
				self.mensaje = 'la  Fianza';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = this.fianzas.indexOf(elemt);
			}
			if (self.views.agregarPolizasColectivas) {
				self.auxNombreDeLista = 'Fianza';
				self.mensaje = 'la  Fianza';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = this.fianzas.indexOf(elemt);
			}
			if (self.views.editarPolizasIndividuales) {
				self.auxNombreDeLista = 'Fianza';
				self.mensaje = 'la  Fianza';
				$('.eliminarPolizaModal').modal({
					show: 'true'
				});
				self.auxIndice = self.editarPolizasFormulario.fianzas.indexOf(elemt);
			}
		};

		/*
		  Modal para confirmacion de eliminacion
		*/
		this.eliminarModal = function (opcion) {
			switch (opcion) {
				case 'aceptar':
					//CALL SERVICE
					$('.modal-backdrop').remove();
					console.log(self.auxNombreDeLista);
					switch (self.auxNombreDeLista) {
						case 'Poliza':
							if (self.views.listarPolizasIndividuales) {
								$('#tablaConsultarPolizasIndividuales').DataTable().row('.choosed').remove().draw(false);
								self.listaPolizasIndividuales.splice(self.auxIndice, 1);
							} else {
								$('#tablaConsultarPolizasColectivas').DataTable().row('.choosed').remove().draw(false);
								self.listaPolizasColectivas.splice(self.auxIndice, 1);
							}
							break;
						case 'Cobertura':
							if (self.views.agregarPolizasIndividuales) {
								self.listaCoberturas.splice(self.auxIndice, 1);
							}
							if (self.views.agregarPolizasCertificado) {
								self.listaCoberturasPolizasColectivas.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								if (self.editarPolizasFormulario.coberturas[self.auxIndice].id != undefined)
									self.editarPolizasFormulario.coberturas[self.auxIndice].accion = 'D';
								else
									self.editarPolizasFormulario.coberturas.splice(self.auxIndice, 1);
							}
							break;
						case 'Adicional':
							if (self.views.agregarPolizasIndividuales || self.views.agregarPolizasCertificado) {
								self.adicionales.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								if (self.editarPolizasFormulario.adicionales[self.auxIndice].estatus != 1)
									self.editarPolizasFormulario.adicionales[self.auxIndice].accion = 'D';
								else
									self.editarPolizasFormulario.adicionales.splice(self.auxIndice, 1);
								console.log(self.editarPolizasFormulario.adicionales);
							}
							break;
						case 'Beneficiario':
							if (self.views.agregarPolizasIndividuales ||self.views.agregarPolizasCertificado) {
								self.beneficiarios.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								if (self.editarPolizasFormulario.beneficiarios[self.auxIndice].estatus != 1)
									self.editarPolizasFormulario.beneficiarios[self.auxIndice].accion = 'D';
								else
									self.editarPolizasFormulario.beneficiarios.splice(self.auxIndice, 1);
								console.log(self.editarPolizasFormulario.beneficiarios);
							}
							break;
						case 'Contragarante':
							if (self.views.agregarPolizasIndividuales) {
								self.contragarantes.splice(self.auxIndice, 1);
							}
							if (self.views.agregarPolizasColectivas) {
								self.contragarantesPolizasColectivas.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								self.auxIndice = self.editarPolizasFormulario.contragarantes.splice(self.auxIndice, 1);
							}
							break;
						case 'Fianza':
							if (self.views.agregarPolizasIndividuales) {
								self.fianzas.splice(self.auxIndice, 1);
							}
							if (self.views.agregarPolizasColectivas) {
								self.fianzasPolizasColectivas.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								self.editarPolizasFormulario.fianzas.splice(self.auxIndice, 1);
							}
							break;
						case 'Productor':
							if (self.views.agregarPolizasIndividuales) {
								self.productores.splice(self.auxIndice, 1);
							}
							if (self.views.agregarPolizasColectivas) {
								self.productoresPolizasColectivas.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								if (self.editarPolizasFormulario.comisiones[self.auxIndice].id != undefined)
									self.editarPolizasFormulario.comisiones[self.auxIndice].accion = 'D';
								else
									self.editarPolizasFormulario.comisiones.splice(self.auxIndice, 1);
								console.log(self.editarPolizasFormulario.comisiones);
							}
							break;
						case 'Ejecutivo':
							if (self.views.agregarPolizasIndividuales) {
								self.ejecutivos.splice(self.auxIndice, 1);
							}
							if (self.views.agregarPolizasColectivas) {
								self.ejecutivosPolizasColectivas.splice(self.auxIndice, 1);
							}
							if (self.views.editarPolizasIndividuales) {
								self.editarPolizasFormulario.ejecutivos.splice(self.auxIndice, 1);
							}
							break;
						default:
							break;

					}
					new PNotify({
						title: '¡' + self.mensaje + ' eliminado!',
						text: self.mensaje + ' fue eliminada con éxito.',
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

		this.listarPolizasIndividuales = function () {
			polizaServices.consultarPolizas()
				.success(function (data) {
					console.log('consultarPolizas', data);
					self.listaPolizasIndividuales = data;
					for (var i = 0; i < self.listaPolizasIndividuales.length; i++) {
						self.listaPolizasIndividuales[i].recibos = [];
						switch (self.listaPolizasIndividuales[i].coRamo) {
							case 'AUT':
								self.listaPolizasIndividuales[i].nbramo = 'Automovil';
								break;
							case 'PAT':
								self.listaPolizasIndividuales[i].nbramo = 'Patrimonial'
								break;
							case 'PER':
								self.listaPolizasIndividuales[i].nbramo = 'Persona'
								break;
						};
					}
					if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasIndividuales')) {
						self.createTablePolizasIndividual();
					} else {
						self.destroyTablePolizaIndividual();
					}
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
					if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasIndividuales')) {
						self.createTablePolizasIndividual();
					} else {
						self.destroyTablePolizaIndividual();
					}
				});
		};

		this.listarPolizasColectivas = function () {

			var params = {
				nroPoliza: ''
			};

			polizaServices.consultarPolizasCertificados(params)
				.success(function (data) {
					console.log('consultarPolizas', data);
					self.listaPolizasColectivas = data;
					for (var i = 0; i < self.listaPolizasColectivas.length; i++) {
						self.listaPolizasColectivas[i].recibos = [];
						switch (self.listaPolizasColectivas[i].coRamo) {
							case 'AUT':
								self.listaPolizasColectivas[i].nbramo = 'Automovil';
								break;
							case 'PAT':
								self.listaPolizasColectivas[i].nbramo = 'Patrimonial'
								break;
							case 'PER':
								self.listaPolizasColectivas[i].nbramo = 'Persona'
								break;
						};
              			self.listaPolizasColectivas[i].isGlobal == 1? self.listaPolizasColectivas[i].global = 'Si':self.listaPolizasColectivas[i].global = 'No';
					}
					if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasColectivas')) {
						self.createTablePolizaColectiva();
					} else {
						self.destroyTablePolizaColectiva();
					}
					data = undefined;
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
					if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasColectivas')) {
						self.createTablePolizaColectiva();
					} else {
						self.destroyTablePolizaColectiva();
					}
				});
		};

		/**
		**funcion para obtener las lista de cuentas bancarias que se enviaran en el
		** en el reporte de emision
		*/
		this.obtenerCuentasAseguradora=function(rif_aseguradora){
			console.log('obtener cuentas aseguradora');
			var param={
				'rifAseguradora':rif_aseguradora,
				'rifEmpresa':mainServices.getRifEmpresa()
			};
       aseguradoraServices.consultarContactos(param)
			 .success(function (data) {
         //self.ListaCuentasAseguradora=data.cuentas;

				 for(var i=0;i< data.cuentas.length;i++){
					 self.ListaCuentasAseguradora.push({
               'nuCuenta':data.cuentas[i].nuCuenta,
							 'tipoCuenta':data.cuentas[i].tipoCuenta?'Ahorro':'Corriente',
							 'nbCuenta':self.buscarNombreBanco(data.cuentas[i].idBanco)
						 }
					 );
				 }

			 }).error(function (data, status, headers, config) {

			 });

		}

		/*
			funciones para Consultar, editar y elminar una Poliza Individual
		*/
		this.constalPolizasService = function (model) {
			polizaServices.consultarDetallePolizas(self.editarPolizasFormulario)
				.success(function (data) {
					self.editarPolizasFormulario.adicionales = [];
					self.editarPolizasFormulario.beneficiarios = [];
					self.editarPolizasFormulario.comisiones = [];
					self.editarPolizasFormulario.recibos = [];
					self.editarPolizasFormulario.tiposCoberturas = undefined;
					self.editarPolizasFormulario.coberturas = [];
					console.log(model, data);
					self.editarPolizasFormulario.nbAsegurado = data[0].nbAsegurado;
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							for(var i = 0; i< data[0].coberturas.length; i++){
								self.editarPolizasFormulario.coberturas.push(data[0].coberturas[i]);
								self.editarPolizasFormulario.coberturas[i].sumaAsegurada = mainServices.setCurrency(self.editarPolizasFormulario.coberturas[i].sumaAsegurada);
							};
						}
					}
					//se llena adicionales
					if (data[0].adicionales != null) {
						if (data[0].adicionales.length > 0) {
							self.editarPolizasFormulario.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.editarPolizasFormulario.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
							self.editarPolizasFormulario.comisiones = JSON.parse(JSON.stringify(data[0].comisiones));
						}
					}
					//se llena recibos solo del primero
					if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.editarPolizasFormulario.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					}
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.editarPolizasFormulario.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
					}
					// SE AGREGAN LO DETALLES D LA POLIZA
					console.log(model, self.editarPolizasFormulario);
					$('.' + model).modal({
						show: 'true'
					});
					data = undefined;
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

		this.consultarPolizas = function () {
			console.log('consultarPolizas1');
			if (self.views.listarPolizasIndividuales) {
				self.constalPolizasService('modalPolizaInidividual');

				self.opcionPoliza = undefined;
			}
			if (self.views.listarPolizasColectivas) {

				self.constalPolizasService('consultarPolizaColectivas');

			}

		};

		this.editarPolizas = function () {
			//self.opcionPoliza = self.editarPolizasFormulario.opcionPoliza;
			self.getListOfValues();

			polizaServices.consultarDetallePolizas(self.editarPolizasFormulario)
				.success(function (data) {
					self.editarPolizasFormulario.adicionales = [];
					self.editarPolizasFormulario.beneficiarios = [];
					self.editarPolizasFormulario.comisiones = [];
					self.editarPolizasFormulario.recibos = [];
					self.editarPolizasFormulario.tiposCoberturas = undefined;
					self.editarPolizasFormulario.coberturas = [];
					self.editarPolizasFormulario.nbAsegurado = data[0].nbAsegurado;
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							for (var i = 0; i < data[0].coberturas.length; i++) {
								self.editarPolizasFormulario.coberturas.push({
									id: data[0].coberturas[i].id,
									idCobertura: data[0].coberturas[i].idCobertura,
									nuPoliza: data[0].numeroPoliza,
									nuCertificado: data[0].numeroCertificado == 'null' ? '0' : data[0].numeroCertificado,
									nombre: data[0].coberturas[i].nbCobertura,
									tipo: data[0].coberturas[i].tipoCobertura == 'B'? 'Básica':'Opcional',//CAMBIAR
									sumaAsegurada: data[0].coberturas[i].sumaAsegurada,
									estatus: 1,
									accion: data[0].coberturas[i].accion
								});
							}
						}
					}
					//se llena adicionales
					if (data[0].adicionales != null) {
						if (data[0].adicionales.length > 0) {
							self.editarPolizasFormulario.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.editarPolizasFormulario.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
							for (var i = 0; i < data[0].comisiones.length; i++) {
								var prod = self.buscarProductor(data[0].comisiones[i].numeroRifUsuario);
								self.editarPolizasFormulario.comisiones.push({
									id: data[0].comisiones[i].id,
									nbPrimerNombre: prod.nbPrimerNombre,
									nbPrimerApellido: prod.nbPrimerApellido,
									numeroRifUsuario: data[0].comisiones[i].numeroRifUsuario,
									numeroPoliza: data[0].numeroPoliza,
									nombreUsuarioApp: prod.nbUsuarioApp,
									nbNombreCompleto: prod.nbPrimerNombre + ' ' + prod.nbSegundoNombre + ' ' + prod.nbPrimerApellido + ' ' + prod.nbSegundoApellido,
									coRamo: data[0].coRamo,
									nuRifEmpresa: mainServices.getRifEmpresa(),
									accion: null,
								});
							}
						}
					}
					//se llena recibos solo del primero
					if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.editarPolizasFormulario.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					}
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.editarPolizasFormulario.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
					}
					self.viewsController('editarPolizasIndividuales');
					switch (data[0].coRamo) {
						case 'AUT':
							if(self.polizaCertificado || self.polizasIndividual){
								self.editarPolizasFormulario.vehiculo = self.editarPolizasFormulario.tiposCoberturas;
								self.editarPolizasFormulario.tiposCoberturas.txColor == 'null'? self.editarPolizasFormulario.tiposCoberturas.txColor = '' : self.editarPolizasFormulario.tiposCoberturas.txColor;
								self.editarPolizasFormulario.tiposCoberturas.serialMotor == 'null'? self.editarPolizasFormulario.tiposCoberturas.serialMotor ='' : self.editarPolizasFormulario.tiposCoberturas.serialMotor;
								self.editarPolizasFormulario.tiposCoberturas.serialCarroceria == 'null'? self.editarPolizasFormulario.tiposCoberturas.serialCarroceria ='' : self.editarPolizasFormulario.tiposCoberturas.serialCarroceria;
								self.editarPolizasFormulario.tiposCoberturas.nuPasajeros == 'null'? self.editarPolizasFormulario.tiposCoberturas.nuPasajeros ='' : self.editarPolizasFormulario.tiposCoberturas.nuPasajeros;
								self.editarPolizasFormulario.tiposCoberturas.capCarga == 'null'? self.editarPolizasFormulario.tiposCoberturas.capCarga ='' : self.editarPolizasFormulario.tiposCoberturas.capCarga;
								self.editarPolizasFormulario.tiposCoberturas.lugarUso == 'null'? self.editarPolizasFormulario.tiposCoberturas.lugarUso ='' : self.editarPolizasFormulario.tiposCoberturas.lugarUso;
								self.editarPolizasFormulario.tiposCoberturas.idTipoVehiculo == 'null'? self.editarPolizasFormulario.tiposCoberturas.idTipoVehiculo ='' : self.editarPolizasFormulario.tiposCoberturas.idTipoVehiculo;
								self.editarPolizasFormulario.tiposCoberturas.condNombre == 'null'? self.editarPolizasFormulario.tiposCoberturas.condNombre ='' : self.editarPolizasFormulario.tiposCoberturas.condNombre;
								if(self.editarPolizasFormulario.vehiculo.ciRifCond !=  'null'){
									self.editarPolizasFormulario.vehiculo.tipoDocumentoV = self.editarPolizasFormulario.vehiculo.ciRifCond.substring(0, 1);
									self.editarPolizasFormulario.vehiculo.ciRifCond = self.editarPolizasFormulario.vehiculo.ciRifCond.substring(2, self.editarPolizasFormulario.vehiculo.ciRifCond.length);
								}else{
									self.editarPolizasFormulario.vehiculo.ciRifCond = '';
								}
								self.editarPolizasFormulario.vehiculo.idMarca  = parseInt(self.editarPolizasFormulario.tiposCoberturas.idMarca);
								self.editarPolizasFormulario.vehiculo.idModeloVehiculo = parseInt(self.editarPolizasFormulario.tiposCoberturas.idModelo);
								self.consultarMarcas();
							}
							break;
						default:
							break;
					};
					// SE AGREGAN LO DETALLES D LA POLIZA
					console.log('data', self.editarPolizasFormulario);
					self.opcionPoliza = data[0].opcionRamo;
					if (!self.views.listarPolizasColectivas) {
						self.consultarCoberturasService();
					}


					data = undefined;
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

		this.eliminarPolizas = function (elemt) {

			console.log('preparando para eliminar');

			/*var a = self.listaPolizasIndividuales[this.auxIndice]; */
			self.auxNombreDeLista = 'Poliza';
			self.mensaje = 'la Poliza ';
			$('.eliminarPolizaModal').modal({
				show: 'true'
			});
			if (self.views.listarPolizasIndividuales) {
				this.auxIndice = self.listaPolizasIndividuales.indexOf(elemt);
			} else {
				this.auxIndice = self.listaPolizasColectivas.indexOf(elemt);
			}

		};

		/*
			funciones para Consultar, editar y elminar un Certificado
		*/

		this.consultarCertificados = function () {
			polizaServices.consultarDetallePolizas(self.editarFormularioCertificados)
				.success(function (data) {
					self.editarFormularioCertificados.adicionales = [];
					self.editarFormularioCertificados.beneficiarios = [];
					self.editarFormularioCertificados.comisiones = [];
					self.editarFormularioCertificados.recibos = [];
					self.editarFormularioCertificados.tiposCoberturas = undefined;
					self.editarFormularioCertificados.coberturas = [];
					console.log('model', data);
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							for(var i = 0; i< data[0].coberturas.length ; i++){
								self.editarFormularioCertificados.coberturas.push(data[0].coberturas[i]);
								self.editarFormularioCertificados.coberturas[i].sumaAsegurada = mainServices.setCurrency(self.editarFormularioCertificados.coberturas[i].sumaAsegurada );
							};
							self.editarFormularioCertificados.coberturas = JSON.parse(JSON.stringify(data[0].coberturas));
						}
					}
					//se llena adicionales
					if (data[0].adicionales != null) {
						if (data[0].adicionales.length > 0) {
							self.editarFormularioCertificados.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.editarFormularioCertificados.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
							self.editarFormularioCertificados.comisiones = JSON.parse(JSON.stringify(data[0].comisiones));
						}
					}
					//se llena recibos solo del primero
					if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.editarFormularioCertificados.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					}
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.editarFormularioCertificados.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
					}
					// SE AGREGAN LO DETALLES D LA POLIZA
					console.log('model', self.editarFormularioCertificados);
					$('.consultarCertificadosPolizaColectivas').modal({
						show: 'true'
					});
					data = undefined;
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

		this.editarCertificados = function (elemt) {
			/* 		if(self.views.listarPolizasIndividuales){
						self.aux = self.listaPolizasIndividuales.indexOf(elemt);
						self.editarPolizasFormulario =  JSON.parse(JSON.stringify (self.listaPolizasIndividuales[self.aux]) );
						self.opcionPoliza =	self.editarPolizasFormulario.opcionPoliza;
						self.tipoPolizaSwitch();
						this.viewsController('editarPolizasIndividuales');
					} */
			var a = self.listaPolizasColectivas[self.auxIndice].ListaCertificados.indexOf(elemt);
			self.editarFormularioCertificados = JSON.parse(JSON.stringify(self.listaPolizasColectivas[self.auxIndice].ListaCertificados[a]));
			console.log(self.editarFormularioCertificados);
			self.setObjectElems(self.tipoCertificado, false);
			switch (self.listaPolizasColectivas[self.auxIndice].opcionPoliza) {
				case 'Vehiculos':
					self.tipoCertificado.vehiculo = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					break;
				case 'Vida':
					self.tipoCertificado.vida = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.Beneficiarios = true;
					self.tipoCertificado.productor = true;
					console.log('** on vida.**');
					break;
				case 'Accidentes':
					self.tipoCertificado.accidentes = true;
					self.tipoCertificado.Beneficiarios = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on accidentes.**');
					break;
				case 'Funerarios':
					self.tipoCertificado.funeraria = true;
					self.tipoCertificado.Cobertura = true;
					self.tipoCertificado.Adicionales = true;
					self.tipoCertificado.Beneficiarios = true;
					self.tipoCertificado.productor = true;
					console.log('** on funeraria.**');
					break;
				case 'Salud':
					self.tipoCertificado.Adicionales = true;
					self.tipoCertificado.Salud = true;
					self.tipoCertificado.cobertura = true;
					/*  self.tipoCertificado.Beneficiarios = true; */
					self.tipoCertificado.productor = true;
					console.log('** on Salud.**');
					break;
				case 'Fianza':
					/*self.tipoCertificado.Fianza = true;*/
					self.tipoCertificado.contrato = true;
					self.tipoCertificado.contragarante = true;
					self.tipoCertificado.polizaDatosFianza = true;
					self.tipoCertificado.productor = true;
					console.log('** on Fianza.**');
					break;
				case 'Incendio':
					self.tipoCertificado.incendio = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on Incedio.**');
					break;
				case 'Robo':
					self.tipoCertificado.robo = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on Robo.**');
					break;
				case 'Empresarial':
					self.tipoCertificado.empresarial = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on Empresarial.**');
					break;
				case 'Aviacion':
					self.tipoCertificado.aviacion = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on Aviacion.**');
					break;
				case 'Dinero y Valores':
					self.tipoCertificado.valores = true;
					self.tipoCertificado.cobertura = true;
					self.tipoCertificado.productor = true;
					console.log('** on Dinero y Valores.**');
					break;
				default:
					break;
			}
			self.viewsController('editarPolizasCertificado');
		}

		this.eliminarCertificados = function (elemt) {

			console.log('preparando para eliminar');

			/*var a = self.listaPolizasIndividuales[this.auxIndice]; */
			self.auxNombreDeLista = 'Poliza';
			self.mensaje = 'la Poliza ';
			$('.eliminarPolizaModal').modal({
				show: 'true'
			});
			if (self.views.listarPolizasIndividuales) {
				this.auxIndice = self.listaPolizasIndividuales.indexOf(elemt);
			} else {
				this.auxIndice = self.listaPolizasColectivas.indexOf(elemt);
			}

		};

		/*
			Accion para Crear o Actualizar una Poliza
		*/
		this.guardar = function () {
			var bool = false;
			if (self.views.editarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#editarPolizaDatosGenerales'));
				var validatorVehiculo = validator.checkAll($('#polizasEditarVehiculos'));
				var datosGenerales = $('#editarPolizaDatosGenerales'),
					vistaVehiculos = $('#polizasEditarVehiculos'),
					vistaContratro = $('#editarPolizaDatosContrato'),
					vistaContragarante = $('#editarPolizaDatosContragarante'),
					vistaFianza = $('#editarPolizaDatosFianza'),
					vistaCobertura = $('#editarPolizaCobertura'),
					vistaAdicional = $('#editarPolizaCoberturaAdicionales'),
					vistaProductor = $('#editarPolizaDatosProductor'),
					vistaBeneficiarios = $('#editarPolizaCoberturaBeneficiarios');
				var bool = false;

				if(self.polizasIndividual || self.polizaCertificado){
					if (self.editarPolizasFormulario.coRamo == 'AUT' && !validatorVehiculo) {
						validatorResult = validatorVehiculo;
						new PNotify({
							title: 'Error',
							text: 'Los datos del vehiculo estan incompletos',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					}
				}


				if (validatorResult) {
					var listaVehiculos = [];
					if (self.editarPolizasFormulario.coRamo == 'AUT' && (self.polizasIndividual || self.polizaCertificado)) {
						listaVehiculos.push({
							placa: self.editarPolizasFormulario.vehiculo.placa,
							serialCarroceria: self.editarPolizasFormulario.vehiculo.carroceria,
							serialMotor: self.editarPolizasFormulario.vehiculo.serial,
							txColor: self.editarPolizasFormulario.vehiculo.color,
							nuPasajeros: self.editarPolizasFormulario.vehiculo.pasajeros,
							idTipoVehiculo: self.editarPolizasFormulario.vehiculo.tipo,
							ano: self.editarPolizasFormulario.vehiculo.ano,
							capCarga: self.editarPolizasFormulario.vehiculo.carga,
							idModelo: self.editarPolizasFormulario.vehiculo.idModeloVehiculo,
							lugarUso: self.editarPolizasFormulario.vehiculo.uso,
							condNombre: self.editarPolizasFormulario.vehiculo.conductor,
							ciRifCond: self.editarPolizasFormulario.vehiculo.documento,
							idMarca: self.editarPolizasFormulario.vehiculo.idMarca,
							idVersion: self.editarPolizasFormulario.vehiculo.version
						});
						console.log(listaVehiculos);
					}

					self.agregarPolizaFormulario = {
						numeroPoliza: self.editarPolizasFormulario.numeroPoliza,
						numeroCertificado: self.editarPolizasFormulario.numeroCertificado,
						idTomador: self.editarPolizasFormulario.tipoDocumentoT + '-' + self.editarPolizasFormulario.nuRifAseguradoTomador,
						idAsegurado: self.editarPolizasFormulario.tipoDocumentoAsegurado + '-' + self.editarPolizasFormulario.nuRifAsegurado,
						idAseguradora: self.editarPolizasFormulario.nuRifAseguradora,
						idMoneda: self.editarPolizasFormulario.idMoneda,
						usuario:  self.editarPolizasFormulario.nombreUsuarioApp,
						feInicio:  self.editarPolizasFormulario.feInicio,
						feFin: self.editarPolizasFormulario.feFin,
						feEmision: self.editarPolizasFormulario.feEmision,
						feSubcripcion: self.editarPolizasFormulario.feSubcripcion,
						feVigInicio: self.editarPolizasFormulario.feVigInicio,
						feVigFin: self.editarPolizasFormulario.feVigFin,
						totalPrima: self.editarPolizasFormulario.totalPrima,
						montoDeducible: self.editarPolizasFormulario.montoDeducible,
						coRamo: self.editarPolizasFormulario.coRamo,
						coSubRamo: self.editarPolizasFormulario.opcionRamo,
						tpPoliza: self.editarPolizasFormulario.tipoPoliza,
						idEmpresa: undefined,//Se setea el valor en el servicio
						frecuenciaPago: self.editarPolizasFormulario.idFreqPago,
						coberturas: JSON.parse(JSON.stringify(self.editarPolizasFormulario.coberturas)),
						comisiones: JSON.parse(JSON.stringify(self.editarPolizasFormulario.comisiones)),
						//ejecutivos: JSON.parse(JSON.stringify(self.ejecutivos)),
						beneficiarios: JSON.parse(JSON.stringify(self.editarPolizasFormulario.beneficiarios)),
						adicionales: JSON.parse(JSON.stringify(self.editarPolizasFormulario.adicionales)),
						recibo: [],
						vehiculos: listaVehiculos, //PREGUNTAR A FABIAN
						estatus: 1,
						isGlobal:self.editarPolizasFormulario.isGlobal
					};

					if (self.agregarPolizaFormulario.coberturas.length > 0) {
						for (var i = 0; i < self.agregarPolizaFormulario.coberturas.length; i++) {
							self.agregarPolizaFormulario.coberturas[i].tipo = undefined;
							self.agregarPolizaFormulario.coberturas[i].nombre = undefined;
						}
					}
					console.log(self.agregarPolizaFormulario);
					self.opcionRamo = self.agregarPolizaFormulario.coRamo;
					self.agregarPolizaService('editar');
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaVehiculos.hasClass('in'))
						{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
						if (vistaContratro.hasClass('in'))
						{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaContragarante.hasClass('in'))
						{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaFianza.hasClass('in'))
						{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaCobertura.hasClass('in'))
						{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaAdicional.hasClass('in'))
						{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaProductor.hasClass('in'))
						{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaBeneficiarios.hasClass('in'))
						{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
					}
				}
			}
			if (self.views.agregarPolizasCertificado) {
				var validatorResult = validator.checkAll($('#formularioDatosGeneralesPolizasColectivasCertificados'));
				var validatorResultRecibo = validator.checkAll($('#polizasColectivaCertificadoAgregarReciboFormulario'));
				var validatorVehiculo = validator.checkAll($('#polizaVehiculosColectivas'));
				var datosGenerales = $('#polizaDatosGeneralesColectivasCertifaco'),
					vistaVehiculos = $('#polizaVehiculosColectivas'),
					vistaContratro = $('#polizaDatosContratoPolizasColectivas'),
					vistaContragarante = $('#polizaDatosContragarantePolizasColectivas'),
					vistaFianza = $('#polizaDatosContragarantePolizasColectivas'),
					vistaCobertura = $('#polizaCoberturaPolizasColectivas'),
					vistaAdicional = $('#polizaCoberturaAdicionalesPolizasColectivas'),
					vistaBeneficiarios = $('#polizaCoberturaBeneficiariosPolizasColectivas');
				vistaRecibo = $('#polizasColectivaCertificadoAgregarReciboFormulario');


				if (self.opcionRamo == 'AUT' && !validatorVehiculo) {
					validatorResult = validatorVehiculo;
					new PNotify({
						title: 'Error',
						text: 'Los datos del vehiculo estan incompletos',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}

				if (validatorResult && validatorResultRecibo) {
					var bool = false;
					for (var i = 0; i < self.ListaCertificados.length; i++) {
						console.log(self.ListaCertificados[i]);
						console.log(self.datosGeneralesCertificados.nro_Certificado);
						if (self.ListaCertificados[i].nro_Certificado == self.datosGeneralesCertificados.nro_Certificado) {
							bool = true;
							console.log('repetido 1');
							break;
						}
						else {
							bool = false;
						}
					}
					if (bool) {
						new PNotify({
							title: 'Error',
							text: 'El numero de la Certificado ya exite.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else if (parseFloat(self.datosGeneralesCertificados.prima) < parseFloat(self.recibo.montoRecibo) || parseFloat(self.datosGeneralesCertificados.prima) < parseFloat(self.recibo.comision.montoComision)) {
						if (parseFloat(self.datosGeneralesCertificados.prima) < parseFloat(self.recibo.montoRecibo)) {
							new PNotify({
								title: 'Error',
								text: 'El monto del recibo execede el monto prima de la póliza.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						} else {
							new PNotify({
								title: 'Error',
								text: 'El monto de la comisión execede el monto prima de la póliza.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						}
					} else {


						console.log('//////////////////////////////////', self.opcionRamo);
						if (self.opcionRamo == 'AUT') {
							var listaVehiculos = [];
							listaVehiculos.push({
								placa: self.vehiculo.placa,
								serialCarroceria: self.vehiculo.carroceria,
								serialMotor: self.vehiculo.serial,
								txColor: self.vehiculo.color,
								nuPasajeros: self.vehiculo.pasajeros,
								idTipoVehiculo: self.vehiculo.tipo,
								ano: self.vehiculo.ano,
								capCarga: self.vehiculo.carga,
								idModelo: self.vehiculo.modelo.idModeloVehiculo,
								lugarUso: self.vehiculo.uso,
								condNombre: self.vehiculo.conductor,
								ciRifCond: self.vehiculo.documento,
								idMarca: self.vehiculo.marca.idMarca,
								idVersion: self.vehiculo.version
							});
						}



						if (!self.recibo.poliza) {
							self.recibo.poliza = self.datosGeneralesCertificados.numeroPoliza;
							self.recibo.coRamo = self.opcionRamo;
							self.recibo.nuRifEmpresa = self.recibo.comision.nuRifEmpresa = mainServices.getRifEmpresa();
							self.recibo.comision.id = 0;
							self.recibo.comision.nombreUsuarioApp = mainServices.getUser();
							self.recibo.comision.numeroRecibo = self.recibo.recibo;
							self.recibo.isGlobal = self.datosGeneralesCertificados.isGlobal;
							self.recibo.numeroCertificado = self.datosGeneralesCertificados.nro_Certificado;
							self.recibo.estatusRecibo = 'Pendiente';
							self.recibo.comision.estatus = 'Pendiente';

							if (self.listaCoberturasPolizasColectivas.length > 0) {
								for (var i = 0; i < self.listaCoberturasPolizasColectivas.length; i++) {
									self.listaCoberturasPolizasColectivas[i].tipo = undefined;
									self.listaCoberturasPolizasColectivas[i].nombre = undefined;
								}
							}

							self.agregarPolizaFormulario = {
								numeroPoliza: self.datosGeneralesCertificados.numeroPoliza,
								numeroCertificado: self.datosGeneralesCertificados.nro_Certificado,
								idTomador: self.datosGeneralesCertificados.nuRifTomador,
								idAsegurado: self.tomador.nuCedulaRif,
								idAseguradora: self.datosGeneralesCertificados.nuRifAseguradora,
								idMoneda: self.datosGeneralesCertificados.idMoneda,
								feInicio: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feEmision: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feSubcripcion: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feVigInicio: self.datosGeneralesCertificados.vigenciaDesde,//self.datosGeneralesCertificados.vigenciaDesde,
								feVigFin: self.datosGeneralesCertificados.vigenciaHasta,//self.datosGeneralesCertificados.vigenciaHasta,
								sumaAsegurada: self.datosGeneralesCertificados.sumaAsegurada,
								totalPrima: self.datosGeneralesCertificados.prima,
								montoDeducible: self.datosGeneralesCertificados.montoDeducible,
								coRamo: self.opcionRamo,
								coSubRamo: self.opcionPoliza,
								tpPoliza: 'C',
								idEmpresa: mainServices.getRifEmpresa(),
								frecuenciaPago: self.datosGeneralesCertificados.frequenciaPago,
								estatus: 1,
								coberturas: JSON.parse(JSON.stringify(self.listaCoberturasPolizasColectivas)),
								beneficiarios: JSON.parse(JSON.stringify(self.beneficiarios)),
								adicionales: JSON.parse(JSON.stringify(self.adicionales)),
								recibo: [JSON.parse(JSON.stringify(self.recibo))],
								vehiculos: listaVehiculos,
								isGlobal:self.datosGeneralesCertificados.isGlobal
							};
						} else {
							self.setObjectElems(self.recibo, undefined);
							self.recibo.comision = {
								id: undefined,
								numeroRecibo: undefined,
								montoComision: undefined,
								estatus: undefined,
								fechaPago: undefined,
								fechaCarga: undefined,
								nuRifEmpresa: undefined,
								nombreUsuarioApp: undefined
							};

							self.agregarPolizaFormulario = {
								numeroPoliza: self.datosGeneralesCertificados.numeroPoliza,
								numeroCertificado: self.datosGeneralesCertificados.nro_Certificado,
								idTomador: self.datosGeneralesCertificados.nuRifTomador,
								idAsegurado: self.tomador.nuCedulaRif,
								idAseguradora: self.datosGeneralesCertificados.nuRifAseguradora,
								idMoneda: self.datosGeneralesCertificados.idMoneda,
								feInicio: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feEmision: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feSubcripcion: self.datosGeneralesCertificados.fechaInclusion,//self.datosGeneralesCertificados.fechaInclusion,
								feVigInicio: self.datosGeneralesCertificados.vigenciaDesde,//self.datosGeneralesCertificados.vigenciaDesde,
								feVigFin: self.datosGeneralesCertificados.vigenciaHasta,//self.datosGeneralesCertificados.vigenciaHasta,
								sumaAsegurada: self.datosGeneralesCertificados.sumaAsegurada,
								totalPrima: self.datosGeneralesCertificados.prima,
								montoDeducible: self.datosGeneralesCertificados.montoDeducible,
								coRamo: self.opcionRamo,
								coSubRamo: self.opcionPoliza,
								tpPoliza: 'C',
								idEmpresa: mainServices.getRifEmpresa(),
								frecuenciaPago: self.datosGeneralesCertificados.frequenciaPago,
								estatus: 1,
								coberturas: JSON.parse(JSON.stringify(self.listaCoberturasPolizasColectivas)),
								beneficiarios: JSON.parse(JSON.stringify(self.beneficiarios)),
								adicionales: JSON.parse(JSON.stringify(self.adicionales)),
								recibo: null,
								vehiculos: listaVehiculos,
								isGlobal:self.datosGeneralesCertificados.isGlobal
							};
						}

						var params = angular.copy(self.agregarPolizaFormulario);

						params.feEmision = mainServices.revertDate(params.feEmision);
						params.feSubcripcion = mainServices.revertDate(params.feSubcripcion);
						params.feInicio = mainServices.revertDate(params.feInicio);
						params.feVigInicio = mainServices.revertDate(params.feVigInicio);
						params.feVigFin = mainServices.revertDate(params.feVigFin);

						for ( var i = 0 ; i<params.beneficiarios.length; i++){
							params.beneficiarios[i].feNacimiento =  mainServices.revertDate(params.beneficiarios[i].feNacimiento );
						}
						for ( var i = 0 ; i<params.adicionales.length; i++){
							params.adicionales[i].feNacimiento =  mainServices.revertDate(params.adicionales[i].feNacimiento );
						}
						if(params.recibo != null ){
							params.recibo[0].fechaEmision =  mainServices.revertDate(params.recibo[0].fechaEmision);
							params.recibo[0].fechaRecepcion =  mainServices.revertDate(params.recibo[0].fechaRecepcion);
							params.recibo[0].fechaVigenciaDesde =  mainServices.revertDate(params.recibo[0].fechaVigenciaDesde);
							params.recibo[0].fechaVigenciaHasta =  mainServices.revertDate(params.recibo[0].fechaVigenciaHasta);
						}
						console.log('params',params);

						polizaServices.agregarPoliza(params)
							.success(function (data) {
								new PNotify({
									title: '¡Certificado Creado!',
									text: 'El certificado fue creado con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								// llamar servio de cartas automatico***********************************************************+
                self.generateCartasAutomaticas(self.opcionRamo,'C');



								datosGenerales.collapse('show');
								self.setObjectElems(self.datosGeneralesCertificados, undefined);
								self.datosGeneralesCertificados.nro_Certificado = 0;
								self.setObjectElems(self.recibo, undefined);
								self.recibo.comision = {
									id: undefined,
									numeroRecibo: undefined,
									montoComision: undefined,
									estatus: undefined,
									fechaPago: undefined,
									fechaCarga: undefined,
									nuRifEmpresa: undefined,
									nombreUsuarioApp: undefined
								};
								self.setObjectElems(self.vehiculo, undefined);
								self.setObjectElems(self.adicional, undefined);
								self.adicionales = [];
								self.setObjectElems(self.beneficiario, undefined);
								self.beneficiarios = [];
								self.setObjectElems(self.productor, undefined);
								self.productores = [];
								self.setObjectElems(self.contrato, undefined);
								self.listaCoberturasPolizasColectivas = [];
								self.contragarantes = [];
								self.setObjectElems(self.fianza, undefined);
								self.fianzas = [];
								self.setObjectElems(self.tipoPoliza, false);
								self.opcionPoliza = undefined;
								self.opcionRamo = undefined;
								self.setObjectElems(self.tipoCertificado, false);

								self.viewsController('listarPolizasColectivas');

								if (!datosGenerales.hasClass('in')) {
									console.log(' no abierto 1 valido');
									datosGenerales.collapse('show');
									if (vistaVehiculos.hasClass('in'))
									{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
									if (vistaContratro.hasClass('in'))
									{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
									if (vistaContragarante.hasClass('in'))
									{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
									if (vistaFianza.hasClass('in'))
									{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
									if (vistaCobertura.hasClass('in'))
									{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
									if (vistaAdicional.hasClass('in'))
									{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
									if (vistaBeneficiarios.hasClass('in'))
									{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
								}
								data = undefined;
							});
					}
				} else if (!validatorResultRecibo && validatorResult) {
					new PNotify({
						title: 'Error',
						text: 'Los datos del recibo estan incompletos',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				} else {
					console.log(' no valido');
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaVehiculos.hasClass('in'))
						{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
						if (vistaContratro.hasClass('in'))
						{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaContragarante.hasClass('in'))
						{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaFianza.hasClass('in'))
						{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaCobertura.hasClass('in'))
						{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaAdicional.hasClass('in'))
						{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaBeneficiarios.hasClass('in'))
						{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaRecibo.hasClass('in'))
						{ vistaRecibo.collapse('hide'); console.log(' no abierto 3 valido'); }

					}
				}
			}
			if (self.views.agregarPolizasIndividuales) {
				var validatorResult = validator.checkAll($('#polizasDatosIndivual'));
				var validatorResultRecibo = validator.checkAll($('#polizasIndivualAgregarReciboFormulario'));
				var validatorVehiculo = validator.checkAll($('#polizaVehiculos'));
				var boolAux = self.validarAseguradora(self.datos.aseguradora.data);

				var datosGenerales = $('#polizaDatosGenerales'),
					vistaVehiculos = $('#polizaVehiculos'),
					vistaContratro = $('#polizaDatosContrato'),
					vistaContragarante = $('#polizaDatosContragarante'),
					vistaFianza = $('#polizaDatosFianza'),
					vistaCobertura = $('#polizaCobertura'),
					vistaAdicional = $('#polizaCoberturaAdicionales'),
					vistaBeneficiarios = $('#polizaCoberturaBeneficiarios'),
					vistaProductor = $('#polizaDatosProductor');
				vistaRecibo = $('#polizasIndivualAgregarReciboFormulario');

				if (self.tipoPoliza.vehiculo && !validatorVehiculo) {
					validatorResult = validatorVehiculo;
					new PNotify({
						title: 'Error',
						text: 'Los datos del vehiculo estan incompletos',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}


				if (validatorResult && validatorResultRecibo && boolAux) {
					//******************
					//LLAMAR AL SERVICIO
					//******************
					for (var i = 0; i < self.listaPolizasIndividuales.length; i++) {

						console.log('self.datos.numero', self.datos.numeroPoliza);
						if (self.listaPolizasIndividuales[i].numeroPoliza == self.datos.numeroPoliza) {
							bool = true;
							console.log('repetido 1');
							//	Date.parse(sFechaFin)
							break;
						}
						else {
							bool = false;
						}
					}
					if (bool) {
						new PNotify({
							title: 'Error',
							text: 'El numero de la Poliza ya exite.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else if (parseFloat(self.datos.prima) < parseFloat(self.recibo.montoRecibo) || parseFloat(self.datos.prima) < parseFloat(self.recibo.comision.montoComision)) {
						if (parseFloat(self.datos.prima) < parseFloat(self.recibo.montoRecibo)) {
							new PNotify({
								title: 'Error',
								text: 'El monto del recibo execede el monto prima de la póliza.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						} else {
							new PNotify({
								title: 'Error',
								text: 'El monto de la comisión execede el monto prima de la póliza.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						}
					} else {

						console.log('self.tipoPoliza', self.tipoPoliza);

						if (self.tipoPoliza.vehiculo) {
							if (!self.vehiculo.placa) {
								var listaVehiculos = [];
							} else {
								var listaVehiculos = [];
								listaVehiculos.push({
									placa: self.vehiculo.placa,
									serialCarroceria: self.vehiculo.carroceria,
									serialMotor: self.vehiculo.serial,
									txColor: self.vehiculo.color,
									nuPasajeros: self.vehiculo.pasajeros,
									idTipoVehiculo: self.vehiculo.tipo,
									ano: self.vehiculo.ano,
									capCarga: self.vehiculo.carga,
									idModelo: self.vehiculo.modelo.idModeloVehiculo,
									lugarUso: self.vehiculo.uso,
									condNombre: self.vehiculo.conductor,
									ciRifCond: self.vehiculo.documento,
									idMarca: self.vehiculo.marca.idMarca,
									idVersion: self.vehiculo.version
								});
							}
						}
						//SE PUEDE ELIMINAR
						if (self.tipoPoliza.vida || self.tipoPoliza.accidentes || self.tipoPoliza.Salud) {
							var listaBeneficiarios = [];
							listaBeneficiarios.push({
							});
						}
						//SE PUEDE ELIMINAR
						if (self.tipoPoliza.Fianza) {
							//SE GUARADA TIPO POLIZA FIANZA
						}

						self.recibo.poliza = self.datos.numeroPoliza;
						self.recibo.coRamo = self.opcionRamo;
						self.recibo.nuRifEmpresa = self.recibo.comision.nuRifEmpresa = mainServices.getRifEmpresa();
						self.recibo.comision.id = 0;
						self.recibo.comision.nombreUsuarioApp = mainServices.getUser();
						self.recibo.comision.numeroRecibo = self.recibo.recibo;
						self.recibo.isGlobal = 1;
						self.recibo.numeroCertificado = self.datos.certificado = 0;
						self.recibo.estatusRecibo = 'Pendiente';
						self.recibo.comision.estatus = 'Pendiente';

						if (self.listaCoberturas.length > 0) {
							for (var i = 0; i < self.listaCoberturas.length; i++) {
								self.listaCoberturas[i].tipo = undefined;
								self.listaCoberturas[i].nombre = undefined;
							}
						}

						self.agregarPolizaFormulario = {
							numeroPoliza: self.datos.numeroPoliza,
							numeroCertificado: self.datos.certificado,
							idTomador: self.tomador.nuCedulaRif,
							idAsegurado: self.mismoTomadorCheck.n ==  'iradio_flat-green checked'? self.asegurado.nuCedulaRif:self.tomador.nuCedulaRif,
							idAseguradora: self.datos.aseguradora.data,
							idMoneda: self.datos.Moneda.id,
							feInicio:  self.datos.fechaInicio,//self.datos.fechaInicio,
							feFin:  self.datos.fechaFin,//self.datos.fechaFin,
							feEmision: self.datos.fechaEmision,//self.datos.fechaEmision,
							feSubcripcion: self.datos.fechaSuscripcion,//self.datos.fechaSuscripcion,
							feVigInicio:self.datos.vigenciaDesde,//self.datos.vigenciaDesde,
							feVigFin: self.datos.vigenciaHasta,//self.datos.vigenciaHasta,
							totalPrima: self.datos.prima,
							montoDeducible: self.datos.montoDeducible,
							coRamo: self.opcionRamo,
							coSubRamo: self.opcionPoliza,
							tpPoliza: 'I',
							idEmpresa: undefined,//Se setea el valor en el servicio
							frecuenciaPago: self.datos.frecuenciaPago,
							coberturas: JSON.parse(JSON.stringify(self.listaCoberturas)),
							comisiones: JSON.parse(JSON.stringify(self.productores)),
							//ejecutivos: JSON.parse(JSON.stringify(self.ejecutivos)),
							beneficiarios: JSON.parse(JSON.stringify(self.beneficiarios)),
							adicionales: JSON.parse(JSON.stringify(self.adicionales)),
							recibo: [JSON.parse(JSON.stringify(self.recibo))],
							vehiculos: listaVehiculos, //PREGUNTAR A FABIAN
							estatus: 1,
							isGlobal:self.recibo.isGlobal
						};
						console.log(self.agregarPolizaFormulario);

						self.agregarPolizaService('agregar');

						console.log('valido');

						console.log(self.listaPolizasIndividuales);
					}
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaVehiculos.hasClass('in'))
						{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
						if (vistaContratro.hasClass('in'))
						{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaContragarante.hasClass('in'))
						{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaFianza.hasClass('in'))
						{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaCobertura.hasClass('in'))
						{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaAdicional.hasClass('in'))
						{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaBeneficiarios.hasClass('in'))
						{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaProductor.hasClass('in'))
						{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaRecibo.hasClass('in'))
						{ vistaRecibo.collapse('hide'); console.log(' no abierto 3 valido'); }
					}
				} else if (!validatorResultRecibo && validatorResult) {
					new PNotify({
						title: 'Error',
						text: 'Los datos del recibo estan incompletos',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				} else {
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaVehiculos.hasClass('in'))
						{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
						if (vistaContratro.hasClass('in'))
						{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaContragarante.hasClass('in'))
						{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaFianza.hasClass('in'))
						{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaCobertura.hasClass('in'))
						{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaAdicional.hasClass('in'))
						{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaBeneficiarios.hasClass('in'))
						{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
						if (vistaProductor.hasClass('in'))
						{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }

					}
				}

			}
			if (self.views.agregarPolizasColectivas) {
				var validatorResult = validator.checkAll($('#formularioDatosGeneralesPolizasColectivas'));
				var validatorResultRecibo = validator.checkAll($('#agregarReicboGlobalPolizaCertificado'));
				var datosGenerales = $('#datosGeneralesPolizasColectivas'),
					vistaProductor = $('#datosProductorPolizasColectivas'),
					vistaRecibo = $('#agregarReicboGlobalPolizaCertificado');
				var bool = false;
				var boolPrima = true;
				var boolAux =  self.validarAseguradora(self.datosPolizasColectivas.aseguradora.data);
				if (validatorResult && boolAux) {
					//******************
					//LLAMAR AL SERVICIO
					//******************
					for (var i = 0; i < self.listaPolizasColectivas.length; i++) {
						if (self.listaPolizasColectivas[i].numero == self.datosPolizasColectivas.numero) {
							bool = true;
							break;
						}
					}
					if (bool) {
						new PNotify({
							title: 'Error',
							text: 'Ese numero de póliza ya exite.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					} else if (boolPrima) {
						if (!validatorResultRecibo) {
							new PNotify({
								title: 'Error',
								text: 'Los datos del recibo estan incompletos',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						} else if (parseFloat(self.datosPolizasColectivas.prima) < parseFloat(self.recibo.montoRecibo) || parseFloat(self.datosPolizasColectivas.prima) < parseFloat(self.recibo.comision.montoComision)) {
							if (parseFloat(self.datosPolizasColectivas.prima) < parseFloat(self.recibo.montoRecibo)) {
								new PNotify({
									title: 'Error',
									text: 'El monto del recibo execede el monto prima de la póliza.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								new PNotify({
									title: 'Error',
									text: 'El monto de la comisión execede el monto prima de la póliza.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							}
						} else {
							self.recibo.poliza = self.datosPolizasColectivas.numero;
							self.recibo.coRamo = self.opcionRamo;
							self.recibo.nuRifEmpresa = self.recibo.comision.nuRifEmpresa = mainServices.getRifEmpresa();
							self.recibo.comision.id = 0;
							self.recibo.comision.nombreUsuarioApp = mainServices.getUser();
							self.recibo.comision.numeroRecibo = self.recibo.recibo;

							if (self.reciboCheck.bool)
								self.recibo.isGlobal = 1;
							else
								self.recibo.isGlobal = 0;

							self.recibo.numeroCertificado = self.datos.certificado;
							self.recibo.estatusRecibo = 'Pendiente';
							self.recibo.comision.estatus = 'Pendiente';


							self.agregarPolizaFormulario = {
								numeroPoliza: self.datosPolizasColectivas.numero,
								numeroCertificado: 0,
								coRamo: self.opcionRamo,
								coSubRamo: self.opcionPoliza,
								tpPoliza: 'C',
								idTomador: self.tomador.nuCedulaRif,
								idAsegurado: self.tomador.nuCedulaRif,
								idAseguradora: self.datosPolizasColectivas.aseguradora.data,
								idMoneda: self.datosPolizasColectivas.Moneda.id,
								feEmision: self.datosPolizasColectivas.fechaEmision,
								feSubcripcion: self.datosPolizasColectivas.fechaEmision,
								feVigInicio: self.datosPolizasColectivas.vigenciaDesde,
								feVigFin: self.datosPolizasColectivas.vigenciaHasta,
								frecuenciaPago: self.datosPolizasColectivas.frecuenciaPago,
								totalPrima: self.datosPolizasColectivas.prima,
								montoDeducible: self.datosPolizasColectivas.montoDeducible,
								recibo: [JSON.parse(JSON.stringify(self.recibo))],
								idEmpresa: mainServices.getRifEmpresa(),
								comisiones: JSON.parse(JSON.stringify(self.productoresPolizasColectivas)),
								estatus: 1,
								isGlobal:self.recibo.isGlobal
							};
							//se agrega el recibo
							console.log('recibo', self.agregarPolizaFormulario.recibo);
							if (!self.agregarPolizaFormulario.recibo[0].recibo) {
								self.agregarPolizaFormulario.recibo = [];
							}
							var params = angular.copy(self.agregarPolizaFormulario);
							params.feEmision = mainServices.revertDate(params.feEmision);
							params.feVigInicio = mainServices.revertDate(params.feVigInicio);
							params.feVigFin = mainServices.revertDate(params.feVigFin);

							if(params.recibo.length > 0 ){
								params.recibo[0].fechaEmision =  mainServices.revertDate(params.recibo[0].fechaEmision);
								params.recibo[0].fechaRecepcion =  mainServices.revertDate(params.recibo[0].fechaRecepcion);
								params.recibo[0].fechaVigenciaDesde =  mainServices.revertDate(params.recibo[0].fechaVigenciaDesde);
								params.recibo[0].fechaVigenciaHasta =  mainServices.revertDate(params.recibo[0].fechaVigenciaHasta);
							}
							console.log('params',params);

							polizaServices.agregarPoliza(params)
								.success(function (data) {
									new PNotify({
										title: '¡Poliza creada!',
										text: data.mensaje, //'La Poliza fue creada con éxito.',
										type: 'success',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
									});
                  // llamar al servicio de carta  poliza colectiva certificado 0*******************************************************************
									self.generateCartasAutomaticas(self.opcionRamo,'C');
									self.viewsController('listarPolizasColectivas');
									datosGenerales.collapse('show');
									self.reciboSwitch('n');
									self.setObjectElems(self.datosPolizasColectivas, undefined);
									self.datosPolizasColectivas.aseguradora = {
										data: undefined,
										value: undefined,
									};
									document.getElementById("aseguradoraPolizaColectiva").value = "";
									self.setObjectElems(self.recibo, undefined);
									self.recibo.comision = {
										id: undefined,
										numeroRecibo: undefined,
										montoComision: undefined,
										estatus: undefined,
										fechaPago: undefined,
										fechaCarga: undefined,
										nuRifEmpresa: undefined,
										nombreUsuarioApp: undefined
									};
									self.productoresPolizasColectivas = [];
									self.ejecutivosPolizasColectivas = [];
									self.opcionPoliza = undefined;
									if (!datosGenerales.hasClass('in')) {
										console.log(' no abierto 1 valido');
										datosGenerales.collapse('show');
										if (vistaProductor.hasClass('in'))
										{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }
										if (vistaRecibo.hasClass('in'))
										{ vistaRecibo.collapse('hide'); console.log(' no abierto 3 valido'); }

									}
                  // se debe hacer la llamada al servicio automatico


									data = undefined;
								});

						}
					}
				} else {
					console.log(' no valido');
					if (!datosGenerales.hasClass('in')) {
						console.log(' no abierto 1 valido');
						datosGenerales.collapse('show');
						if (vistaProductor.hasClass('in'))
						{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }

					}
				}
			}
		};
		/*
			Accion para limpiar formularios
		*/
		this.cancelar = function () {
			this.cleanDates();
			if (self.views.agregarPolizasIndividuales) {
				self.setObjectElems(self.tipoPoliza, false);
				self.setObjectElems(self.datos, undefined);
				self.datos.aseguradora = {
					data: undefined,
					value: undefined,
				};
				document.getElementById("productorSelect").value = "";
				document.getElementById("aseguradoraPoliza").value = "";
				self.opcionPoliza = undefined;
				self.opcionRamo = undefined;
				self.ListaAux = [];
				self.listaCoberturas = [];
				self.sumaAseguBasica = [];
				self.sumaAseguOpcional = [];
				self.listaPolizasIndividuales = [];
				this.maskIdentifacionAsegurado = undefined;
				this.maskIdentifacionTomador = undefined;
				self.setObjectElems(self.recibo, undefined);
				self.recibo.comision = {
					id: undefined,
					numeroRecibo: undefined,
					montoComision: undefined,
					estatus: undefined,
					fechaPago: undefined,
					fechaCarga: undefined,
					nuRifEmpresa: undefined,
					nombreUsuarioApp: undefined
				};
				self.setObjectElems(self.vehiculo, undefined);
				self.setObjectElems(self.adicional, undefined);
				self.adicionales = [];
				self.setObjectElems(self.beneficiario, undefined);
				self.beneficiarios = [];
				self.setObjectElems(self.productor, undefined);
				self.productores = [];
				self.setObjectElems(self.contrato, undefined);
				self.setObjectElems(self.contragarante, undefined);
				self.setObjectElems(self.contragarantes, undefined);
				self.setObjectElems(self.fianza, undefined);
				self.setObjectElems(self.fianzas, undefined);

				var datosGenerales = $('#polizaDatosGenerales'),
					vistaVehiculos = $('#polizaVehiculos'),
					vistaContratro = $('#polizaDatosContrato'),
					vistaContragarante = $('#polizaDatosContragarante'),
					vistaFianza = $('#polizaDatosFianza'),
					vistaCobertura = $('#polizaCobertura'),
					vistaAdicional = $('#polizaCoberturaAdicionales'),
					vistaBeneficiarios = $('#polizaCoberturaBeneficiarios'),
					vistaProductor = $('#polizaDatosProductor');
				if (!datosGenerales.hasClass('in')) {
					console.log(' no abierto 1 valido');
					datosGenerales.collapse('show');
					if (vistaVehiculos.hasClass('in'))
					{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
					if (vistaContratro.hasClass('in'))
					{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaContragarante.hasClass('in'))
					{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaFianza.hasClass('in'))
					{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaCobertura.hasClass('in'))
					{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaAdicional.hasClass('in'))
					{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaBeneficiarios.hasClass('in'))
					{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaProductor.hasClass('in'))
					{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }

				}
			}
			if (self.views.agregarPolizasColectivas) {

				self.setObjectElems(self.datosPolizasColectivas, undefined);
				self.datosPolizasColectivas.aseguradora = {
					data: undefined,
					value: undefined
				};
				self.datosPolizasColectivas.vigenciaHasta = undefined;
				self.datosPolizasColectivas.vigenciaDesde = undefined;
				console.log(self.datosPolizasColectivas);

				self.reciboSwitch('n');
				document.getElementById("productorColectivaSelect").value = "";
				document.getElementById("aseguradoraPoliza").value = "";
				self.setObjectElems(self.recibo, undefined);
				self.recibo.comision = {
					id: undefined,
					numeroRecibo: undefined,
					montoComision: undefined,
					estatus: undefined,
					fechaPago: undefined,
					fechaCarga: undefined,
					nuRifEmpresa: undefined,
					nombreUsuarioApp: undefined
				};
				self.datos.certificado = 0;
				self.setObjectElems(self.vehiculo, undefined);
				self.setObjectElems(self.adicional, undefined);
				self.adicionales = [];
				self.setObjectElems(self.beneficiario, undefined);
				self.beneficiarios = [];
				self.setObjectElems(self.productor, undefined);
				self.setObjectElems(self.ejecutivo, undefined);
				self.productores = [];
				self.ejecutivos = [];
				self.setObjectElems(self.contrato, undefined);
				self.listaCoberturas = [];
				self.contragarantes = [];
				self.setObjectElems(self.fianza, undefined);
				self.fianzas = [];
				self.setObjectElems(self.tipoPoliza, false);
				self.opcionPoliza = undefined;

				var datosGenerales = $('#datosGeneralesPolizasColectivas'),
					vistaProductor = $('#datosProductorPolizasColectivas');

				self.productoresPolizasColectivas = [];
				self.ejecutivosPolizasColectivas = [];
				if (!datosGenerales.hasClass('in')) {
					console.log(' no abierto 1 valido');
					datosGenerales.collapse('show');
					if (vistaProductor.hasClass('in'))
					{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }

				}
			}
			if (self.views.agregarPolizasCertificado) {
				self.setObjectElems(self.datosGeneralesCertificados, undefined);
				self.setObjectElems(self.recibo, undefined);
				self.recibo.comision = {
					id: undefined,
					numeroRecibo: undefined,
					montoComision: undefined,
					estatus: undefined,
					fechaPago: undefined,
					fechaCarga: undefined,
					nuRifEmpresa: undefined,
					nombreUsuarioApp: undefined
				};
				self.setObjectElems(self.vehiculo, undefined);
				self.setObjectElems(self.adicional, undefined);
				self.adicionales = [];
				self.setObjectElems(self.beneficiario, undefined);
				self.beneficiarios = [];
				self.setObjectElems(self.productor, undefined);
				self.productores = [];
				self.setObjectElems(self.contrato, undefined);
				self.listaCoberturasPolizasColectivas = [];
				self.contragarantes = [];
				self.setObjectElems(self.fianza, undefined);
				self.fianzas = [];
				self.setObjectElems(self.tipoPoliza, false);
				self.opcionPoliza = undefined;
			}
			if (self.views.editarPolizasIndividuales) {
				self.editarPolizasFormulario = undefined;
				self.opcionPoliza = undefined;
				self.setObjectElems(self.adicional, undefined);
				self.setObjectElems(self.beneficiario, undefined);
				self.setObjectElems(self.productor, undefined);
				var datosGenerales = $('#editarPolizaDatosGenerales'),
					vistaVehiculos = $('#editarPolizaVehiculos'),
					vistaContratro = $('#editarPolizaDatosContrato'),
					vistaContragarante = $('#editarPolizaDatosContragarante'),
					vistaFianza = $('#editarPolizaDatosFianza'),
					vistaCobertura = $('#editarPolizaCobertura'),
					vistaAdicional = $('#editarPolizaCoberturaAdicionales'),
					vistaProductor = $('#editarPolizaDatosProductor'),
					vistaBeneficiarios = $('#editarPolizaCoberturaBeneficiarios');

				if (!datosGenerales.hasClass('in')) {
					console.log(' no abierto 1 valido');
					datosGenerales.collapse('show');
					if (vistaVehiculos.hasClass('in'))
					{ vistaVehiculos.collapse('hide'); console.log(' no abierto 2 valido'); }
					if (vistaContratro.hasClass('in'))
					{ vistaContratro.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaContragarante.hasClass('in'))
					{ vistaContragarante.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaFianza.hasClass('in'))
					{ vistaFianza.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaCobertura.hasClass('in'))
					{ vistaCobertura.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaAdicional.hasClass('in'))
					{ vistaAdicional.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaBeneficiarios.hasClass('in'))
					{ vistaBeneficiarios.collapse('hide'); console.log(' no abierto 3 valido'); }
					if (vistaProductor.hasClass('in'))
					{ vistaProductor.collapse('hide'); console.log(' no abierto 3 valido'); }

				}
				if (self.polizasIndividual)
					self.viewsController('listarPolizasIndividuales');
				if (self.polizaColectiva)
					self.viewsController('listarPolizasColectivas');
				if (self.polizaCertificado)
					self.viewsController('listarPolizasCertificados');
			}
			if (self.views.cargarPolizas) {
				self.cargaCheck.v = 'iradio_flat-green';
				self.cargaCheck.per = 'iradio_flat-green';
				self.cargaCheck.pa = 'iradio_flat-green';
				$('#archivoPolizas').val('');
				self.archivoPolizas = undefined;
				self.viewsController('listarPolizasIndividuales');
			}
		};

		/*
			Busca los datos de una poliza para crear un certificado KeyEvent = numero de poliza
		*/
		this.cargarPoliza = function (keyEvent) {
			self.setObjectElems(self.tipoCertificado, false);
			console.log('entre');
			self.datosGeneralesCertificados.tomador = undefined;
			self.datosGeneralesCertificados.fechaVencimiento = undefined;
			self.datosGeneralesCertificados.tipoPago = undefined;

			if (keyEvent.which === 13 || (self.datosGeneralesCertificados.numeroPoliza != undefined && self.datosGeneralesCertificados.numeroPoliza != '')) {
				console.log('datosGeneralesCertificados.numeroPoliza', self.datosGeneralesCertificados.numeroPoliza);

				var params = {
					nroPoliza: self.datosGeneralesCertificados.numeroPoliza
				};

				polizaServices.consultarPolizasCertificados(params)
					.success(function (data) {
						console.log('consultarPolizasCertificados success', data);
						if (data.length > 0) {
							if (data[0].tipoPoliza == 'I' || data[0].tipoPoliza == 'i') {
								new PNotify({
									title: 'Error!',
									text: 'La póliza ' + self.datosGeneralesCertificados.numeroPoliza + ' es una póliza Individual.',
									type: 'error',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
							} else {
								self.datosGeneralesCertificados.fechaVencimiento = data[0].fechaVencimiento;
								self.opcionRamo = data[0].coRamo;
								self.opcionPoliza = data[0].opcionRamo;
								self.datosGeneralesCertificados.frequenciaPago = parseInt(data[0].idFreqPago);
								self.datosGeneralesCertificados.idMoneda = data[0].idMoneda;
								self.datosGeneralesCertificados.tomador = data[0].nbAseguradoTomador;
								self.datosGeneralesCertificados.nuRifTomador = data[0].nuRifAseguradoTomador;
								self.datosGeneralesCertificados.prima = data[0].totalPrima.split('.')[0];
								self.datosGeneralesCertificados.montoDeducible = data[0].montoDeducible;
								self.datosGeneralesCertificados.isGlobal = data[0].isGlobal;
								new PNotify({
									title: 'Póliza Cargada!',
									text: 'La póliza Colectiva ' + self.datosGeneralesCertificados.numeroPoliza + ' fue cargada con éxito.',
									type: 'success',
									styling: 'bootstrap3',
									cornerclass: 'ui-pnotify-sharp'
								});
								if (data[0].recibos != null) {
									if (data[0].recibos.length > 0) {
										if (data[0].recibos[0].isGlobal == 1) {
											new PNotify({
												title: '',
												text: 'La Póliza Colectiva ' + self.datosGeneralesCertificados.numeroPoliza + ' posee un recibo global.',
												type: 'success',
												styling: 'bootstrap3',
												cornerclass: 'ui-pnotify-sharp'
											});
											self.recibo = data[0].recibos[0];

										}
									}
								} else {
									self.setObjectElems(self.recibo, undefined);
									self.recibo.comision = {
										id: undefined,
										numeroRecibo: undefined,
										montoComision: undefined,
										estatus: undefined,
										fechaPago: undefined,
										fechaCarga: undefined,
										nuRifEmpresa: undefined,
										nombreUsuarioApp: undefined
									};
								}

								self.TipoRamo();
								self.consultarCoberturasService();
								for (var i = 0; i < self.ListaAseguradoras.length; i++) {
									console.log('self.ListaAseguradoras[i].nu_rif', self.ListaAseguradoras[i].data);
									console.log('data[0].nuRifAseguradora', data[0].nuRifAseguradora);
									if (self.ListaAseguradoras[i].data == data[0].nuRifAseguradora) {
										self.datosGeneralesCertificados.aseguradora = self.ListaAseguradoras[i].value;
										self.datosGeneralesCertificados.nuRifAseguradora = data[0].nuRifAseguradora;
										break;
									}
								};
							}
						} else {
							new PNotify({
								title: '¡Error!',
								text: ' Disculpe la póliza Colectiva ' + self.datosGeneralesCertificados.numeroPoliza + ' no éxite o no es una póliza colectiva.',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
						}
						data = undefined;
					})
					.error(function (data) {
						new PNotify({
							title: '¡Error!',
							text: ' Disculpe la póliza Colectiva ' + self.datosGeneralesCertificados.numeroPoliza + 'no éxite o no es una póliza colectiva.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
					});
			}

		}

		this.seleccionarVersion = function () {
			self.vehiculo.pasajeros = parseInt(self.vehiculo.version.puestos);
		};


		this.validarAseguradora = function(value){
			var bool = true;
			console.log('adsdasdasS');
			for(var i=0; i<self.ListaAseguradoras.length; i++){
				if(self.ListaAseguradoras[i].data == value){
					 bool = false;
					break;
				}
			};

			if(bool){
				console.log(bool);
				new PNotify({
					title: 'Error',
					text: 'La aseguradora ingresada no existe.',
					type: 'error',
					styling: 'bootstrap3',
					cornerclass: 'ui-pnotify-sharp'
				});
			    document.getElementById("aseguradoraPoliza").value = "";
				return false;
			}else{
				return true;
			}
		};

		/********************************************************************************************
		 **                                   M I S C E L A N E O U S                               **
		 ********************************************************************************************/

		$rootScope.$on('agregarPolizasIndividuales', function () {
			//$('#tablaConsultarPolizasIndividuales').DataTable().destroy();
			self.consultarPolizasIndividualesServices();
		});

		$rootScope.$on('editarPolizasIndividuales', function () {
			self.viewsController('editarPolizasIndividuales');
		});

		$rootScope.$on('listarPolizasIndividuales', function () {
			self.viewsController('listarPolizasIndividuales');
		});

		$rootScope.$on('agregarPolizasColectivas', function () {
			$('#tablaConsultarPolizasColectivas').DataTable().destroy();
			self.viewsController('agregarPolizasColectivas');
			self.getListOfValues();

			self.opcionRamo = undefined;
			self.opcionPoliza = undefined;

			self.listaPolizasColectivas = [];

		});

		$rootScope.$on('agregarPolizasCertificado', function () {
			self.viewsController('agregarPolizasCertificado');
			self.getListOfValues();

			self.opcionRamo = undefined;
			self.opcionPoliza = undefined;

			self.ListaCertificados = [];

		});

		$rootScope.$on('listarPolizasColectivas', function () {
			//$('#tablaConsultarPolizasColectivas').DataTable();
			self.verCertificado = false;
			console.log('tralala');
			self.viewsController('listarPolizasColectivas');
		});

		$rootScope.$on('cargarPolizas', function () {
			self.viewsController('cargarPolizas');
		});

		/*acordeon datos Generales polizas individuales*/
		$('#numeroPolizaIndividual').on('blur', null, validator.checkField);
		$('#polizaTomador').on('blur', null, validator.checkField);
		$('#polizaAsegurado').on('blur', null, validator.checkField);
		$('#documentoPoliza').on('blur', null, validator.checkField);
		$('#aseguradoraPoliza').on('blur', null, validator.checkField);
		$('#monedaPoliza').on('blur', null, validator.checkField);
		$('#FechaPolizaInicio').on('blur', null, validator.checkField);
		$('#FechaPolizaFin').on('blur', null, validator.checkField);
		$('#fechaEmision').on('blur', null, validator.checkField);
		$('#fechaSuscripcion').on('blur', null, validator.checkField);
		$('#vigenciaDesde').on('blur', null, validator.checkField);
		$('#vigenciaHasta').on('blur', null, validator.checkField);
		$('#tipoPagoPoliza').on('blur', null, validator.checkField);
		$('#frecuenciaPagoPoliza').on('blur', null, validator.checkField);
		$('#polizaTotalPrima').on('blur', null, validator.checkField);
		$('#tipoMovimientoPoliza').on('blur', null, validator.checkField);
		$('#ramoPoliza').on('blur', null, validator.checkField);
		$('#polizaIndividualMontoDeducible').on('blur', null, validator.checkField);
		$('#polizasMontoDeducible').on('blur', null, validator.checkField);
		//
		/*acordeon editar datos Generales polizas individuales*/
		$('#ediatrNombrePolizaIndividual').on('blur', null, validator.checkField);
		$('#ediatrPolizaTomador').on('blur', null, validator.checkField);
		$('#editarPolizaAsegurado').on('blur', null, validator.checkField);
		$('#editarDocumentoPoliza').on('blur', null, validator.checkField);
		$('#editarAseguradoraPoliza').on('blur', null, validator.checkField);
		$('#editarMonedaPoliza').on('blur', null, validator.checkField);
		$('#editarFechaPolizaInicio').on('blur', null, validator.checkField);
		$('#editarFechaPolizaFin').on('blur', null, validator.checkField);
		$('#editarFechaEmision').on('blur', null, validator.checkField);
		$('#editarFechaSuscripcion').on('blur', null, validator.checkField);
		$('#editarVigenciaDesde').on('blur', null, validator.checkField);
		$('#editarVigenciaHasta').on('blur', null, validator.checkField);
		$('#editarTipoPagoPoliza').on('blur', null, validator.checkField);
		$('#editarFrecuenciaPagoPoliza').on('blur', null, validator.checkField);
		$('#editarTipoMovimientoPoliza').on('blur', null, validator.checkField);
		$('#editarPolizaTotalPrima').on('blur', null, validator.checkField);
		//
		//acordeon productor
		$('#nombreProductor').on('blur', null, validator.checkField);
		$('#porcentajeComision').on('blur', null, validator.checkField);
		$('#nombreEjecutivo').on('blur', null, validator.checkField);
		$('#comsionEjecutivo').on('blur', null, validator.checkField);
		//
		//acordeon editar productor
		$('#editarNombreProductor').on('blur', null, validator.checkField);
		$('#editarPorcentajeComision').on('blur', null, validator.checkField);
		$('#editarNombreEjecutivo').on('blur', null, validator.checkField);
		$('#editarComsionEjecutivo').on('blur', null, validator.checkField);
		//
		//acordeon vehiculo
		$('#placaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#modeloAgregarPolizasIndiviuales').on('blur', null, validator.checkField);
		$('#marcaAgregarPolizasIndividuales').on('blur', null, validator.checkField);
		$('#anoAgregarPolizasIndividuales').on('blur', null, validator.checkField);
		$('#colorPolizasIndividuales').on('blur', null, validator.checkField);
		$('#serialPolizasIndivuales').on('blur', null, validator.checkField);
		$('#carroreceriaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#pasajerosPolizasIndividuales').on('blur', null, validator.checkField);
		$('#cargaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#usoPolizasIndividuales').on('blur', null, validator.checkField);
		$('#tipoVehiculoPolizasIndividuales').on('blur', null, validator.checkField);
		$('#conductorPolizasIndividuales').on('blur', null, validator.checkField);
		$('#documentoPolizaIndividual').on('blur', null, validator.checkField);
		//
		//acordeon editar vehiculo
		$('#editarPlacaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarMarcaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarModeloPolizasIndiviuales').on('blur', null, validator.checkField);
		$('#editarAnoPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarColorPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarSerialPolizasIndivuales').on('blur', null, validator.checkField);
		$('#editarCarroreceriaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarPasajerosPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarCargaPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarUsoPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarTipoVehiculoPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarConductorPolizasIndividuales').on('blur', null, validator.checkField);
		$('#editarDocumentoPolizaIndividual').on('blur', null, validator.checkField);
		//

		/*acordeon contrato*/
		$('#contratoAdicional').on('blur', null, validator.checkField);
		$('#acreedorAdicional').on('blur', null, validator.checkField);
		$('#montoAdicional').on('blur', null, validator.checkField);
		$('#ejecucionContrato').on('blur', null, validator.checkField);
		$('#objetoContrato').on('blur', null, validator.checkField);
		//

		/*acordeon editar contrato*/
		$('#editarContratoAdicional').on('blur', null, validator.checkField);
		$('#editarAcreedorAdicional').on('blur', null, validator.checkField);
		$('#editarMontoAdicional').on('blur', null, validator.checkField);
		$('#editarEjecucionContrato').on('blur', null, validator.checkField);
		$('#editarObjetoContrato').on('blur', null, validator.checkField);
		//
		/*acordeon contragarantes*/
		$('#contratoAdicional').on('blur', null, validator.checkField);
		$('#documentoContragarantePolizaIndividual').on('blur', null, validator.checkField);
		//
		/*acordeon   editar contragarantes*/
		$('#editarContratoAdicional').on('blur', null, validator.checkField);
		$('#editarDocumentoContragarantePolizaIndividual').on('blur', null, validator.checkField);
		//

		/*acordeon Datos Generales Polizas Colectivas*/
		$('#inputNroPolizaColectiva').on('blur', null, validator.checkField);
		$('#selectTomadorPolizaColectiva').on('blur', null, validator.checkField);
		$('#inputdocumentoPolizaColectiva').on('blur', null, validator.checkField);
		$('#selectAseguradoraPolizasColectivas').on('blur', null, validator.checkField);
		$('#inputMonedaPolizaColectiva').on('blur', null, validator.checkField);
		$('#FechaInicioPolizaColectiva').on('blur', null, validator.checkField);
		$('#FechaVencimientoPolizaColectiva').on('blur', null, validator.checkField);
		$('#selectTipoPagoPolizaColectiva').on('blur', null, validator.checkField);
		$('#selectRamoPolizaColectiva').on('blur', null, validator.checkField);
		//acordeon vehiculo polizas Colectivas
		$('#placaAgregarPolizasCertificado').on('blur', null, validator.checkField);
		$('#anoAgregarPolizasCertificado').on('blur', null, validator.checkField);
		$('#marcaAgregarPolizaCertificado').on('blur', null, validator.checkField);
		$('#modeloAgregarPolizasCertificado').on('blur', null, validator.checkField);
		//

		/*acordeon Recibo  Polizas Individual*/
		$('#formularioAgregarPolizaReciboNumero').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaReciboTipoRecibo').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaIndividualReciboVigenciaDesde').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaIndividualReciboVigenciaHasta').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaIndividualReciboFechaRecepcion').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaIndividualReciboFechaEmision').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaReciboMontoRecibo').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaReciboMontoComision').on('blur', null, validator.checkField);

		/*acordeon Recibo Global  Polizas Colectivas*/
		$('#formularioAgregarPolizaColectivaReciboNumero').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboTipoRecibo').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboVigenciaDesde').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboVigenciaHasta').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboFechaEmision').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboFechaRecepcion').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboMontoRecibo').on('blur', null, validator.checkField);
		$('#formularioAgregarPolizaColectivaReciboMontoComision').on('blur', null, validator.checkField);


		/*acordeon editar Datos Generales Polizas Colectivas*/
		$('#editarInputNroPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarSelectTomadorPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarInputdocumentoPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarSelectAseguradoraPolizasColectivas').on('blur', null, validator.checkField);
		$('#editarInputMonedaPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarFechaInicioPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarFechaVencimientoPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarSelectTipoPagoPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarSelectRamoPolizaColectiva').on('blur', null, validator.checkField);
		//
		//acordeon productor Polizas Colectivas
		$('#nombreProductorPolizaColectiva').on('blur', null, validator.checkField);
		$('#porcentajeComisionPolizasColectivas').on('blur', null, validator.checkField);
		//
		//acordeon productor Polizas Colectivas
		$('#editarNombreProductorPolizaColectiva').on('blur', null, validator.checkField);
		$('#editarPorcentajeComisionPolizasColectivas').on('blur', null, validator.checkField);
		//
		//acordeon Datos Generrales Certificados
		$('#nro_polizaPolizasColectivas').on('blur', null, validator.checkField);
		$('#nro_CertificadoPolizasColectivas').on('blur', null, validator.checkField);
		$('#FechaDeInclusionPolizaColectiva').on('blur', null, validator.checkField);
		//
		/*acordeon Datos de la Fianza Polizas Colectivas*/
		$('#contratoAdicionalColectiva').on('blur', null, validator.checkField);
		$('#acreedorAdicionalColectiva').on('blur', null, validator.checkField);
		$('#fechaContratoColectiva').on('blur', null, validator.checkField);
		$('#montoAdicionalColectiva').on('blur', null, validator.checkField);
		$('#ejecucionContratoColectiva').on('blur', null, validator.checkField);
		$('#objetoContratoColectiva').on('blur', null, validator.checkField);

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
			self.cambiarFecha('formularioAgregarPolizaIndividualReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaIndividualReciboFechaRecepcion',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaIndividualReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaIndividualReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('fechaEmisionColectiva',undefined,undefined);
			self.cambiarFecha('vigenciaDesdeColectiva',undefined,undefined);
			self.cambiarFecha('vigenciaHastaColectiva',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaColectivaReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaColectivaReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaColectivaReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaColectivaReciboFechaRecepcion',undefined,undefined);
			self.cambiarFecha('polizasColectivaCertificadoReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('polizasColectivaCertificadoReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('polizasColectivaCertificadoReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('polizasColectivaCertificadoReciboFechaRecepcion',undefined,undefined);
			self.cambiarFecha('editarFechaEmision',undefined,undefined);
			self.cambiarFecha('editarVigenciaDesde',undefined,undefined);
			self.cambiarFecha('editarVigenciaHasta',undefined,undefined);
		};
		// Fin de Validaciones para datetimepiker

		this.createTablePolizasIndividual = function () {

			var permisos = mainServices.getPermisos();
			console.log('poliPermisos',permisos);
			var edit = false;
			var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Consultar póliza" class="verPolizaIndividual cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
				<i class="fa fa-search"></i>\
				</a>\
			</td>';

			for( var i = 0; i < permisos.length; i ++ ){
				if((permisos[i].coPermiso == 'editPolInd' && permisos[i].inEstatus == 1))
					edit = true;
			};
			if (edit || mainServices.isAdmin() == 1){
				var htmlButtons ='<td style="text-align: center;">\
					<a data-toggle="tooltip" data-placement="top" title="Consultar póliza" class="verPolizaIndividual cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
					<i class="fa fa-search"></i>\
					</a>\
					<a data-toggle="tooltip" data-placement="top" title="Editar póliza " class="editarPolizaIndividual cursor-pointer" style="margin-right: 10px">\
					<i class="fa fa-pencil"></i>\
					</a>\
					<a data-toggle="tooltip" data-placement="top" title="Anular póliza " class="anularPolizaIndividual cursor-pointer" style="margin-right: 10px">\
					<i class="fa  fa-times-circle"></i>\
					</a>\
				</td>';
			}

			$('#tablaConsultarPolizasIndividuales').DataTable({
				data: self.listaPolizasIndividuales,
				aoColumns: [
					{ 'data': 'numeroPoliza', sDefaultContent: '' },
					{ 'data': 'nbramo', sDefaultContent: '' },
					{ 'data': 'nbAseguradora', sDefaultContent: '' },
					{ 'data': 'nuRifAsegurado', sDefaultContent: '' },
					{ 'data': 'nbAsegurado', sDefaultContent: '' },
					{ 'data': 'feVigFin', sDefaultContent: '' },
					{
						'defaultContent': htmlButtons
					}
				],
				columnDefs: [
					{ "className": "text-center", "targets": "_all" }
				]
			});
			$('#tablaConsultarPolizasIndividuales tbody').on('click', '.verPolizaIndividual', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarPolizasIndividuales').DataTable().row($(this).parents('tr')).data();
				self.editarPolizasFormulario = JSON.parse(JSON.stringify(modalPoliza));
				//self.opcionPoliza = self.editarPolizasFormulario.opcionPoliza;
				self.editarPolizasFormulario.totalPrima = mainServices.setCurrency(self.editarPolizasFormulario.totalPrima);
				self.editarPolizasFormulario.montoDeducible = mainServices.setCurrency(self.editarPolizasFormulario.montoDeducible);
				self.editarPolizasFormulario.recibos = [];
				//self.consultarPolizas();
				$('.activarModalPolizaInidividual').click();
			});
			// Modal para validar anulación
			$('#tablaConsultarPolizasIndividuales tbody').on('click', '.anularPolizaIndividual', function () {
				self.anularPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarPolizasIndividuales').DataTable().row($(this).parents('tr')).data();

				self.anularPolizasFormulario = angular.copy(modalPoliza);
				self.validaAnularPoliza();
				//$('.activarModalValidarAnular').click();
			});

			$('#tablaConsultarPolizasIndividuales tbody').on('click', '.editarPolizaIndividual', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarPolizasIndividuales').DataTable().row($(this).parents('tr')).data();

				self.editarPolizasFormulario = angular.copy(modalPoliza);

				self.editarPolizasFormulario.tipoDocumentoT = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(0, 1);
				self.editarPolizasFormulario.nuRifAseguradoTomador = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(2, self.editarPolizasFormulario.nuRifAseguradoTomador.length);
				self.editarPolizasFormulario.tipoDocumentoAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(0, 1);
				self.editarPolizasFormulario.nuRifAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(2, self.editarPolizasFormulario.nuRifAsegurado.length);

				self.editarPolizasFormulario.totalPrima = self.editarPolizasFormulario.totalPrima.split(".")[0];
				self.editarPolizasFormulario.montoDeducible = self.editarPolizasFormulario.montoDeducible;
				self.polizasIndividual = (self.editarPolizasFormulario.tipoPoliza == 'I' && self.editarPolizasFormulario.numeroCertificado == "0");
				self.polizaColectiva = false;
				self.polizaCertificado = false;



				$('.activarEditarPolizaIndividual').click();
			});
			$('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});
		};

		this.destroyTablePolizaIndividual = function () {
			$('#tablaConsultarPolizasIndividuales').dataTable().fnDestroy();
			console.log('on destroyTable function..');
			$('#tablaConsultarPolizasIndividuales tbody').off('click');
			self.createTablePolizasIndividual();
		};

		this.destroyTablePolizaColectiva = function () {
			$('#tablaConsultarPolizasColectivas').dataTable().fnDestroy();
			console.log('on destroyTable function..');
			$('#tablaConsultarPolizasColectivas tbody').off('click');
			self.createTablePolizaColectiva();
		};

		this.createTablePolizaColectiva = function () {

			var permisos = mainServices.getPermisos();
			var edit = false;
			var htmlButtons ='<td style="text-align: center;">\
					<a data-toggle="tooltip" data-placement="top" title="Ver póliza"  class="consultarPolizaColectiva cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
						<i class="fa fa-search"></i>\
					</a>\
					<a data-toggle="tooltip" data-placement="top" title="Consultar certificados"  class="consultarCertificadoPolizaColectiva cursor-pointer" style="margin-right: 10px" >\
						<i class="fa fa-list-ol"></i>\
					</a>\
					</td>';

			for( var i = 0; i < permisos.length; i ++ ){
				if((permisos[i].coPermiso == 'editPolCol' && permisos[i].inEstatus == 1))
					edit = true;
			};
			if (edit || mainServices.isAdmin() == 1){
				var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Ver póliza"  class="consultarPolizaColectiva cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
				  <i class="fa fa-search"></i>\
				</a>\
				<a data-toggle="tooltip" data-placement="top" title="Editar póliza"  class="editarPolizaColectiva cursor-pointer" style="margin-right: 10px" >\
				  <i class="fa fa-pencil"></i>\
				</a>\
				<a data-toggle="tooltip" data-placement="top" title="Consultar certificados"  class="consultarCertificadoPolizaColectiva cursor-pointer" style="margin-right: 10px" >\
				  <i class="fa fa-list-ol"></i>\
				</a>\
				<a data-toggle="tooltip" data-placement="top" title="Anular póliza"  class="anularPolizaColectiva cursor-pointer" style="margin-right: 10px" >\
				  <i class="fa  fa-times-circle"></i>\
				</a>\
				</td>';
			}

			$('#tablaConsultarPolizasColectivas').DataTable({
				data: self.listaPolizasColectivas,
				aoColumns: [
					{ 'data': 'numeroPoliza', sDefaultContent: '' },
					{ 'data': 'nbramo', sDefaultContent: '' },
					{ 'data': 'nbAseguradora', sDefaultContent: '' },
					{ 'data': 'nuRifAseguradoTomador', sDefaultContent: '' },
					{ 'data': 'nbAseguradoTomador', sDefaultContent: '' },
					{ 'data': 'feVigFin', sDefaultContent: '' },
					{ 'data': 'global', sDefaultContent: '' },
					{
						'defaultContent': htmlButtons
					}
				],
				columnDefs: [
					{ "className": "text-center", "targets": "_all" }
				]
			});

			$('#tablaConsultarPolizasColectivas  tbody').on('click', '.consultarPolizaColectiva', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoli = $('#tablaConsultarPolizasColectivas').DataTable().row($(this).parents('tr')).data();
				self.editarPolizasFormulario = angular.copy(modalPoli);//JSON.parse(JSON.stringify(modalPoli));

				self.editarPolizasFormulario.totalPrima = mainServices.setCurrency(self.editarPolizasFormulario.totalPrima);
				self.editarPolizasFormulario.montoDeducible = mainServices.setCurrency(self.editarPolizasFormulario.montoDeducible);

				self.editarPolizasFormulario.recibos = [];
				$('.activarModalPolizaColectiva').click();

				console.log(self.editarPolizasFormulario);
				// $('.activarModalPolizaColectiva').click();
			});
			// aqui va modal de anularPolizaColectiva
			// Modal para validar anulación
			$('#tablaConsultarPolizasColectivas tbody').on('click', '.anularPolizaColectiva', function () {
				self.anularPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarPolizasColectivas').DataTable().row($(this).parents('tr')).data();

				self.anularPolizasFormulario = angular.copy(modalPoliza);
				self.validaAnularPoliza();
				//$('.activarModalValidarAnular').click();
			});

			$('#tablaConsultarPolizasColectivas  tbody').on('click', '.editarPolizaColectiva', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarPolizasColectivas').DataTable().row($(this).parents('tr')).data();

				self.editarPolizasFormulario = angular.copy(modalPoliza);

				self.editarPolizasFormulario.tipoDocumentoT = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(0, 1);
				self.editarPolizasFormulario.nuRifAseguradoTomador = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(2, self.editarPolizasFormulario.nuRifAseguradoTomador.length);
				self.editarPolizasFormulario.tipoDocumentoAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(0, 1);
				self.editarPolizasFormulario.nuRifAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(2, self.editarPolizasFormulario.nuRifAsegurado.length);

				self.editarPolizasFormulario.totalPrima = self.editarPolizasFormulario.totalPrima.split(".")[0];
				self.editarPolizasFormulario.montoDeducible = self.editarPolizasFormulario.montoDeducible;

				self.polizaColectiva = (self.editarPolizasFormulario.tipoPoliza == 'C' && self.editarPolizasFormulario.numeroCertificado == "0");

				self.polizasIndividual = false;
				self.polizaCertificado = false;
				$('.activarEditarPolizaIndividual').click();
			});

			$('#tablaConsultarPolizasColectivas  tbody').on('click', '.consultarCertificadoPolizaColectiva', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoli = $('#tablaConsultarPolizasColectivas').DataTable().row($(this).parents('tr')).data();
				self.editarPolizasFormulario = modalPoli;//JSON.parse(JSON.stringify(modalPoli));JSON.parse(JSON.stringify(modalPoli));
				self.viewsController('listarPolizasCertificados');
				$('.activarVerPolizaCertificado').click();
			});

			$('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});

		};

		this.destroyTablePolizasCertificado = function () {
			$('#tablaConsultarCertificadosPolizasColectivas').dataTable().fnDestroy();
			console.log('on destroyTable function..');
			$('#tablaConsultarCertificadosPolizasColectivas tbody').off('click');
			self.createTablePolizasCertificado();
		};

		this.createTablePolizasCertificado = function () {

			var permisos = mainServices.getPermisos();
			var edit = false;
			var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Ver certificado" class="consultarPolizaCertificado cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
					<i class="fa fa-search"></i>\
				</a>\
				</td>';

			for( var i = 0; i < permisos.length; i ++ ){
				if(permisos[i].coPermiso == 'editPolCol' && permisos[i].inEstatus == 1)
					edit = true;
			};
			if (edit || mainServices.isAdmin() == 1){
				var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Ver certificado" class="consultarPolizaCertificado cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
				  <i class="fa fa-search"></i>\
				</a>\
				<a data-toggle="tooltip" data-placement="top" title="Editar certificado" class="editarPolizaCertificado cursor-pointer" style="margin-right: 10px" >\
				  <i class="fa fa-pencil"></i>\
				</a>\
				</td>';
			}

			$('#tablaConsultarCertificadosPolizasColectivas').DataTable({
				data: self.ListaCertificados,
				aoColumns: [
					{ 'data': 'numeroCertificado', sDefaultContent: '' },
					{ 'data': 'nuRifAsegurado', sDefaultContent: '' },
					{ 'data': 'nbAsegurado', sDefaultContent: '' },
					{ 'data': 'feVigFin', sDefaultContent: '' },
					{ 'data': 'feEmision', sDefaultContent: '' },
					{
						'defaultContent': htmlButtons
					}
				],
				columnDefs: [
					{ "className": "text-center", "targets": "_all" }
				]
			});


			$('#tablaConsultarCertificadosPolizasColectivas  tbody').on('click', '.consultarPolizaCertificado', function () {
				self.editarFormularioCertificados = undefined;
				var modalPoli = $('#tablaConsultarCertificadosPolizasColectivas').DataTable().row($(this).parents('tr')).data();
				self.editarFormularioCertificados = JSON.parse(JSON.stringify(modalPoli));
				self.editarFormularioCertificados.totalPrima = mainServices.setCurrency(self.editarPolizasFormulario.totalPrima);
				self.editarFormularioCertificados.montoDeducible = mainServices.setCurrency(self.editarPolizasFormulario.montoDeducible);

				//Terminar de llenar
				//$('#consultarPolizaColectivas').modal('show');

				$('.activarVerDetallePolizaCertificado').click();
				self.editarFormularioCertificados.recibos = [];
				console.log(self.editarFormularioCertificados);
				// $('.activarModalPolizaColectiva').click();
			});

			$('#tablaConsultarCertificadosPolizasColectivas  tbody').on('click', '.editarPolizaCertificado', function () {
				self.editarPolizasFormulario = undefined;
				var modalPoliza = $('#tablaConsultarCertificadosPolizasColectivas').DataTable().row($(this).parents('tr')).data();

				self.editarPolizasFormulario = angular.copy(modalPoliza);

				self.editarPolizasFormulario.tipoDocumentoT = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(0, 1);
				self.editarPolizasFormulario.nuRifAseguradoTomador = self.editarPolizasFormulario.nuRifAseguradoTomador.substring(2, self.editarPolizasFormulario.nuRifAseguradoTomador.length);
				self.editarPolizasFormulario.tipoDocumentoAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(0, 1);
				self.editarPolizasFormulario.nuRifAsegurado = self.editarPolizasFormulario.nuRifAsegurado.substring(2, self.editarPolizasFormulario.nuRifAsegurado.length);

				self.editarPolizasFormulario.totalPrima = self.editarPolizasFormulario.totalPrima.split(".")[0];
				self.editarPolizasFormulario.montoDeducible = self.editarPolizasFormulario.montoDeducible;
				self.polizaCertificado = (self.editarPolizasFormulario.tipoPoliza == 'C' && self.editarPolizasFormulario.numeroCertificado != "0");
				self.polizasIndividual = false;
				self.polizaColectiva = false;

				$("#editarSelectDocumentoPoliza").addClass('disabled');
				$("#editarDocumentoPoliza").addClass('disabled');
				$("#edtiarpolizaTomador").addClass('disabled');

				$('.activarEditarPolizaIndividual').click();
			});

			$('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});

		};

		$('.polizas.collapse-link').on('click', function () {

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

		this.mismoTomadorSwitch = function (mismo) {
			console.log('** on mismoTomadorSwitch.. **');
			switch (mismo) {
				case 's':
					self.mismoTomadorCheck.s = 'iradio_flat-green checked';
					self.mismoTomadorCheck.n = 'iradio_flat-green';
					console.log('** on mismoTomadorSwitch. > s **');
					break;
				case 'n':
					self.mismoTomadorCheck.n = 'iradio_flat-green checked';
					self.mismoTomadorCheck.s = 'iradio_flat-green';
					console.log('** on mismoTomadorSwitch. > n **');
					break;
				default:
					break;
			}
		};

		this.cargaCheckSwitch = function (mismo) {
			console.log('** on mismoTomadorSwitch.. **');
			switch (mismo) {
				case 'v':
					self.cargaCheck.v = 'iradio_flat-green checked';
					self.cargaCheck.per = 'iradio_flat-green';
					self.cargaCheck.pa = 'iradio_flat-green';
					break;
				case 'per':
					self.cargaCheck.v = 'iradio_flat-green';
					self.cargaCheck.per = 'iradio_flat-green checked';
					self.cargaCheck.pa = 'iradio_flat-green';
					break;
				case 'pa':
					self.cargaCheck.v = 'iradio_flat-green';
					self.cargaCheck.per = 'iradio_flat-green';
					self.cargaCheck.pa = 'iradio_flat-green checked';
					break;
				default:
					break;
			}
		};
		this.reciboSwitch = function (mismo) {
			console.log('** on mismoTomadorSwitch.. **');
			switch (mismo) {
				case 's':
					self.reciboCheck.s = 'iradio_flat-green checked';
					self.reciboCheck.n = 'iradio_flat-green';
					self.reciboCheck.bool = true;
					console.log('** on mismoTomadorSwitch. > s **');
					break;
				case 'n':
					self.reciboCheck.n = 'iradio_flat-green checked';
					self.reciboCheck.s = 'iradio_flat-green';
					self.reciboCheck.bool = false;
					console.log('** on mismoTomadorSwitch. > n **');
					break;
				default:
					break;
			}
		};

		$('[data-toggle="tooltip"]').tooltip({
			container: 'body'
		});
	}]);

})();
