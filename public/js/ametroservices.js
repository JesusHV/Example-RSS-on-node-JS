angular.module('ametroServices', [])
	.factory('services', function ($http) {
		var url = '.';
		// var url = 'http://ametro.herokuapp.com';
		return {
			login : function (data) {
				return $http.post(url+'/ametro/login', data);
			},
			register : function (data) {
				return $http.post(url+'/ametro/user', data);
			},
			getReports : function () {
				return $http.get(url+'/ametro/reporte/general/lite');
			},
			getDetails : function (id) {
				return $http.get(url+'/ametro/reporte/general/'+id);
			},
			getLines : function () {
				return $http.get(url+'/ametro/lineas');
			},
			getLineInfo : function (id) {
				return $http.get(url+'/ametro/linea/'+id);
			},
			getEstation : function (line, id) {
				return $http.get(url+'/ametro/linea/'+line+'/'+id);
			},
			getUser : function () {
				return $http.get(url+'/ametro/user/profile');
			}
		}
	})