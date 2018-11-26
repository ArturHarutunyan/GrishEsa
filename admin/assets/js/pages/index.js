CheckIsAuthized(function(){
	document.getElementById("UserName").innerHTML = user.firstName[0]+user.lastName[0];
});
GetUserList(function(response, responseCode){
	$(function(){
		if (responseCode==200) {
			for (var i = 0; i < response.users.length; i++) {
				document.getElementById("UserList").innerHTML += "<tr>"+
					"<td>"+response.users[i].firstName+"</td>" +
					"<td>"+response.users[i].lastName+"</td>" +
					"<td>"+response.users[i].email+"</td>" +
					"<td>"+response.users[i].phoneNumber+"</td>" +
					"<td>"+response.users[i].country+"</td>" +
					"<td>"+response.users[i].company+"</td>" +
					"<td>"+response.users[i].address+"</td>" +

					"<td>"+response.users[i].IBRegisterStatus+"</td>" +
					"<td>"+response.users[i].IBServerIP+"</td>" +
					"<td>"+response.users[i].IBUserID+"</td>" +
					"<td>"+response.users[i].IBUserName+"</td>" +
					"<td>"+response.users[i].IBPassword+"</td>" +
					"<td>"+
					((response.users[i].IBRegisterStatus=="None") ? "<button class='createIBserver' userID='"+response.users[i]._id+"'>Create Server</button>":
					"<button class='terminateIBserver' userID='"+response.users[i]._id+"'>Treminate Server</button>")+

					"</td>" +
				"</tr>";
				$(".createIBserver").bind("click",createIBserver);
				$(".terminateIBserver").bind("click",terminateIBserver);

			}
		}
	})
})
function terminateIBserver(){
	TerminateIBServer(this.getAttribute("userID"),function(response,responseCode){
		if (responseCode==200) {
			ShowNotification("IB Server terimated");
		}else{
			ShowNotification("<p>Someting going wrong, errorCode - "+responseCode+" <br> errormassage - "+response.message+" </p>",true);
		}
	});
}
function createIBserver(){
	CreateIBServer(this.getAttribute("userID"),function(response,responseCode){
		if (responseCode==200) {
			ShowNotification("IB Server created");
		}else{
			ShowNotification("<p>Someting going wrong, errorCode - "+responseCode+" <br> errormassage - "+response.message+" </p>",true);
		}
	});

}