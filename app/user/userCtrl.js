(function(angular){

	"use strict";

	function userCtrl($state, $window, $filter, toaster, DOMAIN, SIGNIN, REGISTRATION, serviceApi){
		var vm = this;
		vm.sign_in = {
			'username':'',
			'password':''
		}

		vm.sign_in_error = {
			'username':'',
			'password':''
		}
		vm.field_error = false;

		vm.sign_up = {
			'first_name':'',
			'last_name':'',
			'password':'',
			'username':'',
			'email':''
		}

		vm.sign_up_error = {
			'first_name':'',
			'last_name':'',
			'password':'',
			'username':'',
			'email':''
		}

		vm.signIn = function(){
			vm.field_error = false;
			serviceApi.postData(DOMAIN + SIGNIN, vm.sign_in, false)
				.then(function(response){
					// Success handler
					$window.localStorage.setItem('token', response.data.token);
					$window.localStorage.setItem('email', response.data.email);
					$window.localStorage.setItem('full_name', response.data.full_name);
					$state.transitionTo('task-list');
				}, 
				function (response){
					// Error handler
					var data =response.data;
					if ("non_field_errors" in data) {
						toaster.pop("error", data["non_field_errors"][0]);
					}else{
						angular.forEach(data, function(value, key){
							vm.field_error = true;
							vm.sign_in_error[key] = value[0] 
						});
					}
				});
		}

		vm.registration = function(){
			serviceApi.postData(DOMAIN + REGISTRATION, vm.sign_up, false)
				.then(function(response){
					$state.transitionTo('login');
				},
				function (response){
					// Erro handler
					var data =response.data;
					if ("non_field_errors" in data) {
						toaster.pop("error", data["non_field_errors"][0]);
					}else{
						angular.forEach(data, function(value, key){
							vm.field_error = true;
							vm.sign_up_error[key] = value[0] 
						});
					}
				});
		}
	}

	angular.module('origin').controller(
		'userCtrl', ['$state', '$window', '$filter', 'toaster', 'DOMAIN', 'SIGNIN', 'REGISTRATION', 'serviceApi', userCtrl]);

})(window.angular);