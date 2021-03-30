#pragma once

class IMQTTCallback {
    public:
    virtual void newMQTTMessage(const char* topic, const char* message) = 0;
};