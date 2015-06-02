angular.module('ametroRoutes', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				redirectTo : '/reports'
			})
			.when('/reports', {
				templateUrl : '../views/pages/reports.html',
				controller : 'reportesController'
			})
			.when('/newreport', {
				templateUrl : '../views/pages/newreport.html',
				controller : 'nuevoReporteController'
			})
			.when('/newreport/:line', {
				templateUrl : '../views/pages/newreport.line.html',
				controller : 'nuevoReporteLineaController'
			})
			.when('/newreport/:line/:estation', {
				templateUrl : '../views/pages/newreport.line.estation.html',
				controller : 'nuevoReporteEstacionController'
			})
	})