#pragma once
#include <ESP8266WiFi.h> // Was <WiFi.h>
#include "string.h"
#include "memory"

#define WiFi_SSID "VGV75196830FE"               
#define WiFi_PASSWORD "C7354F291A1212"        

class WiFiSetup
{
public:
    WiFiSetup();

    inline std::shared_ptr<WiFiClient> getWiFiClient(void) const noexcept { return this->wifiClient; };

private:
    void initWiFi(const char *ssid, const char *password);

    std::shared_ptr<WiFiClient> wifiClient;
};