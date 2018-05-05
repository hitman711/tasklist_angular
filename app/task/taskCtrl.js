/* TaskCtrl controller perform Read, Create, Update and Delete operation on task-list API

*/
(function(angular){

	"use strict";

	function taskCtrl($state, $window, $filter, toaster, DOMAIN, TASK_LIST, TASK_RETRIEVE, TASK_STATUS, serviceApi){
		/* 
		task_list : List of all tasks
		task_retrieve : Specific task object
		task_retrieve_error : Error to display on frontend based on field
		field_error : Boolean value which display error msg on frontend
		create : Boolean value which display Create button
		search : parameter on which user can perform search operation
		limit : Limit per page task list
		email : Logged in user email
		full_name : Logged in user full name
		*/

		var vm = this;
		vm.task_list = [];
		vm.task_retrieve = {};
		vm.task_retrieve_error = {
			'name':'',
			'description':'',
			'task_status':''
		}
		vm.field_error = false;
		vm.create = true;
		vm.search = {};
		vm.search_url = '';
		vm.limit = "10";
		vm.email = $window.localStorage.getItem('email');
		vm.full_name = $window.localStorage.getItem('full_name');
		vm.Done = 'Done'
		vm.Undone = 'Undone'

		/* Function to get  task list data */
		vm.TaskList = function(){
			serviceApi.getData(DOMAIN+TASK_LIST + '?limit='+vm.limit, true)
				.then(function(response){
					vm.task_list = response.data;
				},
				function(response){

				});
		}

		vm.TaskList();

		/* Function to clear search fields */
		vm.Reset = function(){
			vm.search = {};
			vm.TaskList();
		}

		/* Function to perform search operation on task list*/
		vm.TaskSearch = function(){
			var url = DOMAIN + TASK_LIST + '?&'
			if (vm.search.task_status) {
				url = url + 'task_status='+encodeURIComponent(vm.search.task_status)+'&';
			}
			if (vm.search.name) {
				url = url + 'name__icontains='+ encodeURIComponent(vm.search.name)+'&';
			}
			if (vm.search.id) {
				url = url + 'id__in='+ encodeURIComponent(vm.search.id);	
			}
			vm.search_url = url;
			serviceApi.getData(url, true)
				.then(function(response){
					vm.task_list = response.data;
				},
				function(response){

				});	
		}


		/* Function to filter logged in user task list*/
		vm.MyTask = function(url){
			var url = DOMAIN + TASK_LIST;
			if (vm.search_url) {
				url = vm.search_url;
			}else{
				url = url + '?'
			}
			url = url +'&user__email='+vm.email;
			serviceApi.getData(url, true)
				.then(function(response){
					vm.task_list = response.data;
				},
				function(response){

				});
		}

		/* Function to fetch next task-list page data*/
		vm.NewData = function(url){
			var next_url = DOMAIN + TASK_LIST;
			if (vm.search_url) {
				next_url = vm.search_url;
			}else{
				next_url = next_url + '?'
			}
			var url = url.split("?");
			next_url = next_url +'&'+ url[1];
			serviceApi.getData(next_url, true)
				.then(function(response){
					vm.task_list = response.data;
				},
				function(response){

				});
		}

		/* Function to open new task create modal */
		vm.task_create_view = function(){
			vm.field_error = false;
			vm.create = true;
			vm.task_retrieve = {};
		}

		/* Function to perform task create operation */
		vm.TaskCreate = function(obj){
			vm.field_error = false;
			serviceApi.postData(DOMAIN+TASK_LIST, vm.task_retrieve, true)
				.then(function(response){
					$('#'+obj).modal('hide');
					vm.TaskList();
				}, function(response){
					var data =response.data;
					if ("non_field_errors" in data) {
						toaster.pop("error", data["non_field_errors"][0]);
					}else{
						angular.forEach(data, function(value, key){
							vm.field_error = true;
							vm.task_retrieve_error[key] = value[0] 
						});
					}
				});
		}

		/* Function to retrieve specific task detail */
		vm.TaskRetrive = function(task_id){
			vm.create = false;
			var task_retrieve = TASK_RETRIEVE.replace('{task_id}', task_id.toString());
			serviceApi.getData(DOMAIN+task_retrieve, true)
				.then(function(response){
					vm.task_retrieve = response.data;
				}, function(response){

				});
		}

		/* Function to perform edit operation task detail */
		vm.TaskEdit = function(task_id, obj){
			vm.field_error = false;
			var task_retrieve = TASK_RETRIEVE.replace('{task_id}', task_id.toString());
			serviceApi.putData(DOMAIN+task_retrieve, vm.task_retrieve, true)
				.then(function(response){
					$('#'+obj).modal('hide');
					vm.TaskList();
				}, function(response){

					var data =response.data;
					if ("non_field_errors" in data) {
						toaster.pop("error", data["non_field_errors"][0]);
					}else{
						angular.forEach(data, function(value, key){
							vm.field_error = true;
							vm.task_retrieve_error[key] = value[0] 
						});
					}
				});
		}

		/* Function to perform delete task operation */
		vm.TaskDelete = function(task_id, obj){
			var task_retrieve = TASK_RETRIEVE.replace('{task_id}', task_id.toString());
			serviceApi.deleteData(DOMAIN+task_retrieve, true)
				.then(function(response){
					$('#'+obj).modal('hide');
					vm.TaskList();
				}, function(response){

				});
		}


		vm.TaskStatus = function(task_id, task_status){
			var task_retrieve = TASK_STATUS.replace('{task_id}', task_id.toString());
			var data = {
				'task_status': task_status
			}
			serviceApi.putData(DOMAIN+task_retrieve+'', data, true)
				.then(function(response){
					vm.TaskList();
				}, function(response){

				});
		}

		/* Function to logged out user from system and throw back to login page */
		vm.SignOut = function(){
			$window.localStorage.clear();
			$state.transitionTo('login');
		}
	}

	angular.module('origin').controller(
		'taskCtrl', ['$state', '$window', '$filter', 'toaster', 'DOMAIN', 'TASK_LIST', 'TASK_RETRIEVE', 'TASK_STATUS', 'serviceApi', taskCtrl]);

})(window.angular);