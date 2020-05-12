var app = angular.module('ng_index', []);
app.controller('ng_index_ctrl', function($scope, $http) {
	
	$scope.loginadd = function loginadd()
	{
		let login = document.getElementById("logintextbox").value;
		let password = document.getElementById("passwordtextbox").value;
		$http.get("http://26.149.227.170:8888?func="+"Login_check"+"&"+"login="+login+"&"+"password="+password)
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
	$http.get("http://26.149.227.170:8888?func="+"Login_check"+"&"+"login="+getCookie("login")+"&"+"password="+getCookie("password"))
	.then(function(response) {
		if (response.data == "true"){
			document.getElementById("logged").style.visibility = "visible";
			document.getElementById("loginform").style.visibility = "hidden";
			document.getElementById("tmp_login").innerHTML+="Вы вошли как "+getCookie("login");
		}
	});	
	
	$scope.AddSign = function AddSign(NewSigndata)
	{				
		$http({
			method: 'POST',
			url: 'http://26.149.227.170:8888?func=Add_Sign&login='+getCookie("login")+'&password='+getCookie("password"),
			headers: {'Content-Type': 'multipart/form-data'},
			data: NewSigndata
		})
		.then(function onSuccess(response) {
			document.getElementById("alert").style.display = "block"; 
			document.getElementById("alert").className = "alert alert-success";
			document.getElementById('alert').innerHTML="Данны обновлены"; 
			}).catch(function onError(response) {
			document.getElementById("alert").style.display = "block"; 
			document.getElementById("alert").className = "alert alert-danger";
			if(response.status==400)
			document.getElementById('alert').innerHTML="Неверные данные"; 
			else
			document.getElementById('alert').innerHTML="Ошибка на сервере"; 
		});
	}
	
	
});