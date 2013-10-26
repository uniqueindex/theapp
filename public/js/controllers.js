'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
	.controller('HelloCtrl', ['$scope', function($scope){
		$scope.message = 'Hello!';
		$scope.widgets = [
			{'name': 'Toaster', 'desc': 'Makes it toasty'},
			{name: 'Huh', desc: "That's what I say!"},
			{'name': 'Faucet', 'desc': 'drip, drip....'}
		];
	}])
	.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.user = { username: "Luke Skywalker", password: "onlyhope" };
		$scope.submit = function() {
			
			$http({
			    method: 'POST',
			    url: '/login',
			    data: {username: $scope.user.username, password: $scope.user.password }
			}).success(function (data, status, headers, config) {
				console.log('Login Success');
				console.log(status);
				console.dir(data);
			}).error(function (data, status, headers, config) {
				console.log('Error')
			});
		}
	}])
	.controller('RegisterCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.user = {};
		$scope.submit = function() {
			
			$http({
			    method: 'POST',
			    url: '/register',
			    data: {username: $scope.user.username, password: $scope.user.password }
			}).success(function (data, status, headers, config) {
				console.log('Register Success');
				console.log(status);
				console.dir(data);
			}).error(function (data, status, headers, config) {
				console.log('Error')
			});
		}
	}]);