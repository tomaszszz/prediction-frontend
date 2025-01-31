import { ResolveFn } from '@angular/router';
import { RestService } from '../http/rest.service';
import { inject } from '@angular/core';
import { PlotData } from '../models/PlotData';

export const plotResolver: ResolveFn<PlotData[]> = (route, state) => {
  const restService: RestService = inject(RestService);
  return restService.fetchPlotData();
};
