var app = angular.module('ng_registration', []);
app.controller('ng_registration_ctrl', function($scope, $http) {
	
	document.getElementById("alert").style.display = "none"; 
	
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
	$scope.registry = function registry(regdata)
	{				
		$http({
			method: 'POST',
			url: 'http://localhost:8888?func=Registration',
			headers: {'Content-Type': 'multipart/form-data'},
			data: regdata
		})
		.then(function onSuccess(response) {
			document.getElementById("alert").style.display = "block"; 
			document.getElementById("alert").className = "alert alert-success";
			document.getElementById('alert').innerHTML=response.data; 
			}).catch(function onError(response) {
			document.getElementById("alert").style.display = "block"; 
			document.getElementById("alert").className = "alert alert-danger";
			document.getElementById('alert').innerHTML=response.data; 
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
});