// Read the DHT22 sensor and send data via serial port with JSON format

#include <dht.h>

dht DHT;

#define DHT22_PIN 6

void setup()
{
  Serial.begin(115200);
}

void loop()
{

  // Read data
  int chk = DHT.read22(DHT22_PIN);


  // If it's OK sends the data
  if(chk == DHTLIB_OK) {

    // Send the data via serial
    Serial.print("{\"humidity\": ");
    Serial.print(DHT.humidity, 1);
    Serial.print(", \"temperature\": ");
    Serial.print(DHT.temperature, 1);
    Serial.println("}");
  }
  delay(2000);
}


