import { Routes } from '@angular/router';
import {plotResolver} from './resolvers/plot.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'plot', pathMatch: 'full' },
  { path: 'plot',
    resolve: { plotData: plotResolver },
    loadComponent: () => import('./line-plot/line-plot.component').then(m => m.LinePlotComponent),
    data: { data: 'plot' }
  }
];
