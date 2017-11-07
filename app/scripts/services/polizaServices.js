(function () {

  'use strict';

  var polizaServices = angular.module('DGBOSS.polizaServices', []);

  polizaServices.service('polizaServices', ['$http', 'mainServices', function ($http, mainServices) {
    console.log('polizaServices activated..')

    var self = this;
    //console.log(dgBossURL);

    this.consultarAsegurados = function () {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/asegurado/consultar_asegurado',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'id': 0
        }
      });
    };

    this.consultarAsegurado = function (params) {
      console.log('on service consultarAsegurado..', params);
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/asegurado/consultar_asegurado',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'inTipoPersona': params.cedulaRif.split('-')[0],
          'nuCedulaRif': params.cedulaRif.split('-')[1],
          'rifEmpresa': mainServices.getRifEmpresa()
        }
      });
    };

    this.consultarAseguradoras = function () {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/aseguradoras/get_aseguradoras',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idAseguradora': 0
        }
      });

    };

    this.consultarMonedas = function () {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/moneda/consultar_moneda',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idMoneda': 0
        }
      });
    };

    this.consultarRamos = function () {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/ramo/consultar_ramo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idTipoRamo': 0
        }
      });

    };

    this.consultarByRamos = function () {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/ramo/consultar_lista_ramo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

    };

    this.consultarCoberturas = function (params) {
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
        url: mainServices.getURL() + '/cobertura/consultar_cobertura_ramo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'coRamo': params.coRamo
        }
      });
    };

    this.consultarMarcasVehiculo = function (params) {
      console.log('on service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/vehiculo/consultar_marca_vehiculo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idMarca': params.idMarca
        }
      });
    };

    this.consultarModelosVehiculo = function (params) {
      console.log('on service..');
      console.log(params);
      return $http({
        url: mainServices.getURL() + '/vehiculo/consultar_modelo_vehiculo',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'idMarca': params.idMarca
        }
      });
    };

    this.consultarPolizas = function () {
      console.log('on service.. get_polizas');
      return $http({
        url: mainServices.getURL() + '/poliza/get_polizas',
        method: 'GET'
      });
    };

    this.consultarDetallePolizas = function (params) {
      console.log('on service.. consultar_poliza_detalle');
      return $http({
        url: mainServices.getURL() + '/poliza/consultar_poliza_detalle',
        method: 'POST',
        data: params
      });
    };

    this.consultarPolizasCertificados = function (params) {
      console.log('on agregarPolizaVehiculo service..');
      return $http({
        url: mainServices.getURL() + '/certificadoPoliza/consultar_certificado_poliza',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "nuPoliza": params.nroPoliza
        }
      });
    };

    this.consultarCertificadosColectiva = function (params) {
      console.log('on agregarPolizaVehiculo service..');
      return $http({
        url: mainServices.getURL() + '/certificadoPoliza/consultar_certificado_colectiva',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "nuPoliza": params.nroPoliza
        }
      });
    };

    this.consultarLocalidad = function (){
      console.log('consultarLocalidades');
      return $http({
        url: mainServices.getURL() + '/admin/consultar_localidades',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "id": 0
        }
      });
    };

    this.consultarProductores = function () {
      console.log('consultarProductores');
      return $http({
        url: mainServices.getURL() + '/admin/consultar_productores',
        method: 'POST'
      });
    };


    this.agregarPoliza = function (params) {
      console.log('on agregarPolizaVehiculo service..', params);
      return $http({
        url: mainServices.getURL() + '/poliza/saveUpdate',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'numeroPoliza': params.numeroPoliza,
          'numeroCertificado': params.numeroCertificado,
          'nuRifAseguradoTomador': params.idTomador,
          'nuRifAsegurado': params.idAsegurado,
          'nuRifAseguradora': params.idAseguradora,
          'idMoneda': params.idMoneda,
          'feInicio': params.feInicio,
          'feEmision': params.feEmision,
          'feSubcripcion': params.feSubcripcion,
          'feVigInicio': params.feVigInicio,
          'feVigFin': params.feVigFin,
          'sumaAsegurada': params.sumaAsegurada,
          'totalPrima': params.totalPrima,
		  'montoDeducible': params.montoDeducible,
          'coRamo': params.coRamo,
          'opcionRamo': params.coSubRamo,
          'tipoPoliza': params.tpPoliza,
          'nuRifEmpresa': mainServices.getRifEmpresa(),
          'idFreqPago': params.frecuenciaPago,
          'coberturas': params.coberturas,
          'recibos': params.recibo,
          'comisiones': params.comisiones,
          'tiposCoberturas': params.vehiculos,
          'beneficiarios': params.beneficiarios,
          'adicionales': params.adicionales,
          'estatus': params.estatus,
          'isGlobal':params.isGlobal
        }
      });
    };
	
	 this.actualizarPoliza = function (params) {
      console.log('on actualizarPolizaVehiculo service..', params);
      return $http({
        url: mainServices.getURL() + '/poliza/actualizar_poliza',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'numeroPoliza': params.numeroPoliza,
          'numeroCertificado': params.numeroCertificado,
          'nuRifAseguradoTomador': params.idTomador,
          'nuRifAsegurado': params.idAsegurado,
          'nuRifAseguradora': params.idAseguradora,
          'idMoneda': params.idMoneda,
          'feInicio': params.feInicio,
          'feEmision': params.feEmision,
          'feSubcripcion': params.feSubcripcion,
          'feVigInicio': params.feVigInicio,
          'feVigFin': params.feVigFin,
          'sumaAsegurada': params.sumaAsegurada,
          'totalPrima': params.totalPrima,
		  'montoDeducible': params.montoDeducible,
          'coRamo': params.coRamo,
          'opcionRamo': params.coSubRamo,
          'tipoPoliza': params.tpPoliza,
          'nuRifEmpresa': mainServices.getRifEmpresa(),
          'idFreqPago': params.frecuenciaPago,
          'coberturas': params.coberturas,
          'recibos': params.recibo,
          'comisiones': params.comisiones,
          'tiposCoberturas': params.vehiculos,
          'beneficiarios': params.beneficiarios,
          'adicionales': params.adicionales,
          'estatus': params.estatus,
          'isGlobal':params.isGlobal
        }
      });
    };

    this.AgregarPolizasCertificados = function (params) {
      console.log('on agregarPolizaVehiculo service..');
      return $http({
        url: mainServices.getURL() + '/certificadoPoliza/insert_update_certificado_poliza',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "idCertificadoPoliza": 0,
          "idPoliza": 1,//cambiar
          "idAsegurado": 1,
          "fechaVencimiento": "2017-06-06",
          "numeroCertificado": 12345,
          "tipoPago": "EFECTIVO",
          "fechaInclusion": "2017-06-06"
        }
      });
    };

    this.actualizarMontoPrima = function (params){
      console.log('on actualizarMontoPrima service..');
      return $http({
        url: mainServices.getURL() + '/poliza/actualizar_poliza_monto_prima',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "numeroPoliza": params.numeroPoliza,
          "numeroCertificado": params.numeroCertificado,
          "coRamo": params.coRamo,
          "montoPrima": params.montoPrima,
          "rifEmpresa": mainServices.getRifEmpresa(),
          "rifUsuario": mainServices.getRifUser()
        }
      });
    };

	
	this.anularPoliza = function (params){
      console.log('on anular poliza service..');
      return $http({
        url: mainServices.getURL() + '/poliza/anular_poliza',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "nuRifEmpresa": mainServices.getRifEmpresa(),
          "nuPoliza": params.nuPoliza,
          "inCertificado": params.inCertificado,
          "nuCedulaAsegurado": params.nuCedulaAsegurado,
          "coRamo": params.coRamo,
          "nuRifAseguradora": params.nuRifAseguradora,
		  "observacion": params.observacion,
		  "usuario": params.usuario
		  }
      });      
    };
	
	
    this.cargarArchivoPoliza = function(file,option){
      console.log('onUploadFileToUrl..');
      var fd = new FormData();
      fd.append('file', file);
      switch (option){
        case 'auto':
          return $http.post(mainServices.getURL() + '/file/upload_poliza_auto', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });
          break;
        case 'persona':
          return $http.post(mainServices.getURL() + '/file/upload_poliza_persona', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });
          break;
        case 'patrimoniales':
          return $http.post(mainServices.getURL() + '/file/upload_poliza_patrimoniales', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          });
          break;
      };
    };

    this.generarReciboAutomatico=function(params){
      return $http({
        url: mainServices.getURL() + '/letterservices/enviar_carta_email',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "module": params.module,
          "template":params.template,
          "fileName":params.fileName,
          "email":params.email,
          "nbAsegurado":params.nbAsegurado,
          "parameters": params.parameters
        }
      });

    };

  }]);

  //polizaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //polizaServices.constant('dgBossURL', 'http://dgfarmdv01:8082/dgboss-services/rest');
  //polizaServices.constant('dgBossURL', 'http://localhost:8082/dgboss-services/rest');
})();
