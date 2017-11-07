(function () {

  'use strict';

  var facturaController = angular.module('DGBOSS.facturaController', ['DGBOSS.facturaServices', 'DGBOSS.polizaServices', 'DGBOSS.reportServices', 'DGBOSS.bonoAsignadoServices']);

  facturaController.controller('facturaController', ['$scope', '$rootScope', 'facturaServices', 'mainServices', '$timeout', 'polizaServices', 'financiadoraServices', 'reportServices', 'bonoAsignadoServices', '$sce', function ($scope, $rootScope, facturaServices, mainServices, $timeout, polizaServices, financiadoraServices, reportServices, bonoAsignadoServices, $sce) {

    var self = this;

    self.listaTipoPersona = [];

    console.log('facturaController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      agregarFactura: false,
      consultarFactura: false,
      agregarNotaDebito: false,
      notas: false,
      consultarNotas: false
    };

    this.facturaDatos = {
      para: undefined,
      cliente: undefined,
      identificacion: undefined,
      telefono: undefined,
      direccion: undefined,
      correo: undefined,
      dirFiscal: undefined,
      numeroFactura: undefined,
      observaciones: undefined,
      fechaRegistro: undefined,
      usuarioRegistro: undefined,
      numeroSecuencia: undefined,
      tableVisibility: false,
      agregarElemento: true,
      editarElemento: false
    };

    this.paraCombo = {
      tamanio: 'col-md-7 col-sm-7 col-xs-12 no-padding-left',
      opciones: [{ codigo: 0, nombre: 'Aseguradora' },
      { codigo: 1, nombre: 'Financiadora' },
      { codigo: 2, nombre: 'Productora' }
      ]
    };

    this.autocompletarIDFactura = undefined;
    this.autocompletarListFactura = undefined;

    this.paraInput = {
      button: undefined,
      input: false,
      // aseguradoraInput: false,
      // financiadoraInput: false,
      // productoraInput: false,
      //asegurado: [],
      aseguradora: [],
      financiadora: [],
      productora: []
    };

    this.facturaDatosNotas = [];
    this.facturaDatosNotasModal = {};
    this.notaDebitoResponse = true;
    this.notaCreditoResponse = true;

    this.detalleFactura = {
      id: 0,
      resumen: undefined,
      cantidad: undefined,
      precioUnidad: undefined,
      iva: false,
      ivaCheckbox: '',
      descripcion: undefined,
      totalItem: undefined,

      subtotal: 0,
      ivaTotal: 0,
      total: 0
    };

    this.items = [];

    this.detalleFactura2 = {
      resumen: undefined,
      cantidad: undefined,
      precioUnidad: undefined,
      iva: false,
      ivaCheckbox: '',
      descripcion: undefined,
      totalItem: undefined
    };

    this.itemRespaldo = undefined;

    this.itemEliminar = undefined;
    this.eliminarIndice = undefined;

    this.wizardStep = 1;

    this.wizardButtons = {
      anterior: false,
      siguiente: true,
      finalizar: false
    };

    this.parametros = undefined;
    this.parametrosD = [];

    this.indice = undefined;

    this.facturaModalVer = undefined;
    this.facturaModalImprimir = undefined;
    this.facturaModalEliminar = undefined;
    this.facturaNotas = undefined;
    this.parameterIva=15;

    /*this.tableItems = [
      {numeroFactura: '00-01234', identificacion:'V-23.635.276', cliente:'Jean Freitas', fecha:'05/11/1978'}, //debito: [], credito: []},
      {numeroFactura: '00-01235', identificacion:'V-23.635.277', cliente:'Juan Figueira', fecha:'27/10/1910'}, //debito: undefined, credito: undefined},
      {numeroFactura: '00-01236', identificacion:'R-23.635.276-1', cliente:'Unos Gorditos Ahi', fecha:'27/10/1990'}, //debito: undefined, credito: undefined},
      {numeroFactura: '00-01237', identificacion:'V-23.635.276', cliente:'Daniel Corrales', fecha:'23/12/1992'}//, debito: undefined, credito: undefined}
    ];*/

    this.notaTabla = [];

    this.datosNota = {
      fechaEmision: undefined,
      observaciones: '',
      estatus: undefined,
      subtotal: 0,
      iva: 0,
      total: 0,
    };

    this.datosNotaDebito = {
      agregar: false,
      idNota: undefined,
      numeroControl: undefined,
      monto: undefined,
      fecha: undefined,
      descripcion: undefined,
      verNumeroControl: undefined,
      verMonto: undefined,
      verFecha: undefined,
      verDescripcion: undefined
    };

    this.notaDebitoTabla = [];

    this.datosNotaCredito = {

      agregar: false,
      numeroControl: undefined,
      monto: undefined,
      fecha: undefined,
      descripcion: undefined,
      verNumeroControl: undefined,
      verMonto: undefined,
      verFecha: undefined,
      verDescripcion: undefined

    };

    this.notaCreditoTabla = [];

    this.notaIVA = false;

    this.radioNotaCheck = {
      debito: true,
      credito: false
    };

    this.radioNota = {

      debito: 'iradio_flat-green checked',
      credito: 'iradio_flat-green'
    };

    /********************************************************************************************
    **                                      S E R V I C E S                                    **
    ********************************************************************************************/

    this.consultarFacturaService = function () {
      console.log('consultarFacturaService.----------.');
      var params = {

      };

      facturaServices.consultarFacturas(params)
        .success(function (data) {
          console.log(data);

          //if(data.codigo == 200){

          self.tableItems = [];

          if (data.length == 0) {

            new PNotify({
              title: '¡Alerta!',
              text: 'Disculpe. Aún no hay facturas registradas.',
              type: 'notice',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          }

          for (var i = 0; i < data.length; i++) {

            /*if(data[i].estatus == 1)
              data[i].estatus = 'Activo';
            else if(data[i].estatus == 0)
              data[i].estatus = 'Inactivo'*/

            self.tableItems.push({
              id: data[i].id,
              tipoPersona: data[i].tipoPersona,
              sexo: data[i].sexo,
              nombre: data[i].nombre,
              identificacion: data[i].identificacion,
              estadoCivil: data[i].estadoCivil,
              telefono: data[i].telefono,
              correo: data[i].correo,
              localidad: data[i].localidad,
              direccionH: data[i].direccionH,
              telefonoH: data[i].telefonoH,
              direccionO: data[i].direccionO,
              telefonoO: data[i].telefonoO,
              profesion: data[i].profesion,
              ocupacion: data[i].ocupacion,
              ingresos: data[i].ingresos,
              pagina: data[i].pagina,
              facebook: data[i].facebook,
              instagram: data[i].instagram,
              twitter: data[i].twitter,
              otro: data[i].otro
            });
          };

          self.viewsController('consultarFactura');

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

          if (!$.fn.DataTable.isDataTable('#tablaConsultarFacturas')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        })
    }

    this.agregarFacturaService = function () {

      var params = {};

      params = JSON.parse(JSON.stringify(self.parametros));

      facturaServices.agregarFactura(params)
        .success(function (data) {
          console.log(data);
          //$('#facturaWizard').smartWizard("reset");
          //if(data.codigo = 200){

          new PNotify({
            title: '¡Factura Creada!',
            text: data.mensaje,
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });

          self.facturaDatos = {

            para: undefined,
            cliente: undefined,
            identificacion: undefined,
            telefono: undefined,
            direccion: undefined,
            correo: undefined,
            dirFiscal: undefined,
            numeroFactura: undefined,
            observaciones: undefined,
            fechaRegistro: undefined,
            usuarioRegistro: undefined,
            numeroSecuencia: undefined,
            tableVisibility: false,
            agregarElemento: true,
            editarElemento: false
          };

          //self.consultarFacturaService();
          //self.setObjectElems(self.agregarMoneda, undefined);
          self.detalleFactura.resumen = undefined;
          self.detalleFactura.cantidad = undefined;
          self.detalleFactura.precioUnidad = undefined;
          self.detalleFactura.iva = false;
          self.detalleFactura.ivaCheckbox = '';
          self.detalleFactura.descripcion = undefined;
          self.detalleFactura.totalItem = undefined;
          self.detalleFactura.subtotal = 0;
          self.detalleFactura.ivaTotal = 0;
          self.detalleFactura.total = 0;
          self.items = [];

          self.detalleFactura2.resumen = undefined;
          self.detalleFactura2.cantidad = undefined;
          self.detalleFactura2.precioUnidad = undefined;
          self.detalleFactura2.iva = false;
          self.detalleFactura2.ivaCheckbox = '';
          self.detalleFactura2.descripcion = undefined;
          self.detalleFactura2.totalItem = undefined;

          self.items = [];

          self.wizardButtons = {
            anterior: false,
            siguiente: true,
            finalizar: false
          };

          self.wizardStep = 1;

          $('#facturaWizard').smartWizard("reset");

          $rootScope.$emit('consultarFactura');

          /*if(self.wizardStep>1){
            $('#facturaWizard').smartWizard("prev");
            self.wizardStep --;
          }*/
          /*}else{

            switch(option){
              case 'agregar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de crear la moneda.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              case 'editar':
                new PNotify({
                  title: '¡Error!',
                  text: 'Hubo un error al momento de editar la moneda.',
                  type: 'error',
                  styling: 'bootstrap3',
                  cornerclass: 'ui-pnotify-sharp'
                });
                break;

              default:
                break;
            };

          }*/
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

    }

    this.imprimirFactura = function () {

      var params = {

        fecha: self.facturaModalImprimir.fechaEmision,
        numeroFactura: self.facturaModalImprimir.numeroFactura,
        nombreRazonSocial: self.facturaModalImprimir.descripcion,
        rif: self.facturaModalImprimir.nuCedulaRif,
        direccion: self.facturaModalImprimir.direccion,
        telefono: self.facturaModalImprimir.telefono, //noLlega
        banco: self.facturaModalImprimir.banco, //noLLega
        observacion: self.facturaModalImprimir.observaciones,
        subTotal: self.facturaModalImprimir.subtotal,
        ivaTotal: self.facturaModalImprimir.iva,
        descuento: '0',//self.facturaModalImprimir.descuento,
        total: self.facturaModalImprimir.total,
        detallesFacturas: self.facturaModalImprimir.detallesFactura,
        credencial: self.facturaModalImprimir.credencial === "null" ? undefined : self.facturaModalImprimir.credencial
      }

      console.log(params);
      reportServices.generarReporteFactura(params)
        .success(function (data) {

          var file = new Blob([data], { type: 'application/pdf' });
          var url = URL.createObjectURL(file);

          $scope.contentCompCita = $sce.trustAsResourceUrl(url);
          window.open($scope.contentCompCita);
          new PNotify({
            title: 'Operación Exitosa',
            text: 'Factura generada con éxito',
            //text: 'Ha ocurrido un error en el sistema.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          $('.modal-backdrop').remove();

        })
        .error(function (data, status, headers, config) {

          $('.modal-backdrop').remove();
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

    this.consultarNotaDebitoService = function () {
      console.log('consultarNotaDebitoService..');
      var params = {
        factura: self.facturaModaVer.id
      };

      notaDebitoServices.consultarNotasDebito(params)
        .success(function (data) {
          console.log(data);

          //if(data.codigo == 200){

          self.notaDebitoTabla = [];

          for (var i = 0; i < data.length; i++) {

            /*if(data[i].estatus == 1)
              data[i].estatus = 'Activo';
            else if(data[i].estatus == 0)
              data[i].estatus = 'Inactivo'*/

            self.notaDebitoTabla.push({

              idNotaDebito: data[i].idNotaDebito,
              factura: data[i].factura,
              fecha: data[i].fechaNotaDebito,
              monto: data[i].monto,
              numeroControl: data[i].numeroControl,
              descripcion: data[i].descripcion,
              estatus: data[i].estatus
            });
          };

          //self.viewsController('consultarFactura');

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

          if (!$.fn.DataTable.isDataTable('#tablaConsultarFacturas')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        })
    }

    this.agregarNotaDebitoService = function (params) {

      facturaServices.agregarNotaDebito(params)
        .success(function (data) {
          console.log(data);

          new PNotify({
            title: '¡Nota Débito creada!',
            text: 'La Nota de Débito fue creada con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.cancelarNotas();

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

    }

    this.consultarNotaCreditoService = function () {
      console.log('consultarNotaCreditoService..');
      var params = {
        factura: self.facturaModaVer.id
      };

      notaCreditoServices.consultarNotasCredito(params)
        .success(function (data) {
          console.log(data);

          //if(data.codigo == 200){

          self.notaCreditoTabla = [];

          for (var i = 0; i < data.length; i++) {

            /*if(data[i].estatus == 1)
              data[i].estatus = 'Activo';
            else if(data[i].estatus == 0)
              data[i].estatus = 'Inactivo'*/

            self.notaCreditoTabla.push({

              idNotaCredito: data[i].idNotaCredito,
              factura: data[i].factura,
              fecha: data[i].fechaNotaCredito,
              monto: data[i].monto,
              numeroControl: data[i].numeroControl,
              descripcion: data[i].descripcion,
              estatus: data[i].estatus
            });
          };

          //self.viewsController('consultarFactura');

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

          if (!$.fn.DataTable.isDataTable('#tablaConsultarFacturas')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        })
    }

    this.agregarNotaCreditoService = function (params) {

      facturaServices.agregarNotaCredito(params)
        .success(function (data) {
          console.log(data);

          new PNotify({
            title: '¡Nota Crédito creada!',
            text: 'La Nota de Crédito fue creada con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.cancelarNotas();
          //self.viewsController('consultarFactura');

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

    }

    //This is the working service.
    this.consultarNotasDebitoService = function (params) {

      facturaServices.consultarNotasDebito(params)
        .success(function (data) {
          console.log(data);

          if (data.mensaje == 'No hay datos para la consulta' && self.notaCreditoResponse == false) {
            new PNotify({
              title: '¡Error!',
              text: 'La factura no tiene notas de débito/crédito asociadas.',
              type: 'error',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
          } else if (data.mensaje == 'No hay datos para la consulta') {
            self.viewsController('consultarNotas');
          } else {

            for (var i = 0; i < data.length; i++) {
              var excentoIva = 'No';

              if (data[i].excentoIva == 1)
                excentoIva = 'Sí';

              self.facturaDatosNotas.push({
                cedulaRif: data[i].cedulaRif,
                direccion: data[i].direccion,
                numeroControl: data[i].numeroControl,
                descripcion: data[i].descripcion,
                numeroFactura: data[i].numeroFactura,
                fecha: data[i].fechaNotaDebito,
                estatus: data[i].estatusNotaDebito,
                observacion: data[i].obsevacion,
                rifEmpresa: data[i].rifEmpresa,
                iva: data[i].iva,
                subTotal: data[i].subTotal,
                tipoPersona: data[i].tipoPersona,
                total: data[i].total,
                excentoIva: excentoIva,
                detalles: data[i].detallesNotasDebito,
                tipoNota: 'Débito'
              });
            }

            console.log(self.facturaDatosNotas);
            self.viewsController('consultarNotas');
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
        })
    }

    //This is the working service.
    this.consultarNotasCreditoService = function (params) {

      facturaServices.consultarNotasCredito(params)
        .success(function (data) {
          console.log(data);

          self.facturaDatosNotas = [];

          if (data.mensaje == 'No hay datos para la consulta')
            self.notaCreditoResponse = false;
          else {
            for (var i = 0; i < data.length; i++) {
              var excentoIva = 'No';

              if (data[i].excentoIva == 1)
                excentoIva = 'Sí';

              self.facturaDatosNotas.push({
                cedulaRif: data[i].cedulaRif,
                direccion: data[i].direccion,
                numeroControl: data[i].numeroControl,
                descripcion: data[i].descripcion,
                numeroFactura: data[i].numeroFactura,
                fecha: data[i].fechaNotaCredito,
                estatus: data[i].estatusNotaCredito,
                observacion: data[i].obsevacion,
                rifEmpresa: data[i].rifEmpresa,
                iva: data[i].iva,
                subTotal: data[i].subTotal,
                tipoPersona: data[i].tipoPersona,
                total: data[i].total,
                excentoIva: excentoIva,
                detalles: data[i].detallesNotasCredito,
                tipoNota: 'Crédito'
              });
            }
          }

          console.log(self.facturaDatosNotas);
          self.consultarNotasDebitoService(params);
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
        })
    }

    /********************************************************************************************
    **                                      F U N C T I O N S                                  **
    ********************************************************************************************/

    this.setObjectElems = function (obj, option) {
      angular.forEach(obj, function (value, key) {
        obj[key] = option;
      });
    };

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'verFactura':
          self.views.verFactura = true;
          console.log('viewsController > verFactura');
          break;
        case 'agregarFactura':
          self.views.agregarFactura = true;
          console.log('viewsController > agregarFactura');
          self.setObjectElems(self.facturaDatos, undefined);
          self.facturaDatos.tableVisibility = false;
          self.facturaDatos.agregarElemento = true;
          self.facturaDatos.editarElemento = false;
          break;
        case 'consultarFactura':
          self.views.consultarFactura = true;
          self.views.notas = false;
          console.log('viewsController > consultarFactura');
          break;
        case 'consultarNotas':
          self.views.consultarNotas = true;
        default:
          break;
      };
    };

    this.paraComboChange = function () {

      //self.facturaDatos.cliente = undefined;

      if (self.facturaDatos.para != undefined) {
        self.paraCombo.tamanio = 'col-md-2 col-sm-2 col-xs-12 no-padding-left';
        self.paraInput.button = true;
        self.paraInput.input = true;
        switch (self.facturaDatos.para) {
          case 'S':
            self.autocompletarListFactura = self.formularioAgregarFacturaInputAseguradoraAutocompletar;
            break;
          case 'F':
            self.autocompletarListFactura = self.formularioAgregarFacturaInputFinanciadoraAutocompletar;
            break;
          case 'P':
            self.autocompletarListFactura = self.formularioAgregarFacturaInputProductorAutocompletar;
            break;
          default:
            break;
        };
      } else {
        self.paraCombo.tamanio = 'col-md-7 col-sm-7 col-xs-12 no-padding-left';
        self.paraInput.button = false;
        self.paraInput.input = false;
      }


    };

    this.showTable = function () {

      if (validator.checkAll($('#formularioAgregarFacturaInputAutocompletar'))) {

        self.facturaDatos.cliente = {};
        self.facturaDatos.tableVisibility = false;
        switch (self.facturaDatos.para) {
          case 'F':
            var respuesta = true;
            for (var i = 0; i < self.listaFinanciadoras.length; i++) {

              if (self.facturaDatos.identificacion.toUpperCase() == self.listaFinanciadoras[i].nbFinanciadora) {

                respuesta = false;
                var params = {
                  "rif": self.listaFinanciadoras[i].nuRif,
				  "control": 1
                };
                financiadoraServices.consultarFinanciadoras(params)
                  .success(function (data) {
                    console.log('Financiadora', data);
                    //self.facturaDatos.cliente = data[0];
                    self.facturaDatos.cliente.nuCedulaRif = data[0].nuRif;
                    self.facturaDatos.cliente.inTipoPersona = self.facturaDatos.para;
                    self.facturaDatos.cliente.nombre = data[0].nbFinanciadora;
                    self.facturaDatos.cliente.telefono = data[0].nuTelefonoSucursal;
                    self.facturaDatos.cliente.direccion = data[0].diSucursal;
                    self.facturaDatos.cliente.correo = data[0].txCorreo;
                    self.facturaDatos.cliente.credencial = undefined;
                    self.facturaDatos.tableVisibility = true;
                    self.wizardResize();
                  });
                break;
              }
            }
            if (respuesta) {
              new PNotify({
                title: '¡Error!',
                text: 'La financiadora ingresada no se encuentra registrada.',
                //text: 'Ha ocurrido un error en el sistema.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
            break;
          case 'S':
            var respuesta = true;
            for (var i = 0; i < self.listaAseguradoras.length; i++) {

              if (self.facturaDatos.identificacion.toUpperCase() == self.listaAseguradoras[i].nb_aseguradora) {
                respuesta = false;
                bonoAsignadoServices.consultarAseguradora()
                  .success(function (data) {
                    for (var ciclo = 0; ciclo < self.listaAseguradoras.length; ciclo++) {

                      if (self.listaAseguradoras[i].nu_rif == data[ciclo].nu_rif) {
                        self.facturaDatos.cliente.nuCedulaRif = data[ciclo].nu_rif;
                        self.facturaDatos.cliente.inTipoPersona = self.facturaDatos.para;
                        self.facturaDatos.cliente.nombre = data[ciclo].nb_aseguradora;
                        self.facturaDatos.cliente.telefono = data[ciclo].nu_telefono;
                        //self.facturaDatos.cliente.direccion = data[ciclo].di_fiscal;
                        self.facturaDatos.cliente.correo = data[ciclo].txCorreo;
                        self.facturaDatos.tableVisibility = true;
                        // find contactos
                        var params = {
                          rifAseguradora: self.facturaDatos.cliente.nuCedulaRif,
                          rifEmpresa: mainServices.getRifEmpresa()
                        };

                        bonoAsignadoServices.consultarContactos(params)
                          .success(function (dataContactos) {
                            var corretajes = [];
                            corretajes = dataContactos.corretajes;
                            self.facturaDatos.cliente.direccion = corretajes[0].di_fiscal;
                            self.facturaDatos.cliente.credencial = corretajes[0].nu_credencial;

                          });
                        self.wizardResize();
                        break;
                      }
                    }
                  });
                break;
              }
            }
            if (respuesta) {
              new PNotify({
                title: '¡Error!',
                text: 'La aseguradora ingresada no se encuentra registrada.',
                //text: 'Ha ocurrido un error en el sistema.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
            break;
          case 'P':
            for (var i = 0; i < self.listaProductores.length; i++) {

              if (self.facturaDatos.identificacion.toUpperCase() == self.listaProductores[i].nbUsuario) {

                self.facturaDatos.cliente = {};
                self.facturaDatos.cliente.inTipoPersona = self.facturaDatos.para;
                self.facturaDatos.cliente.nuCedulaRif = self.productores[i].nuCedulaRif;
                self.facturaDatos.cliente.nombre = self.productores[i].nombre;
                self.facturaDatos.cliente.telefono = self.productores[i].nuCelular;
                self.facturaDatos.cliente.direccion = self.productores[i].diHabitacion;
                self.facturaDatos.cliente.correo = self.productores[i].txCorreo;
                self.facturaDatos.cliente.credencial = undefined;
                self.facturaDatos.tableVisibility = true;
                self.wizardResize();
                break;
              }
            }
            if (!self.facturaDatos.tableVisibility) {
              new PNotify({
                title: '¡Error!',
                text: 'El productor ingresado no se encuentra registrado.',
                //text: 'Ha ocurrido un error en el sistema.',
                type: 'error',
                styling: 'bootstrap3',
                cornerclass: 'ui-pnotify-sharp'
              });
            }
            break;
        }
      }


      self.wizardResize();
    };

    this.cambiarFecha = function (option) {
      switch (option) {
        case 'agregar':
          $('#formularioAgregarFacturaFecha').closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
          break;
        case 'agregar2':
          $('#formularioAgregarNotaDebitoFecha').closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
          break;
        case 'agregar3':
          $('#formularioAgregarNotaCreditoFecha').closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
          break;
        default:
          break;
      }
    };

    this.toggleNotaIVA = function () {
      self.notaIVA = !self.notaIVA;
      self.calculateNotaIVA();
    };

    this.calculateNotaIVA = function () {
      if ((self.notaTabla.length > 0) && self.notaIVA) {

        self.datosNota.subtotal = 0;
        self.datosNota.iva = 0;
        self.datosNota.total = 0;

        for (var i = 0; i < self.notaTabla.length; i++) {
          self.notaTabla[i].iva = (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad) * (self.parameterIva/100);
          self.notaTabla[i].total = (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad) + self.notaTabla[i].iva;
          self.datosNota.subtotal = self.datosNota.subtotal + (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad);
          self.datosNota.iva = self.datosNota.iva + self.notaTabla[i].iva;
        }
        self.datosNota.total = self.datosNota.subtotal + self.datosNota.iva;

      } else if (!self.notaIVA) {

        self.datosNota.subtotal = 0;
        self.datosNota.iva = 0;
        self.datosNota.total = 0;

        for (var i = 0; i < self.notaTabla.length; i++) {
          self.notaTabla[i].iva = 0;
          self.notaTabla[i].total = (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad) + self.notaTabla[i].iva;
          self.datosNota.subtotal = self.datosNota.subtotal + (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad);
          self.datosNota.iva = self.datosNota.iva + self.notaTabla[i].iva;
        }

        //self.datosNota.subtotal = 0;
        self.datosNota.iva = 0;
        self.datosNota.total = self.datosNota.subtotal + self.datosNota.iva;
      }
    };

    this.toggleIVA = function () {
      switch (self.detalleFactura.iva) {
        case true:
          self.detalleFactura.iva = false;
          self.detalleFactura.ivaCheckbox = '';
          break;

        case false:
          self.detalleFactura.iva = true;
          self.detalleFactura.ivaCheckbox = 'checked';
          break;

        default:
          break;
      };

      switch (!self.detalleFactura2.iva) {
        case true:
          self.detalleFactura2.iva = false;
          self.detalleFactura2.ivaCheckbox = '';
          break;

        case false:
          self.detalleFactura2.iva = true;
          self.detalleFactura2.ivaCheckbox = 'checked';
          break;

        default:
          break;
      };
    };

    this.anadir = function () {

      var validatorResult = validator.checkAll($('#objetoDatos'));
      if (validatorResult) {
        if (self.detalleFactura.iva) {

          self.detalleFactura.iva = self.detalleFactura.cantidad * self.detalleFactura.precioUnidad * (self.parameterIva/100);
          self.detalleFactura.totalItem = (self.detalleFactura.cantidad * self.detalleFactura.precioUnidad) + (self.detalleFactura.iva);
        }
        else {
          self.detalleFactura.iva = 'N/A',
            self.detalleFactura.totalItem = self.detalleFactura.cantidad * self.detalleFactura.precioUnidad;
        };

        this.items.push({
          id: 0,
          resumen: self.detalleFactura.resumen,
          cantidad: self.detalleFactura.cantidad,
          precioUnidad: self.detalleFactura.precioUnidad,
          iva: self.detalleFactura.iva,
          totalItem: self.detalleFactura.totalItem,
          descripcion: self.detalleFactura.descripcion
        });

        if (self.detalleFactura.iva == 'N/A') {

          self.detalleFactura.iva = 0;
        }
        self.detalleFactura.subtotal = self.detalleFactura.subtotal + (self.detalleFactura.totalItem - self.detalleFactura.iva);
        self.detalleFactura.ivaTotal = self.detalleFactura.ivaTotal + self.detalleFactura.iva;
        self.detalleFactura.total = self.detalleFactura.subtotal + self.detalleFactura.ivaTotal;

        self.detalleFactura.resumen = undefined;
        self.detalleFactura.cantidad = undefined;
        self.detalleFactura.precioUnidad = undefined;
        self.detalleFactura.iva = false;
        self.detalleFactura.ivaCheckbox = '';
        self.detalleFactura.totalItem = undefined;
        self.detalleFactura.descripcion = undefined;

        new PNotify({
          title: '¡Elemento creado!',
          text: 'El elemento fue creado con éxito.',
          type: 'success',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });

        $timeout(function () {
          var element = angular.element(document.querySelector('#facturaWizardPaso2'));
          var height = element[0].offsetHeight;

          var element2 = angular.element(document.querySelector('#tableContainer'));
          var height2 = element2[0].offsetHeight;

          $('#facturaWizard').smartWizard("fixHeight", height + height2);
        }, 100);

      }
    };

    this.verItem = function (item) {

      self.detalleFactura2.resumen = item.resumen;
      self.detalleFactura2.cantidad = item.cantidad;
      self.detalleFactura2.precioUnidad = item.precioUnidad;
      self.detalleFactura2.iva = item.iva;
      self.detalleFactura2.totalItem = item.totalItem;
      self.detalleFactura2.descripcion = item.descripcion;
    };

    this.editar = function (item) {

      self.itemRespaldo = JSON.parse(JSON.stringify(item));;
      self.indice = self.items.indexOf(item);
      //self.detalleFactura.resumen = item.resumen;
      self.detalleFactura2.resumen = item.resumen;
      self.detalleFactura2.cantidad = item.cantidad;
      self.detalleFactura2.precioUnidad = item.precioUnidad;
      self.detalleFactura2.iva = item.iva;
      self.editarIVA();
      self.detalleFactura2.totalItem = item.totalItem;
      self.detalleFactura2.descripcion = item.descripcion;
      self.facturaDatos.agregarElemento = false;
      self.facturaDatos.editarElemento = true;
    };

    this.editarIVA = function () {
      switch (self.detalleFactura2.iva) {

        case 'N/A':
          self.detalleFactura2.iva = false;
          self.detalleFactura2.ivaCheckbox = '';
          break;

        default:
          self.detalleFactura2.iva = true;
          self.detalleFactura2.ivaCheckbox = 'checked';
          break;
      };
    };

    this.editarItem = function () {

      var validatorResult = validator.checkAll($('#objetoDatos2'));
      if (validatorResult) {

        if (self.detalleFactura2.iva) {

          self.detalleFactura2.iva = self.detalleFactura2.cantidad * self.detalleFactura2.precioUnidad * 0.12;
          self.detalleFactura2.totalItem = (self.detalleFactura2.cantidad * self.detalleFactura2.precioUnidad) + (self.detalleFactura2.iva);
        }
        else {
          self.detalleFactura2.iva = 'N/A',
            self.detalleFactura2.totalItem = self.detalleFactura2.cantidad * self.detalleFactura2.precioUnidad;
        };
        /*for(var i = 0; i < self.tableItems.length; i ++){
          if(self.tableItems[i].resumen == self.detalleFactura.resumen){*/

        self.items[self.indice].resumen = self.detalleFactura2.resumen;
        self.items[self.indice].cantidad = self.detalleFactura2.cantidad;
        self.items[self.indice].precioUnidad = self.detalleFactura2.precioUnidad;
        self.items[self.indice].iva = undefined;
        self.items[self.indice].iva = self.detalleFactura2.iva;
        self.items[self.indice].totalItem = self.detalleFactura2.totalItem;
        self.items[self.indice].descripcion = self.detalleFactura2.descripcion;
        /*break;
      }
    }*/

        if (self.itemRespaldo.iva == 'N/A') {

          self.itemRespaldo.iva = 0;
        }

        self.detalleFactura.subtotal = self.detalleFactura.subtotal - (self.itemRespaldo.totalItem - self.itemRespaldo.iva);
        self.detalleFactura.ivaTotal = self.detalleFactura.ivaTotal - self.itemRespaldo.iva;
        self.detalleFactura.total = self.detalleFactura.subtotal + self.detalleFactura.ivaTotal;


        if (self.detalleFactura2.iva == 'N/A') {

          self.detalleFactura2.iva = 0;
        }

        self.detalleFactura.subtotal = self.detalleFactura.subtotal + (self.detalleFactura2.totalItem - self.detalleFactura2.iva);
        self.detalleFactura.ivaTotal = self.detalleFactura.ivaTotal + self.detalleFactura2.iva;
        self.detalleFactura.total = self.detalleFactura.subtotal + self.detalleFactura.ivaTotal;

        new PNotify({
          title: '¡Elemento editado!',
          text: 'El elemento fue editado con éxito.',
          type: 'success',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });

        self.cancelarEditarItem();

      }
    };

    this.cancelarEditarItem = function () {

      self.itemRespaldo = undefined;
      self.indice = undefined;
      //self.detalleFactura.resumen = item.resumen;
      self.detalleFactura2.resumen = undefined;
      self.detalleFactura2.cantidad = undefined;
      self.detalleFactura2.precioUnidad = undefined;
      self.detalleFactura2.iva = undefined;
      self.detalleFactura2.totalItem = undefined;
      self.detalleFactura2.descripcion = undefined;
      self.facturaDatos.agregarElemento = true;
      self.facturaDatos.editarElemento = false;
    };

    this.eliminarItem = function (item) {

      self.itemEliminar = item;
      self.eliminarIndice = self.items.indexOf(item);

      $('.eliminarItemModal').modal({
        show: 'true'
      });
    }

    this.eliminarItem2 = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          // the item is removed
          self.items.splice(self.eliminarIndice, 1);
          self.detalleFactura.subtotal = 0;
          self.detalleFactura.ivaTotal = 0;
          self.detalleFactura.total = 0;
          for (var i = 0; i < self.items.length; i++) {
            self.detalleFactura.subtotal = self.detalleFactura.subtotal + (self.items[i].cantidad * self.items[i].precioUnidad);
            self.detalleFactura.ivaTotal = self.detalleFactura.ivaTotal + self.items[i].iva;
            self.detalleFactura.total = self.detalleFactura.total + self.items[i].totalItem;
          }







          /*self.detalleFactura.subtotal = self.detalleFactura.subtotal - (self.itemEliminar.cantidad * self.itemEliminar.precioUnidad);
          if(self.itemEliminar.iva == "N/A")
            self.itemEliminar.iva = 0;
          self.detalleFactura.ivaTotal = self.detalleFactura.ivaTotal - self.itemEliminar.iva;
          self.detalleFactura.total = self.detalleFactura.total - self.itemEliminar.totalItem;*/
          $('.modal-backdrop').remove();
          $('#datatable-responsive').DataTable().row('.choosed').remove().draw(false);
          self.items.splice(self.eliminarIndice, 1);
          new PNotify({
            title: '¡Elemento eliminado!',
            text: 'El elemento fue eliminado con éxito.',
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

    this.facturaWizard = function () {
      $('#facturaWizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect: 'fade',
        autoAdjustHeight: 'true'
      });

      $timeout(function () {
        var element = angular.element(document.querySelector('#facturaWizardPaso1'));
        var height = element[0].offsetHeight;
        $('#facturaWizard').smartWizard("fixHeight", height);
      }, 100);


    };

    this.wizardNext = function () {

      switch (self.wizardStep) {

        case 1:
          var validatorResult = validator.checkAll($('#facturaWizardPaso1'));

          if (validatorResult) {

            //IN SUCCESS
            if (self.facturaDatos.tableVisibility) {

              $('#facturaWizard').smartWizard("next");
              self.wizardStep++;
              this.wizardButtons = {
                anterior: true,
                siguiente: false,
                finalizar: true
              };
              $timeout(function () {
                var element = angular.element(document.querySelector('#facturaWizardPaso2'));
                var height = element[0].offsetHeight;

                var element2 = angular.element(document.querySelector('#tableContainer'));
                var height2 = element2[0].offsetHeight;

                $('#facturaWizard').smartWizard("_fixHeight", height + height2);
              }, 100);
              //this.wizardResize();
            } else if (!self.facturaDatos.tableVisibility) {

              self.showTable();
              /*  $('#facturaWizard').smartWizard("next");

               self.wizardStep ++;
               this.wizardButtons = {
                 anterior: true,
                 siguiente: false,
                 finalizar: true
               }; */
              $timeout(function () {
                var element = angular.element(document.querySelector('#facturaWizardPaso2'));
                var height = element[0].offsetHeight;

                var element2 = angular.element(document.querySelector('#tableContainer'));
                var height2 = element2[0].offsetHeight;

                $('#facturaWizard').smartWizard("_fixHeight", height + height2);
              }, 100);
              //this.wizardResize();
            }
          }
          break;
      }

    }

    this.wizardPrevious = function () {
      console.log(self.wizardStep);
      $('#facturaWizard').smartWizard("prev");
      if (self.wizardStep > 1) {
        self.wizardStep--;
        this.wizardButtons = {
          anterior: false,
          siguiente: true,
          finalizar: false
        };
      };

    };



    this.wizardFinish = function () {

      if (self.items.length > 0) {

        self.parametros = {
          id: 0,
          //para: self.facturaDatos.para,
          usuario: self.facturaDatos.cliente,
          numeroControl: self.facturaDatos.numeroControl,
          fechaEmision: self.facturaDatos.fechaRegistro,
          numeroFactura: self.facturaDatos.numeroFactura,
          asegurado: {
            nuCedulaRif: self.facturaDatos.cliente.nuCedulaRif,
            tipoPersona: self.facturaDatos.cliente.inTipoPersona,
            nombre: self.facturaDatos.cliente.nombre
          },
          observaciones: self.facturaDatos.observaciones,
          detallesFactura: self.items,
          subtotal: self.detalleFactura.subtotal,
          iva: self.detalleFactura.ivaTotal,
          total: self.detalleFactura.total,
          estatusFactura: 1,
          credencial: self.facturaDatos.cliente.credencial

        };

        if (self.facturaDatos.cliente.direccion != undefined || self.facturaDatos.cliente.direccion == '') {

          self.parametros.txDireccion = self.facturaDatos.cliente.direccion;
        } else {

          self.parametros.txDireccion = self.facturaDatos.direccion;
        }


        self.agregarFacturaService();

      } else {

        new PNotify({
          title: '¡Agregue elementos a la Factura!',
          text: 'Debe agregar elementos en la factura para poder continuar.',
          type: 'error',
          styling: 'bootstrap3',
          cornerclass: 'ui-pnotify-sharp'
        });
      }
    };

    this.wizardCancel = function () {

      self.paraCombo.tamanio = 'col-md-7 col-sm-7 col-xs-12 no-padding-left';
      self.paraInput.button = false;
      self.paraInput.input = false;
      document.getElementById("formularioAgregarFacturaNumeroControl").value = "";
      this.wizardButtons = {
        anterior: true,
        siguiente: true,
        finalizar: false
      };

      self.detalleFactura.resumen = undefined;
      self.detalleFactura.cantidad = undefined;
      self.detalleFactura.precioUnidad = undefined;
      self.detalleFactura.iva = false;
      self.detalleFactura.ivaCheckbox = '';
      self.detalleFactura.descripcion = undefined;
      self.detalleFactura.totalItem = undefined;
      self.detalleFactura.subtotal = 0;
      self.detalleFactura.ivaTotal = 0;
      self.detalleFactura.total = 0;

      self.detalleFactura2.resumen = undefined;
      self.detalleFactura2.cantidad = undefined;
      self.detalleFactura2.precioUnidad = undefined;
      self.detalleFactura2.iva = false;
      self.detalleFactura2.ivaCheckbox = '';
      self.detalleFactura2.descripcion = undefined;
      self.detalleFactura2.totalItem = undefined;

      self.items = [];

      self.facturaDatos.para = undefined;
      self.facturaDatos.cliente = undefined;
      self.facturaDatos.identificacion = undefined;
      self.facturaDatos.telefono = undefined;
      self.facturaDatos.direccion = undefined;
      self.facturaDatos.correo = undefined;
      self.facturaDatos.numeroFactura = undefined;
      self.facturaDatos.observaciones = undefined;
      self.facturaDatos.fechaRegistro = undefined;
      self.facturaDatos.usuarioRegistro = undefined;
      self.facturaDatos.numeroSecuencia = undefined;
      self.facturaDatos.tableVisibility = false;
      self.facturaDatos.agregarElemento = true;
      self.facturaDatos.editarElemento = false;

      if (self.wizardStep > 1) {
        $('#facturaWizard').smartWizard("prev");
        self.wizardStep--;
      }

      $('#facturaWizard').smartWizard("reset");

      self.viewsController('consultarFactura');
    };

    this.wizardResize = function () {
      //$('#facturaWizard').smartWizard("reset");

      $timeout(function () {
        var element = angular.element(document.querySelector('#facturaWizardPaso1'));
        var height = element[0].offsetHeight;
        $('#facturaWizard').smartWizard("fixHeight", height);
      }, 100);
    };

    this.ventanaNotas = function () {
      console.log('//////////////////// ventanaNotas');
      //CALL SERVICES CONSULTAR DEBITO/CREDITO
      self.setObjectElems(self.views, false);
      self.notaDebitoTabla = [];
      //self.notaDebitoTabla = tablaItem.debito.slice();
      self.notaCreditoTabla = [];
      //self.notaCreditoTabla = tablaItem.credito.slice();
      self.views.notas = true;
      //self.tablaItemRespaldo = tablaItem;
    };

    this.cancelarNotas = function () {
      self.views.notas = false;
      self.views.consultarFactura = true;
      self.datosNota = {
        fechaEmision: undefined,
        observaciones: '',
        estatus: undefined,
        subtotal: 0,
        iva: 0,
        total: 0,
      };

      self.datosNotaDebito = {
        agregar: false,
        idNota: undefined,
        numeroControl: undefined,
        monto: undefined,
        fecha: undefined,
        descripcion: undefined,
        verNumeroControl: undefined,
        verMonto: undefined,
        verFecha: undefined,
        verDescripcion: undefined
      };
      self.notaTabla = [];
    };

    this.radioNotaSwitch = function (tipoDeNota) {
      console.log('** on radioNotaSwitch.. **');
      switch (tipoDeNota) {
        case 'Debito':
          self.setObjectElems(self.radioNota, false);
          self.radioNotaCheck.debito = true;
          self.radioNotaCheck.credito = false;
          self.radioNota.debito = 'iradio_flat-green checked';
          self.radioNota.credito = 'iradio_flat-green';
          console.log('** on radioNotaSwitch. > debito **');
          break;
        case 'Credito':
          self.setObjectElems(self.radioNota, false);
          self.radioNotaCheck.debito = false;
          self.radioNotaCheck.credito = true;
          self.radioNota.debito = 'iradio_flat-green';
          self.radioNota.credito = 'iradio_flat-green checked';
          console.log('** on radioNotaSwitch. > credito **');
          break;
        default:
          break;
      }
    };

    this.agregarNotaDebito = function () {
      self.datosNotaDebito.agregar = true;
    };

    this.guardarNota = function () {

      var validatorResult = validator.checkAll($('#anadirNota2'));

      if(validatorResult){
            var params = {
            id: 0,
            numeroControl: self.facturaNotas.numeroControl,
            descripcion: self.facturaNotas.descripcion,
            numeroFactura: self.facturaNotas.numeroFactura.toString(),
            fechaEmision: self.datosNota.fechaEmision,
            observacion: self.datosNota.observaciones,
            cedulaRif: self.facturaNotas.nuCedulaRif,
            tipoPersona: self.facturaNotas.tipoPersona,
            rifEmpresa: self.facturaNotas.nuRifEmpresa,
            direccion: self.facturaNotas.direccion,
            subTotal: self.datosNota.subtotal,
            iva: self.datosNota.iva,
            total: self.datosNota.total,
            excentoIva: 0,
            detalles: self.notaTabla
          }

          var fechaAux = document.getElementById('formularioNotaFecha').value;
          fechaAux = mainServices.revertDate(fechaAux);
          params.fechaEmision = fechaAux;

          if (!self.notaIVA)
            params.excentoIva = 1;

          if (self.radioNotaCheck.debito) {
            params.estatus = self.datosNota.estatus;
            self.agregarNotaDebitoService(params);
          } else if (self.radioNotaCheck.credito) {
            params.estatus = self.datosNota.estatus;
            self.agregarNotaCreditoService(params);
          }

          self.setObjectElems(self.facturaNotas, undefined);
          self.datosNota = {
            fechaEmision: undefined,
            observaciones: '',
            estatus: undefined,
            subtotal: 0,
            iva: 0,
            total: 0,
          };

          self.datosNotaDebito = {
            agregar: false,
            idNota: undefined,
            numeroControl: undefined,
            monto: undefined,
            fecha: undefined,
            descripcion: undefined,
            verNumeroControl: undefined,
            verMonto: undefined,
            verFecha: undefined,
            verDescripcion: undefined
          };
      }else{
        new PNotify({
          title: 'Error',
          text: 'Los campos de la nota de crédito/débito estan incompletos.',
          cornerclass: 'ui-pnotify-sharp',
          type: 'error',
          styling: 'bootstrap3'
        });
      }
    };

    this.anadirNota = function () {

      var validatorResult = validator.checkAll($('#anadirNota'));

      console.log('validator: ', validatorResult);
      if (validatorResult) {

        var iva = 0;
        if (self.notaIVA)
          iva = (self.datosNota.cantidad * self.datosNota.precioUnidad) * 0.12;

        self.notaTabla.push({
          id: 0,
          cantidad: self.datosNota.cantidad,
          precioUnidad: self.datosNota.precioUnidad,
          descripcion: self.datosNota.descripcion,
          iva: iva,
          total: (self.datosNota.precioUnidad * self.datosNota.cantidad) + iva
        });

        //SE RECALCULAN LOS DATOS
        self.datosNota.subtotal = 0;
        self.datosNota.iva = 0;
        self.datosNota.total = 0;

        for (var i = 0; i < self.notaTabla.length; i++) {
          self.datosNota.subtotal = self.datosNota.subtotal + (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad);
          self.datosNota.iva = self.datosNota.iva + self.notaTabla[i].iva;
        }
        self.datosNota.total = self.datosNota.subtotal + self.datosNota.iva;

        self.datosNota.cantidad = undefined;
        self.datosNota.precioUnidad = undefined;
        self.datosNota.descripcion = undefined;
      }
    };

    this.cancelarAnadirNota = function () {
      self.datosNota.cantidad = undefined;
      self.datosNota.precioUnidad = undefined;
      self.datosNota.descripcion = undefined;

      self.datosNota = {
        fechaEmision: undefined,
        observaciones: '',
        estatus: undefined,
        subtotal: 0,
        iva: 0,
        total: 0,
      };

      self.datosNotaDebito = {
        agregar: false,
        idNota: undefined,
        numeroControl: undefined,
        monto: undefined,
        fecha: undefined,
        descripcion: undefined,
        verNumeroControl: undefined,
        verMonto: undefined,
        verFecha: undefined,
        verDescripcion: undefined
      };

      if (self.notaTabla.length == 0) {
        self.views.notas = false;
        self.views.consultarFactura = true;
      }
    };

    this.notaEditar = function (item) {
      var index = self.notaTabla.indexOf(item);
      self.notaTabla.splice(index, 1);
      self.datosNota.cantidad = item.cantidad;
      self.datosNota.precioUnidad = item.precioUnidad;
      self.datosNota.descripcion = item.descripcion;
      self.datosNota.total = item.total;

      //SE RECALCULAN LOS DATOS
      self.datosNota.subtotal = 0;
      self.datosNota.iva = 0;
      self.datosNota.total = 0;

      for (var i = 0; i < self.notaTabla.length; i++) {
        self.datosNota.subtotal = self.datosNota.subtotal + (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad);
        self.datosNota.iva = self.datosNota.iva + self.notaTabla[i].iva;
      }
      self.datosNota.total = self.datosNota.subtotal + self.datosNota.iva;
    };

    this.notaEliminar = function (item) {
      var index = self.notaTabla.indexOf(item);
      self.notaTabla.splice(index, 1);

      //SE RECALCULAN LOS DATOS
      self.datosNota.subtotal = 0;
      self.datosNota.iva = 0;
      self.datosNota.total = 0;

      for (var i = 0; i < self.notaTabla.length; i++) {
        self.datosNota.subtotal = self.datosNota.subtotal + (self.notaTabla[i].cantidad * self.notaTabla[i].precioUnidad);
        self.datosNota.iva = self.datosNota.iva + self.notaTabla[i].iva;
      }
      self.datosNota.total = self.datosNota.subtotal + self.datosNota.iva;
    };

    this.consultarNotas = function () {

      var params = {
        numeroFactura: self.facturaDatosNotas.numeroFactura,
        rifEmpresa: self.facturaDatosNotas.nuRifEmpresa
      };

      self.consultarNotasCreditoService(params);
    }

    this.cancelarNotaDebito = function () {

      self.datosNotaDebito.agregar = false;

    };

    this.agregarNotaCredito = function () {

      self.datosNotaCredito.agregar = true;

    };

    this.verNota = function (item) {
      self.facturaDatosNotasModal = JSON.parse(JSON.stringify(item));
      self.facturaDatosNotasModal.detalles = [];

      for (var i = 0; i < item.detalles.length; i++) {
        var detalle = {
          cantidad: item.detalles[i].cantidad,
          descripcion: item.detalles[i].descripcion,
          precioUnidad: item.detalles[i].precioUnidad,
          iva: 0,
          subtotal: item.detalles[i].cantidad * item.detalles[i].precioUnidad,
          total: item.detalles[i].cantidad * item.detalles[i].precioUnidad
        };

        if (item.excentoIva == 'No') {
          detalle.iva = detalle.subtotal * 0.12;
          detalle.total = detalle.total + detalle.iva;
        };

        self.facturaDatosNotasModal.detalles.push(detalle);
      }
      $('.verNotaModal').modal({
        show: 'true'
      });
      console.log(item);
    }

    this.anadirNotaCredito = function () {

      var validatorResult = validator.checkAll($('#anadirNotaCredito'));
      if (validatorResult) {

        this.notaCreditoTabla.push({
          numeroControl: self.datosNotaCredito.numeroControl,
          monto: self.datosNotaCredito.monto,
          fecha: self.datosNotaCredito.fecha,
          descripcion: self.datosNotaCredito.descripcion
        });

        self.datosNotaCredito.numeroControl = undefined;
        self.datosNotaCredito.monto = undefined;
        self.datosNotaCredito.fecha = undefined;
        self.datosNotaCredito.descripcion = undefined;
        self.datosNotaCredito.agregar = false;

        new PNotify({
          title: '¡Elemento creado!',
          text: 'El elemento fue creado con éxito.',
          cornerclass: 'ui-pnotify-sharp',
          type: 'success',
          styling: 'bootstrap3'
        });
      }
    };

    this.cancelarNotaCredito = function () {

      self.datosNotaCredito.agregarElemento = false;

    };

	this.beforeRenderEmision = function ($dates) {
      /* disable future dates */
      for(var i=0; i < $dates.length;i++) {
        if(new Date().getTime() < $dates[i].utcDateValue) {
            $dates[i].selectable = false;
        }
      }
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('agregarFactura', function () {

      self.facturaWizard();

      $timeout(function () {
        var element = angular.element(document.querySelector('#facturaWizardPaso1'));
        var height = element[0].offsetHeight;
        $('#facturaWizard').smartWizard("fixHeight", height);
      }, 100);

      facturaServices.consultarTipoPersona().success(function (data) {
        data.splice(0, 1);
        self.listaTipoPersona = data;
      });

      self.listaAseguradoras = [];
      self.formularioAgregarFacturaInputAseguradoraAutocompletar = [];

      bonoAsignadoServices.consultarAseguradora()
        .success(function (data) {
          for (var i = 0; i < data.length; i++) {

            self.listaAseguradoras.push({

              nu_rif: data[i].nu_rif,
              nb_aseguradora: data[i].nb_aseguradora.toUpperCase()

            });

            self.formularioAgregarFacturaInputAseguradoraAutocompletar.push(data[i].nb_aseguradora.toUpperCase());
          };
        })

      self.listaFinanciadoras = [];
      self.formularioAgregarFacturaInputFinanciadoraAutocompletar = [];

      bonoAsignadoServices.consultarFinanciadora()
        .success(function (data) {
          for (var i = 0; i < data.length; i++) {

            self.listaFinanciadoras.push({

              nuRif: data[i].nuRif,
              nbFinanciadora: data[i].nbFinanciadora.toUpperCase()

            });

            self.formularioAgregarFacturaInputFinanciadoraAutocompletar.push(data[i].nbFinanciadora.toUpperCase());
          };
        })

      self.listaProductores = [];
      self.formularioAgregarFacturaInputProductorAutocompletar = [];

      polizaServices.consultarProductores().success(function (data) {

        self.productores = data;
        for (var i = 0; i < data.length; i++) {

          self.listaProductores.push({

            nuCedulaRif: data[i].nuCedulaRif,
            nbUsuario: (data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido).toUpperCase()

          });

          self.formularioAgregarFacturaInputProductorAutocompletar.push((data[i].nbPrimerNombre + ' ' + data[i].nbPrimerApellido).toUpperCase());
        };
      });
      //self.complete();
      self.viewsController('agregarFactura');

    });

    $rootScope.$on('consultarFactura', function () {
      console.log('consultarFactura');
      self.viewsController('consultarFactura');
      console.log('tablaconsulta', mainServices);

      var params = {
        "id": 0,
        "usuario": mainServices.getUser()
      };

      facturaServices.consultarFacturas(params)
        .success(function (data) {
          console.log('consultarFacturas success', data);
          self.tableItems = data;
          if (!$.fn.DataTable.isDataTable('#tablaConsultarFacturas')) {
            self.createTable();
          } else {
            self.destroyTable();
          }
        })
        .error(function (data) {

          if (!$.fn.DataTable.isDataTable('#tablaConsultarFacturas')) {
            self.createTable();
          } else {
            self.destroyTable();
          }

        })

    });

    $('#inputSuccess3').on('blur', null, validator.checkField);
    $('#inputSuccess2').on('blur', null, validator.checkField);
    $('#message2').on('blur', null, validator.checkField);

    var btnFinish = $('<button></button>').text('Finish')
      .addClass('btn btn-info');
    var btnCancel = $('<button></button>').text('Cancel')
      .addClass('btn btn-danger');

    $(".autocompletarIDFactura").on('click', function (e) {
      self.autocompletarIDFactura = $(e.target).attr('id');
      //alert("The id of the button that was clicked: "+ self.autocompletarIDFactura);

      //Switch de autocompletes

      $('#' + self.autocompletarIDFactura).autocomplete({

        lookup: self.autocompletarListFactura,
        onSelect: function (suggestion) {
          //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
          self.facturaDatos.identificacion = suggestion.value;
          suggestion = null;
          self.showTable();
          $('#' + self.autocompletarIDFactura).closest('.item')
            .removeClass('bad')
            .find('.alert').remove();
        }
      });

    });

    $('#formularioAgregarFacturaInputAutocompletar').on('blur', null, validator.checkField);
    // AQUI

    this.verModalDatosDebito = function (item) {

      self.datosNotaDebito.verDescripcion = item.descripcion;
      self.datosNotaDebito.verCantidad = item.cantidad;
      self.datosNotaDebito.verObservaciones = item.observaciones;
    };

    this.verModalDatosCredito = function (item) {

      self.datosNotaCredito.verDescripcion = item.descripcion;
      self.datosNotaCredito.verCantidad = item.cantidad;
      self.datosNotaCredito.verObservaciones = item.observaciones;
    };

    this.setCurrencyModal = function(value){
      return mainServices.setCurrency(value);
    };
    this.ver = function () {

      var params = {
        "numeroFactura": self.facturaModalVer.numeroFactura
      };

      facturaServices.consultarFacturaDetalle(params)
        .success(function (data) {
          console.log('data', data);
          self.facturaModalVer = undefined;
          self.facturaModalVer = data[0];
          for (var i = 0; i < data.length; i++) {
            if (self.tableItems[i].numeroFactura == self.facturaModalVer.id) {
              self.facturaModalVer = self.tableItems[i];
            }
          }          
          console.log('self.facturaModalVer', self.facturaModalVer);
          self.facturaModalVer.detalleFactura = data;
        });

      $('.verFacturaModal').modal({
        show: 'true'
      });



    };

    this.cerrarVer = function () {

      $('.modal-backdrop').remove();
    };

    this.imprimir = function () {

      var params = {
        "numeroFactura": self.facturaModalImprimir.numeroFactura
      };

      facturaServices.consultarFacturaDetalle(params)
        .success(function (data) {
          console.log('data', data);
          // for(var i = 0; i < data.length; i++){
          // 	if(data[i].numeroFactura == self.facturaModalImprimir.numeroFactura){
          self.facturaModalImprimir = undefined;
          self.facturaModalImprimir = data[0];
          for (var i = 0; i < self.facturaModalImprimir.detallesFactura.length; i++) {

            var precio = self.facturaModalImprimir.detallesFactura[i].cantidad * self.facturaModalImprimir.detallesFactura[i].precioUnidad;
            self.facturaModalImprimir.detallesFactura[i].precio = precio;
            self.facturaModalImprimir.detallesFactura[i].egreso = self.facturaModalImprimir.detallesFactura[i].cantidad;
          }
          // 	}
          // }
          console.log('self.facturaModalImprimir', self.facturaModalImprimir);
          //self.facturaModalVer.detalleFactura = data;
        });

      $('.imprimirFacturaModal').modal({
        show: 'true'
      });
    }

    this.imprimirModal = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          self.imprimirFactura();
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.eliminar = function () {

      $('.eliminarFacturaModal').modal({
        show: 'true'
      });
    }

    this.eliminarModal = function (opcion) {
      switch (opcion) {
        case 'aceptar':
          //CALL SERVICE
          // $('#your-modal-id').modal('hide');
          // $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tablaConsultarFacturas').DataTable().row('.choosed').remove().draw(false);
          for (var i = 0; i < self.tableItems.length; i++) {
            console.log(i);
            if (self.tableItems[i].numeroFactura == self.facturaDatos.numeroFactura) {
              self.tableItems.splice(i, 1);
              break;
            }
          }
          new PNotify({
            title: '¡Factura eliminada!',
            text: 'La factura fue eliminada con éxito.',
            type: 'success',
            styling: 'bootstrap3',
            cornerclass: 'ui-pnotify-sharp'
          });
          self.viewsController('consultarFactura');
          break;
        case 'cancelar':
          $('.modal-backdrop').remove();
          break;
        default:
          break;
      }
    };

    this.createTable = function () {

      var permisos = mainServices.getPermisos();
      var editar = false;
      var acciones = '<td style="text-align: center;">\
                                <a style="margin-right: 10px" data-toggle="modal" class="verFacturaModal cursor-pointer">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a style="margin-right: 10px" data-toggle="modal" class="imprimirFacturaModal cursor-pointer">\
                                  <i class="fa fa-print"></i>\
                                </a>\
                                <a style="margin-right: 10px" class="facturaNotasConsultar cursor-pointer">\
                                  <i class="fa fa-list-alt"></i>\
                                </a>\
                              </td>';
      console.log(permisos);

      for (var i = 0; i < permisos.length; i++) {
        if (permisos[i].coPermiso == 'addFact' && permisos[i].inEstatus == 1) {
          console.log('asd');
          editar = true;
          break;
        }
      };

      if (editar || (mainServices.isAdmin() == 1)) {
        console.log('dsa');
        acciones = '<td style="text-align: center;">\
                                <a style="margin-right: 10px" data-toggle="modal" class="verFacturaModal cursor-pointer">\
                                  <i class="fa fa-search"></i>\
                                </a>\
                                <a style="margin-right: 10px" data-toggle="modal" class="imprimirFacturaModal cursor-pointer">\
                                  <i class="fa fa-print"></i>\
                                </a>\
                                <a style="margin-right: 10px" class="facturaNotas cursor-pointer">\
                                  <i class="fa fa-plus" tooltip="Agregar notas de débito o crédito"></i>\
                                </a>\
                                <a style="margin-right: 10px" class="facturaNotasConsultar cursor-pointer">\
                                  <i class="fa fa-list-alt"></i>\
                                </a>\
                              </td>';
      }

      $('#tablaConsultarFacturas').DataTable({
        data: self.tableItems,
        columns: [
          { 'data': 'numeroFactura' },
          { 'data': 'nuCedulaRif' },
          { 'data': 'descripcion' },
          { 'data': 'fechaEmision' },
          {
            'defaultContent': acciones
          }
        ],
        columnDefs: [
          { "className": "text-center", "targets": "_all" }
        ]
      });


      $('#tablaConsultarFacturas tbody').on('click', '.verFacturaModal', function () {
        self.facturaModalVer = $('#tablaConsultarFacturas').DataTable().row($(this).parents('tr')).data();
        console.log(self.facturaModalVer);
        $('.consultarFacturasVer').click();
      });

      $('#tablaConsultarFacturas tbody').on('click', '.imprimirFacturaModal', function () {
        self.facturaModalImprimir = $('#tablaConsultarFacturas').DataTable().row($(this).parents('tr')).data();
        console.log(self.facturaModalImprimir);
        $('.consultarFacturasImprimir').click();
      });

      //   $('#tablaConsultarFacturas tbody').on( 'click', '.eliminarFacturaModal', function () {
      //     self.facturaModalEliminar = $('#tablaConsultarFacturas').DataTable().row( $(this).parents('tr') ).data();
      //     $('.consultarFacturasEliminar').click();
      //   });

      $('#tablaConsultarFacturas tbody').on('click', '.facturaNotas', function () {
        self.facturaNotas = $('#tablaConsultarFacturas').DataTable().row($(this).parents('tr')).data();
        $('.consultarFacturasNotas').click();
        console.log(self.facturaNotas);
      });

      $('#tablaConsultarFacturas tbody').on('click', '.facturaNotasConsultar', function () {
        self.facturaDatosNotas = $('#tablaConsultarFacturas').DataTable().row($(this).parents('tr')).data();
        $('.consultarFacturasNotasDebitoCredito').click();
        console.log(self.facturaDatosNotas);
      });

      $('#tablaConsultarFacturas tbody').on('click', 'tr', function () {
        $('#tablaConsultarFacturas').DataTable().$('tr.choosed').removeClass('choosed');
        $(this).addClass('choosed');
      });
    };

    this.destroyTable = function () {
      $('#tablaConsultarFacturas').dataTable().fnDestroy();
      console.log('on destroyTable function..');
      self.createTable();
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
    
  }]);
})();
