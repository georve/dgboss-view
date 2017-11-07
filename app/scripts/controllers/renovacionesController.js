(function(){

  'use strict';

  var renovacionesController = angular.module('DGBOSS.renovacionesController',   ['DGBOSS.renovacionesServices','DGBOSS.polizaServices','DGBOSS.inicioServices']);

  renovacionesController.controller('renovacionesController', ['$scope', '$rootScope', 'mainServices', 'renovacionesServices', 'polizaServices', 'vehiculoServices','inicioServices',function($scope, $rootScope, mainServices, renovacionesServices, polizaServices, vehiculoServices,inicioServices){

    var self = this;

    console.log('renovacionesController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      agregarRenovacion: false,
      editarRenovacion: false,
      listarRenovaciones: false,
			verRenovaciones: false,
			repoPolizas: false,
			repoPolizasDetalle: false
    };

    this.nuevaRenovacion = {
      nombre: undefined,
      codigo: undefined,
      descripcion: undefined
    };

    this.codigoBackUp = undefined;

		this.fechaConsulta = {
			inicio: undefined,
			fin: undefined
		};

    this.nombreEliminarRenovacion;
    this.eliminarRenovacion = undefined;

    this.renovacionEditar = {};

    this.renovacionModal = undefined;

    this.renovaciones = [];

		this.adicional = {
			id:undefined,
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined
    };

		this.beneficiario = {
			id:undefined,
			nbNombreCompleto: undefined,
			nuCedulaRif: undefined,
			inSexo: undefined,
			feNacimiento: undefined,
			nbParentesco: undefined,
			accion: undefined
		};

		this.productor = {
			nbNombreCompleto: undefined,
			nbPrimerNombre: undefined,
			nbPrimerApellido: undefined,
			numeroRifUsuario: undefined,
			nbUsuarioApp: undefined
		};

    /********************************************************************************************
    **                                      VARIABLES  AUXILIARES                              **
    ********************************************************************************************/

		this.mismoTomadorCheck = {
			s: 'iradio_flat-green checked',
			n: 'iradio_flat-green'
		};

		this.modalControl = {
			si:false,
			no:false
		};
		this.montoReciboNuevo = undefined;
		this.recibo = {
			recibo: undefined,
			poliza: undefined,
			idlocalidad: undefined,
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

    this.ListaAseguradoras = [];
    this.ListaMonedas = [];
    this.ListaLocalidades = [];
    this.ListaFrecuenciaPago = [
			{ nbPago: 'Semanal', coPago: 1 },
			{ nbPago: 'Mensual', coPago: 2 },
			{ nbPago: 'Trimestral', coPago: 3 },
			{ nbPago: 'Semestral', coPago: 4 },
			{ nbPago: 'Anual', coPago: 5 }
    ];
    this.listaMarca = [];
    this.listaModelo = [];
    this.listaVersion = [];
    this.agregarPolizaFormulario = undefined;
    this.maskIdentifacionAsegurado = undefined;
    this.maskIdentifacionVehiculo =  undefined;

		/*
			Datos del Acordeon de 'Coberturas'
		*/
		this.selecBasica = undefined;
		this.sumaAseguBasica = undefined;
		this.ListaSelecBasica = [];

		this.selecOpcional = undefined;
		this.sumaAseguOpcional = undefined;
		this.ListaSelecOpcional = [];

		this.listaCoberturas = [];
	
		this.datoFiltros = {
				nuRifEmpresa: undefined,
				numeroPoliza: undefined,
				coRamo: undefined,
				rifAseguradora: undefined,
				feHasta: undefined, 
				feDesde: undefined,
				rifTomador:undefined
		};  
		
		this.listaReportePolizas = [];
		this.listaReporteDetallePolizas =  [];
		this.ListaAseguradoras = [];		

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

    this.consultarRenovacionesServices = function(opcion){
      //LLAMAR AL SERVICIO
				var params = {};
			switch(opcion){
				case 'buscar':
					params.feVigInicio = 	mainServices.revertDate(angular.copy(self.fechaConsulta.inicio));
					params.feVigFin = 	mainServices.revertDate(angular.copy(self.fechaConsulta.fin));
				break;
				default:
					params = {};
				break;
			};
			self.fechaConsulta.inicio = undefined;
			self.fechaConsulta.fin = undefined;
       renovacionesServices.consultarPolizasVencer(params)
        .success(function (data) {

          console.log(data);
          self.renovaciones = [];

          for (var i = 0; i < data.length; i++) {
           self.renovaciones.push(data[i]);
           switch(self.renovaciones[i].tipoPoliza){
              case 'C':
                self.renovaciones[i].tipoPoliza ='Colectiva';
                break;
              case 'I':
              self.renovaciones[i].tipoPoliza ='Individual';
                break;
              default:
                break;
            };
            switch(self.renovaciones[i].estatus){
              case 1:
                self.renovaciones[i].estatus ='Vigente';
                break;
              case 0:
              self.renovaciones[i].estatus ='Anulada';
                break;
              default:
                break;
            };
          };
          console.log(self.renovaciones);

          self.viewsController('listarRenovaciones');

          if (!$.fn.DataTable.isDataTable('#tablaConsultarRenovaciones')) {
            self.createTable();
          } else {
            self.destroyTable();
          }

          data = undefined;
        })
        .error(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          console.log('Error..');/*
            self.renovaciones = [
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "AUT",
                "estatus": '1',
                "feEmision": "2017-07-11",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-11",
                "feVigInicio": "2017-07-18",
                "idFreqPago": 2,
                "idMoneda": 5,
                "nbAsegurado": "ADRIANA  RIVAS ",
                "nbAseguradora": "Mapfre La Seguridad C.A. de Seguros",
                "nbAseguradoTomador": "ADRIANA  RIVAS ",
                "nbMoneda": "EURO",
                "nbOpcionRamo": "AUTO CASCO",
                "nbRamo": "AUTOMOVIL",
                "numeroCertificado": "0",
                "numeroPoliza": "5003",
                "nuRifAsegurado": "V-15700584",
                "nuRifAseguradora": "J-00021410-7",
                "nuRifAseguradoTomador": "V-15700584",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "AUC",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PAT",
                "estatus": '1',
                "feEmision": "2017-06-27",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-17",
                "feVigInicio": "2017-07-10",
                "idFreqPago": 1,
                "idMoneda": 2,
                "nbAsegurado": "Jesus Guerra ",
                "nbAseguradora": "Seguros Carabobo, C.A.",
                "nbAseguradoTomador": "Jesus Guerra ",
                "nbMoneda": "DOLARES",
                "nbOpcionRamo": "RIESGOS DIVERSOS (LAPTOPS)",
                "nbRamo": "PATRIMONIAL",
                "numeroCertificado": "0",
                "numeroPoliza": "3001",
                "nuRifAsegurado": "V-1158434",
                "nuRifAseguradora": "J-00034022-6",
                "nuRifAseguradoTomador": "V-1158434",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "RDL",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PAT",
                "estatus": '1',
                "feEmision": "2017-06-27",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-03",
                "feVigInicio": "2017-07-03",
                "idFreqPago": 3,
                "idMoneda": 4,
                "nbAsegurado": "Jesus Guerra ",
                "nbAseguradora": "Estar Seguros, S.A.",
                "nbAseguradoTomador": "Jesus Guerra ",
                "nbMoneda": "FLORIN ANTILLAS HOLANDESAS",
                "nbOpcionRamo": "TODO RIESGO INDUSTRIAL",
                "nbRamo": "PATRIMONIAL",
                "numeroCertificado": "0",
                "numeroPoliza": "3003",
                "nuRifAsegurado": "V-1158434",
                "nuRifAseguradora": "J-00007587-5",
                "nuRifAseguradoTomador": "V-1158434",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "TRI",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PAT",
                "estatus": '1',
                "feEmision": "2017-07-05",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-11",
                "feVigInicio": "2017-07-03",
                "idFreqPago": 2,
                "idMoneda": 1,
                "nbAsegurado": "ADRIANA  RIVAS ",
                "nbAseguradora": "Bolivariana de Seguros y Reaseguros, S.A.",
                "nbAseguradoTomador": "ADRIANA  RIVAS ",
                "nbMoneda": "BOLIVARES",
                "nbOpcionRamo": "RIESGOS DIVERSOS (LAPTOPS)",
                "nbRamo": "PATRIMONIAL",
                "numeroCertificado": "0",
                "numeroPoliza": "1204",
                "nuRifAsegurado": "V-15700584",
                "nuRifAseguradora": "G-20009043-0",
                "nuRifAseguradoTomador": "V-15700584",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "RDL",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PAT",
                "estatus": '1',
                "feEmision": "2017-07-18",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-10",
                "feVigInicio": "2017-07-10",
                "idFreqPago": 3,
                "idMoneda": 3,
                "nbAsegurado": "Joshua Guerra",
                "nbAseguradora": "Adriática de Seguros, C.A.",
                "nbAseguradoTomador": "Joshua Guerra",
                "nbMoneda": "YEN JAPONES",
                "nbOpcionRamo": "RIESGOS DIVERSOS (LAPTOPS)",
                "nbRamo": "PATRIMONIAL",
                "numeroCertificado": "0",
                "numeroPoliza": "5001",
                "nuRifAsegurado": "V-23110143",
                "nuRifAseguradora": "J-00000447-1",
                "nuRifAseguradoTomador": "V-23110143",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "RDL",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PER",
                "estatus": '1',
                "feEmision": "2017-06-12",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-09",
                "feVigInicio": "2017-07-17",
                "idFreqPago": 3,
                "idMoneda": 2,
                "nbAsegurado": "Jesus Guerra ",
                "nbAseguradora": "Seguros Horizonte, C.A.",
                "nbAseguradoTomador": "Jesus Guerra ",
                "nbMoneda": "DOLARES",
                "nbOpcionRamo": "GLOBAL BENEFITS",
                "nbRamo": "PERSONA",
                "numeroCertificado": "0",
                "numeroPoliza": "3002",
                "nuRifAsegurado": "V-1158434",
                "nuRifAseguradora": "G-876879328",
                "nuRifAseguradoTomador": "V-1158434",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "GBEN",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PER",
                "estatus": '1',
                "feEmision": "2017-07-10",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-04",
                "feVigInicio": "2017-07-18",
                "idFreqPago": 3,
                "idMoneda": 3,
                "nbAsegurado": "ADRIANA  RIVAS ",
                "nbAseguradora": "C.N.A. de Seguros La Previsora",
                "nbAseguradoTomador": "ADRIANA  RIVAS ",
                "nbMoneda": "YEN JAPONES",
                "nbOpcionRamo": "HOSPITAL CLINICA MATERNIDAD",
                "nbRamo": "PERSONA",
                "numeroCertificado": "0",
                "numeroPoliza": "5004",
                "nuRifAsegurado": "V-15700584",
                "nuRifAseguradora": "J-00021376-3",
                "nuRifAseguradoTomador": "V-15700584",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "HCM",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              },
              {
                "adicionales": 'null',
                "beneficiarios": 'null',
                "coberturas": 'null',
                "comisiones": 'null',
                "coRamo": "PER",
                "estatus": '0',
                "feEmision": "2017-07-18",
                "feSubcripcion": 'null',
                "feVigFin": "2017-07-18",
                "feVigInicio": "2017-07-18",
                "idFreqPago": 3,
                "idMoneda": 2,
                "nbAsegurado": "Joshua Guerra",
                "nbAseguradora": "Adriática de Seguros, C.A.",
                "nbAseguradoTomador": "Joshua Guerra",
                "nbMoneda": "DOLARES",
                "nbOpcionRamo": "HOSPITAL CLINICA MATERNIDAD",
                "nbRamo": "PERSONA",
                "numeroCertificado": "0",
                "numeroPoliza": "5002",
                "nuRifAsegurado": "V-23110143",
                "nuRifAseguradora": "J-00000447-1",
                "nuRifAseguradoTomador": "V-23110143",
                "nuRifEmpresa": "J402457111",
                "opcionRamo": "HCM",
                "recibos": 'null',
                "sumaAsegurada": 'null',
                "tipoPoliza": "C",
                "tiposCoberturas": 'null',
                "tipoTomador": 'null',
                "totalPrima": "0.0"
              }
            ];
            for(var i = 0; i < self.renovaciones.length ;i++){
              switch(self.renovaciones[i].tipoPoliza){
                case 'C':
                  self.renovaciones[i].tipoPoliza ='Individual';
                  break;
                case 'I':
                self.renovaciones[i].tipoPoliza ='Colectiva';
                  break;
                default:
                  break;
              };
              switch(self.renovaciones[i].estatus){
                case '1':
                  self.renovaciones[i].estatus ='Vigente';
                  break;
                case '0':
                self.renovaciones[i].estatus ='Anulada';
                  break;
                default:
                  break;
              };
            }; */
          if (!$.fn.DataTable.isDataTable('#tablaConsultarRenovaciones')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        });
    };

    this.consultarRenovacionesDetalleServices = function(model){
      console.log(self.renovacionModal);
      switch(self.renovacionModal.estatus){
          case 'Vigente':
            self.renovacionModal.estatus = 1;
            break;
          case 'Anulada':
          self.renovacionModal.estatus = 0;
            break;
          default:
            break;
        };
      self.renovacionModal.adicionales = [];
      self.renovacionModal.beneficiarios = [];
      self.renovacionModal.comisiones = [];
      self.renovacionModal.recibos = [];
      self.renovacionModal.tiposCoberturas = undefined;
      self.renovacionModal.coberturas = [];
			renovacionesServices.consultarDetallePolizas(self.renovacionModal)
				.success(function (data) {
					self.renovacionModal.adicionales = [];
					self.renovacionModal.beneficiarios = [];
					self.renovacionModal.comisiones = [];
					self.renovacionModal.recibos = [];
					self.renovacionModal.tiposCoberturas = undefined;
					self.renovacionModal.coberturas = [];
					console.log(model, data);
					self.renovacionModal.nbAsegurado = data[0].nbAsegurado;
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							self.renovacionModal.coberturas = JSON.parse(JSON.stringify(data[0].coberturas));
						}
					}
					//se llena adicionales
					if (data[0].adicionales != null) {
						if (data[0].adicionales.length > 0) {
							self.renovacionModal.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.renovacionModal.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
							self.renovacionModal.comisiones = JSON.parse(JSON.stringify(data[0].comisiones));
						}
					}
					//se llena recibos solo del primero
					if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.renovacionModal.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					}
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.renovacionModal.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
					}
					// SE AGREGAN LO DETALLES D LA POLIZA
					console.log(model, self.renovacionModal);
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

    this.consultarEditarRenovacionesDetalleServices = function(){
      console.log(self.renovacionEditar);
      switch(self.renovacionEditar.estatus){
          case 'Vigente':
            self.renovacionEditar.estatus = 1;
            break;
          case 'Anulada':
          self.renovacionEditar.estatus = 0;
            break;
          default:
            break;
        };
      self.renovacionEditar.adicionales = [];
      self.renovacionEditar.beneficiarios = [];
      self.renovacionEditar.comisiones = [];
      self.renovacionEditar.recibos = [];
      self.renovacionEditar.tiposCoberturas = undefined;
      self.renovacionEditar.coberturas = [];
			renovacionesServices.consultarDetallePolizas(self.renovacionEditar)
				.success(function (data) {
          self.consultarCoberturasService();
          self.renovacionEditar.adicionales = [];
					self.renovacionEditar.beneficiarios = [];
					self.renovacionEditar.comisiones = [];
					self.renovacionEditar.recibos = [];
					self.renovacionEditar.tiposCoberturas = undefined;
					self.renovacionEditar.coberturas = [];
					self.renovacionEditar.nbAsegurado = data[0].nbAsegurado;
					//se llena coberturas
					if (data[0].coberturas != null) {
						if (data[0].coberturas.length > 0) {
							for (var i = 0; i < data[0].coberturas.length; i++) {
								self.renovacionEditar.coberturas.push({
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
							self.renovacionEditar.adicionales = JSON.parse(JSON.stringify(data[0].adicionales));
						}
					}
					//se llena beneficiarios
					if (data[0].beneficiarios != null) {
						if (data[0].beneficiarios.length > 0) {
							self.renovacionEditar.beneficiarios = JSON.parse(JSON.stringify(data[0].beneficiarios));
						}
					}
					//se llena comisiones
					if (data[0].comisiones != null) {
						if (data[0].comisiones.length > 0) {
							for (var i = 0; i < data[0].comisiones.length; i++) {
								var prod = self.buscarProductor(data[0].comisiones[i].numeroRifUsuario);
								self.renovacionEditar.comisiones.push({
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
					/* if (data[0].recibos != null) {
						if (data[0].recibos.length > 0) {
							self.renovacionEditar.recibos = JSON.parse(JSON.stringify(data[0].recibos[0]));
						}
					} */
					//se llena recibos solo del primero
					if (data[0].tiposCoberturas != null) {
						if (data[0].tiposCoberturas.length > 0) {
							self.renovacionEditar.tiposCoberturas = JSON.parse(JSON.stringify(data[0].tiposCoberturas[0]));
						}
          }
          switch(data[0].coRamo){
            case'AUT':
            if(self.polizaCertificado || self.polizasIndividual){
              self.renovacionEditar.vehiculo = self.renovacionEditar.tiposCoberturas;
								self.renovacionEditar.vehiculo = self.renovacionEditar.tiposCoberturas;
								self.renovacionEditar.tiposCoberturas.txColor == 'null'? self.renovacionEditar.tiposCoberturas.txColor = '' : self.renovacionEditar.tiposCoberturas.txColor;
								self.renovacionEditar.tiposCoberturas.serialMotor == 'null'? self.renovacionEditar.tiposCoberturas.serialMotor ='' : self.renovacionEditar.tiposCoberturas.serialMotor;
								self.renovacionEditar.tiposCoberturas.serialCarroceria == 'null'? self.renovacionEditar.tiposCoberturas.serialCarroceria ='' : self.renovacionEditar.tiposCoberturas.serialCarroceria;
								self.renovacionEditar.tiposCoberturas.nuPasajeros == 'null'? self.renovacionEditar.tiposCoberturas.nuPasajeros ='' : self.renovacionEditar.tiposCoberturas.nuPasajeros;
								self.renovacionEditar.tiposCoberturas.capCarga == 'null'? self.renovacionEditar.tiposCoberturas.capCarga ='' : self.renovacionEditar.tiposCoberturas.capCarga;
								self.renovacionEditar.tiposCoberturas.lugarUso == 'null'? self.renovacionEditar.tiposCoberturas.lugarUso ='' : self.renovacionEditar.tiposCoberturas.lugarUso;
								self.renovacionEditar.tiposCoberturas.idTipoVehiculo == 'null'? self.renovacionEditar.tiposCoberturas.idTipoVehiculo ='' : self.renovacionEditar.tiposCoberturas.idTipoVehiculo;
								self.renovacionEditar.tiposCoberturas.condNombre == 'null'? self.renovacionEditar.tiposCoberturas.condNombre ='' : self.renovacionEditar.tiposCoberturas.condNombre;
								if(self.renovacionEditar.vehiculo.ciRifCond !=  'null'){
									self.renovacionEditar.vehiculo.tipoDocumentoV = self.renovacionEditar.vehiculo.ciRifCond.substring(0, 1);
									self.renovacionEditar.vehiculo.ciRifCond = self.renovacionEditar.vehiculo.ciRifCond.substring(2, self.renovacionEditar.vehiculo.ciRifCond.length);
								}else{
									self.renovacionEditar.vehiculo.ciRifCond = '';
								}
							self.renovacionEditar.vehiculo.idMarca  = parseInt(self.renovacionEditar.vehiculo.idMarca);
							self.renovacionEditar.vehiculo.idModelo = parseInt(self.renovacionEditar.vehiculo.idModelo);
            }
            break;
            default:
            break;
          };
					// SE AGREGAN LO DETALLES D LA POLIZA
          data = undefined;
          console.log(self.renovacionEditar);
          self.viewsController('editarRenovacion');
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

		this.getListOfValues = function () {
      self.consultarMonedasServices();
      self.consultarMarcas();
      self.consultarModelos();
      self.consultarLocalidades();
			//self.consultarRamosService();
      self.consultarProductoresServices();
		};

    this.consultarLocalidades = function(){
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
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
    };

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

      $('#aseguradoraRenovacion').autocomplete({
        lookup: self.ListaAseguradoras,
        onSelect: function (suggestion) {
          console.log('onSelect', suggestion);
          self.renovacionEditar.nuRifAseguradora = suggestion.data;
          suggestion = null;
          $('#aseguradoraRenovacion').closest('.item').removeClass('bad').find('.alert').remove();
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

					$('#productorSelectRenovaciones').autocomplete({
						lookup: self.listaAuxProductores,
						onSelect: function (suggestion) {
							console.log('onSelect', suggestion);
							self.productor.numeroRifUsuario = suggestion.data;
							suggestion = null;
							console.log(self.productorPolizasColectivas);
							$('#productorSelectRenovaciones').closest('.item').removeClass('bad').find('.alert').remove();
						}
					});
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
		};

		this.consultarCoberturasService = function () {
			var params = {
				coRamo: self.renovacionEditar.opcionRamo
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
     }


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
				})
				.error(function (data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					console.log('Error..');
				});
    };

		this.consultarMarcas = function () {
			var params = {
				'idMarca': 0
			};
			vehiculoServices.consultarMarcasVehiculo(params)
				.success(function (data) {
          console.log('marca',data);
          self.listaMarca = data;
          data= undefined;
				})
				.error(function () {
					//self.vehiculo.ano = undefined;
				});

		};

		this.consultarModelos = function () {
			var params = {
				'idMarca': 0

			};
			polizaServices.consultarModelosVehiculo(params)
				.success(function (data) {
					self.listaModelo = data;
          console.log('modelo',data);
          data= undefined;
				})
				.error(function () {
					//self.vehiculo.marca.codigo = undefined;
				});

		};

    this.guardarRenovacionServices = function (){
			var params = angular.copy(self.agregarPolizaFormulario);
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

			console.log('params',params);
			polizaServices.agregarPoliza(params)
				.success(function (data) {
					console.log(data);

            if (data.codigo = 200) {
						self.cancelar();
            new PNotify({
              title: '¡Póliza renovada!',
              text: 'La póliza fue renovada con éxito.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });

					} else {
								new PNotify({
									title: '¡Error!',
									text: 'Hubo un error al momento de renovar la póliza.',
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


		this.consultarPolizaReporte = function(datoFiltros){
				self.listaReportePolizas = [];
				
				var params = {
						nuRifEmpresa: mainServices.getRifEmpresa(),
						numeroPoliza: datoFiltros.numeroPoliza ? datoFiltros.numeroPoliza:'',
						numeroCertificado: 0,
						nuCedula:'',
						coRamo: datoFiltros.coRamo ? datoFiltros.coRamo:'',
						cedRifAsegurado: '',
						rifAseguradora: datoFiltros.rifAseguradora ? datoFiltros.rifAseguradora:'',
						rifTomador: datoFiltros.rifTomador ? datoFiltros.rifTomador:'',
						idMoneda: 0,
						feHasta: datoFiltros.feHasta ? mainServices.revertDate(datoFiltros.feHasta):'', 
						feDesde: datoFiltros.feDesde ? mainServices.revertDate(datoFiltros.feDesde):''
				};
				console.log('renovacionesServices', renovacionesServices);
				renovacionesServices.consultarPolizaReporte(params)
						.success(function (data) {
								for (var i = 0; i < data.length; i++) {
										self.listaReportePolizas.push(data[i]);
										self.listaReportePolizas[i].coRamo = self.listaReportePolizas[i].coRamo == 'PAT' ? 'Patrimonial': self.listaReportePolizas[i].coRamo == 'AUT' ? 'Automovil':'Persona';
										//nombre de la aseguradora
								};

								if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasReporte')) {
										self.createTableReportePoliza();
								} else {
										self.destroyTableReportePoliza();
								}
						})
						.error(function (data, status, headers, config) {
								if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasReporte')) {
										self.createTableReportePoliza();
								} else {
										self.destroyTableReportePoliza();
								}
								new PNotify({
										title: '¡Alerta!',
										text: data.mensaje,
										type: 'notice',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
								});

						});
				
				self.viewsController('repoPolizas');
		};

		this.consultarPolizaReporteDetalle = function(reciboReporteConsulta){
				self.listaReporteDetallePolizas = [];
				
				var params = {
						nuRifEmpresa: mainServices.getRifEmpresa(),
						numeroPoliza: reciboReporteConsulta.numeroPoliza ? reciboReporteConsulta.numeroPoliza:'',
						coRamo: reciboReporteConsulta.coRamo == 'Patrimonial' ? 'PAT': reciboReporteConsulta.coRamo == 'Automovil' ? 'AUT':'PER',
						rifAseguradora: reciboReporteConsulta.nuRifAseguradora ? reciboReporteConsulta.nuRifAseguradora:'',
						rifTomador: reciboReporteConsulta.rifTomador ? reciboReporteConsulta.rifTomador:'',
				};

				renovacionesServices.consultarPolizaReporteDetalle(params)
						.success(function (data) {
								for (var i = 0; i < data.length; i++) {
										self.listaReporteDetallePolizas.push(data[i]);
										self.listaReporteDetallePolizas[i].ramo = self.listaReporteDetallePolizas[i].ramo == 'PAT' ? 'Patrimonial': self.listaReporteDetallePolizas[i].ramo == 'AUT' ? 'Automovil':'Persona';
										self.listaReporteDetallePolizas[i].fecha = mainServices.revertDate(self.listaReporteDetallePolizas[i].fecha);
								};
						
								if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasReporteDetalle')) {
										self.createTableReportePolizaDetalle();
								} else {
										self.destroyTableReportePolizaDetalle();
								}
						})
						.error(function (data, status, headers, config) {
								if (!$.fn.DataTable.isDataTable('#tablaConsultarPolizasReporteDetalle')) {
										self.createTableReportePolizaDetalle();
								} else {
									self.destroyTableReportePolizaDetalle();
								}
								new PNotify({
										title: '¡Alerta!',
										text: data.mensaje,
										type: 'notice',
										styling: 'bootstrap3',
										cornerclass: 'ui-pnotify-sharp'
								});

						});
				
				self.viewsController('repoPolizas');
		};		
    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){
        case 'agregarRenovacion':
          self.views.agregarRenovacion = true;
          console.log('viewsController > agregarRenovacion');
          break;
        case 'editarRenovacion':
          self.views.editarRenovacion = true;
          console.log('viewsController > editarRenovacion');
          break;
        case 'listarRenovaciones':
          self.views.listarRenovaciones = true;
          console.log('viewsController > listarRenovaciones');
          break;
        case 'verRenovaciones':
          self.views.verRenovaciones = true;
          console.log('viewsController > verRenovaciones');
					break;
        case 'repoPolizas':
          self.views.repoPolizas = true;
          console.log('viewsController > repoPolizas');
          break;				
        case 'repoPolizasDetalle':
          self.views.repoPolizasDetalle = true;
          console.log('viewsController > repoPolizasDetalle');
          break;				
				default:
          break;
      }
     console.log(self.views);
    };

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

		this.tipoCedulaSwitch = function () {
			console.log('me llamaron');
      switch (self.renovacionEditar.tipoDocumentoT) {
        case 'V':
          self.maskIdentifacionAsegurado = '9?9?999999';
          break;
        case 'E':
          self.maskIdentifacionAsegurado = '9?9?999999';
          break;
        default:
          self.maskIdentifacionAsegurado = '9?9?9?9999999';
          break;
      };
      if (self.renovacionEditar.tipoDocumentoT != undefined && self.renovacionEditar.nuRifAseguradoTomador != undefined) {
        self.maskIdentifacionAsegurado = undefined;
        var params = {
          "cedulaRif": self.renovacionEditar.tipoDocumentoT + "-" + self.renovacionEditar.nuRifAseguradoTomador
        };

				polizaServices.consultarAsegurado(params)
          .success(function (data) {
						console.log('Asegurado', data);
						if(data.length >0 ){
              if (data[0] != undefined) {
                self.renovacionEditar.nbAseguradoTomador = data[0].nbPrimerNombre+' '+data[0].nbPrimerApellido;
              }
						}else{
								self.renovacionEditar.nbAseguradoTomador = '';
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
		};

		this.tipoCedulaSwitchVehiculo = function () {
			console.log('me llamaron');
			self.maskIdentifacionVehiculo = undefined;
			switch (self.renovacionEditar.vehiculo.tipoDocumentoV) {
				case 'V':
					self.maskIdentifacionVehiculo = '9?9999999';
					break;
				case 'E':
					self.maskIdentifacionVehiculo = '9?9999999';
					break;
				default:
					self.maskIdentifacionVehiculo = '9?9?99999999';
					break;
			};
		};

  /*Inicio funciones para agregar,editar y elminar   */
		this.agregarCobetura = function (elemt) {
			var bool = false;
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
            console.log('cobertura 3', self.selecBasica);
            var basica = {};
            for (var i = 0; i < self.ListaSelecBasica.length; i++) {
              if (self.ListaSelecBasica[i].coCobertura == self.selecBasica) {
                basica = self.ListaSelecBasica[i];
              }
            }

            self.renovacionEditar.coberturas.push({
							id: self.id != undefined ?self.id:0,
              idCobertura: basica.coCobertura,
              nuPoliza: self.renovacionEditar.numeroPoliza,
              nuCertificado: self.renovacionEditar.numeroCertificado,
              nombre: basica.nbCobertura,
              tipo: 'Básica',
              sumaAsegurada: self.sumaAseguBasica,
							estatus: 1,
							accion: null
            });
            self.sumaAseguBasica = undefined;
            self.selecBasica = undefined;
						bool = true;
						self.id = undefined ;
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
            self.renovacionEditar.coberturas.push({
							id: self.id != undefined ?self.id : 0,
              idCobertura: cobertura.coCobertura,
              nuPoliza: self.renovacionEditar.numeroPoliza,
              nuCertificado: self.renovacionEditar.numeroCertificado,
              nombre: cobertura.nbCobertura,
              tipo: 'Opcional',
              sumaAsegurada: self.sumaAseguOpcional,
							estatus: 1,
							accion: null
            });
            self.sumaAseguOpcional = undefined;
            self.selecOpcional = undefined;
						bool = true;
						self.id = undefined ;
          }
          break;
        default:
          break;
      };


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
      var a = self.renovacionEditar.coberturas.indexOf(elemt);
      switch (elemt.tipo) {
        case 'Básica':
          self.sumaAseguBasica = elemt.sumaAsegurada;
          self.selecBasica = elemt.idCobertura;
          self.id = elemt.id;
          self.renovacionEditar.coberturas.splice(a, 1);
          break;
        case 'Opcional':
          self.sumaAseguOpcional = elemt.sumaAsegurada;;
          self.selecOpcional = elemt.idCobertura;
          self.id = elemt.id;
          self.renovacionEditar.coberturas.splice(a, 1);
          break;
        default:
          break;
      };

		};

		this.eliminarCobertura = function (elemt) {
				self.auxIndice = self.renovacionEditar.coberturas.indexOf(elemt);
				self.auxNombreDeLista = 'Cobertura';
				self.mensaje = 'La cobertura ';
				$('.eliminarRenovacionModal').modal({
					show: 'true'
				});
		};
	/*Fin funciones para agregar,editar y elminar   */

  /* Inicio funciones para agregar,editar y elminar   */
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
			if (self.renovacionEditar.beneficiarios.length > 0) {
				for (var i = 0; i < self.renovacionEditar.beneficiarios.length; i++) {
					if (self.renovacionEditar.beneficiarios[i].nuCedulaRif == self.beneficiario.nuCedulaRif || self.renovacionEditar.beneficiarios[i].nbNombreCompleto == self.beneficiario.nbNombreCompleto) {
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
					self.beneficiario.accion = null;
					self.beneficiario.estatus = 1;
					if(self.beneficiario.id == undefined)
						self.beneficiario.id = 0;

					self.renovacionEditar.beneficiarios.push(self.beneficiario);
					self.beneficiario = undefined;
			}
			console.log('self.renovacionEditar.beneficiarios', self.renovacionEditar.beneficiarios);
		};

		this.editarBeneficiario = function (elemt) {
      var a = self.renovacionEditar.beneficiarios.indexOf(elemt);
      self.beneficiario = self.renovacionEditar.beneficiarios[a];
      self.renovacionEditar.beneficiarios.splice(a, 1);
		};

		this.eliminarBeneficiario = function (elemt) {
      self.auxNombreDeLista = 'Beneficiario';
      self.mensaje = 'el  beneficiario';
      $('.eliminarRenovacionModal').modal({
        show: 'true'
      });
      self.auxIndice = self.renovacionEditar.beneficiarios.indexOf(elemt);
		};
	/*Fin funciones para agregar,editar y elminar   */

  /*Inicio funciones para agregar,editar y elminar   */
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
			if (self.renovacionEditar.adicionales.length > 0) {
				for (var i = 0; i < self.renovacionEditar.adicionales.length; i++) {
					console.log(self.renovacionEditar.adicionales);
					if (self.renovacionEditar.adicionales[i].nuCedulaRif == self.adicional.nuCedulaRif || self.renovacionEditar.adicionales[i].nbNombreCompleto == self.adicional.nbNombreCompleto) {
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
        self.adicional.accion = null;
				self.adicional.estatus = 1;

				if(self.adicional.id == undefined)
					self.adicional.id = 0;

        self.renovacionEditar.adicionales.push(self.adicional);
        self.adicional = undefined;
			}
		};

		this.editarAdicional = function (elemt) {
      var a = self.renovacionEditar.adicionales.indexOf(elemt);
      self.adicional = self.renovacionEditar.adicionales[a];
      self.renovacionEditar.adicionales.splice(a, 1);
		};

		this.eliminarAdicional = function (elemt) {
				self.auxIndice = self.renovacionEditar.adicionales.indexOf(elemt);
				self.auxNombreDeLista = 'Adicional';
				self.mensaje = 'el  adicional';
				$('.eliminarRenovacionModal').modal({
					show: 'true'
				});
		};
	/*Fin funciones para agregar,editar y elminar   */

	/*Inicio funciones para agregar,editar y elminar   */
		this.agregarProductor = function () {
			var validatorResult = validator.checkAll($('#productorEditarSelect'));
			var bool = true;
			var comision = 0;
			if (self.renovacionEditar.comisiones.length > 0) {
				for (var i = 0; i < self.renovacionEditar.comisiones.length; i++) {
					console.log('self.productor.nbPrimerNombre', self.productor.nbPrimerNombre);
					if (self.renovacionEditar.comisiones[i].numeroRifUsuario == self.productor.numeroRifUsuario) {
						if (self.renovacionEditar.comisiones[i].accion == 'D') {
							self.renovacionEditar.comisiones[i].accion = null;
							self.setObjectElems(self.productor, undefined);
							document.getElementById("productorSelectRenovaciones").value = "";
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

					self.renovacionEditar.comisiones.push({
						id: self.productor.id != 0 ? self.productor.id : 0,
						nbPrimerNombre: prod.nbPrimerNombre,
						nbPrimerApellido: prod.nbPrimerApellido,
						numeroRifUsuario: self.productor.numeroRifUsuario,
						numeroPoliza: self.renovacionEditar.numeroPoliza,
						nombreUsuarioApp: prod.nbUsuarioApp,
						nbNombreCompleto: prod.nbPrimerNombre + ' ' + prod.nbSegundoNombre + ' ' + prod.nbPrimerApellido + ' ' + prod.nbSegundoApellido,
						coRamo: self.renovacionEditar.coRamo,
						nuRifEmpresa: mainServices.getRifEmpresa(),
						accion: null
					});

					self.setObjectElems(self.productor, undefined);
					document.getElementById("productorSelectRenovaciones").value = "";
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
		};

		this.editarProductor = function (elemt) {
			var a = self.renovacionEditar.comisiones.indexOf(elemt);
			self.productor = self.renovacionEditar.comisiones[a];
			console.log(self.productor);
			self.renovacionEditar.comisiones.splice(a, 1);
		};

		this.eliminarProductor = function (elemt) {
			for (var i = 0; i < self.renovacionEditar.comisiones.length; i++) {
				if (self.renovacionEditar.comisiones[i].numeroRifUsuario == elemt.numeroRifUsuario) {
					self.auxNombreDeLista = 'Productor';
					self.auxIndice = i;
					self.mensaje = 'el  productor ' + self.renovacionEditar.comisiones[i].nbPrimerNombre + ' ' + self.renovacionEditar.comisiones[i].nbPrimerApellido;
					$('.eliminarRenovacionModal').modal({
						show: 'true'
					});
					break;
				}
			};

		};
	/*Fin funciones para agregar,editar y elminar   */

		/* this.agregarRenovacion = function(){
			var validatorResult = validator.checkAll($('#formularioAgregarRenovacion'));

			if(validatorResult){

				var nombreExistente = false, codigoExistente = false;

				for(var i = 0; i < self.renovaciones.length; i ++){
					if(self.renovaciones[i].nombre == self.nuevaRenovacion.nombre){
						nombreExistente = true;
						console.log('Nombre Existente');
						break;
					}else if(self.renovaciones[i].codigo == self.nuevaRenovacion.codigo){
						codigoExistente = true;
						console.log('Código Existente');
						break;
					}
				}

				if(nombreExistente){
					new PNotify({
						title: '¡Error!',
						text: 'El nombre del renovacion ya se encuentra registrado.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}else if(codigoExistente){
					new PNotify({
						title: '¡Error!',
						text: 'El código del renovacion ya se encuentra registrado.',
						type: 'error',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});
				}else{

					//******************
					//LLAMAR AL SERVICIO
					//******************

					self.renovaciones.push({
						nombre: self.nuevaRenovacion.nombre,
						codigo: self.nuevaRenovacion.codigo.toString(),
						descripcion: self.nuevaRenovacion.descripcion
					});


					new PNotify({
						title: '¡Renovacion creado!',
						text: 'El renovacion fue creado con éxito.',
						type: 'success',
						styling: 'bootstrap3',
						cornerclass: 'ui-pnotify-sharp'
					});

					self.setObjectElems(self.nuevaRenovacion, undefined);
				}
			}
		}; */

    this.guardarRenovacion = function(){
			self.agregarPolizaFormulario = undefined;
			var validatorResult = validator.checkAll($('#renovacionesDatosIndivual'));
			var validatorResultRecibo = validator.checkAll($('#renovacionesIndivualAgregarReciboFormulario'));
			var validatorVehiculo =  validator.checkAll($('#renovacionesVehiculos'));

			var datosGenerales = $('#renovacionesDatosGenerales'),
				vistaVehiculos = $('#renovacionesVehiculos'),
				vistaContratro = $('#polizaDatosContrato'),
				vistaContragarante = $('#polizaDatosContragarante'),
				vistaFianza = $('#polizaDatosFianza'),
				vistaCobertura = $('#renovacionesCobertura'),
				vistaAdicional = $('#renovacionesCoberturaAdicionales'),
				vistaBeneficiarios = $('#renovacionesCoberturaBeneficiarios'),
				vistaProductor = $('#renovacionesDatosProductor'),
				vistaRecibo = $('#renovacionesIndivualAgregarReciboFormulario');
			var bool = false;

			if(self.polizasIndividual || self.polizaCertificado){
				if (self.renovacionEditar.coRamo == 'AUT' && !validatorVehiculo) {
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
			if (parseFloat(self.renovacionEditar.totalPrima) < parseFloat(self.recibo.montoRecibo) || parseFloat(self.renovacionEditar.totalPrima) < parseFloat(self.recibo.comision.montoComision)) {
					if (parseFloat(self.renovacionEditar.totalPrima) < parseFloat(self.recibo.montoRecibo)) {
						new PNotify({
							title: 'Error',
							text: 'El monto del recibo execede el monto prima de la póliza.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
						validatorResult = !validatorResult;
					} else {
						new PNotify({
							title: 'Error',
							text: 'El monto de la comisión execede el monto prima de la póliza.',
							type: 'error',
							styling: 'bootstrap3',
							cornerclass: 'ui-pnotify-sharp'
						});
						validatorResult = !validatorResult;
					}
			}

			if (validatorResult && validatorResultRecibo) {
				var listaVehiculos = [];
				if (self.renovacionEditar.coRamo == 'AUT' && (self.polizasIndividual || self.polizaCertificado)) {
					listaVehiculos.push({
						placa: self.renovacionEditar.vehiculo.placa,
						serialCarroceria: self.renovacionEditar.vehiculo.carroceria,
						serialMotor: self.renovacionEditar.vehiculo.serial,
						txColor: self.renovacionEditar.vehiculo.color,
						nuPasajeros: self.renovacionEditar.vehiculo.pasajeros,
						idTipoVehiculo: self.renovacionEditar.vehiculo.tipo,
						ano: self.renovacionEditar.vehiculo.ano,
						capCarga: self.renovacionEditar.vehiculo.carga,
						idModelo: self.renovacionEditar.vehiculo.idModeloVehiculo,
						lugarUso: self.renovacionEditar.vehiculo.uso,
						condNombre: self.renovacionEditar.vehiculo.conductor,
						ciRifCond: self.renovacionEditar.vehiculo.documento,
						idMarca: self.renovacionEditar.vehiculo.idMarca,
						idVersion: self.renovacionEditar.vehiculo.version
					});
					console.log(listaVehiculos);
				}

					self.recibo.poliza = self.renovacionEditar.numeroPoliza;
					self.recibo.coRamo = self.renovacionEditar.coRamo;
					self.recibo.nuRifEmpresa = self.recibo.comision.nuRifEmpresa = mainServices.getRifEmpresa();
					self.recibo.comision.id = 0;
					self.recibo.comision.nombreUsuarioApp = mainServices.getUser();
					self.recibo.comision.numeroRecibo = self.recibo.recibo;
					self.recibo.isGlobal = self.renovacionEditar.isGlobal;
					self.recibo.numeroCertificado = self.renovacionEditar.numeroCertificado = 0;
					self.recibo.estatusRecibo = 'Pendiente';
					self.recibo.comision.estatus = 'Pendiente';

					switch(self.renovacionEditar.tipoPoliza){
						case 'Individual':
						 self.renovacionEditar.tipoPoliza = 'I';
						break;
						case 'Colectiva':
						 self.renovacionEditar.tipoPoliza = 'C';
						break;
					};

					if (self.renovacionEditar.coberturas.length > 0) {
						for (var i = 0; i < self.renovacionEditar.coberturas.length; i++) {
							self.renovacionEditar.coberturas[i].tipo = undefined;
							self.renovacionEditar.coberturas[i].nombre = undefined;
						}
					}

					self.agregarPolizaFormulario = {
						numeroPoliza: self.renovacionEditar.numeroPoliza,
						numeroCertificado: self.renovacionEditar.numeroCertificado,
						idTomador: self.renovacionEditar.tipoDocumentoT+'-'+self.renovacionEditar.nuRifAseguradoTomador,
						idAsegurado:self.renovacionEditar.tipoDocumentoAsegurado+'-'+self.renovacionEditar.nuRifAsegurado,
						idAseguradora:self.renovacionEditar.nuRifAseguradora,
						idMoneda: self.renovacionEditar.idMoneda,
						feInicio: self.renovacionEditar.feInicio,
						feFin: self.renovacionEditar.feFin,
						feEmision: self.renovacionEditar.feEmision,
						feSubcripcion: self.renovacionEditar.feSubcripcion,
						feVigInicio: self.renovacionEditar.feVigInicio,
						feVigFin: self.renovacionEditar.feVigFin,
						totalPrima: self.renovacionEditar.totalPrima,
						montoDeducible: self.renovacionEditar.montoDeducible,
						coRamo: self.renovacionEditar.coRamo,
						coSubRamo: self.renovacionEditar.opcionRamo,
						tpPoliza:  self.renovacionEditar.tipoPoliza,
						idEmpresa: undefined,//Se setea el valor en el servicio
						frecuenciaPago: self.renovacionEditar.idFreqPago,
						coberturas: JSON.parse(JSON.stringify(self.renovacionEditar.coberturas)),
						comisiones: JSON.parse(JSON.stringify(self.renovacionEditar.comisiones)),
						//ejecutivos: JSON.parse(JSON.stringify(self.ejecutivos)),
						beneficiarios: JSON.parse(JSON.stringify(self.renovacionEditar.beneficiarios)),
						adicionales: JSON.parse(JSON.stringify(self.renovacionEditar.adicionales)),
						recibo: [JSON.parse(JSON.stringify(self.recibo))],
						vehiculos: listaVehiculos, //PREGUNTAR A FABIAN
						estatus: 1,
						isGlobal: self.renovacionEditar.isGlobal
					};
					console.log(self.agregarPolizaFormulario);

					self.guardarRenovacionServices();


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
		};

    this.cancelar = function(){
			self.setObjectElems(self.renovacionEditar, undefined);
			self.setObjectElems(self.adicional, undefined);
			self.setObjectElems(self.beneficiario, undefined);
			self.setObjectElems(self.productor, undefined);
      self.cleanDates();
      self.consultarRenovacionesServices('');
    };

    this.verRenovacion = function(){
      this.consultarRenovacionesDetalleServices('verRenovacionModal');
    };

    this.editarRenovacionFn = function(renovacion){

      console.log('** on editarRenovacion function..**');
      this.consultarEditarRenovacionesDetalleServices();
    };

    this.cancelarEditarRenovacion = function(){
      self.viewsController('listarRenovaciones');
      self.editarRenovacion = undefined;

      for(var i = 0; i < self.renovaciones.length; i ++){
        if(self.renovaciones[i].codigo == self.codigoBackUp){
          self.renovaciones[i].editar = false;
          break;
        }
      }
    };

    this.eliminarRenovacionFn = function(renovacion){
      self.nombreEliminarRenovacion = renovacion.nombre;
      self.eliminarRenovacion = renovacion;

      $('.eliminarRenovacionModal').modal({
        show: 'true'
      });
    };

    this.eliminarModal = function(opcion){
      switch(opcion){
        case 'aceptar':
					//CALL SERVICE
					$('.modal-backdrop').remove();
					console.log(self.auxNombreDeLista);
					switch (self.auxNombreDeLista) {
						case 'Cobertura':
                if (self.renovacionEditar.coberturas[self.auxIndice].id != undefined && self.renovacionEditar.coberturas[self.auxIndice].id != 0 )
                  self.renovacionEditar.coberturas[self.auxIndice].accion = 'D';
                else
                  self.renovacionEditar.coberturas.splice(self.auxIndice, 1);
							break;
						case 'Adicional':
              if (self.renovacionEditar.adicionales[self.auxIndice].estatus != 1)
                self.renovacionEditar.adicionales[self.auxIndice].accion = 'D';
              else
                self.renovacionEditar.adicionales.splice(self.auxIndice, 1);
              console.log(self.renovacionEditar.adicionales);
							break;
						case 'Beneficiario':
              if (self.renovacionEditar.beneficiarios[self.auxIndice].estatus != 1)
                self.renovacionEditar.beneficiarios[self.auxIndice].accion = 'D';
              else
                self.renovacionEditar.beneficiarios.splice(self.auxIndice, 1);
              console.log(self.renovacionEditar.beneficiarios);
							break;
						case 'Contragarante':
							break;
						case 'Fianza':
							break;
						case 'Productor':
              if (self.renovacionEditar.comisiones[self.auxIndice].id != undefined)
                self.renovacionEditar.comisiones[self.auxIndice].accion = 'D';
              else
                self.renovacionEditar.comisiones.splice(self.auxIndice, 1);
              console.log(self.renovacionEditar.comisiones);
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

		this.buscarProductor = function (identidad) {
			for (var i = 0; i < self.listaProductores.length; i++) {
				if (self.listaProductores[i].nuCedulaRif == identidad) {
					console.log('self.productor', self.listaProductores[i]);
					return self.listaProductores[i];
				}
			};
			return false;
    };

		this.buscarRenovaciones = function(){
			self.consultarRenovacionesServices('buscar');
			self.cambiarFecha('fechaFinConsultarRenovaciones',undefined,undefined);
			self.cambiarFecha('fechaInicioConsultarRenovaciones',undefined,undefined);
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
			var  totalPrima = 0;
			var cantRecibos = 0;
			self.montoReciboNuevo = 0;
			var idfreq = 0;

				totalPrima = self.renovacionEditar.totalPrima;
				idfreq = self.renovacionEditar.idFreqPago;
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
						if((self.recibo.montoRecibo < montoReciboNuevo || self.recibo.montoRecibo > montoReciboNuevo)&&(self.renovacionEditar.numeroCertificado == 0)){
								$('.actualizarMontoRenovacionModal').modal({
										show: 'true'
								});
						}
				};
		
		this.beforeRenderEmision = function ($dates) {
		  /* disable future dates */
		  for(var i=0; i < $dates.length;i++) {
			if(new Date().getTime() < $dates[i].utcDateValue) {
				$dates[i].selectable = false;
			}
		  }
		};

		this.setCurrencyModal = function(value){
			return mainServices.setCurrency(value);
		};

		this.consultarPoliza = function (){
				var bool = true;
				if(self.datoFiltros.rifAseguradora != undefined ||  document.getElementById("datoFiltrosNuRifAseguradoraPoliza").value != ""){
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
				if(self.datoFiltros.rifTomador != undefined && self.datoFiltros.rifTomador !=''){
					if(self.datoFiltros.rifTomador.substring(0, 1) != 'V' && self.datoFiltros.rifTomador.substring(0, 1) != 'E'){
							new PNotify({
								title: 'Error',
								text: 'No introdujo un documento de identidad valido para el tomador',
								type: 'error',
								styling: 'bootstrap3',
								cornerclass: 'ui-pnotify-sharp'
							});
							bool = false; 
						} 
				} 						
				if(
				(self.datoFiltros.rifTomador == undefined || self.datoFiltros.rifTomador == '')&&	
				(self.datoFiltros.rifAseguradora == undefined || self.datoFiltros.rifAseguradora == '')&&    
				(self.datoFiltros.numeroPoliza == undefined || self.datoFiltros.numeroPoliza == '')&&
				(document.getElementById("datoFiltrosNuRifAseguradoraPoliza").value  == '')&&
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
					self.consultarPolizaReporte(self.datoFiltros);   

		};
		
    this.cancelarConsultarPoliza = function(){
			self.listaReportePolizas = [];  
			self.destroyTableReportePoliza();      
			self.setObjectElems(self.datoFiltros, undefined);
			document.getElementById("datoFiltrosNuRifAseguradoraPoliza").value = "";   
			self.cambiarFecha('filtroPolizaFeHastaOcu',undefined,undefined);
			self.cambiarFecha('filtroPolizaFeDesdeOcu',undefined,undefined);         
		};
				
    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/
    $rootScope.$on('agregarRenovacion', function(){
      self.viewsController('agregarRenovacion');
    });

    $rootScope.$on('editarRenovacion', function(){
      self.viewsController('editarRenovacion');
    });

    $rootScope.$on('listarRenovaciones', function(){
     self.getListOfValues();
     self.consultarRenovacionesServices('');
    });

		$rootScope.$on('repoPolizas', function () {
			self.ListaAseguradoras = [];
			var auxList = mainServices.getAseguradoras();
			for (var i = 0; i < auxList.length; i++) {
					self.ListaAseguradoras.push({
					data: auxList[i].nu_rif,
					value: auxList[i].nb_aseguradora
					});
			};          
			$('#datoFiltrosNuRifAseguradoraPoliza').autocomplete({
					lookup: self.ListaAseguradoras,
					onSelect: function (suggestion) {
					self.datoFiltros.rifAseguradora = suggestion.data;
					suggestion = null;
					$('#datoFiltrosNuRifAseguradoraPoliza').closest('.item').removeClass('bad').find('.alert').remove();
					}
			});
			self.cancelarConsultarPoliza();
			self.viewsController('repoPolizas');
		});
		
    // $('#formularioAgregarRenovacionNombre').on('blur', 'null', validator.checkField);
    // $('#formularioAgregarRenovacionSwift').on('blur', 'null', validator.checkField);
    $('#formularioAgregarRenovacionDescripcion').on('blur', 'null', validator.checkField);
		$('#fechaEmisionRenovacion').on('blur', 'null', validator.checkField);
		$('#vigenciaDesdeRenovacion').on('blur', 'null', validator.checkField);
		$('#vigenciaHastaRenovacion').on('blur', 'null', validator.checkField);
		$('#formularioAgregarPolizaReciboVigenciaDesde').on('blur', 'null', validator.checkField);
		$('#formularioAgregarPolizaReciboVigenciaHasta').on('blur', 'null', validator.checkField);
		$('#formularioAgregarPolizaReciboFechaEmision').on('blur', 'null', validator.checkField);
		$('#formularioAgregarPolizaReciboFechaRecepcion').on('blur', 'null', validator.checkField);

    this.destroyTable = function () {
			$('#tablaConsultarRenovaciones tbody').off('click');
      $('#tablaConsultarRenovaciones').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTable = function () {
			var permisos = mainServices.getPermisos();
			var edit = false;
			var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Ver póliza"  class="verRenovacion cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
					<i class="fa fa-search"></i>\
				</a>\
			</td>';

			for( var i = 0; i < permisos.length; i ++ ){
				if((permisos[i].coPermiso == 'addRenov' && permisos[i].inEstatus == 1))
					edit = true;
			};
			if (edit|| mainServices.isAdmin() == 1){
				var htmlButtons ='<td style="text-align: center;">\
				<a data-toggle="tooltip" data-placement="top" title="Ver póliza"  class="verRenovacion cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
					<i class="fa fa-search"></i>\
				</a>\
				<a data-toggle="tooltip" data-placement="top" title="Renovar póliza" class="editarRenovacion cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
					<i class="fa fa-refresh"></i>\
				</a>\
			</td>';
			}

      $('#tablaConsultarRenovaciones').DataTable({
        data: self.renovaciones,
        aoColumns: [
          { 'data': 'numeroPoliza', sDefaultContent: '' },
          { 'data': 'nbAseguradora', sDefaultContent: '' },
          { 'data': 'nbAsegurado', sDefaultContent: '' },
          //{ 'data': 'nbOpcionRamo', sDefaultContent: '' },
          { 'data': 'feVigInicio', sDefaultContent: '' },
          { 'data': 'feVigFin', sDefaultContent: '' },
          { 'data': 'tipoPoliza', sDefaultContent: '' },
          { 'data': 'estatus', sDefaultContent: '' },
          {
            'defaultContent': '<td style="text-align: center;">\
                                <a data-toggle="tooltip" data-placement="top" title="Ver póliza"  class="verRenovacion cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a data-toggle="tooltip" data-placement="top" title="Renovar póliza" class="editarRenovacion cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-refresh"></i>\
                                </a>\
                              </td>'
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });
      $('#tablaConsultarRenovaciones tbody').on('click', '.verRenovacion', function () {
        var consulRenovacion = $('#tablaConsultarRenovaciones').DataTable().row($(this).parents('tr')).data();

        self.renovacionModal = JSON.parse(JSON.stringify(consulRenovacion));

        console.log(self.renovacionModal);

        $('.activarModalRenovacion').click();
      });

      $('#tablaConsultarRenovaciones tbody').on('click', '.editarRenovacion', function () {
        var editarReno = $('#tablaConsultarRenovaciones').DataTable().row($(this).parents('tr')).data();

        angular.copy(editarReno,self.renovacionEditar);
        self.renovacionEditar.feEmision = undefined;
         self.renovacionEditar.feVigFin = undefined
        self.renovacionEditar.feVigInicio = undefined
        self.renovacionEditar.tipoDocumentoT = self.renovacionEditar.nuRifAseguradoTomador.substring(0, 1);
        self.renovacionEditar.nuRifAseguradoTomador = self.renovacionEditar.nuRifAseguradoTomador.substring(2, self.renovacionEditar.nuRifAseguradoTomador.length);
        self.renovacionEditar.tipoDocumentoAsegurado = self.renovacionEditar.nuRifAsegurado.substring(0, 1);
        self.renovacionEditar.nuRifAsegurado = self.renovacionEditar.nuRifAsegurado.substring(2, self.renovacionEditar.nuRifAsegurado.length);

        self.renovacionEditar.totalPrima = self.renovacionEditar.totalPrima.split(".")[0];

        if(self.renovacionEditar.tipoPoliza == 'Individual' && self.renovacionEditar.numeroCertificado == "0"){
          self.polizasIndividual= true;
          self.polizaColectiva = false;
			  	self.polizaCertificado = false;
        }
        if(self.renovacionEditar.tipoPoliza == 'Colectiva' && self.renovacionEditar.numeroCertificado == "0"){
          self.polizasIndividual= false;
          self.polizaColectiva = true;
			  	self.polizaCertificado = false;
        }
        if(self.renovacionEditar.tipoPoliza == 'Colectiva' && self.renovacionEditar.numeroCertificado != "0"){
          self.polizasIndividual= false;
          self.polizaColectiva = false;
			  	self.polizaCertificado = true;
        }
        console.log(self.renovacionEditar);

        $('.activarEditarRenovacion').click();
			});

			$('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			});
    };

    this.createTableReportePoliza = function () {
			var htmlButtons ='<td style="text-align: center;">\
                <a style="margin-right: 10px" data-toggle="modal" class="verPolizaReporteModal">\
                  <i class="fa fa-search"></i>\
                </a>\
              </td>';
            $('#tablaConsultarPolizasReporte').DataTable({
                data: self.listaReportePolizas,
                aoColumns: [
                    { 'data': 'numeroPoliza', sDefaultContent: '' },
                    { 'data': 'coRamo', sDefaultContent: '' },
                    { 'data': 'nbAseguradora', sDefaultContent: '' },
					{ 'data': 'nuRifAseguradora', sDefaultContent: '' },
                    { 'data': 'nuRifAseguradoTomador', sDefaultContent: '' },
                    {
                        'defaultContent': htmlButtons
                    }
                ],
                columnDefs: [
                    { "className": "text-center", "targets": "_all" }
                ]
            });


            $('#tablaConsultarPolizasReporte tbody').on('click', '.verPolizaReporteModal', function () {
				console.log('jquery add event');
                var reciboReporteConsulta = angular.copy($('#tablaConsultarPolizasReporte').DataTable().row($(this).parents('tr')).data());
				console.log('parametros  ', reciboReporteConsulta);
                self.consultarPolizaReporteDetalle(reciboReporteConsulta);    
            });
    };

		this.destroyTableReportePoliza = function () {
				$('#tablaConsultarPolizasReporte').dataTable().fnDestroy();
				self.viewsController('repoPolizas');
				self.createTableReportePoliza();
		};        

		this.createTableReportePolizaDetalle = function(){
				self.viewsController('repoPolizasDetalle');
				$('#tablaConsultarPolizasReporteDetalle').DataTable({
						data: self.listaReporteDetallePolizas,
						aoColumns: [
								{ 'data': 'fechaOperacion', sDefaultContent: '' },
								{ 'data': 'ramo', sDefaultContent: '' },
								{ 'data': 'usuario', sDefaultContent: '' },
								{ 'data': 'operacion', sDefaultContent: '' },
								{ 'data': 'observaciones', sDefaultContent: '' }
						],
						columnDefs: [
								{ "className": "text-center", "targets": "_all" }
						]
				});
		};

		this.destroyTableReportePolizaDetalle = function () {
				$('#tablaConsultarPolizasReporteDetalle').dataTable().fnDestroy();
				self.createTableReportePolizaDetalle();
		}; 		
		// Validaciones para datetimepiker

		this.cambiarFecha = function (id, starDate, Endate) {
			console.log(id);
			$('#' + id).closest('.item')
				.removeClass('bad')
				.find('.alert').remove();
			self.starDate = starDate;
			self.Endate = Endate;
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
			self.cambiarFecha('fechaEmisionRenovacion',undefined,undefined);
			self.cambiarFecha('vigenciaDesdeRenovacion',undefined,undefined);
			self.cambiarFecha('vigenciaHastaRenovacion',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaReciboVigenciaDesde',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaReciboVigenciaHasta',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaReciboFechaEmision',undefined,undefined);
			self.cambiarFecha('formularioAgregarPolizaReciboFechaRecepcion',undefined,undefined);
		};
		// Fin de Validaciones para datetimepiker


    $('.renovaciones.collapse-link').on('click', function() {

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
