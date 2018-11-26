CheckIsAuthized(function(){
	document.getElementById("UserName").innerHTML = user.firstName[0]+user.lastName[0];
});
GetModelStartData(function(response,responseCode){
	if (responseCode==200) {
		$(function(){
			document.getElementById("trades").value = "$"+response.data.RiskTolerance;
			document.getElementById("term").value = response.data.Term;
			document.getElementById("RiskTolerance").value = response.data.MaxTradesNumPerDay+"%";
			document.getElementById("maxTradesPerDay").value = response.data.MaxAmountPerTrade;
		});
	}
});
GetOrderStatus(function(response,responseCode){
	if (responseCode==200) {
		$(function(){
			if (response.data.Trading=="PAUSE") {
				document.getElementById("StartTradingBlock").style.display = "block";

			}else{
				document.getElementById("StopTradingBlock").style.display = "block";

			}
		})
	}

})
AccountSummaryMain(function(response,responseCode){
	if (responseCode==200) {
		$(function(){
			if (parseFloat(response.data.UnrealizedPnL)>0) {
				document.getElementById("UnrealizedValue").className = "price-bl-charts-green";
				document.getElementById("UnrealizedValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.UnrealizedPnL);
			}else if(parseFloat(response.data.UnrealizedPnL)<0){
				document.getElementById("UnrealizedValue").className = "price-bl-charts-red";
				document.getElementById("UnrealizedValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.UnrealizedPnL);
			}else{
				document.getElementById("UnrealizedValue").className = "";
				document.getElementById("UnrealizedValue").innerHTML = "$00.00";
			}


			if (parseFloat(response.data.CashBalance)>0) {
				document.getElementById("CashValue").className = "price-bl-charts-green";
				document.getElementById("CashValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.CashBalance);
			}else if(parseFloat(response.data.CashBalance)<0){
				document.getElementById("CashValue").className = "price-bl-charts-red";
				document.getElementById("CashValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.CashBalance);
			}else{
				document.getElementById("CashValue").className = "";
				document.getElementById("CashValue").innerHTML = "$00.00";
			}

			if (parseFloat(response.data.TotalAccountValue)>0) {
				document.getElementById("TotalAccountValie").className = "price-bl-charts-green";
				document.getElementById("TotalAccountValie").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.TotalAccountValue);
			}else if (parseFloat(response.data.TotalAccountValue)>0) {
				document.getElementById("TotalAccountValie").className = "price-bl-charts-red";
				document.getElementById("TotalAccountValie").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.TotalAccountValue);
			}else{
				document.getElementById("TotalAccountValie").className = "";
				document.getElementById("TotalAccountValie").innerHTML = "$00.00";
			}



			if (parseFloat(response.data.Return)>0){
				document.getElementById("RetrunValue").className = "price-bl-charts-green";
				document.getElementById("RetrunValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'percent'}).format(response.data.Return);
			}else if(parseFloat(response.data.Return)<0){
				document.getElementById("RetrunValue").className = "price-bl-charts-red";
				document.getElementById("RetrunValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'percent'}).format(response.data.Return);
			}else{
				document.getElementById("RetrunValue").className = "";
				document.getElementById("RetrunValue").innerHTML = "00.00%";
			}

			if (parseFloat(response.data.StockMarketValue)>0){
				document.getElementById("equityValue").className = "price-bl-charts-green";
				document.getElementById("equityValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.StockMarketValue);
			}else if(parseFloat(response.data.StockMarketValue)<0){
				document.getElementById("equityValue").className = "price-bl-charts-red";
				document.getElementById("equityValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.StockMarketValue);
			}else{
				document.getElementById("equityValue").className = "";
				document.getElementById("equityValue").innerHTML = "$00.00";
			}


			if (parseFloat(response.data.Commission)>0){
				document.getElementById("FeesValue").className = "price-bl-charts-green";
				document.getElementById("FeesValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.Commission);
			}else if(parseFloat(response.data.Commission)<0){
				document.getElementById("FeesValue").className = "price-bl-charts-red";
				document.getElementById("FeesValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.Commission);
			}else{
				document.getElementById("FeesValue").className = "";
				document.getElementById("FeesValue").innerHTML = "$00.00";
			}

			if (parseFloat(response.data.RealizedPnL)>0){
				document.getElementById("NetProfitValue").className = "price-bl-charts-green";
				document.getElementById("NetProfitValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_up_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-620.000000, -311.000000)"><g id="Net-pofit" transform="translate(613.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_up_24px"><polygon id="Shape" fill="#58C144" fill-rule="nonzero" points="7 14 12 9 17 14"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.RealizedPnL);
			}else if(parseFloat(response.data.RealizedPnL)<0){
				document.getElementById("NetProfitValue").className = "price-bl-charts-red";
				document.getElementById("NetProfitValue").innerHTML = '<svg width="10px" height="5px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>ic_arrow_drop_down_24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dashboard" transform="translate(-479.000000, -312.000000)"><g id="Fees" transform="translate(472.000000, 282.000000)"><g id="number" transform="translate(0.000000, 20.000000)"><g id="ic_arrow_drop_down_24px"><polygon id="Shape" fill="#E73535" fill-rule="nonzero" points="7 10 12 15 17 10"></polygon><polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon></g></g></g></g></g></svg>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.RealizedPnL);
			}else{
				document.getElementById("NetProfitValue").className = "";
				document.getElementById("NetProfitValue").innerHTML = "$00.00";
			}
		});

	}else{
		ShowNotification(response.message,true);
	}
});
getMyPositionsTable();
function getMyPositionsTable(pageNumber = 1,OrderBy = "Company"){
	AccountSummaryShares(pageNumber,accountSummarySize,OrderBy,function(response,responseCode){
		if (responseCode==200) {
			$(function(){
				document.getElementById("MyPositionsTable").innerHTML = "";
				for (var i = 0; i < response.data.list.length; i++) {
					document.getElementById("MyPositionsTable").innerHTML+='<tr class="charts-64">'+
					'<td class="pdd-40">'+response.data.list[i].FullName+'</td>'+
					'<td>'+response.data.list[i].Company+'</td>'+
					'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].MarketPrice)+'</td>'+
					'<td>'+response.data.list[i].Position+'</td>'+
					'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].MarketValue)+'</td>'+
					'<td class="'+((response.data.list[i].UnrealizedPNL<0)?'RedText':'greenText')+'">'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].UnrealizedPNL)+'</td>'+
					'</tr>';
				}
				if ($("#pagination").hasClass("Hidden")) {
					if (response.data.total>accountSummarySize) {
						var pageCount = Math.ceil(response.data.total/accountSummarySize);
						SetPaginatiorForBlock("pagination","page",pageCount,getMyPositionsTable);
					}
					
				}
			});
		}else{
			ShowNotification(response.message,true);
		}
	})
}
getMyStocksTable();
function getMyStocksTable(page=1,OrderBy="Company"){
	GetMyStocks(page,accountSummarySize,OrderBy,function(response,responseCode){
		if (responseCode==200) {
			document.getElementById("MyStocksHiastory").innerHTML = "";
			for (var i = 0; i < response.data.list.length; i++) {
				var Classname = "greenText";
				if (response.data.list[i].UnrealizedPNL<0) {
					Classname = "RedText";
				}
				document.getElementById("MyStocksHiastory").innerHTML+= "<tr>"+
				'<td class="pl-4"><input id="MyStock'+i+'" class="StockBox" type="checkbox" ticker="'+response.data.list[i].Company+'" limitPrice="'+response.data.list[i].MarketPrice+'" TotalQuantity="'+response.data.list[i].Position+'"><label for="MyStock'+i+'">'+response.data.list[i].FullName+'</label></td>'+
				'<td>'+response.data.list[i].Company+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].MarketPrice)+'</td>'+
				'<td>'+response.data.list[i].Position+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].MarketPrice*response.data.list[i].Position)+'</td>'+
				'<td class="'+Classname+'">'+Intl.NumberFormat("en-US",{ style: 'currency', currency: 'USD' }).format(response.data.list[i].UnrealizedPNL)+'</td>'+
				"</tr>";

			}
			
			if ($("#StocksPagination").hasClass("Hidden")) {
				
				var pageCount = Math.ceil(response.data.total/accountSummarySize);
				SetPaginatiorForBlock("StocksPagination","Stockpage",pageCount,getMyStocksTable);
						
			}
			$(".StockBox").bind("change",SetStockForSELL);
		}else{
			ShowNotification(response.message,true);
		}
	})
}
function getTrades(page=1,orderBy="TimeStamp"){
	Trades(page,accountSummarySize,orderBy,function(response,responseCode){
		if (responseCode==200) {
			$(function(){
				document.getElementById("for-sorting-box").innerHTML = "";
				for (var i = 0; i <response.data.list.length; i++) {
					// transactoinTypes - 0 sell
					// 1 - buy
					var transacrionType = 1;
					if (response.data.list[i].Side=="SLD") {
						transacrionType = 0;
					}
					document.getElementById("for-sorting-box").innerHTML+= '<tr>'+
					'<td class="pdd-30">'+response.data.list[i].OrderId+'</td>'+
					'<td>'+ShowDateTime(response.data.list[i].TimeStamp)+'</td>'+
					'<td>'+response.data.list[i].FullName+" / "+response.data.list[i].Company+'</td>'+
					'<td>' + ((transacrionType)?'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Table/1-Row" transform="translate(-557.000000, -24.000000)"><g id="outline-arrow_upward-24px" transform="translate(556.000000, 23.000000)"><g id="Outline_1_"><g transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#00d390" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="6 8.66666667 6.47 9.13666667 8.33333333 7.27666667 8.33333333 11.3333333 9 11.3333333 9 7.27666667 10.86 9.14 11.3333333 8.66666667 8.66666667 6"></polygon></g></g></g></g></g></svg>':'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="outline-arrow_downward-24px-copy" transform="translate(-1.000000, -1.000000)"><g id="outline-arrow_upward-24px"><g id="Outline_1_" transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#965bd2" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="11.33 8.665 10.8602938 8.19529375 8.998125 10.0541313 8.998125 6 8.331875 6 8.331875 10.0541313 6.4730375 8.1919625 6 8.665 8.665 11.33"></polygon></g></g></g></g></svg>')+response.data.list[i].CumQty+'</td>'+
					'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price)+'</td>'+
					'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price*response.data.list[i].Shares)+'</td>'+
					'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].CommissionCurrency }).format(response.data.list[i].Commission)+'</td>'+

					'<td class="'+((!transacrionType && response.data.list[i].RealizedPNL<0)?'RedText':'greenText')+'">'+((transacrionType) ? '-':Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].RealizedPNL))+'</td>'+
					((transacrionType)?'<td class="sell-chart"><span>SOLD</span></td>':'<td class="buy-chart"><span>BOUGHT</span></td>')+'</tr>';
				}
				if ($("#TradeHistoryNavigation").hasClass("Hidden")) {
					if (response.data.total>accountSummarySize) {
						var pageCount = Math.ceil(response.data.total/accountSummarySize);
						SetPaginatiorForBlock("TradeHistoryNavigation","changeTradesPage",pageCount,getTrades);
						
					}
					
				}
			})
		}else{
			ShowNotification(response.message,true);
		}
	})
}

