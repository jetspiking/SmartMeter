#include "Main.h"

std::shared_ptr<Main> main; 

void setup() 
{ 
    pinMode(2, OUTPUT);
    main = std::make_shared<Main>();
    main->mqttClient->setMQTTCallback(main);
    main->mqttClient->subscribeToTopic(main->MQTT_TOPIC);

}

void loop() 
{
  main->update();
}

Main::Main() 
{ 
  Serial.begin(XBEE_BAUD_RATE);

  std::shared_ptr<WiFiSetup> wifiSetup = std::make_shared<WiFiSetup>();
  this->mqttClient = std::make_shared<MQTTClient>(wifiSetup->getWiFiClient());

  this->mqttClient->connectToServer(this->MQTT_SERVER, this->MQTT_PORT);
  this->mqttClient->connectToTopic(this->MQTT_TOPIC);
  this->mqttClient->getPubSubClient()->setBufferSize(this->MQTT_PACKET_MAX);
  //this->mqttClient->subscribeToTopic(this->MQTT_TOPIC);
}
  
void Main::update() 
{
  this->mqttClient->getPubSubClient()->loop();
  digitalWrite(2, LOW);
}

void Main::newMQTTMessage(const char* topic, const char* message)
{
  for (int i = 0 ; i < this->BLINK_COUNT; i++) 
  {
    digitalWrite(2, this->blinkHigh);
    delay(this->BLINK_DELAY);
    this->blinkHigh=!this->blinkHigh; 
  }
  Serial.write(this->text[0]);
}