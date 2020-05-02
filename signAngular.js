var app = angular.module('ng_index', []);
app.controller('ng_index_ctrl', function($scope, $http) {
	
	$scope.loginadd = function loginadd()
	{
		let login = document.getElementById("logintextbox").value;
		let password = document.getElementById("passwordtextbox").value;
		$http.get("http://localhost:8888?func="+"Login_check"+"&"+"login="+login+"&"+"password="+password)
		.then(function(response) 
			{
				if(response.data=="true")
				{
					setCookie("login",login,365);
					setCookie("password",password,365);
					location.reload(true);
				}
				else
				alert("Неверный логин или пароль");
			});
	}
	
	document.getElementById("logged").style.visibility = "hidden";
	if(getCookie("login")!= null)
	$http.get("http://localhost:8888?func="+"Login_check"+"&"+"login="+getCookie("login")+"&"+"password="+getCookie("password"))
	.then(function(response) {
		if (response.data == "true"){
			document.getElementById("logged").style.visibility = "visible";
			document.getElementById("loginform").style.visibility = "hidden";
			document.getElementById("tmp_login").innerHTML+="Вы вошли как "+getCookie("login");
		}
	});
	
$http.get("http://localhost:8888"+window.location.search)
	.then(function(response){
		$scope.SignData = response.data;
	});
	
});