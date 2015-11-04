// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
})

.controller('MyController', ['$rootScope', '$scope', '$cordovaInAppBrowser', '$timeout', function($rootScope, $scope, $cordovaInAppBrowser, $timeout){
  var win, cleanOnLoadstop;

  $scope.name = 'Akka';

  var semilla = 'n7UXVh8fHx84TXC8GtJQMP0K0lOU7RMYGtbRaFxlpmJUFqyyyjVsGY9dJWipeQli2g==';


  $scope.openInappBrowser = function() {
    console.log('test button');
    if (!win) {
      win = $cordovaInAppBrowser.open('http://akkavoskuil.github.io/testInAppBrowser/www/', '_blank');
    }

    cleanOnLoadstop = $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
      // insert Javascript via code / file
      $cordovaInAppBrowser.executeScript({
        code: 'addData("'+semilla+'")'
      });

      $cordovaInAppBrowser.executeScript({
        code: "localStorage.setItem( 'semilla', '' );"
      });

      var semillaNueva;
      var callBack = function(data) {
        alert('callback');
        alert(data);
        console.log(data);
      }
      
      $cordovaInAppBrowser.executeScript(
        {code: "getData()"}, callBack
      );
    });

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
      win = undefined; 
      cleanOnLoadstop();
    });

  }

}])
