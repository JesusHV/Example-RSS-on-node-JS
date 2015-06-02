angular.module('ametroLogin', ['ametroServices', 'ngAnimate'])
	.config(function ($animateProvider) {
		$animateProvider.classNameFilter(/angular-animate/);
	})
	.controller('ametroLogin', function ($scope, $timeout, services) {
		$scope.app = {};
		$scope.app.title = 'ametro';
		$scope.loginData = {};
		$scope.loginError = '';
		$scope.registerError = '';
		$scope.showLogin = true;
		$scope.loader = false;
		$scope.successLoad = false;

		$scope.login = function (data) {
			$scope.loader = true;
			services.login(data)
				.success(function (res) {
					if(res.success) {
						$scope.loginError = '';
						$scope.successLoad = true;
						$timeout(function () {
							$scope.loader = false;
							$scope.successLoad = false;
							console.log(res)
							window.sessionStorage.setItem('usuario', res.usuario.email);
							window.location = "/app";
						}, 1000);
					}
				})
				.error(function (err) {
					$scope.loginError = err.message;
					$scope.loader = false;
				})
		}

		$scope.register = function (data) {
			$scope.loader = true;
			services.register(data)
				.success(function (res) {
					console.log(res);
					$scope.registerError = '';
					$scope.successLoad = true;
					$timeout(function () {
						$scope.loader = false;
						$scope.successLoad = false;
						alert('Usuario registrado!');
						$scope.loginData.email = res.message.email;
						$scope.showLogin = true;
					}, 1000);
				})
				.error(function (err) {
					$scope.registerError = err.message;
					$scope.loader = false;
				})
		}
	});