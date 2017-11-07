(function(){

  'use strict';

  var mainServices = angular.module('DGBOSS.mainServices', []);

  mainServices.service('mainServices', function(){

    //console.log(dgBossURL);

    var self = this;

    this.user = undefined;
    this.userRol = [];
    this.admin = 0;
    this.rifUser = undefined;
    this.rifEmpresa = undefined;
    this.dominio = undefined;
    this.roles = undefined;
    this.permisos = undefined;
    this.idMaster = 1; //undefined;
    this.idPais = 1; //undefined;
    this.aseguradoras = [];
    this.bancos = [];
	this.causas = [];
    this.marcasVehiculos = [];
    this.monedas = [];
    this.paises = [];
    this.ramos = [];
    this.tiposSiniestros = [];


    this.changePassData = {
        correo: undefined,
        codigo: undefined
    };

   // this.domain = undefined;
    //this.dgBossURL = undefined;

    //this.domain = 'http://dgfarmdv01.grupodgfarm.com';
    //this.domain='http://dgboss.net';
	//this.domain='localhost:8080';

	 this.setCausas=function(causas){
      self.causas = causas;
    }

    this.getCausas=function(){
      return self.causas;
    };

    this.setDomain=function(domain){
      self.domain = domain;
    }

    this.getDomain=function(){
      return self.domain;
    };

    this.setUser = function(user){
        self.user = user;
    };

    this.getUser = function(){
        return self.user;
    };

    this.setUserRol = function(rol){
        self.userRol = rol;
    };

    this.getUserRol = function(){
        return self.userRol;
    }

    this.setAdmin = function(value){
        self.admin = value;
    };

    this.isAdmin = function(){
        return self.admin;
    };

    this.setRifUser = function(rif){
        self.rifUser = rif;
    };

    this.getRifUser = function(){
        return self.rifUser;
    };

    this.setRifEmpresa = function(rif){
        self.rifEmpresa = rif;
    };

    this.getRifEmpresa = function(){
        return self.rifEmpresa;
    };

    this.setDominio = function(dominio){
        self.dominio = dominio;
    };

    this.getDominio = function(){
        return self.dominio;
    };

    this.setRoles = function(roles){
        self.roles = roles;
    };

    this.getRoles = function(){
        return self.roles;
    };

    this.setPermisos = function(permisos){
        self.permisos = permisos;
    };

    this.getPermisos = function(){
        return self.permisos;
    };

    this.getURL = function(){
        return self.dgBossURL;
    };

    this.setURL = function(){
        self.dgBossURL = 'http://'+self.getDomain() + '/dgboss-services/rest';
    };

    this.setIdPais = function(idPais){
        self.idPais = idPais;
    };

    this.getIdPais = function(){
        return self.idPais;
    };

    this.setIdMaster = function(idMaster){
        self.idMaster = idMaster;
    };

    this.getIdMaster = function(){
        return self.idMaster;
    };

    this.setAseguradoras = function(aseguradoras){
        self.aseguradoras = aseguradoras;
        console.log(self.aseguradoras);
    };

    this.getAseguradoras = function(){
        return self.aseguradoras;
    };

    this.setBancos = function(bancos){
        self.bancos = bancos;
        console.log(self.bancos);
    };

    this.getBancos = function(){
        return self.bancos;
    };

    this.setMarcasVehiculos = function(marcas){
        self.marcasVehiculos = marcas;
        console.log(self.marcasVehiculos);
    };

    this.getMarcasVehiculos = function(){
        return self.marcasVehiculos;
    };

    this.setMonedas = function(monedas){
        self.monedas = monedas;
        console.log(self.monedas);
    };

    this.getMonedas = function(){
        return self.monedas;
    };

    this.setPaises = function(paises){
        self.paises = paises;
        console.log(self.paises);
    };

    this.getPaises = function(){
        return self.paises;
    };

    this.setRamos = function(ramos){
        self.ramos = ramos;
        console.log(self.ramos);
    };

    this.getRamos = function(){
        return self.ramos;
    };

    this.setTiposSiniestros = function(tipos){
        self.tiposSiniestros = tipos;
        console.log(self.tiposSiniestros);
    };

    this.getTiposSiniestros = function(){
        return self.tiposSiniestros;
    };

    this.setChangePassData = function(obj){
        self.changePassData.correo = obj.email;
        self.changePassData.codigo = obj.codigo;
    };

    this.getChangePassData = function(){
        return self.changePassData;
    };

    this.revertDate = function(date){

        if(!date)
            return '';

        var thisDate = date.slice(0);
        var itemsArray = thisDate.split('-');
        console.log(itemsArray);
        var dateReverted = itemsArray[2] + '-' + itemsArray[1] + '-' + itemsArray[0];

        return dateReverted;
    };

    this.setCurrency = function(value){
     if(!value){
      return value;
        }else{  
       value = value.toString();      
        return value = parseFloat(value.replace(/,/g, ""))
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
        }    
    };

  });

})();
