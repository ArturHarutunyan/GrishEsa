CheckIsAuthized(()=>{
	document.getElementById("UserName").innerHTML = user.firstName[0]+user.lastName[0];
});
GetAllStockList(function(response,responseCode){
	if (responseCode==200) {
		$(function(){
			document.getElementById("SellCompanyLists").innerHTML = "";
			for (var i = 0; i < response.data.count; i++) {
				document.getElementById("SellCompanyLists").innerHTML+="<li  class='SellCompanyListsCompany' MarketPrice='"+response.data.list[i].MarketPrice+"' Position='"+response.data.list[i].Position+"' ticket='"+response.data.list[i].Company+"'>"+response.data.list[i].FullName+"</li>";
			}
			//$('#myElements').simplebar();
			$(".SellCompanyListsCompany").on("click",function(){
				document.getElementById("SellOrderLimitPrice").value = this.getAttribute("MarketPrice");
				//document.getElementById("SellOrderLimitPrice").setAttribute("maxValue",this.getAttribute("MarketPrice"));
				document.getElementById("first-input-orderform-js1").value = this.getAttribute("Position");
				document.getElementById("first-input-orderform-js1").setAttribute("maxValue",this.getAttribute("Position"));
				document.getElementById("SellTotalUSD").value =  this.getAttribute("Position")*this.getAttribute("MarketPrice");
				document.getElementById("SellOrderCompany").value = this.innerHTML;
				document.getElementById("SellOrderCompany").setAttribute("ticket",this.getAttribute("ticket"));
			});
		})
	}else{
		ShowNotification(response.message,true)
	}
});
$(function(){
	SetStartSettings();
	$("#CompanyName").bind("keyup",CompanyNameChanged);
	$("#PlaceOrder").bind("click",PlaceOrder);
	$("#SellORders").bind("click",Sellorder);
	$("#LimitPrice").bind("keypress",ByTabNumberikFieldsChange);
	$("#first-input-orderform-js").bind("keypress",ByTabNumberikFieldsChange);
	$("#TotalUSD").bind("keypress",ByTabNumberikFieldsChange);
	
	$("#SellOrderLimitPrice").bind("keypress",SellTabNumberikFieldsChange);
	$("#first-input-orderform-js1").bind("keypress",SellTabNumberikFieldsChange);
	$("#SellTotalUSD").bind("keypress",SellTabNumberikFieldsChange);

	$(".logoutBTN").bind("click",logout);
	document.onclick = function(event) {
		if(event.target.className!="full-w-inp"){
			document.getElementById("CompanyNameListBlock").innerHTML = "";
			document.getElementById("CompanyNameList").style.display = "none";

		}
	}
	//$("#SellCompanyLists").bind("click",SellCompanyListsSelected);
});

var marker = true;

function firstinputcl(first, second){
	second.style.border = "2px solid #1B3855";
	second.style.borderLeft = "0";
	if(first.value != ""){
		second.style.display = "none";
		first.style.width = "298px";
		first.style.borderRight = "2px solid #1B3855";
	} else {
		second.style.display = "inline-block";
		first.style.width = "241px";
		first.style.borderRight = "0px solid #D8D8D8";				 	
	}
}

function secondinputcl(first, second){
	first.focus();
}

