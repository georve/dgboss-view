(function(){

  'use strict';

  var facturaServices = angular.module('DGBOSS.facturaServices', []);

  facturaServices.service('facturaServices', ['$http', 'mainServices', function($http, mainServices){

    //console.log(dgBossURL);

    var self = this;

    this.consultarFacturas = function(params){
      console.log('on service..', params);
      //console.log(dgBossURL);
      return $http({
          url: mainServices.getURL() + '/factura/get_facturas',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
           'numeroFactura': params.numeroFactura?params.numeroFactura:'',
			      'nuRifEmpresa' : mainServices.getRifEmpresa()
          }
        });

    };

    this.agregarFactura = function(params){
    	console.log('on service..');
        //console.log(dgBossURL);
        return $http({
            url: mainServices.getURL() + '/factura/saveUpdate',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {
              'id': 0,
              'numeroControl': params.numeroControl,
              'usuario': params.usuario,
              'nuCedulaRif': params.asegurado.nuCedulaRif,
              'tipoPersona': params.asegurado.tipoPersona ,
              'descripcion': params.asegurado.nombre ,
              'usuarioCliente': 0 ,
              'formaPago': 0,
              'tipoPago': "CHEQUE",
              'banco': 0 ,
              'numeroCuenta': 0,
              'estatusFactura': params.estatusFactura,
              'fechaEmision': params.fechaEmision,
              'observaciones': params.observaciones,
              'monto': params.monto,
              'incluirFirma': 1,
              'detallesFactura':JSON.parse(JSON.stringify (params.detallesFactura)),
			        'subtotal': params.subtotal,
			        'iva': params.iva,
			        'total': params.total,
			        'nuRifEmpresa': mainServices.getRifEmpresa(),
              'direccion': params.txDireccion,
              'numeroFactura': params.numeroFactura,
              'credencial':params.credencial
            }
          });
    };

	    this.consultarFacturaDetalle = function(params){
		  console.log('on service..', params);
		  //console.log(dgBossURL);
		  return $http({
			  url: mainServices.getURL() + '/factura/get_facturas',
			  method: 'POST',
			  headers: {'Content-Type': 'application/json'},
			  data: {
                  'numeroFactura': params.numeroFactura,
                  'nuRifEmpresa' : mainServices.getRifEmpresa()
			  }
			});

		};

		this.consultarTipoPersona = function(){
		  //console.log(dgBossURL);
		  return $http({
			  url: mainServices.getURL() + '/entes/get_tipo_persona',
			  method: 'POST'
			});

		};

    this.agregarNotaCredito = function(params){
      return $http({
        url: mainServices.getURL() + '/notaCredito/insert_update_nota_credito',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "id": params.id,
          "estatusNotaCredito": params.estatus,
          "numeroControl": params.numeroControl,
          "descripcion": params.descripcion,
          "numeroFactura": params.numeroFactura,
          "fechaNotaCredito": params.fechaEmision,
          "obsevacion": params.observacion,
          "cedulaRif": params.cedulaRif,
          "tipoPersona": params.tipoPersona,
          "rifEmpresa": params.rifEmpresa,
          "direccion": params.direccion,
          "subTotal": params.subTotal,
          "iva": params.iva,
          "total": params.total,
          "excentoIva": params.excentoIva,
          "detallesNotasCredito": params.detalles
        }
      });
    }

    this.agregarNotaDebito = function(params){
      return $http({
        url: mainServices.getURL() + '/notaDebito/insert_update_nota_debito',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "id": params.id,
          "estatusNotaDebito": params.estatus,
          "numeroControl": params.numeroControl,
          "descripcion": params.descripcion,
          "numeroFactura": params.numeroFactura,
          "fechaNotaDebito": params.fechaEmision,
          "obsevacion": params.observacion,
          "cedulaRif": params.cedulaRif,
          "tipoPersona": params.tipoPersona,
          "rifEmpresa": params.rifEmpresa,
          "direccion": params.direccion,
          "subTotal": params.subTotal,
          "iva": params.iva,
          "total": params.total,
          "excentoIva": params.excentoIva,
          "detallesNotasDebito": params.detalles
        }
      });
    }

    this.consultarNotasCredito = function(params){
      return $http({
        url: mainServices.getURL() + '/notaCredito/consultar_notas_credito',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "numeroFactura": params.numeroFactura,
          "rifEmpresa": params.rifEmpresa
        }
      });
    }

    this.consultarNotasDebito = function(params){
      return $http({
        url: mainServices.getURL() + '/notaDebito/consultar_notas_debito',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          "numeroFactura": params.numeroFactura,
          "rifEmpresa": params.rifEmpresa
        }
      });
    }


  }]);

  //facturaServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //facturaServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
