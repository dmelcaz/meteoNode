
// Express as HTTP server
var app  = require('express')();
var http = require('http').Server(app);

// Socket.io 
var io   = require('socket.io')(http);

// MQTT server
var mosca = require('mosca');
var sprintf=require("sprintf-js").sprintf;

var mqttSettings = {
	port: 1883
};

// Here we start mosca server
var mqttServer = new mosca.Server(mqttSettings);
mqttServer.on('ready', setup);

// When mosca is ready
function setup() {
	console.log('Mosca server is up and running')
}

// fired when a message is received
mqttServer.on('published', function(packet, client) {
	if(packet.topic == "meteoNode/") {
		try {
			var data = JSON.parse(packet.payload);
			console.log(data);
		} 
		catch (e) {
			console.log("SyntaxError");
		}
	}
	//console.log(sprintf('%s: %s', packet.topic, packet.payload));
});


// On client connection
io.on('connection', function(socket) {

	// Console feedback on client connection
	socket.on('connect', function() {
		console.log('User connected');
	});

	// Console feedback on client disconnection
	socket.on('disconnect', function() {
		console.log('User disconnected');
	});
});

// When a messsage arrive
mqttServer.on('published', function(packet, client) {

	// If the topic is meteoNode
	if(packet.topic == "meteoNode/") {

		try {				
			// Trick to check if the message is correct
			var data = JSON.parse(packet.payload);
			var dataStr = JSON.stringify(data);

			// Send data
			io.emit("meteoNode/", dataStr);
		} catch (e) {
			// Console feedback
			console.log("SyntaxError");
		}
	}
});

// HTTP requests routing to index
app.get('*', function(req, res) {
  res.sendFile( __dirname + '/views/index.html');
});

// HTTP server init
http.listen(3000, function() {
  console.log('Express is listening on *:3000');
});