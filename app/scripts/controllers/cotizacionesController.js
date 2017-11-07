(function () {

    'use strict';

    var cotizacionesController = angular.module('DGBOSS.cotizacionesController', ['DGBOSS.mainServices', 'DGBOSS.cotizacionesServices', 'DGBOSS.mailServices']);

    cotizacionesController.controller('cotizacionesController', ['$scope', '$rootScope', '$compile', 'mainServices', 'cotizacionesServices', 'mailServices', function ($scope, $rootScope, $compile, mainServices, cotizacionesServices, mailServices) {

        var self = this;

        console.log('cotizacionesController activated.');

        /********************************************************************************************
        **                                      V A R I A B L E S                                  **
        ********************************************************************************************/

        /*
        this.views: { this will set the insured view. }
        */
        this.views = {
            cargarAsegurados: false,
            cargarCotizaciones: false,
            listarCotizaciones: false,
            listarCotizacionesSeleccionadas: false,
            verCotizacion: false,
        };

        this.aseguradosViews = {
            cargar: true,
            exito: false
        };

        this.cotizacionesViews = {
            cargar: true,
            exito: false
        };

        this.cotizacionesAceptadas = [];

        this.mensajeAseguradoService = undefined;

        this.asd = 'asd123';

        this.archivoAsegurados = undefined;
        this.archivoExcelDos = undefined;

        this.nuevaFinanciadora = {
            nombre: undefined,
            tipoRif: undefined,
            rif: undefined,
            direccionFiscal: undefined,
            telefonoFiscal: undefined,
            direccionSucursal: undefined,
            telefonoSucursal: undefined,
            contactos: []
        };

        this.cotizaciones = [
            { nombre: 'dasdasd1', rif: '12sadasd', direccionFiscal: 'asdasdsd', telefonoFiscal: 'sadasdsad', estatus: 'Pendiente', value: false },
            { nombre: 'dasdasd2', rif: '23sadasd', direccionFiscal: 'asdasdsd', telefonoFiscal: 'sadasdsad', estatus: 'Pendiente', value: false },
            { nombre: 'dasdasd3', rif: '34sadasd', direccionFiscal: 'asdasdsd', telefonoFiscal: 'sadasdsad', estatus: 'Pendiente', value: true },
            { nombre: 'dasdasd4', rif: '45sadasd', direccionFiscal: 'asdasdsd', telefonoFiscal: 'sadasdsad', estatus: 'Pendiente', value: false }
        ];

        this.cotizacionesPorEnviar = [];
        this.cotizacionesModal = undefined;

        this.emailTemplate = `<div align="center" style="width: 80%; margin-left: 10%">
        <div style="width: 100%">
    <img style="width: 100%" src="./img/anotherCarBlack/carBlackHeaderWithLetters.png">
  </div>`;

        /*<div style="width: 100%; margin-top: 10px; background-color: #364a5e; color: white; border-top: 4px solid lightgrey; border-bottom: 8px solid lightgrey">
          <div style="margin: 0px 20px 20px 20px; padding-top: 20px">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: left;">Estimado cliente: </br>
              <b>SCULL LARA FERNANDO ALEJANDRO</b>
            </p>
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: left">
              Aún está a tiempo para mejorar la suma asegurada de su vehículo. Lo contactamos para ofrecerle una propuesta de actualización de la suma
              asegurada de su vehículo, con la cual estará resguardando su valor sin tener que realizarle una inspección al automóvil.
              </br>
            </p>
          </div>
        </div>
      
        <div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px;">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              <b>La información de su vehículo y póliza</b>
            </p>
            <table style="border-spacing: 0; width: 50%;  border: 1px solid #73879C;">
              <thead >
                <!--<th style="width: 50%"></th>
                <th></th>-->
                <!--<th>Nro. de Póliza</th>-->
              </thead>
              <tbody>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Nro. de Póliza: </b></td>
                  <td style="border-bottom: 1px solid #ddd;">23-56-2260669-000002017</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Nro. de Recibo: </b></td>
                  <td style="border-bottom: 1px solid #ddd;">3586567</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Vigencia: </b></td>
                  <td style="border-bottom: 1px solid #ddd;">17/06/2016 - 17/06/2017</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Vehículo: </b></td>
                  <td style="border-bottom: 1px solid #ddd;">Jeep</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Placa: </b></td>
                  <td style="border-bottom: 1px solid #ddd;">AA775HV</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada (Vigente)</b></td>
                  <td style="border-bottom: 1px solid #ddd;">Bs. 15.190.560</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada (Propuesta)</b></td>
                  <td style="border-bottom: 1px solid #ddd;">Bs. 18.526.300</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center"><b>Prima a pagar</b></td>
                  <td>Bs.50.320,46</td>
                </tr>
              </tbody>
            </table>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Para avanzar con la revalorización, hacer click en el siguiente botón.
            </h3>
            <a href="#">
              <button style="border: 2px solid #364a5e; color: white; background-color: #364a5e; cursor: pointer; width: 100px; height: 50px; border-radius: 5px;">
                Revalorizar
              </button>
            </a>
          </div>
        </div>
      
        <div style="width: 100%; margin-top: 10px; background-color: #364a5e; color: white; border-top: 4px solid lightgrey; border-bottom: 8px solid lightgrey">
          <div style="">
            <h1 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              ¿Otras opciones?
            </h1>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">Te ofrecemos otras Sumas Aseguradas para que puedas seleccionar la que se adapte a tus necesidades.</h3>
          </div>
        </div>
      
        <div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px;">
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Opción #1
            </h3>
            <img height="100" src="./img/seguros/G-20008701-3.png">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Suma Asegurada: 5% más a la suma asegurada propuesta inicialmente.
            </p>
            <table style="border-spacing: 0; width: 50%;  border: 1px solid #73879C;">
              <thead >
              </thead>
              <tbody>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada propuesta: </b></td>
                  <td style="border-bottom: 1px solid #ddd;"> Bs. 19.452.615</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center"><b>Prima a Pagar: </b></td>
                  <td> Bs. 64.284,18</td>
                </tr>
              </tbody>
            </table>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Para proceder con la opción #1, hacer click en el siguiente botón.
            </h3>
            <a href="#">
              <button style="border: 2px solid #364a5e; color: white; background-color: #364a5e; cursor: pointer; width: 100px; height: 50px; border-radius: 5px;">
                Aceptar
              </button>
            </a>
          </div>
        </div>
      
        <div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px;">
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Opción #2
            </h3>
            <img height="100" src="./img/seguros/G-20008701-3.png">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Suma Asegurada: 10% más a la suma asegurada propuesta inicialmente.
            </p>
            <table style="border-spacing: 0; width: 50%;  border: 1px solid #73879C;">
              <thead >
              </thead>
              <tbody>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada propuesta: </b></td>
                  <td style="border-bottom: 1px solid #ddd;"> Bs. 19.452.615</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center"><b>Prima a Pagar: </b></td>
                  <td> Bs. 64.284,18</td>
                </tr>
              </tbody>
            </table>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Para proceder con la opción #1, hacer click en el siguiente botón.
            </h3>
            <a href="#">
              <button style="border: 2px solid #364a5e; color: white; background-color: #364a5e; cursor: pointer; width: 100px; height: 50px; border-radius: 5px;">
                Aceptar
              </button>
            </a>
          </div>
        </div>
      
        <div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px;">
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Opción #3
            </h3>
            <img height="100" src="./img/seguros/J-00038923-3.png">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Suma Asegurada: 7% más a la suma asegurada propuesta inicialmente.
            </p>
            <table style="border-spacing: 0; width: 50%;  border: 1px solid #73879C;">
              <thead >
              </thead>
              <tbody>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada propuesta: </b></td>
                  <td style="border-bottom: 1px solid #ddd;"> Bs. 19.452.615</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center"><b>Prima a Pagar: </b></td>
                  <td> Bs. 64.284,18</td>
                </tr>
              </tbody>
            </table>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Para proceder con la opción #1, hacer click en el siguiente botón.
            </h3>
            <a href="#">
              <button style="border: 2px solid #364a5e; color: white; background-color: #364a5e; cursor: pointer; width: 100px; height: 50px; border-radius: 5px;">
                Aceptar
              </button>
            </a>
          </div>
        </div>
      
        <div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px;">
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Opción #4
            </h3>
            <img height="100" src="./img/seguros/J-00090180-5.png">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
              Suma Asegurada: 10% más a la suma asegurada propuesta inicialmente.
            </p>
            <table style="border-spacing: 0; width: 50%;  border: 1px solid #73879C;">
              <thead >
              </thead>
              <tbody>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center; border-bottom: 1px solid #ddd;"><b>Suma asegurada propuesta: </b></td>
                  <td style="border-bottom: 1px solid #ddd;"> Bs. 19.452.615</td>
                </tr>
                <tr style="background-color: #f9f9f9; color: #73879C; font-family: 'Helvetica Neue', Roboto, Arial, 'Droid Sans', sans-serif; font-size: 13px; font-weight: 400; line-height: 1.471;">
                  <td style="text-align: center"><b>Prima a Pagar: </b></td>
                  <td> Bs. 64.284,18</td>
                </tr>
              </tbody>
            </table>
            <h3 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Para proceder con la opción #1, hacer click en el siguiente botón.
            </h3>
            <a href="#">
              <button style="border: 2px solid #364a5e; color: white; background-color: #364a5e; cursor: pointer; width: 100px; height: 50px; border-radius: 5px;">
                Aceptar
              </button>
            </a>
          </div>
        </div>
      
        <!--<div style="width: 100%; background-color: lightgrey; color: #364a5e; border-top: 4px solid #364a5e; border-bottom: 8px solid #364a5e">
          <div style="margin: 0px 20px 20px 20px; padding-top: 20px">
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: left;">Estimado cliente: </br>
              <b>SCULL LARA FERNANDO ALEJANDRO</b>
            </p>
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: left">
              Aún está a tiempo para mejorar la suma asegurada de su vehículo. Lo contactamos para ofrecerle una propuesta de actualización de la suma
              asegurada de su vehículo, con la cual estará resguardando su valor sin tener que realizarle una inspección al automóvil.
              </br>
            </p>
          </div>
        </div>-->
      
      
        <div style="width: 100%; margin-top: 10px; background-color: #364a5e; color: white; border-top: 4px solid lightgrey; border-bottom: 8px solid lightgrey">
          <div>
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              No responder este correo
            </p>
            <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">
              Parrafo adicional con información importante.
            </p>
          </div>
        </div>
      
        <div style="width: 100%; margin-top: 10px; background-color: black; color: white; border-top: 4px solid lightgrey; border-bottom: 8px solid lightgrey">
          <div>
            <img height="100" src="./img/dgBossImagotipo.png">
          </div>
          <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center; margin-top: 0;">
            Síguenos en nuestras redes sociales..
          </p>
          <div style="width: 60%; display: inline-block; margin-bottom: 10px">
              <img height="50" style="margin-right: 20px" src="./img/008-twitter.png">
              <img height="50" style="margin-right: 20px" src="./img/036-facebook.png">
              <img height="50" src="./img/029-instagram.png">
          </div>
        </div>
      
      </div>`;*/

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
        /*
        */

        this.cargarAseguradosService = function (excelFile) {
            console.log('on cargarAseguradosService call function..');

            var file = excelFile,
                uploadURL = 'http://192.168.1.110:8080/dgboss-services/rest/file/upload';

            console.log(file);
            console.dir(file);

            cotizacionesServices.cargarAsegurados(file)
                .success(function (data) {
                    console.log('success on cargarAseguradosService call function..');
                    console.log(data);
                    new PNotify({
                        title: '¡Asegurados cargados!',
                        text: 'Asegurados cargados con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                    self.mensajeAseguradoService = 'Se insertó ' + data.successful + ' de ' + (data.failures + data.successful) + ' asegurados.';
                    self.aseguradosViewsController('exito');
                })
                .error(function (data, status, headers, config) {
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de cargar los asegurados.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

        this.cargarCotizacionesService = function (excelFile) {
            console.log('on cargarCotizacionesService call function..');

            var file = excelFile;

            console.log(file);
            console.dir(file);


            cotizacionesServices.cargarCotizaciones(file)
                .success(function (data) {
                    console.log('success on cargarAseguradosService call function..');
                    console.log(data);
                    new PNotify({
                        title: '¡Cotizaciones cargadas!',
                        text: 'Cotizaciones cargadas con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });

                    self.consultarCotizacionesService('');

                    //self.viewsController('listarCotizaciones');
                    // self.mensajeAseguradoService = 'Se insertó '+ data.successful + ' de ' + (data.failures+data.successful) + ' asegurados.';
                    // self.aseguradosViewsController('exito');
                })
                .error(function (data, status, headers, config) {
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de cargar las cotizaciones.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

        this.consultarCotizacionService = function (id) {
            var params = {
                idCotizacion: id,
                rifEmpresa: mainServices.getRifEmpresa()
            };

            cotizacionesServices.consultarCotizaciones(params)
                .success(function (data) {
                    console.log('success on consultarCotizacion call function..');
                    console.log(data);
                    self.cotizacionesModal = data[0];
                    console.log(self.cotizacionesModal);
                    $('#verCotizacionModal').modal({
                        show: 'true'
                    });
                    //$('#verFinanciadora').modal('show');
                })
                .error(function (data, status, headers, config) {
                    console.log('error', data);
                });
        };

        this.consultarCotizacionesService = function (id, optional) {
            var params = {
                idCotizacion: id,
                rifEmpresa: mainServices.getRifEmpresa()
            };

            cotizacionesServices.consultarCotizaciones(params)
                .success(function (data) {
                    console.log('success on cargarAseguradosService call function..');
                    console.log(data);

                    self.cotizaciones = [];
                    var item = {};

                    for (var i = 0; i < data.length; i++) {
                        item = {
                            id: data[i].id,
                            nombre: data[i].nombre,
                            cedula: data[i].cedula,
                            tipo: data[i].tipo,
                            marca: data[i].marca,
                            modelo: data[i].modelo,
                            ano: data[i].anio,
                            fecha: data[i].fechaProceso,
                            placa: data[i].placa,
                        }
                        if (data[i].estatus == 'ADDED') {
                            item.estatus = 'Pendiente';
                        } else if (data[i].estatus == 'SENDED') {
                            item.estatus = 'Enviado';
                        } else {
                            item.estatus = 'Fallido';
                        }
                        // if(item.nombre == 'null' || item.cedula == 'null' || item.placa == 'null'){
                        //     //nothing happens..
                        // }else


                        if (item.nombre != 'null' || item.cedula != 'null' || item.placa != 'null') {
                            self.cotizaciones.push(item);
                        }

                        item = {};
                    };

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarCotizaciones')) {
                        $('#tablaConsultarCotizaciones').dataTable().fnDestroy();
                        self.createTable();
                    } else {
                        $('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
                    }

                    if ((optional == 'cargar' && self.cotizaciones.length > 0) || !optional) {
                        self.viewsController('listarCotizaciones');
                        if (self.cotizaciones.length > 0) {
                            if (optional == 'cargar') {
                                new PNotify({
                                    title: '¡Quedan cotizaciones pendientes!',
                                    text: 'Para poder cargar, descarte las cotizaciones pendientes.',
                                    type: 'warning',
                                    styling: 'bootstrap3',
                                    cornerclass: 'ui-pnotify-sharp'
                                });
                            }

                            // new PNotify({
                            //     title: '¡Asegurados cargados!',
                            //     text: 'Asegurados cargados con éxito.',
                            //     type: 'success',
                            //     styling: 'bootstrap3',
                            //     cornerclass: 'ui-pnotify-sharp'
                            // });
                        } else {
                            new PNotify({
                                title: '¡Alerta!',
                                text: 'Aún no hay cotizaciones pendientes.',
                                type: 'warning',
                                styling: 'bootstrap3',
                                cornerclass: 'ui-pnotify-sharp'
                            });
                        }

                    } else {
                        self.viewsController('cargarCotizaciones');
                    }

                })
                .error(function (data, status, headers, config) {
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de cargar los asegurados.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

        this.enviarCotizaciones = function () {
            for (var i = 0; i < self.cotizacionesPorEnviar.length; i++) {
                var index = self.cotizaciones.indexOf(self.cotizacionesPorEnviar[i]);
                self.enviarCotizacionService(self.cotizacionesPorEnviar[i], index);
            };
            //$('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
        }

        this.enviarCotizacionService = function (cotizacion, index) {
            var params = {
                idCotizacion: cotizacion.id,
                dominio: mainServices.getDomain()
            };
            console.log(index);
            mailServices.enviarEmail(params)
                .success(function (data) {
                    console.log('success on enviarEmail call function..');
                    console.log(data);
                    if (data.mensaje == 'ERROR EMAIL') {
                        self.cotizaciones[index].estatus = 'Fallido';
                        $('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
                    } else {
                        console.log('se envio');
                        // var index = self.cotizaciones.indexOf(self.cotizacionesPorEnviar[i]);
                        self.cotizaciones[index].estatus = 'Enviado';
                        $('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
                    }
                    // $('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
                })
                .error(function (data, status, headers, config) {
                    self.cotizaciones[index].estatus = 'Fallido';
                    $('#tablaConsultarCotizaciones').DataTable().clear().rows.add(self.cotizaciones).draw();
                });

        };

        this.descartarCotizacionesService = function () {
            var params = {
                rifEmpresa: mainServices.getRifEmpresa()
            };
            console.log('clean');
            cotizacionesServices.descartarCotizaciones(params)
                .success(function (data) {
                    console.log('success on descartarCotizaciones Services');
                    console.log(data);
                    self.cancelFile('Cotizaciones');
                    new PNotify({
                        title: '¡Cotizaciones descartadas!',
                        text: 'Cotizaciones descartadas con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                    self.viewsController('cargarCotizaciones');
                })
                .error(function (data, status, headers, config) {
                    console.log('on error..');
                    console.log(data);
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de descartar las cotizaciones.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

        this.verFinanciadoraService = function (financiadora) {
            var params = {
                rif: financiadora.rif
            };
            console.log('Entre en verFinan');
            financiadoraServices.consultarFinanciadoras(params)
                .success(function (data) {
                    console.log('success on consultar ver finan..');
                    console.log(data);

                    var contacto = undefined;
                    financiadora.contactos = [];

                    for (var i = 0; i < data[0].contactosFinanciadora.length; i++) {


                        financiadora.contactos.push({
                            idContactoFinanciadora: 0,
                            nombreContacto: data[0].contactosFinanciadora[i].nombreContacto,
                            numeroTelefono: data[0].contactosFinanciadora[i].numeroTelefono,
                            cargo: data[0].contactosFinanciadora[i].cargo
                        });
                    };

                    self.verFinanciadora();
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    console.log('Error..');

                    if (!$.fn.DataTable.isDataTable('#tablaConsultarFinanciadoras')) {
                        self.createTable();
                    } else {
                        self.destroyTable();
                    }
                    self.viewsController('listarFinanciadoras');
                });
        };

        this.consultarCotizacionesAceptadasService = function (id) {
            var params = {
                estatus: 'SELECTED'
            };

            cotizacionesServices.consultarCotizacionesAceptadas(params)
                .success(function (data) {
                    console.log(data);
                    console.log(data.map.oCursor);
                    for (var i = 0; i < data.map.oCursor.length; i++) {
                        self.cotizacionesAceptadas.push(data.map.oCursor[i]);
                    }
                    self.createAceptadasTable();
                    self.viewsController('listarCotizacionesSeleccionadas');
                })
                .error(function (data, status, headers, config) {
                    console.log('error', data);
                });
        };

        /********************************************************************************************
        **                                    C O N T R O L L E R S                                **
        ********************************************************************************************/

        this.viewsController = function (view) {
            self.setObjectElems(self.views, false);
            switch (view) {
                case 'cargarCotizaciones':
                    self.views.cargarCotizaciones = true;
                    console.log('viewsController > cargarCotizaciones');
                    break;

                case 'listarCotizaciones':
                    self.views.listarCotizaciones = true;
                    console.log('viewsController > listarCotizaciones');
                    break;

                case 'verCotizacion':
                    self.views.verCotizacion = true;
                    console.log('viewsController > verCotizacion');
                    break;

                case 'listarCotizacionesSeleccionadas':
                    self.views.listarCotizacionesSeleccionadas = true;
                    console.log('viewsController > listarCotizacionesSeleccionadas');
                    break;

                case 'cargarAsegurados':
                    self.views.cargarAsegurados = true;
                    console.log('viewsController > cargarAsegurados');
                    break;

                default:
                    break;
            }
        };

        this.aseguradosViewsController = function (view) {
            switch (view) {
                case 'cargar':
                    self.cancelFile('Asegurados');
                    self.aseguradosViews.exito = false;
                    self.aseguradosViews.cargar = true;
                    break;

                case 'exito':
                    self.aseguradosViews.cargar = false;
                    self.aseguradosViews.exito = true;
                    break;

                default:
                    break;
            };
        };

        this.uploadFile = function (excelFile) {
            console.log('on UploadFile function..');
            var file = excelFile;

            console.log('file is ');
            console.log(file);
            console.dir(file);

            var uploadUrl = "www.grupodgfarm.com/varios/";
            cotizacionesServices.uploadFileToUrl(file, uploadUrl);
        };

        this.cancelFile = function (option) {
            switch (option) {

                case 'Asegurados':
                    $('#archivoAsegurados').val('');
                    self.archivoAsegurados = undefined;
                    break;

                case 'Cotizaciones':
                    $('#archivoCotizaciones').val('');
                    self.archivoCotizaciones = undefined;
                    break;

                default:
                    break;
            }
        };

        this.verFinanciadora = function (financiadora) {
            $('#verCotizacion').modal('show');
        };

        this.descartarCotizacionesModal = function () {
            $('.descartarCotizacionesModal').modal({
                show: 'true'
            });
        };

        this.descartarCotizaciones = function (option) {
            switch (option) {

                case 'aceptar':
                    if ($('.checkboxAll').hasClass('checked')) {
                        self.descartarCotizacionesService();
                    } else {
                        self.descartarSeleccionadas();
                    }
                    break;

                case 'cancelar':
                    $('.modal-backdrop').remove();
                    break;

                default:
                    break;
            }
        };

        this.destroyTable = function () {
            //console.log(self.financiadoras);
            $('#tablaConsultarFinanciadoras').dataTable().fnDestroy();
            console.log('on destroyTable function..');
            self.createTable();
        };

        this.activar = function () {
            //Just to activate the module.
            console.log('activando financiadora..');
        };

        this.verCotizacionAceptada = function (banco) {
            //self.bancoModal = banco;
            // $scope.verBancoModal2 = true;
            $('.verCotizacionAceptadaModal').modal({
                show: 'true'
            });
        };

        this.eliminarModal = function (opcion) {
            $('.modal-backdrop').remove();
        };

        /********************************************************************************************
        **                                   M I S C E L A N E O U S                               **
        ********************************************************************************************/


        $rootScope.$on('cargarCotizaciones', function () {
            console.log('on cargar..');
            self.consultarCotizacionesService('', 'cargar');
            // self.viewsController('cargarCotizaciones');
        });

        $rootScope.$on('listarCotizaciones', function () {
            self.consultarCotizacionesService('');
        });

        $rootScope.$on('listarCotizacionesSeleccionadas', function () {
            //self.consultarCotizacionesService('');
            self.consultarCotizacionesAceptadasService();
        });

        //
        $rootScope.$on('cargarAsegurados', function () {
            console.log('on rootScope cargarAsegurados');
            self.viewsController('cargarAsegurados');
        });

        this.createTable = function () {
            $('.no-sort').click();
            console.log(self.cotizaciones);
            $('#tablaConsultarCotizaciones').DataTable({
                data: self.cotizaciones,
                aoColumns: [
                    { 'defaultContent': '<td><div class="icheckbox_flat-green checkboxSingle" style="text-align: left;"></td>' },
                    { 'mData': 'nombre', sDefaultContent: '' },
                    { 'mData': 'cedula', sDefaultContent: '' },
                    { 'mData': 'marca', sDefaultContent: '' },
                    { 'mData': 'tipo', sDefaultContent: '' },
                    { 'mData': 'estatus', sDefaultContent: '', className: 'bold text-center' },
                    {
                        'defaultContent': '<td style="text-align: center;">\
                        <a class="verCotizacion cursor-pointer" data-toggle="modal">\
                            <i class="fa fa-search"></i>\
                        </a>\
                      </td>'
                    }
                ],
                order: [],
                'createdRow': function (row, data, dataIndex) {
                    if (data.estatus == 'Pendiente') {
                        $('td', row).eq(5).addClass('orangeColor dataColor');
                    } else if (data.estatus == 'Enviado') {
                        $('td', row).eq(5).addClass('greenColor dataColor');
                    } else if (data.estatus == 'Fallido') {
                        $('td', row).eq(5).addClass('redColor dataColor');
                    }
                },
                columnDefs: [
                    { className: "text-center", "targets": "_all" },
                    { targets: 'no-sort', orderable: false },
                    { 'className': "bold", "targets": [4] }
                ]
            }).on('draw.dt', function () {
                if ($('.checkboxAll').hasClass('checked')) {
                    $('#tablaConsultarCotizaciones').DataTable().rows('.checkboxSingle', $('.checkboxSingle').addClass('checked'));
                } else {
                    $('.checkboxAll').removeClass('checked');
                    $('.checkboxSingle').removeClass('checked');
                }
            });

            $('#tablaConsultarCotizaciones tbody').on('click', '.verCotizacion', function () {
                var data = $('#tablaConsultarCotizaciones').DataTable().row($(this).parents('tr')).data();
                console.log(data);

                self.consultarCotizacionService(data.id);
                // $("#verBancoModalCodigo").text(data.codigoSwift);
                // $("#verBancoModalNombre").text(data.nombre);
                // $("#verBancoModalNacionalidad").text(data.nacionalidad);

                //self.verBancoModal = data;
                // $('.activarFinanciadora').click();
                // self.verFinanciadoraService(self.financiadoraModal);
            });

            $('#tablaConsultarCotizaciones tbody').on('click', '.checkboxSingle', function () {
                var row = $('#tablaConsultarCotizaciones').DataTable().row($(this).parents('tr')).data();
                if (!row.value) {
                    $(this).closest('.checkboxSingle').addClass('checked');
                    row.value = true;
                    self.cotizacionesPorEnviar.push(row);
                    //$('#tablaConsultarCotizaciones').DataTable().cell( rowAux ).data('Enviado').draw();
                } else {
                    $(this).closest('.checkboxSingle').removeClass('checked');
                    row.value = false;
                    var index = self.cotizacionesPorEnviar.indexOf(row);
                    self.cotizacionesPorEnviar.splice(index, 1);
                };

                console.log(self.cotizacionesPorEnviar);
            });

            $('#tablaConsultarCotizaciones thead').on('click', '.no-sort', function () {
                var table = $('#tablaConsultarCotizaciones');
                if ($('.checkboxAll').hasClass('checked')) {
                    console.log('false');
                    $('.checkboxAll').removeClass('checked');
                    $('.checkboxSingle').removeClass('checked');
                    for (var i = 0; i < self.cotizaciones.length; i++) {
                        self.cotizaciones[i].value = false;
                    }
                    self.cotizacionesPorEnviar = [];
                } else {
                    console.log('true');
                    $('.checkboxAll').addClass('checked');

                    $('#tablaConsultarCotizaciones').DataTable().rows('.checkboxSingle', $('.checkboxSingle').addClass('checked'));
                    for (var i = 0; i < self.cotizaciones.length; i++) {
                        self.cotizaciones[i].value = true;
                    }
                    self.cotizacionesPorEnviar = JSON.parse(JSON.stringify(self.cotizaciones));
                    //self.cotizacionesPorEnviar = self.cotizaciones;
                }
                console.log(self.cotizacionesPorEnviar);
            });
        };

        this.createAceptadasTable = function () {
            $('#tablaCotizacionesAceptadas').DataTable({
                data: self.cotizacionesAceptadas,
                aoColumns: [
                    { 'mData': 'nombre', sDefaultContent: '' },
                    { 'mData': 'cedula', sDefaultContent: '' },
                    { 'mData': 'marca', sDefaultContent: '' },
                    { 'mData': 'tipoCobertura', sDefaultContent: '' },
                    { 'mData': 'aseguradora', sDefaultContent: '', className: 'bold text-center' },
                    {
                        'defaultContent': '<td style="text-align: center;">\
                    <a class="verCotizacionAceptada cursor-pointer" data-toggle="modal">\
                        <i class="fa fa-search"></i>\
                    </a>\
                    </td>'
                    }
                ],

                columnDefs: [
                    { className: "text-center", "targets": "_all" }
                ]
            });

            $('#tablaCotizacionesAceptadas tbody').on('click', '.verCotizacionAceptada', function () {
                var data = $('#tablaCotizacionesAceptadas').DataTable().row($(this).parents('tr')).data();
                console.log(data);

                self.cotizacionAceptada = data;

                $('.activarCotizacionAceptadaModal').click();
                //self.consultarCotizacionService(data.id);
            });
        };


        $('.financiadora.collapse-link').on('click', function () {

            var $BOX_PANEL = $(this).closest('.x_panel'),
                $ICON = $(this).find('i'),
                $BOX_CONTENT = $BOX_PANEL.find('.x_content');

            // fix for some div with hardcoded fix class
            if ($BOX_PANEL.attr('style')) {
                $BOX_CONTENT.slideToggle(200, function () {
                    $BOX_PANEL.removeAttr('style');
                });
            } else {
                $BOX_CONTENT.slideToggle(200);
                $BOX_PANEL.css('height', 'auto');
            }

            $ICON.toggleClass('fa-chevron-up fa-chevron-down');
        });

        this.descartarSeleccionadas = function () {
            var indexes = [];
            for (var i = 0; i < self.cotizacionesPorEnviar.length; i++) {
                indexes.push(self.cotizacionesPorEnviar[i].id);
            };
            console.log(indexes);
            self.descartarCotizacionesSeleccionadasService(indexes);
        }

        this.descartarCotizacionesSeleccionadasService = function (indexes) {
            var params = {
                rifEmpresa: mainServices.getRifEmpresa(),
                ids: indexes
            };
            console.log('clean');
            cotizacionesServices.descartarCotizacionesSeleccionadas(params)
                .success(function (data) {
                    console.log('success on descartarCotizaciones Services');
                    console.log(data);
                    self.cancelFile('Cotizaciones');
                    new PNotify({
                        title: '¡Cotizaciones descartadas!',
                        text: 'Cotizaciones descartadas con éxito.',
                        type: 'success',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                    self.viewsController('listarCotizaciones');
                })
                .error(function (data, status, headers, config) {
                    console.log('on error..');
                    console.log(data);
                    new PNotify({
                        title: '¡Error!',
                        text: 'Hubo un error al momento de descartar las cotizaciones.',
                        type: 'error',
                        styling: 'bootstrap3',
                        cornerclass: 'ui-pnotify-sharp'
                    });
                });
        };

    }]);

    cotizacionesController.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

})();
