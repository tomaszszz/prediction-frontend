import { Component } from '@angular/core';
import { LinePlotComponent } from './line-plot/line-plot.component';

@Component({
  selector: 'app-root',
  imports: [LinePlotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prediction-frontend';
}
