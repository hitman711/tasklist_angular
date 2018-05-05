(function(angular){

	"use strict";

	angular.module('origin')
		.constant('DOMAIN', 'http://127.0.0.1:8000/')
		.constant('SIGNIN', 'sign-in/')
		.constant('REGISTRATION', 'registration/')
		.constant('TASK_LIST', 'task/list/')
		.constant('TASK_RETRIEVE', 'task/{task_id}/');

})(window.angular);