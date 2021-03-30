#pragma once
#include <memory>
#include "WiFiClient.h"
//#include "WiFi.h" // Was WiFi.h
#include "PubSubClient.h"
#include "IMQTTCallback.h"
#include <functional>

class MQTTClient
{
public:
    MQTTClient(std::shared_ptr<WiFiClient> wifiClient);
    void connectToServer(const char *serverName, int port);
    void connectToTopic(const char *topicName);
    void publishToTopic(const char* topic, const char* message);
    void subscribeToTopic(const char *topic);
    void setMQTTCallback(std::shared_ptr<IMQTTCallback> iMQTTCallback);

    std::shared_ptr<IMQTTCallback> iMQTTCallback;

    void callback(char* topic, byte* payload, unsigned int length);
    inline std::shared_ptr<PubSubClient> getPubSubClient(void) const noexcept { return pubSubClient; };

private:
    void initMQTTClient(void);

    std::shared_ptr<WiFiClient> wifiClient;
    std::shared_ptr<PubSubClient> pubSubClient;
};