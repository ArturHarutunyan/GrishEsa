if (typeof localStorage.token != "undefined") {
	CheckToken((IsAuthorized)=>{
		if(IsAuthorized){
			window.location.href = AuthorizedUserBaseURL;
		}
	});
}
$(function(){
	var email = window.location.hash.substr(1,window.location.hash.length);
	if(email!=""){
		if(validateEmail(email)){
			document.getElementById("username").value  = email;
		}
	}
	$("#loginButton").bind("click",login);
	$(document).keypress(function(e) {
		if(e.which == 13) {
			login();
		}
	});
})
function login(){

	document.getElementById("UsernameError").style.display 		= 	"none";
	document.getElementById("PasswordError").style.display 		= 	"none";
	document.getElementById("LoginErrorBlock").style.display 	= 	"none";
	document.getElementById("loginSucess").style.display 		=	"none";
	$(".RequiredField").removeClass("RequiredField");

	var haveError = false;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if(username==""){
		document.getElementById("UsernameError").style.display = "block";
		$("#UserNameBlock").addClass("RequiredField");
		haveError = true;
	}
	if(password==""){
		document.getElementById("PasswordError").style.display = "block";
		$("#PasswordBlock").addClass("RequiredField");
		haveError = true;
		
	}
	if(!haveError){
		Login(username,password,function(response,responseCode){
			if(responseCode==200){
				localStorage.setItem("token",response.auth.token);
				document.getElementById("loginSucess").style.display = "block";
				JoinSlack(function(response,responseCode){});
				setTimeout(function(){
					window.location.href = AuthorizedUserBaseURL;
				},800);
			}else{
				document.getElementById("LoginErrorBlock").style.display = "block";
			}
		});
	}
}
