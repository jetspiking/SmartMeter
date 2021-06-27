import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dataservice } from './data.service';
import { Data } from './data'
import { MeterItem } from './data'

export class DatabaseDecoder {
  postService: Dataservice | undefined;
  observableDatagrams$: Observable<Array<TelegramData>> | undefined;
  observableData$: Observable<Data[]> | undefined;
  observableDataLast$: Observable<Data> | undefined;

  constructor(postService: Dataservice) {
    this.postService = postService;
  }

  public getDayPosts(onResult: (result:Array<TelegramData>) => void) : void {
    let datagrams = new Array<TelegramData>();

    this.observableData$ = this.postService.getDayPosts();

    this.observableData$.subscribe(data => {

      data.forEach(datagram => {
        if(typeof datagram.items != "undefined"){
            let decoded = this.decodePost(datagram);
            datagrams?.push(decoded);
        }
      })
      onResult(datagrams);
    });
  }

  public getAllPosts(onResult: (result:Array<TelegramData>) => void) : void {
    let datagrams = new Array<TelegramData>();

    this.observableData$ = this.postService.getAllPosts();

    this.observableData$.subscribe(data => {

      data.forEach(datagram => {
        if(typeof datagram.items != "undefined"){
            let decoded = this.decodePost(datagram);
            datagrams?.push(decoded);
        }
      })
      onResult(datagrams);
    });
  }

  public getHourPosts(onResult: (result:Array<TelegramData>) => void) : void {
    let datagrams = new Array<TelegramData>();

    this.observableData$ = this.postService.getHourPosts();

    this.observableData$.subscribe(data => {

      data.forEach(datagram => {
        if(typeof datagram.items != "undefined"){
            let decoded = this.decodePost(datagram);
            datagrams?.push(decoded);
        }
      })
      onResult(datagrams);
    });
  }

  public getLastPost(onResult: (result:Array<TelegramData>) => void) : void {
    let datagrams = new Array<TelegramData>();

    this.observableDataLast$ = this.postService.getLastPosts();

    this.observableDataLast$.subscribe(datagram => {

      if(typeof datagram.items != "undefined"){
        let decoded = this.decodePost(datagram);
        datagrams?.push(decoded);
      }

      onResult(datagrams);

    });
}

