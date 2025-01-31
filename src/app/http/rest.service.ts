import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlotData} from '../models/PlotData';
import {Observable} from 'rxjs';
import {PredictStockRequest} from '../models/PredictStockRequest';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  BASE_URL = 'http://localhost:8083/';

  httpClient: HttpClient = inject(HttpClient);

  public fetchPlotData(): Observable<PlotData[]> {
    return this.httpClient.get<PlotData[]>(this.BASE_URL + 'plot/data');
  }

  public predictStockPrice(request: PredictStockRequest): Observable<PlotData> {
    return this.httpClient.post<PlotData>(this.BASE_URL + 'plot/predict', request);
  }
}
