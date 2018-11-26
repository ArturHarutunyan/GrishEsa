if (typeof localStorage.token == "undefined") {
	window.location.href = NotAuthorizedUserBaseURL;	
}else{
	CheckToken((IsAuthorized)=>{
		if(!IsAuthorized){
			window.location.href = NotAuthorizedUserBaseURL;
		}
		GetPageData();
	});
}
$(function(){
	$("#LogInIBaccountButton").bind("click",LoginIBBanckAccount);
	$(".logoutBTN").bind("click",logout);
})
function GetPageData(){
	if(user.fullName == ""){
		user.fullName = user.firstName+" "+user.lastName;
	}
	document.getElementById("UserName").innerHTML 		= 	user.firstName[0]+user.lastName[0];
	document.getElementById("UserNameBlock").innerHTML 	= 	user.firstName[0]+user.lastName[0];
	document.getElementById("UserFullName").innerHTML 	=	user.fullName;
	document.getElementById("UserEmail").innerHTML 		=	user.email;
}
function LoginIBBanckAccount(){
	var IBUserName = document.getElementById("IBUserName").value;
	//var IBAccountNumber = document.getElementById("IBAccountNumber").value;
	var IBUserPassword = document.getElementById("IBUserPassword").value;
	$(".RequiredField").removeClass("RequiredField");

	var haverError = false;
	if (IBUserName == "") {
		$("#IBUserNameBlock").addClass("RequiredField");
		haverError = true;
	}
	if (IBUserPassword == "") {
		$("#IBUserPasswordBlock").addClass("RequiredField");
		haverError = true;
	}
	if (!haverError) {
		LoginIBProfile(IBUserName,IBUserPassword,function(response,responseCode){
			console.log(response);
			console.log(responseCode);
			if (responseCode==200) {
				ShowNotification("<p>"+response.message+"</p>");
			}else{
				ShowNotification("<p>something goese wrong, errorcode - "+responseCode+",<br>errorMessage - "+response.message+"</p>",true);

			}
		})
	}
}