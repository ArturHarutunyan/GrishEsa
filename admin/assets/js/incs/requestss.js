var WaitBlock = null;
var WaitCounter = 0;
function DoRequestToURL(url,method="GET",request,Callback = (response,responseCode) => {console.log(response)},isAuthize = false){
	var xhr = new CreateCROSRequest(method,url);
	WaitCounter++;
	xhr.onload = function(){
		try{
			var response = JSON.parse(this.response);
			WaitCounter--;
			if(typeof WaitBlock == "function"){
				if (WaitCounter==0) {
					WaitBlock();
					WaitBlock = null;
				}
			}
			return Callback(response,this.status);
		}catch(e){
			return false;
		}
	}
	xhr.setRequestHeader("Content-type","application/json");
	if(isAuthize){
		xhr.setRequestHeader("Authorization","Bearer "+localStorage.token);
	}
	xhr.send(request);
	$(function(){
		if(typeof WaitBlock != "function"){
			WaitBlock = Wait();
		}
	});
}

function CheckToken(Callback){
	var url = BaseURL+"/user/detail";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		switch(responseCode){
			case 200:
				user = response;
				Callback(true);
				break;
			default:
				logout();
				Callback(false);
		}
	},true);
}
function GetUserList(Callback){
	var url = BaseURL+"/user/list";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function CreateIBServer(userID,Callback){
	var url = BaseURL+"/user/"+userID+"/ib-server-create";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function TerminateIBServer(userID,Callback){
	var url = BaseURL+"/user/"+userID+"/ib-server-terminate";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}



















