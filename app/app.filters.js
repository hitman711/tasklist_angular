/*List of filters used to perform data manipulation operation */
(function(angular){

	"use strict";

	angular.module('origin')
		.filter('history_changes', function(){
			return function(changes){
				var changes=  JSON.parse(changes);
				var string = '';
				angular.forEach(changes, function(value, key){
					string = key+" -> From :"+value[0]+" To:"+value[1];
				});
				return string;
				
			}
		});
})(window.angular);