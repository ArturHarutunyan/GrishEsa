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
function CreateUser(email="",password="",firstName="",lastName="",company="",phoneNumber="",Callback){
	var request = JSON.stringify({
		"email"				: email,
		"password"			: password,
		"firstName"			: firstName,
		"lastName"			: lastName,
		"company"			: company,
		"phoneNumber"		: phoneNumber
	});
	var url = BaseURL+"/user/create";
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode);
	});
}
function Login(username="",password="",Callback = (response)=>{}){
	var request = JSON.stringify({
		"email":username,
		"password":password
	});
	var url = BaseURL+"/auth/login";
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode)
	});
}
function ForgetPassword(mail="",Callback){
	var request = JSON.stringify({
		"email":mail
	});
	var url = BaseURL+"/user/forgot-password";
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode)
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
function SaveChanges(fullName="",address="",addressLine2="",cityTown="",stateCountyProvince="",postCodeZIP="",country="",phoneNumber="",timeZone="",Callback){
	url = BaseURL+"/user/contact-info";
	var request = JSON.stringify({
			"fullName": 			fullName,
			"address": 				address,
			"addressLine2": 		addressLine2,
			"cityTown": 			cityTown,
			"stateCountyProvince": 	stateCountyProvince,
			"postCodeZIP": 			postCodeZIP,
			"country": 				country,
			"phoneNumber": 			phoneNumber,
			"timeZone": 			timeZone
		});
	DoRequestToURL(url,"PUT",request,function(response,responseCode){
		Callback(response,responseCode)
	},true);
}
function ChangeEmail(password = "",NewEmail = "",Callback){
	url = BaseURL+"/user/email";
	var request = JSON.stringify({
		"email": 	NewEmail,
		"password": password
	});
	DoRequestToURL(url,"PUT",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function ChangePassword(old_password = "",password = "",Callback){
	url = BaseURL+"/user/password";
	var request = JSON.stringify({
		"old_password": old_password,
  		"password": password
	});
	DoRequestToURL(url,"PUT",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function getCompanys(query = "",Callback){
	url = BaseURL+"/companies/autocomplete?q="+query;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function ApplyModelInput(ResponseTolerance = 0,term="Short",MaxTradesNumPerDay = 0,MaxAmountPerTrade = 0,Callback){
	var url = BaseURL+"/model/input";
	var request = JSON.stringify({
		"RiskTolerance": ResponseTolerance,
		"Term": term,
		"MaxTradesNumPerDay": MaxTradesNumPerDay,
		"MaxAmountPerTrade": MaxAmountPerTrade
	});
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function GetModelStartData(Callback){
	var url = BaseURL+"/model/status";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function RunOrders(Callback){
	var url = BaseURL+"/orders/run";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}

function PauseOrders(Callback){
	var url = BaseURL+"/orders/pause";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function GetOrderStatus(Callback){
	var url = BaseURL+"/orders/status";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);	
}
function SetOrder(company = "",TotalQuantity=0,LmtPrice=0,action,Callback){
	url = BaseURL+"/orders/req";
	var request = JSON.stringify({
		"Company": 			company,
		"Action": 			action,
		"TotalQuantity": 	TotalQuantity,
		"LmtPrice": 		LmtPrice,
		"Status": 			"Pending"
	});
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function ByOrder(company = "",TotalQuantity=0,LmtPrice=0,Callback){
	url = BaseURL+"/orders/req";
	var request = JSON.stringify({
		"Company": 			company,
		"Action": 			"BUY",
		"TotalQuantity": 	TotalQuantity,
		"LmtPrice": 		LmtPrice,
		"Status": 			"Pending"
	});
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function SellOrders(company = "",TotalQuantity=0,LmtPrice=0,Callback){
	url = BaseURL+"/orders/req";
	var request = JSON.stringify({
		"Company": 			company,
		"Action": 			"SELL",
		"TotalQuantity": 	TotalQuantity,
		"LmtPrice": 		LmtPrice,
		"Status": 			"Pending"
	});
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		return Callback(response,responseCode);
	},true);
}
function ReqMoney(Order,Callback){
	
	var url = BaseURL+"/orders/req-many";
	var request = JSON.stringify({
		orders:Order,
	});	
	DoRequestToURL(url,"POST",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);	
}
function LoginIBProfile(IBUserName="",IBPassword="",Callback){
	var url = BaseURL+"/user/ib-info";
	var request = JSON.stringify({
		"IBUserName": IBUserName,
		"IBPassword": IBPassword,
		"IBRegisterStatus": "Requested"
	});
	DoRequestToURL(url,"PUT",request,function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function AccountSummaryMain(Callback){
	var url = BaseURL+"/account-summary/main";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function AccountSummaryShares(page=1,limit=5,sort="Company",Callback){
	var url = BaseURL+"/account-summary/shares?page="+page+"&limit="+limit+"&sort="+sort;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function GetAllStockList(Callback){
	var url = BaseURL+"/account-summary/shares";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);		
}
function AccountSummartSharesByCompany(CompanyID="",Callback){
	var url = BaseURL+"/account-summary/shares/"+CompanyID;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function AcconutSummaryHistory(period="day",startDate="",endDate="",Callback){
	var url = BaseURL+"/account-summary/history?period="+period+"&startDate="+startDate+"&endDate="+endDate;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function GetChartData(Callback){
	var url = BaseURL+"/account-summary/history?period=all-time";
	DoRequestToURL(url,"GET","",function (response,responseCode){
		Callback(response,responseCode);
	},true);
}
function GetMyStocks(page=1,limit=5,sort="Company",Callback){
	var url = BaseURL+"/account-summary/shares?page="+page+"&limit="+limit+"&sort="+sort;
	DoRequestToURL(url,"GET","",function (response,responseCode){
		Callback(response,responseCode);
	},true);
}
/*
function Trades(Company="",StartDate="",EndDate="",page=1,limit=5,sort="Company",Callback){
	var url = BaseURL+"/trades?Company="+Company+"&StartDate="+StartDate+"&EndDate="+EndDate+"&page="+page+"&limit="+limit+"&sort="+sort;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
*/
function TradesLastDay(Callback){
	var url = BaseURL+"/trades/last-day";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function Trades(page=1,limit=5,sort="Company",Callback){
	var url = BaseURL+"/trades?page="+page+"&limit="+limit+"&sort="+sort;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function stocks(Company="",period="",startDate="",endDate="",Callback){
	var url = BaseURL+"/stocks?Company="+Company+"&period="+period+"&startDate="+startDate+"&endDate="+endDate;
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function OrdersLastDay(Callback){
	var url = BaseURL+"/orders/last-day";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}

function ModelOutput(Callback){
	var url = BaseURL+"/model/output";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);
}
function JoinSlack(Callback){
	var url = BaseURL+"/user/join-slack";
	DoRequestToURL(url,"GET","",function(response,responseCode){
		Callback(response,responseCode);
	},true);	
}



















