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
            $scope.ProfileLink ="profile.html?func="+"Get_User_Data"+"&"+"login="+getCookie("login")+"&"+"password="+getCookie("password");
            $scope.AddSignLink ="AddSign.html";
            $scope.MySignsLink ="MySigns.html";
		}
        else{
            setCookie("login","",1);
            setCookie("password","",1);
            $scope.ProfileLink ="registration.html";
            $scope.AddSignLink ="registration.html";
            $scope.MySignsLink ="registration.html";
		}
	});
    
    $scope.search = function search()
    {
        window.location.href = "search.html?func=Signs_loader&name="+searchinput.value;    
	}
    
    $http.get("http://localhost:8888?func="+"Categories_loader")
    .then(function(response) {
        $scope.Categories_list = response.data;
	});
	
	$http.get("http://localhost:8888"+window.location.search+"&func=Sign_load")
	.then(function(response){
		$scope.SignData = response.data;
		$scope.NewSigndata = $scope.SignData;
	});
	
	
	$scope.SignUpdate = function SignUpdate(NewSigndata)
	{				
		$http({
			method: 'POST',
			url: 'http://localhost:8888'+window.location.search+'&func=Sign_Update',
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