#include <Arduino.h>
#include <memory>
#include <SoftwareSerial.h>
#include "SmartMeter.h"
#include "WiFiSetup.h"
#include "MQTTClient.h"
#include "SmartMeterReader.h"

std::shared_ptr<SmartMeter> 					smartMeter;
std::shared_ptr<SmartMeterWriter> 				smartMeterWriter;
std::shared_ptr<MQTTClient> 					mqttClient;
std::shared_ptr<SmartMeterInteractiveState> 	interactiveStateSmartMeterReader;

constexpr 	int SMARTMETER_BAUD_RATE 			= 115200;
constexpr 	int MQTT_PACKET_MAX 				= 1024;
constexpr 	int MQTT_PORT 						= 1883;

const		char* MQTT_SERVER 					= "test.mosquitto.org";
const		char* MQTT_TOPIC 					= "SmartMeter"; 


void setup()
{
	Serial.begin(SMARTMETER_BAUD_RATE);
	Serial.swap();

	smartMeterWriter = std::make_shared<SmartMeterWriter>();

	smartMeter = std::make_shared<SmartMeter>(smartMeterWriter);

	std::shared_ptr<WiFiSetup> wifiSetup = std::make_shared<WiFiSetup>();
	mqttClient = std::make_shared<MQTTClient>(wifiSetup->getWiFiClient());

	mqttClient->connectToServer(MQTT_SERVER, MQTT_PORT);
	mqttClient->connectToTopic(MQTT_TOPIC);
	mqttClient->getPubSubClient()->setBufferSize(MQTT_PACKET_MAX);

	smartMeter->setMQTTClient(mqttClient);

	smartMeter->setSmartMeterState(std::make_shared<SmartMeterReading>());
	interactiveStateSmartMeterReader = std::dynamic_pointer_cast<SmartMeterInteractiveState>(smartMeter->getSmartMeterState());
}

uint64_t delayCounter = 0;


void loop()
{
	mqttClient->getPubSubClient()->loop();
	
	if (delayCounter%10000==0)
		if (interactiveStateSmartMeterReader)
			interactiveStateSmartMeterReader->actingSwap(smartMeter.get());

	if (++delayCounter > UINT_FAST64_MAX)
		delayCounter = 0;
	
	delay(1);	
}