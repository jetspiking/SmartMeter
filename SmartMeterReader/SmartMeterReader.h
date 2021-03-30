#pragma once
#include <memory>
#include <string.h>
#include <string>
#include <Arduino.h>
#include "SmartMeter.h" 

class SmartMeterReader {
    public:
    
    static constexpr char P1_PROTOCOL_STARTCHAR = '/';
    static constexpr char P1_PROTOCOL_ENDCHAR = '!';
    static constexpr char STR_END_CHAR = '\0';
    static constexpr int  BUFFER_SIZE = 864;  

    static void SerialReadP1(char* out, int length);

};