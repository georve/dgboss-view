(function(){

  'use strict';

  var siniestroServices = angular.module('DGBOSS.siniestroServices', []);

  siniestroServices.service('siniestroServices', ['$http', 'mainServices', function($http, mainServices){

    var self = this;

    this.obtenerPolizas = function(params){
      return $http({
        url: mainServices.getURL() + '/poliza/get_polizas_siniestro',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data:   {
                  "numeroPoliza": params.numeroPoliza,
                  "nuCedula": params.cedRifAsegurado,
                  "numeroCertificado":params.numeroCertificado,
                  "coRamo": params.coRamo
                }

      });
    };

    this.agregarSiniestro = function(params, tipo){
    	  console.log('on service..');
        console.log(params);
      if(tipo == 0){

        return $http({
          url: mainServices.getURL() + '/siniestro/update_siniestro',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            "nuPoliza": params.poliza,
            "nuCertificado":params.nuCertificado,
            "coRamo": 'AUT',
            "txObservacion": params.observaciones,
            "nuRifEmpresa": mainServices.getRifEmpresa(),
            "nuSiniestro": params.numeroSiniestro,
            "nuReclamo": params.numeroReclamo,
            "estatus": params.estatus,
            "feOcurrencia": mainServices.revertDate(params.fechaOcurrencia),
            "feNotEmpresa": mainServices.revertDate(params.fechaNotifEmpresa),
            "feNotAseguradora": mainServices.revertDate(params.fechaNotifAseguradora),
            "fePago": mainServices.revertDate(params.fePago),
            "tipoPago":params.tipoPago,
            "montoDeducible": params.montoDeducible,
            "montoPagado": params.montoPagado,
            "montoReclamado": params.montoReclamado,
            "descripcion": params.descripcion,
            "idSiniestro": params.idSiniestro,
            "tipoSiniestro": params.tipoSiniestro,
			      "nuRifAseguradora": params.nuRifAseguradora,
            "siniestroAutomovil":{
              "idSiniestroAutomovil": params.id,
              "nuSiniestro": params.numeroSiniestro,
              "lugarOcurrencia": params.lugarOcurrencia,
              "danosReportados": params.danosReportados,
			        "idCausaSiniestro": params.idCausaSiniestro
            }
          }
        });
      }else if(tipo == 1){

        console.log('PATRIMONIALES');
        console.log(params);

        return $http({
          url: mainServices.getURL() + '/siniestro/update_siniestro',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data:  {
            "nuPoliza": params.poliza,
            "nuCertificado": params.nuCertificado,
            "coRamo": 'PAT',
            "txObservacion": params.observaciones,
            "nuRifEmpresa": mainServices.getRifEmpresa(),
            "nuSiniestro": params.numeroSiniestro,
            "nuReclamo": params.numeroReclamo,
            "estatus": params.estatus,
            "feOcurrencia": mainServices.revertDate(params.fechaOcurrencia),
            "feNotEmpresa": mainServices.revertDate(params.fechaNotifEmpresa),
            "feNotAseguradora": mainServices.revertDate(params.fechaNotifAseguradora),
            "fePago": mainServices.revertDate(params.fePago),
            "tipoPago": params.tipoPago,
            "montoDeducible": params.montoDeducible,
            "montoPagado": params.montoPagado,
            "montoReclamado": params.montoReclamado,
            "descripcion": params.descripcion,
            "idSiniestro": params.idSiniestro,
            "tipoSiniestro": params.tipoSiniestro,
			"nuRifAseguradora": params.nuRifAseguradora,
            "siniestroPatrimoniales": {
              "ajustador": params.ajustador,
              "diasTranscurridos": params.diasTranscurridos,
              "montoAjustado": params.montoAjustado,
              "montoAjustadoNeto": params.montoAjustadoNeto,
              "nuSiniestro": params.numeroSiniestro
            }
          }
        });
      }else if(tipo == 2){

        console.log('PERSONA');
        console.log('params', params);

        return $http({
          url: mainServices.getURL() + '/siniestro/update_siniestro',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: {
            "nuPoliza": params.poliza,
            "nuCertificado": params.nuCertificado,
            "coRamo": 'PER',
            "causa": params.causa,
            "txObservacion": params.observaciones,
            "nuRifEmpresa": mainServices.getRifEmpresa(),
            "nuSiniestro": params.numeroSiniestro,
            "nuReclamo": params.numeroReclamo,
            "estatus": params.estatus,
            "feOcurrencia": mainServices.revertDate(params.fechaOcurrencia),
            "feNotEmpresa": mainServices.revertDate(params.fechaNotifEmpresa),
            "feNotAseguradora": mainServices.revertDate(params.fechaNotifAseguradora),
            "fePago": mainServices.revertDate(params.fePago),
            "tipoPago": params.tipoPago,
            "montoDeducible": params.montoDeducible,
            "montoPagado": params.montoPagado,
            "montoReclamado": params.montoReclamado,
            "descripcion": params.descripcion,
            "idSiniestro": params.idSiniestro,
            "tipoSiniestro": params.tipoSiniestro,
			"nuRifAseguradora": params.nuRifAseguradora,
            "siniestroPersona": {
              "idSiniestroPersona": params.id,
              "nuSiniestro": params.numeroSiniestro,
              "parentesco": params.parentesco,
              "txPatologia": params.patologia,
              "porcentajeIndemnizacion": params.porcentajeIndemnizacion,
              "montoGnaDeducible": params.montoGnaDeducible
            }
          }
        });
      }
    };

    this.editarSiniestro =  function(params){
        console.log('params', params);
        params.feNotAseguradora = mainServices.revertDate(params.feNotAseg);
        params.feNotEmpresa = mainServices.revertDate(params.feNotEmpresa);
        params.feOcurrencia = mainServices.revertDate(params.feOcurrencia);
        params.fePago = mainServices.revertDate(params.fePago);
        console.log(params);
        return $http({
          url: mainServices.getURL() + '/siniestro/update_siniestro',
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: params
        });
    };
    // this.consultarSiniestro = function(params){
    //     console.log('on service..');
    //     //console.log(dgBossURL);
    //     return $http({
    //         url: mainServices.getURL() + '/siniestro/consultar_siniestro',
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         data: {
    //           //'idSiniestro': params.idSiniestro
    //           'coRamo' : '',//params.coRamo,
    //           'nuSiniestro': ''//params.nuSiniestro
    //         }
    //       });
    //
    //   };

      this.consultarSiniestro = function(params, filter){
          console.log('on service..');
          if(filter){
            return $http({
              url: mainServices.getURL() + '/siniestro/consultar_siniestros_filtros',
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              data: {
                    "numeroPoliza":params.numeroPoliza,
                    "numeroReclamo":params.numeroReclamo,
                    "nuRifEmpresa":params.nuRifEmpresa,  
                    "nuRifAseguradora":params.nuRifAseguradora, 
                    "nuCedula":params.nuCedula,
                    "coSubRamo":params.coSubRamo,
                    "coRamo":params.coRamo,
                    "estatus":params.estatus,
                    "feDesdeOcu":params.feDesdeOcu,
                    "feHastaOcu":params.feHastaOcu,
                    "feDesdeNotEm":params.feDesdeNotEm,
                    "feHastaNotEm":params.feHastaNotEm,
                    "feDesdeNotAse":params.feDesdeNotAse,
                    "feHastaNotAse":params.feHastaNotAse,
                    "tipoSiniestro":params.tipoSiniestro
              }
            });
          }else{
            return $http({
              url: mainServices.getURL() + '/siniestro/consultar_siniestros_filtros',
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              data: {
                  "numeroPoliza": params.numeroPoliza,
                  "numeroReclamo": params.numeroReclamo,
                  "nuRifEmpresa": mainServices.getRifEmpresa(),
                  "nuRifAseguradora":params.nuRifAseguradora, 
                  "nuCedula":params.nuCedula,
                  "coSubRamo":params.coSubRamo,
                  "coRamo":params.coRamo,
                  "estatus":params.estatus,
                  "feDesdeOcu":params.feDesdeOcu,
                  "feHastaOcu":params.feHastaOcu,
                  "feDesdeNotEm":params.feDesdeNotEm,
                  "feHastaNotEm":params.feHastaNotEm,
                  "feDesdeNotAse":params.feDesdeNotAse,
                  "feHastaNotAse":params.feHastaNotAse,
                  "tipoSiniestro":params.tipoSiniestro
              }
            });
          }
        };

  }]);

  //siniestroServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //siniestroServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');


})();
