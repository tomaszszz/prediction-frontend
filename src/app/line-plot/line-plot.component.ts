import {Component, inject, model, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {PlotData} from '../models/PlotData';
import {RestService} from '../http/rest.service';
import {PredictStockRequest} from '../models/PredictStockRequest';
import {FormsModule} from '@angular/forms';
import {PlotService} from '../services/plot.service';
import {first, Observable} from 'rxjs';


@Component({
  selector: 'app-line-plot',
  imports: [
    FormsModule
  ],
  templateUrl: './line-plot.component.html',
  styleUrl: './line-plot.component.css',
})
export class LinePlotComponent implements OnInit {
  public chart: any;
  private labels: any[] = [];
  private datasets: any[] = [];
  public predictionData: PredictStockRequest = {
    date: '',
    temperature: 0
  };

  plotData = model<PlotData[]>();
  private plotService: PlotService = inject(PlotService);

  ngOnInit() {
    this.createChart(this.plotData() || []);
  }

  createChart(plotData: PlotData[]) {
    this.assignDatasetsAndLabels(plotData);
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  private assignDatasetsAndLabels(plotData: PlotData[]) {
    this.labels = plotData.map(data => data.timestamp);
    this.datasets = [{
      label: "AAPPL Price",
      data: plotData.map(data => data.stockPrice),
      backgroundColor: 'blue',
      yAxisID: 'y',
    },
    {
      label: "San Jose Air Temperature",
      data: plotData.map(data => data.temperature),
      backgroundColor: 'red',
      yAxisID: 'y1',
    }];
  }

  public predictStockPrice(): void {
    if (!this.predictionData.temperature) {
      return;
    }
    this.predictionData.date = this.getNextDay().toISOString().split('T')[0];
    const prediction$ = this.plotService.predict(this.predictionData);
    this.updateChart(prediction$);
  }

  private updateChart(prediction$: Observable<PlotData>) {
    prediction$.pipe(first()).subscribe((prediction) => {
      this.chart.data.datasets[0].data.push(prediction.stockPrice);
      this.chart.data.datasets[1].data.push(prediction.temperature);
      this.chart.data.labels.push(prediction.timestamp);
      this.chart.update();
    })
  }

  private getNextDay(): Date {
    const datesLabels = this.chart.data.labels as string[];
    const date = new Date(datesLabels[datesLabels.length - 1]);
    date.setDate(date.getDate() + 1);
    return date;
  }
}
