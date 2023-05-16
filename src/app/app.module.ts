import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import {MatCardModule} from '@angular/material/card';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import * as CanvasJSAngularStockChart from '../assets/canvasjs.stock.angular.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
var CanvasJSStockChart = CanvasJSAngularStockChart.CanvasJSStockChart;

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavigationComponent,
    ChartComponent,
    CanvasJSChart,
    CanvasJSStockChart
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
