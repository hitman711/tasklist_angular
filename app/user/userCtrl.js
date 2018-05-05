/* UserCtrl controller perform Create, Validate and Update operation on sign-in and registration API

*/
(function(angular){

	"use strict";

	function userCtrl($state, $window, $filter, toaster, DOMAIN, SIGNIN, REGISTRATION, serviceApi){
		/*
		sign_in : Login parameters
		sign_in_error : Login parameter error
		field_error : Boolean field to display error msg on front end
		sign_up : Registration parameter
		sign_up_error : Registration parameter error
		*/
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

		/* Function to check user details and generate token via sign-in API */
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

		/* Function to perform user create operation */
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