<?php
require_once("commonVars.php");
$fileName = $GLOBALS["fileName"];
$app_key = $GLOBALS["app_key"];
$user_key = $GLOBALS["user_key"];
$event_id = $GLOBALS["event_id"];;
$company = $GLOBALS["company"];
$questions = $GLOBALS["questions"];
$resultsArr = $GLOBALS["resultsArr"];
//questions to test against. Note; only added questions count here.

$curl = curl_init();
curl_setopt_array($curl, array(CURLOPT_HTTPGET => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_URL => 'https://www.eventbrite.com/json/event_list_attendees?id=' . $event_id . '&app_key=' . $app_key . '&user_key=' . $user_key, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_SSL_VERIFYHOST => 2));
$response = json_decode(curl_exec($curl), true);
curl_close($curl);
unset($curl);
$resultsArr["length"] = sizeof($response["attendees"]);
if ($company == true) {
	$resultsArr["Companies"] = array();
}
foreach ($questions as $question) {
	$resultsArr[$question] = array();
}
foreach ($response["attendees"] as $attendees) {
	//$resultsArr[$attendees["attendee"]["barcode"]] = array();
	foreach ($questions as $qs) {
		if(key_exists("answers", $attendees["attendee"])){
		foreach ($attendees["attendee"]["answers"] as $ticketQs) {
			if ($ticketQs["answer"]["question"] === $qs) {
				array_push($resultsArr[$qs], $ticketQs["answer"]["answer_text"]);
			}
		}
		}
		
	}
	
	if ($company == true) {
		if (array_key_exists("company", $attendees["attendee"])) {
			$check = false;
			foreach ($resultsArr["Companies"] as $comp) {
				if (strcasecmp($comp, $attendees["attendee"]["company"])) {$check = true;
				}
			}
			if (!$check && $attendees["attendee"]["company"]!= "") {
				array_push($resultsArr["Companies"], $attendees["attendee"]["company"]);
			}
		}
	}
}
file_put_contents($fileName, json_encode($resultsArr));

//EXAMPLE OF JSON RETURNED FROM QUERY;
/*{
 "attendee": {
 "last_name": "Roche",
 "suffix": "",
 "currency": "GBP",
 "prefix": "",
 "id": 178777148,
 "first_name": "Alex",
 "order_type": "Free Order",
 "event_id": 5451270898,
 "blog": "",
 "ticket_id": 17058834,
 "event_date": "",
 "email": "",
 "job_title": "",
 "website": "",
 "order_id": 139636908,
 "company": "WeLikePie",
 "barcode": "139636908178777148001",
 "answers": [
 {
 "answer": {
 "answer_text": "London",
 "question": "City",
 "question_type": "text",
 "question_id": 3457916
 }
 },
 {
 "answer": {
 "answer_text": "Reddit",
 "question": "Social Networking Site",
 "question_type": "text",
 "question_id": 3457918
 }
 }
 ],
 "discount": "",
 "amount_paid": "0.00",
 "created": "2013-02-06 05:15:09",
 "gender": "",
 "age": "",
 "modified": "2013-02-06 05:15:50",
 "affiliate": "",
 "birth_date": "",
 "cell_phone": "",
 "notes": "",
 "quantity": 1
 }
 }
 */
?>
