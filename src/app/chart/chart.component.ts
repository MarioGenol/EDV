import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Data } from 'server/export'

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
    @Input() buildingId: number = 1;

    constructor(private http: HttpClient) { }

    chartData: any = [];
    chartOptions: any = { charts: [{ data: [{}] }] }

    ngOnInit() {
        this.http.get<Data[]>(`${environment.backendURL}/data/${this.buildingId}`).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                this.chartData.push({ x: new Date(data[i].date), y: data[i].consumption });
            }

            // Parameters used in chart navigator
            const lastDay = new Date(data[data.length - 1].date);
            const lastDay2 = new Date(data[data.length - 1].date);
            lastDay.setDate(lastDay.getDate() - 30);

            this.chartOptions = {
                title: {
                    text: 'Energy Consumption',
                },
                theme: 'light2',
                animationEnabled: true,
                toolTip: {
                    enabled: true,
                    content: "{y} MW"
                },
                charts: [
                    {
                        data: [
                            {
                                color: "#31c48d",
                                type: 'line',
                                dataPoints: this.chartData,
                            },
                        ],
                    },
                ],
                navigator: {
                    slider: {
                        maskColor: "#31c48d",
                        minimum: lastDay,
                        maximum: lastDay2
                    }
                }
            };
        })
    }
}