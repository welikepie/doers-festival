var option = 3;
		//OPTION ONE : Set all values back to null, produce a div above submit button.
		//OPTION TWO : remove form from markup completely.
		//OPTION THREE : remove form from markup completely and leave a div with a success message in it

var submitted=false;
var errorAppend = "_error";
var contentAppend = "form_";
var idArr = ["name", "contact", "talkContent", "whyHowWhat", "wow"];
var errorMessages = ["It seems you forgot to tell us your name!", 
"You totally forgot to tell us how to reach you.",
"We need to know what your talk is about!",
"We need to know how you went about your awesome project!",
"Your time to shine, and you forgot all about it! Impress us!"];
var formError = "You've forgotten to tell us some things. We're really interested, so please fix them!";
var errorDiv =  "<div class = \"boxLeftEmpty\"><div class = \"text\"><strong>Warning!</strong> <span class='FormErrorContent'></span></div></div> " ;
var successDiv = "<div class = \"successfulSubmit\"><div class = \"text\"><strong>Success!</strong> <span id='FormSuccessContent'></span></div></div> " ;
var successMessage = "Thanks! We can't wait to read your proposal!";

function onceSubmitted(){
		
		if(option == 1){
			for(var i = 0; i < idArr.length; i++){
				document.getElementById(contentAppend+idArr[i]).value = "";
			}
			document.getElementById("form_showOff").value = "";
			document.getElementById("submitWarning").innerHTML = successDiv;
			document.getElementById("FormSuccessContent").innerHTML = successMessage;
		}

		if(option == 2){
			var formToRemove = document.getElementById("googleForm");
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
	}
	if(document.getElementsByClassName("FormErrorContent").length > 0){
		document.getElementById("submitWarning").innerHTML = errorDiv;
		document.getElementsByClassName("FormErrorContent")[document.getElementsByClassName("FormErrorContent").length-1].innerHTML = formError;
		return false;
	}
	else{
	
		return true;
	}
}

setTimeout(function() { //onload element doesn't trigger properly in iframes in chrome. (maybe webkit). onReady is set before anything is loaded, causing this.
       document.getElementById("hidden_iframe").onload = function() {
         if(submitted == true)
							{
								onceSubmitted();
							}
       }
}, 2);