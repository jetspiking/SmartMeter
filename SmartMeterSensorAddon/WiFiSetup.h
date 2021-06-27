#pragma once
#include <WiFi.h>
#include "string.h"
#include "memory"

#define WiFi_SSID "********"
#define WiFi_PASSWORD "********"        

class WiFiSetup
{
public:
    WiFiSetup();

    inline std::shared_ptr<WiFiClient> getWiFiClient(void) const noexcept { return this->wifiClient; };

private:
    void initWiFi(const char *ssid, const char *password);

    std::shared_ptr<WiFiClient> wifiClient;
};
