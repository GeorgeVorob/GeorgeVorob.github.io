function loginremove()
{
	setCookie("login","",365);
	setCookie("password","",365);
	location.reload(true);
}