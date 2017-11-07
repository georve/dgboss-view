(function () {

  'use strict';

  var inicioController = angular.module('DGBOSS.inicioController', ['DGBOSS.inicioServices', 'DGBOSS.mainServices', 'DGBOSS.reportServices']);

  inicioController.controller('inicioController', ['$scope', '$rootScope', 'inicioServices', 'mainServices', 'reportServices', '$sce', function ($scope, $rootScope, inicioServices, mainServices, reportServices, $sce) {

    var self = this;

    console.log('inicioController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/
    this.admin = mainServices.getUserRol();
    console.log(mainServices.getUserRol());
    this.isAdmin = false;
    this.iniInicialList = function () {
      var params = {};

      inicioServices.listasInicialesService(param)
        .success(function (data) {
          inicioServices.updateListasInicialesFromServicio(data);
        });
    }


    /*
      this.views: { this will set the insured view. }
    */
    this.views = {
      inicio: true,
      reportes: false
    };

    this.userRol = undefined;

    this.reportesViews = {
      comisionesCobradas: false,
      polizaPersona: false,
      polizaPatrimonial: false,
      polizaAutomovil: false,
      siniestroPersona: false,
      siniestroPatrimonial: false,
      siniestroAutomovil: false
    };

    this.fechaRenovaciones = {
      inicio: undefined,
      fin: undefined
    };

    this.comisionesCobradas = '0';
    this.comisionesPendientes = '0';
    this.primasCobradas = '0';
    this.primasPendientes = '0';
    this.bonosAseguradoras = {};
    this.bonosFinanciadoras = {};
    this.polizasPorRamo = {
      total: 0,
      AUT: 0,
      PAT: 0,
      PER: 0,
      percentAUT: 0,
      percentPAT: 0,
      percentPER: 0
    };
    this.siniestrosPorRamo = {
      total: 0,
      AUT: 0,
      PAT: 0,
      PER: 0,
      percentAUT: 0,
      percentPAT: 0,
      percentPER: 0
    };
    this.polizasRenovar = undefined;
    this.siniestrosPorAseguradora = undefined;
    this.detalleBonos = {
      financiadoras: [],
      aseguradoras: []
    };


    this.polizasChart = {
      financiadorasData: [
        { nombre: 'Segucar', valor: '12' },
        { nombre: 'Financiadora X', valor: '12' },
        { nombre: 'Financiadora Y', valor: '34' },
        { nombre: 'Financiadora Z', valor: '46' },
        { nombre: 'Financiadora AA', valor: '73' },
        { nombre: 'Financiadora AB', valor: '12' },
        { nombre: 'Financiadora AC', valor: '83' },
        { nombre: 'Financiadora AD', valor: '45' },
        { nombre: 'Financiadora AE', valor: '23' },
        { nombre: 'Financiadora AF', valor: '39' },
        { nombre: 'Financiadora AG', valor: '52' }
      ],
      aseguradorasData: [
        { nombre: 'Seguros Caracas', valor: '12' },
        { nombre: 'Seguros Horizonte', valor: '12' },
        { nombre: 'Seguros Universitas', valor: '34' },
        { nombre: 'Interglobal', valor: '46' },
        { nombre: 'Seguros La Vitalicia', valor: '73' },
        { nombre: 'Seguros Bancrecer', valor: '12' },
        { nombre: 'Banesco Seguros', valor: '83' },
        { nombre: 'Seguros Pirámide', valor: '45' },
        { nombre: 'Seguros HMO', valor: '23' },
        { nombre: 'DG Seguros', valor: '39' },
        { nombre: 'Seguros Erbowe', valor: '52' }
      ]
    };

    this.polizasFinanciadorasBar = [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6];

    this.dataReportes = undefined;
    this.dataIndicadores = undefined;
    this.dataCantidadRenovaciones = undefined;
    this.dataBonosCobrados = undefined;

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

    this.indicadoresService = function () {

      inicioServices.indicadoresService()
        .success(function (data) {
          console.log('indicadores', data);
          console.log(mainServices.getUserRol());
          if (mainServices.getUserRol() == 'admin') {
            self.isAdmin = true;
            console.log('es administradoooooooor');
          } else if (mainServices.getUserRol() == 'ANA' || mainServices.getUserRol() == 'EX') {
            self.isAdmin = false;
            console.log('es analista o ejecutivo');
          }
          self.bonosAseguradoras.bolivares = 0;
          self.bonosAseguradoras.dolares = 0;
          self.bonosAseguradoras.euros = 0;
          self.bonosAseguradoras.todos = [];
          self.bonosFinanciadoras.bolivares = 0;
          self.bonosFinanciadoras.dolares = 0;
          self.bonosFinanciadoras.euros =0;
          self.bonosFinanciadoras.todos = [];
          self.polizasRenovar = undefined;
          self.siniestrosPorAseguradora = undefined;
          self.detalleBonos.aseguradoras = [];
          self.detalleBonos.financiadoras = [];


          if (data.mensaje != 'No hay datos para la consulta') {

            for (var i = 0; i < data.totalComisiones.length; i++) {
              if (data.totalComisiones[i].estatus == 'Pagado')
                self.comisionesCobradas = mainServices.setCurrency(data.totalComisiones[i].monto);
              else if (data.totalComisiones[i].estatus == 'Pendiente')
                self.comisionesPendientes = mainServices.setCurrency(data.totalComisiones[i].monto);
            };

            for (var i = 0; i < data.totalPrimas.length; i++) {
              if (data.totalPrimas[i].estatus == 'Pagado')
                self.primasCobradas = mainServices.setCurrency(data.totalPrimas[i].monto);
              else if (data.totalPrimas[i].estatus == 'Pendiente')
                self.primasPendientes = mainServices.setCurrency(data.totalPrimas[i].monto);
            };

            // self.comisionesCobradas = data.totalComisiones.cobradas;
            // self.comisionesPendientes = data.totalComisiones.pendientes;
            // self.primasCobradas = data.totalPrimas.cobradas;
            // self.primasPendientes = data.totalPrimas.pendientes;
            //self.bonosAseguradoras = data.totalBonos.totalAseguradora;
            //self.bonosFinanciadoras = data.totalBonos.totalFinanciadora;
            self.polizasRenovar = data.polizasRenovar;
            self.siniestrosPorAseguradora = data.siniestroAseguradoras;

            for (var i = 0; i < data.totalBonos.length; i++) {
              switch (data.totalBonos[i].tipo) {

                case '1':

                  if (data.totalBonos[i].moneda == 'DOLARES') {
                    self.bonosAseguradoras.dolares = mainServices.setCurrency(data.totalBonos[i].monto);
                  } else if (data.totalBonos[i].moneda == 'EUROS') {
                    self.bonosAseguradoras.euros = mainServices.setCurrency(data.totalBonos[i].monto);
                  } else if (data.totalBonos[i].moneda == 'BOLIVARES') {
                    self.bonosAseguradoras.bolivares = mainServices.setCurrency(data.totalBonos[i].monto);
                  }
                  self.bonosAseguradoras.todos.push(data.totalBonos[i]);
                  break;

                case '2':
                  if (data.totalBonos[i].moneda == 'DOLARES') {
                    self.bonosFinanciadoras.dolares = mainServices.setCurrency(data.totalBonos[i].monto);
                  } else if (data.totalBonos[i].moneda == 'EUROS') {
                    self.bonosFinanciadoras.euros = mainServices.setCurrency(data.totalBonos[i].monto);
                  } else if (data.totalBonos[i].moneda == 'BOLIVARES') {
                    self.bonosFinanciadoras.bolivares = mainServices.setCurrency(data.totalBonos[i].monto);
                  }
                  self.bonosFinanciadoras.todos.push(data.totalBonos[i]);
                  break;

                default:
                  break;
              }
            };

            self.polizasPorRamo = {
              total: 0,
              AUT: 0,
              PAT: 0,
              PER: 0,
              percentAUT: 0,
              percentPAT: 0,
              percentPER: 0
            };
            self.siniestrosPorRamo = {
              total: 0,
              AUT: 0,
              PAT: 0,
              PER: 0,
              percentAUT: 0,
              percentPAT: 0,
              percentPER: 0
            };

            for (var i = 0; i < data.cantidadPoliza.length; i++) {
              self.polizasPorRamo.total = self.polizasPorRamo.total + data.cantidadPoliza[i].total;
            };

            for (var i = 0; i < data.cantidadPoliza.length; i++) {
              if (self.polizasPorRamo.total != 0)
                var porcentaje = (data.cantidadPoliza[i].total * 100) / self.polizasPorRamo.total;
              else
                var porcentaje = 0;

              if (data.cantidadPoliza[i].aseguradora == 'Persona') {
                self.polizasPorRamo.percentPER = porcentaje;
                self.polizasPorRamo.PER = data.cantidadPoliza[i].total
              } else if (data.cantidadPoliza[i].aseguradora == 'Patrimoniales') {
                self.polizasPorRamo.percentPAT = porcentaje;
                self.polizasPorRamo.PAT = data.cantidadPoliza[i].total
              } else if (data.cantidadPoliza[i].aseguradora == 'Automovil') {
                self.polizasPorRamo.percentAUT = porcentaje;
                self.polizasPorRamo.AUT = data.cantidadPoliza[i].total
              }
            };

            for (var i = 0; i < data.siniestroRamo.length; i++) {
              self.siniestrosPorRamo.total = self.siniestrosPorRamo.total + data.siniestroRamo[i].total;
            };

            for (var i = 0; i < data.siniestroRamo.length; i++) {
              if (self.siniestrosPorRamo.total != 0)
                var porcentaje = (data.siniestroRamo[i].total * 100) / self.siniestrosPorRamo.total;
              else
                var porcentaje = 0;

              if (data.siniestroRamo[i].aseguradora == 'Persona') {
                self.siniestrosPorRamo.percentPER = porcentaje;
                self.siniestrosPorRamo.PER = data.siniestroRamo[i].total;
              } else if (data.siniestroRamo[i].aseguradora == 'Patrimoniales') {
                self.siniestrosPorRamo.percentPAT = porcentaje;
                self.siniestrosPorRamo.PAT = data.siniestroRamo[i].total;
              } else if (data.siniestroRamo[i].aseguradora == 'Automovil') {
                self.siniestrosPorRamo.percentAUT = porcentaje;
                self.siniestrosPorRamo.AUT = data.siniestroRamo[i].total;
              }
            };
          };

          self.bonosCobradosService('grafica');
          self.valoresInicialesService();
        })
        .error(function (data, status, headers, config, ) {
          console.log(data);
          self.valoresInicialesService();
        });
    };



    this.valoresInicialesService = function () {

      inicioServices.listasInicialesService()
        .success(function (data) {
          console.log('valores iniciales: ', data);
          console.log('data Bancos.', data.bancos);

          mainServices.setAseguradoras(data.aseguradoras);
          mainServices.setBancos(data.bancos);
          mainServices.setMarcasVehiculos(data.marcasVehiculo);
          mainServices.setMonedas(data.monedas);
          mainServices.setPaises(data.paises);
          mainServices.setRamos(data.ramos);
          mainServices.setTiposSiniestros(data.tiposSiniestros);
		  mainServices.setCausas(data.causas);

        })
        .error(function (data, status, headers, config, ) {
          console.log(data);
        });
    };

    this.polizasPorRamoService = function (ramo) {
      var params = {
        ramo: ramo
      };

      self.reporteTitle = 'Cantidad de pólizas por ramo';

      inicioServices.reportePolizasPorRamoService(params)
        .success(function (data) {
          console.log('data: ', data);

          var cantidadTotal = 0;

          for (var i = 0; i < data.length; i++) {
            cantidadTotal = cantidadTotal + data[i].cantidad;
          };

          for (var i = 0; i < data.length; i++) {
            var porcentaje = ((data[i].cantidad * 100) / cantidadTotal).toFixed(2);
            data[i].porcentaje = porcentaje;
          };

          self.dataReportes = data;
          console.log('reportes: ', self.dataReportes);

          if ($.fn.DataTable.isDataTable('#tablaPolizasPorRamos')) {
            $('#tablaPolizasPorRamos').dataTable().fnDestroy();
          }
          self.createTable('polizas');
        })
        .error(function (data, status, headers, config, ) {
          console.log(data);
        });
    };

    this.siniestrosPorRamoService = function (ramo) {
      var params = {
        ramo: ramo
      };

      self.reporteTitle = 'Cantidad de siniestros por ramo';

      inicioServices.reporteSiniestrosPorRamoService(params)
        .success(function (data) {
          console.log('data: ', data);

          var cantidadTotal = 0;

          for (var i = 0; i < data.length; i++) {
            cantidadTotal = cantidadTotal + data[i].cantidad;
          };

          for (var i = 0; i < data.length; i++) {
            var porcentaje = ((data[i].cantidad * 100) / cantidadTotal).toFixed(2);
            data[i].porcentaje = porcentaje;
          };

          self.dataReportes = data;
          console.log('reportes: ', self.dataReportes);

          if ($.fn.DataTable.isDataTable('#tablaSiniestrosPorRamos')) {
            $('#tablaSiniestrosPorRamos').dataTable().fnDestroy();
          }
          self.createTable('siniestros');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.primasCobradasService = function () {
      self.reporteTitle = 'Recibos cobrados';
      inicioServices.primasCobradasService()
        .success(function (data) {
          console.log(data);
          self.dataIndicadores = data;
          for(var i =0; i<self.dataIndicadores.length;i++){
            self.dataIndicadores[i].monto = mainServices.setCurrency(self.dataIndicadores[i].monto);
          };
          if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
            $('#tablaIndicadores').dataTable().fnDestroy();
          }
          self.createTable('indicadores');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.primasPendientesService = function () {
      self.reporteTitle = 'Recibos pendientes';
      inicioServices.primasPendientesService()
        .success(function (data) {
          console.log(data);
          self.dataIndicadores = data;
          for(var i =0; i<self.dataIndicadores.length;i++){
            self.dataIndicadores[i].monto = mainServices.setCurrency(self.dataIndicadores[i].monto);
          };          
          if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
            $('#tablaIndicadores').dataTable().fnDestroy();
          }
          self.createTable('indicadores');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    // this.bonosCobradosService = function(){
    //   inicioServices.primasPendientesService()
    //     .success(function(data){
    //       console.log(data);
    //       self.dataIndicadores = data;
    //       if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
    //         $('#tablaIndicadores').dataTable().fnDestroy();
    //       }
    //       self.createTable('indicadores');
    //     })
    //     .error(function(data, status, headers, config){
    //       console.log(data);
    //     });
    // };


    this.comisionesCobradasService = function () {
      self.reporteTitle = 'Comisiones cobradas';
      inicioServices.comisionesCobradasService()
        .success(function (data) {
          console.log(data);
          self.dataIndicadores = data;
          for(var i =0; i<self.dataIndicadores.length;i++){
            self.dataIndicadores[i].monto = mainServices.setCurrency(self.dataIndicadores[i].monto);
          };          
          if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
            $('#tablaIndicadores').dataTable().fnDestroy();
          }
          self.createTable('indicadores');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.comisionesPendientesService = function () {
      self.reporteTitle = 'Comisiones pendientes';
      inicioServices.comisionesPendientesService()
        .success(function (data) {
          console.log(data);
          self.dataIndicadores = data;
          for(var i =0; i<self.dataIndicadores.length;i++){
            self.dataIndicadores[i].monto = mainServices.setCurrency(self.dataIndicadores[i].monto);
          };           
          if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
            $('#tablaIndicadores').dataTable().fnDestroy();
          }
          self.createTable('indicadores');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.cantidadRenovacionesService = function () {
      self.reporteTitle = 'Renovaciones de pólizas por aseguradoras';

      var params = {
        fechaDesde: '',
        fechaHasta: ''
      };

      if (self.fechaRenovaciones.inicio != '' || self.fechaRenovaciones.fin != '') {
        params = {
          fechaDesde: mainServices.revertDate(self.fechaRenovaciones.inicio),
          fechaHasta: mainServices.revertDate(self.fechaRenovaciones.fin)
        };
      }

      inicioServices.cantidadRenovacionesService(params)
        .success(function (data) {
          console.log(data);
          self.dataIndicadores = data;
          if ($.fn.DataTable.isDataTable('#tablaIndicadores')) {
            $('#tablaIndicadores').dataTable().fnDestroy();
          }
          self.createTable('cantidadRenovaciones');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.bonosCobradosService = function (option) {

      self.reporteTitle = 'Bonos cobrados';

      if ($.fn.DataTable.isDataTable('#tablaBonosCobrados')) {
        $('#tablaBonosCobrados').dataTable().fnDestroy();
      }
      self.createTable('bonosCobrados');

      inicioServices.bonosCobradosService()
        .success(function (data) {
          console.log(data);
          self.dataBonosCobrados = [];
          self.detalleBonos = {
            financiadoras: [],
            aseguradoras: []
          };

          for (var i = 0; i < data.length; i++) {
            var item = {
              nombre: data[i].nombre,
              empresa: 'Aseguradora',
              moneda: data[i].moneda,
              monto:  mainServices.setCurrency(data[i].monto),
            };

            if (data[i].empresa == 2) {
              item.empresa = 'Financiadora';
              self.detalleBonos.financiadoras.push(data[i]);
            } else {
              self.detalleBonos.aseguradoras.push(data[i]);
            };

            self.dataBonosCobrados.push(item);
          };

          if (option == 'grafica') {
            self.plotFunction();
          } else {
            if ($.fn.DataTable.isDataTable('#tablaBonosCobrados')) {
              $('#tablaBonosCobrados').dataTable().fnDestroy();
            }
            self.createTable('bonosCobrados');
          }

        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    this.siniestroGeneralService = function () {
      var params = {
        ramo: ''
      };

      self.reporteTitle = 'Cantidad de siniestros por aseguradoras';

      console.log('reportes: ', self.dataReportes);

      inicioServices.reporteSiniestrosPorRamoService(params)
        .success(function (data) {
          console.log(data);

          var cantidadTotal = 0;

          for (var i = 0; i < data.length; i++) {
            cantidadTotal = cantidadTotal + data[i].cantidad;
          };

          for (var i = 0; i < data.length; i++) {
            var porcentaje = ((data[i].cantidad * 100) / cantidadTotal).toFixed(2);
            data[i].porcentaje = porcentaje;
          };

          self.dataReportes = data;


          if ($.fn.DataTable.isDataTable('#tablaSiniestrosPorRamos')) {
            $('#tablaSiniestrosPorRamos').dataTable().fnDestroy();
          }
          self.createTable('siniestros');
        })
        .error(function (data, status, headers, config) {
          console.log(data);
        });
    };



    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function (view) {
      self.setObjectElems(self.views, false);
      switch (view) {
        case 'inicio':
          self.views.inicio = true;
          console.log('viewsController > inicio');
          break;

        case 'reportes':
          self.views.reportes = true;
          console.log('viewsController > reportes');
          break;

        default:
          break;
      }
    };

    this.reportesController = function (option, option2) {

      self.viewsController('reportes');
      console.log(option);
      self.views.reportes = true;
      console.log(self.views.reportes);
      self.reportesViews.polizaPersona = false;
      self.reportesViews.polizaPatrimonial = false;
      self.reportesViews.polizaAutomovil = false;
      self.reportesViews.siniestroPersona = false;
      self.reportesViews.siniestroPatrimonial = false;
      self.reportesViews.siniestroAutomovil = false;
      self.reportesViews.primasCobradas = false;
      self.reportesViews.primasPendientes = false;
      self.reportesViews.comisionesCobradas = false;
      self.reportesViews.comisionesPendientes = false;
      self.reportesViews.cantidadRenovaciones = false;
      self.reportesViews.bonosCobrados = false;
      self.reportesViews.siniestroGeneral = false;

      self.fechaRenovaciones.inicio = undefined;
      self.fechaRenovaciones.fin = undefined;

      console.log('detalleBonos: ', self.detalleBonos);

      switch (option) {
        case 'polizaPersona':
          self.polizasPorRamoService('PER');
          self.reportesViews.polizaPersona = true;
          break;

        case 'polizaPatrimonial':
          self.polizasPorRamoService('PAT');
          self.reportesViews.polizaPatrimonial = true;
          break;

        case 'polizaAutomovil':
          self.polizasPorRamoService('AUT');
          self.reportesViews.polizaAutomovil = true;
          break;

        case 'siniestroPersona':
          self.siniestrosPorRamoService('PER');
          self.reportesViews.siniestroPersona = true;
          break;

        case 'siniestroPatrimonial':
          self.siniestrosPorRamoService('PAT');
          self.reportesViews.siniestroPatrimonial = true;
          break;

        case 'siniestroAutomovil':
          self.siniestrosPorRamoService('AUT');
          self.reportesViews.siniestroAutomovil = true;
          break;

        case 'primasCobradas':
          self.primasCobradasService();
          self.reportesViews.primasCobradas = true;

          console.log(self.views.reportes);
          console.log(self.reportesViews.primasCobradas);
          break;

        case 'primasPendientes':
          self.primasPendientesService();
          self.reportesViews.primasPendientes = true;
          break;

        case 'comisionesCobradas':
          self.comisionesCobradasService();
          self.reportesViews.comisionesCobradas = true;
          break;

        case 'comisionesPendientes':
          self.comisionesPendientesService();
          self.reportesViews.comisionesPendientes = true;
          break;

        case 'cantidadRenovaciones':
          self.fechaRenovaciones.inicio = '';
          self.fechaRenovaciones.fin = '';
          self.cantidadRenovacionesService();
          self.reportesViews.cantidadRenovaciones = true;
          break;

        case 'bonosCobrados':
          if (option2 == 'aseguradoras') {
            self.bonosCobradosService('aseguradoras');
          } else if (option2 == 'financiadoras') {
            self.bonosCobradosService('financiadoras');
          }
          self.reportesViews.bonosCobrados = true;
          break;

        case 'siniestroGeneral':
          self.siniestroGeneralService();
          self.reportesViews.siniestroGeneral = true;
          break;

        default:
          break;
      };
    };

    this.imprimir = function () {

      /*
      ************ REPORTE PRIMAS COBRADAS ************
      */
      if (self.reportesViews.primasCobradas) {

        var montoAux = 0;
        var comisionesAux = [];

        for (var i = 0; i < self.dataIndicadores.length; i++) {

          comisionesAux.push({

            numero_recibo: self.dataIndicadores[i].reciboPoliza,
            ramo: self.dataIndicadores[i].ramo,
            aseguradora: self.dataIndicadores[i].aseguradora,
            subramo: self.dataIndicadores[i].subRamo,
            monto: self.dataIndicadores[i].monto
          });

          montoAux = montoAux + self.dataIndicadores[i].monto;
        };

        var params = {

          montoTotal: montoAux,
          comisiones: comisionesAux

        }
        reportServices.generarReportePrimasCobradas(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE PRIMAS PENDIENTES ************
      */
      else if (self.reportesViews.primasPendientes) {

        var montoAux = 0;
        var comisionesAux = [];

        for (var i = 0; i < self.dataIndicadores.length; i++) {

          comisionesAux.push({

            numero_poliza: self.dataIndicadores[i].reciboPoliza,
            ramo: self.dataIndicadores[i].ramo,
            aseguradora: self.dataIndicadores[i].aseguradora,
            subramo: self.dataIndicadores[i].subRamo,
            monto: self.dataIndicadores[i].monto
          });
          montoAux = montoAux + self.dataIndicadores[i].monto;
        }

        var params = {

          montoTotal: montoAux,
          primas: comisionesAux

        }
        reportServices.generarReportePrimasPendiente(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE COMISIONES COBRADAS ************
      */
      else if (self.reportesViews.comisionesCobradas) {

        var montoAux = 0;
        var comisionesAux = [];

        for (var i = 0; i < self.dataIndicadores.length; i++) {

          comisionesAux.push({

            numero_recibo: self.dataIndicadores[i].reciboPoliza,
            ramo: self.dataIndicadores[i].ramo,
            aseguradora: self.dataIndicadores[i].aseguradora,
            subramo: self.dataIndicadores[i].subRamo,
            monto: self.dataIndicadores[i].monto
          });
          montoAux = montoAux + self.dataIndicadores[i].monto;
        }

        var params = {

          montoTotal: montoAux,
          comisiones: comisionesAux
        }
        reportServices.generarReporteComisionCobrada(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE COMISIONES PENDIENTES ************
      */
      else if (self.reportesViews.comisionesPendientes) {

        var montoAux = 0;
        var comisionesAux = [];

        for (var i = 0; i < self.dataIndicadores.length; i++) {

          comisionesAux.push({

            numero_recibo: self.dataIndicadores[i].reciboPoliza,
            ramo: self.dataIndicadores[i].ramo,
            aseguradora: self.dataIndicadores[i].aseguradora,
            subramo: self.dataIndicadores[i].subRamo,
            monto: self.dataIndicadores[i].monto
          });
          montoAux = montoAux + self.dataIndicadores[i].monto;
        }

        var params = {

          montoTotal: montoAux,
          comisiones: comisionesAux
        }
        reportServices.generarReporteComisionPendiente(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE POLIZA PERSONA ************
      */
      else if (self.reportesViews.polizaPersona) {

        var cantidadAux = 0;
        var polizaAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          polizaAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            portentaje: self.dataReportes[i].portentaje
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          porcentajeTotal: "100%",
          polizasRamo: polizaAux
        }
        reportServices.generarReportePolizasporRamo(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE POLIZA PATRIMONIAL ************
      */
      else if (self.reportesViews.polizaPatrimonial) {

        var cantidadAux = 0;
        var polizaAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          polizaAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            porcentaje: self.dataReportes[i].portentaje
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          polizasRamo: polizaAux
        }
        reportServices.generarReportePolizasporRamo(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE POLIZA AUTOMOVIL ************
      */
      else if (self.reportesViews.polizaAutomovil) {

        var cantidadAux = 0;
        var polizaAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          polizaAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            porcentaje: self.dataReportes[i].portentaje
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          polizasRamo: polizaAux
        }
        reportServices.generarReportePolizasporRamo(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE SINIESTRO PERSONA ************
      */
      else if (self.reportesViews.siniestroPersona) {

        var cantidadAux = 0;
        var siniestroAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          siniestroAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            tiposiniestro: self.dataReportes[i].tipoSiniestro
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          siniestros: siniestroAux
        }
        reportServices.generarReporteSiniestro(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE SINIESTRO PATRIMONIAL ************
      */
      else if (self.reportesViews.siniestroPatrimonial) {

        var cantidadAux = 0;
        var siniestroAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          polizaAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            tiposiniestro: self.dataReportes[i].tipoSiniestro
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          siniestros: siniestroAux
        }
        reportServices.generarReporteSiniestro(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE SINIESTRO AUTOMOVIL ************
      */
      else if (self.reportesViews.siniestroAutomovil) {

        var cantidadAux = 0;
        var siniestroAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          siniestroAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            tiposiniestro: self.dataReportes[i].tipoSiniestro
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          siniestros: siniestroAux
        }
        reportServices.generarReporteSiniestro(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE SINIESTRO GENERALES ************
      */
      else if (self.reportesViews.siniestroGeneral) {

        var cantidadAux = 0;
        var siniestroAux = [];
        console.log(self.dataReportes);
        for (var i = 0; i < self.dataReportes.length; i++) {

          siniestroAux.push({

            cantidad: self.dataReportes[i].cantidad,
            ramo: self.dataReportes[i].ramo,
            aseguradora: self.dataReportes[i].aseguradora,
            subramo: self.dataReportes[i].subRamo,
            tiposiniestro: self.dataReportes[i].tipoSiniestro
          });
          cantidadAux = cantidadAux + self.dataReportes[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          siniestros: siniestroAux
        }
        reportServices.generarReporteSiniestro(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE RENOVACIONES ************
      */
      else if (self.reportesViews.cantidadRenovaciones) {

        var cantidadAux = 0;
        var renovacionesAux = [];
        console.log(self.dataIndicadores);
        for (var i = 0; i < self.dataIndicadores.length; i++) {

          renovacionesAux.push({

            cantidad: self.dataIndicadores[i].cantidad,
            ramo: self.dataIndicadores[i].ramo,
            aseguradora: self.dataIndicadores[i].aseguradora,
            subramo: self.dataIndicadores[i].subRamo
          });
          cantidadAux = cantidadAux + self.dataIndicadores[i].cantidad;
        }

        var params = {

          cantidadTotal: cantidadAux,
          renovaciones: renovacionesAux
        }
        reportServices.generarReporteRenovacion(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
      /*
      ************ REPORTE BONOS ************
      */
      else if (self.reportesViews.bonosCobrados) {

        var montoAux = 0;
        var bonoAux = [];
        console.log(self.dataBonosCobrados);
        for (var i = 0; i < self.dataBonosCobrados.length; i++) {

          bonoAux.push({

            monto: self.dataBonosCobrados[i].monto,
            empresa: self.dataBonosCobrados[i].empresa

          });
          montoAux = montoAux + self.dataBonosCobrados[i].monto;
        }

        var params = {

          montoTotal: montoAux,
          bonos: bonoAux
        }
        reportServices.generarReporteBonosCobrados(params)
          .success(function (data) {

            var file = new Blob([data], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);

            $scope.contentCompCita = $sce.trustAsResourceUrl(url);
            window.open($scope.contentCompCita);
            new PNotify({
              title: 'Operación Exitosa',
              text: 'Reporte generado con éxito',
              //text: 'Ha ocurrido un error en el sistema.',
              type: 'success',
              styling: 'bootstrap3',
              cornerclass: 'ui-pnotify-sharp'
            });
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
    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/

    $rootScope.$on('reportePrimasCobradas', function () {
      console.log('on rootscope reportePrimasCobradas');
      //self.viewsController('reportes');
      self.reportesController('primasCobradas');
    });

    $rootScope.$on('reportePrimasPendientes', function () {
      //self.viewsController('reportes');
      self.reportesController('primasPendientes');
    });

    $rootScope.$on('reporteComisionesCobradas', function () {
      //self.viewsController('reportes');
      self.reportesController('comisionesCobradas');
    });

    $rootScope.$on('reporteComisionesPendientes', function () {
      //self.viewsController('reportes');
      self.reportesController('comisionesPendientes');
    });

    $rootScope.$on('reporteBonosCobrados', function () {
      //self.viewsController('reportes');
      self.reportesController('bonosCobrados');
    });

    $rootScope.$on('reporteBonosPendientes', function () {
      //self.viewsController('reportes');
      self.reportesController('bonosPendientes');
    });

    $rootScope.$on('reportePolizaPersona', function () {
      //self.viewsController('reportes');
      self.reportesController('polizaPersona');
    });

    $rootScope.$on('reportePolizaPatrimoniales', function () {
      //self.viewsController('reportes');
      self.reportesController('polizaPatrimonial');
    });

    $rootScope.$on('reportePolizaAutomovil', function () {
      //self.viewsController('reportes');
      self.reportesController('polizaAutomovil');
    });

    $rootScope.$on('reporteSiniestroPersona', function () {
      //self.viewsController('reportes');
      self.reportesController('siniestroPersona');
    });

    $rootScope.$on('reporteSiniestroPatrimoniales', function () {
      //self.viewsController('reportes');
      self.reportesController('siniestroPatrimonial');
    });

    $rootScope.$on('reporteSiniestroAutomovil', function () {
      //self.viewsController('reportes');
      self.reportesController('siniestroAutomovil');
    });

    $rootScope.$on('reporteSiniestroGeneral', function () {
      // self.viewsController('reportes');
      self.reportesController('siniestroGeneral');
    });

    $rootScope.$on('reporteCantidadRenovaciones', function () {
      //self.viewsController('reportes');
      self.reportesController('cantidadRenovaciones');
    });

    $rootScope.$on('inicio', function () {
      //self.viewsController('inicio');
      console.log('inicio');
      self.indicadoresService();
      self.viewsController('inicio');
      //self.createCharts();
    });

    this.startDateOnSetTime = function () {
      console.log('start-date-changed');
      $scope.$broadcast('start-date-changed');
    }

    this.endDateOnSetTime = function () {
      console.log('end-date-changed');
      $scope.$broadcast('end-date-changed');
    }

    this.startDateBeforeRender = function ($dates) {
      console.log($dates);
      if (self.fechaRenovaciones.fin) {
        var activeDate = moment(self.fechaRenovaciones.fin);

        $dates.filter(function (date) {
          return date.localDateValue() >= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

    this.endDateBeforeRender = function ($view, $dates) {
      console.log($view);
      console.log($dates);
      if (self.fechaRenovaciones.inicio) {
        var activeDate = moment(self.fechaRenovaciones.inicio).subtract(1, $view).add(1, 'minute');

        $dates.filter(function (date) {
          return date.localDateValue() <= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

    this.createTable = function (value) {
      if (value == 'polizas') {
        console.log('on polizas..');
        $('#tablaPolizasPorRamos').DataTable({
          data: self.dataReportes,
          aoColumns: [
            { 'data': 'aseguradora',sDefaultContent: '' },
            { 'data': 'ramo',sDefaultContent: '' },
            { 'data': 'subRamo',sDefaultContent: '' },
            { 'data': 'cantidad',sDefaultContent: '' },
            { 'data': 'porcentaje',sDefaultContent: '' }
          ],
          columnDefs: [
            { "className": "text-center", "targets": "_all" }
          ]
        });
      } else if (value == 'siniestros') {
        console.log('on siniestros..');
        $('#tablaSiniestrosPorRamos').DataTable({
          data: self.dataReportes,
          aoColumns: [
            { 'data': 'aseguradora',sDefaultContent: '' },
            { 'data': 'ramo',sDefaultContent: '' },
            { 'data': 'subRamo',sDefaultContent: '' },
            { 'data': 'cantidad',sDefaultContent: '' },
            { 'data': 'porcentaje',sDefaultContent: '' }
          ],
          columnDefs: [
            { "className": "text-center", "targets": "_all" }
          ]
        });
      } else if (value == 'indicadores') {
        console.log('on indicadores..');
        $('#tablaIndicadores').DataTable({
          data: self.dataIndicadores,
          aoColumns: [
            { 'data': 'aseguradora', sDefaultContent: '' },
            { 'data': 'monto', sDefaultContent: '' },
            { 'data': 'reciboPoliza', sDefaultContent: '' },
            { 'data': 'ramo', sDefaultContent: '' },
            { 'data': 'subRamo', sDefaultContent: '' }
          ],
          columnDefs: [
            { "className": "text-center", "targets": "_all" }
          ]
        });
      } else if (value == 'bonosCobrados') {
        console.log('on indicadores..');
        $('#tablaBonosCobrados').DataTable({
          data: self.dataBonosCobrados,
          aoColumns: [
            { 'data': 'nombre',sDefaultContent: '' },
            { 'data': 'empresa',sDefaultContent: '' },
            { 'data': 'moneda',sDefaultContent: '' },
            { 'data': 'monto',sDefaultContent: '' }
          ],
          columnDefs: [
            { "className": "text-center", "targets": "_all" }
          ]
        });
      } else if (value == 'cantidadRenovaciones') {
        console.log('on indicadores..');
        $('#tablaRenovaciones').DataTable({
          data: self.dataIndicadores,
          aoColumns: [
            { 'data': 'aseguradora',sDefaultContent: '' },
            { 'data': 'cantidad',sDefaultContent: '' },
            { 'data': 'ramo',sDefaultContent: '' },
            { 'data': 'subRamo',sDefaultContent: '' }
          ],
          columnDefs: [
            { "className": "text-center", "targets": "_all" }
          ]
        });
      }

    };

    this.createCharts = function () {
      console.log('on createCharts function..');
      var chart;

      // var newChart = AmCharts.makeChart("chartdiv1", option);
      AmCharts.baseHref = true;
      AmCharts.ready(function () {
        // SERIAL CHART
        console.log('on createCharts ready function..');
        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = self.polizasChart.aseguradorasData;
        chart.categoryField = "nombre";
        chart.startDuration = 1;

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.labelRotation = 90;
        categoryAxis.gridPosition = "start";

        // value
        // in case you don't want to change default settings of value axis,
        // you don't need to create it, as one value axis is created automatically.

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.valueField = "valor";
        graph.balloonText = "[[category]]: <b>[[value]]</b>";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 0.8;
        chart.addGraph(graph);

        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0;
        chartCursor.zoomable = false;
        chartCursor.categoryBalloonEnabled = false;
        chart.addChartCursor(chartCursor);

        chart.creditsPosition = "top-right";

        chart.write("#aseguradorasChart");
      });
    }

    this.plotFunction = function () {

      var sampleData = [
        { nombre: 'Segucar', valor: '12' },
        { nombre: 'Financiadora X', valor: '12' },
        { nombre: 'Financiadora Y', valor: '34' },
        { nombre: 'Financiadora Z', valor: '46' },
        { nombre: 'Financiadora AA', valor: '120' },
        { nombre: 'Financiadora AB', valor: '12' },
        { nombre: 'Financiadora AC', valor: '83' },
        { nombre: 'Financiadora AD', valor: '45' },
        { nombre: 'Financiadora AE', valor: '23' },
        { nombre: 'Financiadora AF', valor: '39' },
        { nombre: 'Financiadora AG', valor: '52' },
        { nombre: 'Financiadora AA', valor: '73' },
        { nombre: 'Financiadora AB', valor: '12' },
        { nombre: 'Financiadora AC', valor: '83' },
        { nombre: 'Financiadora AD', valor: '45' },
        { nombre: 'Financiadora AE', valor: '23' },
        { nombre: 'Financiadora AF', valor: '39' },
        { nombre: 'Financiadora AG', valor: '52' }
      ];
      // prepare jqxChart settings
      var settings = {
        title: "Bonos por aseguradoras",
        description: "Aseguradoras",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
        source: self.detalleBonos.aseguradoras,
        xAxis:
        {
          dataField: 'nombre',
          showGridLines: true,
          visible: false

        },
        colorScheme: 'scheme01',
        seriesGroups:
        [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            //useGradient: false,
            valueAxis:
            {
              displayValueAxis: true,
              description: 'Monto de los bonos',
              axisSize: 'auto',
              tickMarksColor: '#8087a5',
              formatSettings: { decimalPlaces: 0 }
            },
            series: [
              { dataField: 'monto', displayText: 'monto', color: '#1ABB9C' }
            ]
          }
        ]
      };

      $('#bonoAseguradoras').jqxChart(settings);

      var settings = {
        title: "Bonos por financiadoras",
        description: "Financiadoras",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
        source: self.detalleBonos.financiadoras,
        xAxis:
        {
          dataField: 'nombre',
          showGridLines: true,
          visible: false
        },
        colorScheme: 'scheme01',
        seriesGroups:
        [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis:
            {
              displayValueAxis: true,
              description: 'Monto de los bonos',
              axisSize: 'auto',
              tickMarksColor: '#8087a5',
              formatSettings: { decimalPlaces: 0 }
            },
            series: [
              { dataField: 'monto', displayText: 'monto', color: '#1ABB9C' }
            ]
          }
        ]
      };

      $('#bonoFinanciadoras').jqxChart(settings);


      var settings = {
        title: "Cantidad de siniestros por aseguradoras",
        description: "Aseguradoras",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
        source: self.siniestrosPorAseguradora,
        xAxis:
        {
          dataField: 'aseguradora',
          showGridLines: true,
          visible: false
        },
        colorScheme: 'scheme01',
        seriesGroups:
        [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            //useGradient: false,
            valueAxis:
            {
              displayValueAxis: true,
              description: 'Número de siniestros',
              axisSize: 'auto',
              unitInterval: 10,
              tickMarksColor: '#8087a5',
              formatSettings: { decimalPlaces: 0 }
            },
            series: [
              { dataField: 'total', displayText: 'total', color: '#1ABB9C' }
            ]
          }
        ]
      };

      $('#siniestrosPorAseguradora').jqxChart(settings);

      var settings = {
        title: "Renovaciones de pólizas por aseguradoras",
        description: "Aseguradoras",
        enableAnimations: true,
        showLegend: true,
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
        source: self.polizasRenovar,
        xAxis:
        {
          dataField: 'aseguradora',
          showGridLines: true,
          visible: false
        },
        colorScheme: 'scheme01',
        seriesGroups:
        [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            //useGradient: false,
            valueAxis:
            {
              displayValueAxis: true,
              description: 'Cantidad de renovaciones',
              unitInterval: 10,
              axisSize: 'auto',
              tickMarksColor: '#8087a5',
              formatSettings: { decimalPlaces: 0 }
            },
            series: [
              { dataField: 'total', displayText: 'total', color: '#1ABB9C' }
            ]
          }
        ]
      };

      $('#renovarPolizas').jqxChart(settings);

      new Chart(document.getElementById("polizasPorRamo"), {
        type: 'doughnut',
        tooltipFillColor: "rgba(51, 51, 51, 0.55)",
        data: {
          labels: [
            "Automovil",
            "Patrimonial",
            "Persona"
          ],
          datasets: [{
            data: [
              self.polizasPorRamo.AUT,
              self.polizasPorRamo.PAT,
              self.polizasPorRamo.PER
            ],
            backgroundColor: [
              "#E74C3C",
              "#26B99A",
              "#3498DB"
            ],
            hoverBackgroundColor: [
              "#E95E4F",
              "#36CAAB",
              "#49A9EA"
            ]
          }]
        },
        options: {
          legend: false,
          responsive: false
        }
      });

      new Chart(document.getElementById("siniestrosPorRamo"), {
        type: 'doughnut',
        tooltipFillColor: "rgba(51, 51, 51, 0.55)",
        data: {
          labels: [
            "Automovil",
            "Patrimonial",
            "Persona"
          ],
          datasets: [{
            data: [
              self.siniestrosPorRamo.AUT,
              self.siniestrosPorRamo.PAT,
              self.siniestrosPorRamo.PER
            ],
            backgroundColor: [
              "#E74C3C",
              "#26B99A",
              "#3498DB"
            ],
            hoverBackgroundColor: [
              "#E95E4F",
              "#36CAAB",
              "#49A9EA"
            ]
          }]
        },
        options: {
          legend: false,
          responsive: false
        }
      });

      $("#sparkline_one").sparkline(
        [2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 4, 5, 6, 3, 5, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6],
        {
          type: 'bar',
          height: '125',
          barWidth: 13,
          colorMap: {
            '7': '#a1a1a1'
          },
          barSpacing: 2,
          barColor: '#26B99A'
        });

      console.log('sparkline flag');
    }

  }]);

})();
