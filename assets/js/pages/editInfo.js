if (typeof localStorage.token == "undefined") {
	window.location.href = NotAuthorizedUserBaseURL;	
}else{
	CheckToken((IsAuthorized)=>{
		if(!IsAuthorized){
			window.location.href = NotAuthorizedUserBaseURL;
		}
		getSettings();
	});
}
$(function(){
	$("#SaveChanges").bind("click",saveChanges);
	$("#changeEmail").bind("click",changeEmail);
	$("#ChangePassword").bind("click",changePassword);
});
function getSettings(){
	if(user.fullName == ""){
		user.fullName = user.firstName+" "+user.lastName;
	}
	
	document.getElementById("FullName").value 	=	user.fullName;
	document.getElementById("Address").value 	= 	user.address;
	document.getElementById("city").value 		= 	user.cityTown;
	document.getElementById("phone").value 		=	user.phoneNumber;
	document.getElementById("Address2").value 	=	user.addressLine2;
	document.getElementById("State").value 		=	user.stateCountyProvince;
	document.getElementById("Country").value 	=	user.country;
	document.getElementById("TimeZone").value 	=	user.timeZone;
	document.getElementById("postcode").value 	=	user.postCodeZIP;
	document.getElementById("NewEmail").value 	=	user.email;
}
function saveChanges(){
	$(".RequiredField").removeClass("RequiredField");
	document.getElementById("RequiredFields").style.display = "none";
	document.getElementById("successBlock").style.display = "none";


	var FullName 	= 	document.getElementById("FullName").value;
	var Address 	=	document.getElementById("Address").value;
	var city 		= 	document.getElementById("city").value;
	var phone 		= 	document.getElementById("phone").value;
	var Address2 	= 	document.getElementById("Address2").value;
	var State 		=	document.getElementById("State").value;
	var Country 	= 	document.getElementById("Country").value;
	var TimeZone 	= 	document.getElementById("TimeZone").value;
	var postcode 	= 	document.getElementById("postcode").value;
	haveError = false;
	errordCounter = 0;
	if(FullName==""){
		++errordCounter;
		$("#FullNameBlock").addClass("RequiredField");
		haveError = true;
	}
	if(Address==""){
		++errordCounter;
		$("#AddressBlock").addClass("RequiredField");
		haveError = true;
	}
	if(city==""){
		++errordCounter;
		$("#cityBlock").addClass("RequiredField");
		haveError = true;	
	}
	if(phone==""){
		++errordCounter;
		$("#PhoneBlock").addClass("RequiredField");
		haveError = true;
	}
	if(Address2==""){
		++errordCounter;
		$("#Address2Block").addClass("RequiredField");
		haveError = true;
	}
	if(State==""){
		++errordCounter;
		$("#StateBlock").addClass("RequiredField");
		haveError = true;
	}
	if(Country==""){
		++errordCounter;
		$("#CountryBlock").addClass("RequiredField");
		haveError = true;
	}
	if(TimeZone==""){
		++errordCounter;
		$("#TimeZoneBlock").addClass("RequiredField");
		haveError = true;
	}
	if(postcode==""){
		++errordCounter;
		$("#PostcodeBlock").addClass("RequiredField");
		haveError = true;
	}

	if(!haveError){
		SaveChanges(FullName,Address,Address2,city,State,postcode,Country,phone,TimeZone,function(response,responseCode){
			if (responseCode==200) {
				document.getElementById("successBlock").style.display = "block";
			}
		});
	}else{
		if(errordCounter>1){
			document.getElementById("fieldS").style.display = "inline";
		}else{
			document.getElementById("fieldS").style.display = "none";
		}
		document.getElementById("RequiredFields").style.display = "block";
	}
}
function changeEmail(){
	$(".RequiredField").removeClass("RequiredField");
	document.getElementById("RequiredFieldsInEmailChange").style.display = "none";
	document.getElementById("NewEmailRequiredfieldS").style.display = "none";
	document.getElementById("EmailFormatError").style.display = "none";
	document.getElementById("errordMessage").style.display = "none";
	document.getElementById("success").style.display = "none";
	var email = 	document.getElementById("NewEmail").value;
	var password = 	document.getElementById("password").value;
	errordCounter = 0;
	var haveError = false;
	if(email==""){
		++errordCounter;
		$("#NewEmailBlock").addClass("RequiredField");
		haveError = true;
	}else if(!validateEmail(email)){
		document.getElementById("EmailFormatError").style.display = "block";
		++errordCounter;
		haveError = true;

	}
	if (password=="") {
		++errordCounter;
		$("#PasswordBlock").addClass("RequiredField");
		haveError = true;
	}
	if(!haveError){
		ChangeEmail(password,email,function(response,responseCode){
			switch(responseCode){
				case 200:
					document.getElementById("success").style.display = "block";
					break;
				default:
					document.getElementById("errordMessage").innerHTML = response.message;
					document.getElementById("errordMessage").style.display = "block";
			}
		});
	}else{
		document.getElementById("RequiredFieldsInEmailChange").style.display = "block";
		if (errordCounter>1) {
			document.getElementById("NewEmailRequiredfieldS").style.display = "inline";
		}
	}
}
function changePassword(){
	document.getElementById("PasswordsAreDefferent").style.display 		= 	"none";
	document.getElementById("PasswordsAreDefferentS").style.display 	= 	"none";
	document.getElementById("PasswordChangeSuccess").style.display 		= 	"none";
	document.getElementById("PasswordChangeWrongProcess").style.display = 	"none";


	$(".RequiredField").removeClass("RequiredField");

	var errordCounter		= 0;
	var haveError			= false;
	var CurrentPassword 	= document.getElementById("CurrentPassword").value;
	var NewPassword 		= document.getElementById("NewPassword").value; 
	var RepeatNewPassword	= document.getElementById("RepeatNewPassword").value;
	if(CurrentPassword == ""){
		haveError =  true;
		$("#CurrentPasswordBlock").addClass("RequiredField");
		document.getElementById("PasswordsAreDefferent").style.display = "block";
		++errordCounter;
	}
	if (NewPassword == "") {
		haveError = true;
		$("#NewPasswordBlock").addClass("RequiredField");
		document.getElementById("PasswordsAreDefferent").style.display = "block";
		++errordCounter;
	}
	if(RepeatNewPassword==""){
		haveError = true;
		$("#RepeatNewPasswordBlock").addClass("RequiredField");
		document.getElementById("PasswordsAreDefferent").style.display = "block";
		++errordCounter;
	}else if(NewPassword!=RepeatNewPassword){
		haveError = true;
		$("#NewPasswordBlock").addClass("RequiredField");
		$("#RepeatNewPasswordBlock").addClass("RequiredField");
		document.getElementById("PasswordsAreDefferent").style.display = "block";
	}
	if (!haveError) {
		ChangePassword(CurrentPassword,NewPassword,function(response,responseCode){
			if (responseCode==200) {
				document.getElementById("PasswordChangeSuccess").style.display="block";
			}else{
				document.getElementById("PasswordChangeWrongProcess").innerHTML = response.message;
				document.getElementById("PasswordChangeWrongProcess").style.display = "block";
			}
		});
	}else{
		if(errordCounter>1){
			document.getElementById("PasswordsAreDefferentS").style.display = "block";
		}
	}
}















