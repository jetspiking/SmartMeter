#include "SmartMeterReader.h"

void SmartMeterReader::SerialReadP1(char* out, int length) 
{
  bool foundStartChar=false;
  int index=length-1;
  for (int i = 0; i < length-1; i++) 
  
    if (Serial.available())
    {
      char data=(char)Serial.read();

      if(data==SmartMeterReader::P1_PROTOCOL_STARTCHAR) 
        foundStartChar=true;

      if (foundStartChar) 
        out[i]=data;
      else i--;

      if (data==SmartMeterReader::P1_PROTOCOL_ENDCHAR && foundStartChar) 
      {
        index=++i;
        break;
      }

    }

    else
    {
      delay(1);
      i--;
    }  
  out[index]='\0';
}