/* Server initialization */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var io = require('socket.io')();


//serve home page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/sensorData.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
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
		  //send event to front end
		  io.emit('sensor data', String.fromCharCode(data[0]));
	  }
  });
});



