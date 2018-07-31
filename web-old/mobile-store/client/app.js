var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'PhotosController',
		templateUrl: 'views/photos.html'
	})
	.when('/photos', {
		controller:'PhotosController',
		templateUrl: 'views/photos.html'
	})
	.when('/photos/details/:id',{
		controller:'PhotosController',
		templateUrl: 'views/photo_details.html'
	})
	.when('/videos', {
		controller:'PhotosController',
		templateUrl: 'views/videos.html'
	})
	.when('/videos/details/:id',{
		controller:'PhotosController',
		templateUrl: 'views/video_details.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});