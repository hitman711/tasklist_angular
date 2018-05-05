/* State change user validation operation*/
(function(angular){

	"use strict";

	function run($state, $rootScope, $window, $location){
		var token_state = ['task-list'];
		var non_token_state = ['login', 'signup'];

		$rootScope.$on('$stateChangeStart', function(event, next){
			var token = $window.localStorage.getItem('token');
			if (token) {
				if (token_state.indexOf(next.name)== -1) {
					event.preventDefault();
					$state.transitionTo('task-list');
				}
			}else{
				if (non_token_state.indexOf(next.name) == -1) {
					event.preventDefault();
					$state.transitionTo('login');
				}
			}
		})
	}

	angular.module('origin').run(['$state', '$rootScope', '$window', '$location', run]);

})(window.angular);