/* Server initialization */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
//var io = require('socket.io')();


//serve home page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/sensorData.html');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});


/* Serial Initialiaztion */
var SerialPort = require('serialport');
const readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM5', {
  baudRate: 9600
});
//const parser = port.pipe(readline({ delimiter: '\n' }));

/* Read from Serial Port */
port.on('open', function(){
  console.log('Serial Port Opend');
  port.on('data', function(data){
	  if(data[1] != '13')
	  {
		  console.log(String.fromCharCode(data[0]).concat(String.fromCharCode(data[1])));
		  //send event to front end
		  io.emit('sensor data', String.fromCharCode(data[0]).concat(String.fromCharCode(data[1])));
	  }
	  else{
		  console.log(String.fromCharCode(data[0]));
		  
		if(String.fromCharCode(data[0]) > '5')
		{
			console.log("Making request");
			var headers = {
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/json'
			}

			// Configure the request
			var options = {
				url: 'http://ec2-13-59-35-127.us-east-2.compute.amazonaws.com:3000/sensor',
				method: 'POST',
				headers: headers,
				form: {'key1': String.fromCharCode(data[0])}
			}

			// Start the request
			request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					// Print out the response body
					console.log(body)
				}
			})
		}
		  
		  
		  //send event to front end
		  io.emit('sensor data', String.fromCharCode(data[0]));
	  
	  }
	  
  });
});