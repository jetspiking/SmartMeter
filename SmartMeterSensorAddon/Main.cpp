#include "Main.h"

std::shared_ptr<Main> main; 
DHT dht(DHTPIN, DHTTYPE);

void setup() 
{ 
    Serial.begin(9600);
    main = std::make_shared<Main>();
    dht.begin();
}

void loop() 
{
  main->update();
}

Main::Main() 
{ 
  std::shared_ptr<WiFiSetup> wifiSetup = std::make_shared<WiFiSetup>();
  this->mqttClient = std::make_shared<MQTTClient>(wifiSetup->getWiFiClient());

  this->mqttClient->connectToServer(this->MQTT_SERVER, this->MQTT_PORT);
  this->mqttClient->connectToTopic(this->MQTT_TOPIC);
  this->mqttClient->getPubSubClient()->setBufferSize(this->MQTT_PACKET_MAX);
  //this->mqttClient->subscribeToTopic(this->MQTT_TOPIC);
}

int iterator = 5999;   
void Main::update() 
{
  if ((++iterator%6000)==0) 
  {
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    std::string paraLeft = "(";
    std::string paraRight = ")";
    std::string splitter = "\n";

    std::ostringstream stringStreamHumidity;
    stringStreamHumidity << h;
    std::string humidity(stringStreamHumidity.str());

    std::ostringstream stringStreamTemperature;
    stringStreamTemperature << t;
    std::string temperature(stringStreamTemperature.str());

    std::string messageHumidity = this->HUMI_REF+paraLeft+humidity+paraRight;
    std::string messageTemperature = this->TEMP_REF+paraLeft+temperature+paraRight;
    std::string combinedMessage = messageHumidity+splitter+messageTemperature;
    this->mqttClient->publishToTopic(this->MQTT_TOPIC, combinedMessage.c_str());

    iterator=0;
  }

    this->mqttClient->getPubSubClient()->loop();
    delay(10);
    
}