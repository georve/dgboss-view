(function(){

  'use strict';

  var producersController = angular.module('DGBOSS.productoresController', []);

  producersController.controller('productoresController', ['$scope', '$rootScope', function($scope, $rootScope){

    var self = this;

    console.log('productoresController activated.');

    /********************************************************************************************
    **                                      V A R I A B L E S                                  **
    ********************************************************************************************/

    this.views = {
      agregarProductores: false,
  	  listarProductores: false,
      verProductores: false
    };

    this.acordeon = {
      datosGenerales: true,
      direccion: false
    };

    this.naturalJuridicoCheck = {
      natural: 'iradio_flat-green checked',
      juridico: 'iradio_flat-green'
    };

    this.formularioAgregarProductor = {
      tipoDePersona: 'natural',
      cedulaRIF: undefined,
      nombreCompleto: undefined,
      numeroCredencial: undefined,
      fechaCredencial: undefined,
      telefonoCelular: undefined,
      correoElectronico: undefined,
      direccionFiscal: undefined,
      telefonoFiscal: undefined,
      direccionHabitacion: undefined,
      telefonoHabitacion: undefined
    };

    this.verProductorModal = {
      tipoDePersona: undefined,
      cedulaRIF: undefined,
      nombreCompleto: undefined,
      numeroCredencial: undefined,
      fechaCredencial: undefined,
      telefonoCelular: undefined,
      correoElectronico: undefined,
      direccionFiscal: undefined,
      telefonoFiscal: undefined,
      direccionHabitacion: undefined,
      telefonoHabitacion: undefined
    };

    this.productores = [
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' },
      { tipoDePersona: 'natural', cedulaRIF: 12345678, nombreCompleto: 'Juan Figueira', numeroCredencial: 123, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal', telefonoFiscal: '0212-392-23-34', direccionHabitacion: 'dir habitacion', telefonoHabitacion: '0212-314-45-67' },
      { tipoDePersona: 'natural', cedulaRIF: 12345679, nombreCompleto: 'Jean Freitas', numeroCredencial: 456, fechaCredencial: '09-09-2013', telefonoCelular: '0426-8050283', correoElectronico: 'jean@gmail.com', direccionFiscal: 'dir fiscal1', telefonoFiscal: '0212-392-23-35', direccionHabitacion: 'dir habitacion1', telefonoHabitacion: '0212-314-45-68' },
      { tipoDePersona: 'juridico', cedulaRIF: 12345670, nombreCompleto: 'Joshua Guerra', numeroCredencial: 789, fechaCredencial: '10-10-2012', telefonoCelular: '0426-8050283', correoElectronico: 'juan@gmail.com', direccionFiscal: 'dir fiscal2', telefonoFiscal: '0212-392-23-36', direccionHabitacion: 'dir habitacion2', telefonoHabitacion: '0212-314-45-69' }
    ];

    /********************************************************************************************
    **                                      F U N C T I O N S                                  **
    ********************************************************************************************/

    this.setObjectElems = function(obj, option){
      angular.forEach(obj, function(value, key){
        obj[key] = option;
      });
    };

    /********************************************************************************************
    **                                       S E R V I C E S                                   **
    ********************************************************************************************/

    /********************************************************************************************
    **                                    C O N T R O L L E R S                                **
    ********************************************************************************************/

    this.viewsController = function(view){
      self.setObjectElems(self.views, false);
      switch(view){

        case 'agregarProductores':
          self.views.agregarProductores = true;
		  console.log('viewsController > agregarProductores');
          break;
        case 'listarProductores':
          self.views.listarProductores = true;
		  console.log('viewsController > listarProductores');
          break;
          case 'verProductores':
            self.views.listarProductores = true;
        console.log('viewsController > verProductores');
            break;
        default:
          break;
      }
    };

    this.naturalJuridicoSwitch = function(tipoDePersona){
      console.log('** on naturalJuridicoSwitch.. **');
      switch(tipoDePersona){
        case 'natural':
          self.naturalJuridicoCheck.natural = 'iradio_flat-green checked';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green';
          self.formularioAgregarProductor.tipoDePersona = 'natural';
          break;
        case 'juridico':
          self.naturalJuridicoCheck.natural = 'iradio_flat-green';
          self.naturalJuridicoCheck.juridico = 'iradio_flat-green checked';
          self.formularioAgregarProductor.tipoDePersona = 'juridico';
          break;
        default:
          break;
      }
    };

    this.guardarProductor = function(){
      var validatorResult = validator.checkAll($('#formularioDatosGeneralesAgregarProductor'));
      var datosGenerales  = $('#productoresAcordionDatosGenerales'),
          direccion       = $('#productoresAcordionDireccion');

      if(validatorResult){
        console.log('validator true');
        //call service to save the productor.
        // console.log(self.formularioAgregarProductor);
      }else{
        console.log('validator false');
        if(!datosGenerales.hasClass('in')){
          // direccion.collapse('hide');
          datosGenerales.collapse('show');
        }
      }
    };

    this.verProductor = function(productor){
      self.verProductorModal = productor;

      $('.verProductorModal').modal({
        show: 'true'
      });

    };

    /********************************************************************************************
    **                                   M I S C E L A N E O U S                               **
    ********************************************************************************************/
    $rootScope.$on('agregarProductores', function(){
      self.viewsController('agregarProductores');
    });

    $rootScope.$on('listarProductores', function(){
      self.viewsController('listarProductores');
      $('#tablaConsultarProductores').DataTable();
    });

    $('#formularioAgregarProductorCedulaRIF').on('blur', null, validator.checkField);
    $('#formularioAgregarProductorNombreCompleto').on('blur', null, validator.checkField);
    $('#formularioAgregarProductorNumeroCredencial').on('blur', null, validator.checkField);
    $('#formularioAgregarProductorFechaCredencial').on('blur', null, validator.checkField);
    $('#formularioAgregarProductorTelefonoCelular').on('blur', null, validator.checkField);
    $('#formularioAgregarProductorCorreoElectronico').on('blur', null, validator.checkField);

    this.cambiarFecha = function(){
      $('#formularioAgregarProductorFechaCredencial').closest('.item')
                                                     .removeClass('bad')
                                                     .find('.alert').remove();
    };

    //Falta iconos en acordion
    $('.collapse').on('show.bs.collapse', function() {
      console.log('on .collapse Jquery **');
      var id = $(this).attr('id');
      // console.log(id);
      // $('#'+id).closest('.panel-title').innerHTML =
      //   '<i class="fa fa-chevron-left pull-right"></i>';
      $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
      $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-menu-down"></i>');
    });
    $('.collapse').on('hide.bs.collapse', function() {
      var id = $(this).attr('id');
      // console.log(id);
      // $('a[href="#' + id + '"]').closest('.panel-title').innerHTML =
      //   '<i class="fa fa-chevron-left pull-right"></i>';
      $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-faq');
      $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-menu-left"></i>');
    });

    $('.productores.collapse-link').on('click', function() {

        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

  }]);

})();
