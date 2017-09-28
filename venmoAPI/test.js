var Client = require('node-rest-client').Client;

var client = new Client();
var token = "88faf9ca18974b5b4ce2547e51bc032b54eb5fb68528df53763ea2aec5d6472a"; 

console.log("Get Last payment");
// GET PAYMENT HISTORY
// direct way 
client.get("https://api.venmo.com/v1/payments?access_token=".concat(token, "&limit=1"), function (data, response) {
	// parsed response body as js object 
	console.log(data);

});

console.log("Make a payment");
// MAKE PAYMENT
// set content-type header and data as json in args parameter 
var args = {
    data: { 
		access_token: token,
		username: "Kevin-Tanner-2",
		note: "API TEST",
		amount: "-1",
		audient: "private"
		},
    headers: { "Content-Type": "application/json" }
};
 
client.post("https://api.venmo.com/v1/payments", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
});