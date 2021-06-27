#include "MQTTClient.h"

MQTTClient::MQTTClient(std::shared_ptr<WiFiClient> wifiClient)
{
    this->wifiClient = wifiClient;
    this->pubSubClient = std::make_shared<PubSubClient>(*wifiClient);
}

void MQTTClient::setMQTTCallback(std::shared_ptr<IMQTTCallback> iMQTTCallback) 
{
    this->iMQTTCallback = iMQTTCallback;
    using std::placeholders::_1;
    using std::placeholders::_2;
    using std::placeholders::_3;
    this->pubSubClient->setCallback(std::bind( &MQTTClient::callback, this, _1,_2,_3));
}

void MQTTClient::connectToServer(const char* server, int port) {
    this->pubSubClient->setServer(server, port);

}

void MQTTClient::subscribeToTopic(const char *topic) 
{
    this->pubSubClient->subscribe(topic);
}

void MQTTClient::connectToTopic(const char *topic)
{
    this->pubSubClient->connect(topic);
}

void MQTTClient::publishToTopic(const char* topic, const char* message) {
    this->pubSubClient->publish(topic,message);
}

void MQTTClient::callback(char* topic, byte* payload, unsigned int length) {
    String messageString;
    for (unsigned int i = 0; i < length; i++)
        messageString+=(char)payload[i];
    if (this->iMQTTCallback!=nullptr)    
        this->iMQTTCallback->newMQTTMessage(topic, messageString.c_str());    
}