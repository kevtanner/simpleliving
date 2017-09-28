			var Client = require('node-rest-client').Client;
 
			var client = new Client();
			 
			// direct way 
			client.get("https://api.venmo.com/v1/payments?access_token=ADDTOKENHERE", function (data, response) {
				// parsed response body as js object 
				console.log(data);

			});