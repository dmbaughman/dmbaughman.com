'use strict';

angular.module('dmbaughmancomApp')
.controller('WorkCtrl', function ($scope, $http) {
	$http({
		method: 'GET',
		url: 'data/work.json',
	}).success(function(data, status) {
		$scope.projects = data.projects;
		console.log(status);
	}).error(function(data, status){
		console.log(data, status);
	});
});