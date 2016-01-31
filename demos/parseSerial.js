// Require serial port
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

// Initialize serial port
var sp = new SerialPort("/dev/ttyACM0", {
	baudrate: 115200,
	parser: serialport.parsers.readline("\n")
});

// Display data
sp.on("data", function (str) {
	try {
		var data = JSON.parse(str);
		console.log(data);
	} 
	catch (e) {
		console.log("SyntaxError");
	}
});