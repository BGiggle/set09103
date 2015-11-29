app.controller("loginController", ["$scope", "dataService","$location", function ($scope, dataService, $location) {

	$scope.title = "Login"
	$scope.changeView = "Register"
	
	$scope.registering = false;
	
	$scope.loginModel = {
		email : "",
		password: ""
	}
	
	$scope.register = function(){
		$scope.registering = true;
		$scope.title = "Register"
	}

	$scope.login = function(){

		if($scope.title == "Login"){
			dataService.login($scope.loginModel.email, $scope.loginModel.password).$promise.then(function(s){
				if(s.isValid){
					globalParams.isLoggedIn = true;
					$location.path("/");
					console.log("logged in");	
				}else{
					$scope.failedLoginMessage = s.message
				}
					
				});
		}else{
			dataService.register($scope.loginModel.email, $scope.loginModel.password).$promise.then(function(s){
			if(s.isValid){
					globalParams.isLoggedIn = true;
					$location.path("/");
					console.log("logged in");	
				}else{
					$scope.failedLoginMessage = s.message
				}
			});
		}
		
	}
}
]);