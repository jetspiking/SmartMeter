#include "WiFiSetup.h"

WiFiSetup::WiFiSetup() {
    this->wifiClient = std::make_shared<WiFiClient>();
    initWiFi(WiFi_SSID, WiFi_PASSWORD);
}

void WiFiSetup::initWiFi(const char* ssid, const char* password) {
    WiFi.begin(ssid, password);

    byte retryCount = 0;
    while (WiFi.status() != WL_CONNECTED) {
        delay(500); 
        if (++retryCount>10)
           break;
    }
    //Serial.println(WiFi.status()==WL_CONNECTED ? "Connected to WiFi" : "Not connected to WiFi");
} 