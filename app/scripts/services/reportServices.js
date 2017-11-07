(function(){

  'use strict';

  var reportServices = angular.module('DGBOSS.reportServices', []);

  reportServices.service('reportServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;

	this.generarReporteFactura = function(params){
	    console.log('on generarReporteFactura Service..');
	    console.log(params);
	    return $http({
	        url: mainServices.getURL() + '/reporte/generar_factura',
	        method: 'POST',
	        headers: {'Content-Type': 'application/json'},
	        data:{
	    		'fecha': params.fecha,
          'credencial': params.credencial,
	    		'numeroFactura': params.numeroFactura,
	    		'nombreRazonSocial': params.nombreRazonSocial,
	    		'rif': params.rif,
	    		'direccion': params.direccion,
	    		'telefono': params.telefono,
	    		'banco': params.banco,
	    		'observacion': params.observacion,
	    		'subTotal': params.subTotal,
	    		'ivaTotal': params.ivaTotal,
	    		'descuento': params.descuento,
	    		'total': params.total,
	    		'detallesFacturas': params.detallesFacturas
	        },
	        responseType: 'arraybuffer'

	      });

	  };

	  this.generarReportePolizasporRamo = function(params){
	      console.log('on generarReportePolizasporRamo Service..');
	      console.log(params);
	      return $http({
	          url: mainServices.getURL() + '/reporte/reporte_poliza_ramo',
	          method: 'POST',
	          headers: {'Content-Type': 'application/json'},
	          data:{
	      		'cantidadTotal': params.cantidadTotal,
	      		'porcentajeTotal': params.porcentajeTotal,
	      		'polizasRamo': params.polizasRamo,
          	"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
	          },
	          responseType: 'arraybuffer'

	        });

	    };

		this.generarReporteBonosCobrados = function(params){
		    console.log('on generarReporteBonosCobrados Service..');
		    console.log(params);
		    return $http({
		        url: mainServices.getURL() + '/reporte/reporte_bono_cobrado',
		        method: 'POST',
		        headers: {'Content-Type': 'application/json'},
		        data:{
		    		'montoTotal': params.montoTotal,
						'bonos': params.bonos,
          	"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 		
		        },
		        responseType: 'arraybuffer'

		      });

		  };

		  this.generarReporteBonosPendientes = function(params){
		      console.log('on generarReporteBonosPendientes Service..');
		      console.log(params);
		      return $http({
		          url: mainServices.getURL() + '/reporte/reporte_bono_pendiente',
		          method: 'POST',
		          headers: {'Content-Type': 'application/json'},
		          data:{
		      		'montoTotal': params.montoTotal,
		      		'bonos': params.bonos,
          		"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
		          },
		          responseType: 'arraybuffer'

		        });

		    };

            this.generarReporteComisionCobrada = function(params){
                console.log('on generarReporteComisionCobrada Service..');
                console.log(params);
                return $http({
                    url: mainServices.getURL() + '/reporte/reporte_comision_cobrada',
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    data:{
                		'montoTotal': params.montoTotal,
                		'comisiones': params.comisiones,
          					"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
                    },
                    responseType: 'arraybuffer'

                  });

              };

              this.generarReporteComisionPendiente = function(params){
                  console.log('on generarReporteComisionPendiente Service..');
                  console.log(params);
                  return $http({
                      url: mainServices.getURL() + '/reporte/reporte_comision_pendiente',
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      data:{
                  		'montoTotal': params.montoTotal,
                  		'comisiones': params.comisiones,
          						"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
                      },
                      responseType: 'arraybuffer'

                    });

                };

                this.generarReportePrimasCobradas = function(params){
                    console.log('on generarReportePrimasCobradas Service..');
                    console.log(params);
                    return $http({
                        url: mainServices.getURL() + '/reporte/reporte_prima_cobrada',
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        data:{
                    		'montoTotal': params.montoTotal,
                    		'comisiones': params.comisiones,
          							"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
                        },
                        responseType: 'arraybuffer'

                      });

                  };

                  this.generarReportePrimasPendiente = function(params){
                      console.log('on generarReportePrimasPendiente Service..');
                      console.log(params);
                      return $http({
                          url: mainServices.getURL() + '/reporte/reporte_prima_pendiente',
                          method: 'POST',
                          headers: {'Content-Type': 'application/json'},
                          data:{
                      		'montoTotal': params.montoTotal,
                      		'primas': params.primas,
          								"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
                          },
                          responseType: 'arraybuffer'

                        });

                    };

			this.generarReporteRenovacion = function(params){
			    console.log('on generarReporteRenovacion Service..');
			    console.log(params);
			    return $http({
			        url: mainServices.getURL() + '/reporte/reporte_renovacion',
			        method: 'POST',
			        headers: {'Content-Type': 'application/json'},
			        data:{
			    		'cantidadTotal': params.cantidadTotal,
			    		'renovaciones': params.renovaciones,
          		"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
			        },
			        responseType: 'arraybuffer'

			      });

			  };

			  this.generarReporteSiniestro = function(params){
				    console.log('on generarReporteSiniestro Service..');
				    console.log(params);
				    return $http({
				        url: mainServices.getURL() + '/reporte/reporte_siniestro',
				        method: 'POST',
				        headers: {'Content-Type': 'application/json'},
				        data:{
				    		'cantidadTotal': params.cantidadTotal,
				    		'siniestros': params.siniestros,
          			"logoEmpresa": mainServices.getDominio() + '\\' + mainServices.getRifEmpresa() 	
				        },
				        responseType: 'arraybuffer'

				      });

				  };
  }]);

})();