getTrades();
OrdersLastDay(function (response,responseCode){
	if (responseCode == 200) {
		document.getElementById("OrderSdetails").innerHTML = "";
		for (var i = 0; i < response.data.list.length; i++) {
			document.getElementById("OrderSdetails").innerHTML+= '<tr>'+
			'<td class="pdd-40 w-237">'+response.data.list[i].OrderId+'</td>'+
			'<td>'+ShowDateTime(response.data.list[i].TimeStamp)+'</td>'+
			'<td>'+response.data.list[i].FullName+'</td>'+
			'<td>'+response.data.list[i].TotalQuantity+'</td>'+
			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data.list[i].LmtPrice)+'</td>'+
			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data.list[i].LmtPrice*response.data.list[i].TotalQuantity)+'</td>'+
			'<td class="'+response.data.list[i].Action.toLowerCase()+'-chart"><span>'+response.data.list[i].Action+'</span></td>'+
			'</tr>';
											
		}
		
	}else{
		ShowNotification(response.message,true);
	}
});

ModelOutput(function (response,responseCode){
	if (responseCode==200) {
		$(function(){
			document.getElementById("recommendationsTradesAndRecentTrades").innerHTML = "";
			for (var i = 0; i < response.data.length; i++) {
				document.getElementById("recommendationsTradesAndRecentTrades").innerHTML+= '<tr>'+
				'<td class="pl-5"><button type="button" class="btn btn-primary name-tbl" data-toggle="modal" data-target="#exampleModal">'+response.data[i].FullName+'</button></td>'+
				'<td>'+response.data[i].Company+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data[i].LmtPrice)+'</td>'+
				'<td>'+response.data[i].TotalQuantity+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data[i].LmtPrice*response.data[i].TotalQuantity)+'</td>'+
				'<td>'+ShowDateTime(response.data[i].TimeStamp)+'</td>'+

				'<td> <div qut="'+response.data[i].TotalQuantity+'" price="'+response.data[i].LmtPrice+'" act="'+response.data[i].Action+'" Company="'+response.data[i].Company+'" class="'+response.data[i].Action.toLowerCase()+'-chart DoThisTrade"><span>'+response.data[i].Action+'</span></div></td>'+

				'</tr>';	
			}				
			$(".DoThisTrade").bind("click",DoThisTrade);

		});			
	}else{
		ShowNotification(response.message,true);
	}
})
TradesLastDay(function (response,responseCode){
	console.log(response);
	if (responseCode==200) {
		document.getElementById("RecentTrades").innerHTML = "";
		for (var i = 0; i <response.data.list.length; i++) {
			// transactoinTypes - 0 sell
			// 1 - buy
			var transacrionType = 1;
			var action = "BOUGHT";
			if (response.data.list[i].Side=="SLD") {
				action = "SOLD";
				transacrionType = 0;
			}
			document.getElementById("RecentTrades").innerHTML+= '<tr>'+
			'<td class="pdd-30">'+response.data.list[i].OrderId+'</td>'+
			'<td>'+ShowDateTime(response.data.list[i].TimeStamp)+'</td>'+
			'<td>'+response.data.list[i].FullName+'</td>'+
			'<td>' + ((transacrionType)?'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Table/1-Row" transform="translate(-557.000000, -24.000000)"><g id="outline-arrow_upward-24px" transform="translate(556.000000, 23.000000)"><g id="Outline_1_"><g transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#00d390" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="6 8.66666667 6.47 9.13666667 8.33333333 7.27666667 8.33333333 11.3333333 9 11.3333333 9 7.27666667 10.86 9.14 11.3333333 8.66666667 8.66666667 6"></polygon></g></g></g></g></g></svg>':'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="outline-arrow_downward-24px-copy" transform="translate(-1.000000, -1.000000)"><g id="outline-arrow_upward-24px"><g id="Outline_1_" transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#965bd2" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="11.33 8.665 10.8602938 8.19529375 8.998125 10.0541313 8.998125 6 8.331875 6 8.331875 10.0541313 6.4730375 8.1919625 6 8.665 8.665 11.33"></polygon></g></g></g></g></svg>')+response.data.list[i].CumQty+'</td>'+
			//'<td>'+response.data.list[i].Commission+'</td>'+
			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].CommissionCurrency }).format(response.data.list[i].Commission)+'</td>'+

			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price)+'</td>'+
			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price*response.data.list[i].Shares)+'</td>'+

			
			'<td>'+((!transacrionType) ? Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].RealizedPNL):"-")+'</td>'+
			'<td>'+action+'</td>'+
			'</tr>';
			//((transacrionType)?'<td class="sell-chart"><span>SOLD</span></td>':'<td class="buy-chart"><span>BOUGHT</span></td>')+'</tr>';
		}
	}else{
		ShowNotification(response.message,true);
	}
});
OrdersLastDay(function (response,responseCode){
	if (responseCode==200) {
		document.getElementById("RecentOrders").innerHTML = "";
		for (var i = 0; i <response.data.list.length; i++) {
			document.getElementById("RecentOrders").innerHTML+= '<tr>'+
			'<td class="pdd-30">'+response.data.list[i].OrderId+'</td>'+
			'<td>'+response.data.list[i].FullName+'</td>'+
			'<td>'+response.data.list[i].Company+'</td>'+

			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data.list[i].LmtPrice)+'</td>'+
			'<td>'+response.data.list[i].TotalQuantity+'</td>'+
			'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: "USD" }).format(response.data.list[i].LmtPrice*response.data.list[i].TotalQuantity)+'</td>'+
			'<td>'+ShowDateTime(response.data.list[i].TimeStamp)+'</td>'+
			
			'<td class="'+response.data.list[i].Action.toLowerCase()+'-chart"><span>'+response.data.list[i].Action+'</span></td>'+

			'<td>'+response.data.list[i].Status+'</td>'+
			'</tr>'


		}
	}else{
		ShowNotification(response.message,true);
	}
})
function DoThisTrade(){
	qut = this.getAttribute("qut");
	price = this.getAttribute("price");
	act = this.getAttribute("act");
	company	= this.getAttribute("company");
	if (act=="BUY") {
		SetOrder(company,qut,price,act,function(response,responseCode){
			if (responseCode==200) {
				ShowNotification("An order to "+act.toLowerCase()+" successfully submitted");

			}else{
				ShowNotification(response.message,true);
			}
		})
	}
}
/*
TradesLastDay(function(response,responseCode){
	if (responseCode==200) {
		$(function(){
			document.getElementById("for-sorting-box").innerHTML = "";
			for (var i = 0; i <response.data.list.length; i++) {
				// transactoinTypes - 0 sell
				// 1 - buy
				var transacrionType = 1;
				if (response.data.list[i].Side="SLD") {
					transacrionType = 0;
				}
				document.getElementById("for-sorting-box").innerHTML+= '<tr>'+
				'<td class="pdd-30">'+response.data.list[i].OrderId+'</td>'+
				'<td>'+response.data.list[i].TimeStamp+'</td>'+
				'<td>'+response.data.list[i].FullName+'</td>'+
				'<td>' + ((transacrionType)?'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Table/1-Row" transform="translate(-557.000000, -24.000000)"><g id="outline-arrow_upward-24px" transform="translate(556.000000, 23.000000)"><g id="Outline_1_"><g transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#00d390" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="6 8.66666667 6.47 9.13666667 8.33333333 7.27666667 8.33333333 11.3333333 9 11.3333333 9 7.27666667 10.86 9.14 11.3333333 8.66666667 8.66666667 6"></polygon></g></g></g></g></g></svg>':'<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>outline-arrow_upward-24px</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="outline-arrow_downward-24px-copy" transform="translate(-1.000000, -1.000000)"><g id="outline-arrow_upward-24px"><g id="Outline_1_" transform="translate(0.333333, 0.333333)"><circle id="Oval" fill="#965bd2" cx="8.66666667" cy="8.66666667" r="8"></circle><polygon id="Shape" fill="#FFFFFF" fill-rule="nonzero" points="11.33 8.665 10.8602938 8.19529375 8.998125 10.0541313 8.998125 6 8.331875 6 8.331875 10.0541313 6.4730375 8.1919625 6 8.665 8.665 11.33"></polygon></g></g></g></g></svg>')+response.data.list[i].CumQty+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price)+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].Price*response.data.list[i].Shares)+'</td>'+
				'<td>'+Intl.NumberFormat("en-US",{ style: 'currency', currency: response.data.list[i].Currency }).format(response.data.list[i].RealizedPNL)+'</td>'+
				((transacrionType)?'<td class="sell-chart"><span>Sell</span></td>':'<td class="buy-chart"><span>Buy</span></td>')+'</tr>';
			}
		})
	}else{
		ShowNotification(response.message,true);
	}
})
*/
var marker = true;
$(function(){

	var selectinp = document.getElementsByClassName('select-input'),
		selectbl = document.getElementsByClassName('select-block'),
		openClose = document.getElementsByClassName("openClose");
		selectvalue1 = selectbl[0].getElementsByTagName('li'),
		selectvalue2 = selectbl[1].getElementsByTagName('li'),
		selectvalue3 = selectbl[2].getElementsByTagName('li'),
		selectvalue4 = selectbl[3].getElementsByTagName('li'),
		selectarrparent = document.getElementsByClassName('charts-for-arrow');


	window.onclick = function(event) {
		if(event.target != selectbl[0] && event.target !=selectinp[0] && event.target!= openClose[0]){
				selectbl[0].style.display = "none";
				//selectarrparent[0].className = "charts-lab-inp-bl charts-for-arrow";
				openClose[0].className = "openClose"

		} else {
				selectbl[0].style.display = "block";
				//selectarrparent[0].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
				openClose[0].className = "openClose rotateopenClose"
				
		}
		if(event.target != selectbl[1] && event.target !=selectinp[1] && event.target!= openClose[1]){
				selectbl[1].style.display = "none";
				//selectarrparent[1].className = "charts-lab-inp-bl charts-for-arrow";
				openClose[1].className = "openClose"

		} else {
				selectbl[1].style.display = "block";
				//selectarrparent[1].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
				openClose[1].className = "openClose rotateopenClose"

		}
		if(event.target != selectbl[2] && event.target !=selectinp[2] && event.target!= openClose[2]){
				selectbl[2].style.display = "none";
				//selectarrparent[2].className = "charts-lab-inp-bl charts-for-arrow";
				openClose[2].className = "openClose"

		} else {
				selectbl[2].style.display = "block";
				//selectarrparent[2].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
				openClose[2].className = "openClose rotateopenClose"

		}
		if(event.target != selectbl[3] && event.target !=selectinp[3] && event.target!= openClose[3]){
				selectbl[3].style.display = "none";
				//selectarrparent[3].className = "charts-lab-inp-bl charts-for-arrow";
				openClose[3].className = "openClose"

		} else {
				selectbl[3].style.display = "block";
				//selectarrparent[3].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
				openClose[3].className = "openClose rotateopenClose"

		}
	}
	for(var i = 0; i < selectvalue1.length; i++){
		selectvalue1[i].onclick = function(){
			var usedvalue = this.innerHTML;
			selectinp[0].value = usedvalue;
			selectbl[0].style.display = "none";
				selectarrparent[0].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
		}
	}
	for(var i = 0; i < selectvalue2.length; i++){
		selectvalue2[i].onclick = function(){
			var usedvalue = this.innerHTML;
			selectinp[1].value = usedvalue;
			selectbl[1].style.display = "none";
				selectarrparent[1].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
		}
	}
	for(var i = 0; i < selectvalue3.length; i++){
		selectvalue3[i].onclick = function(){
			var usedvalue = this.innerHTML;
			selectinp[2].value = usedvalue;
			selectbl[2].style.display = "none";
				selectarrparent[2].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
		}
	}
	for(var i = 0; i < selectvalue4.length; i++){
		selectvalue4[i].onclick = function(){
			var usedvalue = this.innerHTML;
				selectinp[3].value = usedvalue;
			selectbl[3].style.display = "none";
				selectarrparent[3].className = "charts-lab-inp-bl charts-for-arrow arrow-rotate";
		}
	}

	$('#myElement').simplebar();
	$('#myElement1').simplebar();
	$('#myElement3').simplebar();
	$('#myElement2').simplebar();
	$("#logout").bind("click",logout);
	$("#applyButton").bind("click",applyClick);
	$("#StartTrading").bind("click",runOrders);
	$("#StopTrading").bind("click",pauseOrders);
	$(".for-sorting").bind("click",setSortingSettings);
	$(".OrderByPossitions").bind("click",OrderByPossitions);
	$(".OrderByStockossitions").bind("click",OrderByStocks);
	$("#SellSelecetedStocks").bind("click",SellSelecetedStocks);
	$(".TradesHistoryOrderBy").bind("click",TradesHistoryOrderBy);
});
var SeilOrders = [];
function SetStockForSELL(){
	var Company = 		this.getAttribute("ticker");

	if (this.checked) {
		var limitprice = 	this.getAttribute("limitprice");
		var totalquantity = this.getAttribute("totalquantity");
		SeilOrders[Company] = {
			"Company": 			Company,
			"TotalQuantity": 	totalquantity,
			"LmtPrice": 		limitprice,
		}
	}else{
		delete SeilOrders[Company];
	}
}
function SellSelecetedStocks(){
	__SeilOrders = [];
	
	for(var key in SeilOrders){
		__SeilOrders.push({
						"Company": 			SeilOrders[key].Company,
						"Action": 			"SELL",
						"TotalQuantity": 	SeilOrders[key].TotalQuantity,
						"LmtPrice": 		SeilOrders[key].LmtPrice,
						"Status": 			"Pending"
					}
		);		
	}
	ReqMoney(__SeilOrders,function(res,resCode){
		if (resCode==200) {
			ShowNotification("Order successfully submitted");
		}else{
			ShowNotification(res.message,true);
		}
	});	
	
}
//$(".StockBox:checked").attr("ticker")
function OrderByPossitions(){
	desc = this.getAttribute("order");
	if (this.getAttribute("desc")==0) {
		desc="-"+desc;
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",1);
	}else{
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",0);
	}
	getMyPositionsTable(1,desc);
}
function OrderByStocks(){
	desc = this.getAttribute("order");
	if (this.getAttribute("desc")==0) {
		desc="-"+desc;
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",1);
	}else{
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",0);
	}
	getMyStocksTable(1,desc);
}
function TradesHistoryOrderBy(){
	desc = this.getAttribute("order");
	$(".OrderByArrow").removeClass("OrderByArrow");
	$(".activeOrderdField").removeClass("activeOrderdField");
	$("#"+desc+"Order").addClass("OrderByArrow");
	$(this).addClass("activeOrderdField");
	if (this.getAttribute("desc")==0) {
		$("#"+desc+"Order").removeClass("desc");
		desc="-"+desc;
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",1);
	}else{
		$("#"+desc+"Order").addClass("desc");
		$(".OrderByPossitions").attr("desc",1);
		this.setAttribute("desc",0);
	}

	getTrades(1,desc);
}
GetChartData(function(response,responseCode){
	var chartData = [];
	for(counter=0;counter<response.data.count;counter++){
		chartData[counter] = {
			date: new Date(response.data.list[counter].TimeStamp),
			StockMarketValue: response.data.list[counter].StockMarketValue,
			StockMarketValueFormated: response.data.list[counter].StockMarketValue+"%",
			CashBalance: response.data.list[counter].CashBalance,
			TotalAccountValue: response.data.list[counter].TotalAccountValue,
			Trades: response.data.list[counter].Trades
		};
		
	}
	

	var chart = AmCharts.makeChart( "chartdiv", {
		"type": "stock",
		"theme": "light",

		"dataSets": [ {
			"title": "first data set",
			"fieldMappings": [ {
				"fromField": "StockMarketValue",
				"toField": "StockMarketValue"
			},{
				"fromField": "StockMarketValueFormated",
				"toField":"StockMarketValueFormated",
			}, {
				"fromField": "CashBalance",
				"toField": "CashBalance"
			}, {
				"fromField": "TotalAccountValue",
				"toField": "TotalAccountValue"
			}, {
				"fromField": "Trades",
				"toField": "Trades"
			} ],
			"dataProvider": chartData,
			"categoryField": "date"
		} ],

		"panels": [ {
			"showCategoryAxis": false,
			"title": "Data",
			"percentHeight": 70,
			"stockGraphs": [ {
				"id": "g1",
				"title": "Equity",
				"lineThickness": 2,
				"valueField": "StockMarketValue",
				"useDataSetColors": false,

				"balloonText": "[[title]]:<b>[[value]]$</b>",
				"compareGraphBalloonText": "[[title]]:<b>[[value]]$</b>"
			}, {
				"id": "g2",
				"title": "Cash",
				"lineThickness": 2,
				"valueField": "CashBalance",
				"useDataSetColors": false,

				"balloonText": "[[title]]:<b>[[value]]$</b>",
				"compareGraphBalloonText": "[[title]]:<b>[[value]]$</b>"
			}, {
				"id": "g3",
				"title": "Total Account Value",
				"lineThickness": 2,
				"valueField": "TotalAccountValue",
				"useDataSetColors": false,
				"balloonText": "[[title]]:<b>[[value]]$</b>",
				"compareGraphBalloonText": "[[title]]:<b>[[value]]$</b>"
			}, {
				"id": "g4",
				"title": "Trades",
				"lineThickness": 2,
				"valueField": "Trades",
				"useDataSetColors": false,
				"hidden":true,

				"balloonText": "[[title]]:<b>[[value]]$</b>",
				"compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
			}],
			"stockLegend": {
				"periodValueTextComparing": "[[percents.value.close]]",
				"periodValueTextRegular": "[[value.close]]",
				
			}
		} ],

		"chartScrollbarSettings": {
			"graph": "g1"
		},

		"chartCursorSettings": {
			"valueBalloonsEnabled": true,
			"fullWidth": true,
			"cursorAlpha": 0.1,
			"valueLineBalloonEnabled": true,
			"valueLineEnabled": true,
			"valueLineAlpha": 0.5
		},
		"categoryAxis": {
					"parseDates": true,
					"axisColor": "#DADADA",
					"minorGridEnabled": true
			},
			"export": {
				"enabled": true,
					"position": "top-right"
			 }

	} );

	chart.addListener('rollOverGraphItem', function(e) {
		console.log(e);
	});
/*
	var chart = AmCharts.makeChart("chartdiv", {
			"type": "stock",
			"theme": "light",
			"legend": {
					"useGraphSettings": true
			},
			"dataProvider": chartData,
			"synchronizeGrid":true,
			"valueAxes": [{
					"id":"v1",
					"axisColor": "#FF6600",
					"axisThickness": 2,
					"includeGuidesInMinMax" : true,
					"maximum": max,
					"minimum": min,
					"axisAlpha": 1,
					"position": "left",
					"includeHidden": true,
			}, {
					"id":"v2",
					"axisColor": "#FCD202",
					"axisThickness": 2,
					"includeGuidesInMinMax" : true,
					"maximum": max,
					"minimum": min,

					"axisAlpha": 1,
					"position": "right",
					"includeHidden": true,

			},{
					"id":"v3",
					"axisColor": "blue",
					"axisThickness": 2,
					"includeGuidesInMinMax" : true,
					"maximum": max,
					"minimum": min,

					"axisAlpha": 1,
					"gridAlpha": 0,
					"offset": 80,
					"position": "right",
					"includeHidden": true,

			}, {
					"id":"v4",
					"axisColor": "#B0DE09",
					"axisThickness": 2,
					"gridAlpha": 0,
					"includeGuidesInMinMax" : true,
					"maximum": max,
					"minimum": min,
					"offset": 80,
					"axisAlpha": 1,
					"position": "left",
					"includeHidden": true,

			}],
			"graphs": [{
					"valueAxis": "v1",
					"lineColor": "#FF6600",
					"bullet": "round",
					"bulletBorderThickness": 1,
					"hideBulletsCount": 30,
					"title": "Equity",
					"valueField": "StockMarketValue",
			"fillAlphas": 0
			}, {
					"valueAxis": "v2",
					"lineColor": "#FCD202",
					"bullet": "square",
					"bulletBorderThickness": 1,
					"hideBulletsCount": 30,
					"title": "Cash",
					"valueField": "CashBalance",
			"fillAlphas": 0
			}, {
					"valueAxis": "v3",
					"lineColor": "blue",
					"bullet": "triangleUp",
					"bulletBorderThickness": 1,
					"hideBulletsCount": 30,
					"title": "Trades Number",
					"valueField": "Trades",
			"fillAlphas": 0
			}, {
					"valueAxis": "v4",
					"lineColor": "#B0DE09",
					"bullet": "triangleUp",
					"bulletBorderThickness": 1,
					"hideBulletsCount": 30,
					"title": "Total Account Value",
					"valueField": "TotalAccountValue",
			"fillAlphas": 0
			}],
			"chartScrollbar": {},
			"chartCursor": {
					"cursorPosition": "mouse"
			},
			"categoryField": "date",
			"categoryAxis": {
					"parseDates": true,
					"axisColor": "#DADADA",
					"minorGridEnabled": true
			},
			"export": {
				"enabled": true,
					"position": "bottom-right"
			 }
	});
*/
	
	chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);


});


