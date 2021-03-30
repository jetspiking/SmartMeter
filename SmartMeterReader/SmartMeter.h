#pragma once
#include <memory>
#include <stdio.h>
#include <string.h>
#include "SmartMeterState.h"
#include "MQTTClient.h"
#include "IMQTTCallback.h"
#include "SmartMeterReader.h"
#include "SmartMeterWriter.h"

class SmartMeterState;
class SmartMeterWriter;
class SmartMeterReader;
class SmartMeterReading;

class SmartMeter : public IMQTTCallback
{

public:
    SmartMeter(std::shared_ptr<SmartMeterWriter> smartMeterWriter);

    inline std::shared_ptr<SmartMeterState> getSmartMeterState(void) const noexcept { return smartMeterState; };
    inline std::shared_ptr<SmartMeterWriter> getSmartMeterWriter(void) const noexcept { return smartMeterWriter; };
    inline std::shared_ptr<MQTTClient> getMQTTClient(void) const noexcept { return mqttClient; }

    void setSmartMeterState(std::shared_ptr<SmartMeterState> smartMeterState) noexcept;
    void setMQTTClient(std::shared_ptr<MQTTClient> mqttClient) noexcept;
    void newMQTTMessage(const char* topic, const char* message) override;
    void toggleState(void);

private:
    std::shared_ptr<SmartMeterState> smartMeterState = std::dynamic_pointer_cast<SmartMeterState>(std::make_shared<SmartMeterReading>());
    std::shared_ptr<SmartMeterWriter> smartMeterWriter;
    std::shared_ptr<MQTTClient> mqttClient;
};