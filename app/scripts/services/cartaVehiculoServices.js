(function(){

  'use strict';

  var cartaVehiculoServices = angular.module('DGBOSS.cartaVehiculoServices', []);

  	cartaVehiculoServices.service('cartaVehiculoServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;

	this.generarReporteCambioIntermediario = function(params){
	    console.log('on generarReporteCambioIntermediario Service..');
	    console.log(params);
	    return $http({
	        url: mainServices.getURL() + '/cartavehiculo/reporte_cambio_intermediario',
	        method: 'POST',
	        headers: {'Content-Type': 'application/json'},
	        data:{
	        	'logoAseguradora':params.logoAseguradora,
	    		'fecha':params.fecha,
	    		'aseguradora':params.aseguradora,
	    		'empresa':params.empresa,
	    		'rif':params.rif,
	    		'asegurado':params.asegurado,
	    		'marca':params.marca,
	    		'modelo':params.modelo,
	    		'placa':params.placa,
	    		'numeroPoliza':params.numeroPoliza,
	    		'empleadoEmpresa':params.empleadoEmpresa,
	    		'cargoEmpleado':params.cargoEmpleado,
	    		'telefonoEmpresa':params.telefonoEmpresa,
	    		'direccionEmpresa':params.direccionEmpresa,
	    		'webEmpresa':params.webEmpresa
	        },
	        responseType: 'arraybuffer'

	      });

	  };

	  this.generarReporteDocumentoSuscribir = function(params){
		    console.log('on generarReporteDocumentoSuscribir Service..');
		    console.log(params);
		    return $http({
		        url: mainServices.getURL() + '/cartavehiculo/reporte_documento_suscribir',
		        method: 'POST',
		        headers: {'Content-Type': 'application/json'},
		        data:{
		        	'logoAseguradora':params.logoAseguradora,
		    		'fecha':params.fecha,
		    		'numeroCarta':params.numeroCarta,
		    		'asegurado':params.asegurado,
		    		'empleadoEmpresa':params.empleadoEmpresa,
		    		'cargoEmpleado':params.cargoEmpleado,
		    		'telefonoEmpresa':params.telefonoEmpresa,
		    		'direccionEmpresa':params.direccionEmpresa,
		    		'webEmpresa':params.webEmpresa
		        },
		        responseType: 'arraybuffer'

		      });

		  };

	  this.generarReporteEnvioCheque = function(params){
		    console.log('on generarReporteEnvioCheque Service..');
		    console.log(params);
		    return $http({
		        url: mainServices.getURL() + '/cartavehiculo/reporte_envio_cheque',
		        method: 'POST',
		        headers: {'Content-Type': 'application/json'},
		        data:{
		        	'logoAseguradora':params.logoAseguradora,
		    		'fecha':params.fecha,
		    		'numeroCarta':params.numeroCarta,
		    		'asegurado':params.asegurado,
		    		'atencion':params.atencion,
		    		'ref':params.ref,
		    		'numeroCheque':params.numeroCheque,
		    		'banco':params.banco,
		    		'numeroSiniestro':params.numeroSiniestro,
		    		'empleadoEmpresa':params.empleadoEmpresa,
		    		'cargoEmpleado':params.cargoEmpleado,
		    		'telefonoEmpresa':params.telefonoEmpresa,
		    		'direccionEmpresa':params.direccionEmpresa,
		    		'webEmpresa':params.webEmpresa
		        },
		        responseType: 'arraybuffer'

		      });

		  };

		  this.generarReporteReciboPagado = function(params){
		    console.log('on generarReporteReciboPagado Service..');
		    console.log(params);
		    return $http({
		        url: mainServices.getURL() + '/cartavehiculo/reporte_recibo_pagado',
		        method: 'POST',
		        headers: {'Content-Type': 'application/json'},
		        data:{
		        	'logoAseguradora':params.logoAseguradora,
		    		'fecha':params.fecha,
		    		'numeroCarta':params.numeroCarta,
		    		'asegurado':params.asegurado,
		    		'aseguradora':params.aseguradora,
		    		'numeroPoliza':params.numeroPoliza,
		    		'numeroRecibo':params.numeroRecibo,
		    		'telefonoEmpresa':params.telefonoEmpresa,
		    		'direccionEmpresa':params.direccionEmpresa,
		    		'webEmpresa':params.webEmpresa
		        },
		        responseType: 'arraybuffer'

		      });

		  };

		  this.generarReporteSiniestroPerdidaParcial = function(params){
		    console.log('on generarReporteSiniestroPerdidaParcial Service..');
		    console.log(params);
		    return $http({
		        url: mainServices.getURL() + '/cartavehiculo/reporte_siniestro_pp',
		        method: 'POST',
		        headers: {'Content-Type': 'application/json'},
		        data:{
		        	'logoAseguradora':params.logoAseguradora,
		    		'fecha':params.fecha,
		    		'numeroCarta':params.numeroCarta,
		    		'asegurado':params.asegurado,
		    		'empleadoEmpresa':params.empleadoEmpresa,
		    		'cargoEmpleado':params.cargoEmpleado,
		    		'telefonoEmpresa':params.telefonoEmpresa,
		    		'direccionEmpresa':params.direccionEmpresa,
		    		'webEmpresa':params.webEmpresa
		        },
		        responseType: 'arraybuffer'

		      });

		  };

		  this.generarReporteSiniestroPerdidaTotalJuridico = function(params){
			    console.log('on generarReporteSiniestroPerdidaTotalJuridico Service..');
			    console.log(params);
			    return $http({
			        url: mainServices.getURL() + '/cartavehiculo/reporte_siniestro_ptj',
			        method: 'POST',
			        headers: {'Content-Type': 'application/json'},
			        data:{
			        	'logoAseguradora':params.logoAseguradora,
			    		'fecha':params.fecha,
			    		'numeroCarta':params.numeroCarta,
			    		'asegurado':params.asegurado,
			    		'empleadoEmpresa':params.empleadoEmpresa,
			    		'cargoEmpleado':params.cargoEmpleado,
			    		'telefonoEmpresa':params.telefonoEmpresa,
			    		'direccionEmpresa':params.direccionEmpresa,
			    		'webEmpresa':params.webEmpresa
			        },
			        responseType: 'arraybuffer'

			      });

			  };

			  this.generarReporteSiniestroPerdidaTotalNatural = function(params){
				    console.log('on generarReporteSiniestroPerdidaTotalNatural Service..');
				    console.log(params);
				    return $http({
				        url: mainServices.getURL() + '/cartavehiculo/reporte_siniestro_ptn',
				        method: 'POST',
				        headers: {'Content-Type': 'application/json'},
				        data:{
				        	'logoAseguradora':params.logoAseguradora,
				    		'fecha':params.fecha,
				    		'numeroCarta':params.numeroCarta,
				    		'asegurado':params.asegurado,
				    		'empleadoEmpresa':params.empleadoEmpresa,
				    		'cargoEmpleado':params.cargoEmpleado,
				    		'telefonoEmpresa':params.telefonoEmpresa,
				    		'direccionEmpresa':params.direccionEmpresa,
				    		'webEmpresa':params.webEmpresa
				        },
				        responseType: 'arraybuffer'

				      });

				  };

  }]);

})();