function firstonfocus(first, second){
	second.style.border = "2px solid #1B3855";
	second.style.borderLeft = "0";
	first.style.borderRight = "2px solid #1B3855";
}
function firstonblur(first, second){
	second.style.border = "1px solid #D8D8D8";
	second.style.borderLeft = "0";
	first.style.borderRight = "1px solid #D8D8D8";
}
function SetStartSettings(){
	var selectinp = document.getElementsByClassName('select-input'),
		selectbl = document.getElementsByClassName('select-block'),
		selectvalue1 = selectbl[0].getElementsByTagName('li'),
		selectarrparent = document.getElementsByClassName('charts-for-arrow');



	window.onclick = function(event) {
		if(event.target != selectbl[0] && event.target !=selectinp[0]){
				selectbl[0].style.display = "none";
				$(selectarrparent[0]).removeClass("arrow-rotate");//.className = "charts-lab-inp-bl charts-for-arrow w-300";
		} else {
				selectbl[0].style.display = "block";
				$(selectarrparent[0]).removeClass("arrow-rotate");
				//selectarrparent[0].className = "charts-lab-inp-bl charts-for-arrow w-300 arrow-rotate";
				
		}
	}

	for(var i = 0; i < selectvalue1.length; i++){
		selectvalue1[i].onclick = function(){
			var usedvalue = this.innerHTML;
			selectinp[0].value = usedvalue;
			selectbl[0].style.display = "none";
				selectarrparent[0].className = "charts-lab-inp-bl charts-for-arrow w-300 arrow-rotate";
		}
	}		

}
var data = [];
var CompanyNameOldValue = "";
function CompanyNameChanged(){

	if (CompanyNameOldValue == this.value) {return};
	CompanyNameOldValue = this.value;
	if(CompanyNameOldValue.length>2){	
		document.getElementById("CompanyNameListBlock").innerHTML = "";
		document.getElementById("CompanyNameList").style.display = "none";

		var div = document.getElementById("CompanyNameListBlock");

		getCompanys(CompanyNameOldValue,function(response,responseCode){
			ul = document.createElement("ul");
			if (responseCode==200) {
				document.getElementById("CompanyNameList").style.display = "block";
				document.getElementById("CompanyNameListBlock").innerHTML = "";
				if (response.data.length==0) {
					document.getElementById("CompanyNameList").style.display = "none";
				}else{
					for (var i = 0; i < response.data.length; i++) {
						li = document.createElement("li");
						var data = response.data[i].FullName;
						data = data.replace(CompanyNameOldValue,"<span class='SherchedWord'>"+CompanyNameOldValue+"</span>");
						li.innerHTML = data;
						li.className = "ComapnyNameListElement";
						li.setAttribute("FullName",response.data[i].FullName);
						li.setAttribute("CompanyID",response.data[i].CompanyID);
						li.onclick = function(event){
							var value = event.target.getAttribute("FullName");
							CompanyID = event.target.getAttribute("CompanyID")
							document.getElementById("CompanyName").value = value;
							document.getElementById("CompanyName").setAttribute("CompanyID",CompanyID);
							document.getElementById("CompanyNameList").style.display = "none";
						}
						ul.appendChild(li);
					}
				}
				
			}
			div.appendChild(ul);
			

		});
	}else{
		document.getElementById("CompanyNameList").style.display = "none";

	}
}
function ByTabNumberikFieldsChange(event){
	if(isNaN(+event.key)){
		event.preventDefault();
		return false;
	}
	if (this.id == "LimitPrice") {
		LimitPrice = this.value+event.key;
	}else{
		LimitPrice = 		+document.getElementById("LimitPrice").value;
	}
	if (this.id == "first-input-orderform-js") {
		NumberOfShares = this.value+event.key;
	}else{
		NumberOfShares = 	+document.getElementById("first-input-orderform-js").value;
	}
	if (isNaN(LimitPrice) || isNaN(NumberOfShares)) {
		return true;
	}
	var total = LimitPrice*NumberOfShares;
	document.getElementById("TotalUSD").value = total;

}
function SellTabNumberikFieldsChange(){
	if(isNaN(+event.key)){
		event.preventDefault();
		return false;
	}

	if(this.getAttribute("maxvalue")!=null){
		if (+(this.value+event.key)>(+this.getAttribute("maxvalue"))) {
			this.value = this.getAttribute("maxvalue");
			event.preventDefault();
			return false;
		}
	}

	if (this.id == "SellOrderLimitPrice") {
		LimitPrice = this.value+event.key;
	}else{
		LimitPrice = +document.getElementById("SellOrderLimitPrice").value;
	}
	if (this.id == "first-input-orderform-js1") {
		NumberOfShares = this.value+event.key;
	}else{
		NumberOfShares = 	+document.getElementById("first-input-orderform-js1").value;
	}
	if (isNaN(LimitPrice) || isNaN(NumberOfShares)) {
		return true;
	}
	var total = LimitPrice*NumberOfShares;
	document.getElementById("SellTotalUSD").value = total;

}
function PlaceOrder(){
	
	$(".RequiredField").removeClass("RequiredField");
	document.getElementById("RequiredFields").style.display = "none";
	document.getElementById("fieldS").style.display = "none";
	document.getElementById("NumberikRequiredFields").style.display = "none";
	document.getElementById("NumbericfieldS").style.display = "none";

	haveError = false;
	errordCounter = 0;
	NumbericErrorCounter = 0;
	var CompanyID = 		document.getElementById("CompanyName").getAttribute("companyid");
	var LimitPrice = 		+document.getElementById("LimitPrice").value;
	var NumberOfShares = 	+document.getElementById("first-input-orderform-js").value;
	var TotalUSD = 			+document.getElementById("TotalUSD").value;
	if (CompanyID==null) {
		$("#CompanyNameBlock").addClass("RequiredField");
		document.getElementById("RequiredFields").style.display = "block";
		haveError = true;
		++errordCounter;
	}
	if (LimitPrice==0) {
		$("#LimitPriceBlock").addClass("RequiredField");
		document.getElementById("RequiredFields").style.display = "block";
		++errordCounter
		haveError = true;
	}
	if (isNaN(LimitPrice)) {
		$("#LimitPriceBlock").addClass("RequiredField");
		document.getElementById("NumberikRequiredFields").style.display = "block";
		haveError = true;
		++NumbericErrorCounter;
	}
	if (NumberOfShares==0) {
		$("#NumberOfSharesBlock").addClass("RequiredField");
		document.getElementById("RequiredFields").style.display = "block";
		++errordCounter
		haveError = true;
	}
	if (isNaN(NumberOfShares)) {
		$("#NumberOfSharesBlock").addClass("RequiredField");
		document.getElementById("NumberikRequiredFields").style.display = "block";
		haveError = true;
		++NumbericErrorCounter;
	}

	//$("#PasswordBlock").addClass("RequiredField");
	if (!haveError) {
		ByOrder(CompanyID,NumberOfShares,LimitPrice,function(response,responseCode){
			if (responseCode==200) {
				ShowNotification("An order to buy successfully submitted");
			}else{
				ShowNotification(response.message,true);

			}
		});
	}else{
		if (errordCounter>1) {
			document.getElementById("fieldS").style.display = "inline";
		}
		if (NumbericErrorCounter>1) {
			document.getElementById("NumbericfieldS").style.display = "inline"
		}

	}
}

