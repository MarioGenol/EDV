import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Building, Data } from 'server/export'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
    buildingId: number = 1;
    name: string = 'Energy Consumption';

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    peak: number = 0;
    average: number = 0;
    chartData: any = [];
    chartOptions: any = { charts: [{ data: [{}] }] }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.buildingId = params['buildingId'];
        });

        this.http.get<Building>(`${environment.backendURL}/buildings/${this.buildingId}`).subscribe(response => {
            if (response) {
                //@ts-ignore
                this.name = response[0].name;
            }
        })

        this.http.get<Data[]>(`${environment.backendURL}/data/${this.buildingId}`).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                this.chartData.push({ x: new Date(data[i].date), y: data[i].consumption });

                // Peak consumption
                if (data[i].consumption > this.peak) {
                    this.peak = data[i].consumption;
                }
                // Average consumption
                this.average += data[i].consumption / data.length;
            }

            // Parameters used in chart navigator
            const firstDayLastMonth = new Date(data[data.length - 1].date);
            const lastDayLastMonth = new Date(data[data.length - 1].date);
            firstDayLastMonth.setDate(firstDayLastMonth.getDate() - 30);

            this.chartOptions = {
                title: {
                    text: this.name,
                },
                subtitles: [{
                    text: `Peak: ${Math.round((this.peak + Number.EPSILON) * 10000) / 10000} / Average Consumption: ${Math.round((this.average + Number.EPSILON) * 10000) / 10000}`
                }],
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
                        minimum: firstDayLastMonth,
                        maximum: lastDayLastMonth
                    }
                }
            };
        })
    }
}