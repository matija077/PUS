#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new WebSocketClient();

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
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
	    fs = require('fs');
	    file = '/home/pi/client/data.txt'
	    var temperature = 0
	    function readTemp(callback) {
	    	fs.readFile(file,'utf8', function (err, data) {
	    	if (err) return callback(err)
		callback(null, data)
	    });
	    }
	    readTemp(function (err, data) {
		//console.log(data);
		connection.sendUTF(data);
		setTimeout(sendNumber, 10000);
	   });
            //var number = Math.round(Math.random() * 0xFFFFFF);
	    //console.log(temperature);
            //connection.sendUTF(number.toString());
            //setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

// client.connect('ws://192.168.182.135:8080/', 'echo-protocol');
client.connect('ws://localhost:8080/', 'echo-protocol');