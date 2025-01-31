import {inject, Injectable} from '@angular/core';
import {EMPTY, first, Observable} from 'rxjs';
import {PlotData} from '../models/PlotData';
import {PredictStockRequest} from '../models/PredictStockRequest';
import {RestService} from '../http/rest.service';

@Injectable({
  providedIn: 'root'
})
export class PlotService {
  private restService = inject(RestService);

  public predict(predictionData: PredictStockRequest): Observable<PlotData> {
    if (predictionData) {
      return this.restService.predictStockPrice(predictionData);
    } else {
      return EMPTY;
      console.error("Prediction data is null");
    }
  }
}
