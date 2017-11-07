(function(){

  'use strict';

  var authorizationServices = angular.module('DGBOSS.authorizationServices', []);

  authorizationServices.service('authService', [function(){

    var self = this;

    this.token = undefined;

    this.getToken = function(){
      return self.token;
    };

    this.saveToken = function(token){
      self.token = token;
      console.log(self.token);
    };

    this.removeToken = function(){
      self.token = undefined;
    };

  }]);

})();
