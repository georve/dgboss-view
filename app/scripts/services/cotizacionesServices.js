(function(){

  'use strict';

  var cotizacionesServices = angular.module('DGBOSS.cotizacionesServices', []);

  cotizacionesServices.service('cotizacionesServices', ['$http', 'mainServices', function($http, mainServices){
    console.log('cotizacionesServices activated..')

    var self = this;

    self.url = mainServices.getURL();
    //console.log(dgBossURL);
    
    this.uploadFileToUrl = function(file, uploadUrl){
        console.log('onUploadFileToUrl..');
        var fd = new FormData();
        fd.append('file', file);

        console.log(self.url);

        $http.post(self.url + '/file/upload', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
    
        .success(function(data){
          console.log('Success..');
          console.log(data);
        })
    
        .error(function(){
          console.log('Error..');
        });
    };

    this.cargarAsegurados = function(file){
        console.log('onUploadFileToUrl..');
        var fd = new FormData();
        fd.append('file', file);
    
        return $http.post(self.url + '/file/upload', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
    };

    this.cargarCotizaciones = function(file){
        console.log('onUploadFileToUrl..');
        var fd = new FormData();
        fd.append('file', file);
    
        return $http.post(self.url + '/cotizacion/carga_archivo', fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
    };

    this.descartarCotizaciones = function(params){
        return $http({
            url: mainServices.getURL() + '/cotizacion/clean_cotizaciones',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                'rifEmpresa': params.rifEmpresa
            }
        });
    };

	this.descartarCotizacionesSeleccionadas = function(params){
        return $http({
            url: mainServices.getURL() + '/cotizacion/clean_cotizaciones_seleccionadas',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                'rifEmpresa': params.rifEmpresa,
				'ids':params.ids
            }
        });
    };
	
    this.consultarCotizaciones = function(params){
        console.log('params', params);
        return $http({
            url: mainServices.getURL() + '/cotizacion/consultar_cotizaciones',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
               'id': params.idCotizacion,
               'rifEmpresa': params.rifEmpresa
            }
          });

        //Cuando Busques Solo los Asegurados con Data del Vehiculo y Correo pasas id=""
//        { "anio": "2006.0", "archivo": null, "cedula": "E-0082225556", "correo": "domingorondon87@gmail.com", "id": "1.0",
//        	"marca": "AUDI","modelo": "A3","nombre": "CASTAGNINO DIEGO THOMAS","placa": "AA066WW",
//        	"tipo": "PARTICULAR","tipoCoberturas": null }
        
        //Cuando Busques al Asegurado con la lista de Cotizaciones , pasas id="String_Codigo"
//        { "anio": "2006.0", "archivo": null, "cedula": "E-0082225556", "correo": "domingorondon87@gmail.com", "id": "1.0", "marca": "AUDI", "modelo": "A3",
//        	"nombre": "CASTAGNINO DIEGO THOMAS", "placa": "AA066WW", "tipo": "PARTICULAR", "tipoCoberturas": [ { "apov24": "1504,5", "asistenciaViaje": "13637,65",
//        	"defensaPenal": null, "estatus": "NO_SELECCIONADA", "excesoLimite": "2107,37", "fisioPsicoODon": "null", "idCotizacion": "1.0", "idemDiaria": "2823,74",
//        	"idTipoCoberturaCotizacion": 1, "odo": "1334", "primaCasco": "931329", "primaTotal": "966803", "rcv22": "1150,5", "situacionCatastrofica": "12387",
//        	"sumaAseguradaCasco": "null", "sumaAseguradaPerdidaTotal": "null", "sumaAseguradaValorIMMA": "21558532,5", "tasa": "4,32", "tasa19": "4,8",
//        	"tipo": "COBERTURA AMPLIA CON DEDUCIBLE" }] }
        
        
      };

      this.consultarCotizacionesAceptadas = function(params){
        console.log('params', params);
        return $http({
            url: mainServices.getURL() + '/cotizacion/consultar_cotizaciones_seleccionadas_correo',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
               'estatus': params.estatus,
               'rifEmpresa': mainServices.getRifEmpresa()
            }
          }); 
      };

  }]);

  //cotizacionesServices.constant('dgBossURL', 'http://dgfarmdv01.grupodgfarm.com/dgboss-services/rest');
  //cotizacionesServices.constant('dgBossURL', 'http://dgfarmdv02:8080/dgboss-services/rest');

})();
