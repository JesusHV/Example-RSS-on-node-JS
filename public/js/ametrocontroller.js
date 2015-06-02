angular.module('ametroController', ['angularMoment'])
	.controller('reportesController', function ($scope, $filter, services) {
		$scope.reports = {};
		$scope.details = false;
		$scope.$root.active = 'link-1';
		$scope.$root.loaderGeneral = true;
		$scope.$root.usuario = window.sessionStorage.usuario;
		services.getReports()
			.success(function (res) {
				if(res.success && res.reportes) {
					$scope.$root.loaderGeneral = false;
					$scope.reports = $filter('orderBy')(res.reportes, 'date', true);
				}
			})
			.error(function (err) {
				console.log(err);
			})

		$scope.info = function (id, index) {
			if($scope.reports[index].open) {
				$scope.reports[index].open = false;
				return false;
			}else if($scope.reports[index].details) {
				$scope.reports[index].open = true;
				return false;
			}
			console.log(id);
			$scope.reports[index].open = true;
			services.getDetails(id)
				.success(function (data) {
					console.log(data)
					$scope.reports[index].details = data;
				})
				.error(function (err) {
					console.log(err);
				})
		}
	})
	.controller('nuevoReporteController', function ($scope, $filter, $timeout, services) {
		$scope.lineas = {};
		$scope.estaciones = [];
		$scope.showLine = false;
		$scope.$root.active = 'link-2';
		$scope.$root.loaderGeneral = true;
		$scope.$root.usuario = window.sessionStorage.usuario;

		$scope.getLineas = function () {
			services.getLines()
				.success(function (res) {
					if(res.success) {
						$scope.$root.loaderGeneral = false;
						$scope.lineas = $filter('orderBy')(res.lineas, 'orden');
					}
					else return;
				})
				.error(function (err) {
					return;
				})
		}

		$scope.chooseLine = function (a) {
			var elemnt = document.querySelector('.linea-'+a);
			elemnt.className = elemnt.className + " zoomLine";
			$scope.divdisabled = true;
			$timeout(function(){
				window.location = '#/newreport/'+a;
			}, 2000);

		}

	})
	.controller('nuevoReporteLineaController', function ($scope, $filter, $timeout, $routeParams, services) {
		$scope.linea = $routeParams.line;
		$scope.newreport = {};
		$scope.estaciones = [];
		$scope.estacion = '';
		$scope.hideEstation = false;
		$scope.hideElement = false;
		$scope.showLine = false;
		$scope.showForm = false;
		$scope.$root.active = 'link-2';
		$scope.$root.loaderGeneral = true;
		$scope.$root.usuario = window.sessionStorage.usuario;

		services.getLineInfo($scope.linea)
			.success(function (res) {
				$scope.$root.loaderGeneral = false;
				$scope.estaciones = res.linea[0].estaciones;
			})
			.error(function (err) {
				console.log(err)
			})

		/*$scope.selectEstation = function (id, estacion) {
			if($scope.hideElement) return false;
			var elemnt = document.querySelector('.estacion-'+id);
			var parentDiv = document.getElementById('newReport');
			parentDiv.scrollTop = 0;
			$scope.hideEstation = true;
			window.sessionStorage.setItem('estacion', estacion);
			$timeout(function(){
				elemnt.className = elemnt.className + " estacion-activa";
				$scope.hideEstation = false;
				$scope.hideElement = true;
				$scope.showForm = true;
				$scope.estacion = window.sessionStorage.estacion;
				console.log($scope.estacion)
			}, 500)
		}*/
		$scope.selectEstation = function (id, estacion) {
			$scope.hideEstation = true;
			$timeout(function(){
				$scope.hideEstation = false;
				$scope.hideElement = true;
				window.location = '#/newreport/'+$scope.linea+'/'+id;
			}, 500)
		}

	})
	.controller('nuevoReporteEstacionController', function ($scope, $filter, $timeout, $routeParams, services) {
		$scope.linea = $routeParams.line;
		$scope.estacionId = $routeParams.estation;
		$scope.showForm = false;
		$scope.$root.active = 'link-2';
		$scope.$root.loaderGeneral = true;

		services.getEstation($scope.linea, $scope.estacionId)
			.success(function (res) {
				$scope.$root.loaderGeneral = false;
				$scope.showForm = false;
				$scope.estacion = res.estacion.estacion;
				$scope.logo = res.estacion.imagen;
			}).error(function (err) {
				console.log(err)
			})

		services.getUser()
			.success(function (res) {
				$scope.usuario = res.usuario;
			})
			.error(function (err) {
				console.log(err)
			})

	})
	.constant('angularMomentConfig', {
	    locale : 'ES'
	})