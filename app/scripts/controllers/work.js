'use strict';

angular.module('dmbaughmancomApp')
.controller('WorkCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'data/work.json',
  }).success(function(data) {
    $scope.projects = data.projects;
  }).error(function(data, status){
    console.log(data, status);
  });
});