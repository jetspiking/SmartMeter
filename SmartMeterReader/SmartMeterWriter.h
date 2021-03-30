#pragma once
#include "Arduino.h"
#include "ISmartMeterNotifier.h"
#include "SmartMeterReader.h"

constexpr byte WRITER_LED_ON = 0;
constexpr byte WRITER_LED_OFF = 1;

class SmartMeterWriter : public ISmartMeterNotifier
{

public:
    void enterReading(SmartMeter*) override;
    void toggleReading(SmartMeter*) override;
    void exitReading(SmartMeter*) override;
    void actingSwapReading(SmartMeter*) override;
private:
};