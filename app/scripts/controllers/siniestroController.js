
(function () {

  'use strict';

  var siniestroController = angular.module('DGBOSS.siniestroController', ['DGBOSS.siniestroServices', 'DGBOSS.mainServices']);

  siniestroController.controller('siniestroController', ['$scope', '$rootScope', 'siniestroServices', 'mainServices', '$timeout','polizaServices', function ($scope, $rootScope, siniestroServices, mainServices, $timeout,polizaServices) {

    var self = this;


    console.log('siniestroController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the sinisters view. }
    */
    this.views = {
      agregarSiniestro: false,
      listarSiniestros: false,
      editarSiniestro: false,
      reporteSiniestro: false
    };

    this.tipoSiniestro = [
      { codigo: 0, nombre: 'Automóvil' },
      { codigo: 1, nombre: 'Patrimonial' },
      { codigo: 2, nombre: 'Persona' }
    ];

    this.siniestro = undefined;

	this.causas = [];
	
    this.ID = undefined;

    this.tipoID = [
      { codigo: 'E', nombre: 'E-' },
      { codigo: 'G', nombre: 'G-' },
      { codigo: 'J', nombre: 'J-' },
      //{ codigo: 'N', nombre: 'N-' }
      { codigo: 'V', nombre: 'V-' }

    ];

    this.datoSiniestro = {
      tipoSiniestro: undefined,
      tipoSiniestro2: undefined,
      rifCedula: undefined,
      idPoliza: undefined,
      numeroReclamo: undefined,
      numeroSiniestro: undefined,
      estatus: undefined,
      fechaOcurrencia: undefined,
      fechaNotifEmpresa: undefined,
      fechaNotifAseguradora: undefined,
      montoReclamado: undefined,
      unidad: undefined,
      descripcion: undefined,
      observaciones: undefined,
      tipoPago: undefined,
      montoDeducible: undefined,
      montoPagado: undefined,
      fechaPago: undefined
    };

    this.datoSiniestroAUT = {
      lugarOcurrencia: undefined,
      danosReportados: undefined,
	    causa: undefined
    };

    this.datoSiniestroPAT = {
      ajustador: undefined,
      diasTranscurridos: undefined,
      montoAjustado: undefined,
      montoAjustadoNeto: undefined
    };

    this.datoSiniestroPER = {
      ajustador: undefined,
      diasTranscurridos: undefined,
      montoAjustado: undefined,
      montoAjustadoNeto: undefined,
      parentesco: undefined,
      patologia: undefined,
      fechaPago: undefined,
      montoPagado: undefined,
      tipoPago: undefined,
      fechaSolicitudRecaudosAsegurador: undefined,
      fechaSolicitudRecaudosEmpresa: undefined,
      fechaEntregaRecaudos: undefined,
      montoGnaDeducible: undefined,
      porcentajeIndemnizacion: undefined
    };

    this.datoFiltros = {
      numeroReclamo: undefined,
      numeroPoliza: undefined,
      nuRifEmpresa: undefined,
      nuRifAseguradora:undefined,
      nuCedula: undefined,
      coRamo: undefined,
      coSubRamo:undefined,
      estatus: undefined,
      feDesdeOcu:undefined,
      feHastaOcu:undefined,
      feDesdeNotEm:undefined,
      feHastaNotEm:undefined,
      feDesdeNotAse:undefined,
      feHastaNotAse:undefined,
      tipoSiniestro:undefined
  };

    // this.tipoSiniestro = {
    //   automovil: false,
    //   patrimonial: false
    // };

    this.checked = 'col-md-6 col-sm-6 col-xs-8';

    this.formularioAgregarSiniestroVenezolanoAutocompletar = [
      "Álava",
      "Albacete",
      "Alicante",
      "..."
    ];

    this.formularioAgregarSiniestroExtranjeroAutocompletar = [
      "Álava",
      "Albacete",
      "Alicante",
      "..."
    ];

    this.siniestroCheck = {
      automovil: true,
      patrimonial: false,
      persona: false
    };

    this.wizardStep = 1;

    this.wizardButtons = {
      anterior: true,
      siguiente: false,
      finalizar: true
    };

    // this.polizas = [
    //   { selected: false, poliza: 'AUTF-2000190', ramo: 'Ramo N', asegurado: 'ERFM-L', tomador: 'Rocío', modelo: 'Cruze', placa: 'ISL-UR', ano: '1994', producto: 'Juan', beneficiario: 'Yennifer', tipoPoliza: 'Individual'},
    //   { selected: false, poliza: 'AUTF-2000190', ramo: 'Ramo M', asegurado: 'ERFM-L', tomador: 'Juan', modelo: 'Corolla', placa: 'ISL-UJ', ano: '1992', producto: 'Juan', beneficiario: 'Yennifer', tipoPoliza: 'Individual'},
    //   { selected: false, poliza: 'AUTF-2000190', ramo: 'Ramo L', asegurado: 'ERFM-L', tomador: 'Jean', modelo: 'Palio', placa: 'ISL-UV', ano: '1993', producto: 'Juan', beneficiario: 'Yennifer', tipoPoliza: 'Individual'}
    // ];

    this.polizas = [];

    this.poliza = undefined;

    this.agregarSiniestroPolizaModal = undefined;

    this.mask = '';

    this.tiposSiniestro = {
      AUT: [],
      PAT: [],
      PER: []
    };

    this.ListaRamos = [];
    this.ListaSubRamos = [];
    this.ListaAseguradoras = [];
    this.tiposSiniestros = [];
    this.listaCausas = [];

    /****************************ARCHIVO EXCEL**********************************/
    this.excel = {
            down: function() {},
            data: []
          };
    /*testData = [{
                    name: 'sheet1',
                    data: [
                        [1, 2, 3],
                        ['example', '2', '2']
                    ]
                }];*/         
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

    this.consultarPolizasService = function () {

      var aux = undefined;

      if (self.datoSiniestro.tipoSiniestro == 'Automóvil') {

        aux = 'AUT';
      } else if (self.datoSiniestro.tipoSiniestro == 'Patrimonial') {

        aux = 'PAT';
      } else if (self.datoSiniestro.tipoSiniestro == 'Persona') {

        aux = 'PER';
      }

      var params = {
        numeroPoliza: '',
        nuCedula: self.datoSiniestro.rifCedula,
        numeroCertificado: 0,
        coRamo: aux, /// Este luego se va a cambiar por coRamo
        cedRifAsegurado: "",
        rifAseguradora: '',
        rifTomador: self.datoSiniestro.rifCedula,
        idMoneda: 0,
        feHasta: '',
        feDesde: '',
        feVencimiento: ''
      };

      siniestroServices.obtenerPolizas(params)
        .success(function (data) {
          console.log(data);
          self.polizas = [];
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            self.polizas.push({
              selected: false,
              poliza: data[i].numeroPoliza,
              ramo: data[i].nbOpcionRamo,
              asegurado: data[i].nbAseguradoTomador,//cambiar
              tomador: data[i].nbAseguradoTomador,
			  nuRifAseguradora: data[i].nuRifAseguradora,
			  montoDeducible: data[i].montoDeducible,
              // modelo: data[i].tiposCoberturas.idModelo,
              // placa: data[i].tiposCoberturas.placa,
              // ano: data[i].tiposCoberturas.ano
            });
          }
          console.log(self.polizas);
        })
        .error(function (data, status, headers, config) {

          new PNotify({
            title: '¡Error!',
            //text: data.mensaje,
            text: 'Ha ocurrido un error en el sistema.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
    };

    this.agregarSiniestroService = function () {
      console.log(self.datoSiniestro);
	     console.log(self.polizas);
      var params = {
        id: 0,
        poliza: self.poliza.poliza,
        nuCertificado: self.poliza.numeroCertificado,
        tipoSiniestro: self.datoSiniestro.tipoSiniestro2,
        rifCedula: self.ID + '-' + self.datoSiniestro.rifCedula.toString(),
        //idPoliza: self.datoSiniestro.idPoliza,
        numeroReclamo: self.datoSiniestro.numeroReclamo,
        numeroSiniestro: self.datoSiniestro.numeroSiniestro,
        estatus: self.datoSiniestro.estatus,
        fechaOcurrencia: self.datoSiniestro.fechaOcurrencia,
        fechaNotifEmpresa: self.datoSiniestro.fechaNotifEmpresa,
        fechaNotifAseguradora: self.datoSiniestro.fechaNotifAseguradora,
        fePago: self.datoSiniestro.fechaPago,
        montoReclamado: self.datoSiniestro.montoReclamado,
        montoDeducible: self.datoSiniestro.montoDeducible,
        montoPagado: self.datoSiniestro.montoPagado,
        unidad: self.datoSiniestro.unidad,
        causa: self.datoSiniestro.causa,
        observaciones: self.datoSiniestro.observaciones,
        tipoPago: self.datoSiniestro.tipoPago,
        lugarOcurrencia: undefined,
        danosReportados: undefined,
        descripcion: self.datoSiniestro.descripcion,
        ajustador: undefined,
        diasTranscurridos: undefined,
        montoAjustado: undefined,
        montoAjustadoNeto: undefined,
		nuRifAseguradora: self.poliza.nuRifAseguradora,


        /*        ajustador: undefined,
                diasTranscurridos: undefined,
                montoAjustado: undefined,
                montoAjustadoNeto: undefined,
                */
        parentesco: undefined,
        patologia: undefined,
        fechaSolicitudRecaudosAsegurador: undefined,
        fechaSolicitudRecaudosEmpresa: undefined,
        fechaEntregaRecaudos: undefined,
        montoGnaDeducible: undefined,
        porcentajeIndemnizacion: undefined
      };

      if (self.datoSiniestro.tipoSiniestro == 0) {
        //AUTOMOVIL

        params.lugarOcurrencia = self.datoSiniestroAUT.lugarOcurrencia;
        params.danosReportados = self.datoSiniestroAUT.danosReportados;
	    	params.idCausaSiniestro = self.datoSiniestroAUT.causa;

      } else if (self.datoSiniestro.tipoSiniestro == 1) {
        //PATRIMONIAL
        params.ajustador = self.datoSiniestroPAT.ajustador;
        params.diasTranscurridos = self.datoSiniestroPAT.diasTranscurridos;
        params.montoAjustado = self.datoSiniestroPAT.montoAjustado;
        params.montoAjustadoNeto = self.datoSiniestroPAT.montoAjustadoNeto;
      } else if (self.datoSiniestro.tipoSiniestro == 2) {
        console.log(self.datoSiniestroPER);
        //PERSONA
        // params.ajustador = self.datoSiniestroPER.ajustador;
        // params.diasTranscurridos = self.datoSiniestroPER.diasTranscurridos;
        // params.montoAjustado = self.datoSiniestroPER.montoAjustado;
        // params.montoAjustadoNeto = self.datoSiniestroPER.montoAjustadoNeto;}
        params.parentesco = self.datoSiniestroPER.parentesco;
        params.patologia = self.datoSiniestroPER.patologia;
        // params.fechaPago = self.datoSiniestroPER.fechaPago;
        // params.montoPagado = self.datoSiniestroPER.montoPagado;
        // params.tipoPago = self.datoSiniestroPER.tipoPago;
        //params.fechaSolicitudRecaudosAsegurador = self.datoSiniestroPER.fechaSolicitudRecaudosAsegurador;
        // params.fechaSolicitudRecaudosEmpresa = self.datoSiniestroPER.fechaSolicitudRecaudosEmpresa,
        //params.fechaEntregaRecaudos = self.datoSiniestroPER.fechaEntregaRecaudos;
        params.montoGnaDeducible = self.datoSiniestroPER.montoGnaDeducible;
        params.porcentajeIndemnizacion = self.datoSiniestroPER.porcentajeIndemnizacion;
      }
      console.log(params);
       siniestroServices.agregarSiniestro(params, self.datoSiniestro.tipoSiniestro)
        .success(function (data) {
          console.log(data);
          new PNotify({
            title: '¡Siniestro creado!',
            text: data.mensaje,
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          document.getElementById("formularioIndemnización").value = "";
          self.consultarSiniestroService();
        })
        .error(function (data, status, headers, config) {

          new PNotify({
            title: '¡Error!',
            //text: data.mensaje,
            text: 'Ha ocurrido un error en el sistema.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        }); 
    };

    this.editarSiniestroService = function () {
      var params = JSON.parse(JSON.stringify(self.siniestroEditar));
      console.log(params);
      params.txObservacion = params.txObservaciones;
      // var params = {
      //   nuPoliza: self.siniestroEditar.nuPoliza,
      //   coRamo: self.siniestroEditar.coRamo,
      //   nuCertificado: self.siniestroEditar.nuCertificado,
      //   nuRifEmpresa: self.siniestroEditar.nuRifEmpresa,
      //   nuSiniestro: self.siniestroEditar.nuSiniestro,
      //   estatus: self.siniestroEditar.estatus,
      //   txObservacion: self.siniestroEditar.txObservaciones,
      //   descripcion: self.siniestroEditar.descripcion,
      //   feOcurrencia: self.siniestroEditar.feOcurrencia,
      //   feNotEmpresa: self.siniestroEditar.feNotEmpresa,
      //   tipoPago: self.siniestroEditar.tipoPago,
      //   nuReclamo: self.siniestroEditar.nuReclamo,
      //   feNotAseguradora: self.siniestroEditar.feNotAseguradora,
      //   fePago: self.siniestroEditar.fePago,
      //   montoDeducible: self.siniestroEditar.montoDeducible,
      //   montoPagado: self.siniestroEditar.montoPagado,
      //   montoReclamado: self.siniestroEditar.montoReclamado,
      //   siniestroAutomovil: {},
      //   siniestroPersona: {},
      //   siniestroPatrimoniales: {}
      // };

      // if (self.siniestroEditar.coRamo == 'AUT') {
      //   params.siniestroAutomovil.idSiniestroAutomovil = self.siniestroEditar.siniestroAutomovil.idSiniestroAutomovil;
      //   params.siniestroAutomovil.lugarOcurrencia = self.siniestroEditar.siniestroAutomovil.lugarOcurrencia;
      //   params.siniestroAutomovil.danosReportados = self.siniestroEditar.siniestroAutomovil.danosReportados;
      //   params.siniestroPersona = undefined;
      //   params.siniestroPatrimoniales = undefined;
      // }
      // if (self.siniestroEditar.coRamo == 'PAT') { }
      // if (self.siniestroEditar.coRamo == 'PER') {
      //   params.siniestroPersona.idSiniestroPersona = self.siniestroEditar.siniestroPersona.idSiniestroPersona;
      //   params.siniestroPersona.parentesco = self.siniestroEditar.siniestroPersona.parentesco;
      //   params.siniestroPersona.txPatologia = self.siniestroEditar.siniestroPersona.txPatologia;
      //   params.siniestroPersona.montoGnaDeducible = self.siniestroEditar.siniestroPersona.montoGnaDeducible;
      //   params.siniestroPersona.porcentajeIndemnizacion = parseInt(self.siniestroEditar.siniestroPersona.porcentajeIndemnizacion);
      //   params.siniestroAutomovil = undefined;
      //   params.siniestroPatrimoniales = undefined;
      // }

      console.log(params);
      siniestroServices.editarSiniestro(params)
        .success(function (data) {
          console.log(data);
          new PNotify({
            title: '¡Siniestro editado!',
            text: 'El siniestro fue editado con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.consultarSiniestroService();
        })
        .error(function (data, status, headers, config) {
          new PNotify({
            title: '¡Error!',
            //text: data.mensaje,
            text: 'Ha ocurrido un error en el sistema.',
            type: 'error',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
        });
    };

    this.consultarSiniestroService = function () {
      var filter  = false;
      if(self.views.reporteSiniestro){
         var params = {
            numeroReclamo: self.datoFiltros.numeroReclamo ? self.datoFiltros.numeroReclamo:'',
            numeroPoliza: self.datoFiltros.numeroPoliza ? self.datoFiltros.numeroPoliza: '',
            nuRifEmpresa: mainServices.getRifEmpresa(),
            nuRifAseguradora: self.datoFiltros.nuRifAseguradora ? self.datoFiltros.nuRifAseguradora: '',
            nuCedula: self.datoFiltros.nuCedula ? self.datoFiltros.nuCedula: '',
            coRamo: self.datoFiltros.coRamo ? self.datoFiltros.coRamo: '',
            coSubRamo: self.datoFiltros.coSubRamo ? self.datoFiltros.coSubRamo : '',
            estatus: self.datoFiltros.estatus ? self.datoFiltros.estatus: '',
            feDesdeOcu: self.datoFiltros.feDesdeOcu? mainServices.revertDate(self.datoFiltros.feDesdeOcu) :'',
            feHastaOcu:self.datoFiltros.feHastaOcu? mainServices.revertDate(self.datoFiltros.feHastaOcu):'',
            feDesdeNotEm:self.datoFiltros.feDesdeNotEm? mainServices.revertDate(self.datoFiltros.feDesdeNotEm):'',
            feHastaNotEm:self.datoFiltros.feHastaNotEm? mainServices.revertDate(self.datoFiltros.feHastaNotEm):'',
            feDesdeNotAse:self.datoFiltros.feDesdeNotAse? mainServices.revertDate(self.datoFiltros.feDesdeNotAse):'',
            feHastaNotAse:self.datoFiltros.feHastaNotAse? mainServices.revertDate(self.datoFiltros.feHastaNotAse):'',
            tipoSiniestro:self.datoFiltros.tipoSiniestro ? self.datoFiltros.tipoSiniestro:''
        };
          self.datoFiltros.nuRifAseguradora = undefined;
          filter = true;
      }else{
        var params = {
          numeroPoliza: "",
          numeroReclamo: "",
          nuCedula: "",
          coSubRamo: "",
          coRamo: "",
          estatus: "",
          nuRifEmpresa: mainServices.getRifEmpresa(),
          nuRifAseguradora: "",
          feDesdeOcu: "",
          feHastaOcu: "",
          feDesdeNotEm: "",
          feHastaNotEm: "",
          feDesdeNotAse: "",
          feHastaNotAse: "",
          tipoSiniestro: ""
		  
        };
        filter = false;
      }
      siniestroServices.consultarSiniestro(params, filter)
        .success(function (data) {
          self.listaCausas = mainServices.getCausas();
          self.listaSiniestros = [];
          console.log(data);
          for (var i = 0; i < data.length; i++) {

            if(data[i].nuSiniestro == '' || !data[i].nuSiniestro || data[i].nuSiniestro == null || data[i].nuSiniestro == undefined){
               data[i].nuSiniestro = 'N/A';   
            }

            self.listaSiniestros.push({
              causa: data[i].causa,//"xq si",
              coRamo: data[i].coRamo,//null,
              nuCertificado: data[i].nuCertificado,
              ramo: '',
              idSiniestro: data[i].idSiniestro,
              descripcion: data[i].descripcion,
              estatus: data[i].estatus,// "pagado",
              feNotAseg: mainServices.revertDate(data[i].feNotAseguradora),//"2017-01-01",
              feNotEmpresa: mainServices.revertDate(data[i].feNotEmpresa),// "2017-01-01",
              feOcurrencia: mainServices.revertDate(data[i].feOcurrencia),// "2017-01-01",
              fePago: mainServices.revertDate(data[i].fePago),
              // idTipoSiniestro: data[i].idTipoSiniestro, // 1,
              montoReclamado: data[i].montoReclamado, //230000,
              montoDeducible: data[i].montoDeducible,
              montoPagado: data[i].montoPagado,
              nbAsegurado: data[i].nbAsegurado,
              nuRifAsegurado: data[i].nuRifAsegurado,
              nbAseguradora: data[i].nbAseguradora,
              nuRifAseguradora: data[i].nuRifAseguradora,
              nbTomador: data[i].nbTomador,
              nuRifTomador: data[i].nuRifTomador,
              nuRifEmpresa: data[i].nuRifEmpresa,
              nuPoliza: data[i].nuPoliza, //"AUTF-2000190",
              nuReclamo: data[i].nuReclamo, //"1234567",
              nuSiniestro: data[i].nuSiniestro, //"1111111",
              tipoPago: data[i].tipoPago,
              siniestroAutomovil: JSON.parse(JSON.stringify(data[i].siniestroAutomovil)), // null,
              siniestroPatrimoniales: JSON.parse(JSON.stringify(data[i].siniestroPatrimoniales)),
              siniestroPersona: JSON.parse(JSON.stringify(data[i].siniestroPersona)),// null,
              txObservaciones: data[i].txObservacion,//"ytutut ",
              unidad: data[i].unidad//"unidad"
            });

            switch (self.listaSiniestros[i].coRamo) {
              case "AUT":
                self.listaSiniestros[i].ramo = 'Vehiculo';
                for(var j=0; j< self.listaCausas.length; j++){
                  if(self.listaSiniestros[i].siniestroAutomovil.idCausaSiniestro == self.listaCausas[j].id){
                    self.listaSiniestros[i].siniestroAutomovil.nbCausa = self.listaCausas[j].descripcion;
                    break;
                  }
                }
                break;
              case "PAT":
                self.listaSiniestros[i].ramo = 'Patrimonial';
                break;
              case "PER":
                self.listaSiniestros[i].ramo = 'Persona';
                break;
            };
          };

          console.log(self.listaSiniestros);
          data = undefined;
          if(self.views.reporteSiniestro){
            self.viewsController('reporteSiniestro');
            if (!$.fn.DataTable.isDataTable('#tablaConsultarSiniestrosReporte')) {
              self.createTableReporte();
            } else {
              self.destroyTableReporte();
            }
          }else{
            self.viewsController('listarSiniestros');

            if (!$.fn.DataTable.isDataTable('#tablaConsultarSiniestros')) {
              self.createTable();
            } else {
              self.destroyTable();
            }
          }

        })
        .error(function (data, status, headers, config) {
          if(self.views.reporteSiniestro){
            self.viewsController('reporteSiniestro');
            if (!$.fn.DataTable.isDataTable('#tablaConsultarSiniestrosReporte')) {
              self.createTableReporte();
            } else {
              self.destroyTableReporte();
            }
          }else{
            self.viewsController('listarSiniestros');

            if (!$.fn.DataTable.isDataTable('#tablaConsultarSiniestros')) {
              self.createTable();
            } else {
              self.destroyTable();
            }
          }
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

    this.consultarDetalleSiniestroServices = function (option) {
      console.log("llamo");
      switch (option) {
        case 'modal':
          var params = {
            numeroPoliza: self.siniestroModal.nuPoliza,
            numeroSiniestro: self.siniestroModal.nuSiniestro,
            nuCedula: "",
            coSubRamo: "",
            coRamo: "", //self.siniestroModal.coRamo,
            estatus: "",
            feNotEmpresa: "",
          };
          break;
        case 'editar':
          var params = {
            numeroPoliza: self.siniestroEditar.nuPoliza,
            numeroSiniestro: self.siniestroEditar.nuSiniestro,
            nuCedula: "",
            coSubRamo: "",
            coRamo: "", //self.siniestroModal.coRamo,
            estatus: "",
            feNotEmpresa: "",
          };
          break;
      };

      siniestroServices.consultarSiniestro(params)
        .success(function (data) {
          console.log(data);
          switch (option) {
            case 'modal':
              for (var i = 0; i < data.length; i++) {
                if (self.siniestroModal.siniestroAutomovil == null)
                  self.siniestroModal.siniestroAutomovil = undefined;
                if (self.siniestroModal.siniestroPatrimoniales == null)
                  self.siniestroModal.siniestroPatrimoniales = undefined;
                if (self.siniestroModal.siniestroPersona == null)
                  self.siniestroModal.siniestroPersona = undefined;

                switch (data[i].coRamo) {
                  case "AUT":
                    self.siniestroModal.siniestroAutomovil = JSON.parse(JSON.stringify(data[i].siniestroAutomovil));
                    self.siniestroModal.siniestroPatrimoniales = undefined;
                    self.siniestroModal.siniestroPersona = undefined;
                    break;
                  case "PAT":
                    self.siniestroModal.siniestroPatrimoniales = JSON.parse(JSON.stringify(data[i].siniestroPatrimoniales));
                    self.siniestroModal.siniestroAutomovil = undefined;
                    self.siniestroModal.siniestroPersona = undefined;
                    break;
                  case "PER":
                    self.siniestroModal.siniestroPersona = JSON.parse(JSON.stringify(data[i].siniestroPersona));
                    self.siniestroModal.siniestroPersona.porcentajeIndemnizacion = self.siniestroModal.siniestroPersona.porcentajeIndemnizacion.toString();
                    self.siniestroModal.siniestroAutomovil = undefined;
                    self.siniestroModal.siniestroPatrimoniales = undefined;
                    break;
                };
              };
              $('#consultarSiniestro').modal('show');
              break;
            case 'editar':
              for (var i = 0; i < data.length; i++) {

                if (self.siniestroEditar.siniestroAutomovil == null)
                  self.siniestroEditar.siniestroAutomovil = undefined;
                if (self.siniestroEditar.siniestroPatrimoniales == null)
                  self.siniestroEditar.siniestroPatrimoniales = undefined;
                if (self.siniestroEditar.siniestroPersona == null)
                  self.siniestroEditar.siniestroPersona = undefined;

                switch (data[i].coRamo) {
                  case "AUT":
                    self.siniestroEditar.siniestroAutomovil = JSON.parse(JSON.stringify(data[i].siniestroAutomovil));
                    self.siniestroEditar.siniestroPatrimoniales = undefined;
                    self.siniestroEditar.siniestroPersona = undefined;
                    break;
                  case "PAT":
                    self.siniestroEditar.siniestroPatrimoniales = JSON.parse(JSON.stringify(data[i].siniestroPatrimoniales));
                    self.siniestroEditar.siniestroAutomovil = undefined;
                    self.siniestroEditar.siniestroPersona = undefined;
                    break;
                  case "PER":
                    self.siniestroEditar.siniestroPersona = JSON.parse(JSON.stringify(data[i].siniestroPersona));
                    self.siniestroEditar.siniestroPersona.porcentajeIndemnizacion = self.siniestroEditar.siniestroPersona.porcentajeIndemnizacion.toString();
                    self.siniestroEditar.siniestroAutomovil = undefined;
                    self.siniestroEditar.siniestroPatrimoniales = undefined;
                    break;
                };
              };
              break;
            default:
              break;
          };
          console.log(self.siniestroEditar);

          data = undefined;
        })
        .error(function (data, status, headers, config) {
          self.viewsController('listarSiniestros');
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
      switch (view) {
        case 'agregarSiniestro':
          self.views.agregarSiniestro = true;
          console.log('viewsController > agregarSiniestro');
          //$('#agregarSiniestro').show();
          break;
        case 'listarSiniestros':
          self.views.listarSiniestros = true;
          console.log('viewsController > listarSiniestros');
          //$('#agregarSiniestro').hide();
          break;
        case 'reporteSiniestro':
          self.views.reporteSiniestro = true;
          console.log('viewsController > reporteSiniestro');
          //$('#agregarSiniestro').hide();
          break;          
        case 'editarSiniestro':
          self.views.editarSiniestro = true;
          console.log('viewsController > editarSiniestro');
        default:
          break;
      }
      console.log(self.views);
    };

    /*    this.tipoCedulaSwitch = function(){
          switch(self.formularioAseguradoNatural.tipoCedula){
            case 'Venezolano':
              if(self.formularioAseguradoNatural.cedula){
                if(isNaN(self.formularioAseguradoNatural.cedula[0]) && isNaN(self.formularioAseguradoNatural.cedula[1])){
                  console.log('on Extranjero');
                  self.formularioAseguradoNatural.cedula = self.formularioAseguradoNatural.cedula.substring(2, self.formularioAseguradoNatural.cedula.length);
                };
                self.formularioAseguradoNatural.cedula = 'V-' + self.formularioAseguradoNatural.cedula;
              }
              break;
            case 'Extranjero':
              if(self.formularioAseguradoNatural.cedula){
                if(isNaN(self.formularioAseguradoNatural.cedula[0]) && isNaN(self.formularioAseguradoNatural.cedula[1])){
                  console.log('on Extranjero');
                  self.formularioAseguradoNatural.cedula = self.formularioAseguradoNatural.cedula.substring(2, self.formularioAseguradoNatural.cedula.length);
                };
                self.formularioAseguradoNatural.cedula = 'E-' + self.formularioAseguradoNatural.cedula;
              }
              break;
            default:
              break;
          }
        };
    
        this.tipoSiniestroSwitch = function(){
          console.log('** siniestroCtrl > tipoSiniestroSwitch function **');
          switch(self.siniestro){
            case 'Automóvil':
              console.log(self.siniestro);
              break;
            case 'Patrimonial':
              console.log(self.siniestro);
              break;
            case 'Persona':
              console.log(self.siniestro);
              break;
            default:
              break;
          }
        };
    
        this.tipoIdentificacionSwitch = function(){
        
          switch(self.tipoIdentificacion){
            case 'venezolano':
              self.checked = 'col-md-2 col-sm-2 col-xs-4';
              self.identificacion.venezolano = true;
              self.identificacion.extranjero = false;
              break;
        
            case 'extranjero':
              self.checked = 'col-md-2 col-sm-2 col-xs-4';
              self.identificacion.extranjero = true;
              self.identificacion.venezolano = false;
              break;
        
            case 'venezolano':
              self.checked = 'col-md-6 col-sm-6 col-xs-12';
              self.identificacion.venezolano = false;
              self.identificacion.extranjero = false;
              break;
          }
        };
    
        this.siniestroSwitch = function(option){
          switch(option){
            case 'automovil':
              self.siniestroCheck.automovil = true;
              self.siniestroCheck.patrimonial = false;
              self.siniestroCheck.persona = false;
              break;
        
            case 'patrimonial':
              self.siniestroCheck.automovil = false;
              self.siniestroCheck.patrimonial = true;
              self.siniestroCheck.persona = false;
              break;
        
            case 'persona':
              self.siniestroCheck.automovil = false;
              self.siniestroCheck.patrimonial = false;
              self.siniestroCheck.persona = true;
              break;
          };
        };*/

    this.identificacionComboChange = function () {

      console.log(self.ID);
      switch (self.ID) {
        case 'V':
          self.mask = '9999999?9';
          break;
        case 'E':
          self.mask = '9999999?9';
          break;
        case 'J':
          self.mask = '999999999';
          break;
        case 'G':
          self.mask = '999999999';
          break;
        default:
          self.mask = '';
          break;
      };

    };

    this.togglePoliza = function (poliza) {
      for (var i = 0; i < self.polizas.length; i++) {
        self.polizas[i].selected = false;
      };
      poliza.selected = true;
      self.poliza = poliza;
      console.log(poliza);
    };

    this.siniestroWizard = function () {
      $('#siniestroWizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect: 'fade'
      });
    };

    this.wizardPrevious = function () {
      $('#siniestroWizard').smartWizard("prev");
      console.log(self.wizardStep);
      if (self.wizardStep == 2)
        self.wizardCancel();

      if (self.wizardStep > 1)
        self.wizardStep--;
    };

    this.wizardNext = function () {
      switch (self.wizardStep) {

        case 1:
          var validatorResult = validator.checkAll($('#formularioAgregarSiniestroPasoUno'));

          if (validatorResult) {

            //CALL SERVICE
            self.polizas = [];
            //this.consultarPolizasService();
            console.log(self.polizas.length);
            //IN SUCCESS
            var aux;
            if (self.datoSiniestro.tipoSiniestro == '0') {

              aux = 'AUT';
            } else if (self.datoSiniestro.tipoSiniestro == '1') {

              aux = 'PAT';
            } else if (self.datoSiniestro.tipoSiniestro == '2') {

              aux = 'PER';
            }
            console.log(self.ID + '-' + self.datoSiniestro.rifCedula);
            var params = {
              numeroPoliza: '',
              numeroCertificado: 0,
              nuCedula: self.ID + '-' + self.datoSiniestro.rifCedula,
              coRamo: aux, /// Este luego se va a cambiar por coRamo
              cedRifAsegurado: self.ID + '-' + self.datoSiniestro.rifCedula,
              rifAseguradora: '',
              rifTomador: '',
              idMoneda: 0,
              feHasta: '',
              feDesde: '',
              feVencimiento: ''
            };

            siniestroServices.obtenerPolizas(params)
              .success(function (data) {
                self.polizas = [];
                console.log(data);
                for (var i = 0; i < data.length; i++) {

                  self.polizas.push({
                    selected: false,
                    poliza: data[i].numeroPoliza,
                    ramo: data[i].nbOpcionRamo,
                    asegurado: data[i].nbAseguradoTomador,//cambiar
                    tomador: data[i].nbAseguradoTomador,
                    numeroCertificado: data[i].numeroCertificado,
					nuRifAseguradora: data[i].nuRifAseguradora,
					montoDeducible: data[i].montoDeducible,
                    modelo: "",
                    placa: "",
                    ano: "",
                  });
                 
                  if( data[i].coRamo == 'AUT' ){
                    if(data[i].tiposCoberturas){
                      self.polizas[i].modelo = data[i].tiposCoberturas[0].deModelo;
                      self.polizas[i].placa = data[i].tiposCoberturas[0].placa;
                      self.polizas[i].ano = data[i].tiposCoberturas[0].ano;
                    }
                  }
                }

                if (self.polizas.length != 0) {
                  $timeout(function () {
                    var element = angular.element(document.querySelector('#step-2'));
                    var height = element[0].offsetHeight;
                    $('#siniestroWizard').smartWizard("next", height);

                    self.wizardStep++;
                  }, 100);

                  /*                  if (self.datoSiniestro.tipoSiniestro != self.datoAsegurado.tipoSiniestro || self.datoAsegurado.nacionalidad != self.ID || self.datoAsegurado.id != self.datoSiniestro.rifCedula) {  //self.datoAsegurado.codigo != self.tipoID.codigo
                                      self.datoAsegurado.siniestro = self.datoSiniestro.tipoSiniestro;
                                      //self.datoAsegurado.codigo = self.tipoID.codigo;
                                      self.datoAsegurado.nacionalidad = self.ID; //self.tipoID.nombre;
                                      self.datoAsegurado.id = self.datoSiniestro.rifCedula; //self.ID;
                                      self.poliza = undefined;
                                    };*/
                } else {

                  new PNotify({
                    title: 'No hay pólizas',
                    text: 'No hay pólizas registradas de este tipo para este asegurado',
                    type: 'error',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                }

              })
              .error(function (data, status, headers, config) {

                new PNotify({
                  title: '¡Error!',
                  //text: data.mensaje,
                  text: 'Ha ocurrido un error en el sistema.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
              });


            //if(self.polizas.length != 0){


            // if(self.siniestro == 0){
            //     self.polizas = [
            //         { selected: false, poliza: '1-56-20610', ramo: 'Ramo N', asegurado: 'ERFM-L', tomador: 'Rocío', modelo: 'Cruze', placa: 'ISL-UR', ano: '1994' },
            //         { selected: false, poliza: '1-56-20611', ramo: 'Ramo M', asegurado: 'ERFM-L', tomador: 'Juan', modelo: 'Corolla', placa: 'ISL-UJ', ano: '1992' },
            //         { selected: false, poliza: '1-56-20612', ramo: 'Ramo L', asegurado: 'ERFM-L', tomador: 'Jean', modelo: 'Palio', placa: 'ISL-UV', ano: '1993' }
            //     ];
            // }else if(self.siniestro == 1){
            //     self.polizas = [
            //         { selected: false, poliza: '1-56-20610', producto: 'Producto X' },
            //         { selected: false, poliza: '1-56-20611', producto: 'Producto L' },
            //         { selected: false, poliza: '1-56-20612', producto: 'Producto R' }
            //     ];
            // }else if(self.siniestro == 2){
            //     self.polizas = [
            //         { selected: false, poliza: '1-56-20610', ramo: 'Ramo N', tomador: 'Rocío', beneficiario: 'Leia', tipoPoliza: 'ISL-UR' },
            //         { selected: false, poliza: '1-56-20611', ramo: 'Ramo N', tomador: 'Juan', beneficiario: 'Juan', tipoPoliza: 'ISL-UR' },
            //         { selected: false, poliza: '1-56-20612', ramo: 'Ramo N', tomador: 'Joshua', beneficiario: 'Jean', tipoPoliza: 'ISL-UR' }
            //     ];
            // };


            //}else{

            //     new PNotify({
            //         title: 'No hay pólizas',
            //         text: 'No hay pólizas registradas de este tipo para este asegurado',
            //         type: 'error',
            //         styling: 'bootstrap3',
            //         cornerclass: 'ui-pnotify-sharp'
            //     });
            // }

          }
          break;

        case 2:
          if (self.poliza) {
            $timeout(function () {
              var element = angular.element(document.querySelector('#step-2'));
              var height = element[0].offsetHeight;
              $('#siniestroWizard').smartWizard("next", height);
              console.log("13782177");
              self.wizardStep++;
            }, 100);
          } else {
            new PNotify({
              title: '¡Seleccione una póliza!',
              text: 'Debe seleccionar una póliza para continuar.',
              type: 'error',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }
          break;

        case 3:
          break;

        default:
          break;
      };

    };

    this.wizardFinish = function () {

      //var validatorResult = validator.checkAll($('#FinalizarSiniestroGeneral'));

      // if( validator.checkAll($('#FinalizarSiniestroGeneral'))){  //&& validator.checkAll($('#FinalizarSiniestroAutomovil'))
      //
      //self.agregarSiniestroService();
      // }
      if (self.datoSiniestro.tipoSiniestro == 0) {
        var validatorResultGeneral = validator.checkAll($('#FinalizarSiniestroGeneral'));
        //var validatorResultAutomovil = validator.checkAll($('#FinalizarSiniestroAutomovil'));
        var validatorResultAutomovil = true;
        if (validatorResultGeneral && validatorResultAutomovil) {
          console.log('on finish..');
          self.agregarSiniestroService();
        };

      };

      if (self.datoSiniestro.tipoSiniestro == 1) {
        var validatorResultGeneral = validator.checkAll($('#FinalizarSiniestroGeneral'));
        //var validatorResultAutomovil = validator.checkAll($('#FinalizarSiniestroPatrimonial'));
        var validatorResultAutomovil = true;
        if (validatorResultGeneral) {
          console.log('on finish..');
          self.agregarSiniestroService();
        };

      };

      if (self.datoSiniestro.tipoSiniestro == 2) {
        var validatorResultGeneral = validator.checkAll($('#FinalizarSiniestroGeneral'));
        //var validatorResultAutomovil = validator.checkAll($('#FinalizarSiniestroPersona'));
        
        if (validatorResultGeneral) {
          console.log('on finish..');
          self.agregarSiniestroService();
        };

      };


      // if(validator.checkAll($('#FinalizarSiniestroGeneral')) && validator.checkAll($('#FinalizarSiniestroAutomovil'))){
      //     console.log('on finish..');
      //     self.agregarSiniestroService();
      // }


      // if (validator.checkAll($('#FinalizarSiniestroAutomovil'))) {
      //   //
      //   console.log('on auto finish..');
      //   self.agregarSiniestroService();
      // }

      // if (validator.checkAll($('#FinalizarSiniestroPatrimonial'))) {
      //   //
      //   self.agregarSiniestroService();
      // }
      // //
      // if (validator.checkAll($('#FinalizarSiniestroPersona'))) {

      //   self.agregarSiniestroService();
      // }
      // }
    };

    this.wizardCancel = function () {

      self.siniestro = undefined;
      self.ID = undefined;
      self.setObjectElems(self.datoSiniestro, undefined);
      self.setObjectElems(self.datoSiniestroAUT, undefined);
      self.setObjectElems(self.datoSiniestroPAT, undefined);
      self.setObjectElems(self.datoSiniestroPER, undefined);
      self.setObjectElems(self.datoFiltros, undefined);
      self.polizas = [];
      self.poliza = undefined;
      self.agregarSiniestroPolizaModal = undefined;
      self.mask = '';

      while (self.wizardStep > 1) {
        $('#siniestroWizard').smartWizard("prev");
        self.wizardStep--;
      }

      $('#siniestroWizard').smartWizard("reset");
    };

    this.verPoliza = function (item) {

      self.agregarSiniestroPolizaModal = undefined;
      self.agregarSiniestroPolizaModal = item;
      $('.verAgregarSiniestroModal').modal({
        show: 'true'
      });
    };

    this.consultarDetalleSiniestro = function () {
      //self.consultarDetalleSiniestroServices('modal');
      if( self.siniestroModal.coRamo == "PER")
       self.siniestroModal.siniestroPersona.porcentajeIndemnizacion = self.siniestroModal.siniestroPersona.porcentajeIndemnizacion.toString();
     
      $('#consultarSiniestro').modal('show');
    };

    this.cerrarModal = function () {

      $('.modal-backdrop').remove();
    };

    this.editarSiniestroVista = function () {
      console.log(self.siniestroEditar);
      //self.consultarDetalleSiniestroServices('editar');
      if( self.siniestroEditar.coRamo == "PER")
       self.siniestroEditar.siniestroPersona.porcentajeIndemnizacion = self.siniestroEditar.siniestroPersona.porcentajeIndemnizacion.toString();
   
       self.viewsController('editarSiniestro');
    };

    this.editarSiniestro = function () {

      if (self.siniestroEditar.coRamo == 'AUT') {
        var validatorResultAutomovil = validator.checkAll($('#editarFinalizarSiniestroAutomovil'));

        if (validatorResultAutomovil) {
          console.log('on finish..');
          self.editarSiniestroService();
        };

      };

      if (self.siniestroEditar.coRamo == 'PAT') {
        var validatorResultAutomovil = validator.checkAll($('#editarFinalizarSiniestroPatrimonial'));

        if (validatorResultAutomovil) {
          console.log('on finish..');
          self.editarSiniestroService();
        };

      };

      if (self.siniestroEditar.coRamo == 'PER') {
        var validatorResultAutomovil = validator.checkAll($('#editarFinalizarSiniestroPersona'));

        if (validatorResultAutomovil) {
          console.log('on finish..');
          self.editarSiniestroService();
        };
      };
    };

    this.cancelar = function () {
      self.siniestroEditar = undefined;
      document.getElementById("formularioIndemnización").value = "";
      self.consultarSiniestroService();
    };

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

		this.cleanDates = function(){
			self.cambiarFecha('filtroSiniestroFeDesdeOcu',undefined,undefined);
			self.cambiarFecha('filtroSiniestroFeHastaOcu',undefined,undefined);
			self.cambiarFecha('filtroSiniestroFeDesdeNotEm',undefined,undefined);
			self.cambiarFecha('filtroSiniestroFeHastaNotEm',undefined,undefined);
			self.cambiarFecha('filtroSiniestroFeDesdeNotAse',undefined,undefined);
			self.cambiarFecha('filtroSiniestroFeHastaNotAse',undefined,undefined);
		};
		// Fin de Validaciones para datetimepiker

    this.consultarSiniestro = function () {
        console.log('reporteSiniestro');
        var bool = true;
        if(self.views.reporteSiniestro){
            if(self.datoFiltros.nuRifAseguradora != undefined ||  document.getElementById("datoFiltrosNuRifAseguradora").value != ""){
              bool = false;
              for (var i = 0; i < self.ListaAseguradoras.length; i++) {
                  if(self.datoFiltros.nuRifAseguradora == self.ListaAseguradoras[i].data ){ 
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
            if(self.datoFiltros.nuCedula != undefined && self.datoFiltros.nuCedula !=''){
              if(self.datoFiltros.nuCedula.substring(0, 1) != 'V' && self.datoFiltros.nuCedula.substring(0, 1) != 'E'){
                  new PNotify({
                    title: 'Error',
                    text: 'No introdujo un documento de identidad valido el asegurado',
                    type: 'error',
                    styling: 'bootstrap3',
                    cornerclass: 'ui-pnotify-sharp'
                  });
                  bool = false; 
                } 
            } 
            if((self.datoFiltros.feDesdeOcu != undefined && self.datoFiltros.feHastaOcu == undefined)||(self.datoFiltros.feDesdeOcu == undefined && self.datoFiltros.feHastaOcu != undefined)){
                new PNotify({
                  title: 'Error',
                  text: 'No introdujo el rango completo  para las fechas de ocurrencia.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                 bool = false;
            }

            if((self.datoFiltros.feDesdeNotEm != undefined && self.datoFiltros.feHastaNotEm == undefined)||(self.datoFiltros.feDesdeNotEm == undefined && self.datoFiltros.feHastaNotEm != undefined)){
                new PNotify({
                  title: 'Error',
                  text: 'No introdujo el rango completo  para las fechas de notificación de la empresa.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                 bool = false;
            }

            if((self.datoFiltros.feDesdeNotAse != undefined && self.datoFiltros.feHastaNotAse == undefined)||(self.datoFiltros.feDesdeNotAse == undefined && self.datoFiltros.feHastaNotAse != undefined)){
                new PNotify({
                  title: 'Error',
                  text: 'No introdujo el rango completo  para las fechas de notificación de la aseguradora.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
              bool = false;
            }                                                          
 
            if((self.datoFiltros.numeroReclamo == undefined || self.datoFiltros.numeroReclamo == '')&&
            (self.datoFiltros.numeroPoliza == undefined || self.datoFiltros.numeroPoliza == '')&&
            (self.datoFiltros.nuRifEmpresa == undefined || self.datoFiltros.nuRifEmpresa == '')&&
            (document.getElementById("datoFiltrosNuRifAseguradora").value  == '')&&
            (self.datoFiltros.nuCedula == undefined || self.datoFiltros.nuCedula == '')&&
            (self.datoFiltros.coRamo == undefined || self.datoFiltros.coRamo == '')&&
            (self.datoFiltros.coSubRamo == undefined || self.datoFiltros.coSubRamo == '')&&
            (self.datoFiltros.estatus == undefined || self.datoFiltros.estatus == '')&&
            (self.datoFiltros.tipoSiniestro == undefined || self.datoFiltros.tipoSiniestro == '')&&
              self.datoFiltros.feDesdeNotAse == undefined && self.datoFiltros.feDesdeNotEm == undefined &&self.datoFiltros.feDesdeOcu == undefined){
                new PNotify({
                  text: 'No introdujo ningun campo para realizar la busqueda.',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
              bool = false;              
            }
        }
       if(bool)         
          self.consultarSiniestroService();
    };
		this.TipoRamo = function () {
      var auxList = mainServices.getTiposSiniestros();
			switch (self.datoFiltros.coRamo) {
				case 'PAT':
					self.ListaSubRamos = [];
					for (var i = 0; i < self.ListaRamos.length; i++) {
						if (self.ListaRamos[i].coRamo == 'PAT') {
							self.ListaSubRamos.push(self.ListaRamos[i]);
						}
					}
          self.tiposSiniestros = [];
 					for (var i = 0; i < auxList.length; i++) {
						if (auxList[i].coRamo == 'PAT') {
							self.tiposSiniestros.push(auxList[i]);
						}
					}         
					break;
				case 'PER':
					self.ListaSubRamos = [];
					for (var i = 0; i < self.ListaRamos.length; i++) {
						if (self.ListaRamos[i].coRamo == 'PER') {
							self.ListaSubRamos.push(self.ListaRamos[i]);
						}
					}
          self.tiposSiniestros = [];
 					for (var i = 0; i < auxList.length; i++) {
						if (auxList[i].coRamo == 'PER') {
							self.tiposSiniestros.push(auxList[i]);
						}
					}           
					break;
				case 'AUT':
					self.causas = mainServices.getCausas();
					self.ListaSubRamos = [];
					for (var i = 0; i < self.ListaRamos.length; i++) {
						if (self.ListaRamos[i].coRamo == 'AUT') {
							self.ListaSubRamos.push(self.ListaRamos[i]);
						}
					}
          self.tiposSiniestros = [];
 					for (var i = 0; i < auxList.length; i++) {
						if (auxList[i].coRamo == 'AUT') {
							self.tiposSiniestros.push(auxList[i]);
						}
					}           
					break;
        default:
          self.tiposSiniestros = [];
          self.ListaSubRamos = [];
        break; 
			};
    };  
    this.descargarSiniestros = function(){
       var testData = [{
                    name: 'sheet1',
                    data: [['Nro de póliza', 'Ramo', 'Estatus','Aseguradora','Asegurado','Tomador','Número de reclamo','Monto deducible','Monto Pagado','Monto reclamado','Tipo de pago','Fecha de la ocurrencia','Descripción','Observaciones']]
                }];
       //
       for(var i = 0; i< self.listaSiniestros.length; i++){
         testData[0].data.push([
                                 self.listaSiniestros[i].nuPoliza  == null ? 'N/A':self.listaSiniestros[i].nuPoliza ,
                                 self.listaSiniestros[i].coRamo  == null ? 'N/A':self.listaSiniestros[i].coRamo == 'PAT' ? 'Patrimonial':self.listaSiniestros[i].coRamo == 'AUT' ? 'Automovil': 'Persona' ,
                                 self.listaSiniestros[i].estatus  == null ? 'N/A':self.listaSiniestros[i].estatus ,
                                 self.listaSiniestros[i].nbAseguradora  == null ? 'N/A':self.listaSiniestros[i].nbAseguradora ,
                                 self.listaSiniestros[i].nbAsegurado  == null ? 'N/A':self.listaSiniestros[i].nbAsegurado ,
                                 self.listaSiniestros[i].nbTomador  == null ? 'N/A':self.listaSiniestros[i].nbTomador ,
                                 self.listaSiniestros[i].nuReclamo  == null ? 'N/A':self.listaSiniestros[i].nuReclamo ,
                                 self.listaSiniestros[i].montoDeducible  == null ? 'N/A':self.listaSiniestros[i].montoDeducible ,
                                 self.listaSiniestros[i].montoPagado  == null ? 'N/A':self.listaSiniestros[i].montoPagado ,
                                 self.listaSiniestros[i].montoReclamado  == null ? 'N/A':self.listaSiniestros[i].montoReclamado ,
                                 self.listaSiniestros[i].tipoPago  == null ? 'N/A':self.listaSiniestros[i].tipoPago ,
                                 self.listaSiniestros[i].feOcurrencia  == null ? 'N/A':mainServices.revertDate(self.listaSiniestros[i].feOcurrencia) ,
                                 self.listaSiniestros[i].descripcion  == null ? 'N/A':self.listaSiniestros[i].descripcion ,
                                 self.listaSiniestros[i].txObservacion == null ? 'N/A':self.listaSiniestros[i].txObservacion 
                                ]);
          console.log(testData[0].data[i]);
       };
      self.excel.down(testData);
    };
    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    // $('#agregarNumeroReclamo').on('blur', null, validator.checkField);
    // $('#agregarLugarOcurrencia').on('blur', null, validator.checkField);
    // $('#danosReportados').on('blur', null, validator.checkField);
    // $('#agregarNumeroSiniestro').on('blur', null, validator.checkField);
    // $('#agregarEstatus').on('blur', null, validator.checkField);
    // $('#AgregarMontoReclamado').on('blur', null, validator.checkField);
    // $('#agregarUnidad').on('blur', null, validator.checkField);
    // $('#agregarCausa').on('blur', null, validator.checkField);
    // $('#agregarObservaciones').on('blur', null, validator.checkField);
    $('#formularioAgregarUsuarioFechaOcurrencia').on('blur', null, validator.checkField);
    // $('#formularioAgregarUsuarioFechaNotificacionEmpresa').on('blur', null, validator.checkField);
    // $('#formularioAgregarUsuarioFechaNotificacionAseguradora').on('blur', null, validator.checkField);

    // $('#editarNumeroReclamo').on('blur', null, validator.checkField);
    // $('#editarNumeroSiniestro').on('blur', null, validator.checkField);
    // $('#editarLugarOcurrencia').on('blur', null, validator.checkField);
    // $('#editarDanosReportados').on('blur', null, validator.checkField);


    // $('#formularioParentesco').on('blur', null, validator.checkField);
    // $('#formularioPatologia').on('blur', null, validator.checkField);
    // $('#formularioMontoGNA').on('blur', null, validator.checkField);
    // $('#formularioIndemnización').on('blur', null, validator.checkField);

    // $('#editarFormularioParentesco').on('blur', null, validator.checkField);
    // $('#editarFormularioPatologia').on('blur', null, validator.checkField);
    // $('#editarFormularioMontoGNA').on('blur', null, validator.checkField);
    // $('#editarFormularioIndemnización').on('blur', null, validator.checkField);

    $rootScope.$on('agregarSiniestro', function () {

      self.tiposSiniestro = {
        AUT: [],
        PAT: [],
        PER: []
      };

      var tipos = mainServices.getTiposSiniestros();
      self.listaCausas = mainServices.getCausas();
      console.log('tipos: ', tipos);

      for(var i = 0; i < tipos.length; i ++){
        var item = {
          id: tipos[i].idTipoSiniestro,
          codigo: tipos[i].coTipoSiniestro,
          estatus: tipos[i].inEstatus,
          nombre: tipos[i].nbTipoSiniestro,
          ramo: tipos[i].coRamo
        };

        if(item.ramo == 'AUT'){
          self.tiposSiniestro.AUT.push(item);
        }else if(item.ramo == 'PAT'){
          self.tiposSiniestro.PAT.push(item); 
        }else if(item.ramo == 'PER'){
          self.tiposSiniestro.PER.push(item);
        }
      };

      self.siniestroWizard();
      self.wizardCancel();
      self.viewsController('agregarSiniestro');
    });

    $rootScope.$on('listarSiniestros', function () {
      self.views.reporteSiniestro = false; 
      self.consultarSiniestroService();
      console.log('on > listarSiniestros');
    });

    $rootScope.$on('reporteSiniestro', function () {
      //--------------------
      self.ListaAseguradoras = [];
      var auxList = mainServices.getAseguradoras();
      for (var i = 0; i < auxList.length; i++) {
        self.ListaAseguradoras.push({
          data: auxList[i].nu_rif,
          value: auxList[i].nb_aseguradora
        });
      };          
      $('#datoFiltrosNuRifAseguradora').autocomplete({
        lookup: self.ListaAseguradoras,
        onSelect: function (suggestion) {
          self.datoFiltros.nuRifAseguradora = suggestion.data;
          suggestion = null;
          $('#datoFiltrosNuRifAseguradora').closest('.item').removeClass('bad').find('.alert').remove();
        }
      });          
      polizaServices.consultarRamos()
				.success(function (data) {
					self.ListaSubRamos = [];
					for (var i = 0; i < data.ramos.length; i++) {
						self.ListaRamos.push({
							coSubRamo: data.ramos[i].coSubRamo,
							nbRamo: data.ramos[i].nbRamo,
							coRamo: data.ramos[i].coRamo
						});

					};
					data = undefined;
        });
      //--------------------  
      self.listaSiniestros = [];  
      self.destroyTableReporte();  
      self.viewsController('reporteSiniestro');
      console.log('on > reporteSiniestro');
    });

    var btnFinish = $('<button></button>').text('Finish')
      .addClass('btn btn-info')
      .on('click', function () { alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
      .addClass('btn btn-danger')
      .on('click', function () { $('#smartwizard').smartWizard("reset"); });

    $('.siniestro.collapse-link').on('click', function () {

      // var $BOX_PANEL = $(this).closest('.x_panel'),
      //     $ICON = $(this).find('i'),
      //     $BOX_CONTENT = $BOX_PANEL.find('.x_content');

      var $BOX_PANEL = $(this).closest('.x_panel'),
        $ICON = $(this).find('i'),
        $BOX_CONTENT = $BOX_PANEL.find('.x_content');

      // fix for some div with hardcoded fix class
      if ($BOX_PANEL.attr('style')) {
        $BOX_CONTENT.slideToggle(200, function () {
          $BOX_PANEL.removeAttr('style');
          console.log('Abrio');
        });
      } else {
        $BOX_CONTENT.slideToggle(200);
        $BOX_PANEL.css('height', 'auto');
        console.log('Cerro');
      }

      $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    this.cancelarConsultarSiniestro = function () {
      self.listaSiniestros = [];  
      self.destroyTableReporte();      
      self.setObjectElems(self.datoFiltros, undefined);
      document.getElementById("datoFiltrosNuRifAseguradora").value = "";
    };

    this.destroyTable = function () {
      $('#tablaConsultarSiniestros').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
    };

    this.createTable = function () {

			var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verSiniestro cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

			for(var i = 0; i < permisos.length; i ++){
				if(permisos[i].coPermiso == 'editSinie' && permisos[i].value == true){
					editar = true;
					break;
				}
			};

			if(editar || (mainServices.isAdmin() == 1)){
				acciones = '<td style="text-align: center;">\
                                <a class="verSiniestro cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a class="editarSiniestro cursor-pointer" style="margin-right: 10px">\
                                  <i class="fa fa-pencil"></i>\
                                </a>\
                              </td>';
			}
      $('#tablaConsultarSiniestros').DataTable({
        data: self.listaSiniestros,
        aoColumns: [
          { 'data': 'nuReclamo', sDefaultContent: '' },
          { 'data': 'nuPoliza', sDefaultContent: '' },
          //{ 'data': 'asegurado', sDefaultContent: '' },//FALTA CAMPO
          { 'data': 'ramo', sDefaultContent: '' },
          { 'data': 'estatus', sDefaultContent: '' },
          {
            'defaultContent': acciones
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });
      $('#tablaConsultarSiniestros tbody').on('click', '.verSiniestro', function () {
        var sinModal = $('#tablaConsultarSiniestros').DataTable().row($(this).parents('tr')).data();

        self.siniestroModal = JSON.parse(JSON.stringify(sinModal));

        console.log(self.siniestroModal);
        $('.activarModalSiniestro').click();
      });

      $('#tablaConsultarSiniestros tbody').on('click', '.editarSiniestro', function () {
        var editModal = $('#tablaConsultarSiniestros').DataTable().row($(this).parents('tr')).data();

        
        self.siniestroEditar = JSON.parse(JSON.stringify(editModal));
        console.log(self.siniestroEditar);
        if(self.siniestroEditar.coRamo == 'PAT'){
          console.log(self.siniestroEditar.siniestroPatrimoniales.montoAjustadoNeto);
          self.siniestroEditar.datoSiniestroPAT = JSON.parse(JSON.stringify(editModal.siniestroPatrimoniales));
          // self.siniestroEditar.datoSiniestroPAT.montoAjustadoNeto = self.siniestroEditar.siniestroPatrimoniales.montoAjustadoNeto;
          // self.siniestroEditar.datoSiniestroPAT.montoAjustado = self.siniestroEditar.siniestroPatrimoniales.montoAjustado;
          // self.siniestroEditar.datoSiniestroPAT.ajustador = self.siniestroEditar.siniestroPatrimoniales.ajustador;
        }else if(self.siniestroEditar.coRamo == 'PER'){
          self.siniestroEditar.datoSiniestroPER = JSON.parse(JSON.stringify(editModal.siniestroPersona));
        }else if(self.siniestroEditar.coRamo == 'AUT'){
          self.siniestroEditar.datoSiniestroAUT = JSON.parse(JSON.stringify(editModal.siniestroAutomovil));
        }
        
        $('.activarEditarSiniestro').click();
      });
    };

    this.destroyTableReporte = function () {
      $('#tablaConsultarSiniestrosReporte').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTableReporte();
    };

    this.createTableReporte = function () {
			var permisos = mainServices.getPermisos();
			var editar = false;
			var acciones = '<td style="text-align: center;">\
                                <a class="verSiniestro cursor-pointer" style="margin-right: 10px" data-toggle="modal">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                              </td>';
			console.log(permisos);

      $('#tablaConsultarSiniestrosReporte').DataTable({
        data: self.listaSiniestros,
        aoColumns: [
          { 'data': 'nuReclamo', sDefaultContent: '' },
          { 'data': 'nuPoliza', sDefaultContent: '' },
          //{ 'data': 'asegurado', sDefaultContent: '' },//FALTA CAMPO
          { 'data': 'ramo', sDefaultContent: '' },
          { 'data': 'estatus', sDefaultContent: '' },
          {
            'defaultContent': acciones
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });
      $('#tablaConsultarSiniestrosReporte tbody').on('click', '.verSiniestro', function () {
        var sinModal = $('#tablaConsultarSiniestrosReporte').DataTable().row($(this).parents('tr')).data();

        self.siniestroModal = JSON.parse(JSON.stringify(sinModal));

        console.log(self.siniestroModal);
        $('.activarModalSiniestro').click();
      });

      $('#tablaConsultarSiniestrosReporte tbody').on('click', '.imprimirSiniestro', function () {
        var editModal = $('#tablaConsultarSiniestrosReporte').DataTable().row($(this).parents('tr')).data();

        
        self.siniestroEditar = JSON.parse(JSON.stringify(editModal));
        console.log(self.siniestroEditar);

        if(self.siniestroEditar.coRamo == 'PAT'){
          console.log(self.siniestroEditar.siniestroPatrimoniales.montoAjustadoNeto);
          self.siniestroEditar.datoSiniestroPAT = JSON.parse(JSON.stringify(editModal.siniestroPatrimoniales));
         
        }else if(self.siniestroEditar.coRamo == 'PER'){
          self.siniestroEditar.datoSiniestroPER = JSON.parse(JSON.stringify(editModal.siniestroPersona));
        }else if(self.siniestroEditar.coRamo == 'AUT'){
          self.siniestroEditar.datoSiniestroAUT = JSON.parse(JSON.stringify(editModal.siniestroAutomovil));
        }

      });
    };    


    //     $("#reset-btn").on("click", function() {
    //     // Reset wizard
    //     $('#smartwizard').smartWizard("reset");
    //     return true;
    // });

    // $("#prev-btn").on("click", function() {
    //     // Navigate previous
    //     $('#smartwizard').smartWizard("prev");
    //     return true;
    // });

    // $("#next-btn").on("click", function() {
    //     // Navigate next
    //     $('#smartwizard').smartWizard("next");
    //     return true;
    // });

    // this.siniestroWizard = function(){
    //   $('#wizard').smartWizard({
    //     onLeaveStep: self.asd1,
    //     onFinish: self.asd2
    //   });
    //   $('.buttonNext').addClass('btn btn-success');
    //   $('.buttonPrevious').addClass('btn btn-primary');
    //   $('.buttonFinish').addClass('btn btn-default');
    //   console.log('Entro aca funcion');
    //   // $('stepContainer').css({
    //   //   height: '287px'
    //   // });
    // };

    // self.siniestroWizard();

    // this.funcasd = function(){
    //   console.log('asd');
    // }
    //
    // this.pruebaAvanzar = function(){
    //   console.log('asdprueba');
    //   $('#wizard').goForward();
    // };

    // $('#angularSelect option[value=theOptionValue]').prop('selected', 'selected').change();

    // $('#angularSelect').on('change', function() {
    //   if(this.value == 'Automóvil'){
    //     console.log('** angularSelect > Automovil jQuery.. **');
    //     $('.tablaAutomovil').show();
    //     $('.tablaPatrimonial').hide();
    //   }else if(this.value == 'Patrimonial'){
    //     console.log('** angularSelect > Patrimonial jQuery.. **');
    //     $('.tablaAutomovil').hide();
    //     $('.tablaPatrimonial').show();
    //   }
    // });

    /*
      ramo
      nro siniestro
      fecha ocurrencia
      fecha de declaracion
      fecha de notificacion
      causa
      Monto reclamado
      monto ajustado/verificado
      deducible (varchar)
      Neto deducible
 
      observacion
      ajustador
      dias transcurridos desde la fecha de ocurrencia
 
 
 
      poliza subramo tomador asegurado
    */

  }]);



})();
