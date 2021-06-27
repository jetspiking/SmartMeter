#include <Arduino.h>

bool blinkHigh = true; 
const int BLINK_COUNT = 10; 
const int BLINK_DELAY = 50; 

void setup() 
{
    Serial.begin(9600);
    pinMode(2,OUTPUT);
    digitalWrite(2, LOW);
}

void loop() 
{
  while(Serial.available()) {
  if (Serial.read()!=-1) {
      for (int i = 0; i < BLINK_COUNT; i++) 
      {
        digitalWrite(2,blinkHigh);
        delay(BLINK_DELAY);
        blinkHigh=!blinkHigh;
      }
  } else {
      digitalWrite(2,LOW);
  }
  delay(500);
  }
}