(function(){

  'use strict';

  var renovacionesServices = angular.module('DGBOSS.renovacionesServices', []);

  renovacionesServices.service('renovacionesServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;
    
    this.consultarRenovaciones = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/renovaciones/consultar_renovaciones',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
				'numeroPoliza': params.numeroPoliza,
				'idAseguradora': params.idAseguradora,
				'feVigInicio': params.feVigInicio,
				'feVigFin': params.feVigFin
		 }
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

	this.consultarPolizasVencer = function(params){
      console.log('on service..');
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/renovaciones/consultar_polizas_vencer',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
				'idAseguradora': params.idAseguradora,
				'feVigInicio': params.feVigInicio,
				'feVigFin': params.feVigFin
		 }
        });
      
    };
    
    this.agregarRenovaciones = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/renovaciones/update_renovaciones',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
			  'id': params.id,
			  'ci_rif': params.id,
			  'feEmision':params.id,
			  'feFin':params.id,
			  'feInicio':params.id,
			  'feSubcripcion':params.id,
			  'feVigFin':params.id,
			  'feVigInicio': params.id,
			  'idAsegurado': params.id,
			  'idAseguradora': params.id,
			  'idEmpresa': params.id,
			  'idFreqPago': params.id,
			  'idMoneda': params.id,
			  'idRamo': params.id,
			  'idTomador': params.id,
			  'numeroPoliza': params.numeroPoliza,
			  'tipoDoc': params.tipoDoc,
			  'tipoMovimiento':params.tipoMovimiento,
			  'tipoPago': params.tipoPago,
			  'tipoPoliza': params.tipoPoliza,
			  'totalPrima': params.totalPrima,
			  'tiposCoberturas':{
					'ano': params.tiposCoberturas.ano,
					'capCarga': params.tiposCoberturas.capCarga,
					'ciRifCond': params.tiposCoberturas.ciRifCond,
					'color': params.tiposCoberturas.color,
					'condNombre': params.tiposCoberturas.condNombre,
					'id': params.tiposCoberturas.id,
					'idMarca': params.tiposCoberturas.idMarca,
					'idModelo': params.tiposCoberturas.idModelo,
					'idTipoVehiculo': tiposCoberturas.empresa.idTipoVehiculo,
					'lugarUso': params.tiposCoberturas.lugarUso,
					'nuPasajeros': params.tiposCoberturas.nuPasajeros,
					'placa': params.tiposCoberturas.placa,
					'serialCarroceria': params.tiposCoberturas.serialCarroceria,
					'serialMotor': params.tiposCoberturas.serialMotor
				},
				'coberturas':{
					'action': params.coberturas.action,
					'id': params.coberturas.id,
					'idCobertura': params.coberturas.idCobertura,
					'sumaAsegurada': params.coberturas.sumaAsegurada,
					'tipoCobertura': params.coberturas.tipoCobertura
				},
				'usuarios':{
					'accion':params.usuarios.action,
					'idUsuario':params.usuarios.idUsuario,
					'tipoUsuario': params.usuarios.tipoUsuario
				}
			}
          });
	};
		
    this.consultarPolizaReporte = function(params){
      return $http({
        url: mainServices.getURL() + '/poliza/get_polizas_filtros',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params
      });
    };

    this.consultarPolizaReporteDetalle = function(params){
      return $http({
        url: mainServices.getURL() + '/poliza/detalle_historico',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: params
      });
    };   
    

  }]);

  //renovacionesServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //renovacionesServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');
})();