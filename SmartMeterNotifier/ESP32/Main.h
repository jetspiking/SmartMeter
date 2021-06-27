#pragma once

#include <Arduino.h>
#include "WiFiSetup.h"
#include "MQTTClient.h"

class Main : public IMQTTCallback
{
public:

    const   int XBEE_BAUD_RATE 	= 9600;
    const   int MQTT_PACKET_MAX = 1024;
    const   int MQTT_PORT 		= 1883; 
    const   int BLINK_COUNT     = 10; 
    const   int BLINK_DELAY     = 50;
    const	char* MQTT_SERVER 	= "test.mosquitto.org";
    const   char* MQTT_TOPIC 	= "SmartMeter";
    const   char* text          = "Notify.";
            bool blinkHigh     = true;

    std::shared_ptr<MQTTClient> mqttClient;

    Main();
    void update(); 
    void newMQTTMessage(const char* topic, const char* message) override;
};