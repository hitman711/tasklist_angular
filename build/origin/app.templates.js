angular.module('origin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/task/task.html',
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h4>Task List</h4>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <p class=\"text-right\">\n" +
    "        Hello {{vm.full_name}},\n" +
    "        <button class=\"btn btn-sm btn-danger\" ng-click=\"vm.SignOut()\">Sign Out</button>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs form-group\">\n" +
    "            <select class=\"form-control text-left\" ng-model=\"vm.limit\" ng-change=\"vm.TaskList()\">\n" +
    "              <option value=\"10\">10</option>\n" +
    "              <option value=\"20\">20</option>\n" +
    "              <option value=\"50\">50</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          <div class=\"col-sm\">\n" +
    "            <p class=\"text-right\">\n" +
    "              Total record found:-{{vm.task_list.count}}\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"col-sm text-right\">\n" +
    "            <button class=\"btn btn-danger btn-xs\" ng-click=\"vm.Reset()\">\n" +
    "                Reset\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-primary btn-xs\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" ng-click=\"vm.task_create_view()\">\n" +
    "                Add\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-info btn-xs\" ng-click=\"vm.MyTask()\">My Task</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <div class=\"table-responsive\">\n" +
    "        <table id=\"mytable\" class=\"table table-bordred table-striped\">\n" +
    "          <thead>\n" +
    "            <tr>\n" +
    "              <td>Id</td>\n" +
    "              <td>Task Name</td>\n" +
    "              <td>Created By</td>\n" +
    "              <td>Status</td>\n" +
    "              <td>Action</td>\n" +
    "            </tr>\n" +
    "          </thead>\n" +
    "            <tr class=\"form-group\">\n" +
    "              <td>\n" +
    "                <form ng-submit=\"vm.TaskSearch()\">\n" +
    "                <input type=\"number\" class=\"form-control\" type=\"text\" placeholder=\"Task id\" ng-model=\"vm.search.id\">\n" +
    "                </form>\n" +
    "              </td>\n" +
    "              <td>\n" +
    "                <form ng-submit=\"vm.TaskSearch()\">\n" +
    "                <input type=\"text\" class=\"form-control\" type=\"text\" placeholder=\"Task Name\" ng-model=\"vm.search.name\">\n" +
    "                </form>\n" +
    "              </td>\n" +
    "              <td></td>\n" +
    "              <td>\n" +
    "                <select class=\"form-control\" ng-model=\"vm.search.task_status\" ng-change=\"vm.TaskSearch()\">\n" +
    "                  <option value=\"Done\">Done</option>\n" +
    "                  <option value=\"Undone\">Undone</option>\n" +
    "                </select>\n" +
    "              </td>\n" +
    "              <td></td>\n" +
    "            </tr>\n" +
    "\n" +
    "            <tr ng-repeat=\"task in vm.task_list.results\">\n" +
    "              <td>{{task.id}}</td>\n" +
    "              <td>{{task.name}}</td>\n" +
    "              <td>{{task.user.get_full_name}}</td>\n" +
    "              <td>{{task.task_status}}</td>\n" +
    "              <td>\n" +
    "                <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Edit\" class=\"d-inline-block\">\n" +
    "                  <button ng-if=\"task.user.email == vm.email\" class=\"btn btn-primary btn-xs\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" ng-click=\"vm.TaskRetrive(task.id)\"> Edit\n" +
    "                  </button>\n" +
    "                  <button ng-if=\"task.user.email != vm.email\" class=\"btn btn-info btn-xs\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" ng-click=\"vm.TaskRetrive(task.id)\"> View\n" +
    "                  </button>\n" +
    "                </p>\n" +
    "                <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"Delete\" class=\"d-inline-block\" ng-if=\"task.user.email == vm.email\">\n" +
    "                  <button class=\"btn btn-danger btn-xs\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ng-click=\"vm.TaskRetrive(task.id)\"> Delete\n" +
    "                  </button>\n" +
    "                </p>\n" +
    "                <p data-placement=\"top\" data-toggle=\"tooltip\" title=\"History\" class=\"d-inline-block\">\n" +
    "                  <button class=\"btn btn-info btn-xs\" data-title=\"History\" data-toggle=\"modal\" data-target=\"#history\" ng-click=\"vm.TaskRetrive(task.id)\">\n" +
    "                      History\n" +
    "                  </button>\n" +
    "                </p>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "      </table>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "      <nav aria-label=\"Page navigation example\">\n" +
    "        <ul class=\"pagination\">\n" +
    "          <li class=\"page-item\" ng-if=\"vm.task_list.previous\">\n" +
    "              <button class=\"btn btn-default page-link\" ng-click=\"vm.NewData(vm.task_list.previous)\">Previous</button>\n" +
    "          </li>\n" +
    "          <li class=\"page-item\" ng-if=\"vm.task_list.next\">\n" +
    "              <button class=\"btn btn-default page-link\" ng-click=\"vm.NewData(vm.task_list.next)\">Next</button>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </nav>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"modal fade\" id=\"edit\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <h4 ng-if=\"vm.create\" class=\"modal-title\">Create New Task</h4>\n" +
    "        <h4 ng-if=\"!vm.create\" class=\"modal-title\">Edit Task Detail</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "        <div class=\"form-group\">\n" +
    "          <input class=\"form-control \" type=\"text\" placeholder=\"Task Name\" ng-model=\"vm.task_retrieve.name\" ng-disabled=\"vm.task_retrieve.user.email != vm.email\">\n" +
    "          <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.task_retrieve_error.name}}</small>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <textarea rows=\"2\" class=\"form-control\" placeholder=\"Description\" ng-model=\"vm.task_retrieve.description\" ng-disabled=\"vm.task_retrieve.user.email != vm.email\"></textarea>\n" +
    "          <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.task_retrieve_error.description}}</small>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <select class=\"form-control\" ng-model=\"vm.task_retrieve.task_status\" ng-disabled=\"vm.task_retrieve.user.email != vm.email\">\n" +
    "            <option value=\"Done\">Done</option>\n" +
    "            <option value=\"Undone\">Undone</option>\n" +
    "          </select>\n" +
    "          <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.task_retrieve_error.task_status}}</small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button ng-if=\"!vm.create && vm.task_retrieve.user.email == vm.email\" type=\"button\" class=\"btn btn-warning btn-lg\" style=\"width: 100%;\" ng-click=\"vm.TaskEdit(vm.task_retrieve.id, 'edit')\">\n" +
    "          <span class=\"glyphicon glyphicon-ok-sign\"></span>\n" +
    "            Update\n" +
    "        </button>\n" +
    "\n" +
    "        <button ng-if=\"vm.create\" type=\"button\" class=\"btn btn-success btn-lg\" style=\"width: 100%;\" ng-click=\"vm.TaskCreate('edit')\">\n" +
    "            Create\n" +
    "        </button>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /.modal-content --> \n" +
    "  </div>\n" +
    "    <!-- /.modal-dialog --> \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal fade\" id=\"delete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n" +
    "          <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n" +
    "        </button>\n" +
    "        <h4 class=\"modal-title\">Delete this entry</h4>\n" +
    "      </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "       \n" +
    "      <div class=\"alert alert-danger\">\n" +
    "        <span class=\"glyphicon glyphicon-warning-sign\"></span> \n" +
    "        Are you sure you want to delete this Record?\n" +
    "      </div>   \n" +
    "    </div>\n" +
    "    <div class=\"modal-footer \">\n" +
    "      <button type=\"button\" class=\"btn btn-success\" ng-click=\"vm.TaskDelete(vm.task_retrieve.id, 'delete')\" ><span class=\"glyphicon glyphicon-ok-sign\"></span> Yes</button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"><span class=\"glyphicon glyphicon-remove\"></span> No</button>\n" +
    "    </div>\n" +
    "   </div>\n" +
    "    <!-- /.modal-content --> \n" +
    "  </div>\n" +
    "      <!-- /.modal-dialog --> \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal fade bd-example-modal-lg\" id=\"history\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"edit\" aria-hidden=\"true\">\n" +
    "  <div class=\"modal-dialog modal-lg\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <h4 class=\"modal-title\">{{vm.task_retrieve.name}} History detail</h4>\n" +
    "      </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "       <table class=\"table\">\n" +
    "         <thead>\n" +
    "           <tr>\n" +
    "              <td>Action</td>\n" +
    "              <td>timestamp</td>\n" +
    "              <td>changes</td>\n" +
    "           </tr>\n" +
    "         </thead>\n" +
    "         <tbody>\n" +
    "           <tr ng-repeat=\"history in vm.task_retrieve.history\">\n" +
    "              <td>{{history.action}}</td>\n" +
    "              <td>{{history.timestamp}}</td>\n" +
    "              <td>{{history.changes | history_changes }}</td>\n" +
    "           </tr>\n" +
    "         </tbody>\n" +
    "       </table>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer \">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "    </div>\n" +
    "   </div>\n" +
    "    <!-- /.modal-content --> \n" +
    "  </div>\n" +
    "      <!-- /.modal-dialog --> \n" +
    "</div>\n"
  );


  $templateCache.put('app/user/login.html',
    "\n" +
    "<div class=\"form-center\">\n" +
    "	<form class=\"form-signin\" ng-submit=\"vm.signIn()\">\n" +
    "	  <h1 class=\"h3 mb-3 font-weight-normal\">Please sign in</h1>\n" +
    "	  <label for=\"username\" class=\"sr-only\">Username</label>\n" +
    "	  <input type=\"text\" id=\"username\" class=\"form-control\" placeholder=\"username\" required=\"\" autofocus=\"\" ng-model=\"vm.sign_in.username\">\n" +
    "	  <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_in_error.username}}</small>\n" +
    "	  <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n" +
    "	  <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\" ng-model=\"vm.sign_in.password\">\n" +
    "	  <small small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_in_error.password}}</small>\n" +
    "	  <div class=\"checkbox mb-3\">\n" +
    "	  </div>\n" +
    "	  <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n" +
    "	</form>\n" +
    "</div>\n" +
    "<h4 class=\"text-center\">\n" +
    "	<a ui-sref=\"signup\">Registration</a>\n" +
    "</h4>\n" +
    "	\n" +
    "  "
  );


  $templateCache.put('app/user/signup.html',
    "<div class=\"form-center\">\n" +
    "  <form class=\"form-signuo\" ng-submit=\"vm.registration()\">\n" +
    "    <h1 class=\"h3 mb-3 font-weight-normal\">Sign Up</h1>\n" +
    "    <label for=\"first_name\" class=\"sr-only\">First Name</label>\n" +
    "    <input type=\"text\" id=\"first_name\" class=\"form-control\" placeholder=\"First Name\" required=\"\" autofocus=\"\" ng-model=\"vm.sign_up.first_name\">\n" +
    "    <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_up_error.first_name}}</small>\n" +
    "    <label for=\"last_name\" class=\"sr-only\">Last Name</label>\n" +
    "    <input type=\"text\" id=\"last_name\" class=\"form-control\" placeholder=\"Last Name\" required=\"\" autofocus=\"\" ng-model=\"vm.sign_up.last_name\">\n" +
    "    <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_up_error.last_name}}</small>\n" +
    "    <label for=\"email\" class=\"sr-only\">Email Address</label>\n" +
    "    <input type=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Email Address\" required=\"\" autofocus=\"\" ng-model=\"vm.sign_up.email\">  \n" +
    "    <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_up_error.email}}</small>\n" +
    "    <label for=\"username\" class=\"sr-only\">Username</label>\n" +
    "    <input type=\"text\" id=\"username\" class=\"form-control\" placeholder=\"Username\" required=\"\" autofocus=\"\" ng-model=\"vm.sign_up.username\">\n" +
    "    <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_up_error.username}}</small>\n" +
    "    <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n" +
    "    <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required=\"\" ng-model=\"vm.sign_up.password\">\n" +
    "    <small ng-if=\"vm.field_error\" class=\"form-text text-muted\">{{vm.sign_up_error.password}}</small>\n" +
    "    <div class=\"checkbox mb-3\">\n" +
    "    </div>\n" +
    "    <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign Up</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<h4 class=\"text-center\">\n" +
    "  <a ui-sref=\"login\">Sign In</a>\n" +
    "</h4>\n" +
    "  "
  );

}]);
