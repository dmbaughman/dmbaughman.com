'use strict';

angular.module('dmbaughmancomApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
