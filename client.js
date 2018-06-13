#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;
var sensor = require('node-dht-sensor');

var client = new WebSocketClient();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            //console.log("Received: '" + message.utf8Data + "'");
	   if (message.utf8Data=="Send"){
	   	sendNumber();
	   }
        }
    });

    function sendNumber() {
        if (connection.connected) {
	    fs = require('fs');
	    file = '/home/pi/client/data.txt'
	    var temperature = 0
	    function readTemp(callback) {
	    	//fs.readFile(file,'utf8', function (err, data) {
	    	sensor.read(11, 4, function(err, temperature, humidity) {
		    if (err) return callback(err)
		    callback(null, temperature, humidity)
	        });
	    }
	    function sendData(err, temperature, humidity) {
		//console.log('data: ' + data);
		if (err!=null) console.log('err: ' + err);
		var time = new Date(Date.now());
		//time = dayNames[time.getMonth()]+' '+monthNames[time.getDay()]+' '+time.getDate()+' '+time.getFullYear()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
		time = time.getHours() + ":" +  time.getMinutes() + ":" +  time.getSeconds();
		connection.sendUTF('U ' + time + ' temperatura na uredaju client je: ' + temperature + 'C');
		//setTimeout(sendNumber, 10000);
	    }
	    readTemp(sendData);
            //var number = new Date(Date.now());
	    //number = number.toString();
	    //connection.sendUTF(number);
            //setTimeout(sendNumber, 10000);
        }
    }
	function tryit() {
		sendNumber();
		setTimeout(tryit, 25000);

	}
    sendNumber();
    setInterval(sendNumber, 10000);
    //tryit();
});

client.connect('ws://192.168.182.135:8080/', 'echo-protocol');
//client.connect('ws://localhost:8080/', 'echo-protocol');
