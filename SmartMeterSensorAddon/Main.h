#pragma once

#include <Arduino.h>
#include <sstream>
#include <iostream>
#include <string>

#include "WiFiSetup.h"
#include "MQTTClient.h"
#include "DHT.h"

#define DHTTYPE DHT11
#define DHTPIN 4

class Main
{
public:
    const   int MQTT_PACKET_MAX = 1024;
    const   int MQTT_PORT 		= 1883; 
    const   int BLINK_COUNT     = 10; 
    const   int BLINK_DELAY     = 50;
    const	char* MQTT_SERVER 	= "test.mosquitto.org";
    const   char* MQTT_TOPIC 	= "SmartMeter";
    std::string   TEMP_REF      = "u-o:1.0.0";
    std::string   HUMI_REF      = "u-o:1.0.1";

    std::shared_ptr<MQTTClient> mqttClient;

    Main();
    void update(); 
};