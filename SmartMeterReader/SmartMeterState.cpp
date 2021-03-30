#include "SmartMeterState.h"

void SmartMeterReading::enter(SmartMeter* smartMeter) 
{
    smartMeter->getSmartMeterWriter()->enterReading(smartMeter);
}

void SmartMeterReading::toggle(SmartMeter* smartMeter) 
{
    smartMeter->getSmartMeterWriter()->toggleReading(smartMeter);
}

void SmartMeterReading::exit(SmartMeter* smartMeter) 
{
    smartMeter->getSmartMeterWriter()->exitReading(smartMeter);
}

void SmartMeterReading::actingSwap(SmartMeter* smartMeter)
{
    smartMeter->getSmartMeterWriter()->actingSwapReading(smartMeter);
}



