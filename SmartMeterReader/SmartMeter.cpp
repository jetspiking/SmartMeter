#include "SmartMeter.h"

SmartMeter::SmartMeter(std::shared_ptr<SmartMeterWriter> smartMeterWriter) {
    this->smartMeterWriter = smartMeterWriter; 
}

void SmartMeter::newMQTTMessage(const char* topic, const char* message) {

}

void SmartMeter::setSmartMeterState(std::shared_ptr<SmartMeterState> smartMeterState) noexcept { 
    this->smartMeterState->exit(this);
    this->smartMeterState = smartMeterState;
    this->smartMeterState->enter(this);
}

void SmartMeter::setMQTTClient(std::shared_ptr<MQTTClient> mqttClient) noexcept {
    this->mqttClient = mqttClient;
}

void SmartMeter::toggleState(void) {
    this->smartMeterState->toggle(this);
}