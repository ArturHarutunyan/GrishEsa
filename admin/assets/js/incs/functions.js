function CreateCROSRequest(method,url){
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr){
		//check if XMLHttpRequest object has a "withCreadentials" property
		xhr.open(method,url,true);
	}else if(typeof XDomainRequest != "undefined"){
		//for IE browsers
		xhr = new XDomainRequest();
		xhr.open(method,url);
	}else{
		xhr = null;
	}
	xhr.withCredentials = true;
	return xhr;
}
function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
function Wait(){
		var img = new Image();
		img.src = "assets/media/icons/wait.gif";
		var div = document.createElement("div");
		img.className = "PleaseWiteBlockImg";
		div.id = "PleaseWiteBlock";
		div.className = "PleaseWiteBlock";
		div.appendChild(img);
		document.body.appendChild(div);
		return function(){
			div.parentElement.removeChild(div);
		}
	
}
function CheckIsAuthized(CallBack){
	if (typeof localStorage.token == "undefined") {
		window.location.href = NotAuthorizedUserBaseURL;    
	}else{
		CheckToken(function(IsAuthorized){
			if(!IsAuthorized){
				window.location.href = NotAuthorizedUserBaseURL;
			}
			CallBack(IsAuthorized);
		});
	}
}
function logout(){
	if (typeof localStorage.token != "undefined") {
		localStorage.removeItem("token");
		window.location.href = NotAuthorizedUserBaseURL;
	}
}
function ShowDateTime(TimeStamp){
	var d = new Date(TimeStamp);
	var monthNames = [
	    "JUN", "FEB", "MAR",
	    "APR", "MAY", "JUE", "JUL",
	    "AUG", "SEP", "OCT",
	    "NOV", "DEC"
	  ];

	  var day = d.getDate();
	  var monthIndex = d.getMonth();
	  var year = d.getFullYear();
	  var hours = d.getHours();
	  var Minutes = d.getMinutes();
	  var Seconds = d.getSeconds();

	  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' '+hours+":"+Minutes+":"+Seconds;

}
function ShowNotification(notification,IsErrordNotification = false){
	if (closeTimeOut!=null) {
		clearTimeout(closeTimeOut);
	}
	if (document.getElementsByClassName("NotificationBlock").length==0) {
		var div = document.createElement("div");
		div.className = "NotificationBlock";
		div.id = "NotificationBlock"
		var notificationPart = document.createElement("div");
		notificationPart.id = "notificationPart";
		div.appendChild(notificationPart);
		var button = document.createElement("button");
		button.innerHTML = "X";
		button.className = "CloseNotificationButton";
		button.onclick = function(){
			$(div).removeClass("ShowNotificatoin");
		}
		div.onclick = function(){
			$(div).removeClass("ShowNotificatoin");
		}
		div.appendChild(button);
		document.body.appendChild(div);

	}else{
		div = document.getElementById("NotificationBlock");
		notificationPart  = document.getElementById("notificationPart");
	}
	notificationPart.innerHTML = notification;
	if(IsErrordNotification){
		$(div).removeClass("SoccessNotification");
		$(div).addClass("ErrordNotification");
	}else{
		$(div).addClass("SoccessNotification");
		$(div).removeClass("ErrordNotification");
	}
	setTimeout(function(){
		$(div).addClass("ShowNotificatoin");
		return closeTimeOut = setTimeout(function(){
			$(div).removeClass("ShowNotificatoin");
		},ShowNotificatoinTimeOut*1000);
	},100);
	
}
function SetPaginatiorForBlock(blockId,PaginationName,pageCount,onclickEvent){
	if (pageCount<5) {
		for (var i = 0; i < pageCount; i++) {
			document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+(i+1)+"' pageNumber='"+(i+1)+"' class='"+PaginationName+"'>"+(i+1)+"</li>";
		}
	}else{
		refreshPaginationPages(blockId,PaginationName,1,pageCount,onclickEvent);		
	}
	$("#"+blockId).removeClass("Hidden");
	$("#"+PaginationName+"-1").addClass("activePage");
	$("."+PaginationName).on("click",function(){
		
		if (+this.getAttribute("pageNumber")!=0) {
			$("."+PaginationName+".activePage").removeClass("activePage");
			refreshPaginationPages(blockId,PaginationName,+this.getAttribute("pageNumber"),pageCount,onclickEvent);		
			$("#"+PaginationName+"-"+this.getAttribute("pageNumber")).addClass("activePage");
			onclickEvent(this.getAttribute("pageNumber"))
		}
	});
}

function refreshPaginationPages(blockId,PaginationName,activePage,pageCount,onclickEvent){
	if (pageCount<5) {return}
	document.getElementById(blockId).innerHTML = "";
	if (activePage>1) {
		document.getElementById(blockId).innerHTML = "<li pageNumber='"+(activePage-1)+"' class='"+PaginationName+" PaginationPages'>Prev</li>";

	}	
	document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-1' pageNumber='1' class='"+PaginationName+" PaginationPages'>1</li>";
	document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-2' pageNumber='2' class='"+PaginationName+" PaginationPages'>2</li>";
	document.getElementById(blockId).innerHTML += "<li maxPage="+pageCount+" pageNumber='0' class='"+PaginationName+" PaginationPages'>...</li>";
	
	if (activePage> 2 && activePage<pageCount-2) {
		if (activePage!=3) {
			document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+(activePage-1)+"' pageNumber='"+(activePage-1)+"' class='"+PaginationName+" PaginationPages'>"+(activePage-1)+"</li>";
		}
		document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+(activePage)+"' pageNumber='"+(activePage)+"' class='"+PaginationName+" PaginationPages'>"+(activePage)+"</li>";
		if (activePage!=pageCount-1) {
			document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+(activePage+1)+"' pageNumber='"+(activePage+1)+"' class='"+PaginationName+" PaginationPages'>"+(activePage+1)+"</li>";
		}

		document.getElementById(blockId).innerHTML += "<li maxPage="+pageCount+" pageNumber='0' class='"+PaginationName+" PaginationPages'>...</li>";

	}
	document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+(pageCount-1)+"' pageNumber='"+(pageCount-1)+"' class='"+PaginationName+" PaginationPages'>"+(pageCount-1)+"</li>";

	document.getElementById(blockId).innerHTML += "<li id='"+PaginationName+"-"+pageCount+"' pageNumber='"+pageCount+"' class='"+PaginationName+" PaginationPages'>"+pageCount+"</li>";
	if (activePage<pageCount) {
		document.getElementById(blockId).innerHTML += "<li pageNumber='"+(activePage+1)+"' class='"+PaginationName+" PaginationPages'>Next</li>";

	}	
	$("."+PaginationName).on("click",function(){
		
		if (+this.getAttribute("pageNumber")!=0) {
			$("."+PaginationName+".activePage").removeClass("activePage");
			refreshPaginationPages(blockId,PaginationName,+this.getAttribute("pageNumber"),pageCount,onclickEvent);		
			$("#"+PaginationName+"-"+this.getAttribute("pageNumber")).addClass("activePage");
			onclickEvent(this.getAttribute("pageNumber"))
		}
	});

}




