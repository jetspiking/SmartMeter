import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Dataservice } from '../data.service';
import { TelegramData } from '../database-decoder';
import { DatabaseDecoder } from '../database-decoder';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-normal-mode',
  templateUrl: './normal-mode.component.html',
  styleUrls: ['./normal-mode.component.css']
})

export class NormalModeComponent implements OnInit {

  errorMessage: string | undefined;
  telegramData: Array<TelegramData> | undefined;
  databaseDecoder: DatabaseDecoder | undefined;

  // Select data box
  selectDataBox: any | undefined;

  // Root container
  scrollContainer: any | undefined;

  // Timestamp
  timestampMainContainer: any | undefined;
  timeLabelContainer: any | undefined;
  timeLabel: any | undefined;
  timestampList: any | undefined;
  timestampButtonList: any | undefined;

  // Datagram
  datagramMainContainer: any | undefined;
  datagramDetailedLabelContainer: any | undefined;
  datagramDetailedLabel : any | undefined;

  datagramDetailedList: any | undefined;
  datagramDetailedLabelList: any | undefined;

  // Graph
  graphMainContainer : any | undefined;
  graphLabelContainer : any | undefined;
  graphLabel : any | undefined;
  graphContainer: any | undefined;

  chartOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
};

  constructor(private postService: Dataservice, private snackBar: MatSnackBar) {
    this.databaseDecoder = new DatabaseDecoder(postService);
  }

  createView() : void {
    this.scrollContainer = document.getElementById("scroll_container_class");

    this.timestampMainContainer = document.getElementById("timestampMainContainer");
    this.datagramMainContainer = document.getElementById("datagramMainContainer");

    this.timeLabelContainer = document.getElementById("labelContainer");
    this.timeLabel = document.createElement("Label");
    this.timeLabel.innerHTML="Data";
    this.timeLabelContainer.appendChild(this.timeLabel);
    this.timestampList = document.getElementById("timestampList");
    this.timestampButtonList = document.createElement("ul");

    this.datagramDetailedLabelContainer = document.getElementById("datagramDetailedLabelContainer");
    this.datagramDetailedLabel = document.createElement("Label");
    this.datagramDetailedLabel.innerHTML="Detailed Info";
    this.datagramDetailedLabelContainer.appendChild(this.datagramDetailedLabel);
    this.datagramDetailedList = document.getElementById("datagramDetailedList");
    this.datagramDetailedLabelList = document.createElement("ul");

    this.graphMainContainer = document.getElementById("graphMainContainer");
    this.graphLabelContainer = document.getElementById("graphLabelContainer");
    this.graphLabel = document.createElement("Label");
    this.graphLabel.innerHTML="Graph";
    this.graphLabelContainer.appendChild(this.graphLabel);
    this.graphContainer = document.getElementById("graphContainer");

    this.selectDataBox = document.getElementById("selectDataBox");

    this.addSelectFilter();
  }

  fixLayout() : void {

    this.timestampMainContainer.style.width="250px";
    this.timestampList.style.overflow="scroll";
    this.timestampList.style.scrollbarWidth="none";
    this.datagramDetailedList.style.overflow="scroll";
    this.datagramDetailedList.style.scrollbarWidth="none";
    this.graphContainer.style.overflow="scroll";
    this.graphContainer.style.scrollbarWidth="none";
    this.timestampMainContainer.style.height="999999px";
    this.datagramMainContainer.style.height="999999px";
    this.graphMainContainer.style.height="999999px";
  }

  generateChartData(property : string) : void {
    let dateTimeArray = new Array<string>();
    let valuesArray = new Array<number>();

    this.telegramData.forEach(telegramData => {
      console.log(JSON.stringify(telegramData));
      if (telegramData.hasOwnProperty("DateTimeStamp"))
        dateTimeArray.push(telegramData.DateTimeStamp.value);
      if (telegramData.hasOwnProperty(property))
        valuesArray.push(parseInt(telegramData[property].value));
    });

    this.createEchartOptions(dateTimeArray, valuesArray);
  }

  createEchartOptions(dateTimeArray : Array<string>, valuesArray : Array<number>) : void {
    let minimum = valuesArray[0];
    let maximum = valuesArray[0];

    for (var i = 0; i < valuesArray.length; i++) {
      if (valuesArray[i]>maximum) maximum=valuesArray[i];
      if (valuesArray[i]<minimum) minimum=valuesArray[i];
    }

    for (var i = 0; i < dateTimeArray.length; i++)
      dateTimeArray[i]="";

    this.chartOption = {
    xAxis: {
      type: 'category',
      data: dateTimeArray,
    },
    yAxis: {
      min: minimum,
      max: maximum,
      type: 'value',
    },
    series: [
      {
        data: valuesArray,
        type: 'line',
      },
    ],
  };


//  let chartsOption = new EChartsOption;
  }

  createTimestampButton(dateTimeStampValue : string) : any {
    var timestampButton = document.createElement("Button");
    timestampButton.style.width="150px";
    timestampButton.style.height="25px";
    timestampButton.style.background="#383838";
    timestampButton.style.color="white";
    timestampButton.setAttribute('role','list');
    timestampButton.innerHTML = dateTimeStampValue;
    var date = new Date(parseInt(dateTimeStampValue));
    timestampButton.innerHTML = date.toLocaleString()
    return timestampButton;
  }

  createDetailedButton(text : string) : any {
    var detailedButton = document.createElement("Button");
    detailedButton.style.width="250px";
    detailedButton.style.height="25px";
    detailedButton.style.background="#383838";
    detailedButton.style.color="white";
    detailedButton.setAttribute('role','list');
    detailedButton.innerHTML = text;
    return detailedButton;
  }

  domManipulateElements(telegramData : Array<TelegramData>, dataType: string) : void {
          this.timeLabel.innerHTML=dataType;

          var self = this;

          telegramData.forEach(element => {
              var timestampButton = this.createTimestampButton(element.DateTimeStamp.value);
              var timestampButtonListContainer = document.createElement("li");
              timestampButtonListContainer.style.listStyleType="none";

              timestampButton.onclick = function() {
                console.clear();
                console.log(JSON.stringify(element));
                self.cleanDetailed();
                self.fillDetailed(element);
              };


              timestampButtonListContainer.appendChild(timestampButton);
              this.timestampButtonList.appendChild(timestampButtonListContainer);
          });

          this.timestampList.appendChild(this.timestampButtonList);
  }

  createDetailedView(element : any) : void {
    var button = this.createDetailedButton(element.id);
    var buttonContainer = document.createElement("li");
    buttonContainer.style.listStyleType="none";
    buttonContainer.appendChild(button);
    this.datagramDetailedLabelList.appendChild(buttonContainer);
    this.createSnackbarAction(button, element);
  }

  checkAndAddBulk(rootElement : any, ... params : any) : void {
    params.forEach(element => {
        this.checkAndAdd(rootElement, element);
    });
  }

  checkAndAdd(element : any, data : string) : void {
    if (element.hasOwnProperty(data))
      this.createDetailedView(element[data]);
  }

  createFilterButton(name : string) : void {
    var option = document.createElement("option");
    option.value=name;
    option.innerHTML=name;
    this.selectDataBox.appendChild(option);
  }

  createFilterButtonsBulk(... params : any) : void {
    params.forEach(element => {
      this.createFilterButton(element);
    });
  }

  addSelectFilter() : void {
    this.createFilterButtonsBulk(
      "VersionInfo",
      "DateTimeStamp",
      "EquipmentIdentifier",
      "MeterReadingToClient1",
      "MeterReadingToClient2",
      "MeterReadingToClient3",
      "TariffIndicator",
      "PowerDeliveredPlusP",
      "PowerDeliveredMinusP",
      "PowerFailuresAny",
      "PowerFailuresLog",
      "VoltageSagsL1",
      "VoltageSagsL2",
      "VoltageSagsL3",
      "VoltageSwellsL1",
      "VoltageSwellsL2",
      "VoltageSwellsL3",
      "MessageCodesN8",
      "MessageCodesN1024",
      "InstantaneousCurrentL1",
      "InstantaneousCurrentL2",
      "InstantaneousCurrentL3",
      "InstantaneousActivePowerL1PlusP",
      "InstantaneousActivePowerL2PlusP",
      "InstantaneousActivePowerL3PlusP",
      "InstantaneousActivePowerL1MinusP",
      "InstantaneousActivePowerL2MinusP",
      "InstantaneousActivePowerL3MinusP",
      "TemperatureSensorData",
      "HumiditySensorData"
    );
  }

  fillDetailed(element : any) : void {
    this.checkAndAddBulk(element,
      "VersionInfo",
      "DateTimeStamp",
      "EquipmentIdentifier",
      "MeterReadingToClient1",
      "MeterReadingToClient2",
      "MeterReadingToClient3",
      "TariffIndicator",
      "PowerDeliveredPlusP",
      "PowerDeliveredMinusP",
      "PowerFailuresAny",
      "PowerFailuresLog",
      "VoltageSagsL1",
      "VoltageSagsL2",
      "VoltageSagsL3",
      "VoltageSwellsL1",
      "VoltageSwellsL2",
      "VoltageSwellsL3",
      "MessageCodesN8",
      "MessageCodesN1024",
      "InstantaneousCurrentL1",
      "InstantaneousCurrentL2",
      "InstantaneousCurrentL3",
      "InstantaneousActivePowerL1PlusP",
      "InstantaneousActivePowerL2PlusP",
      "InstantaneousActivePowerL3PlusP",
      "InstantaneousActivePowerL1MinusP",
      "InstantaneousActivePowerL2MinusP",
      "InstantaneousActivePowerL3MinusP",
      "TemperatureSensorData",
      "HumiditySensorData"
    );

    this.datagramDetailedList.appendChild(this.datagramDetailedLabelList);
  }

  createSnackbarAction(button : any, element : any) : void {
    var self = this;
    button.onclick = function() {
      const _id: string = `_id: \' ${element._id} \' `;
      const id: string = `id: \' ${element.id} \' `;
      const description: string = `description: \' ${element.description} \' `;
      const value: string = `value: \' ${element.value} \' `;
      const reference: string = `reference: \' ${element.reference} \' `;

      const snackbarString: string = _id + '\n' + id + '\n' + description + '\n' + value + '\n' + reference;

      let snackBarRef = self.snackBar.open(snackbarString, '', {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
    };
  }

  cleanDetailed() : void {
    this.removeAllChildNodes(this.datagramDetailedLabelList);
  }

  cleanView() : void {
    this.removeAllChildNodes(this.timestampButtonList);
  }

  removeAllChildNodes(parent : any) : void {
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
  }

  bindActions() : void {
    var buttonAll = document.getElementById("allDataButton");
    var buttonDay = document.getElementById("dayDataButton");
    var buttonHour = document.getElementById("hourDataButton");
    var buttonLast = document.getElementById("lastDataButton");
    var buttonChart = document.getElementById("generateChartButton");

    var self = this;

    buttonAll.onclick = function() {
      self.databaseDecoder.getAllPosts((result)=> {
        self.cleanView();
        self.telegramData=result;
        self.domManipulateElements(self.telegramData, "All Data");
      });
    };

    buttonDay.onclick = function() {
      self.databaseDecoder.getDayPosts((result)=> {
        self.cleanView();
        self.telegramData=result;
        self.domManipulateElements(self.telegramData, "Day Data");
      });
    };

    buttonHour.onclick = function() {
      self.databaseDecoder.getHourPosts((result)=> {
        self.cleanView();
        self.telegramData=result;
        self.domManipulateElements(self.telegramData, "Hour Data");
      });
    };

    buttonLast.onclick = function() {
      self.databaseDecoder.getLastPost((result)=> {
        self.cleanView();
        self.telegramData=result;
        self.domManipulateElements(self.telegramData, "Last Data");
      });
    };

    buttonChart.onclick = function() {
      self.generateChartData(self.selectDataBox.value);
    }

  }

  ngOnInit() : void{
    this.bindActions();
    this.createView();
    this.fixLayout();
  }

  colorScheme = {
    domain: ['#F1DAE2', '#D3FFCE', '#E6E7FA', '#C6ACC7']
  };

}
