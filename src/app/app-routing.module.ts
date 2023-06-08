import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MapComponent,
      },
      {
        path: 'chart/:buildingId',
        component: ChartComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
