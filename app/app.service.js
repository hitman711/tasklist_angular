/* 
List of services available to perform API opetation 

getData
postData
putData
deleteData
*/

(function(angular){

	"use strict";

	function serviceApi($http, $q, $state, $window){

		var headers = {};

		this.getData = function(url, with_token){
			var token = $window.localStorage.getItem('token');
			if (with_token) {
				headers = {
					"Authorization": "Token "+token
				}
			}
			return $http({
				method:'GET',
				url: url,
				headers: headers
			})
		};

		this.postData = function(url, data, with_token){
			var token = $window.localStorage.getItem('token');
			if (with_token) {
				headers = {
					"Authorization": "Token "+token
				}
			}
			return $http({
				method: 'POST',
				url:url,
				data: data,
				headers: headers
			})
		};

		this.putData = function(url, data, with_token){
			var token = $window.localStorage.getItem('token');
			if (with_token) {
				headers = {
					"Authorization": "Token "+token
				}
			}
			return $http({
				method: 'PUT',
				url:url,
				data: data,
				headers: headers
			})	
		};

		this.deleteData = function(url, with_token){
			var token = $window.localStorage.getItem('token');
			if (with_token) {
				headers = {
					"Authorization": "Token "+token
				}
			}
			return $http({
				method: 'DELETE',
				url:url,
				headers: headers
			})
		};
	};

	angular.module('origin').service('serviceApi',['$http', '$q', '$state', '$window', serviceApi]);

})(window.angular);