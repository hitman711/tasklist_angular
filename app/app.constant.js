/* 
Constant list of parameter which used to perform operation in project

Currently we only store API in constant list

 */
(function(angular){

	"use strict";

	angular.module('origin')
		.constant('DOMAIN', 'http://13.125.242.62/')
		.constant('SIGNIN', 'sign-in/')
		.constant('REGISTRATION', 'registration/')
		.constant('TASK_LIST', 'task/list/')
		.constant('TASK_RETRIEVE', 'task/{task_id}/')
		.constant('TASK_STATUS', 'task/{task_id}/status/');

})(window.angular);