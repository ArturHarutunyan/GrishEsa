if (typeof localStorage.token != "undefined") {
	window.location.href = AuthorizedUserBaseURL;
}
$(function(){
	$("#SendMePass").bind("click",forgetPassword);
	window.onkeypress = function(e){
		if(e.keyCode==13){
			forgetPassword();
		}
	}
});
function forgetPassword(){
	document.getElementById("EmailFormatError").style.display = "none";
	document.getElementById("EmailRequired").style.display="none";
	document.getElementById("ResponseErrors").style.display = "none";
	$(".RequiredField").removeClass("RequiredField");


	var mail = document.getElementById("emailField").value;

	haveError = false;
	if(mail==""){
		document.getElementById("EmailRequired").style.display="block";
		$("#emailBlock").addClass("RequiredField");
		haveError = true;
	}else if(!validateEmail(mail)){
		document.getElementById("EmailFormatError").style.display = "block";
		$("#emailBlock").addClass("RequiredField");
		haveError = true;
	}
	if(!haveError){
		ForgetPassword(mail,function(response,responseCode){
			switch(responseCode){
				case 400:
				case 404:
					document.getElementById("ResponseErrors").innerHTML = response.message;
					document.getElementById("ResponseErrors").style.display = "block";
					break;
				default:
					document.getElementById("ResetPassword").style.display = "none";
					document.getElementById("successForm").action+="#"+response.email;
					document.getElementById("SuccessBlock").style.display = "block";
			}
		});
	}
}