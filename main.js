var app = angular.module('app', ['ngRoute'])

app.controller('UsersList', UsersList)
app.controller('User', User)
app.controller('HeaderCtrl', HeaderCtrl)
app.factory('UsersService', UsersService)
app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		template: `
			<h1>Choose a user</h1>
		`,
	})
	.when('/users', {
		template: `
			<ul>
				<li ng-repeat="user in users">
					<a href="/users/{{user.id}}">{{user.name | uppercase}}</a>
				</li>
			</ul>
		`,
		controller: "UsersList",
	})
	.when('/users/:userId', {
		template: `
			<h1>{{title}}</h1>
			<p>{{user.name}}</p>
		`,
		controller: "User",
	})

	$locationProvider.html5Mode(true);
})
function UsersList($scope, $routeParams, UsersService) {
	$scope.title = 'Users List'
	$scope.params = $routeParams;

	$scope.users = UsersService.users;
}
function User($scope, $routeParams, UsersService) {
	$scope.params = $routeParams;
	$scope.user = UsersService.users.find(u => u.id == $routeParams.userId)
	$scope.title = `${$scope.user.name} page`;
}
function HeaderCtrl($scope, $routeParams, UsersService) {}

function UsersService() {
	return {
		users: [
			{name: "Azathoth", id: 1},
			{name: "Cthulhu", id: 2},
			{name: "Shub-Niggurath", id: 3},
		]
	}
}