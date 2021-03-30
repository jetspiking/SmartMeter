#pragma once
#include "SmartMeter.h"

class SmartMeter;

class ISmartMeterNotifier
{
public:
    virtual void enterReading(SmartMeter*) = 0;
    virtual void toggleReading(SmartMeter*) = 0;
    virtual void exitReading(SmartMeter*) = 0;
    virtual void actingSwapReading(SmartMeter*) = 0;
};