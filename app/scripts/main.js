'use strict';
var app = angular.module('app', ['ui.bootstrap', 'facebook','autocomplete']);

app.config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('747991285264118');
  })
  
  
.controller('LoginCtrl',  function($scope, $modal, $http, Facebook){
  $scope.user = {};
  $scope.pic = {};
  $scope.loggedIn =false;
  
  $scope.logout = function(){
    Facebook.logout(function(response) {
  // user is now logged out
      $scope.loggedIn = false;
    });
  };
  
    $scope.login = function() {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
          // Do something with response
          $http.post('/login', response);
            
            
         });
      };
  
  
  $scope.$watch(function() {
    // This is for convenience, to notify if Facebook is loaded and ready to go.
    return Facebook.isReady();
  }, function(newVal) {
    // You might want to use this to disable/show/hide buttons and else
    $scope.facebookReady = true;
     Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
              if ($scope.loggedIn !== true){
                $scope.loggedIn = true;
                Facebook.api('/me', function(response) {
                    $scope.user = response;
                    $http.post('/login', response);
                    console.log(response);
                });
                Facebook.api('/me/picture?height=100&type=square&width=100', function(response) {
                    $scope.pic= response;
                });
                
              }
            } else {
              $scope.loggedIn = false;
            }
          });
      });
});
  