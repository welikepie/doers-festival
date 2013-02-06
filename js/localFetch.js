var data;
updateData();
setInterval(function(){updateData();},10000);

function updateData() {
$.ajax({
	url : "backend/display.php",
	dataType : 'jsonp',
	success : function(response) {
		//console.log("successful");
		data = JSON.parse(response);
		//console.log(data);
		if(document.getElementById("headcount")!= undefined){
		document.getElementById("headcount").innerHTML = data["length"];
		}
		else{
		console.log("#headcount not found.");
		}
	},
	error : function(response) {
		console.log("not returning clean JSON.");
		//console.log(response);
		if(document.getElementById("headcount")!= undefined){
		}
		else{
		console.log("#headcount not found.");
		}
	},
	fail : function(response) {
		//console.log("epic fail.");
	}
}); 


}