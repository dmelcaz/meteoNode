// Require serial port
const serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// Require MQTT
const mqtt = require('mqtt');
var clientMQTT  = mqtt.connect('mqtt://localhost:1883');


// Initialize serial port
var sp = new SerialPort("/dev/ttyACM0", {
	baudrate: 115200,
	parser: serialport.parsers.readline("\n")
});

// On data send via MQTT
sp.on("data", function (str) {
	clientMQTT.publish('meteoNode/', str);
	console.log(str);
});