  private decodePost(datagram : Data) : TelegramData {
    let telegramModel = new TelegramData;

    if(typeof datagram.datetime != "undefined"){
      let obisReferenceForDateTimeStamp = new ObisReference("0-0:1.0.0", "DateTimeStamp", "Date-time stamp of P1 message", datagram.datetime, "0-0:1.0.0");
      telegramModel.DateTimeStamp = obisReferenceForDateTimeStamp;
    }

    datagram.items.forEach(obisref =>
    {
      let obisReference = new ObisReference(obisref._id, obisref.id, obisref.description, obisref.value, obisref.reference);
      switch (obisref.id)
      {
        case "VersionInfo":
        telegramModel.VersionInfo = obisReference;
        break;

        case "DateTimeStamp":
        telegramModel.DateTimeStamp = obisReference;
        break;

        case "EquipmentIdentifier":
        telegramModel.EquipmentIdentifier = obisReference;
        break;

        case "MeterReadingToClient1":
        telegramModel.MeterReadingToClient1 = obisReference;
        break;

        case "MeterReadingToClient2":
        telegramModel.MeterReadingToClient2 = obisReference;
        break;

        case "MeterReadingToClient3":
        telegramModel.MeterReadingToClient3 = obisReference;
        break;

        case "TariffIndicator":
        telegramModel.TariffIndicator = obisReference;
        break;

        case "PowerDeliveredPlusP":
        telegramModel.PowerDeliveredPlusP = obisReference;
        break;

        case "PowerDeliveredMinusP":
        telegramModel.PowerDeliveredMinusP = obisReference;
        break;

        case "PowerFailuresAny":
        telegramModel.PowerFailuresAny = obisReference;
        break;

        case "PowerFailuresLongAny":
        telegramModel.PowerFailuresLongAny = obisReference;
        break;

        case "PowerFailuresLog":
        telegramModel.PowerFailuresLog = obisReference;
        break;

        case "VoltageSagsL1":
        telegramModel.VoltageSagsL1 = obisReference;
        break;

        case "VoltageSagsL2":
        telegramModel.VoltageSagsL2 = obisReference;
        break;

        case "VoltageSagsL3":
        telegramModel.VoltageSagsL3 = obisReference;
        break;

        case "VoltageSwellsL1":
        telegramModel.VoltageSwellsL1 = obisReference;
        break;

        case "VoltageSwellsL2":
        telegramModel.VoltageSwellsL2 = obisReference;
        break;

        case "VoltageSwellsL3":
        telegramModel.VoltageSwellsL3 = obisReference;
        break;

        case "MessageCodesN8":
        telegramModel.MessageCodesN8 = obisReference;
        break;

        case "MessageCodesN1024":
        telegramModel.MessageCodesN1024 = obisReference;
        break;

        case "InstantaneousCurrentL1":
        telegramModel.InstantaneousCurrentL1 = obisReference;
        break;

        case "InstantaneousCurrentL2":
        telegramModel.InstantaneousCurrentL2 = obisReference;
        break;

        case "InstantaneousCurrentL3":
        telegramModel.InstantaneousCurrentL3 = obisReference;
        break;

        case "InstantaneousActivePowerL1PlusP":
        telegramModel.InstantaneousActivePowerL1PlusP = obisReference;
        break;

        case "InstantaneousActivePowerL2PlusP":
        telegramModel.InstantaneousActivePowerL2PlusP = obisReference;
        break;

        case "InstantaneousActivePowerL3PlusP":
        telegramModel.InstantaneousActivePowerL3PlusP = obisReference;
        break;

        case "InstantaneousActivePowerL1MinusP":
        telegramModel.InstantaneousActivePowerL1MinusP = obisReference;
        break;

        case "InstantaneousActivePowerL2MinusP":
        telegramModel.InstantaneousActivePowerL2MinusP = obisReference;
        break;

        case "InstantaneousActivePowerL3MinusP":
        telegramModel.InstantaneousActivePowerL3MinusP = obisReference;
        break;

        case "TemperatureSensorData":
        telegramModel.TemperatureSensorData = obisReference;
        break;

        case "HumiditySensorData":
        telegramModel.HumiditySensorData = obisReference;
        break;
      }
    });
    return telegramModel;
  }
}

  export class TelegramData
  {
    VersionInfo: ObisReference | undefined;
    DateTimeStamp: ObisReference | undefined;
    EquipmentIdentifier: ObisReference | undefined;
    MeterReadingToClient1: ObisReference | undefined;
    MeterReadingToClient2: ObisReference | undefined;
    MeterReadingToClient3: ObisReference | undefined;
    TariffIndicator: ObisReference | undefined;
    PowerDeliveredPlusP: ObisReference | undefined;
    PowerDeliveredMinusP: ObisReference | undefined;
    PowerFailuresAny: ObisReference | undefined;
    PowerFailuresLongAny: ObisReference | undefined;
    PowerFailuresLog: ObisReference | undefined;
    VoltageSagsL1: ObisReference | undefined;
    VoltageSagsL2: ObisReference | undefined;
    VoltageSagsL3: ObisReference | undefined;
    VoltageSwellsL1: ObisReference | undefined;
    VoltageSwellsL2: ObisReference | undefined;
    VoltageSwellsL3: ObisReference | undefined;
    MessageCodesN8: ObisReference | undefined;
    MessageCodesN1024: ObisReference | undefined;
    InstantaneousCurrentL1: ObisReference | undefined;
    InstantaneousCurrentL2: ObisReference | undefined;
    InstantaneousCurrentL3: ObisReference | undefined;
    InstantaneousActivePowerL1PlusP: ObisReference | undefined;
    InstantaneousActivePowerL2PlusP: ObisReference | undefined;
    InstantaneousActivePowerL3PlusP: ObisReference | undefined;
    InstantaneousActivePowerL1MinusP: ObisReference | undefined;
    InstantaneousActivePowerL2MinusP: ObisReference | undefined;
    InstantaneousActivePowerL3MinusP: ObisReference | undefined;
    TemperatureSensorData: ObisReference | undefined;
    HumiditySensorData: ObisReference | undefined;
  }

  export class ObisReference
  {
    _id: string;
    id: string;
    description: string;
    value: string;
    reference: string;

    constructor(_id: string, id:string, description : string, value : string, reference : string){
      this._id = _id;
      this.id = id;
      this.description = description;
      this.value = value;
      this.reference = reference;
    }
  }
