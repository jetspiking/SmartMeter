// Obis Reference

let P1_OBIS_REFERENCES = [
	['1-3:0.2.8','VersionInfo','Version Information For P1 Output'],
	['0-0:1.0.0.','DateTimeStamp','Date-time stamp of P1 message'],
	['0-0:96.1.1','EquipmentIdentifier','Equipment identifier'],
	['1-0:1.8.1','MeterReadingToClient1','Meter Reading To Client1'],
	['1-0:1.8.2','MeterReadingToClient2','Meter Reading To Client2'],
	['1-0:2.8.1','MeterReadingToClient3','Meter Reading To Client3'],
	['0-0:96.14.0','TariffIndicator','Tariff indicator'],
	['1-0:1.7.0','PowerDeliveredPlusP','Power Delivered (+P)'],
	['1-0:2.7.0','PowerDeliveredMinusP','Power Delivered (-P)'],
	['0-0:96.7.21','PowerFailuresAny','Power Failures Any Phase'],
	['0-0:96.7.9','PowerFailuresLongAny','Long Power Failures Any Phase'],
	['1-0:99.97.0','PowerFailuresLog','Power Failures Log'],
	['1-0:32.32.0','VoltageSagsL1','Voltage Sags In Phase L1'],
	['1-0:52.32.0','VoltageSagsL2','Voltage Sags In Phase L2'],
	['1-0:72.32.0','VoltageSagsL3','Voltage Sags In Phase L3'],
	['1-0:32.36.0','VoltageSwellsL1','Voltage Swells In Phase L1'],
	['1-0:52.36.0','VoltageSwellsL2','Voltage Swells In Phase L2'],
	['1-0:72.36.0','VoltageSwellsL3','Voltage Swells In Phase L3'],
	['0-0:96.13.1','MessageCodesN8','Text Message Codes 8 Digits'],
	['0-0:96.13.0','MessageCodesN1024','Text Message 1024 Characters'],
	['1-0:31.7.0','InstantaneousCurrentL1','Instantaneous Current Phase L1'],
	['1-0:51.7.0','InstantaneousCurrentL2','Instantaneous Current Phase L2'],
	['1-0:71.7.0','InstantaneousCurrentL3','Instantaneous Current Phase L3'],
	['1-0:21.7.0','InstantaneousActivePowerL1PlusP','Instantaneous Active Power Phase L1 (+P)'],
	['1-0:41.7.0','InstantaneousActivePowerL2PlusP','Instantaneous Active Power Phase L2 (+P)'],
	['1-0:61.7.0','InstantaneousActivePowerL3PlusP','Instantaneous Active Power Phase L3 (+P)'],
	['1-0:22.7.0','InstantaneousActivePowerL1MinusP','Instantaneous Active Power Phase L1 (-P)'],
	['1-0:42.7.0','InstantaneousActivePowerL2MinusP','Instantaneous Active Power Phase L2 (-P)'],
	['1-0:62.7.0','InstantaneousActivePowerL3MinusP','Instantaneous Active Power Phase L3 (-P)']
];


// Query Types

const queryTypeGetAll = 0;
const queryTypeGetLast = 1;
const queryTypeGetHour = 2;

//===========================================================================
//							INITIALIZATION
//===========================================================================

//======================================
// MongoDB Initialization

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SmartMeterReader');
const database = mongoose.connection;

var connected=false;

database.on('error',console.error.bind(console,'connection error'));


const P1DatagramSchema = new mongoose.Schema 
({
	items:Object,
	datetime:String
},
{
	versionKey: false
});

const ObisReferenceSchema = new mongoose.Schema
({
	reference: String,
	id: String,
	value: String,
	description: String
}, 
{
	versionKey: false
});


const P1Datagram = mongoose.model('modelNameDatagram', P1DatagramSchema);
const ObisReference = mongoose.model('modelNameObisRef', ObisReferenceSchema);


database.once('open',function() {
	console.log('MongoDB Server Connection Estabilished.');
	connected=true;
});

//======================================
// MQTT Initialization

const mqtt = require('mqtt');
const mqttServer = 'mqtt://test.mosquitto.org:1883';

var mqttClient  = mqtt.connect(mqttServer);
var queryTopic = 'SmartMeter';
 
mqttClient.on('connect', ()=> {
	mqttClient.subscribe(queryTopic);
	console.log('Subscribed To \"'+mqttServer+'\".');
	mqttClient.publish(queryTopic,'Listener Connected.');
})

mqttClient.on('message', (topic,message) => {
	switch(topic) {
		case queryTopic:
			return handleSmartMeterDatagram(message);
	}
})

//======================================
// RESTful-API Initialization

const express = require("express");
const apiPort = 3000;
const app = express();

app.listen(apiPort, () => {
 console.log('RESTful API running');
});

//===========================================================================
//							FUNCTIONS
//===========================================================================

// MQTT Reading

function handleSmartMeterDatagram(message) 
{
	var seperatedSubstrings = message.toString().split('\n');
	let itemArray = [];

	seperatedSubstrings.forEach(messageItem=> {

		P1_OBIS_REFERENCES.forEach(obisReference=> {

			var found = messageItem.includes(obisReference[0]);
			
			if (found) 
			{			
				var r = obisReference[0];
				var i = obisReference[1];
				var v = messageItem.substring(obisReference[0].length+1,messageItem.indexOf(')'));	
				var d = obisReference[2];
				
				itemArray.push(new ObisReference({reference:r,id:i,value:v,description:d}));

				return;	
			}
		
		});

		if (messageItem.includes('/')) 
		{
			var r = '0.0.0';
			var i = 'SmartMeterModel';
			var v = messageItem.substring(1, messageItem.length-1);	
			var d = 'Smart Meter Model Information';
			
			itemArray.push(new ObisReference({reference:r,id:i,value:v,description:d}))
		}

	});
	var dateTime = Date.now();
	let datagram = new P1Datagram({items:itemArray, datetime:dateTime});
	addToDatabase(datagram);
}


// MongoDB Storing

function addToDatabase(object) 
{
	if (connected) 
	{
		object.save(function (err,res) 
		{
			if (err) return console.error(err);
		});
	}

	else 
		console.log("Database not connected, have you installed and launched MongoDB-Community-Server locally?");
}

// MongoDB Getting

async function getFromDatabase(queryType) 
{
	queryData = await P1Datagram.find({});
	
	var queryResult;
	
	switch(queryType) 
	{

		case queryTypeGetAll:
			queryResult = queryData;
			break;
		case queryTypeGetLast:
			queryResult = queryData.pop();
			break;
		case queryTypeGetHour:
			let hour=[60];
			var i;
			
			for (i=0; i < queryData.length && i < 60; i++) 
				hour.push(queryData[i]);

			queryResult=hour;
			break;		
	}

	return queryResult;	
}

// RESTful-api requests

function runAsyncWrapper (callback) {
	return function (req, res, next) 
	{
	  callback(req, res, next).catch(next)
	}
}

app.get("/all", runAsyncWrapper(async(req,res,next) => 
{
	var queryResult = await getFromDatabase(queryTypeGetAll);
	res.json(queryResult);
}));

app.get("/last", runAsyncWrapper(async(req,res,next) => 
{	
	var queryResult = await getFromDatabase(queryTypeGetLast);
	res.json(queryResult);
}));

app.get("/hour", runAsyncWrapper(async(req,res,next) => 
{
	var queryResult = await getFromDatabase(queryTypeGetHour);
	res.json(queryResult);
}));