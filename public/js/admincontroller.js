angular.module('adminController', ['ngDragAndDrop'])
	.controller('adminController', function ($scope, services) {
		$scope.lineas = {};
		$scope.lineaInfo = {};
		$scope.newEstation = {};
		$scope.lineaActiva = false;

		services.getLines()
			.success(function (res) {
				if(res.success) {
					$scope.lineas = res.lineas;
				}
			})
			.error(function (err) {
				console.log(err)
			})

		$scope.selectLinea = function (n) {
			$scope.lineaActiva = true;
			services.getLineInfo(n)
				.success(function (res) {
					if(res.success) {
						$scope.lineaInfo = res.linea[0];
						console.log($scope.lineaInfo)
					}
				})
				.error(function (err) {
					console.log(err)
				})
		}

		$scope.addEstacion = function (estacion) {
			console.log(estacion.imagen)
			var img = estacion.imagen.replace(/data\:image\/(jpeg|png)\;base64\,/g, '')
			estacion.imagen = img;
			$scope.lineaInfo.estaciones.push(estacion);
			$scope.newEstation = {};
		}

		$scope.saveLine = function (line) {
			services.saveLine(line)
				.success(function (res) {
					console.log(res)
				})
				.error(function (err) {
					console.log(err)
				})
		}

		$scope.newLine = function () {
			$scope.lineaActiva = true;
			$scope.lineaNueva = true;
		}

		$scope.deleteLine = function (line) {
			console.log(line)
			if(confirm('Eliminar linea')){
				services.deleteLine(line.linea)
					.success(function (res) {

						if(res.success) {
							alert('Línea borrada');

						}
					})
					.error(function (err) {
						console.log(err)
					})
			}
		}

	})