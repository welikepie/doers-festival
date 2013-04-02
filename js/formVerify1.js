var option = 1;
		//OPTION ONE : Set all values back to null, produce a div above submit button.
		//OPTION TWO : remove form from markup completely.
		//OPTION THREE : remove form from markup completely and leave a div with a success message in it


var regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var errorAppend = "_error";
var contentAppend = "form_";
var idArr = ["email"];
var errorMessages = ["It seems your email was left empty!"];
var formError = "You've forgotten to tell us some things. We're really interested, so please fix them!";
var badEmailText = "Your email adress has failed our validation. If this is wrong, get in touch!";
var errorDiv =  "<span class='FormErrorContent'></span> " ;
var successDiv = "<span id='FormSuccessContent'></span>" ;
var successMessage = "Thanks! We'll keep you updated!";
var returnFail = "Thanks, but the email failed to register sadly. Please try again!";

function failSubmitted(){
		if(option == 1){
			for(var i = 0; i < idArr.length; i++){
				document.getElementById(contentAppend+idArr[i]).value = "";
			}
			document.getElementById("submitWarning").innerHTML = successDiv;
			document.getElementById("FormSuccessContent").innerHTML =returnFail;
		}

		if(option == 2){
			var formToRemove = document.getElementById("form");
			formToRemove.parentNode.removeChild(formToRemove);
		}
		
		if(option == 3){
			document.getElementById("form").innerHTML = successDiv;
			document.getElementById("FormSuccessContent").innerHTML = returnFail;
		}
}

function onceSubmitted(){
		if(option == 1){
			for(var i = 0; i < idArr.length; i++){
				document.getElementById(contentAppend+idArr[i]).value = "";
			}
			document.getElementById("submitWarning").innerHTML = successDiv;
			document.getElementById("FormSuccessContent").innerHTML = successMessage;
		}

		if(option == 2){
			var formToRemove = document.getElementById("form");
			formToRemove.parentNode.removeChild(formToRemove);
		}
		
		if(option == 3){
			
			document.getElementById("form").innerHTML = successDiv;
			document.getElementById("FormSuccessContent").innerHTML = successMessage;
		}
}

function formsubmit() {
	for(var i = 0; i < idArr.length; i++){
		document.getElementById(idArr[i]+errorAppend).innerHTML = "";
	}
	document.getElementById("submitWarning").innerHTML = "";
	var errorCount = 0;
	for(var i = 0; i < idArr.length; i++){
		var test = document.getElementById(contentAppend+idArr[i]).value;
		if(test == "" || test == null){
	//		console.log(idArr[i]+errorAppend);
			document.getElementById(idArr[i]+errorAppend).innerHTML = errorDiv;
			document.getElementsByClassName("FormErrorContent")[errorCount].innerHTML = errorMessages[i];
				errorCount++;
		}
		
		else if(document.getElementById(contentAppend+idArr[i]).className.toString().indexOf("email")!=-1){
			if(regex.test(test.toString()) == false){
				console.log("REGEX FALSE");
				document.getElementsByClassName("FormErrorContent")[errorCount].innerHTML = badEmailText;
				errorCount++;
			}
		}
	}
	console.log(errorCount);
	if(errorCount > 0){
	if(document.getElementsByClassName("FormErrorContent").length > 0){
		document.getElementById("submitWarning").innerHTML = errorDiv;
		//console.log(document.getElementByTagName("div").getElementsByClassName("FormErrorContent"));
		if(document.getElementsByClassName("FormErrorContent") > 1){
			document.getElementsByClassName("FormErrorContent")[document.getElementsByClassName("FormErrorContent").length-1].innerHTML = formError;
		}
		return false;
	}}
	else{
//	return false;
		console.log("true");
		sendToServer();
		return false;
	}
}

function sendToServer(){
	var pushJson = {};
	for(var i = 0; i < idArr.length; i++){
		pushJson[idArr] = document.getElementById(contentAppend+idArr[i]).value;
	}
	console.log(pushJson);
	$.ajax({
		async:false,
		url:"backend/listSubscribe.php",
		method:"POST",
		data : pushJson,
		dataType : "jsonp",
		success : function(response){
			console.log("winnind");
		},
		complete : function(response){
		console.log(response);
			var responseJson = JSON.parse(response.responseText);
			console.log(responseJson);
			console.log(responseJson.response);
			//eval("(" + json + ')');

//		console.log(responseJson.response);
		if(responseJson.response == "success"){console.log("yup"); onceSubmitted();}
		if(responseJson.response == "error"){console.log("oops for this reason: "+responseJson.errorMessage);}
		}
		
	})
	
}
