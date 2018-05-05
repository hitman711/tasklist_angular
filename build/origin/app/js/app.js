!function(t){"use strict";window.angular.module("origin",["ui.router","ui.router.state.events","ui.bootstrap","toaster","ngAnimate"])}(),function(e){"use strict";e.module("origin").filter("history_changes",function(){return function(t){t=JSON.parse(t);var r="";return e.forEach(t,function(t,e){r=e+" -> From :"+t[0]+" To:"+t[1]}),r}})}(window.angular),function(t){"use strict";window.angular.module("origin").config(["$stateProvider","$urlRouterProvider","$httpProvider","$locationProvider","$provide",function(t,e,r,n,a){n.html5Mode({enabled:!0,requireBase:!1}),r.defaults.xsrfCookieName="csrftoken",r.defaults.xsrfHeaderName="X-CSRFToken",e.when("","/"),e.otherwise("/404"),t.state("login",{url:"/",templateUrl:"app/user/login.html",controller:"userCtrl",controllerAs:"vm"}).state("signup",{url:"/signup",templateUrl:"app/user/signup.html",controller:"userCtrl",controllerAs:"vm"}).state("task-list",{url:"/task",templateUrl:"app/task/task.html",controller:"taskCtrl",controllerAs:"vm"}).state("404",{url:"/404",templateUrl:"app/404.html"})}])}(),function(t){"use strict";window.angular.module("origin").service("serviceApi",["$http","$q","$state","$window",function(a,t,e,o){var i={};this.getData=function(t,e){var r=o.localStorage.getItem("token");return e&&(i={Authorization:"Token "+r}),a({method:"GET",url:t,headers:i})},this.postData=function(t,e,r){var n=o.localStorage.getItem("token");return r&&(i={Authorization:"Token "+n}),a({method:"POST",url:t,data:e,headers:i})},this.putData=function(t,e,r){var n=o.localStorage.getItem("token");return r&&(i={Authorization:"Token "+n}),a({method:"PUT",url:t,data:e,headers:i})},this.deleteData=function(t,e){var r=o.localStorage.getItem("token");return e&&(i={Authorization:"Token "+r}),a({method:"DELETE",url:t,headers:i})}}])}(),function(t){"use strict";window.angular.module("origin").run(["$state","$rootScope","$window","$location",function(r,t,n,e){var a=["task-list"],o=["login","signup"];t.$on("$stateChangeStart",function(t,e){n.localStorage.getItem("token")?-1==a.indexOf(e.name)&&(t.preventDefault(),r.transitionTo("task-list")):-1==o.indexOf(e.name)&&(t.preventDefault(),r.transitionTo("login"))})}])}(),function(t){"use strict";window.angular.module("origin").constant("DOMAIN","http://127.0.0.1:8000/").constant("SIGNIN","sign-in/").constant("REGISTRATION","registration/").constant("TASK_LIST","task/list/").constant("TASK_RETRIEVE","task/{task_id}/")}(),function(u){"use strict";u.module("origin").controller("userCtrl",["$state","$window","$filter","toaster","DOMAIN","SIGNIN","REGISTRATION","serviceApi",function(e,r,t,n,a,o,i,s){var l=this;l.sign_in={username:"",password:""},l.sign_in_error={username:"",password:""},l.field_error=!1,l.sign_up={first_name:"",last_name:"",password:"",username:"",email:""},l.sign_up_error={first_name:"",last_name:"",password:"",username:"",email:""},l.signIn=function(){l.field_error=!1,s.postData(a+o,l.sign_in,!1).then(function(t){r.localStorage.setItem("token",t.data.token),r.localStorage.setItem("email",t.data.email),r.localStorage.setItem("full_name",t.data.full_name),e.transitionTo("task-list")},function(t){var e=t.data;"non_field_errors"in e?n.pop("error",e.non_field_errors[0]):u.forEach(e,function(t,e){l.field_error=!0,l.sign_in_error[e]=t[0]})})},l.registration=function(){s.postData(a+i,l.sign_up,!1).then(function(t){e.transitionTo("login")},function(t){var e=t.data;"non_field_errors"in e?n.pop("error",e.non_field_errors[0]):u.forEach(e,function(t,e){l.field_error=!0,l.sign_up_error[e]=t[0]})})}}])}(window.angular),function(u){"use strict";u.module("origin").controller("taskCtrl",["$state","$window","$filter","toaster","DOMAIN","TASK_LIST","TASK_RETRIEVE","serviceApi",function(t,e,r,n,a,o,i,s){var l=this;l.task_list=[],l.task_retrieve={},l.task_retrieve_error={name:"",description:"",task_status:""},l.field_error=!1,l.create=!0,l.search={},l.search_url="",l.limit="10",l.email=e.localStorage.getItem("email"),l.full_name=e.localStorage.getItem("full_name"),l.TaskList=function(){s.getData(a+o+"?limit="+l.limit,!0).then(function(t){l.task_list=t.data},function(t){})},l.TaskList(),l.Reset=function(){l.search={},l.TaskList()},l.TaskSearch=function(){var t=a+o+"?&";l.search.task_status&&(t=t+"task_status="+encodeURIComponent(l.search.task_status)+"&"),l.search.name&&(t=t+"name__icontains="+encodeURIComponent(l.search.name)+"&"),l.search.id&&(t=t+"id__in="+encodeURIComponent(l.search.id)),l.search_url=t,s.getData(t,!0).then(function(t){l.task_list=t.data},function(t){})},l.MyTask=function(t){t=a+o,l.search_url?t=l.search_url:t+="?",t=t+"&user__email="+l.email,s.getData(t,!0).then(function(t){l.task_list=t.data},function(t){})},l.NewData=function(t){var e=a+o;l.search_url?e=l.search_url:e+="?",e=e+"&"+(t=t.split("?"))[1],s.getData(e,!0).then(function(t){l.task_list=t.data},function(t){})},l.task_create_view=function(){l.field_error=!1,l.create=!0,l.task_retrieve={}},l.TaskCreate=function(e){l.field_error=!1,s.postData(a+o,l.task_retrieve,!0).then(function(t){$("#"+e).modal("hide"),l.TaskList()},function(t){var e=t.data;"non_field_errors"in e?n.pop("error",e.non_field_errors[0]):u.forEach(e,function(t,e){l.field_error=!0,l.task_retrieve_error[e]=t[0]})})},l.TaskRetrive=function(t){l.create=!1;var e=i.replace("{task_id}",t.toString());s.getData(a+e,!0).then(function(t){l.task_retrieve=t.data},function(t){})},l.TaskEdit=function(t,e){l.field_error=!1;var r=i.replace("{task_id}",t.toString());s.putData(a+r,l.task_retrieve,!0).then(function(t){$("#"+e).modal("hide"),l.TaskList()},function(t){var e=t.data;"non_field_errors"in e?n.pop("error",e.non_field_errors[0]):u.forEach(e,function(t,e){l.field_error=!0,l.task_retrieve_error[e]=t[0]})})},l.TaskDelete=function(t,e){var r=i.replace("{task_id}",t.toString());s.deleteData(a+r,!0).then(function(t){$("#"+e).modal("hide"),l.TaskList()},function(t){})},l.TaskStatus=function(t){var e=i.replace("{task_id}",t.toString());s.patchData(a+e,l.task_status,!0).then(function(t){l.TaskList()},function(t){})},l.SignOut=function(){e.localStorage.clear(),t.transitionTo("login")}}])}(window.angular);