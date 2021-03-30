#include "SmartMeterWriter.h"

void SmartMeterWriter::enterReading(SmartMeter* smartMeter) {
}

void SmartMeterWriter::toggleReading(SmartMeter* smartMeter) {

}

void SmartMeterWriter::exitReading(SmartMeter* smartMeter) {

}
void SmartMeterWriter::actingSwapReading(SmartMeter* smartMeter) {

    char data[SmartMeterReader::BUFFER_SIZE];
    SmartMeterReader::SerialReadP1(data, SmartMeterReader::BUFFER_SIZE);
    smartMeter->getMQTTClient()->publishToTopic("SmartMeter", data);
}