function applyClick(){
	var trades = document.getElementById("trades").value;
	trades = trades.substr(1,trades.length-1);
	var term = document.getElementById("term").value;
	var RiskTolerance = document.getElementById("RiskTolerance").value;
	RiskTolerance = RiskTolerance.substr(0,RiskTolerance.length-1);
	var maxTradesPerDay = document.getElementById("maxTradesPerDay").value;
	ApplyModelInput(trades,term,RiskTolerance,maxTradesPerDay,function(response,responseCode){
		//jogel response.data - n inchi hamara
		if (responseCode==200) {
			ShowNotification(response.message);
		}else{
			ShowNotification("Something get wrong, responseCode - "+responseCode);
		}
	})
}
function runOrders(){
	RunOrders(function(response,responseCode){
		console.log(responseCode);
		if (responseCode==200) {
			ShowNotification("Auto-trading started");
			document.getElementById("StartTradingBlock").style.display = "none";
			document.getElementById("StopTradingBlock").style.display = "block";
		}else{
			ShowNotification(response.message,true)
		}
	})
}
function pauseOrders(){
	PauseOrders(function(response,responseCode){
		if (responseCode==200) {
			ShowNotification("Auto-trading paused")
			document.getElementById("StartTradingBlock").style.display = "block";
			document.getElementById("StopTradingBlock").style.display = "none";
		
		}else{
			ShowNotification(response.message,true);
			
		}
	})
}
function setSortingSettings(){
	box = document.getElementById('for-sorting-box');
	arrow = document.getElementById('for-sorting-arrow');
	if(marker == true){
		arrow.style.transform = "rotate(0)";
		var year = document.getElementsByClassName('for-sorting-year'),
		mounth = document.getElementsByClassName('for-sorting-mounth'),
		day = document.getElementsByClassName('for-sorting-day'),
		fullArray = [],
		mounths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for(var i = 0; i < year.length; i++){
			var yearvalue = year[i].innerHTML + "0000";
			var mounthvalue;
			for(var j = 0; j < mounths.length; j++){
				if(mounth[i].innerHTML == mounths[j]){
					mounthvalue = j + "00";
				}
			}
			var dayvalue = day[i].innerHTML;
			var nowvalue = +yearvalue + +mounthvalue + +dayvalue;
			fullArray.push(nowvalue);
		}
		var fullSorted = JSON.parse(JSON.stringify(fullArray));
		fullSorted.sort(function(a, b){return b-a});

		for(var c = 0; c < fullArray.length; c++){
			for(var f = 0; f < fullArray.length; f++){
				if(fullSorted[c] == fullArray[f]){
					var parent = day[f].parentNode.parentNode;
					var parentClone = parent.cloneNode(true);
					box.appendChild(parentClone);
					parent.className = "none";
				}
			}
		}
		var noneparent = box.getElementsByClassName('none');
		while(noneparent.length !=0){
			var noneparentvar = noneparent[0];
			box.removeChild(noneparentvar);
		}
		marker = false;
	}
	else {
		arrow.style.transform = "rotate(180deg)";
		var year = document.getElementsByClassName('for-sorting-year'),
		mounth = document.getElementsByClassName('for-sorting-mounth'),
		day = document.getElementsByClassName('for-sorting-day'),
		fullArray = [],
		mounths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for(var i = 0; i < year.length; i++){
			var yearvalue = year[i].innerHTML + "0000";
			var mounthvalue;
			for(var j = 0; j < mounths.length; j++){
				if(mounth[i].innerHTML == mounths[j]){
					mounthvalue = j + "00";
				}
			}
			var dayvalue = day[i].innerHTML;
			var nowvalue = +yearvalue + +mounthvalue + +dayvalue;
			fullArray.push(nowvalue);
		}
		var fullSorted = JSON.parse(JSON.stringify(fullArray));
		fullSorted.sort(function(a, b){return a-b});
		
		for(var c = 0; c < fullArray.length; c++){
	
			for(var f = 0; f < fullArray.length; f++){
				if(fullSorted[c] == fullArray[f]){
					var parent = day[f].parentNode.parentNode;
					var parentClone = parent.cloneNode(true);
					box.appendChild(parentClone);
					parent.className = "none";
				}
			}
		}
	
		var noneparent = box.getElementsByClassName('none');
		while(noneparent.length !=0){
			var noneparentvar = noneparent[0];
			box.removeChild(noneparentvar);
		}
		marker = true;
	}
}