#pragma once
#include "SmartMeter.h"
#include "SmartMeterWriter.h"

class SmartMeter;

class SmartMeterState
{
public:
    virtual void enter(SmartMeter* smartMeter) = 0;
    virtual void toggle(SmartMeter* smartMeter) = 0;
    virtual void exit(SmartMeter* smartMeter) = 0;
};

class SmartMeterInteractiveState
{
public:
    virtual void actingSwap(SmartMeter* smartMeter) = 0;
};

class SmartMeterReading : public SmartMeterState, public SmartMeterInteractiveState 
{
public:
    void enter(SmartMeter* smartMeter) override;
    void toggle(SmartMeter* smartMeter) override;
    void exit(SmartMeter* smartMeter) override;
    void actingSwap(SmartMeter* smartMeter) override;
};