function Sellorder(){
	$(".RequiredField").removeClass("RequiredField");
	document.getElementById("SellRequiredFields").style.display = "none";
	document.getElementById("SellfieldS").style.display = "none";
	document.getElementById("SellNumberikRequiredFields").style.display = "none";
	document.getElementById("SellNumbericfieldS").style.display = "none";

	haveError = false;
	errordCounter = 0;
	NumbericErrorCounter = 0;
	var CompanyID = 		document.getElementById("SellOrderCompany").getAttribute("ticket");
	var LimitPrice = 		+document.getElementById("SellOrderLimitPrice").value;
	var NumberOfShares = 	+document.getElementById("first-input-orderform-js1").value;
	var TotalUSD = 			+document.getElementById("SellTotalUSD").value;
	if (CompanyID==null) {
		$("#SellOrderCompanyBlock").addClass("RequiredField");
		document.getElementById("SellRequiredFields").style.display = "block";
		haveError = true;
		++errordCounter;
	}
	if (LimitPrice==0) {
		$("#SellOrderLimitPriceBlock").addClass("RequiredField");
		document.getElementById("SellRequiredFields").style.display = "block";
		++errordCounter
		haveError = true;
	}
	if (isNaN(LimitPrice)) {
		$("#SellOrderLimitPriceBlock").addClass("RequiredField");
		document.getElementById("SellNumberikRequiredFields").style.display = "block";
		haveError = true;
		++NumbericErrorCounter;
	}
	if (NumberOfShares==0) {
		$("#SellNumberOfSharesBlock").addClass("RequiredField");
		document.getElementById("SellRequiredFields").style.display = "block";
		++errordCounter
		haveError = true;
	}
	if (isNaN(NumberOfShares)) {
		$("#SellNumberOfSharesBlock").addClass("RequiredField");
		document.getElementById("SellNumberikRequiredFields").style.display = "block";
		haveError = true;
		++NumbericErrorCounter;
	}

	//$("#PasswordBlock").addClass("RequiredField");
	if (!haveError) {
		SellOrders(CompanyID,NumberOfShares,LimitPrice,function(response,responseCode){
			if (responseCode==200) {
				ShowNotification("An order to sell  successfully submitted");
			}else{
				ShowNotification(response.message,true);

			}
		});
	}else{
		if (errordCounter>1) {
			document.getElementById("SellfieldS").style.display = "inline";
		}
		if (NumbericErrorCounter>1) {
			document.getElementById("SellNumbericfieldS").style.display = "inline"
		}

	}
}




