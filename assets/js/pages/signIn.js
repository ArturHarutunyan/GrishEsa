if (typeof localStorage.token != "undefined") {
		window.location.href = AuthorizedUserBaseURL;
}
CaptchaWidget = null;
CaprchaWerified = true;
$(function(){
	$("#signIn").bind("click",SigbnInButtonClicked);
	window.onkeypress = function(e){
		if(e.keyCode==13){
			SigbnInButtonClicked();
		}
	}
	$('#btn-validate').bind("click",BTNValidate);
	
});
function BTNValidate(){
	var $captcha = $( '#recaptcha' ),
	response = grecaptcha.getResponse();
	if (response.length === 0) {
		$( '.msg-error').text( "reCAPTCHA is mandatory" );
		if( !$captcha.hasClass( "error" ) ){
			$captcha.addClass( "error" );
		}
	}else {
		$('.msg-error' ).text('');
		$captcha.removeClass( "error" );
		alert( 'reCAPTCHA marked' );
	}
}
function SetError(error){
	document.getElementById("otherErrors").innerHTML = error;
	document.getElementById("otherErrors").style.display = "block";
}
function ShowSignInSuccess(){
	document.getElementById("success").style.display = "block";
}
var onloadCallback = function() {
	CaptchaWidget = grecaptcha.render('recaptcha', {
		'sitekey' : '6Ld4Jh8TAAAAAD2tURa21kTFwMkKoyJCqaXb0uoK',
		'theme' : 'light',
		'callback' : verifyCallback,
	  });
  };

function verifyCallback(){
	CaprchaWerified = true;
}
function SigbnInButtonClicked(){
	if(CaprchaWerified){
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var email = document.getElementById("email").value;
		var phone = document.getElementById("phone").value
		var company = document.getElementById("company").value;
		var password = document.getElementById("password").value;
		var confirmPassword = document.getElementById("confirmPassword").value;
		document.getElementById("RequiredFields").style.display = "none";
		document.getElementById("emailError").style.display = "none";
		document.getElementById("passwordError").style.display = "none";
		document.getElementById("otherErrors").style.display = "none";
		$(".RequiredField").removeClass("RequiredField");
		haveError = false;
		errordCounter = 0;
		if(firstName==""){
			++errordCounter;
			$("#firstNameBlock").addClass("RequiredField");
			haveError = true;
		}
		if(lastName==""){
			++errordCounter;
			$("#lastNameBlock").addClass("RequiredField");
			haveError = true;        
		}
		if(email==""){
			++errordCounter;
			$("#emailBlock").addClass("RequiredField");
			haveError = true;        
		}
		else if(!validateEmail(email)){
			$("#emailBlock").addClass("RequiredField");
			haveError = true;
			document.getElementById("emailError").style.display = "block";
		}
		if(phone==""){
			++errordCounter;
			$("#phoneBlock").addClass("RequiredField");
			haveError = true;        
		}
		if(company==""){
			++errordCounter;
			$("#companyBlock").addClass("RequiredField");
			haveError = true;        
		}
		if(password==""){
			++errordCounter;
			haveError = true;
			$("#PasswordBlock").addClass("RequiredField");        
		}
		if(confirmPassword==""){
			++errordCounter;
			haveError = true;
			$("#ConfirmPasswordBlock").addClass("RequiredField");            
		}
		else if(password!=confirmPassword){
			haveError = true;
			document.getElementById("passwordError").style.display = "block";
		}
		
		if(!haveError){
			CreateUser(email,password,firstName,lastName,company,phone,function(response,responseCode){
				if(responseCode!=200){
					SetError(response.message);
				}else{
					ShowSignInSuccess();
					$("#requestAccessBlock").hide();
					$("#MailSendet").show();
					setTimeout(function(){
						window.location.href="index.html#"+response.email;
					},10*1000);
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
	}else{
		alert("Please verify captcha");
	}
}